import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Page Expertise : son hero et sa première section.
 *
 * Le hero reprend la formulation de la maquette « Hero pages internes niveau 2 ».
 * Les sections suivantes de l'écran restent à intégrer.
 */
const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "expertise" } },
  limit: 1,
  draft: true,
});
if (!docs[0]) throw new Error("page « expertise » introuvable");
const id = docs[0].id;

const heroFr = {
  accroche: "L’expertise qui donne du sens à toute l’infrastructure.",
  description:
    "On n’exécute pas une commande. On analyse, on structure, on guide. Bone Expertise ne vend pas qu’une prestation : on sécurise une décision.",
  cta: { libelle: "Parler à un expert", chemin: "/contact" },
};

const heroEn = {
  accroche: "The expertise that gives the whole infrastructure its meaning.",
  description:
    "We do not execute an order. We analyse, we structure, we guide. Bone Expertise does not just sell a service: it makes a decision safe.",
  cta: { libelle: "Talk to an expert", chemin: "/contact" },
};

const grilleFr = {
  blockType: "grille" as const,
  surtitre: "Audit & Conseil",
  titre: "Le conseil avant l’exécution",
  chapo:
    "Avant de toucher à un seul câble, on cadre : ce qu’on doit protéger, ce qu’on peut risquer, et dans quel ordre agir.",
  intitules: [
    { texte: "Audit technique & stratégique de l’existant" },
    { texte: "Cahiers des charges & appels d’offres" },
    { texte: "Cartographie des risques & interdépendances" },
    { texte: "Conformité NIS2 · ISO 27001" },
    { texte: "Aide à la décision DSI / RSSI / Dir. technique" },
    { texte: "Direction de projet & pilotage de migration" },
    { texte: "Rédaction PSSI · PRA · PCA" },
    { texte: "Structuration du SI" },
  ],
};

const grilleEn = {
  blockType: "grille" as const,
  surtitre: "Audit & advice",
  titre: "Advice before execution",
  chapo:
    "Before touching a single cable, we frame it: what must be protected, what can be risked, and in which order to act.",
  intitules: [
    { texte: "Technical and strategic audit of the existing estate" },
    { texte: "Specifications & tenders" },
    { texte: "Mapping of risks & interdependencies" },
    { texte: "NIS2 · ISO 27001 compliance" },
    { texte: "Decision support for CIO / CISO / engineering leads" },
    { texte: "Project direction & migration steering" },
    { texte: "Writing of PSSI · DRP · BCP" },
    { texte: "Structuring the information system" },
  ],
};


const couchesFr = {
  blockType: "escalier" as const,
  surtitre: "Les enjeux que nous traitons",
  titre: "Trois couches, une seule cohérence",
  chapo:
    "Réseau, stockage et systèmes ne se pilotent pas séparément : chaque décision sur l’un impacte les deux autres.",
  cartes: [
    {
      picto: "antenne" as const,
      titre: "Réseau",
      texte:
        "Le réseau, c’est le système circulatoire de votre infrastructure : tout transite par lui, et la moindre faiblesse s’y propage instantanément. On l’audite en premier, avant même de parler stockage ou systèmes. Une architecture réseau mal pensée rend inefficace tout ce qui repose dessus.",
      accentuee: false,
    },
    {
      picto: "stockage" as const,
      titre: "Stockage",
      texte:
        "Le stockage n’est jamais neutre : mal dimensionné, il coûte cher ; mal sécurisé, il expose vos données les plus sensibles. On évalue autant la performance que la résilience — un stockage rapide mais sans plan de reprise n’est qu’un risque déguisé. C’est souvent là que se cache la dette technique la plus coûteuse à corriger.",
      accentuee: false,
    },
    {
      picto: "systemes" as const,
      titre: "Systèmes et virtualisation",
      texte:
        "Les systèmes et la virtualisation sont la couche qui exécute vos applications critiques au quotidien. Une virtualisation mal architecturée crée des dépendances invisibles jusqu’au jour de l’incident. On vérifie la cohérence entre ce que vous croyez avoir déployé et ce qui tourne réellement.",
      accentuee: true,
    },
  ],
};

const couchesEn = {
  blockType: "escalier" as const,
  surtitre: "The issues we handle",
  titre: "Three layers, one coherence",
  chapo:
    "Network, storage and systems are not steered separately: every decision on one affects the other two.",
  cartes: [
    {
      picto: "antenne" as const,
      titre: "Network",
      texte:
        "The network is your infrastructure’s circulatory system: everything travels through it, and the slightest weakness spreads instantly. We audit it first, before even discussing storage or systems. A poorly designed network architecture makes everything resting on it ineffective.",
      accentuee: false,
    },
    {
      picto: "stockage" as const,
      titre: "Storage",
      texte:
        "Storage is never neutral: badly sized, it costs a fortune; badly secured, it exposes your most sensitive data. We assess resilience as much as performance — fast storage with no recovery plan is only a risk in disguise. This is often where the most expensive technical debt hides.",
      accentuee: false,
    },
    {
      picto: "systemes" as const,
      titre: "Systems and virtualisation",
      texte:
        "Systems and virtualisation are the layer that runs your critical applications day to day. Poorly architected virtualisation creates dependencies that stay invisible until the day of the incident. We check that what runs matches what you believe you deployed.",
      accentuee: true,
    },
  ],
};

