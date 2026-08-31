import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_demandes_profil" AS ENUM('dsi', 'rssi', 'technique', 'infra', 'dirigeant');
  CREATE TABLE "demandes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"profil" "enum_demandes_profil" NOT NULL,
  	"nom" varchar NOT NULL,
  	"prenom" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"telephone" varchar NOT NULL,
  	"contexte" varchar NOT NULL,
  	"langue" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "demandes_id" integer;
  CREATE INDEX "demandes_updated_at_idx" ON "demandes" USING btree ("updated_at");
  CREATE INDEX "demandes_created_at_idx" ON "demandes" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_demandes_fk" FOREIGN KEY ("demandes_id") REFERENCES "public"."demandes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_demandes_id_idx" ON "payload_locked_documents_rels" USING btree ("demandes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "demandes" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "demandes" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_demandes_fk";
  
  DROP INDEX "payload_locked_documents_rels_demandes_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "demandes_id";
  DROP TYPE "public"."enum_demandes_profil";`)
}
