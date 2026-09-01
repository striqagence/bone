import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_locales" ADD COLUMN "titre_liste" varchar NOT NULL DEFAULT '';
  ALTER TABLE "blog_locales" ALTER COLUMN "titre_liste" DROP DEFAULT;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_locales" DROP COLUMN "titre_liste";`)
}
