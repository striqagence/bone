import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_accueil_profils_liste_picto" AS ENUM('antenne', 'securite', 'balance', 'boussole');
  CREATE TABLE "accueil_profils_liste" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"picto" "enum_accueil_profils_liste_picto" NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "accueil_profils_liste_locales" (
  	"titre" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"reponse" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "accueil_locales" ADD COLUMN "profils_surtitre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "profils_surtitre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "profils_titre_haut" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "profils_titre_haut" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "profils_titre_bas" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "profils_titre_bas" DROP DEFAULT;
  ALTER TABLE "accueil_profils_liste" ADD CONSTRAINT "accueil_profils_liste_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accueil_profils_liste" ADD CONSTRAINT "accueil_profils_liste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_profils_liste_locales" ADD CONSTRAINT "accueil_profils_liste_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_profils_liste"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "accueil_profils_liste_order_idx" ON "accueil_profils_liste" USING btree ("_order");
  CREATE INDEX "accueil_profils_liste_parent_id_idx" ON "accueil_profils_liste" USING btree ("_parent_id");
  CREATE INDEX "accueil_profils_liste_image_idx" ON "accueil_profils_liste" USING btree ("image_id");
  CREATE UNIQUE INDEX "accueil_profils_liste_locales_locale_parent_id_unique" ON "accueil_profils_liste_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "accueil_profils_liste" CASCADE;
  DROP TABLE "accueil_profils_liste_locales" CASCADE;
  ALTER TABLE "accueil_locales" DROP COLUMN "profils_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "profils_titre_haut";
  ALTER TABLE "accueil_locales" DROP COLUMN "profils_titre_bas";
  DROP TYPE "public"."enum_accueil_profils_liste_picto";`)
}
