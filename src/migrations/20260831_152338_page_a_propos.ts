import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_valeurs_cartes_picto" AS ENUM('diplome', 'eclair', 'boucle', 'cible', 'bouclier', 'direction', 'ampoule', 'personne');
  CREATE TYPE "public"."enum_pages_blocks_archetype_traits_picto" AS ENUM('diplome', 'eclair', 'boucle', 'cible', 'bouclier', 'direction', 'ampoule', 'personne');
  CREATE TYPE "public"."enum__pages_v_blocks_valeurs_cartes_picto" AS ENUM('diplome', 'eclair', 'boucle', 'cible', 'bouclier', 'direction', 'ampoule', 'personne');
  CREATE TYPE "public"."enum__pages_v_blocks_archetype_traits_picto" AS ENUM('diplome', 'eclair', 'boucle', 'cible', 'bouclier', 'direction', 'ampoule', 'personne');
  CREATE TABLE "pages_blocks_reperes_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefixe" varchar,
  	"valeur" varchar,
  	"suffixe" varchar
  );
  
  CREATE TABLE "pages_blocks_reperes_cartes_locales" (
  	"libelle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_reperes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_valeurs_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"picto" "enum_pages_blocks_valeurs_cartes_picto"
  );
  
  CREATE TABLE "pages_blocks_valeurs_cartes_locales" (
  	"titre" varchar,
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_valeurs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_valeurs_locales" (
  	"surtitre" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_archetype_traits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"picto" "enum_pages_blocks_archetype_traits_picto"
  );
  
  CREATE TABLE "pages_blocks_archetype_traits_locales" (
  	"libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_archetype" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_archetype_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"chapo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_equipe_statistiques" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valeur" varchar
  );
  
  CREATE TABLE "pages_blocks_equipe_statistiques_locales" (
  	"libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_equipe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_equipe_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_reperes_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefixe" varchar,
  	"valeur" varchar,
  	"suffixe" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reperes_cartes_locales" (
  	"libelle" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_reperes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_valeurs_cartes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"picto" "enum__pages_v_blocks_valeurs_cartes_picto",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_valeurs_cartes_locales" (
  	"titre" varchar,
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_valeurs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_valeurs_locales" (
  	"surtitre" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_archetype_traits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"picto" "enum__pages_v_blocks_archetype_traits_picto",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_archetype_traits_locales" (
  	"libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_archetype" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_archetype_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"chapo" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_equipe_statistiques" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valeur" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_equipe_statistiques_locales" (
  	"libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_equipe" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_equipe_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_reperes_cartes" ADD CONSTRAINT "pages_blocks_reperes_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reperes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reperes_cartes_locales" ADD CONSTRAINT "pages_blocks_reperes_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reperes_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reperes" ADD CONSTRAINT "pages_blocks_reperes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_valeurs_cartes" ADD CONSTRAINT "pages_blocks_valeurs_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_valeurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_valeurs_cartes_locales" ADD CONSTRAINT "pages_blocks_valeurs_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_valeurs_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_valeurs" ADD CONSTRAINT "pages_blocks_valeurs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_valeurs_locales" ADD CONSTRAINT "pages_blocks_valeurs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_valeurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archetype_traits" ADD CONSTRAINT "pages_blocks_archetype_traits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_archetype"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archetype_traits_locales" ADD CONSTRAINT "pages_blocks_archetype_traits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_archetype_traits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archetype" ADD CONSTRAINT "pages_blocks_archetype_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archetype_locales" ADD CONSTRAINT "pages_blocks_archetype_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_archetype"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_equipe_statistiques" ADD CONSTRAINT "pages_blocks_equipe_statistiques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_equipe"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_equipe_statistiques_locales" ADD CONSTRAINT "pages_blocks_equipe_statistiques_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_equipe_statistiques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_equipe" ADD CONSTRAINT "pages_blocks_equipe_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_equipe" ADD CONSTRAINT "pages_blocks_equipe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_equipe_locales" ADD CONSTRAINT "pages_blocks_equipe_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_equipe"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reperes_cartes" ADD CONSTRAINT "_pages_v_blocks_reperes_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reperes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reperes_cartes_locales" ADD CONSTRAINT "_pages_v_blocks_reperes_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reperes_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reperes" ADD CONSTRAINT "_pages_v_blocks_reperes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_valeurs_cartes" ADD CONSTRAINT "_pages_v_blocks_valeurs_cartes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_valeurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_valeurs_cartes_locales" ADD CONSTRAINT "_pages_v_blocks_valeurs_cartes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_valeurs_cartes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_valeurs" ADD CONSTRAINT "_pages_v_blocks_valeurs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_valeurs_locales" ADD CONSTRAINT "_pages_v_blocks_valeurs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_valeurs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archetype_traits" ADD CONSTRAINT "_pages_v_blocks_archetype_traits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_archetype"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archetype_traits_locales" ADD CONSTRAINT "_pages_v_blocks_archetype_traits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_archetype_traits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archetype" ADD CONSTRAINT "_pages_v_blocks_archetype_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archetype_locales" ADD CONSTRAINT "_pages_v_blocks_archetype_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_archetype"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_equipe_statistiques" ADD CONSTRAINT "_pages_v_blocks_equipe_statistiques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_equipe"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_equipe_statistiques_locales" ADD CONSTRAINT "_pages_v_blocks_equipe_statistiques_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_equipe_statistiques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_equipe" ADD CONSTRAINT "_pages_v_blocks_equipe_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_equipe" ADD CONSTRAINT "_pages_v_blocks_equipe_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_equipe_locales" ADD CONSTRAINT "_pages_v_blocks_equipe_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_equipe"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_reperes_cartes_order_idx" ON "pages_blocks_reperes_cartes" USING btree ("_order");
  CREATE INDEX "pages_blocks_reperes_cartes_parent_id_idx" ON "pages_blocks_reperes_cartes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_reperes_cartes_locales_locale_parent_id_unique" ON "pages_blocks_reperes_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_reperes_order_idx" ON "pages_blocks_reperes" USING btree ("_order");
  CREATE INDEX "pages_blocks_reperes_parent_id_idx" ON "pages_blocks_reperes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reperes_path_idx" ON "pages_blocks_reperes" USING btree ("_path");
  CREATE INDEX "pages_blocks_valeurs_cartes_order_idx" ON "pages_blocks_valeurs_cartes" USING btree ("_order");
  CREATE INDEX "pages_blocks_valeurs_cartes_parent_id_idx" ON "pages_blocks_valeurs_cartes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_valeurs_cartes_locales_locale_parent_id_unique" ON "pages_blocks_valeurs_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_valeurs_order_idx" ON "pages_blocks_valeurs" USING btree ("_order");
  CREATE INDEX "pages_blocks_valeurs_parent_id_idx" ON "pages_blocks_valeurs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_valeurs_path_idx" ON "pages_blocks_valeurs" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_valeurs_locales_locale_parent_id_unique" ON "pages_blocks_valeurs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_archetype_traits_order_idx" ON "pages_blocks_archetype_traits" USING btree ("_order");
  CREATE INDEX "pages_blocks_archetype_traits_parent_id_idx" ON "pages_blocks_archetype_traits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_archetype_traits_locales_locale_parent_id_uniqu" ON "pages_blocks_archetype_traits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_archetype_order_idx" ON "pages_blocks_archetype" USING btree ("_order");
  CREATE INDEX "pages_blocks_archetype_parent_id_idx" ON "pages_blocks_archetype" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archetype_path_idx" ON "pages_blocks_archetype" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_archetype_locales_locale_parent_id_unique" ON "pages_blocks_archetype_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_equipe_statistiques_order_idx" ON "pages_blocks_equipe_statistiques" USING btree ("_order");
  CREATE INDEX "pages_blocks_equipe_statistiques_parent_id_idx" ON "pages_blocks_equipe_statistiques" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_equipe_statistiques_locales_locale_parent_id_un" ON "pages_blocks_equipe_statistiques_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_equipe_order_idx" ON "pages_blocks_equipe" USING btree ("_order");
  CREATE INDEX "pages_blocks_equipe_parent_id_idx" ON "pages_blocks_equipe" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_equipe_path_idx" ON "pages_blocks_equipe" USING btree ("_path");
  CREATE INDEX "pages_blocks_equipe_image_idx" ON "pages_blocks_equipe" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_equipe_locales_locale_parent_id_unique" ON "pages_blocks_equipe_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_reperes_cartes_order_idx" ON "_pages_v_blocks_reperes_cartes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reperes_cartes_parent_id_idx" ON "_pages_v_blocks_reperes_cartes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_reperes_cartes_locales_locale_parent_id_uniq" ON "_pages_v_blocks_reperes_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_reperes_order_idx" ON "_pages_v_blocks_reperes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reperes_parent_id_idx" ON "_pages_v_blocks_reperes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reperes_path_idx" ON "_pages_v_blocks_reperes" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_valeurs_cartes_order_idx" ON "_pages_v_blocks_valeurs_cartes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_valeurs_cartes_parent_id_idx" ON "_pages_v_blocks_valeurs_cartes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_valeurs_cartes_locales_locale_parent_id_uniq" ON "_pages_v_blocks_valeurs_cartes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_valeurs_order_idx" ON "_pages_v_blocks_valeurs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_valeurs_parent_id_idx" ON "_pages_v_blocks_valeurs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_valeurs_path_idx" ON "_pages_v_blocks_valeurs" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_valeurs_locales_locale_parent_id_unique" ON "_pages_v_blocks_valeurs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_archetype_traits_order_idx" ON "_pages_v_blocks_archetype_traits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archetype_traits_parent_id_idx" ON "_pages_v_blocks_archetype_traits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_archetype_traits_locales_locale_parent_id_un" ON "_pages_v_blocks_archetype_traits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_archetype_order_idx" ON "_pages_v_blocks_archetype" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archetype_parent_id_idx" ON "_pages_v_blocks_archetype" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archetype_path_idx" ON "_pages_v_blocks_archetype" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_archetype_locales_locale_parent_id_unique" ON "_pages_v_blocks_archetype_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_equipe_statistiques_order_idx" ON "_pages_v_blocks_equipe_statistiques" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_equipe_statistiques_parent_id_idx" ON "_pages_v_blocks_equipe_statistiques" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_equipe_statistiques_locales_locale_parent_id" ON "_pages_v_blocks_equipe_statistiques_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_equipe_order_idx" ON "_pages_v_blocks_equipe" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_equipe_parent_id_idx" ON "_pages_v_blocks_equipe" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_equipe_path_idx" ON "_pages_v_blocks_equipe" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_equipe_image_idx" ON "_pages_v_blocks_equipe" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_equipe_locales_locale_parent_id_unique" ON "_pages_v_blocks_equipe_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_reperes_cartes" CASCADE;
  DROP TABLE "pages_blocks_reperes_cartes_locales" CASCADE;
  DROP TABLE "pages_blocks_reperes" CASCADE;
  DROP TABLE "pages_blocks_valeurs_cartes" CASCADE;
  DROP TABLE "pages_blocks_valeurs_cartes_locales" CASCADE;
  DROP TABLE "pages_blocks_valeurs" CASCADE;
  DROP TABLE "pages_blocks_valeurs_locales" CASCADE;
  DROP TABLE "pages_blocks_archetype_traits" CASCADE;
  DROP TABLE "pages_blocks_archetype_traits_locales" CASCADE;
  DROP TABLE "pages_blocks_archetype" CASCADE;
  DROP TABLE "pages_blocks_archetype_locales" CASCADE;
  DROP TABLE "pages_blocks_equipe_statistiques" CASCADE;
  DROP TABLE "pages_blocks_equipe_statistiques_locales" CASCADE;
  DROP TABLE "pages_blocks_equipe" CASCADE;
  DROP TABLE "pages_blocks_equipe_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_reperes_cartes" CASCADE;
  DROP TABLE "_pages_v_blocks_reperes_cartes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_reperes" CASCADE;
  DROP TABLE "_pages_v_blocks_valeurs_cartes" CASCADE;
  DROP TABLE "_pages_v_blocks_valeurs_cartes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_valeurs" CASCADE;
  DROP TABLE "_pages_v_blocks_valeurs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_archetype_traits" CASCADE;
  DROP TABLE "_pages_v_blocks_archetype_traits_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_archetype" CASCADE;
  DROP TABLE "_pages_v_blocks_archetype_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_equipe_statistiques" CASCADE;
  DROP TABLE "_pages_v_blocks_equipe_statistiques_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_equipe" CASCADE;
  DROP TABLE "_pages_v_blocks_equipe_locales" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_valeurs_cartes_picto";
  DROP TYPE "public"."enum_pages_blocks_archetype_traits_picto";
  DROP TYPE "public"."enum__pages_v_blocks_valeurs_cartes_picto";
  DROP TYPE "public"."enum__pages_v_blocks_archetype_traits_picto";`)
}
