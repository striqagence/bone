import { getPayload } from "payload";
import config from "@payload-config";

/** Page « Notre approche » : hero et cinq sections, dans les deux langues. */
const payload = await getPayload({ config });

const media = async (fichier: string) => {
  const { docs } = await payload.find({
    collection: "media",
    where: { filename: { equals: fichier } },
    limit: 1,
  });
  return docs[0]?.id;
};

/** La maquette reprend ici la photo du hero de « Nos compétences ». */
const photoHero = await media("hero-competences.jpg");
const photoFaq = await media("article-exemple.jpg");

const heroFr = {
  surtitre: "Notre méthode",
  accroche: "Comprendre d’abord. Décider ensuite. Performer durablement.",
  description:
    "Bone est le médecin de l’infrastructure IT : pas celui qui prescrit sans ausculter. On comprend, on pose le bon diagnostic, on explique, on propose un traitement adapté à la réalité, pas au catalogue.",
  image: photoHero,
  cta: { libelle: "Parler à un expert", chemin: "/contact" },
};

const heroEn = {
  surtitre: "Our method",
  accroche: "Understand first. Decide next. Perform for the long run.",
  description:
    "Bone is the physician of IT infrastructure: not the one who prescribes without examining. We understand, we make the right diagnosis, we explain, and we propose treatment suited to reality rather than to a catalogue.",
  image: photoHero,
  cta: { libelle: "Talk to an expert", chemin: "/contact" },
};

const fr = [
  {
    blockType: "grille" as const,
    surtitre: "Le déroulé",
    titre: "Une méthode en quatre temps",
    chapo:
      "Chaque étape conditionne la suivante, on ne saute jamais directement à la solution.",
    intitules: [
      {
        texte: "Complexité",
        description:
          "Le point de départ est toujours le même, une infrastructure devenue difficile à lire et à piloter.",
      },
      {
        texte: "Durabilité",
        description:
          "Une infrastructure qui tient dans le temps, pas seulement le jour de la mise en production.",
      },
      {
        texte: "Compréhension systémique",
        description: "On reconstruit une vision d’ensemble avant de proposer quoi que ce soit.",
      },
      {
        texte: "Décision",
        description: "Un choix éclairé, documenté, propre à votre contexte réel.",
      },
    ],
  },
  {
    blockType: "posture" as const,
    surtitre: "Une posture assumée",
    refus: {
      intitule: "On ne dit pas",
      citation: "« Vous devez tout remplacer maintenant »",
      precision: "ou toute recommandation qui ne serait pas justifiée par le diagnostic.",
    },
    engagement: {
      intitule: "On dit",
      citation:
        "« Voici ce que révèle votre infrastructure, et voici ce que ça change concrètement pour vous »",
    },
  },
  {
    blockType: "pointsEntree" as const,
    surtitre: "Votre première étape dépend de votre rôle",
    titre: "Un point d’entrée adapté à chaque fonction",
    enTetes: { profil: "Profil", pointEntree: "Point d’entrée", livrable: "Livrable" },
    lignes: [
      {
        profil: "DSI",
        pointEntree: "Diagnostic 2h risques prioritaires",
        livrable: "Cartographie des risques",
      },
      {
        profil: "RSSI",
        pointEntree: "Audit sécurité ciblé (réseau ou stockage)",
        livrable: "Carte des risques + écarts NIS2",
      },
      {
        profil: "Directeur technique",
        pointEntree: "Health check 3j sur l’architecture",
        livrable: "Carte des dépendances + top 5 risques",
      },
      {
        profil: "Responsable infra",
        pointEntree: "Appel technique 30 min avec un expert",
        livrable: "Conversation technique directe",
      },
    ],
  },
  {
    blockType: "faq" as const,
    surtitre: "Questions fréquentes",
    titre: "Vos questions, nos réponses franches.",
    image: photoFaq,
    questions: [
      {
        question: "Combien de temps dure un premier diagnostic ?",
        reponse:
          "Deux heures d’échange suffisent à dégager les risques prioritaires. Un audit plus poussé — health check d’architecture, audit sécurité ciblé — se compte en jours, trois en général.",
      },
      {
        question: "Faut-il un budget pour démarrer avec Bone ?",
        reponse:
          "Non, le premier diagnostic est non engageant, le budget n’intervient qu’à partir des étapes suivantes.",
      },
      {
        question: "Bone intervient-il sans créer de dépendance ?",
        reponse:
          "Oui, c’est la règle. Chaque mission se termine par des livrables qui restent chez vous — cartographie, documentation, plan d’action — et par un transfert à vos équipes. Vous devez pouvoir continuer sans nous.",
      },
    ],
  },
  {
    blockType: "appelAction" as const,
    surtitre: "notre point de départ",
    titre: "On ouvre toujours sur votre problème. Jamais sur la techno.",
    chapo:
      "Un premier échange suffit pour cadrer votre situation et identifier la bonne porte d’entrée.",
    cta: { libelle: "Demander un audit", chemin: "/contact" },
  },
];

