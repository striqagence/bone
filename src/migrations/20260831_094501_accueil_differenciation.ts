import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "accueil_differenciation_habituelle_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accueil_differenciation_habituelle_puces_locales" (
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "accueil_differenciation_bone_puces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "accueil_differenciation_bone_puces_locales" (
  	"texte" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_surtitre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "differenciation_surtitre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "differenciation_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_habituelle_badge" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "differenciation_habituelle_badge" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_habituelle_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "differenciation_habituelle_titre" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_bone_badge" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "differenciation_bone_badge" DROP DEFAULT;
  ALTER TABLE "accueil_locales" ADD COLUMN "differenciation_bone_titre" varchar NOT NULL DEFAULT '';
  ALTER TABLE "accueil_locales" ALTER COLUMN "differenciation_bone_titre" DROP DEFAULT;
  ALTER TABLE "accueil_differenciation_habituelle_puces" ADD CONSTRAINT "accueil_differenciation_habituelle_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_differenciation_habituelle_puces_locales" ADD CONSTRAINT "accueil_differenciation_habituelle_puces_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_differenciation_habituelle_puces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_differenciation_bone_puces" ADD CONSTRAINT "accueil_differenciation_bone_puces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_differenciation_bone_puces_locales" ADD CONSTRAINT "accueil_differenciation_bone_puces_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil_differenciation_bone_puces"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "accueil_differenciation_habituelle_puces_order_idx" ON "accueil_differenciation_habituelle_puces" USING btree ("_order");
  CREATE INDEX "accueil_differenciation_habituelle_puces_parent_id_idx" ON "accueil_differenciation_habituelle_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_differenciation_habituelle_puces_locales_locale_pare" ON "accueil_differenciation_habituelle_puces_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "accueil_differenciation_bone_puces_order_idx" ON "accueil_differenciation_bone_puces" USING btree ("_order");
  CREATE INDEX "accueil_differenciation_bone_puces_parent_id_idx" ON "accueil_differenciation_bone_puces" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "accueil_differenciation_bone_puces_locales_locale_parent_id_" ON "accueil_differenciation_bone_puces_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "accueil_differenciation_habituelle_puces" CASCADE;
  DROP TABLE "accueil_differenciation_habituelle_puces_locales" CASCADE;
  DROP TABLE "accueil_differenciation_bone_puces" CASCADE;
  DROP TABLE "accueil_differenciation_bone_puces_locales" CASCADE;
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_surtitre";
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_habituelle_badge";
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_habituelle_titre";
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_bone_badge";
  ALTER TABLE "accueil_locales" DROP COLUMN "differenciation_bone_titre";`)
}
