import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_promesse" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_promesse_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_chiffres_statistiques" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valeur" varchar,
  	"unite" varchar
  );
  
  CREATE TABLE "pages_blocks_chiffres_statistiques_locales" (
  	"libelle" varchar,
  	"precision" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_chiffres_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"constat" varchar,
  	"consequence" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_promesse" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_promesse_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_chiffres_statistiques" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"valeur" varchar,
  	"unite" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_chiffres_statistiques_locales" (
  	"libelle" varchar,
  	"precision" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_chiffres_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"constat" varchar,
  	"consequence" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_promesse" ADD CONSTRAINT "pages_blocks_promesse_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_promesse_locales" ADD CONSTRAINT "pages_blocks_promesse_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_promesse"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chiffres_statistiques" ADD CONSTRAINT "pages_blocks_chiffres_statistiques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_chiffres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chiffres_statistiques_locales" ADD CONSTRAINT "pages_blocks_chiffres_statistiques_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_chiffres_statistiques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chiffres" ADD CONSTRAINT "pages_blocks_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_chiffres_locales" ADD CONSTRAINT "pages_blocks_chiffres_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_chiffres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promesse" ADD CONSTRAINT "_pages_v_blocks_promesse_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_promesse_locales" ADD CONSTRAINT "_pages_v_blocks_promesse_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_promesse"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_chiffres_statistiques" ADD CONSTRAINT "_pages_v_blocks_chiffres_statistiques_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_chiffres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_chiffres_statistiques_locales" ADD CONSTRAINT "_pages_v_blocks_chiffres_statistiques_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_chiffres_statistiques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_chiffres" ADD CONSTRAINT "_pages_v_blocks_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_chiffres_locales" ADD CONSTRAINT "_pages_v_blocks_chiffres_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_chiffres"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_promesse_order_idx" ON "pages_blocks_promesse" USING btree ("_order");
  CREATE INDEX "pages_blocks_promesse_parent_id_idx" ON "pages_blocks_promesse" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_promesse_path_idx" ON "pages_blocks_promesse" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_promesse_locales_locale_parent_id_unique" ON "pages_blocks_promesse_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_chiffres_statistiques_order_idx" ON "pages_blocks_chiffres_statistiques" USING btree ("_order");
  CREATE INDEX "pages_blocks_chiffres_statistiques_parent_id_idx" ON "pages_blocks_chiffres_statistiques" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_chiffres_statistiques_locales_locale_parent_id_" ON "pages_blocks_chiffres_statistiques_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_chiffres_order_idx" ON "pages_blocks_chiffres" USING btree ("_order");
  CREATE INDEX "pages_blocks_chiffres_parent_id_idx" ON "pages_blocks_chiffres" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_chiffres_path_idx" ON "pages_blocks_chiffres" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_chiffres_locales_locale_parent_id_unique" ON "pages_blocks_chiffres_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_promesse_order_idx" ON "_pages_v_blocks_promesse" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_promesse_parent_id_idx" ON "_pages_v_blocks_promesse" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_promesse_path_idx" ON "_pages_v_blocks_promesse" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_promesse_locales_locale_parent_id_unique" ON "_pages_v_blocks_promesse_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_chiffres_statistiques_order_idx" ON "_pages_v_blocks_chiffres_statistiques" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_chiffres_statistiques_parent_id_idx" ON "_pages_v_blocks_chiffres_statistiques" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_chiffres_statistiques_locales_locale_parent_" ON "_pages_v_blocks_chiffres_statistiques_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_chiffres_order_idx" ON "_pages_v_blocks_chiffres" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_chiffres_parent_id_idx" ON "_pages_v_blocks_chiffres" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_chiffres_path_idx" ON "_pages_v_blocks_chiffres" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_chiffres_locales_locale_parent_id_unique" ON "_pages_v_blocks_chiffres_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_promesse" CASCADE;
  DROP TABLE "pages_blocks_promesse_locales" CASCADE;
  DROP TABLE "pages_blocks_chiffres_statistiques" CASCADE;
  DROP TABLE "pages_blocks_chiffres_statistiques_locales" CASCADE;
  DROP TABLE "pages_blocks_chiffres" CASCADE;
  DROP TABLE "pages_blocks_chiffres_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_promesse" CASCADE;
  DROP TABLE "_pages_v_blocks_promesse_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_chiffres_statistiques" CASCADE;
  DROP TABLE "_pages_v_blocks_chiffres_statistiques_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_chiffres" CASCADE;
  DROP TABLE "_pages_v_blocks_chiffres_locales" CASCADE;`)
}
