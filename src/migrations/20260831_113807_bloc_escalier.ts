import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_escalier_cartes_picto" AS ENUM('antenne', 'stockage', 'systemes');
  CREATE TYPE "public"."enum__pages_v_blocks_escalier_cartes_picto" AS ENUM('antenne', 'stockage', 'systemes');
  CREATE TABLE "pages_blocks_escalier_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" varchar,
  	"picto" "enum_pages_blocks_escalier_cartes_picto",
  	"accentuee" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_escalier_cartes_locales" (
  	"titre" varchar,
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_escalier" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_escalier_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"chapo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_escalier_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"numero" varchar,
  	"picto" "enum__pages_v_blocks_escalier_cartes_picto",
  	"accentuee" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_escalier_cartes_locales" (
  	"titre" varchar,
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_escalier" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_escalier_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"chapo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_escalier_cartes" ADD CONSTRAINT "pages_blocks_escalier_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_escalier"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_escalier_cartes_locales" ADD CONSTRAINT "pages_blocks_escalier_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_escalier_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_escalier" ADD CONSTRAINT "pages_blocks_escalier_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_escalier_locales" ADD CONSTRAINT "pages_blocks_escalier_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_escalier"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_escalier_cartes" ADD CONSTRAINT "_pages_v_blocks_escalier_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_escalier"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_escalier_cartes_locales" ADD CONSTRAINT "_pages_v_blocks_escalier_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_escalier_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_escalier" ADD CONSTRAINT "_pages_v_blocks_escalier_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_escalier_locales" ADD CONSTRAINT "_pages_v_blocks_escalier_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_escalier"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_escalier_cartes_order_idx" ON "pages_blocks_escalier_cartes" USING btree ("_order");
  CREATE INDEX "pages_blocks_escalier_cartes_parent_id_idx" ON "pages_blocks_escalier_cartes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_escalier_cartes_locales_locale_parent_id_unique" ON "pages_blocks_escalier_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_escalier_order_idx" ON "pages_blocks_escalier" USING btree ("_order");
  CREATE INDEX "pages_blocks_escalier_parent_id_idx" ON "pages_blocks_escalier" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_escalier_path_idx" ON "pages_blocks_escalier" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_escalier_locales_locale_parent_id_unique" ON "pages_blocks_escalier_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_escalier_cartes_order_idx" ON "_pages_v_blocks_escalier_cartes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_escalier_cartes_parent_id_idx" ON "_pages_v_blocks_escalier_cartes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_escalier_cartes_locales_locale_parent_id_uni" ON "_pages_v_blocks_escalier_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_escalier_order_idx" ON "_pages_v_blocks_escalier" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_escalier_parent_id_idx" ON "_pages_v_blocks_escalier" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_escalier_path_idx" ON "_pages_v_blocks_escalier" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_escalier_locales_locale_parent_id_unique" ON "_pages_v_blocks_escalier_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_escalier_cartes" CASCADE;
  DROP TABLE "pages_blocks_escalier_cartes_locales" CASCADE;
  DROP TABLE "pages_blocks_escalier" CASCADE;
  DROP TABLE "pages_blocks_escalier_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_escalier_cartes" CASCADE;
  DROP TABLE "_pages_v_blocks_escalier_cartes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_escalier" CASCADE;
  DROP TABLE "_pages_v_blocks_escalier_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_escalier_cartes_picto";
  DROP TYPE "public"."enum__pages_v_blocks_escalier_cartes_picto";`)
}
