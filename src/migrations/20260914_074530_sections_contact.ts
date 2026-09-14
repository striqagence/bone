import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_blocks_escalier_cartes_picto" AS ENUM('antenne', 'stockage', 'systemes');
  CREATE TYPE "public"."enum_contact_blocks_enjeux_cartes_picto" AS ENUM('antenne', 'securite', 'balance', 'boussole', 'dette', 'alerte', 'liens');
  CREATE TYPE "public"."enum_contact_blocks_valeurs_cartes_picto" AS ENUM('diplome', 'eclair', 'boucle', 'cible', 'bouclier', 'direction', 'ampoule', 'personne');
  CREATE TYPE "public"."enum_contact_blocks_archetype_traits_picto" AS ENUM('diplome', 'eclair', 'boucle', 'cible', 'bouclier', 'direction', 'ampoule', 'personne');
  CREATE TABLE "contact_blocks_en_bref" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_chemin" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_en_bref_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"propos" varchar NOT NULL,
  	"precision" varchar NOT NULL,
  	"cta_libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_constat_realite_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_blocks_constat_realite_puces_locales" (
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_constat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"realite_chiffre" varchar NOT NULL,
  	"realite_photo_id" integer,
  	"enjeu_photo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_constat_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"realite_titre" varchar NOT NULL,
  	"realite_legende" varchar NOT NULL,
  	"enjeu_titre" varchar NOT NULL,
  	"enjeu_texte" varchar NOT NULL,
  	"enjeu_citation" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_positionnement_gauche_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_blocks_positionnement_gauche_entrees_locales" (
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_positionnement_droite_entrees" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_blocks_positionnement_droite_entrees_locales" (
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_positionnement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_positionnement_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"gauche_titre" varchar NOT NULL,
  	"gauche_sous_titre" varchar NOT NULL,
  	"droite_titre" varchar NOT NULL,
  	"droite_sous_titre" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_role_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" varchar NOT NULL,
  	"accentuee" boolean DEFAULT false
  );
  
  CREATE TABLE "contact_blocks_role_etapes_locales" (
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_role" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_role_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"chapo" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_bande_poles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"avec_en_tete" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_bande_poles_locales" (
  	"surtitre" varchar,
  	"titre_haut" varchar,
  	"titre_bas" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_synergie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_synergie_locales" (
  	"surtitre" varchar,
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_grille_intitules" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_blocks_grille_intitules_locales" (
  	"texte" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_grille" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_grille_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"chapo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_escalier_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" varchar,
  	"picto" "enum_contact_blocks_escalier_cartes_picto",
  	"accentuee" boolean DEFAULT false
  );
  
  CREATE TABLE "contact_blocks_escalier_cartes_locales" (
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_escalier" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_escalier_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"chapo" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_enjeux_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"picto" "enum_contact_blocks_enjeux_cartes_picto" NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "contact_blocks_enjeux_cartes_locales" (
  	"titre" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"reponse" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_enjeux" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_enjeux_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre_haut" varchar,
  	"titre_bas" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_promesse" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_promesse_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_chiffres_statistiques" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valeur" varchar NOT NULL,
  	"unite" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_chiffres_statistiques_locales" (
  	"libelle" varchar NOT NULL,
  	"precision" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_chiffres_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"constat" varchar NOT NULL,
  	"consequence" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" numeric DEFAULT 4 NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_articles_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"libelle_action" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_blocks_faq_questions_locales" (
  	"question" varchar NOT NULL,
  	"reponse" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_faq_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_differenciation_habituelle_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_blocks_differenciation_habituelle_puces_locales" (
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_differenciation_bone_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_blocks_differenciation_bone_puces_locales" (
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_differenciation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_differenciation_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"habituelle_badge" varchar NOT NULL,
  	"habituelle_titre" varchar NOT NULL,
  	"habituelle_texte" varchar,
  	"bone_badge" varchar NOT NULL,
  	"bone_titre" varchar NOT NULL,
  	"bone_texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_partenaires_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"fichier" varchar NOT NULL,
  	"nom" varchar NOT NULL,
  	"hauteur" numeric NOT NULL
  );
  
  CREATE TABLE "contact_blocks_partenaires" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_partenaires_locales" (
  	"surtitre" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_posture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_posture_locales" (
  	"surtitre" varchar NOT NULL,
  	"refus_intitule" varchar NOT NULL,
  	"refus_citation" varchar NOT NULL,
  	"refus_precision" varchar,
  	"engagement_intitule" varchar NOT NULL,
  	"engagement_citation" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_points_entree_lignes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_blocks_points_entree_lignes_locales" (
  	"profil" varchar NOT NULL,
  	"point_entree" varchar NOT NULL,
  	"livrable" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_points_entree" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_points_entree_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"en_tetes_profil" varchar NOT NULL,
  	"en_tetes_point_entree" varchar NOT NULL,
  	"en_tetes_livrable" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_newsletter_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"chapo" varchar NOT NULL,
  	"libelle_champ" varchar NOT NULL,
  	"libelle_bouton" varchar NOT NULL,
  	"message_succes" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_texte_long" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_texte_long_locales" (
  	"surtitre" varchar,
  	"corps" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_reperes_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefixe" varchar,
  	"valeur" varchar NOT NULL,
  	"suffixe" varchar
  );
  
  CREATE TABLE "contact_blocks_reperes_cartes_locales" (
  	"libelle" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_reperes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_valeurs_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"picto" "enum_contact_blocks_valeurs_cartes_picto" NOT NULL
  );
  
  CREATE TABLE "contact_blocks_valeurs_cartes_locales" (
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_valeurs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_valeurs_locales" (
  	"surtitre" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_archetype_traits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"picto" "enum_contact_blocks_archetype_traits_picto" NOT NULL
  );
  
  CREATE TABLE "contact_blocks_archetype_traits_locales" (
  	"libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_archetype" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_archetype_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"chapo" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_equipe_statistiques" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valeur" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_equipe_statistiques_locales" (
  	"libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_equipe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_equipe_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_blocks_appel_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_chemin" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "contact_blocks_appel_action_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"chapo" varchar NOT NULL,
  	"cta_libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "contact_blocks_en_bref" ADD CONSTRAINT "contact_blocks_en_bref_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_en_bref_locales" ADD CONSTRAINT "contact_blocks_en_bref_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_en_bref"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_constat_realite_puces" ADD CONSTRAINT "contact_blocks_constat_realite_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_constat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_constat_realite_puces_locales" ADD CONSTRAINT "contact_blocks_constat_realite_puces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_constat_realite_puces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_constat" ADD CONSTRAINT "contact_blocks_constat_realite_photo_id_media_id_fk" FOREIGN KEY ("realite_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_blocks_constat" ADD CONSTRAINT "contact_blocks_constat_enjeu_photo_id_media_id_fk" FOREIGN KEY ("enjeu_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_blocks_constat" ADD CONSTRAINT "contact_blocks_constat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_constat_locales" ADD CONSTRAINT "contact_blocks_constat_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_constat"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_positionnement_gauche_entrees" ADD CONSTRAINT "contact_blocks_positionnement_gauche_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_positionnement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_positionnement_gauche_entrees_locales" ADD CONSTRAINT "contact_blocks_positionnement_gauche_entrees_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_positionnement_gauche_entrees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_positionnement_droite_entrees" ADD CONSTRAINT "contact_blocks_positionnement_droite_entrees_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_positionnement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_positionnement_droite_entrees_locales" ADD CONSTRAINT "contact_blocks_positionnement_droite_entrees_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_positionnement_droite_entrees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_positionnement" ADD CONSTRAINT "contact_blocks_positionnement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_positionnement_locales" ADD CONSTRAINT "contact_blocks_positionnement_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_positionnement"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_role_etapes" ADD CONSTRAINT "contact_blocks_role_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_role"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_role_etapes_locales" ADD CONSTRAINT "contact_blocks_role_etapes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_role_etapes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_role" ADD CONSTRAINT "contact_blocks_role_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_role_locales" ADD CONSTRAINT "contact_blocks_role_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_role"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_bande_poles" ADD CONSTRAINT "contact_blocks_bande_poles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_bande_poles_locales" ADD CONSTRAINT "contact_blocks_bande_poles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_bande_poles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_synergie" ADD CONSTRAINT "contact_blocks_synergie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_synergie_locales" ADD CONSTRAINT "contact_blocks_synergie_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_synergie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_grille_intitules" ADD CONSTRAINT "contact_blocks_grille_intitules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_grille"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_grille_intitules_locales" ADD CONSTRAINT "contact_blocks_grille_intitules_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_grille_intitules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_grille" ADD CONSTRAINT "contact_blocks_grille_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_grille_locales" ADD CONSTRAINT "contact_blocks_grille_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_grille"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_escalier_cartes" ADD CONSTRAINT "contact_blocks_escalier_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_escalier"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_escalier_cartes_locales" ADD CONSTRAINT "contact_blocks_escalier_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_escalier_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_escalier" ADD CONSTRAINT "contact_blocks_escalier_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_escalier_locales" ADD CONSTRAINT "contact_blocks_escalier_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_escalier"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_enjeux_cartes" ADD CONSTRAINT "contact_blocks_enjeux_cartes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_blocks_enjeux_cartes" ADD CONSTRAINT "contact_blocks_enjeux_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_enjeux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_enjeux_cartes_locales" ADD CONSTRAINT "contact_blocks_enjeux_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_enjeux_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_enjeux" ADD CONSTRAINT "contact_blocks_enjeux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_enjeux_locales" ADD CONSTRAINT "contact_blocks_enjeux_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_enjeux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_promesse" ADD CONSTRAINT "contact_blocks_promesse_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_promesse_locales" ADD CONSTRAINT "contact_blocks_promesse_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_promesse"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_chiffres_statistiques" ADD CONSTRAINT "contact_blocks_chiffres_statistiques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_chiffres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_chiffres_statistiques_locales" ADD CONSTRAINT "contact_blocks_chiffres_statistiques_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_chiffres_statistiques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_chiffres" ADD CONSTRAINT "contact_blocks_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_chiffres_locales" ADD CONSTRAINT "contact_blocks_chiffres_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_chiffres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_articles" ADD CONSTRAINT "contact_blocks_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_articles_locales" ADD CONSTRAINT "contact_blocks_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_faq_questions" ADD CONSTRAINT "contact_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_faq_questions_locales" ADD CONSTRAINT "contact_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_faq" ADD CONSTRAINT "contact_blocks_faq_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_blocks_faq" ADD CONSTRAINT "contact_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_faq_locales" ADD CONSTRAINT "contact_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_differenciation_habituelle_puces" ADD CONSTRAINT "contact_blocks_differenciation_habituelle_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_differenciation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_differenciation_habituelle_puces_locales" ADD CONSTRAINT "contact_blocks_differenciation_habituelle_puces_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_differenciation_habituelle_puces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_differenciation_bone_puces" ADD CONSTRAINT "contact_blocks_differenciation_bone_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_differenciation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_differenciation_bone_puces_locales" ADD CONSTRAINT "contact_blocks_differenciation_bone_puces_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_differenciation_bone_puces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_differenciation" ADD CONSTRAINT "contact_blocks_differenciation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_differenciation_locales" ADD CONSTRAINT "contact_blocks_differenciation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_differenciation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_partenaires_logos" ADD CONSTRAINT "contact_blocks_partenaires_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_partenaires"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_partenaires" ADD CONSTRAINT "contact_blocks_partenaires_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_partenaires_locales" ADD CONSTRAINT "contact_blocks_partenaires_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_partenaires"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_posture" ADD CONSTRAINT "contact_blocks_posture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_posture_locales" ADD CONSTRAINT "contact_blocks_posture_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_posture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_points_entree_lignes" ADD CONSTRAINT "contact_blocks_points_entree_lignes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_points_entree"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_points_entree_lignes_locales" ADD CONSTRAINT "contact_blocks_points_entree_lignes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_points_entree_lignes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_points_entree" ADD CONSTRAINT "contact_blocks_points_entree_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_points_entree_locales" ADD CONSTRAINT "contact_blocks_points_entree_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_points_entree"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_newsletter" ADD CONSTRAINT "contact_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_newsletter_locales" ADD CONSTRAINT "contact_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_texte_long" ADD CONSTRAINT "contact_blocks_texte_long_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_texte_long_locales" ADD CONSTRAINT "contact_blocks_texte_long_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_texte_long"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_reperes_cartes" ADD CONSTRAINT "contact_blocks_reperes_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_reperes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_reperes_cartes_locales" ADD CONSTRAINT "contact_blocks_reperes_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_reperes_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_reperes" ADD CONSTRAINT "contact_blocks_reperes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_valeurs_cartes" ADD CONSTRAINT "contact_blocks_valeurs_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_valeurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_valeurs_cartes_locales" ADD CONSTRAINT "contact_blocks_valeurs_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_valeurs_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_valeurs" ADD CONSTRAINT "contact_blocks_valeurs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_valeurs_locales" ADD CONSTRAINT "contact_blocks_valeurs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_valeurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_archetype_traits" ADD CONSTRAINT "contact_blocks_archetype_traits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_archetype"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_archetype_traits_locales" ADD CONSTRAINT "contact_blocks_archetype_traits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_archetype_traits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_archetype" ADD CONSTRAINT "contact_blocks_archetype_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_archetype_locales" ADD CONSTRAINT "contact_blocks_archetype_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_archetype"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_equipe_statistiques" ADD CONSTRAINT "contact_blocks_equipe_statistiques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_equipe"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_equipe_statistiques_locales" ADD CONSTRAINT "contact_blocks_equipe_statistiques_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_equipe_statistiques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_equipe" ADD CONSTRAINT "contact_blocks_equipe_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_blocks_equipe" ADD CONSTRAINT "contact_blocks_equipe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_equipe_locales" ADD CONSTRAINT "contact_blocks_equipe_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_equipe"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_appel_action" ADD CONSTRAINT "contact_blocks_appel_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_blocks_appel_action_locales" ADD CONSTRAINT "contact_blocks_appel_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_blocks_appel_action"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contact_blocks_en_bref_order_idx" ON "contact_blocks_en_bref" USING btree ("_order");
  CREATE INDEX "contact_blocks_en_bref_parent_id_idx" ON "contact_blocks_en_bref" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_en_bref_path_idx" ON "contact_blocks_en_bref" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_en_bref_locales_locale_parent_id_unique" ON "contact_blocks_en_bref_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_constat_realite_puces_order_idx" ON "contact_blocks_constat_realite_puces" USING btree ("_order");
  CREATE INDEX "contact_blocks_constat_realite_puces_parent_id_idx" ON "contact_blocks_constat_realite_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_constat_realite_puces_locales_locale_parent_i" ON "contact_blocks_constat_realite_puces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_constat_order_idx" ON "contact_blocks_constat" USING btree ("_order");
  CREATE INDEX "contact_blocks_constat_parent_id_idx" ON "contact_blocks_constat" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_constat_path_idx" ON "contact_blocks_constat" USING btree ("_path");
  CREATE INDEX "contact_blocks_constat_realite_realite_photo_idx" ON "contact_blocks_constat" USING btree ("realite_photo_id");
  CREATE INDEX "contact_blocks_constat_enjeu_enjeu_photo_idx" ON "contact_blocks_constat" USING btree ("enjeu_photo_id");
  CREATE UNIQUE INDEX "contact_blocks_constat_locales_locale_parent_id_unique" ON "contact_blocks_constat_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_positionnement_gauche_entrees_order_idx" ON "contact_blocks_positionnement_gauche_entrees" USING btree ("_order");
  CREATE INDEX "contact_blocks_positionnement_gauche_entrees_parent_id_idx" ON "contact_blocks_positionnement_gauche_entrees" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_positionnement_gauche_entrees_locales_locale_" ON "contact_blocks_positionnement_gauche_entrees_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_positionnement_droite_entrees_order_idx" ON "contact_blocks_positionnement_droite_entrees" USING btree ("_order");
  CREATE INDEX "contact_blocks_positionnement_droite_entrees_parent_id_idx" ON "contact_blocks_positionnement_droite_entrees" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_positionnement_droite_entrees_locales_locale_" ON "contact_blocks_positionnement_droite_entrees_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_positionnement_order_idx" ON "contact_blocks_positionnement" USING btree ("_order");
  CREATE INDEX "contact_blocks_positionnement_parent_id_idx" ON "contact_blocks_positionnement" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_positionnement_path_idx" ON "contact_blocks_positionnement" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_positionnement_locales_locale_parent_id_uniqu" ON "contact_blocks_positionnement_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_role_etapes_order_idx" ON "contact_blocks_role_etapes" USING btree ("_order");
  CREATE INDEX "contact_blocks_role_etapes_parent_id_idx" ON "contact_blocks_role_etapes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_role_etapes_locales_locale_parent_id_unique" ON "contact_blocks_role_etapes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_role_order_idx" ON "contact_blocks_role" USING btree ("_order");
  CREATE INDEX "contact_blocks_role_parent_id_idx" ON "contact_blocks_role" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_role_path_idx" ON "contact_blocks_role" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_role_locales_locale_parent_id_unique" ON "contact_blocks_role_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_bande_poles_order_idx" ON "contact_blocks_bande_poles" USING btree ("_order");
  CREATE INDEX "contact_blocks_bande_poles_parent_id_idx" ON "contact_blocks_bande_poles" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_bande_poles_path_idx" ON "contact_blocks_bande_poles" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_bande_poles_locales_locale_parent_id_unique" ON "contact_blocks_bande_poles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_synergie_order_idx" ON "contact_blocks_synergie" USING btree ("_order");
  CREATE INDEX "contact_blocks_synergie_parent_id_idx" ON "contact_blocks_synergie" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_synergie_path_idx" ON "contact_blocks_synergie" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_synergie_locales_locale_parent_id_unique" ON "contact_blocks_synergie_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_grille_intitules_order_idx" ON "contact_blocks_grille_intitules" USING btree ("_order");
  CREATE INDEX "contact_blocks_grille_intitules_parent_id_idx" ON "contact_blocks_grille_intitules" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_grille_intitules_locales_locale_parent_id_uni" ON "contact_blocks_grille_intitules_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_grille_order_idx" ON "contact_blocks_grille" USING btree ("_order");
  CREATE INDEX "contact_blocks_grille_parent_id_idx" ON "contact_blocks_grille" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_grille_path_idx" ON "contact_blocks_grille" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_grille_locales_locale_parent_id_unique" ON "contact_blocks_grille_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_escalier_cartes_order_idx" ON "contact_blocks_escalier_cartes" USING btree ("_order");
  CREATE INDEX "contact_blocks_escalier_cartes_parent_id_idx" ON "contact_blocks_escalier_cartes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_escalier_cartes_locales_locale_parent_id_uniq" ON "contact_blocks_escalier_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_escalier_order_idx" ON "contact_blocks_escalier" USING btree ("_order");
  CREATE INDEX "contact_blocks_escalier_parent_id_idx" ON "contact_blocks_escalier" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_escalier_path_idx" ON "contact_blocks_escalier" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_escalier_locales_locale_parent_id_unique" ON "contact_blocks_escalier_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_enjeux_cartes_order_idx" ON "contact_blocks_enjeux_cartes" USING btree ("_order");
  CREATE INDEX "contact_blocks_enjeux_cartes_parent_id_idx" ON "contact_blocks_enjeux_cartes" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_enjeux_cartes_image_idx" ON "contact_blocks_enjeux_cartes" USING btree ("image_id");
  CREATE UNIQUE INDEX "contact_blocks_enjeux_cartes_locales_locale_parent_id_unique" ON "contact_blocks_enjeux_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_enjeux_order_idx" ON "contact_blocks_enjeux" USING btree ("_order");
  CREATE INDEX "contact_blocks_enjeux_parent_id_idx" ON "contact_blocks_enjeux" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_enjeux_path_idx" ON "contact_blocks_enjeux" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_enjeux_locales_locale_parent_id_unique" ON "contact_blocks_enjeux_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_promesse_order_idx" ON "contact_blocks_promesse" USING btree ("_order");
  CREATE INDEX "contact_blocks_promesse_parent_id_idx" ON "contact_blocks_promesse" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_promesse_path_idx" ON "contact_blocks_promesse" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_promesse_locales_locale_parent_id_unique" ON "contact_blocks_promesse_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_chiffres_statistiques_order_idx" ON "contact_blocks_chiffres_statistiques" USING btree ("_order");
  CREATE INDEX "contact_blocks_chiffres_statistiques_parent_id_idx" ON "contact_blocks_chiffres_statistiques" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_chiffres_statistiques_locales_locale_parent_i" ON "contact_blocks_chiffres_statistiques_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_chiffres_order_idx" ON "contact_blocks_chiffres" USING btree ("_order");
  CREATE INDEX "contact_blocks_chiffres_parent_id_idx" ON "contact_blocks_chiffres" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_chiffres_path_idx" ON "contact_blocks_chiffres" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_chiffres_locales_locale_parent_id_unique" ON "contact_blocks_chiffres_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_articles_order_idx" ON "contact_blocks_articles" USING btree ("_order");
  CREATE INDEX "contact_blocks_articles_parent_id_idx" ON "contact_blocks_articles" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_articles_path_idx" ON "contact_blocks_articles" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_articles_locales_locale_parent_id_unique" ON "contact_blocks_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_faq_questions_order_idx" ON "contact_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "contact_blocks_faq_questions_parent_id_idx" ON "contact_blocks_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_faq_questions_locales_locale_parent_id_unique" ON "contact_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_faq_order_idx" ON "contact_blocks_faq" USING btree ("_order");
  CREATE INDEX "contact_blocks_faq_parent_id_idx" ON "contact_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_faq_path_idx" ON "contact_blocks_faq" USING btree ("_path");
  CREATE INDEX "contact_blocks_faq_image_idx" ON "contact_blocks_faq" USING btree ("image_id");
  CREATE UNIQUE INDEX "contact_blocks_faq_locales_locale_parent_id_unique" ON "contact_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_differenciation_habituelle_puces_order_idx" ON "contact_blocks_differenciation_habituelle_puces" USING btree ("_order");
  CREATE INDEX "contact_blocks_differenciation_habituelle_puces_parent_id_idx" ON "contact_blocks_differenciation_habituelle_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_differenciation_habituelle_puces_locales_loca" ON "contact_blocks_differenciation_habituelle_puces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_differenciation_bone_puces_order_idx" ON "contact_blocks_differenciation_bone_puces" USING btree ("_order");
  CREATE INDEX "contact_blocks_differenciation_bone_puces_parent_id_idx" ON "contact_blocks_differenciation_bone_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_differenciation_bone_puces_locales_locale_par" ON "contact_blocks_differenciation_bone_puces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_differenciation_order_idx" ON "contact_blocks_differenciation" USING btree ("_order");
  CREATE INDEX "contact_blocks_differenciation_parent_id_idx" ON "contact_blocks_differenciation" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_differenciation_path_idx" ON "contact_blocks_differenciation" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_differenciation_locales_locale_parent_id_uniq" ON "contact_blocks_differenciation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_partenaires_logos_order_idx" ON "contact_blocks_partenaires_logos" USING btree ("_order");
  CREATE INDEX "contact_blocks_partenaires_logos_parent_id_idx" ON "contact_blocks_partenaires_logos" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_partenaires_order_idx" ON "contact_blocks_partenaires" USING btree ("_order");
  CREATE INDEX "contact_blocks_partenaires_parent_id_idx" ON "contact_blocks_partenaires" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_partenaires_path_idx" ON "contact_blocks_partenaires" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_partenaires_locales_locale_parent_id_unique" ON "contact_blocks_partenaires_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_posture_order_idx" ON "contact_blocks_posture" USING btree ("_order");
  CREATE INDEX "contact_blocks_posture_parent_id_idx" ON "contact_blocks_posture" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_posture_path_idx" ON "contact_blocks_posture" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_posture_locales_locale_parent_id_unique" ON "contact_blocks_posture_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_points_entree_lignes_order_idx" ON "contact_blocks_points_entree_lignes" USING btree ("_order");
  CREATE INDEX "contact_blocks_points_entree_lignes_parent_id_idx" ON "contact_blocks_points_entree_lignes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_points_entree_lignes_locales_locale_parent_id" ON "contact_blocks_points_entree_lignes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_points_entree_order_idx" ON "contact_blocks_points_entree" USING btree ("_order");
  CREATE INDEX "contact_blocks_points_entree_parent_id_idx" ON "contact_blocks_points_entree" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_points_entree_path_idx" ON "contact_blocks_points_entree" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_points_entree_locales_locale_parent_id_unique" ON "contact_blocks_points_entree_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_newsletter_order_idx" ON "contact_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "contact_blocks_newsletter_parent_id_idx" ON "contact_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_newsletter_path_idx" ON "contact_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_newsletter_locales_locale_parent_id_unique" ON "contact_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_texte_long_order_idx" ON "contact_blocks_texte_long" USING btree ("_order");
  CREATE INDEX "contact_blocks_texte_long_parent_id_idx" ON "contact_blocks_texte_long" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_texte_long_path_idx" ON "contact_blocks_texte_long" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_texte_long_locales_locale_parent_id_unique" ON "contact_blocks_texte_long_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_reperes_cartes_order_idx" ON "contact_blocks_reperes_cartes" USING btree ("_order");
  CREATE INDEX "contact_blocks_reperes_cartes_parent_id_idx" ON "contact_blocks_reperes_cartes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_reperes_cartes_locales_locale_parent_id_uniqu" ON "contact_blocks_reperes_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_reperes_order_idx" ON "contact_blocks_reperes" USING btree ("_order");
  CREATE INDEX "contact_blocks_reperes_parent_id_idx" ON "contact_blocks_reperes" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_reperes_path_idx" ON "contact_blocks_reperes" USING btree ("_path");
  CREATE INDEX "contact_blocks_valeurs_cartes_order_idx" ON "contact_blocks_valeurs_cartes" USING btree ("_order");
  CREATE INDEX "contact_blocks_valeurs_cartes_parent_id_idx" ON "contact_blocks_valeurs_cartes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_valeurs_cartes_locales_locale_parent_id_uniqu" ON "contact_blocks_valeurs_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_valeurs_order_idx" ON "contact_blocks_valeurs" USING btree ("_order");
  CREATE INDEX "contact_blocks_valeurs_parent_id_idx" ON "contact_blocks_valeurs" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_valeurs_path_idx" ON "contact_blocks_valeurs" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_valeurs_locales_locale_parent_id_unique" ON "contact_blocks_valeurs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_archetype_traits_order_idx" ON "contact_blocks_archetype_traits" USING btree ("_order");
  CREATE INDEX "contact_blocks_archetype_traits_parent_id_idx" ON "contact_blocks_archetype_traits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_archetype_traits_locales_locale_parent_id_uni" ON "contact_blocks_archetype_traits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_archetype_order_idx" ON "contact_blocks_archetype" USING btree ("_order");
  CREATE INDEX "contact_blocks_archetype_parent_id_idx" ON "contact_blocks_archetype" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_archetype_path_idx" ON "contact_blocks_archetype" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_archetype_locales_locale_parent_id_unique" ON "contact_blocks_archetype_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_equipe_statistiques_order_idx" ON "contact_blocks_equipe_statistiques" USING btree ("_order");
  CREATE INDEX "contact_blocks_equipe_statistiques_parent_id_idx" ON "contact_blocks_equipe_statistiques" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_blocks_equipe_statistiques_locales_locale_parent_id_" ON "contact_blocks_equipe_statistiques_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_equipe_order_idx" ON "contact_blocks_equipe" USING btree ("_order");
  CREATE INDEX "contact_blocks_equipe_parent_id_idx" ON "contact_blocks_equipe" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_equipe_path_idx" ON "contact_blocks_equipe" USING btree ("_path");
  CREATE INDEX "contact_blocks_equipe_image_idx" ON "contact_blocks_equipe" USING btree ("image_id");
  CREATE UNIQUE INDEX "contact_blocks_equipe_locales_locale_parent_id_unique" ON "contact_blocks_equipe_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_blocks_appel_action_order_idx" ON "contact_blocks_appel_action" USING btree ("_order");
  CREATE INDEX "contact_blocks_appel_action_parent_id_idx" ON "contact_blocks_appel_action" USING btree ("_parent_id");
  CREATE INDEX "contact_blocks_appel_action_path_idx" ON "contact_blocks_appel_action" USING btree ("_path");
  CREATE UNIQUE INDEX "contact_blocks_appel_action_locales_locale_parent_id_unique" ON "contact_blocks_appel_action_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "contact_blocks_en_bref" CASCADE;
  DROP TABLE "contact_blocks_en_bref_locales" CASCADE;
  DROP TABLE "contact_blocks_constat_realite_puces" CASCADE;
  DROP TABLE "contact_blocks_constat_realite_puces_locales" CASCADE;
  DROP TABLE "contact_blocks_constat" CASCADE;
  DROP TABLE "contact_blocks_constat_locales" CASCADE;
  DROP TABLE "contact_blocks_positionnement_gauche_entrees" CASCADE;
  DROP TABLE "contact_blocks_positionnement_gauche_entrees_locales" CASCADE;
  DROP TABLE "contact_blocks_positionnement_droite_entrees" CASCADE;
  DROP TABLE "contact_blocks_positionnement_droite_entrees_locales" CASCADE;
  DROP TABLE "contact_blocks_positionnement" CASCADE;
  DROP TABLE "contact_blocks_positionnement_locales" CASCADE;
  DROP TABLE "contact_blocks_role_etapes" CASCADE;
  DROP TABLE "contact_blocks_role_etapes_locales" CASCADE;
  DROP TABLE "contact_blocks_role" CASCADE;
  DROP TABLE "contact_blocks_role_locales" CASCADE;
  DROP TABLE "contact_blocks_bande_poles" CASCADE;
  DROP TABLE "contact_blocks_bande_poles_locales" CASCADE;
  DROP TABLE "contact_blocks_synergie" CASCADE;
  DROP TABLE "contact_blocks_synergie_locales" CASCADE;
  DROP TABLE "contact_blocks_grille_intitules" CASCADE;
  DROP TABLE "contact_blocks_grille_intitules_locales" CASCADE;
  DROP TABLE "contact_blocks_grille" CASCADE;
  DROP TABLE "contact_blocks_grille_locales" CASCADE;
  DROP TABLE "contact_blocks_escalier_cartes" CASCADE;
  DROP TABLE "contact_blocks_escalier_cartes_locales" CASCADE;
  DROP TABLE "contact_blocks_escalier" CASCADE;
  DROP TABLE "contact_blocks_escalier_locales" CASCADE;
  DROP TABLE "contact_blocks_enjeux_cartes" CASCADE;
  DROP TABLE "contact_blocks_enjeux_cartes_locales" CASCADE;
  DROP TABLE "contact_blocks_enjeux" CASCADE;
  DROP TABLE "contact_blocks_enjeux_locales" CASCADE;
  DROP TABLE "contact_blocks_promesse" CASCADE;
  DROP TABLE "contact_blocks_promesse_locales" CASCADE;
  DROP TABLE "contact_blocks_chiffres_statistiques" CASCADE;
  DROP TABLE "contact_blocks_chiffres_statistiques_locales" CASCADE;
  DROP TABLE "contact_blocks_chiffres" CASCADE;
  DROP TABLE "contact_blocks_chiffres_locales" CASCADE;
  DROP TABLE "contact_blocks_articles" CASCADE;
  DROP TABLE "contact_blocks_articles_locales" CASCADE;
  DROP TABLE "contact_blocks_faq_questions" CASCADE;
  DROP TABLE "contact_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "contact_blocks_faq" CASCADE;
  DROP TABLE "contact_blocks_faq_locales" CASCADE;
  DROP TABLE "contact_blocks_differenciation_habituelle_puces" CASCADE;
  DROP TABLE "contact_blocks_differenciation_habituelle_puces_locales" CASCADE;
  DROP TABLE "contact_blocks_differenciation_bone_puces" CASCADE;
  DROP TABLE "contact_blocks_differenciation_bone_puces_locales" CASCADE;
  DROP TABLE "contact_blocks_differenciation" CASCADE;
  DROP TABLE "contact_blocks_differenciation_locales" CASCADE;
  DROP TABLE "contact_blocks_partenaires_logos" CASCADE;
  DROP TABLE "contact_blocks_partenaires" CASCADE;
  DROP TABLE "contact_blocks_partenaires_locales" CASCADE;
  DROP TABLE "contact_blocks_posture" CASCADE;
  DROP TABLE "contact_blocks_posture_locales" CASCADE;
  DROP TABLE "contact_blocks_points_entree_lignes" CASCADE;
  DROP TABLE "contact_blocks_points_entree_lignes_locales" CASCADE;
  DROP TABLE "contact_blocks_points_entree" CASCADE;
  DROP TABLE "contact_blocks_points_entree_locales" CASCADE;
  DROP TABLE "contact_blocks_newsletter" CASCADE;
  DROP TABLE "contact_blocks_newsletter_locales" CASCADE;
  DROP TABLE "contact_blocks_texte_long" CASCADE;
  DROP TABLE "contact_blocks_texte_long_locales" CASCADE;
  DROP TABLE "contact_blocks_reperes_cartes" CASCADE;
  DROP TABLE "contact_blocks_reperes_cartes_locales" CASCADE;
  DROP TABLE "contact_blocks_reperes" CASCADE;
  DROP TABLE "contact_blocks_valeurs_cartes" CASCADE;
  DROP TABLE "contact_blocks_valeurs_cartes_locales" CASCADE;
  DROP TABLE "contact_blocks_valeurs" CASCADE;
  DROP TABLE "contact_blocks_valeurs_locales" CASCADE;
  DROP TABLE "contact_blocks_archetype_traits" CASCADE;
  DROP TABLE "contact_blocks_archetype_traits_locales" CASCADE;
  DROP TABLE "contact_blocks_archetype" CASCADE;
  DROP TABLE "contact_blocks_archetype_locales" CASCADE;
  DROP TABLE "contact_blocks_equipe_statistiques" CASCADE;
  DROP TABLE "contact_blocks_equipe_statistiques_locales" CASCADE;
  DROP TABLE "contact_blocks_equipe" CASCADE;
  DROP TABLE "contact_blocks_equipe_locales" CASCADE;
  DROP TABLE "contact_blocks_appel_action" CASCADE;
  DROP TABLE "contact_blocks_appel_action_locales" CASCADE;
  DROP TYPE "public"."enum_contact_blocks_escalier_cartes_picto";
  DROP TYPE "public"."enum_contact_blocks_enjeux_cartes_picto";
  DROP TYPE "public"."enum_contact_blocks_valeurs_cartes_picto";
  DROP TYPE "public"."enum_contact_blocks_archetype_traits_picto";`)
}
