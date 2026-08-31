import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_pole" AS ENUM('expertise', 'capital', 'feed');
  CREATE TYPE "public"."enum__pages_v_version_pole" AS ENUM('expertise', 'capital', 'feed');
  ALTER TABLE "pages" ADD COLUMN "pole" "enum_pages_pole";
  ALTER TABLE "_pages_v" ADD COLUMN "version_pole" "enum__pages_v_version_pole";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "pole";
  ALTER TABLE "_pages_v" DROP COLUMN "version_pole";
  DROP TYPE "public"."enum_pages_pole";
  DROP TYPE "public"."enum__pages_v_version_pole";`)
}
