import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accueil_locales" ADD COLUMN "referencement_meta_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "referencement_meta_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "referencement_meta_description" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "referencement_meta_description" DROP DEFAULT;
  ALTER TABLE "contact_locales" ADD COLUMN "referencement_meta_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "contact_locales" ALTER COLUMN "referencement_meta_titre" DROP DEFAULT;
  ALTER TABLE "contact_locales" ADD COLUMN "referencement_meta_description" varchar NOT NULL DEFAULT '';
  ALTER TABLE "contact_locales" ALTER COLUMN "referencement_meta_description" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accueil_locales" DROP COLUMN "referencement_meta_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "referencement_meta_description";
  ALTER TABLE "contact_locales" DROP COLUMN "referencement_meta_titre";
  ALTER TABLE "contact_locales" DROP COLUMN "referencement_meta_description";`)
}
