import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Titres et descriptions pour les moteurs.
 *
 * Ils ne reprennent pas les titres affichés : un titre de page s'adresse au
 * lecteur déjà arrivé, un titre de résultat doit le décider à venir. D'où des
 * formulations plus explicites, et le nom de la marque là où il aide à situer.
 *
 * Les longueurs visées sont celles au-delà desquelles Google tronque : une
 * soixantaine de signes pour le titre, cent soixante pour la description. Le
 * script les vérifie et refuse d'écrire au-delà.
 *
 * Les articles de blog sont laissés de côté : leur contenu est du remplissage.
 */
const payload = await getPayload({ config });

const LIMITE_TITRE = 60;
const LIMITE_DESCRIPTION = 160;

type Fiche = { titre: string; description: string };

const pages: Record<string, { fr: Fiche; en: Fiche }> = {
  competences: {
    fr: {
      titre: "Nos compétences",
      description:
        "Expertise, Capital et Feed couvrent tout le cycle de vie de votre infrastructure : conseil et architecture, revalorisation du parc, environnements médias.",
    },
    en: {
      titre: "What we do",
      description:
        "Expertise, Capital and Feed cover the whole life cycle of your infrastructure: advice and architecture, hardware remarketing, critical media environments.",
    },
  },
  expertise: {
    fr: {
      titre: "Expertise, le conseil avant l’exécution",
      description:
        "Audit, cartographie des risques, conformité NIS2 et ISO 27001, PRA et PCA testés. Le pôle qui sécurise vos décisions avant d’engager le moindre budget.",
    },
    en: {
      titre: "Expertise, advice before execution",
      description:
        "Audit, risk mapping, NIS2 and ISO 27001 compliance, tested recovery plans. The division that secures your decisions before any budget is committed.",
    },
  },
  capital: {
    fr: {
      titre: "Capital, revaloriser votre parc IT",
      description:
        "Rachat, reconditionnement et revente encadrée : jusqu’à 70 % d’économie face au neuf, avec l’œil d’un expert infrastructure plutôt que d’un revendeur.",
    },
    en: {
      titre: "Capital, remarketing your IT estate",
      description:
        "Buy-back, refurbishment and supervised resale: up to 70% savings versus new, with the eye of an infrastructure expert rather than a reseller.",
    },
  },
  feed: {
    fr: {
      titre: "Feed, infrastructures critiques pour les médias",
      description:
        "Diffusion, stockage haute performance, continuité et conformité : le pôle broadcast et post-production de Bone, pour des chaînes qui ne s’arrêtent pas.",
    },
    en: {
      titre: "Feed, critical infrastructure for media",
      description:
        "Broadcast, high-performance storage, continuity and compliance: Bone’s broadcast and post-production division, for channels that never go off air.",
    },
  },
  "notre-approche": {
    fr: {
      titre: "Notre approche, comprendre avant de décider",
      description:
        "Une méthode en quatre temps, un point d’entrée adapté à chaque fonction, et un diagnostic gratuit qui distingue l’urgent de ce qui peut attendre.",
    },
    en: {
      titre: "Our approach, understand before deciding",
      description:
        "A method in four stages, an entry point suited to each role, and a free diagnosis that separates what is urgent from what can still wait.",
    },
  },
  "a-propos": {
    fr: {
      titre: "À propos, treize ans de pratique",
      description:
        "Treize ans de pratique, des ingénieurs et architectes certifiés, trois pôles complémentaires. L’expert stratégique des infrastructures IT critiques.",
    },
    en: {
      titre: "About, thirteen years of practice",
      description:
        "Thirteen years of practice, certified engineers and architects, three complementary divisions. The strategic expert in critical IT infrastructure.",
    },
  },
  blog: {
    fr: {
      titre: "Blog, comprendre avant d’investir",
      description:
        "Analyses et repères de décision sur l’infrastructure IT, la revalorisation du parc et les environnements audiovisuels critiques. Sans jargon gratuit.",
    },
    en: {
      titre: "Blog, understand before you invest",
      description:
        "Analysis and decision markers on IT infrastructure, hardware remarketing and critical broadcast environments. No gratuitous jargon.",
    },
  },
  "mentions-legales": {
    fr: {
      titre: "Mentions légales",
      description:
        "Éditeur, hébergeur, propriété intellectuelle et droit applicable du site de Bone.",
    },
    en: {
      titre: "Legal notice",
      description:
        "Publisher, host, intellectual property and governing law for the Bone website.",
    },
  },
  "politique-de-confidentialite": {
    fr: {
      titre: "Politique de confidentialité",
      description:
        "Ce que le site collecte, pourquoi, combien de temps il le conserve, et comment exercer vos droits. Aucun cookie de mesure ni de publicité.",
    },
    en: {
      titre: "Privacy policy",
      description:
        "What the site collects, why, how long it keeps it, and how to exercise your rights. No analytics or advertising cookies.",
    },
  },
  "gestion-des-cookies": {
    fr: {
      titre: "Gestion des cookies",
      description:
        "Ce site ne dépose aucun cookie de mesure d’audience ni de publicité. Aucun bandeau de consentement, rien à accepter ni à refuser.",
    },
    en: {
      titre: "Cookie settings",
      description:
        "This site sets no analytics or advertising cookies. No consent banner, nothing to accept or refuse.",
    },
  },
};

