import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accueil_locales" ADD COLUMN "promesse_surtitre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "promesse_surtitre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "promesse_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "promesse_titre" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accueil_locales" DROP COLUMN "promesse_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "promesse_titre";`)
}