const articlesFr = {
  blockType: "articles" as const,
  surtitre: "à lire aussi",
  titre: "Pour aller plus loin",
  libelleAction: "Lire l’article",
  nombre: 4,
};

const articlesEn = {
  blockType: "articles" as const,
  surtitre: "further reading",
  titre: "Going further",
  libelleAction: "Read the article",
  nombre: 4,
};

const { docs: photosFaq } = await payload.find({
  collection: "media",
  where: { filename: { equals: "article-exemple.jpg" } },
  limit: 1,
});

/** Mêmes questions que la FAQ de l'accueil : la maquette les répète. */
const faqFr = {
  blockType: "faq" as const,
  surtitre: "Questions fréquentes",
  titre: "Vos questions, nos réponses franches.",
  image: photosFaq[0]?.id,
  questions: [
    {
        question: "Que fait exactement Bone ?",
        reponse:
          "Bone conseille et architecture des infrastructures IT : réseau, stockage, systèmes et sécurité. On audite l’existant, on pose un diagnostic, on hiérarchise les risques et on accompagne la mise en œuvre. On ne revend pas de matériel.",
      },
    {
      question: "Bone est-il un revendeur de matériel ou un cabinet de conseil ?",
      reponse:
        "Bone ne revend aucun matériel : c’est un cabinet de conseil et d’architecture indépendant, rémunéré pour la clarté de la décision.",
    },
    {
        question: "Faut-il un budget pour démarrer avec Bone ?",
        reponse:
          "Non. Le premier diagnostic est offert et sans engagement : il sert justement à distinguer ce qui mérite un budget de ce qui n’en demande pas.",
      },
    {
        question: "Bone intervient-il sans créer de dépendance ?",
        reponse:
          "Oui, c’est la règle. Chaque mission se termine par des livrables qui restent chez vous — cartographie, documentation, plan d’action — et par un transfert à vos équipes. Vous devez pouvoir continuer sans nous.",
      },
  ],
};

const faqEn = {
  blockType: "faq" as const,
  surtitre: "Frequently asked questions",
  titre: "Your questions, our straight answers.",
  image: photosFaq[0]?.id,
  questions: [
    {
        question: "What exactly does Bone do?",
        reponse:
          "Bone advises on and architects IT infrastructure: network, storage, systems and security. We audit what exists, make a diagnosis, rank the risks and support the implementation. We do not resell hardware.",
      },
    {
      question: "Is Bone a hardware reseller or a consultancy?",
      reponse:
        "Bone resells no hardware: it is an independent consultancy and architecture practice, paid for the clarity of the decision.",
    },
    {
        question: "Do I need a budget to start with Bone?",
        reponse:
          "No. The first diagnosis is free and non-binding: its purpose is precisely to separate what deserves a budget from what does not.",
      },
    {
        question: "Does Bone work without creating dependency?",
        reponse:
          "Yes, that is the rule. Every engagement ends with deliverables that stay with you — maps, documentation, an action plan — and with a handover to your teams. You must be able to carry on without us.",
      },
  ],
};

await payload.update({
  collection: "pages",
  id,
  locale: "fr",
  data: { ...heroFr, sections: [grilleFr, couchesFr, faqFr, articlesFr], _status: "published" },
});

const pose = await payload.findByID({ collection: "pages", id, locale: "fr", depth: 0 });
const [blocGrille, blocCouches, blocFaq, blocArticles] = pose.sections ?? [];

await payload.update({
  collection: "pages",
  id,
  locale: "en",
  data: {
    ...heroEn,
    sections: [
      {
        ...grilleEn,
        id: blocGrille?.id,
        intitules: grilleEn.intitules.map((t, i) => ({
          ...t,
          id: blocGrille && "intitules" in blocGrille ? blocGrille.intitules?.[i]?.id : undefined,
        })),
      },
      {
        ...couchesEn,
        id: blocCouches?.id,
        cartes: couchesEn.cartes.map((c, i) => ({
          ...c,
          id: blocCouches && "cartes" in blocCouches ? blocCouches.cartes?.[i]?.id : undefined,
        })),
      },
      {
        ...faqEn,
        id: blocFaq?.id,
        questions: faqEn.questions.map((q, i) => ({
          ...q,
          id: blocFaq && "questions" in blocFaq ? blocFaq.questions?.[i]?.id : undefined,
        })),
      },
      { ...articlesEn, id: blocArticles?.id },
    ],
  },
});

payload.logger.info("[expertise] hero et grille écrits dans les deux langues");
process.exit(0);
