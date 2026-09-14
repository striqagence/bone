import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accueil_constat_realite_puces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_constat_realite_puces_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_role_etapes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_role_etapes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_positionnement_gauche_entrees" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_positionnement_gauche_entrees_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_positionnement_droite_entrees" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_positionnement_droite_entrees_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_differenciation_habituelle_puces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_differenciation_habituelle_puces_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_differenciation_bone_puces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_differenciation_bone_puces_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_chiffres_statistiques" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_chiffres_statistiques_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_profils_liste" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_profils_liste_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "accueil_constat_realite_puces" CASCADE;
  DROP TABLE "accueil_constat_realite_puces_locales" CASCADE;
  DROP TABLE "accueil_role_etapes" CASCADE;
  DROP TABLE "accueil_role_etapes_locales" CASCADE;
  DROP TABLE "accueil_positionnement_gauche_entrees" CASCADE;
  DROP TABLE "accueil_positionnement_gauche_entrees_locales" CASCADE;
  DROP TABLE "accueil_positionnement_droite_entrees" CASCADE;
  DROP TABLE "accueil_positionnement_droite_entrees_locales" CASCADE;
  DROP TABLE "accueil_differenciation_habituelle_puces" CASCADE;
  DROP TABLE "accueil_differenciation_habituelle_puces_locales" CASCADE;
  DROP TABLE "accueil_differenciation_bone_puces" CASCADE;
  DROP TABLE "accueil_differenciation_bone_puces_locales" CASCADE;
  DROP TABLE "accueil_chiffres_statistiques" CASCADE;
  DROP TABLE "accueil_chiffres_statistiques_locales" CASCADE;
  DROP TABLE "accueil_faq_questions" CASCADE;
  DROP TABLE "accueil_faq_questions_locales" CASCADE;
  DROP TABLE "accueil_profils_liste" CASCADE;
  DROP TABLE "accueil_profils_liste_locales" CASCADE;
  ALTER TABLE "accueil" DROP CONSTRAINT "accueil_constat_realite_photo_id_media_id_fk";
  
  ALTER TABLE "accueil" DROP CONSTRAINT "accueil_constat_enjeu_photo_id_media_id_fk";
  
  ALTER TABLE "accueil" DROP CONSTRAINT "accueil_faq_image_id_media_id_fk";
  
  DROP INDEX "accueil_constat_realite_constat_realite_photo_idx";
  DROP INDEX "accueil_constat_enjeu_constat_enjeu_photo_idx";
  DROP INDEX "accueil_faq_faq_image_idx";
  ALTER TABLE "accueil" DROP COLUMN "en_bref_cta_chemin";
  ALTER TABLE "accueil" DROP COLUMN "constat_realite_chiffre";
  ALTER TABLE "accueil" DROP COLUMN "constat_realite_photo_id";
  ALTER TABLE "accueil" DROP COLUMN "constat_enjeu_photo_id";
  ALTER TABLE "accueil" DROP COLUMN "faq_image_id";
  ALTER TABLE "accueil" DROP COLUMN "appel_cta_chemin";
  ALTER TABLE "accueil_locales" DROP COLUMN "en_bref_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "en_bref_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "en_bref_propos";
  ALTER TABLE "accueil_locales" DROP COLUMN "en_bref_precision";
  ALTER TABLE "accueil_locales" DROP COLUMN "en_bref_cta_libelle";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_realite_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_realite_legende";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_enjeu_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_enjeu_texte";
  ALTER TABLE "accueil_locales" DROP COLUMN "constat_enjeu_citation";
  ALTER TABLE "accueil_locales" DROP COLUMN "promesse_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "promesse_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "role_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "role_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "role_chapo";
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_gauche_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_gauche_sous_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_droite_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "positionnement_droite_sous_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_habituelle_badge";
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_habituelle_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_bone_badge";
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_bone_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "poles_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "poles_titre_haut";
  ALTER TABLE "accueil_locales" DROP COLUMN "poles_titre_bas";
  ALTER TABLE "accueil_locales" DROP COLUMN "chiffres_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "chiffres_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "chiffres_constat";
  ALTER TABLE "accueil_locales" DROP COLUMN "chiffres_consequence";
  ALTER TABLE "accueil_locales" DROP COLUMN "faq_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "faq_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "appel_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "appel_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "appel_chapo";
  ALTER TABLE "accueil_locales" DROP COLUMN "appel_cta_libelle";
  ALTER TABLE "accueil_locales" DROP COLUMN "profils_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "profils_titre_haut";
  ALTER TABLE "accueil_locales" DROP COLUMN "profils_titre_bas";
  DROP TYPE "public"."enum_accueil_profils_liste_picto";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_accueil_profils_liste_picto" AS ENUM('antenne', 'securite', 'balance', 'boussole');
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
  
  CREATE TABLE "accueil_role_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" varchar NOT NULL,
  	"accentuee" boolean DEFAULT false
  );
  
  CREATE TABLE "accueil_role_etapes_locales" (
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
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
  
  CREATE TABLE "accueil_differenciation_habituelle_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accueil_differenciation_habituelle_puces_locales" (
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accueil_differenciation_bone_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accueil_differenciation_bone_puces_locales" (
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
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
  
  CREATE TABLE "accueil_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accueil_faq_questions_locales" (
  	"question" varchar NOT NULL,
  	"reponse" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
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
  
  ALTER TABLE "accueil" ADD COLUMN "en_bref_cta_chemin" varchar NOT NULL;
  ALTER TABLE "accueil" ADD COLUMN "constat_realite_chiffre" varchar NOT NULL;
  ALTER TABLE "accueil" ADD COLUMN "constat_realite_photo_id" integer;
  ALTER TABLE "accueil" ADD COLUMN "constat_enjeu_photo_id" integer;
  ALTER TABLE "accueil" ADD COLUMN "faq_image_id" integer;
  ALTER TABLE "accueil" ADD COLUMN "appel_cta_chemin" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "en_bref_surtitre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "en_bref_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "en_bref_propos" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "en_bref_precision" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "en_bref_cta_libelle" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_surtitre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_realite_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_realite_legende" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_enjeu_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_enjeu_texte" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "constat_enjeu_citation" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "promesse_surtitre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "promesse_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "role_surtitre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "role_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "role_chapo" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_surtitre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_gauche_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_gauche_sous_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_droite_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "positionnement_droite_sous_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_surtitre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_habituelle_badge" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_habituelle_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_bone_badge" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_bone_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "poles_surtitre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "poles_titre_haut" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "poles_titre_bas" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "chiffres_surtitre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "chiffres_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "chiffres_constat" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "chiffres_consequence" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "faq_surtitre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "faq_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "appel_surtitre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "appel_titre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "appel_chapo" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "appel_cta_libelle" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "profils_surtitre" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "profils_titre_haut" varchar NOT NULL;
  ALTER TABLE "accueil_locales" ADD COLUMN "profils_titre_bas" varchar NOT NULL;
  ALTER TABLE "accueil_constat_realite_puces" ADD CONSTRAINT "accueil_constat_realite_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_constat_realite_puces_locales" ADD CONSTRAINT "accueil_constat_realite_puces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_constat_realite_puces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_role_etapes" ADD CONSTRAINT "accueil_role_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_role_etapes_locales" ADD CONSTRAINT "accueil_role_etapes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_role_etapes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_positionnement_gauche_entrees" ADD CONSTRAINT "accueil_positionnement_gauche_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_positionnement_gauche_entrees_locales" ADD CONSTRAINT "accueil_positionnement_gauche_entrees_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_positionnement_gauche_entrees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_positionnement_droite_entrees" ADD CONSTRAINT "accueil_positionnement_droite_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_positionnement_droite_entrees_locales" ADD CONSTRAINT "accueil_positionnement_droite_entrees_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_positionnement_droite_entrees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_differenciation_habituelle_puces" ADD CONSTRAINT "accueil_differenciation_habituelle_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_differenciation_habituelle_puces_locales" ADD CONSTRAINT "accueil_differenciation_habituelle_puces_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_differenciation_habituelle_puces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_differenciation_bone_puces" ADD CONSTRAINT "accueil_differenciation_bone_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_differenciation_bone_puces_locales" ADD CONSTRAINT "accueil_differenciation_bone_puces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_differenciation_bone_puces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_chiffres_statistiques" ADD CONSTRAINT "accueil_chiffres_statistiques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_chiffres_statistiques_locales" ADD CONSTRAINT "accueil_chiffres_statistiques_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_chiffres_statistiques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_faq_questions" ADD CONSTRAINT "accueil_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_faq_questions_locales" ADD CONSTRAINT "accueil_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_profils_liste" ADD CONSTRAINT "accueil_profils_liste_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accueil_profils_liste" ADD CONSTRAINT "accueil_profils_liste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_profils_liste_locales" ADD CONSTRAINT "accueil_profils_liste_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_profils_liste"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "accueil_constat_realite_puces_order_idx" ON "accueil_constat_realite_puces" USING btree ("_order");
  CREATE INDEX "accueil_constat_realite_puces_parent_id_idx" ON "accueil_constat_realite_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_constat_realite_puces_locales_locale_parent_id_uniqu" ON "accueil_constat_realite_puces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accueil_role_etapes_order_idx" ON "accueil_role_etapes" USING btree ("_order");
  CREATE INDEX "accueil_role_etapes_parent_id_idx" ON "accueil_role_etapes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_role_etapes_locales_locale_parent_id_unique" ON "accueil_role_etapes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accueil_positionnement_gauche_entrees_order_idx" ON "accueil_positionnement_gauche_entrees" USING btree ("_order");
  CREATE INDEX "accueil_positionnement_gauche_entrees_parent_id_idx" ON "accueil_positionnement_gauche_entrees" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_positionnement_gauche_entrees_locales_locale_parent_" ON "accueil_positionnement_gauche_entrees_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accueil_positionnement_droite_entrees_order_idx" ON "accueil_positionnement_droite_entrees" USING btree ("_order");
  CREATE INDEX "accueil_positionnement_droite_entrees_parent_id_idx" ON "accueil_positionnement_droite_entrees" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_positionnement_droite_entrees_locales_locale_parent_" ON "accueil_positionnement_droite_entrees_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accueil_differenciation_habituelle_puces_order_idx" ON "accueil_differenciation_habituelle_puces" USING btree ("_order");
  CREATE INDEX "accueil_differenciation_habituelle_puces_parent_id_idx" ON "accueil_differenciation_habituelle_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_differenciation_habituelle_puces_locales_locale_pare" ON "accueil_differenciation_habituelle_puces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accueil_differenciation_bone_puces_order_idx" ON "accueil_differenciation_bone_puces" USING btree ("_order");
  CREATE INDEX "accueil_differenciation_bone_puces_parent_id_idx" ON "accueil_differenciation_bone_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_differenciation_bone_puces_locales_locale_parent_id_" ON "accueil_differenciation_bone_puces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accueil_chiffres_statistiques_order_idx" ON "accueil_chiffres_statistiques" USING btree ("_order");
  CREATE INDEX "accueil_chiffres_statistiques_parent_id_idx" ON "accueil_chiffres_statistiques" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_chiffres_statistiques_locales_locale_parent_id_uniqu" ON "accueil_chiffres_statistiques_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accueil_faq_questions_order_idx" ON "accueil_faq_questions" USING btree ("_order");
  CREATE INDEX "accueil_faq_questions_parent_id_idx" ON "accueil_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_faq_questions_locales_locale_parent_id_unique" ON "accueil_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accueil_profils_liste_order_idx" ON "accueil_profils_liste" USING btree ("_order");
  CREATE INDEX "accueil_profils_liste_parent_id_idx" ON "accueil_profils_liste" USING btree ("_parent_id");
  CREATE INDEX "accueil_profils_liste_image_idx" ON "accueil_profils_liste" USING btree ("image_id");
  CREATE UNIQUE INDEX "accueil_profils_liste_locales_locale_parent_id_unique" ON "accueil_profils_liste_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "accueil" ADD CONSTRAINT "accueil_constat_realite_photo_id_media_id_fk" FOREIGN KEY ("constat_realite_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accueil" ADD CONSTRAINT "accueil_constat_enjeu_photo_id_media_id_fk" FOREIGN KEY ("constat_enjeu_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accueil" ADD CONSTRAINT "accueil_faq_image_id_media_id_fk" FOREIGN KEY ("faq_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "accueil_constat_realite_constat_realite_photo_idx" ON "accueil" USING btree ("constat_realite_photo_id");
  CREATE INDEX "accueil_constat_enjeu_constat_enjeu_photo_idx" ON "accueil" USING btree ("constat_enjeu_photo_id");
  CREATE INDEX "accueil_faq_faq_image_idx" ON "accueil" USING btree ("faq_image_id");`)
}
