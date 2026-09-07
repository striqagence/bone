import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "verrous" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cle" varchar NOT NULL,
  	"expiration" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "verrous_id" integer;
  CREATE INDEX "verrous_cle_idx" ON "verrous" USING btree ("cle");
  CREATE INDEX "verrous_expiration_idx" ON "verrous" USING btree ("expiration");
  CREATE INDEX "verrous_updated_at_idx" ON "verrous" USING btree ("updated_at");
  CREATE INDEX "verrous_created_at_idx" ON "verrous" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_verrous_fk" FOREIGN KEY ("verrous_id") REFERENCES "public"."verrous"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_verrous_id_idx" ON "payload_locked_documents_rels" USING btree ("verrous_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "verrous" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "verrous" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_verrous_fk";
  
  DROP INDEX "payload_locked_documents_rels_verrous_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "verrous_id";`)
}
