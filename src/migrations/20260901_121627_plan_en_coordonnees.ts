import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact" ADD COLUMN "carte_latitude" numeric NOT NULL DEFAULT 0;
  ALTER TABLE "contact" ALTER COLUMN "carte_latitude" DROP DEFAULT;
  ALTER TABLE "contact" ADD COLUMN "carte_longitude" numeric NOT NULL DEFAULT 0;
  ALTER TABLE "contact" ALTER COLUMN "carte_longitude" DROP DEFAULT;
  ALTER TABLE "contact" ADD COLUMN "carte_zoom" numeric DEFAULT 15 NOT NULL;
  ALTER TABLE "contact_locales" ADD COLUMN "carte_intitule" varchar NOT NULL DEFAULT '';
  ALTER TABLE "contact_locales" ALTER COLUMN "carte_intitule" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact" DROP COLUMN "carte_latitude";
  ALTER TABLE "contact" DROP COLUMN "carte_longitude";
  ALTER TABLE "contact" DROP COLUMN "carte_zoom";
  ALTER TABLE "contact_locales" DROP COLUMN "carte_intitule";`)
}
