import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Remplit le global « Navigation » avec les libellés de la maquette.
 *
 * Le français est repris mot pour mot du Figma. L'anglais est une première
 * passe : aucune maquette anglaise n'existe, ces formulations sont à relire
 * depuis le back-office.
 *
 * Le script est idempotent — un global n'a qu'une seule entrée, le relancer
 * réécrit les mêmes valeurs.
 */
const fr = {
  liensPrincipaux: [
    { libelle: "Nos compétences", chemin: "/competences", avecDeroulant: true },
    { libelle: "Notre approche", chemin: "/notre-approche", avecDeroulant: false },
    { libelle: "Blog", chemin: "/blog", avecDeroulant: false },
    { libelle: "À propos", chemin: "/a-propos", avecDeroulant: false },
    { libelle: "Contact", chemin: "/contact", avecDeroulant: false },
  ],
  boutonEntete: { libelle: "Demander un audit", chemin: "/contact" },
  poles: [
    { titre: "Expertise", sousTitre: "Réseau • Stockage • systèmes", chemin: "/competences/expertise" },
    { titre: "Capital", sousTitre: "Jusqu’à 70% d’économie vs neuf", chemin: "/competences/capital" },
    { titre: "Feed", sousTitre: "Broadcast • Post-production", chemin: "/competences/feed" },
  ],
  baseline: "Les bonnes décisions transforment votre infrastructure en avantage durable.",
  titrePoles: "Nos pôles",
  colonnes: [
    {
      titre: "L’entreprise",
      liens: [
        { libelle: "Approche", chemin: "/notre-approche" },
        { libelle: "À propos", chemin: "/a-propos" },
      ],
    },
  ],
  contact: {
    titre: "Contact",
    libelleFormulaire: "Notre formulaire",
    email: "bone@contact.fr",
    linkedin: "https://www.linkedin.com",
  },
  liensLegaux: [
    { libelle: "Mentions légales", chemin: "/mentions-legales" },
    { libelle: "Politique de confidentialité", chemin: "/politique-de-confidentialite" },
    { libelle: "Gestion des cookies", chemin: "/gestion-des-cookies" },
  ],
  credit: { libelle: "Site conçu par l’agence StriQ", url: "https://www.striq.fr" },
};

/** Noms de pôles conservés tels quels : ce sont des noms de marque. */
const en = {
  ...fr,
  liensPrincipaux: [
    { libelle: "What we do", chemin: "/competences", avecDeroulant: true },
    { libelle: "Our approach", chemin: "/notre-approche", avecDeroulant: false },
    { libelle: "Blog", chemin: "/blog", avecDeroulant: false },
    { libelle: "About", chemin: "/a-propos", avecDeroulant: false },
    { libelle: "Contact", chemin: "/contact", avecDeroulant: false },
  ],
  boutonEntete: { libelle: "Request an audit", chemin: "/contact" },
  poles: [
    { titre: "Expertise", sousTitre: "Network • Storage • systems", chemin: "/competences/expertise" },
    { titre: "Capital", sousTitre: "Up to 70% savings versus new", chemin: "/competences/capital" },
    { titre: "Feed", sousTitre: "Broadcast • Post-production", chemin: "/competences/feed" },
  ],
  baseline: "The right decisions turn your infrastructure into a lasting advantage.",
  titrePoles: "Our divisions",
  colonnes: [
    {
      titre: "The company",
      liens: [
        { libelle: "Approach", chemin: "/notre-approche" },
        { libelle: "About", chemin: "/a-propos" },
      ],
    },
  ],
  contact: { ...fr.contact, titre: "Contact", libelleFormulaire: "Our form" },
  liensLegaux: [
    { libelle: "Legal notice", chemin: "/mentions-legales" },
    { libelle: "Privacy policy", chemin: "/politique-de-confidentialite" },
    { libelle: "Cookie settings", chemin: "/gestion-des-cookies" },
  ],
  credit: { libelle: "Site designed by StriQ", url: "https://www.striq.fr" },
};

const payload = await getPayload({ config });

/**
 * Recopie les identifiants de lignes du français sur les données anglaises.
 *
 * Les tableaux ne sont pas localisés — seuls leurs libellés le sont — si bien
 * que les deux langues partagent les mêmes lignes. Écrire l'anglais sans
 * reprendre ces identifiants ferait recréer les lignes, et les libellés
 * français partiraient avec les anciennes.
 */
function reprendreIds<T extends { id?: string | null }>(
  reference: readonly T[] | null | undefined,
  cible: readonly Record<string, unknown>[],
) {
  return cible.map((ligne, i) => ({ ...ligne, id: reference?.[i]?.id }));
}

await payload.updateGlobal({ slug: "navigation", locale: "fr", data: fr });
payload.logger.info("[navigation] libellés écrits pour « fr »");

const pose = await payload.findGlobal({ slug: "navigation", locale: "fr", depth: 0 });

await payload.updateGlobal({
  slug: "navigation",
  locale: "en",
  data: {
    ...en,
    liensPrincipaux: reprendreIds(pose.liensPrincipaux, en.liensPrincipaux),
    poles: reprendreIds(pose.poles, en.poles),
    liensLegaux: reprendreIds(pose.liensLegaux, en.liensLegaux),
    colonnes: reprendreIds(pose.colonnes, en.colonnes).map((colonne, i) => ({
      ...colonne,
      liens: reprendreIds(pose.colonnes?.[i]?.liens, en.colonnes[i].liens),
    })),
  },
});
payload.logger.info("[navigation] libellés écrits pour « en »");

process.exit(0);
