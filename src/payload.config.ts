import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Categories } from "./collections/Categories";
import { Abonnes } from "./collections/Abonnes";
import { Verrous } from "./collections/Verrous";
import { Demandes } from "./collections/Demandes";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { Accueil } from "./globals/Accueil";
import { Blog } from "./globals/Blog";
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
  if (process.env.NEXT_PUBLIC_SERVER_URL)
    return process.env.NEXT_PUBLIC_SERVER_URL;
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return production ? `https://${production}` : undefined;
}

/**
 * Origines autorisées à s'authentifier par cookie.
 *
 * Payload glisse `serverURL` dans cette liste, puis refuse tout cookie de
 * session provenant d'une autre origine. Le projet répond sous plusieurs alias
 * Vercel : sans les déclarer ici, on peut lire le back-office mais rien y
 * écrire. La connexion tient, les pages s'affichent, et chaque enregistrement
 * échoue par « You are not allowed to perform this action » pendant que la
 * déconnexion reste sans effet. Les lectures passent parce qu'une navigation
 * n'envoie pas d'en-tête `Origin` : seules les écritures trébuchent.
 *
 * `ORIGINES_ADMIN`, en variables d'environnement et séparées par des virgules,
 * permet d'en ajouter sans toucher au code, le jour du domaine définitif.
 */
function origines(): string[] {
  // `serverURL` n'y figure pas : Payload l'ajoute lui-même à la liste.
  const candidats = [
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    // Alias de projet, celui que l'équipe ouvre au quotidien. Vercel ne
    // l'expose par aucune variable : il se déclare donc à la main.
    "https://bone-striqagence.vercel.app",
    "http://localhost:3000",
    ...(process.env.ORIGINES_ADMIN ?? "").split(",").map((o) => o.trim()),
  ];
  return [...new Set(candidats.filter((o): o is string => Boolean(o)))];
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " · Bone",
      icons: [{ url: "/brand/bone-mark-degrade.svg", type: "image/svg+xml" }],
    },
    /**
     * Le logotype de la marque remplace celui de Payload, à l'écran de
     * connexion comme dans la barre de navigation. Les deux sont des
     * composants et non des images : les fichiers de marque sont blancs, prévus
     * pour les fonds sombres du site, et disparaîtraient sur le fond clair de
     * l'administration. Repris en `currentColor`, le texte suit le thème.
     */
    components: {
      graphics: {
        Logo: "/components/admin/Logo#Logo",
        Icon: "/components/admin/Icon#Icon",
      },
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Posts,
    Categories,
    Demandes,
    Abonnes,
    Verrous,
  ],
  globals: [Accueil, Blog, Contact, Navigation],
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
       * Le site passe par le pooler Supabase en mode transaction (port 6543),
       * qui rend la connexion au pool à la fin de chaque requête au lieu de la
       * retenir toute la session. C'est le mode fait pour le serverless : le
       * mode session, lui, plafonnait à quinze clients et saturait dès que
       * plusieurs builds ou scripts se croisaient.
       *
       * Cinq laissent la marge nécessaire aux requêtes imbriquées de Payload —
       * une seule les fait interbloquer, la seconde attendant celle que la
       * première détient.
       */
      max: 5,
    },
    // Les migrations sont jouées explicitement (`npm run payload migrate`) et
    // non déduites du schéma au démarrage : en serverless, un push automatique
    // se déclencherait à froid sur chaque instance.
    push: false,
  }),
  secret: process.env.PAYLOAD_SECRET ?? "",
  serverURL: serverURL(),
  csrf: origines(),
  sharp,
  plugins: [...storagePlugins],
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
