import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "accueil_constat_realite_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accueil_constat_realite_puces_locales" (
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "accueil" ADD COLUMN "constat_realite_chiffre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil" ALTER COLUMN "constat_realite_chiffre" DROP DEFAULT;
  ALTER TABLE "accueil" ADD COLUMN "constat_realite_photo_id" integer;
  ALTER TABLE "accueil" ADD COLUMN "constat_enjeu_photo_id" integer;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_surtitre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "constat_surtitre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "constat_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_realite_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "constat_realite_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_realite_legende" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "constat_realite_legende" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_enjeu_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "constat_enjeu_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_enjeu_texte" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "constat_enjeu_texte" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_enjeu_citation" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "constat_enjeu_citation" DROP DEFAULT;
  ALTER TABLE "accueil_constat_realite_puces" ADD CONSTRAINT "accueil_constat_realite_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_constat_realite_puces_locales" ADD CONSTRAINT "accueil_constat_realite_puces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_constat_realite_puces"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "accueil_constat_realite_puces_order_idx" ON "accueil_constat_realite_puces" USING btree ("_order");
  CREATE INDEX "accueil_constat_realite_puces_parent_id_idx" ON "accueil_constat_realite_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_constat_realite_puces_locales_locale_parent_id_uniqu" ON "accueil_constat_realite_puces_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "accueil" ADD CONSTRAINT "accueil_constat_realite_photo_id_media_id_fk" FOREIGN KEY ("constat_realite_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accueil" ADD CONSTRAINT "accueil_constat_enjeu_photo_id_media_id_fk" FOREIGN KEY ("constat_enjeu_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "accueil_constat_realite_constat_realite_photo_idx" ON "accueil" USING btree ("constat_realite_photo_id");
  CREATE INDEX "accueil_constat_enjeu_constat_enjeu_photo_idx" ON "accueil" USING btree ("constat_enjeu_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accueil_constat_realite_puces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_constat_realite_puces_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "accueil_constat_realite_puces" CASCADE;
  DROP TABLE "accueil_constat_realite_puces_locales" CASCADE;
  ALTER TABLE "accueil" DROP CONSTRAINT "accueil_constat_realite_photo_id_media_id_fk";
  
  ALTER TABLE "accueil" DROP CONSTRAINT "accueil_constat_enjeu_photo_id_media_id_fk";
  
  DROP INDEX "accueil_constat_realite_constat_realite_photo_idx";
  DROP INDEX "accueil_constat_enjeu_constat_enjeu_photo_idx";
  ALTER TABLE "accueil" DROP COLUMN "constat_realite_chiffre";
  ALTER TABLE "accueil" DROP COLUMN "constat_realite_photo_id";
  ALTER TABLE "accueil" DROP COLUMN "constat_enjeu_photo_id";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_realite_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_realite_legende";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_enjeu_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_enjeu_texte";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_enjeu_citation";`)
}
