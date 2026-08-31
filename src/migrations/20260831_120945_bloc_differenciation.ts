import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_differenciation_habituelle_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_differenciation_habituelle_puces_locales" (
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_differenciation_bone_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_differenciation_bone_puces_locales" (
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_differenciation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_differenciation_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"habituelle_badge" varchar,
  	"habituelle_titre" varchar,
  	"bone_badge" varchar,
  	"bone_titre" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_differenciation_habituelle_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_differenciation_habituelle_puces_locales" (
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_differenciation_bone_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_differenciation_bone_puces_locales" (
  	"texte" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_differenciation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_differenciation_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"habituelle_badge" varchar,
  	"habituelle_titre" varchar,
  	"bone_badge" varchar,
  	"bone_titre" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_differenciation_habituelle_puces" ADD CONSTRAINT "pages_blocks_differenciation_habituelle_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_differenciation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_differenciation_habituelle_puces_locales" ADD CONSTRAINT "pages_blocks_differenciation_habituelle_puces_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_differenciation_habituelle_puces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_differenciation_bone_puces" ADD CONSTRAINT "pages_blocks_differenciation_bone_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_differenciation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_differenciation_bone_puces_locales" ADD CONSTRAINT "pages_blocks_differenciation_bone_puces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_differenciation_bone_puces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_differenciation" ADD CONSTRAINT "pages_blocks_differenciation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_differenciation_locales" ADD CONSTRAINT "pages_blocks_differenciation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_differenciation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_differenciation_habituelle_puces" ADD CONSTRAINT "_pages_v_blocks_differenciation_habituelle_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_differenciation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_differenciation_habituelle_puces_locales" ADD CONSTRAINT "_pages_v_blocks_differenciation_habituelle_puces_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_differenciation_habituelle_puces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_differenciation_bone_puces" ADD CONSTRAINT "_pages_v_blocks_differenciation_bone_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_differenciation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_differenciation_bone_puces_locales" ADD CONSTRAINT "_pages_v_blocks_differenciation_bone_puces_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_differenciation_bone_puces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_differenciation" ADD CONSTRAINT "_pages_v_blocks_differenciation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_differenciation_locales" ADD CONSTRAINT "_pages_v_blocks_differenciation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_differenciation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_differenciation_habituelle_puces_order_idx" ON "pages_blocks_differenciation_habituelle_puces" USING btree ("_order");
  CREATE INDEX "pages_blocks_differenciation_habituelle_puces_parent_id_idx" ON "pages_blocks_differenciation_habituelle_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_differenciation_habituelle_puces_locales_locale" ON "pages_blocks_differenciation_habituelle_puces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_differenciation_bone_puces_order_idx" ON "pages_blocks_differenciation_bone_puces" USING btree ("_order");
  CREATE INDEX "pages_blocks_differenciation_bone_puces_parent_id_idx" ON "pages_blocks_differenciation_bone_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_differenciation_bone_puces_locales_locale_paren" ON "pages_blocks_differenciation_bone_puces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_differenciation_order_idx" ON "pages_blocks_differenciation" USING btree ("_order");
  CREATE INDEX "pages_blocks_differenciation_parent_id_idx" ON "pages_blocks_differenciation" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_differenciation_path_idx" ON "pages_blocks_differenciation" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_differenciation_locales_locale_parent_id_unique" ON "pages_blocks_differenciation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_differenciation_habituelle_puces_order_idx" ON "_pages_v_blocks_differenciation_habituelle_puces" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_differenciation_habituelle_puces_parent_id_idx" ON "_pages_v_blocks_differenciation_habituelle_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_differenciation_habituelle_puces_locales_loc" ON "_pages_v_blocks_differenciation_habituelle_puces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_differenciation_bone_puces_order_idx" ON "_pages_v_blocks_differenciation_bone_puces" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_differenciation_bone_puces_parent_id_idx" ON "_pages_v_blocks_differenciation_bone_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_differenciation_bone_puces_locales_locale_pa" ON "_pages_v_blocks_differenciation_bone_puces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_differenciation_order_idx" ON "_pages_v_blocks_differenciation" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_differenciation_parent_id_idx" ON "_pages_v_blocks_differenciation" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_differenciation_path_idx" ON "_pages_v_blocks_differenciation" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_differenciation_locales_locale_parent_id_uni" ON "_pages_v_blocks_differenciation_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_differenciation_habituelle_puces" CASCADE;
  DROP TABLE "pages_blocks_differenciation_habituelle_puces_locales" CASCADE;
  DROP TABLE "pages_blocks_differenciation_bone_puces" CASCADE;
  DROP TABLE "pages_blocks_differenciation_bone_puces_locales" CASCADE;
  DROP TABLE "pages_blocks_differenciation" CASCADE;
  DROP TABLE "pages_blocks_differenciation_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_differenciation_habituelle_puces" CASCADE;
  DROP TABLE "_pages_v_blocks_differenciation_habituelle_puces_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_differenciation_bone_puces" CASCADE;
  DROP TABLE "_pages_v_blocks_differenciation_bone_puces_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_differenciation" CASCADE;
  DROP TABLE "_pages_v_blocks_differenciation_locales" CASCADE;`)
}
