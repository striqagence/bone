import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact" ADD COLUMN "coordonnees_email" varchar NOT NULL DEFAULT '';
  ALTER TABLE "contact" ALTER COLUMN "coordonnees_email" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact" DROP COLUMN "coordonnees_email";`)
}
