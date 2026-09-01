import { getPayload } from "payload";
import config from "@payload-config";

import { logosPartenaires as logos } from "./partenaires";

/** Page Feed (pôle médias) : hero et cinq sections, dans les deux langues. */
const payload = await getPayload({ config });

const { docs: photosFaq } = await payload.find({
  collection: "media",
  where: { filename: { equals: "article-exemple.jpg" } },
  limit: 1,
});
const photoFaq = photosFaq[0]?.id;

const heroFr = {
  surtitre: "Broadcast • Post-production",
  accroche: "Infrastructures critiques pour l’industrie médias.",
  description:
    "Flux vidéo temps réel, stockage massif, redondance absolue, latence zéro tolérée. Une chaîne qui ne diffuse pas, c’est une chaîne qui n’existe pas.",
  cta: { libelle: "Parler à un expert", chemin: "/contact" },
};

const heroEn = {
  surtitre: "Broadcast • Post-production",
  accroche: "Critical infrastructure for the media industry.",
  description:
    "Real-time video streams, massive storage, absolute redundancy, zero tolerated latency. A channel that does not broadcast is a channel that does not exist.",
  cta: { libelle: "Talk to an expert", chemin: "/contact" },
};


const fr = [
  {
    blockType: "grille" as const,
    surtitre: "Notre méthode",
    titre: "Cinq savoir-faire au service du direct",
    chapo:
      "De la diffusion à la conformité sectorielle, chaque maillon de la chaîne broadcast est couvert par une expertise dédiée.",
    intitules: [
      {
        texte: "Infrastructures de diffusion",
        description:
          "Conception et exploitation de chaînes de diffusion résilientes, pensées pour tourner sans interruption.",
      },
      {
        texte: "Stockage haute performance",
        description:
          "Des architectures de stockage capables d’absorber les débits massifs du flux vidéo temps réel.",
      },
      {
        texte: "Continuité & résilience",
        description:
          "Des plans de secours réellement testés pour une industrie où l’arrêt n’est pas une option.",
      },
      {
        texte: "Audit & conformité secteur médias",
        description:
          "Une lecture des risques adaptée aux contraintes spécifiques de l’audiovisuel critique.",
      },
      {
        texte: "Conseil & accompagnement projet",
        description: "Un accompagnement de bout en bout, de la migration à la mise en production.",
      },
    ],
  },
  { blockType: "partenaires" as const, surtitre: "Ils nous font confiance", logos },
  {
    blockType: "differenciation" as const,
    surtitre: "Où en est Bone Media",
    titre: "Une verticale déjà en mouvement, pas un projet sur papier",
    habituelle: {
      badge: "Une verticale opérationnelle",
      titre: "Équipe dédiée, missions en cours",
      texte:
        "Une équipe spécialisée, mobilisée sur des projets broadcast actifs, pas une offre théorique en construction.",
    },
    bone: {
      badge: "Position stratégique",
      titre: "Un secteur encore sous-adressé",
      texte:
        "Peu d’acteurs combinent expertise infrastructure généraliste et compréhension fine des contraintes broadcast, c’est précisément le positionnement de Bone Media.",
    },
  },
  {
    blockType: "faq" as const,
    surtitre: "Questions fréquentes",
    titre: "Vos questions, nos réponses franches.",
    image: photoFaq,
    questions: [
      {
        question: "Pourquoi une infrastructure dédiée aux médias ?",
        reponse:
          "Parce que les contraintes n’y sont pas les mêmes : débits vidéo continus, volumes de stockage hors norme, et une interruption qui se voit immédiatement à l’antenne. Une architecture IT classique n’est pas dimensionnée pour ça.",
      },
      {
        question: "Qu’est-ce qu’une architecture PRA/PCA broadcast ?",
        reponse:
          "Un dispositif de secours conçu pour basculer sans interruption visible à l’antenne, testé en conditions réelles.",
      },
      {
        question: "BONE intervient-il en diffusion live et en post-production ?",
        reponse:
          "Oui, sur les deux. Les besoins diffèrent — latence et redondance d’un côté, capacité et débit de l’autre — mais ils reposent sur la même chaîne, qu’on traite d’un bout à l’autre.",
      },
    ],
  },
  {
    blockType: "appelAction" as const,
    surtitre: "notre point de départ",
    titre: "Un projet de migration ou de modernisation broadcast ?",
    chapo:
      "Qu’il s’agisse d’une migration technique ou d’une modernisation complète, un premier échange permet de cadrer les enjeux spécifiques à votre chaîne de diffusion.",
    cta: { libelle: "Demander un audit", chemin: "/contact" },
  },
];

const en = [
  {
    blockType: "grille" as const,
    surtitre: "Our method",
    titre: "Five skills in the service of live broadcast",
    chapo:
      "From transmission to sector compliance, every link in the broadcast chain is covered by a dedicated expertise.",
    intitules: [
      {
        texte: "Broadcast infrastructure",
        description:
          "Design and operation of resilient broadcast chains, built to run without interruption.",
      },
      {
        texte: "High-performance storage",
        description:
          "Storage architectures able to absorb the massive throughput of real-time video.",
      },
      {
        texte: "Continuity & resilience",
        description:
          "Failover plans genuinely tested, for an industry where going off air is not an option.",
      },
      {
        texte: "Audit & media sector compliance",
        description:
          "A reading of risk adapted to the specific constraints of critical broadcasting.",
      },
      {
        texte: "Advice & project support",
        description: "End-to-end support, from migration through to going live.",
      },
    ],
  },
  { blockType: "partenaires" as const, surtitre: "They trust us", logos },
  {
    blockType: "differenciation" as const,
    surtitre: "Where Bone Media stands",
    titre: "A vertical already in motion, not a project on paper",
    habituelle: {
      badge: "An operational vertical",
      titre: "Dedicated team, live engagements",
      texte:
        "A specialist team, mobilised on active broadcast projects, not a theoretical offering under construction.",
    },
    bone: {
      badge: "Strategic position",
      titre: "A sector still underserved",
      texte:
        "Few players combine generalist infrastructure expertise with a fine grasp of broadcast constraints, which is precisely where Bone Media stands.",
    },
  },
  {
    blockType: "faq" as const,
    surtitre: "Frequently asked questions",
    titre: "Your questions, our straight answers.",
    image: photoFaq,
    questions: [
      {
        question: "Why a dedicated infrastructure for media?",
        reponse:
          "Because the constraints are not the same: continuous video throughput, storage volumes out of the ordinary, and an interruption that shows on air at once. A standard IT architecture is not sized for that.",
      },
      {
        question: "What is a broadcast DR/BC architecture?",
        reponse:
          "A failover setup designed to switch over with no interruption visible on air, tested in real conditions.",
      },
      {
        question: "Does BONE work on live broadcast as well as post-production?",
        reponse:
          "Yes, on both. The needs differ — latency and redundancy on one side, capacity and throughput on the other — but they rest on the same chain, which we handle end to end.",
      },
    ],
  },
  {
    blockType: "appelAction" as const,
    surtitre: "our starting point",
    titre: "A broadcast migration or modernisation project?",
    chapo:
      "Whether it is a technical migration or a full modernisation, a first conversation frames the issues specific to your broadcast chain.",
    cta: { libelle: "Request an audit", chemin: "/contact" },
  },
];

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "feed" } },
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
  for (const cle of ["intitules", "questions", "logos"]) {
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

payload.logger.info("[feed] page écrite dans les deux langues");
process.exit(0);