const globaux: Record<"accueil" | "contact", { fr: Fiche; en: Fiche }> = {
  accueil: {
    fr: {
      titre: "BONE, l’expert indépendant des infrastructures IT",
      description:
        "Conseil et architecture d’infrastructures critiques : réseau, stockage, systèmes, sécurité. Bone audite, hiérarchise les risques et sécurise vos décisions.",
    },
    en: {
      titre: "BONE, the independent expert in IT infrastructure",
      description:
        "Advice and architecture for critical infrastructure: network, storage, systems, security. Bone audits, ranks the risks and makes your decisions safe.",
    },
  },
  contact: {
    fr: {
      titre: "Contact, demandez votre diagnostic",
      description:
        "Diagnostic de deux heures, audit ciblé, health check ou appel technique : le point d’entrée s’adapte à votre rôle. Réponse sous 24 à 48 heures ouvrées.",
    },
    en: {
      titre: "Contact, request your diagnosis",
      description:
        "A two-hour diagnosis, a targeted audit, a health check or a technical call: the entry point adapts to your role. Reply within 24 to 48 working hours.",
    },
  },
};

/** Un titre tronqué par Google vaut un titre écrit par Google. */
function verifier(ou: string, langue: string, { titre, description }: Fiche) {
  if (titre.length > LIMITE_TITRE) {
    throw new Error(`${ou} (${langue}) : titre de ${titre.length} signes, ${LIMITE_TITRE} au plus`);
  }
  if (description.length > LIMITE_DESCRIPTION) {
    throw new Error(
      `${ou} (${langue}) : description de ${description.length} signes, ${LIMITE_DESCRIPTION} au plus`,
    );
  }
}

for (const [slug, fiches] of Object.entries(pages)) {
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    draft: true,
  });
  if (!docs[0]) {
    payload.logger.warn(`[référencement] page « ${slug} » introuvable`);
    continue;
  }
  for (const langue of ["fr", "en"] as const) {
    verifier(slug, langue, fiches[langue]);
    await payload.update({
      collection: "pages",
      id: docs[0].id,
      locale: langue,
      data: {
        metaTitre: fiches[langue].titre,
        metaDescription: fiches[langue].description,
        ...(langue === "fr" ? { _status: "published" as const } : {}),
      },
    });
  }
  payload.logger.info(`[référencement] ${slug}`);
}

for (const [slug, fiches] of Object.entries(globaux)) {
  for (const langue of ["fr", "en"] as const) {
    verifier(slug, langue, fiches[langue]);
    await payload.updateGlobal({
      slug: slug as "accueil" | "contact",
      locale: langue,
      data: {
        referencement: {
          metaTitre: fiches[langue].titre,
          metaDescription: fiches[langue].description,
        },
      },
    });
  }
  payload.logger.info(`[référencement] global ${slug}`);
}

process.exit(0);
