import { getPayload } from "payload";
import config from "@payload-config";

/** Page Capital : hero et six sections, dans les deux langues. */
const payload = await getPayload({ config });

const { docs: photosFaq } = await payload.find({
  collection: "media",
  where: { filename: { equals: "article-exemple.jpg" } },
  limit: 1,
});
const photoFaq = photosFaq[0]?.id;

const heroFr = {
  surtitre: "Jusqu’à 70% d’économie vs neuf",
  accroche: "Un parc IT en fin de vie n’est pas une charge. C’est un capital à activer.",
  description:
    "Revalorisation et capitalisation du parc informatique par un expert infrastructure, pas un revendeur qui fait du conseil.",
  cta: { libelle: "Évaluer mon parc", chemin: "/contact" },
};

const heroEn = {
  surtitre: "Up to 70% savings versus new",
  accroche: "An IT estate at end of life is not a burden. It is capital to activate.",
  description:
    "Remarketing and capitalisation of the IT estate by an infrastructure expert, not a reseller who does consulting.",
  cta: { libelle: "Assess my estate", chemin: "/contact" },
};

const comparaison = {
  habituelle: {
    badge: "LE MODÈLE CLASSIQUE",
    titre: "L’approche habituelle",
    puces: [
      { texte: "Fournir du matériel et des heures de prestation." },
      { texte: "Répondre à la demande telle qu’elle est formulée." },
      { texte: "Optimiser pour le contrat, plus que pour votre risque." },
    ],
  },
  bone: {
    badge: "l’avantage bone",
    titre: "Bone",
    puces: [
      { texte: "Challenge le besoin avant de propose une solution." },
      { texte: "Reste indépendant de tout constructeur ou éditeur." },
      { texte: "Est rémunéré pour la clarté de la décision, pas le volume vendu." },
    ],
  },
};

const comparaisonEn = {
  habituelle: {
    badge: "THE USUAL MODEL",
    titre: "The usual approach",
    puces: [
      { texte: "Supplying hardware and billable hours." },
      { texte: "Answering the request exactly as it was phrased." },
      { texte: "Optimising for the contract more than for your risk." },
    ],
  },
  bone: {
    badge: "the bone advantage",
    titre: "Bone",
    puces: [
      { texte: "Challenges the need before proposing a solution." },
      { texte: "Stays independent of any manufacturer or vendor." },
      { texte: "Is paid for the clarity of the decision, not the volume sold." },
    ],
  },
};

const fr = [
  {
    blockType: "promesse" as const,
    surtitre: "notre promesse",
    titre:
      "Revaloriser son parc IT, c’est activer un capital dormant : jusqu’à 70 % d’économie vs neuf, avec l’œil d’un expert infrastructure plutôt qu’un revendeur.",
  },
  {
    blockType: "grille" as const,
    surtitre: "Notre méthode",
    titre: "Quatre façons de faire durer votre parc",
    chapo:
      "De l’estimation initiale à la remise en service, chaque levier peut s’activer seul ou s’enchaîner selon votre besoin.",
    intitules: [
      {
        texte: "Rachat & ITAD",
        description:
          "On rachète et trace vos équipements en fin d’usage, en conformité avec les exigences de destruction et de traçabilité des données.",
      },
      {
        texte: "Stock stratégique & pièces rares",
        description:
          "Un accès à des pièces devenues introuvables chez les constructeurs, pour prolonger un équipement sans attendre un remplacement complet.",
      },
      {
        texte: "Reconditionnement & revente",
        description:
          "Remise à niveau technique et revente encadrée, avec garantie sur le matériel reconditionné.",
      },
      {
        texte: "Conformité NIS2 · ISO 27001",
        description:
          "Une lecture experte de ce qui peut encore durer, et de ce qui doit vraiment être remplacé.",
      },
    ],
  },
  { blockType: "differenciation" as const, surtitre: "différenciation", titre: "Un revendeur n’est pas un expert", ...comparaison },
  {
    blockType: "chiffres" as const,
    surtitre: "Le marché de la revalorisation, en chiffres",
    titre: "Un gisement de valeur largement sous-exploité",
    constat: "La majorité du parc IT mis au rebut a encore une valeur d’usage ou de revente réelle.",
    statistiques: [
      {
        valeur: "~2",
        unite: "M€",
        libelle: "De chiffre d’affaire",
        precision:
          "actuel généré par l’activité de rachat, reconditionnement et revente de matériel IT.",
      },
      {
        valeur: "70",
        unite: "%",
        libelle: "Part en déchet à revaloriser",
        precision:
          "Une proportion du parc IT jetée alors qu’elle conserve une valeur d’usage ou de revente.",
      },
      {
        valeur: "1",
        unite: "er",
        libelle: "Unique sur le marché français",
        precision:
          "Seul acteur combinant expertise infrastructure et revalorisation de parc à cette échelle.",
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
          "Oui, c’est la règle. Chaque mission se termine par des livrables qui restent chez vous (cartographie, documentation, plan d’action) et par un transfert à vos équipes. Vous devez pouvoir continuer sans nous.",
      },
    ],
  },
  {
    blockType: "appelAction" as const,
    surtitre: "notre point de départ",
    titre: "Avant de remplacer, faisons l’inventaire de ce qui vaut encore.",
    chapo:
      "Avant d’investir dans du neuf, un diagnostic gratuit permet de savoir ce qui, dans votre parc actuel, peut encore être exploité.",
    cta: { libelle: "Demander un audit", chemin: "/contact" },
  },
];

