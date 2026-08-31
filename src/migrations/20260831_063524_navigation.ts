import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "navigation_liens_principaux" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"chemin" varchar NOT NULL,
  	"avec_deroulant" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation_liens_principaux_locales" (
  	"libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_poles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"chemin" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_poles_locales" (
  	"titre" varchar NOT NULL,
  	"sous_titre" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_colonnes_liens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"chemin" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_colonnes_liens_locales" (
  	"libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_colonnes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "navigation_colonnes_locales" (
  	"titre" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_liens_legaux" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"chemin" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_liens_legaux_locales" (
  	"libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"bouton_entete_chemin" varchar NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"contact_linkedin" varchar NOT NULL,
  	"credit_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_locales" (
  	"bouton_entete_libelle" varchar NOT NULL,
  	"baseline" varchar NOT NULL,
  	"titre_poles" varchar NOT NULL,
  	"contact_titre" varchar NOT NULL,
  	"contact_libelle_formulaire" varchar NOT NULL,
  	"credit_libelle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "navigation_liens_principaux" ADD CONSTRAINT "navigation_liens_principaux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_liens_principaux_locales" ADD CONSTRAINT "navigation_liens_principaux_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_liens_principaux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_poles" ADD CONSTRAINT "navigation_poles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_poles_locales" ADD CONSTRAINT "navigation_poles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_poles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_colonnes_liens" ADD CONSTRAINT "navigation_colonnes_liens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_colonnes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_colonnes_liens_locales" ADD CONSTRAINT "navigation_colonnes_liens_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_colonnes_liens"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_colonnes" ADD CONSTRAINT "navigation_colonnes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_colonnes_locales" ADD CONSTRAINT "navigation_colonnes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_colonnes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_liens_legaux" ADD CONSTRAINT "navigation_liens_legaux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_liens_legaux_locales" ADD CONSTRAINT "navigation_liens_legaux_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_liens_legaux"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "navigation_liens_principaux_order_idx" ON "navigation_liens_principaux" USING btree ("_order");
  CREATE INDEX "navigation_liens_principaux_parent_id_idx" ON "navigation_liens_principaux" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_liens_principaux_locales_locale_parent_id_unique" ON "navigation_liens_principaux_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_poles_order_idx" ON "navigation_poles" USING btree ("_order");
  CREATE INDEX "navigation_poles_parent_id_idx" ON "navigation_poles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_poles_locales_locale_parent_id_unique" ON "navigation_poles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_colonnes_liens_order_idx" ON "navigation_colonnes_liens" USING btree ("_order");
  CREATE INDEX "navigation_colonnes_liens_parent_id_idx" ON "navigation_colonnes_liens" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_colonnes_liens_locales_locale_parent_id_unique" ON "navigation_colonnes_liens_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_colonnes_order_idx" ON "navigation_colonnes" USING btree ("_order");
  CREATE INDEX "navigation_colonnes_parent_id_idx" ON "navigation_colonnes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_colonnes_locales_locale_parent_id_unique" ON "navigation_colonnes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_liens_legaux_order_idx" ON "navigation_liens_legaux" USING btree ("_order");
  CREATE INDEX "navigation_liens_legaux_parent_id_idx" ON "navigation_liens_legaux" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_liens_legaux_locales_locale_parent_id_unique" ON "navigation_liens_legaux_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "navigation_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "navigation_liens_principaux" CASCADE;
  DROP TABLE "navigation_liens_principaux_locales" CASCADE;
  DROP TABLE "navigation_poles" CASCADE;
  DROP TABLE "navigation_poles_locales" CASCADE;
  DROP TABLE "navigation_colonnes_liens" CASCADE;
  DROP TABLE "navigation_colonnes_liens_locales" CASCADE;
  DROP TABLE "navigation_colonnes" CASCADE;
  DROP TABLE "navigation_colonnes_locales" CASCADE;
  DROP TABLE "navigation_liens_legaux" CASCADE;
  DROP TABLE "navigation_liens_legaux_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_locales" CASCADE;`)
}
