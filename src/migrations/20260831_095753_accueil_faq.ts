import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "accueil_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accueil_faq_questions_locales" (
  	"question" varchar NOT NULL,
  	"reponse" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "accueil" ADD COLUMN "faq_image_id" integer;
  ALTER TABLE "accueil_locales" ADD COLUMN "faq_surtitre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "faq_surtitre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "faq_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "faq_titre" DROP DEFAULT;
  ALTER TABLE "accueil_faq_questions" ADD CONSTRAINT "accueil_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_faq_questions_locales" ADD CONSTRAINT "accueil_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "accueil_faq_questions_order_idx" ON "accueil_faq_questions" USING btree ("_order");
  CREATE INDEX "accueil_faq_questions_parent_id_idx" ON "accueil_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_faq_questions_locales_locale_parent_id_unique" ON "accueil_faq_questions_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "accueil" ADD CONSTRAINT "accueil_faq_image_id_media_id_fk" FOREIGN KEY ("faq_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "accueil_faq_faq_image_idx" ON "accueil" USING btree ("faq_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "accueil_faq_questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "accueil_faq_questions_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "accueil_faq_questions" CASCADE;
  DROP TABLE "accueil_faq_questions_locales" CASCADE;
  ALTER TABLE "accueil" DROP CONSTRAINT "accueil_faq_image_id_media_id_fk";
  
  DROP INDEX "accueil_faq_faq_image_idx";
  ALTER TABLE "accueil" DROP COLUMN "faq_image_id";
  ALTER TABLE "accueil_locales" DROP COLUMN "faq_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "faq_titre";`)
}