const en = [
  {
    blockType: "grille" as const,
    surtitre: "The sequence",
    titre: "A method in four stages",
    chapo: "Each stage conditions the next; we never jump straight to the solution.",
    intitules: [
      {
        texte: "Complexity",
        description:
          "The starting point is always the same: an infrastructure that has become hard to read and hard to steer.",
      },
      {
        texte: "Durability",
        description:
          "An infrastructure that holds over time, not only on the day it goes live.",
      },
      {
        texte: "Systemic understanding",
        description: "We rebuild an overall picture before proposing anything at all.",
      },
      {
        texte: "Decision",
        description: "An informed, documented choice, specific to your real context.",
      },
    ],
  },
  {
    blockType: "posture" as const,
    surtitre: "A stated stance",
    refus: {
      intitule: "We do not say",
      citation: "“You need to replace everything now”",
      precision: "or any recommendation the diagnosis does not justify.",
    },
    engagement: {
      intitule: "We say",
      citation:
        "“Here is what your infrastructure reveals, and here is what that changes for you in practice”",
    },
  },
  {
    blockType: "pointsEntree" as const,
    surtitre: "Your first step depends on your role",
    titre: "An entry point suited to each function",
    enTetes: { profil: "Role", pointEntree: "Entry point", livrable: "Deliverable" },
    lignes: [
      { profil: "CIO", pointEntree: "2h diagnosis of priority risks", livrable: "Risk map" },
      {
        profil: "CISO",
        pointEntree: "Targeted security audit (network or storage)",
        livrable: "Risk map + NIS2 gaps",
      },
      {
        profil: "Technical director",
        pointEntree: "Three-day architecture health check",
        livrable: "Dependency map + top 5 risks",
      },
      {
        profil: "Infrastructure manager",
        pointEntree: "30-minute technical call with an expert",
        livrable: "A direct technical conversation",
      },
    ],
  },
  {
    blockType: "faq" as const,
    surtitre: "Frequently asked questions",
    titre: "Your questions, our straight answers.",
    image: photoFaq,
    questions: [
      {
        question: "How long does a first diagnosis take?",
        reponse:
          "Two hours of conversation are enough to surface the priority risks. A deeper audit — an architecture health check, a targeted security audit — is counted in days, usually three.",
      },
      {
        question: "Do I need a budget to start with Bone?",
        reponse:
          "No, the first diagnosis is non-binding; budget only comes into play at the following stages.",
      },
      {
        question: "Does Bone work without creating dependency?",
        reponse:
          "Yes, that is the rule. Every engagement ends with deliverables that stay with you — maps, documentation, an action plan — and with a handover to your teams. You must be able to carry on without us.",
      },
    ],
  },
  {
    blockType: "appelAction" as const,
    surtitre: "our starting point",
    titre: "We always open on your problem. Never on the technology.",
    chapo:
      "A first conversation is enough to frame your situation and identify the right entry point.",
    cta: { libelle: "Request an audit", chemin: "/contact" },
  },
];

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "notre-approche" } },
  limit: 1,
  draft: true,
});
const id = docs[0]!.id;

await payload.update({
  collection: "pages",
  id,
  locale: "fr",
  data: { ...heroFr, sections: fr, _status: "published" },
});

/** Les blocs et leurs tableaux partagent leurs lignes entre langues. */
const pose = await payload.findByID({ collection: "pages", id, locale: "fr", depth: 0 });

const avecIds = (bloc: Record<string, unknown>, i: number) => {
  const poseBloc = pose.sections?.[i] as Record<string, unknown> | undefined;
  const sortie: Record<string, unknown> = { ...bloc, id: poseBloc?.id };
  for (const cle of ["intitules", "questions", "lignes"]) {
    if (Array.isArray(bloc[cle]) && Array.isArray(poseBloc?.[cle])) {
      sortie[cle] = (bloc[cle] as Record<string, unknown>[]).map((l, j) => ({
        ...l,
        id: (poseBloc[cle] as Record<string, unknown>[])[j]?.id,
      }));
    }
  }
  return sortie;
};

await payload.update({
  collection: "pages",
  id,
  locale: "en",
  data: { ...heroEn, sections: en.map(avecIds) as never },
});

payload.logger.info("[approche] page écrite dans les deux langues");
process.exit(0);
