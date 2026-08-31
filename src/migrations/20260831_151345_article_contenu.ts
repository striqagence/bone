import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "posts_blocks_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_articles_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"libelle_action" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "posts_blocks_faq_questions_locales" (
  	"question" varchar,
  	"reponse" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_faq_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "posts_blocks_appel_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_chemin" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_appel_action_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"chapo" varchar,
  	"cta_libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_articles_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"libelle_action" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq_questions_locales" (
  	"question" varchar,
  	"reponse" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_blocks_appel_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_chemin" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_appel_action_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"chapo" varchar,
  	"cta_libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "blog_locales" ADD COLUMN "libelle_sommaire" varchar NOT NULL DEFAULT '';
  ALTER TABLE "blog_locales" ALTER COLUMN "libelle_sommaire" DROP DEFAULT;
  ALTER TABLE "blog_locales" ADD COLUMN "libelle_faq" varchar NOT NULL DEFAULT '';
  ALTER TABLE "blog_locales" ALTER COLUMN "libelle_faq" DROP DEFAULT;
  ALTER TABLE "blog_locales" ADD COLUMN "libelle_partage_linkedin" varchar NOT NULL DEFAULT '';
  ALTER TABLE "blog_locales" ALTER COLUMN "libelle_partage_linkedin" DROP DEFAULT;
  ALTER TABLE "blog_locales" ADD COLUMN "libelle_copier_lien" varchar NOT NULL DEFAULT '';
  ALTER TABLE "blog_locales" ALTER COLUMN "libelle_copier_lien" DROP DEFAULT;
  ALTER TABLE "blog_locales" ADD COLUMN "libelle_lien_copie" varchar NOT NULL DEFAULT '';
  ALTER TABLE "blog_locales" ALTER COLUMN "libelle_lien_copie" DROP DEFAULT;
  ALTER TABLE "posts_blocks_articles" ADD CONSTRAINT "posts_blocks_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_articles_locales" ADD CONSTRAINT "posts_blocks_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_questions" ADD CONSTRAINT "posts_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_questions_locales" ADD CONSTRAINT "posts_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq" ADD CONSTRAINT "posts_blocks_faq_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq" ADD CONSTRAINT "posts_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_locales" ADD CONSTRAINT "posts_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_appel_action" ADD CONSTRAINT "posts_blocks_appel_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_appel_action_locales" ADD CONSTRAINT "posts_blocks_appel_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_appel_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_articles" ADD CONSTRAINT "_posts_v_blocks_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_articles_locales" ADD CONSTRAINT "_posts_v_blocks_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_questions" ADD CONSTRAINT "_posts_v_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_questions_locales" ADD CONSTRAINT "_posts_v_blocks_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq" ADD CONSTRAINT "_posts_v_blocks_faq_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq" ADD CONSTRAINT "_posts_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_locales" ADD CONSTRAINT "_posts_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_appel_action" ADD CONSTRAINT "_posts_v_blocks_appel_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_appel_action_locales" ADD CONSTRAINT "_posts_v_blocks_appel_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_appel_action"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_blocks_articles_order_idx" ON "posts_blocks_articles" USING btree ("_order");
  CREATE INDEX "posts_blocks_articles_parent_id_idx" ON "posts_blocks_articles" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_articles_path_idx" ON "posts_blocks_articles" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_articles_locales_locale_parent_id_unique" ON "posts_blocks_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_faq_questions_order_idx" ON "posts_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_questions_parent_id_idx" ON "posts_blocks_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "posts_blocks_faq_questions_locales_locale_parent_id_unique" ON "posts_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_faq_order_idx" ON "posts_blocks_faq" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_parent_id_idx" ON "posts_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_path_idx" ON "posts_blocks_faq" USING btree ("_path");
  CREATE INDEX "posts_blocks_faq_image_idx" ON "posts_blocks_faq" USING btree ("image_id");
  CREATE UNIQUE INDEX "posts_blocks_faq_locales_locale_parent_id_unique" ON "posts_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_blocks_appel_action_order_idx" ON "posts_blocks_appel_action" USING btree ("_order");
  CREATE INDEX "posts_blocks_appel_action_parent_id_idx" ON "posts_blocks_appel_action" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_appel_action_path_idx" ON "posts_blocks_appel_action" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_blocks_appel_action_locales_locale_parent_id_unique" ON "posts_blocks_appel_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_articles_order_idx" ON "_posts_v_blocks_articles" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_articles_parent_id_idx" ON "_posts_v_blocks_articles" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_articles_path_idx" ON "_posts_v_blocks_articles" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_articles_locales_locale_parent_id_unique" ON "_posts_v_blocks_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_questions_order_idx" ON "_posts_v_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_questions_parent_id_idx" ON "_posts_v_blocks_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_faq_questions_locales_locale_parent_id_uniqu" ON "_posts_v_blocks_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_order_idx" ON "_posts_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_parent_id_idx" ON "_posts_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_path_idx" ON "_posts_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_faq_image_idx" ON "_posts_v_blocks_faq" USING btree ("image_id");
  CREATE UNIQUE INDEX "_posts_v_blocks_faq_locales_locale_parent_id_unique" ON "_posts_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_blocks_appel_action_order_idx" ON "_posts_v_blocks_appel_action" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_appel_action_parent_id_idx" ON "_posts_v_blocks_appel_action" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_appel_action_path_idx" ON "_posts_v_blocks_appel_action" USING btree ("_path");
  CREATE UNIQUE INDEX "_posts_v_blocks_appel_action_locales_locale_parent_id_unique" ON "_posts_v_blocks_appel_action_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "posts_blocks_articles" CASCADE;
  DROP TABLE "posts_blocks_articles_locales" CASCADE;
  DROP TABLE "posts_blocks_faq_questions" CASCADE;
  DROP TABLE "posts_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "posts_blocks_faq" CASCADE;
  DROP TABLE "posts_blocks_faq_locales" CASCADE;
  DROP TABLE "posts_blocks_appel_action" CASCADE;
  DROP TABLE "posts_blocks_appel_action_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_articles" CASCADE;
  DROP TABLE "_posts_v_blocks_articles_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_questions" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_questions_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_faq" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_posts_v_blocks_appel_action" CASCADE;
  DROP TABLE "_posts_v_blocks_appel_action_locales" CASCADE;
  ALTER TABLE "blog_locales" DROP COLUMN "libelle_sommaire";
  ALTER TABLE "blog_locales" DROP COLUMN "libelle_faq";
  ALTER TABLE "blog_locales" DROP COLUMN "libelle_partage_linkedin";
  ALTER TABLE "blog_locales" DROP COLUMN "libelle_copier_lien";
  ALTER TABLE "blog_locales" DROP COLUMN "libelle_lien_copie";`)
}
