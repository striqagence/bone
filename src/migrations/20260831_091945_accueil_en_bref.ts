import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Le global « Accueil » a déjà sa ligne : Postgres refuse d'y ajouter une
 * colonne NOT NULL sans valeur pour l'existant. Les colonnes sont donc créées
 * avec une valeur par défaut, qui est retirée aussitôt — les prochaines
 * insertions restent obligées de la fournir, et la ligne en place est remplie
 * par le script de peuplement.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "accueil" ADD COLUMN "en_bref_cta_chemin" varchar NOT NULL DEFAULT '';
    ALTER TABLE "accueil_locales" ADD COLUMN "en_bref_surtitre" varchar NOT NULL DEFAULT '';
    ALTER TABLE "accueil_locales" ADD COLUMN "en_bref_titre" varchar NOT NULL DEFAULT '';
    ALTER TABLE "accueil_locales" ADD COLUMN "en_bref_propos" varchar NOT NULL DEFAULT '';
    ALTER TABLE "accueil_locales" ADD COLUMN "en_bref_precision" varchar NOT NULL DEFAULT '';
    ALTER TABLE "accueil_locales" ADD COLUMN "en_bref_cta_libelle" varchar NOT NULL DEFAULT '';

    ALTER TABLE "accueil" ALTER COLUMN "en_bref_cta_chemin" DROP DEFAULT;
    ALTER TABLE "accueil_locales" ALTER COLUMN "en_bref_surtitre" DROP DEFAULT;
    ALTER TABLE "accueil_locales" ALTER COLUMN "en_bref_titre" DROP DEFAULT;
    ALTER TABLE "accueil_locales" ALTER COLUMN "en_bref_propos" DROP DEFAULT;
    ALTER TABLE "accueil_locales" ALTER COLUMN "en_bref_precision" DROP DEFAULT;
    ALTER TABLE "accueil_locales" ALTER COLUMN "en_bref_cta_libelle" DROP DEFAULT;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "accueil" DROP COLUMN "en_bref_cta_chemin";
    ALTER TABLE "accueil_locales" DROP COLUMN "en_bref_surtitre";
    ALTER TABLE "accueil_locales" DROP COLUMN "en_bref_titre";
    ALTER TABLE "accueil_locales" DROP COLUMN "en_bref_propos";
    ALTER TABLE "accueil_locales" DROP COLUMN "en_bref_precision";
    ALTER TABLE "accueil_locales" DROP COLUMN "en_bref_cta_libelle";
  `)
}
