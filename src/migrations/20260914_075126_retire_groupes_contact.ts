import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "contact_faq_questions" CASCADE;
  DROP TABLE "contact_faq_questions_locales" CASCADE;
  ALTER TABLE "contact" DROP CONSTRAINT "contact_faq_image_id_media_id_fk";
  
  DROP INDEX "contact_faq_faq_image_idx";
  ALTER TABLE "contact" DROP COLUMN "faq_image_id";
  ALTER TABLE "contact" DROP COLUMN "appel_cta_url";
  ALTER TABLE "contact_locales" DROP COLUMN "faq_surtitre";
  ALTER TABLE "contact_locales" DROP COLUMN "faq_titre";
  ALTER TABLE "contact_locales" DROP COLUMN "appel_surtitre";
  ALTER TABLE "contact_locales" DROP COLUMN "appel_titre";
  ALTER TABLE "contact_locales" DROP COLUMN "appel_chapo";
  ALTER TABLE "contact_locales" DROP COLUMN "appel_cta_libelle";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "contact" ADD COLUMN "faq_image_id" integer;
  ALTER TABLE "contact" ADD COLUMN "appel_cta_url" varchar NOT NULL;
  ALTER TABLE "contact_locales" ADD COLUMN "faq_surtitre" varchar NOT NULL;
  ALTER TABLE "contact_locales" ADD COLUMN "faq_titre" varchar NOT NULL;
  ALTER TABLE "contact_locales" ADD COLUMN "appel_surtitre" varchar NOT NULL;
  ALTER TABLE "contact_locales" ADD COLUMN "appel_titre" varchar NOT NULL;
  ALTER TABLE "contact_locales" ADD COLUMN "appel_chapo" varchar NOT NULL;
  ALTER TABLE "contact_locales" ADD COLUMN "appel_cta_libelle" varchar NOT NULL;
  ALTER TABLE "contact_faq_questions" ADD CONSTRAINT "contact_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_faq_questions_locales" ADD CONSTRAINT "contact_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contact_faq_questions_order_idx" ON "contact_faq_questions" USING btree ("_order");
  CREATE INDEX "contact_faq_questions_parent_id_idx" ON "contact_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_faq_questions_locales_locale_parent_id_unique" ON "contact_faq_questions_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "contact" ADD CONSTRAINT "contact_faq_image_id_media_id_fk" FOREIGN KEY ("faq_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "contact_faq_faq_image_idx" ON "contact" USING btree ("faq_image_id");`)
}
