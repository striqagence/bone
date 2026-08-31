import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "accueil_chiffres_statistiques" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valeur" varchar NOT NULL,
  	"unite" varchar NOT NULL
  );
  
  CREATE TABLE "accueil_chiffres_statistiques_locales" (
  	"libelle" varchar NOT NULL,
  	"precision" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "accueil_locales" ADD COLUMN "chiffres_surtitre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "chiffres_surtitre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "chiffres_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "chiffres_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "chiffres_constat" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "chiffres_constat" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "chiffres_consequence" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "chiffres_consequence" DROP DEFAULT;
  ALTER TABLE "accueil_chiffres_statistiques" ADD CONSTRAINT "accueil_chiffres_statistiques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_chiffres_statistiques_locales" ADD CONSTRAINT "accueil_chiffres_statistiques_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_chiffres_statistiques"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "accueil_chiffres_statistiques_order_idx" ON "accueil_chiffres_statistiques" USING btree ("_order");
  CREATE INDEX "accueil_chiffres_statistiques_parent_id_idx" ON "accueil_chiffres_statistiques" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_chiffres_statistiques_locales_locale_parent_id_uniqu" ON "accueil_chiffres_statistiques_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "accueil_chiffres_statistiques" CASCADE;
  DROP TABLE "accueil_chiffres_statistiques_locales" CASCADE;
  ALTER TABLE "accueil_locales" DROP COLUMN "chiffres_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "chiffres_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "chiffres_constat";
  ALTER TABLE "accueil_locales" DROP COLUMN "chiffres_consequence";`)
}
