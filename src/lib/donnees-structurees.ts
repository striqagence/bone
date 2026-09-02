import { lien, type Langue } from "./i18n";

/**
 * Données structurées du site, au format JSON-LD.
 *
 * Elles ne décrivent que ce que la page montre réellement. Deux règles s'y
 * tiennent : rien qui ne soit visible du visiteur — une FAQ balisée dont la
 * réponse n'apparaît pas est une infraction aux consignes de Google — et rien
 * qui ne soit vérifié. Les identifiants d'immatriculation manquent encore aux
 * mentions légales : ils manquent donc aussi ici, plutôt que d'être inventés.
 *
 * L'adresse de base vient de l'environnement. En développement elle vaut
 * localhost, ce qui produit des URL absolues inutilisables mais sans
 * conséquence : les moteurs ne lisent que la production.
 */
export const BASE = (process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

const absolu = (chemin: string, langue: Langue) => `${BASE}${lien(chemin, langue)}`;

/**
 * Adresses équivalentes d'une même page. La canonique est celle de la langue
 * lue ; `x-default` renvoie au français, langue d'origine du site.
 */
export function alternatives(chemin: string, langue: Langue) {
  return {
    canonical: lien(chemin, langue),
    languages: {
      fr: lien(chemin, "fr"),
      en: lien(chemin, "en"),
      "x-default": lien(chemin, "fr"),
    },
  };
}

/** L'entreprise, référencée par toutes les autres fiches. */
export const ORGANISATION = `${BASE}/#organisation`;

export function organisation(langue: Langue) {
  return {
    "@type": "Organization",
    "@id": ORGANISATION,
    name: "BONE",
    url: absolu("/", langue),
    logo: `${BASE}/brand/bone-logotype.svg`,
    email: "bone@contact.fr",
    telephone: "+33180866066",
    address: {
      "@type": "PostalAddress",
      streetAddress: "27 avenue de la Baltique",
      postalCode: "91140",
      addressLocality: "Villebon-sur-Yvette",
      addressCountry: "FR",
    },
    sameAs: ["https://www.linkedin.com"],
  };
}

export function siteWeb(langue: Langue, description: string) {
  return {
    "@type": "WebSite",
    "@id": `${BASE}/#site`,
    url: absolu("/", langue),
    name: "BONE",
    description,
    inLanguage: langue,
    publisher: { "@id": ORGANISATION },
  };
}

/**
 * Nom de l'accueil dans le fil d'ariane. Deux mots de navigation, sans
 * équivalent en base : le global de navigation nomme les rubriques, pas la
 * racine, que la maquette ne montre qu'en pictogramme.
 */
export const ACCUEIL: Record<Langue, string> = { fr: "Accueil", en: "Home" };

/**
 * Fil d'ariane. Le premier maillon est toujours l'accueil, comme à l'écran :
 * la fiche doit décrire la page, pas une navigation idéale.
 */
export function filDAriane(langue: Langue, entrees: { libelle: string; chemin: string }[]) {
  const complet = [{ libelle: ACCUEIL[langue], chemin: "/" }, ...entrees];
  return {
    "@type": "BreadcrumbList",
    itemListElement: complet.map(({ libelle, chemin }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: libelle,
      item: absolu(chemin, langue),
    })),
  };
}

/** Page ordinaire, rattachée au site et à son fil d'ariane. */
export function page(
  langue: Langue,
  {
    chemin,
    titre,
    description,
    type = "WebPage",
  }: { chemin: string; titre: string; description: string; type?: string },
) {
  return {
    "@type": type,
    "@id": `${absolu(chemin, langue)}#page`,
    url: absolu(chemin, langue),
    name: titre,
    description,
    inLanguage: langue,
    isPartOf: { "@id": `${BASE}/#site` },
    about: { "@id": ORGANISATION },
  };
}

/** Un pôle : ce que Bone vend, décrit comme un service. */
export function service(
  langue: Langue,
  { chemin, nom, description }: { chemin: string; nom: string; description: string },
) {
  return {
    "@type": "Service",
    "@id": `${absolu(chemin, langue)}#service`,
    name: nom,
    description,
    url: absolu(chemin, langue),
    provider: { "@id": ORGANISATION },
    areaServed: { "@type": "Country", name: "France" },
  };
}

/**
 * Questions fréquentes. Seules les questions dont la réponse est affichée sont
 * reprises : baliser une réponse absente de la page contreviendrait aux
 * consignes des moteurs.
 */
export function questionsFrequentes(questions: { question: string; reponse?: string | null }[]) {
  const repondues = questions.filter((q) => (q.reponse ?? "").trim());
  if (repondues.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: repondues.map(({ question, reponse }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: reponse },
    })),
  };
}

/** Assemble le graphe : une seule balise par page, plusieurs fiches dedans. */
export function graphe(fiches: (object | null)[]) {
  return { "@context": "https://schema.org", "@graph": fiches.filter(Boolean) };
}