const en = [
  {
    blockType: "promesse" as const,
    surtitre: "our promise",
    titre:
      "Remarketing your IT estate means activating dormant capital: up to 70% savings versus new, with the eye of an infrastructure expert rather than a reseller.",
  },
  {
    blockType: "grille" as const,
    surtitre: "Our method",
    titre: "Four ways to make your estate last",
    chapo:
      "From the initial estimate to the return to service, each lever can work alone or follow on from the last.",
    intitules: [
      {
        texte: "Buy-back & ITAD",
        description:
          "We buy back and trace your end-of-use equipment, in line with data destruction and traceability requirements.",
      },
      {
        texte: "Strategic stock & rare parts",
        description:
          "Access to parts no longer available from manufacturers, to extend equipment without waiting for a full replacement.",
      },
      {
        texte: "Refurbishment & resale",
        description: "Technical upgrade and supervised resale, with a warranty on refurbished hardware.",
      },
      {
        texte: "NIS2 · ISO 27001 compliance",
        description: "An expert reading of what can still last, and what genuinely needs replacing.",
      },
    ],
  },
  { blockType: "differenciation" as const, surtitre: "what sets us apart", titre: "A reseller is not an expert", ...comparaisonEn },
  {
    blockType: "chiffres" as const,
    surtitre: "The remarketing market, in figures",
    titre: "A pool of value that is largely untapped",
    constat: "Most of the IT estate sent to waste still holds real usage or resale value.",
    statistiques: [
      { valeur: "~2", unite: "M€", libelle: "In revenue", precision: "currently generated by buy-back, refurbishment and resale of IT hardware." },
      { valeur: "70", unite: "%", libelle: "Share of waste to remarket", precision: "A share of the IT estate discarded while it still holds usage or resale value." },
      { valeur: "1", unite: "st", libelle: "Unique on the French market", precision: "The only player combining infrastructure expertise and estate remarketing at this scale." },
    ],
  },
  {
    blockType: "faq" as const,
    surtitre: "Frequently asked questions",
    titre: "Your questions, our straight answers.",
    image: photoFaq,
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
          "Yes, that is the rule. Every engagement ends with deliverables that stay with you (maps, documentation, an action plan) and with a handover to your teams. You must be able to carry on without us.",
      },
    ],
  },
  {
    blockType: "appelAction" as const,
    surtitre: "our starting point",
    titre: "Before replacing, let us take stock of what still holds value.",
    chapo:
      "Before investing in new hardware, a free diagnosis shows what in your current estate can still be used.",
    cta: { libelle: "Request an audit", chemin: "/contact" },
  },
];

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "capital" } },
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
  for (const cle of ["intitules", "statistiques", "questions"]) {
    if (Array.isArray(bloc[cle]) && Array.isArray(poseBloc?.[cle])) {
      sortie[cle] = (bloc[cle] as Record<string, unknown>[]).map((l, j) => ({
        ...l,
        id: (poseBloc[cle] as Record<string, unknown>[])[j]?.id,
      }));
    }
  }
  for (const cle of ["habituelle", "bone"]) {
    const groupe = bloc[cle] as { puces?: Record<string, unknown>[] } | undefined;
    const poseGroupe = poseBloc?.[cle] as { puces?: Record<string, unknown>[] } | undefined;
    if (groupe?.puces && poseGroupe?.puces) {
      sortie[cle] = {
        ...groupe,
        puces: groupe.puces.map((p, j) => ({ ...p, id: poseGroupe.puces![j]?.id })),
      };
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

payload.logger.info("[capital] page écrite dans les deux langues");
process.exit(0);
