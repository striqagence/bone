import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "accueil_hero_lignes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accueil_hero_lignes_locales" (
  	"verbe" varchar NOT NULL,
  	"complement" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accueil" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_cta_chemin" varchar NOT NULL,
  	"hero_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "accueil_locales" (
  	"hero_surtitre" varchar NOT NULL,
  	"hero_chapo" varchar NOT NULL,
  	"hero_cta_libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "accueil_hero_lignes" ADD CONSTRAINT "accueil_hero_lignes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_hero_lignes_locales" ADD CONSTRAINT "accueil_hero_lignes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_hero_lignes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil" ADD CONSTRAINT "accueil_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accueil_locales" ADD CONSTRAINT "accueil_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "accueil_hero_lignes_order_idx" ON "accueil_hero_lignes" USING btree ("_order");
  CREATE INDEX "accueil_hero_lignes_parent_id_idx" ON "accueil_hero_lignes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_hero_lignes_locales_locale_parent_id_unique" ON "accueil_hero_lignes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accueil_hero_hero_image_idx" ON "accueil" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "accueil_locales_locale_parent_id_unique" ON "accueil_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "accueil_hero_lignes" CASCADE;
  DROP TABLE "accueil_hero_lignes_locales" CASCADE;
  DROP TABLE "accueil" CASCADE;
  DROP TABLE "accueil_locales" CASCADE;`)
}
