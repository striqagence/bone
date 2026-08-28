import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

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

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " · Bone" },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI ?? "" },
    // Les migrations sont jouées explicitement (`npm run payload migrate`) et
    // non déduites du schéma au démarrage : en serverless, un push automatique
    // se déclencherait à froid sur chaque instance.
    push: false,
  }),
  secret: process.env.PAYLOAD_SECRET ?? "",
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  sharp,
  plugins: [...storagePlugins],
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
})
