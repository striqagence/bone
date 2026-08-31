import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_posture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_posture_locales" (
  	"surtitre" varchar,
  	"refus_intitule" varchar,
  	"refus_citation" varchar,
  	"refus_precision" varchar,
  	"engagement_intitule" varchar,
  	"engagement_citation" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_points_entree_lignes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_points_entree_lignes_locales" (
  	"profil" varchar,
  	"point_entree" varchar,
  	"livrable" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_points_entree" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_points_entree_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"en_tetes_profil" varchar,
  	"en_tetes_point_entree" varchar,
  	"en_tetes_livrable" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_posture" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_posture_locales" (
  	"surtitre" varchar,
  	"refus_intitule" varchar,
  	"refus_citation" varchar,
  	"refus_precision" varchar,
  	"engagement_intitule" varchar,
  	"engagement_citation" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_points_entree_lignes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_points_entree_lignes_locales" (
  	"profil" varchar,
  	"point_entree" varchar,
  	"livrable" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_points_entree" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_points_entree_locales" (
  	"surtitre" varchar,
  	"titre" varchar,
  	"en_tetes_profil" varchar,
  	"en_tetes_point_entree" varchar,
  	"en_tetes_livrable" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_posture" ADD CONSTRAINT "pages_blocks_posture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_posture_locales" ADD CONSTRAINT "pages_blocks_posture_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_posture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_points_entree_lignes" ADD CONSTRAINT "pages_blocks_points_entree_lignes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_points_entree"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_points_entree_lignes_locales" ADD CONSTRAINT "pages_blocks_points_entree_lignes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_points_entree_lignes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_points_entree" ADD CONSTRAINT "pages_blocks_points_entree_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_points_entree_locales" ADD CONSTRAINT "pages_blocks_points_entree_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_points_entree"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posture" ADD CONSTRAINT "_pages_v_blocks_posture_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posture_locales" ADD CONSTRAINT "_pages_v_blocks_posture_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_posture"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_points_entree_lignes" ADD CONSTRAINT "_pages_v_blocks_points_entree_lignes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_points_entree"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_points_entree_lignes_locales" ADD CONSTRAINT "_pages_v_blocks_points_entree_lignes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_points_entree_lignes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_points_entree" ADD CONSTRAINT "_pages_v_blocks_points_entree_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_points_entree_locales" ADD CONSTRAINT "_pages_v_blocks_points_entree_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_points_entree"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_posture_order_idx" ON "pages_blocks_posture" USING btree ("_order");
  CREATE INDEX "pages_blocks_posture_parent_id_idx" ON "pages_blocks_posture" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_posture_path_idx" ON "pages_blocks_posture" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_posture_locales_locale_parent_id_unique" ON "pages_blocks_posture_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_points_entree_lignes_order_idx" ON "pages_blocks_points_entree_lignes" USING btree ("_order");
  CREATE INDEX "pages_blocks_points_entree_lignes_parent_id_idx" ON "pages_blocks_points_entree_lignes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_points_entree_lignes_locales_locale_parent_id_u" ON "pages_blocks_points_entree_lignes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_points_entree_order_idx" ON "pages_blocks_points_entree" USING btree ("_order");
  CREATE INDEX "pages_blocks_points_entree_parent_id_idx" ON "pages_blocks_points_entree" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_points_entree_path_idx" ON "pages_blocks_points_entree" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_points_entree_locales_locale_parent_id_unique" ON "pages_blocks_points_entree_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_posture_order_idx" ON "_pages_v_blocks_posture" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_posture_parent_id_idx" ON "_pages_v_blocks_posture" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_posture_path_idx" ON "_pages_v_blocks_posture" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_posture_locales_locale_parent_id_unique" ON "_pages_v_blocks_posture_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_points_entree_lignes_order_idx" ON "_pages_v_blocks_points_entree_lignes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_points_entree_lignes_parent_id_idx" ON "_pages_v_blocks_points_entree_lignes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_points_entree_lignes_locales_locale_parent_i" ON "_pages_v_blocks_points_entree_lignes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_points_entree_order_idx" ON "_pages_v_blocks_points_entree" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_points_entree_parent_id_idx" ON "_pages_v_blocks_points_entree" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_points_entree_path_idx" ON "_pages_v_blocks_points_entree" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_points_entree_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_points_entree_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_posture" CASCADE;
  DROP TABLE "pages_blocks_posture_locales" CASCADE;
  DROP TABLE "pages_blocks_points_entree_lignes" CASCADE;
  DROP TABLE "pages_blocks_points_entree_lignes_locales" CASCADE;
  DROP TABLE "pages_blocks_points_entree" CASCADE;
  DROP TABLE "pages_blocks_points_entree_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_posture" CASCADE;
  DROP TABLE "_pages_v_blocks_posture_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_points_entree_lignes" CASCADE;
  DROP TABLE "_pages_v_blocks_points_entree_lignes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_points_entree" CASCADE;
  DROP TABLE "_pages_v_blocks_points_entree_locales" CASCADE;`)
}
