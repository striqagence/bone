import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "contact_profils" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valeur" varchar NOT NULL
  );
  
  CREATE TABLE "contact_profils_locales" (
  	"libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_faq_questions_locales" (
  	"question" varchar NOT NULL,
  	"reponse" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"carte_id" integer,
  	"faq_image_id" integer,
  	"appel_cta_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_locales" (
  	"surtitre" varchar NOT NULL,
  	"titre" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"mention_champs" varchar NOT NULL,
  	"libelles_vous_etes" varchar NOT NULL,
  	"libelles_nom" varchar NOT NULL,
  	"libelles_prenom" varchar NOT NULL,
  	"libelles_email" varchar NOT NULL,
  	"libelles_telephone" varchar NOT NULL,
  	"libelles_contexte" varchar NOT NULL,
  	"libelles_contexte_placeholder" varchar NOT NULL,
  	"libelles_envoyer" varchar NOT NULL,
  	"libelles_mention_legale" varchar NOT NULL,
  	"libelles_succes" varchar NOT NULL,
  	"libelles_erreur" varchar NOT NULL,
  	"coordonnees_badge" varchar NOT NULL,
  	"coordonnees_adresse" varchar NOT NULL,
  	"coordonnees_contact" varchar NOT NULL,
  	"faq_surtitre" varchar NOT NULL,
  	"faq_titre" varchar NOT NULL,
  	"appel_surtitre" varchar NOT NULL,
  	"appel_titre" varchar NOT NULL,
  	"appel_chapo" varchar NOT NULL,
  	"appel_cta_libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "contact_profils" ADD CONSTRAINT "contact_profils_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_profils_locales" ADD CONSTRAINT "contact_profils_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_profils"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_faq_questions" ADD CONSTRAINT "contact_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_faq_questions_locales" ADD CONSTRAINT "contact_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_carte_id_media_id_fk" FOREIGN KEY ("carte_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_faq_image_id_media_id_fk" FOREIGN KEY ("faq_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_locales" ADD CONSTRAINT "contact_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contact_profils_order_idx" ON "contact_profils" USING btree ("_order");
  CREATE INDEX "contact_profils_parent_id_idx" ON "contact_profils" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_profils_locales_locale_parent_id_unique" ON "contact_profils_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_faq_questions_order_idx" ON "contact_faq_questions" USING btree ("_order");
  CREATE INDEX "contact_faq_questions_parent_id_idx" ON "contact_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_faq_questions_locales_locale_parent_id_unique" ON "contact_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_carte_idx" ON "contact" USING btree ("carte_id");
  CREATE INDEX "contact_faq_faq_image_idx" ON "contact" USING btree ("faq_image_id");
  CREATE UNIQUE INDEX "contact_locales_locale_parent_id_unique" ON "contact_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "contact_profils" CASCADE;
  DROP TABLE "contact_profils_locales" CASCADE;
  DROP TABLE "contact_faq_questions" CASCADE;
  DROP TABLE "contact_faq_questions_locales" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "contact_locales" CASCADE;`)
}
