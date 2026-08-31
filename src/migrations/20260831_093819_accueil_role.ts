import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "accueil_role_etapes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numero" varchar NOT NULL,
  	"accentuee" boolean DEFAULT false
  );
  
  CREATE TABLE "accueil_role_etapes_locales" (
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "accueil_locales" ADD COLUMN "role_surtitre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "role_surtitre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "role_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "role_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "role_chapo" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "role_chapo" DROP DEFAULT;
  ALTER TABLE "accueil_role_etapes" ADD CONSTRAINT "accueil_role_etapes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_role_etapes_locales" ADD CONSTRAINT "accueil_role_etapes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_role_etapes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "accueil_role_etapes_order_idx" ON "accueil_role_etapes" USING btree ("_order");
  CREATE INDEX "accueil_role_etapes_parent_id_idx" ON "accueil_role_etapes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_role_etapes_locales_locale_parent_id_unique" ON "accueil_role_etapes_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "accueil_role_etapes" CASCADE;
  DROP TABLE "accueil_role_etapes_locales" CASCADE;
  ALTER TABLE "accueil_locales" DROP COLUMN "role_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "role_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "role_chapo";`)
}
