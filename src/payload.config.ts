import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Demandes } from "./collections/Demandes";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Users } from "./collections/Users";
import { Accueil } from "./globals/Accueil";
import { Contact } from "./globals/Contact";
import { Navigation } from "./globals/Navigation";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Stockage des médias.
 *
 * En développement, Payload écrit dans `media/` à la racine. En production ce
 * n'est pas viable : le système de fichiers de Vercel est éphémère et reparti
 * de zéro à chaque invocation. On bascule donc sur Supabase Storage, compatible
 * S3, dès que les identifiants sont présents.
 *
 * `forcePathStyle` est requis : Supabase n'expose pas de buckets en sous-domaine.
 */
const s3Configured =
  process.env.S3_BUCKET &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY &&
  process.env.S3_ENDPOINT &&
  process.env.SUPABASE_PUBLIC_URL;

const storagePlugins = s3Configured
  ? [
      s3Storage({
        collections: {
          media: {
            // Sans cela, chaque image transite par /api/media/file/… donc par
            // une fonction serverless. Le bucket étant public, on sert
            // directement depuis le CDN Supabase : plus rapide et sans coût
            // d'invocation.
            disablePayloadAccessControl: true,
            generateFileURL: ({ filename }) =>
              `${process.env.SUPABASE_PUBLIC_URL}/storage/v1/object/public/${process.env.S3_BUCKET}/${filename}`,
          },
        },
        bucket: process.env.S3_BUCKET!,
        config: {
          endpoint: process.env.S3_ENDPOINT!,
          region: process.env.S3_REGION ?? "eu-central-1",
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID!,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
          },
          forcePathStyle: true,
        },
      }),
    ]
  : [];

/**
 * URL publique du site.
 *
 * En local, `.env` fournit `NEXT_PUBLIC_SERVER_URL`. Sur Vercel on la déduit du
 * déploiement plutôt que de la figer : `VERCEL_PROJECT_PRODUCTION_URL` suit
 * automatiquement le domaine de production, y compris après l'ajout d'un
 * domaine personnalisé. Poser la variable à la main obligerait à penser à la
 * corriger ce jour-là, et une URL périmée casse les liens de prévisualisation.
 */
function serverURL(): string | undefined {
  if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL;
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return production ? `https://${production}` : undefined;
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " · Bone" },
  },
  collections: [Users, Media, Pages, Demandes],
  globals: [Accueil, Contact, Navigation],
  /**
   * Le français est la langue de référence : c'est elle qui est saisie, et
   * l'anglais s'y replie tant qu'une traduction manque (`fallback`). Sans ce
   * repli, une page anglaise non traduite s'afficherait vide plutôt que dans la
   * langue d'origine.
   */
  localization: {
    locales: [
      { label: "Français", code: "fr" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "fr",
    fallback: true,
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? "",
      /**
       * Le pooler Supabase plafonne à 15 clients simultanés, là où le pilote
       * en ouvre dix par défaut : deux contextes suffisent à le saturer.
       *
       * Descendre à une seule connexion ne marche pas pour autant : Payload
       * imbrique ses requêtes, et la seconde attend alors indéfiniment celle
       * que la première détient. Quatre laissent la marge nécessaire sans
       * approcher le plafond.
       */
      max: 4,
    },
    // Les migrations sont jouées explicitement (`npm run payload migrate`) et
    // non déduites du schéma au démarrage : en serverless, un push automatique
    // se déclencherait à froid sur chaque instance.
    push: false,
  }),
  secret: process.env.PAYLOAD_SECRET ?? "",
  serverURL: serverURL(),
  sharp,
  plugins: [...storagePlugins],
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
})
