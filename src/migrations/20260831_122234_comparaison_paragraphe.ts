import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_differenciation_locales" ADD COLUMN "habituelle_texte" varchar;
  ALTER TABLE "pages_blocks_differenciation_locales" ADD COLUMN "bone_texte" varchar;
  ALTER TABLE "_pages_v_blocks_differenciation_locales" ADD COLUMN "habituelle_texte" varchar;
  ALTER TABLE "_pages_v_blocks_differenciation_locales" ADD COLUMN "bone_texte" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_differenciation_locales" DROP COLUMN "habituelle_texte";
  ALTER TABLE "pages_blocks_differenciation_locales" DROP COLUMN "bone_texte";
  ALTER TABLE "_pages_v_blocks_differenciation_locales" DROP COLUMN "habituelle_texte";
  ALTER TABLE "_pages_v_blocks_differenciation_locales" DROP COLUMN "bone_texte";`)
}
