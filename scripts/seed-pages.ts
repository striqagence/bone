import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Crée les pages référencées par la navigation.
 *
 * Seul le hero de « Nos compétences » est renseigné : sa formulation figure
 * dans la maquette. Pour les autres, seuls le titre et la structure sont posés
 * — inventer des accroches commerciales ne rendrait service à personne, et la
 * route retombe sur le titre tant que l'accroche est vide.
 *
 * Idempotent : une page déjà présente est mise à jour, pas dupliquée.
 */
type Contenu = {
  titre: string;
  surtitre?: string;
  accroche?: string;
  description?: string;
  cta?: { libelle: string; chemin: string };
};

type Definition = {
  slug: string;
  parent?: string;
  fr: Contenu;
  en: Contenu;
};

const pages: Definition[] = [
  {
    slug: "competences",
    fr: {
      titre: "Nos compétences",
      surtitre: "Nos compétences",
      accroche: "Trois pôles, une seule logique : sécuriser vos décisions d’infrastructure.",
      description:
        "Expertise, Capital et Feed couvrent l’ensemble du cycle de vie de votre infrastructure : conseil et architecture, revalorisation du parc, et environnements critiques pour les médias. Trois entrées distinctes, une même exigence.",
      cta: { libelle: "Parler à un expert", chemin: "/contact" },
    },
    en: {
      titre: "What we do",
      surtitre: "What we do",
      accroche: "Three divisions, one logic: making your infrastructure decisions safe.",
      description:
        "Expertise, Capital and Feed cover the whole life cycle of your infrastructure: advice and architecture, hardware remarketing, and critical environments for media. Three distinct entry points, one standard.",
      cta: { libelle: "Talk to an expert", chemin: "/contact" },
    },
  },
  { slug: "expertise", parent: "competences", fr: { titre: "Expertise" }, en: { titre: "Expertise" } },
  { slug: "capital", parent: "competences", fr: { titre: "Capital" }, en: { titre: "Capital" } },
  { slug: "feed", parent: "competences", fr: { titre: "Feed" }, en: { titre: "Feed" } },
  { slug: "notre-approche", fr: { titre: "Notre approche" }, en: { titre: "Our approach" } },
  { slug: "blog", fr: { titre: "Blog" }, en: { titre: "Blog" } },
  { slug: "a-propos", fr: { titre: "À propos" }, en: { titre: "About" } },
  { slug: "contact", fr: { titre: "Contact" }, en: { titre: "Contact" } },
  { slug: "mentions-legales", fr: { titre: "Mentions légales" }, en: { titre: "Legal notice" } },
  {
    slug: "politique-de-confidentialite",
    fr: { titre: "Politique de confidentialité" },
    en: { titre: "Privacy policy" },
  },
  { slug: "gestion-des-cookies", fr: { titre: "Gestion des cookies" }, en: { titre: "Cookie settings" } },
];

const payload = await getPayload({ config });
const identifiants = new Map<string, number>();

// Les parents d'abord : une page enfant a besoin de l'identifiant du sien.
for (const def of [...pages].sort((a, b) => Number(Boolean(a.parent)) - Number(Boolean(b.parent)))) {
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: def.slug } },
    limit: 1,
    draft: true,
  });

  const donnees = {
    ...def.fr,
    slug: def.slug,
    parent: def.parent ? identifiants.get(def.parent) : undefined,
    _status: "published" as const,
  };

  const page = docs[0]
    ? await payload.update({ collection: "pages", id: docs[0].id, locale: "fr", data: donnees })
    : await payload.create({ collection: "pages", locale: "fr", data: donnees });

  await payload.update({ collection: "pages", id: page.id, locale: "en", data: def.en });

  identifiants.set(def.slug, page.id);
  payload.logger.info(`[pages] ${def.slug}`);
}

process.exit(0);
