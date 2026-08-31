import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accueil" ADD COLUMN "appel_cta_chemin" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil" ALTER COLUMN "appel_cta_chemin" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "appel_surtitre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "appel_surtitre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "appel_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "appel_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "appel_chapo" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "appel_chapo" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "appel_cta_libelle" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "appel_cta_libelle" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accueil" DROP COLUMN "appel_cta_chemin";
  ALTER TABLE "accueil_locales" DROP COLUMN "appel_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "appel_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "appel_chapo";
  ALTER TABLE "accueil_locales" DROP COLUMN "appel_cta_libelle";`)
}
