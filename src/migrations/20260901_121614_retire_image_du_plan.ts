import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_texte_long" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_texte_long_locales" (
  	"surtitre" varchar,
  	"corps" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_texte_long" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_texte_long_locales" (
  	"surtitre" varchar,
  	"corps" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "contact" DROP CONSTRAINT "contact_carte_id_media_id_fk";
  
  DROP INDEX "contact_carte_idx";
  ALTER TABLE "pages_blocks_texte_long" ADD CONSTRAINT "pages_blocks_texte_long_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_texte_long_locales" ADD CONSTRAINT "pages_blocks_texte_long_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_texte_long"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_texte_long" ADD CONSTRAINT "_pages_v_blocks_texte_long_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_texte_long_locales" ADD CONSTRAINT "_pages_v_blocks_texte_long_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_texte_long"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_texte_long_order_idx" ON "pages_blocks_texte_long" USING btree ("_order");
  CREATE INDEX "pages_blocks_texte_long_parent_id_idx" ON "pages_blocks_texte_long" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_texte_long_path_idx" ON "pages_blocks_texte_long" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_texte_long_locales_locale_parent_id_unique" ON "pages_blocks_texte_long_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_texte_long_order_idx" ON "_pages_v_blocks_texte_long" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_texte_long_parent_id_idx" ON "_pages_v_blocks_texte_long" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_texte_long_path_idx" ON "_pages_v_blocks_texte_long" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_texte_long_locales_locale_parent_id_unique" ON "_pages_v_blocks_texte_long_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "contact" DROP COLUMN "carte_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_texte_long" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_texte_long_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_texte_long" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_texte_long_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_texte_long" CASCADE;
  DROP TABLE "pages_blocks_texte_long_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_texte_long" CASCADE;
  DROP TABLE "_pages_v_blocks_texte_long_locales" CASCADE;
  ALTER TABLE "contact" ADD COLUMN "carte_id" integer;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_carte_id_media_id_fk" FOREIGN KEY ("carte_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "contact_carte_idx" ON "contact" USING btree ("carte_id");`)
}
