import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" ADD COLUMN "accroche_courte" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_accroche_courte" varchar;
  ALTER TABLE "accueil_locales" ADD COLUMN "poles_surtitre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "poles_surtitre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "poles_titre_haut" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "poles_titre_haut" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "poles_titre_bas" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "poles_titre_bas" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" DROP COLUMN "accroche_courte";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_accroche_courte";
  ALTER TABLE "accueil_locales" DROP COLUMN "poles_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "poles_titre_haut";
  ALTER TABLE "accueil_locales" DROP COLUMN "poles_titre_bas";`)
}
