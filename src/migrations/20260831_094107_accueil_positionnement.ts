import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "accueil_positionnement_gauche_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accueil_positionnement_gauche_entrees_locales" (
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accueil_positionnement_droite_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accueil_positionnement_droite_entrees_locales" (
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_surtitre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "positionnement_surtitre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "positionnement_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_gauche_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "positionnement_gauche_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_gauche_sous_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "positionnement_gauche_sous_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_droite_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "positionnement_droite_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_droite_sous_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "positionnement_droite_sous_titre" DROP DEFAULT;
  ALTER TABLE "accueil_positionnement_gauche_entrees" ADD CONSTRAINT "accueil_positionnement_gauche_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_positionnement_gauche_entrees_locales" ADD CONSTRAINT "accueil_positionnement_gauche_entrees_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_positionnement_gauche_entrees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_positionnement_droite_entrees" ADD CONSTRAINT "accueil_positionnement_droite_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_positionnement_droite_entrees_locales" ADD CONSTRAINT "accueil_positionnement_droite_entrees_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_positionnement_droite_entrees"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "accueil_positionnement_gauche_entrees_order_idx" ON "accueil_positionnement_gauche_entrees" USING btree ("_order");
  CREATE INDEX "accueil_positionnement_gauche_entrees_parent_id_idx" ON "accueil_positionnement_gauche_entrees" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_positionnement_gauche_entrees_locales_locale_parent_" ON "accueil_positionnement_gauche_entrees_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accueil_positionnement_droite_entrees_order_idx" ON "accueil_positionnement_droite_entrees" USING btree ("_order");
  CREATE INDEX "accueil_positionnement_droite_entrees_parent_id_idx" ON "accueil_positionnement_droite_entrees" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_positionnement_droite_entrees_locales_locale_parent_" ON "accueil_positionnement_droite_entrees_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "accueil_positionnement_gauche_entrees" CASCADE;
  DROP TABLE "accueil_positionnement_gauche_entrees_locales" CASCADE;
  DROP TABLE "accueil_positionnement_droite_entrees" CASCADE;
  DROP TABLE "accueil_positionnement_droite_entrees_locales" CASCADE;
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_gauche_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_gauche_sous_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_droite_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_droite_sous_titre";`)
}
