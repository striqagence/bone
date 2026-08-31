import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_enjeux_cartes_picto" AS ENUM('antenne', 'securite', 'balance', 'boussole', 'dette', 'alerte', 'liens');
  CREATE TYPE "public"."enum__pages_v_blocks_enjeux_cartes_picto" AS ENUM('antenne', 'securite', 'balance', 'boussole', 'dette', 'alerte', 'liens');
  CREATE TABLE "pages_blocks_enjeux_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"picto" "enum_pages_blocks_enjeux_cartes_picto",
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_enjeux_cartes_locales" (
  	"titre" varchar,
  	"description" varchar,
  	"reponse" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_enjeux" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_enjeux_locales" (
  	"surtitre" varchar,
  	"titre_haut" varchar,
  	"titre_bas" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_enjeux_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"picto" "enum__pages_v_blocks_enjeux_cartes_picto",
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_enjeux_cartes_locales" (
  	"titre" varchar,
  	"description" varchar,
  	"reponse" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_enjeux" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_enjeux_locales" (
  	"surtitre" varchar,
  	"titre_haut" varchar,
  	"titre_bas" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_enjeux_cartes" ADD CONSTRAINT "pages_blocks_enjeux_cartes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_enjeux_cartes" ADD CONSTRAINT "pages_blocks_enjeux_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_enjeux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_enjeux_cartes_locales" ADD CONSTRAINT "pages_blocks_enjeux_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_enjeux_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_enjeux" ADD CONSTRAINT "pages_blocks_enjeux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_enjeux_locales" ADD CONSTRAINT "pages_blocks_enjeux_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_enjeux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enjeux_cartes" ADD CONSTRAINT "_pages_v_blocks_enjeux_cartes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enjeux_cartes" ADD CONSTRAINT "_pages_v_blocks_enjeux_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_enjeux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enjeux_cartes_locales" ADD CONSTRAINT "_pages_v_blocks_enjeux_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_enjeux_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enjeux" ADD CONSTRAINT "_pages_v_blocks_enjeux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enjeux_locales" ADD CONSTRAINT "_pages_v_blocks_enjeux_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_enjeux"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_enjeux_cartes_order_idx" ON "pages_blocks_enjeux_cartes" USING btree ("_order");
  CREATE INDEX "pages_blocks_enjeux_cartes_parent_id_idx" ON "pages_blocks_enjeux_cartes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_enjeux_cartes_image_idx" ON "pages_blocks_enjeux_cartes" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_enjeux_cartes_locales_locale_parent_id_unique" ON "pages_blocks_enjeux_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_enjeux_order_idx" ON "pages_blocks_enjeux" USING btree ("_order");
  CREATE INDEX "pages_blocks_enjeux_parent_id_idx" ON "pages_blocks_enjeux" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_enjeux_path_idx" ON "pages_blocks_enjeux" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_enjeux_locales_locale_parent_id_unique" ON "pages_blocks_enjeux_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_enjeux_cartes_order_idx" ON "_pages_v_blocks_enjeux_cartes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_enjeux_cartes_parent_id_idx" ON "_pages_v_blocks_enjeux_cartes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_enjeux_cartes_image_idx" ON "_pages_v_blocks_enjeux_cartes" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_enjeux_cartes_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_enjeux_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_enjeux_order_idx" ON "_pages_v_blocks_enjeux" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_enjeux_parent_id_idx" ON "_pages_v_blocks_enjeux" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_enjeux_path_idx" ON "_pages_v_blocks_enjeux" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_enjeux_locales_locale_parent_id_unique" ON "_pages_v_blocks_enjeux_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_enjeux_cartes" CASCADE;
  DROP TABLE "pages_blocks_enjeux_cartes_locales" CASCADE;
  DROP TABLE "pages_blocks_enjeux" CASCADE;
  DROP TABLE "pages_blocks_enjeux_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_enjeux_cartes" CASCADE;
  DROP TABLE "_pages_v_blocks_enjeux_cartes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_enjeux" CASCADE;
  DROP TABLE "_pages_v_blocks_enjeux_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_enjeux_cartes_picto";
  DROP TYPE "public"."enum__pages_v_blocks_enjeux_cartes_picto";`)
}
