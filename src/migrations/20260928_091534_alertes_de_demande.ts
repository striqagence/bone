import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "contact_notifications_destinataires" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"adresse" varchar NOT NULL
  );
  
  ALTER TABLE "contact_notifications_destinataires" ADD CONSTRAINT "contact_notifications_destinataires_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contact_notifications_destinataires_order_idx" ON "contact_notifications_destinataires" USING btree ("_order");
  CREATE INDEX "contact_notifications_destinataires_parent_id_idx" ON "contact_notifications_destinataires" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "contact_notifications_destinataires" CASCADE;`)
}
