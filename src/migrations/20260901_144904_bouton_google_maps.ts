import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_locales" ADD COLUMN "carte_libelle_lien" varchar NOT NULL DEFAULT '';
  ALTER TABLE "contact_locales" ALTER COLUMN "carte_libelle_lien" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_locales" DROP COLUMN "carte_libelle_lien";`)
}
