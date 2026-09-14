import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accueil_blocks_appel_action" ALTER COLUMN "cta_chemin" DROP NOT NULL;
  ALTER TABLE "contact_blocks_appel_action" ALTER COLUMN "cta_chemin" DROP NOT NULL;
  ALTER TABLE "pages_blocks_appel_action" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_appel_action" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "posts_blocks_appel_action" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "_posts_v_blocks_appel_action" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "accueil_blocks_appel_action" ADD COLUMN "cta_url" varchar;
  ALTER TABLE "contact_blocks_appel_action" ADD COLUMN "cta_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accueil_blocks_appel_action" ALTER COLUMN "cta_chemin" SET NOT NULL;
  ALTER TABLE "contact_blocks_appel_action" ALTER COLUMN "cta_chemin" SET NOT NULL;
  ALTER TABLE "pages_blocks_appel_action" DROP COLUMN "cta_url";
  ALTER TABLE "_pages_v_blocks_appel_action" DROP COLUMN "cta_url";
  ALTER TABLE "posts_blocks_appel_action" DROP COLUMN "cta_url";
  ALTER TABLE "_posts_v_blocks_appel_action" DROP COLUMN "cta_url";
  ALTER TABLE "accueil_blocks_appel_action" DROP COLUMN "cta_url";
  ALTER TABLE "contact_blocks_appel_action" DROP COLUMN "cta_url";`)
}
