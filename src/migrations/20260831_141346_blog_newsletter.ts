import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_abonnes_langue" AS ENUM('fr', 'en');
  CREATE TABLE "pages_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_newsletter_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"chapo" varchar,
  	"libelle_champ" varchar,
  	"libelle_bouton" varchar,
  	"message_succes" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"chapo" varchar,
  	"libelle_champ" varchar,
  	"libelle_bouton" varchar,
  	"message_succes" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "abonnes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"langue" "enum_abonnes_langue",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog_locales" (
  	"surtitre_une" varchar NOT NULL,
  	"libelle_lire" varchar NOT NULL,
  	"libelle_tous_sujets" varchar NOT NULL,
  	"gabarit_compte" varchar NOT NULL,
  	"libelle_charger" varchar NOT NULL,
  	"message_vide" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "categories_locales" ADD COLUMN "libelle_long" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "abonnes_id" integer;
  ALTER TABLE "pages_blocks_newsletter" ADD CONSTRAINT "pages_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_newsletter_locales" ADD CONSTRAINT "pages_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter" ADD CONSTRAINT "_pages_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter_locales" ADD CONSTRAINT "_pages_v_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_locales" ADD CONSTRAINT "blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_newsletter_order_idx" ON "pages_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "pages_blocks_newsletter_parent_id_idx" ON "pages_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_newsletter_path_idx" ON "pages_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_newsletter_locales_locale_parent_id_unique" ON "pages_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_order_idx" ON "_pages_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_parent_id_idx" ON "_pages_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_path_idx" ON "_pages_v_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_newsletter_locales_locale_parent_id_unique" ON "_pages_v_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "abonnes_email_idx" ON "abonnes" USING btree ("email");
  CREATE INDEX "abonnes_updated_at_idx" ON "abonnes" USING btree ("updated_at");
  CREATE INDEX "abonnes_created_at_idx" ON "abonnes" USING btree ("created_at");
  CREATE UNIQUE INDEX "blog_locales_locale_parent_id_unique" ON "blog_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_abonnes_fk" FOREIGN KEY ("abonnes_id") REFERENCES "public"."abonnes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_abonnes_id_idx" ON "payload_locked_documents_rels" USING btree ("abonnes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_newsletter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_newsletter_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_newsletter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_newsletter_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "abonnes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_newsletter" CASCADE;
  DROP TABLE "pages_blocks_newsletter_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter_locales" CASCADE;
  DROP TABLE "abonnes" CASCADE;
  DROP TABLE "blog" CASCADE;
  DROP TABLE "blog_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_abonnes_fk";
  
  DROP INDEX "payload_locked_documents_rels_abonnes_id_idx";
  ALTER TABLE "categories_locales" DROP COLUMN "libelle_long";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "abonnes_id";
  DROP TYPE "public"."enum_abonnes_langue";`)
}
