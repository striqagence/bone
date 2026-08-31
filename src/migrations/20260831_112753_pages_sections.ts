import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_bande_poles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"avec_en_tete" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_bande_poles_locales" (
  	"surtitre" varchar,
  	"titre_haut" varchar,
  	"titre_bas" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_synergie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_synergie_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_appel_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cta_chemin" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_appel_action_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"chapo" varchar,
  	"cta_libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_bande_poles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"avec_en_tete" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bande_poles_locales" (
  	"surtitre" varchar,
  	"titre_haut" varchar,
  	"titre_bas" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_synergie" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_synergie_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_appel_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_chemin" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_appel_action_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"chapo" varchar,
  	"cta_libelle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_bande_poles" ADD CONSTRAINT "pages_blocks_bande_poles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bande_poles_locales" ADD CONSTRAINT "pages_blocks_bande_poles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bande_poles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_synergie" ADD CONSTRAINT "pages_blocks_synergie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_synergie_locales" ADD CONSTRAINT "pages_blocks_synergie_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_synergie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_appel_action" ADD CONSTRAINT "pages_blocks_appel_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_appel_action_locales" ADD CONSTRAINT "pages_blocks_appel_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_appel_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bande_poles" ADD CONSTRAINT "_pages_v_blocks_bande_poles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bande_poles_locales" ADD CONSTRAINT "_pages_v_blocks_bande_poles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bande_poles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_synergie" ADD CONSTRAINT "_pages_v_blocks_synergie_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_synergie_locales" ADD CONSTRAINT "_pages_v_blocks_synergie_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_synergie"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_appel_action" ADD CONSTRAINT "_pages_v_blocks_appel_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_appel_action_locales" ADD CONSTRAINT "_pages_v_blocks_appel_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_appel_action"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_bande_poles_order_idx" ON "pages_blocks_bande_poles" USING btree ("_order");
  CREATE INDEX "pages_blocks_bande_poles_parent_id_idx" ON "pages_blocks_bande_poles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bande_poles_path_idx" ON "pages_blocks_bande_poles" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_bande_poles_locales_locale_parent_id_unique" ON "pages_blocks_bande_poles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_synergie_order_idx" ON "pages_blocks_synergie" USING btree ("_order");
  CREATE INDEX "pages_blocks_synergie_parent_id_idx" ON "pages_blocks_synergie" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_synergie_path_idx" ON "pages_blocks_synergie" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_synergie_locales_locale_parent_id_unique" ON "pages_blocks_synergie_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_appel_action_order_idx" ON "pages_blocks_appel_action" USING btree ("_order");
  CREATE INDEX "pages_blocks_appel_action_parent_id_idx" ON "pages_blocks_appel_action" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_appel_action_path_idx" ON "pages_blocks_appel_action" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_appel_action_locales_locale_parent_id_unique" ON "pages_blocks_appel_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_bande_poles_order_idx" ON "_pages_v_blocks_bande_poles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bande_poles_parent_id_idx" ON "_pages_v_blocks_bande_poles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bande_poles_path_idx" ON "_pages_v_blocks_bande_poles" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_bande_poles_locales_locale_parent_id_unique" ON "_pages_v_blocks_bande_poles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_synergie_order_idx" ON "_pages_v_blocks_synergie" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_synergie_parent_id_idx" ON "_pages_v_blocks_synergie" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_synergie_path_idx" ON "_pages_v_blocks_synergie" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_synergie_locales_locale_parent_id_unique" ON "_pages_v_blocks_synergie_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_appel_action_order_idx" ON "_pages_v_blocks_appel_action" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_appel_action_parent_id_idx" ON "_pages_v_blocks_appel_action" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_appel_action_path_idx" ON "_pages_v_blocks_appel_action" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_appel_action_locales_locale_parent_id_unique" ON "_pages_v_blocks_appel_action_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_bande_poles" CASCADE;
  DROP TABLE "pages_blocks_bande_poles_locales" CASCADE;
  DROP TABLE "pages_blocks_synergie" CASCADE;
  DROP TABLE "pages_blocks_synergie_locales" CASCADE;
  DROP TABLE "pages_blocks_appel_action" CASCADE;
  DROP TABLE "pages_blocks_appel_action_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_bande_poles" CASCADE;
  DROP TABLE "_pages_v_blocks_bande_poles_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_synergie" CASCADE;
  DROP TABLE "_pages_v_blocks_synergie_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_appel_action" CASCADE;
  DROP TABLE "_pages_v_blocks_appel_action_locales" CASCADE;`)
}
