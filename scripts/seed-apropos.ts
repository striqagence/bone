import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

/** Page « À propos » : hero et six sections, dans les deux langues. */
const DOSSIER =
  "/private/tmp/claude-501/-Users-audreybraun/9252f681-a78f-45ef-b4cc-a15965bdb178/scratchpad/photos/pretes";

const payload = await getPayload({ config });

async function media(fichier: string, altFr: string, altEn: string) {
  const { docs } = await payload.find({
    collection: "media",
    where: { filename: { equals: fichier } },
    limit: 1,
  });
  const doc =
    docs[0] ??
    (await payload.create({
      collection: "media",
      locale: "fr",
      filePath: path.join(DOSSIER, fichier),
      data: { alt: altFr },
    }));
  await payload.update({ collection: "media", id: doc.id, locale: "en", data: { alt: altEn } });
  return doc.id;
}

const photoHero = await media(
  "hero-apropos.jpg",
  "Deux collègues examinent une tablette dans un bâtiment technique.",
  "Two colleagues look at a tablet inside a technical building.",
);
const photoEquipe = await media(
  "equipe.jpg",
  "Une équipe réunie autour d’une table de réunion, tournée vers l’objectif.",
  "A team gathered around a meeting table, facing the camera.",
);
const { docs: photosFaq } = await payload.find({
  collection: "media",
  where: { filename: { equals: "article-exemple.jpg" } },
  limit: 1,
});
const photoFaq = photosFaq[0]?.id;

const heroFr = {
  surtitre: "Notre histoire",
  accroche:
    "Les entreprises ne manquent pas de prestataires, elles manquent d’experts qui voient l’ensemble.",
  description:
    "Fondé sur le constat que la complexité IT ne se résout pas en empilant des prestataires, mais en confiant ses décisions à des experts capables de voir l’infrastructure dans son ensemble.",
  image: photoHero,
};

const heroEn = {
  surtitre: "Our story",
  accroche:
    "Companies are not short of suppliers, they are short of experts who see the whole picture.",
  description:
    "Founded on the observation that IT complexity is not solved by stacking up suppliers, but by entrusting decisions to experts able to see the infrastructure as a whole.",
  image: photoHero,
};

const fr = [
  {
    blockType: "reperes" as const,
    cartes: [
      {
        prefixe: "+",
        valeur: "13",
        libelle: "ans d’expérience",
        description: "Une pratique construite sur la durée, pas une offre récente testée sur le marché.",
      },
      {
        valeur: "10",
        suffixe: "K+",
        libelle: "commandes dès 2020",
        description:
          "Un volume d’activité qui traduit une adoption réelle, bien au-delà d’un lancement confidentiel.",
      },
      {
        valeur: "2021",
        libelle: "internationalisation",
        description:
          "Une expansion au-delà du marché français, preuve d’un modèle réplicable à plus grande échelle.",
      },
      {
        valeur: "Bac+5",
        libelle: "profils seniors certifiés",
        description:
          "Des ingénieurs et architectes formés au niveau requis pour intervenir sur des infrastructures critiques.",
      },
    ],
  },
  {
    blockType: "valeurs" as const,
    surtitre: "Nos valeurs",
    cartes: [
      {
        picto: "diplome",
        titre: "Expertise",
        texte: "Une compréhension technique approfondie, pas une lecture superficielle des sujets.",
      },
      {
        picto: "eclair",
        titre: "Réactivité",
        texte: "Une capacité à répondre vite quand la situation l’exige, sans sacrifier la qualité d’analyse.",
      },
      {
        picto: "boucle",
        titre: "Agilité",
        texte: "Une capacité à s’adapter à chaque contexte plutôt qu’à imposer une méthode figée.",
      },
      {
        picto: "cible",
        titre: "Exigence",
        texte: "Un niveau de rigueur qui ne transige pas, même sous contrainte de délai ou de budget.",
      },
      {
        picto: "bouclier",
        titre: "Fiabilité",
        texte: "Des engagements tenus, sur des infrastructures où l’approximation n’est pas une option.",
      },
    ],
  },
  {
    blockType: "archetype" as const,
    surtitre: "Archétype",
    titre: "L’Expert Stratégique",
    chapo: "Fiable, exigeant, direct et pédagogue : le partenaire qui parle vrai et décide juste.",
    traits: [
      { picto: "bouclier", libelle: "Fiable" },
      { picto: "direction", libelle: "Direct" },
      { picto: "ampoule", libelle: "Pédagogue" },
      { picto: "personne", libelle: "Autonomisant" },
    ],
  },
  {
    blockType: "equipe" as const,
    surtitre: "Notre team",
    titre: "Des experts, pas des commerciaux. Une équipe qui ausculte avant de prescrire.",
    texte:
      "Ingénieurs, architectes et consultants seniors réunis autour d’une même exigence : comprendre votre infrastructure dans son ensemble avant de décider. Des profils certifiés, complémentaires et directs.",
    image: photoEquipe,
    statistiques: [
      { valeur: "15+", libelle: "experts dédiés" },
      { valeur: "3", libelle: "Pôles de compétence" },
      { valeur: "100%", libelle: "profils seniors" },
    ],
  },
  {
    blockType: "faq" as const,
    surtitre: "Questions fréquentes",
    titre: "Vos questions, nos réponses franches.",
    image: photoFaq,
    questions: [
      { question: "Depuis quand Bone existe-t-il ?", reponse: "" },
      {
        question: "Quelles certifications possède l’équipe ?",
        reponse:
          "L’équipe est certifiée sur les principaux environnements du marché : HPE, Fortinet, Palo Alto, VMware, entre autres.",
      },
      { question: "Bone travaille-t-il avec des PME comme avec des grands comptes ?", reponse: "" },
    ],
  },
  {
    blockType: "appelAction" as const,
    surtitre: "notre point de départ",
    titre: "Reprenez le contrôle de vos systèmes et de vos décisions.",
    chapo: "Un premier échange permet de cadrer votre situation, sans engagement de votre part.",
    cta: { libelle: "Demander un audit", chemin: "/contact" },
  },
];

const en = [
  {
    blockType: "reperes" as const,
    cartes: [
      {
        prefixe: "+",
        valeur: "13",
        libelle: "years of experience",
        description: "A practice built over time, not a recent offering being tried out on the market.",
      },
      {
        valeur: "10",
        suffixe: "K+",
        libelle: "orders since 2020",
        description:
          "A level of activity that reflects genuine adoption, well beyond a confidential launch.",
      },
      {
        valeur: "2021",
        libelle: "international expansion",
        description:
          "Growth beyond the French market, proof of a model that replicates at a larger scale.",
      },
      {
        valeur: "Bac+5",
        libelle: "certified senior profiles",
        description:
          "Engineers and architects trained to the level required to work on critical infrastructure.",
      },
    ],
  },
  {
    blockType: "valeurs" as const,
    surtitre: "Our values",
    cartes: [
      {
        picto: "diplome",
        titre: "Expertise",
        texte: "A deep technical understanding, not a surface reading of the subject.",
      },
      {
        picto: "eclair",
        titre: "Responsiveness",
        texte: "The ability to answer quickly when the situation demands it, without sacrificing analysis.",
      },
      {
        picto: "boucle",
        titre: "Agility",
        texte: "The ability to adapt to each context rather than impose a fixed method.",
      },
      {
        picto: "cible",
        titre: "Rigour",
        texte: "A standard that does not bend, even under pressure of deadline or budget.",
      },
      {
        picto: "bouclier",
        titre: "Reliability",
        texte: "Commitments kept, on infrastructure where approximation is not an option.",
      },
    ],
  },
  {
    blockType: "archetype" as const,
    surtitre: "Archetype",
    titre: "The Strategic Expert",
    chapo: "Reliable, exacting, direct and clear: the partner who speaks plainly and decides well.",
    traits: [
      { picto: "bouclier", libelle: "Reliable" },
      { picto: "direction", libelle: "Direct" },
      { picto: "ampoule", libelle: "Clear" },
      { picto: "personne", libelle: "Empowering" },
    ],
  },
  {
    blockType: "equipe" as const,
    surtitre: "Our team",
    titre: "Experts, not salespeople. A team that examines before it prescribes.",
    texte:
      "Senior engineers, architects and consultants gathered around one standard: understand your infrastructure as a whole before deciding. Certified, complementary and direct profiles.",
    image: photoEquipe,
    statistiques: [
      { valeur: "15+", libelle: "dedicated experts" },
      { valeur: "3", libelle: "divisions" },
      { valeur: "100%", libelle: "senior profiles" },
    ],
  },
  {
    blockType: "faq" as const,
    surtitre: "Frequently asked questions",
    titre: "Your questions, our straight answers.",
    image: photoFaq,
    questions: [
      { question: "How long has Bone been around?", reponse: "" },
      {
        question: "What certifications does the team hold?",
        reponse:
          "The team is certified on the main environments on the market: HPE, Fortinet, Palo Alto and VMware, among others.",
      },
      { question: "Does Bone work with SMEs as well as large accounts?", reponse: "" },
    ],
  },
  {
    blockType: "appelAction" as const,
    surtitre: "our starting point",
    titre: "Take back control of your systems and your decisions.",
    chapo: "A first conversation frames your situation, with no commitment on your side.",
    cta: { libelle: "Request an audit", chemin: "/contact" },
  },
];

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "a-propos" } },
  limit: 1,
  draft: true,
});
const id = docs[0]!.id;

await payload.update({
  collection: "pages",
  id,
  locale: "fr",
  data: { ...heroFr, sections: fr as never, _status: "published" },
});

/** Les blocs et leurs tableaux partagent leurs lignes entre langues. */
const pose = await payload.findByID({ collection: "pages", id, locale: "fr", depth: 0 });

const avecIds = (bloc: Record<string, unknown>, i: number) => {
  const poseBloc = pose.sections?.[i] as Record<string, unknown> | undefined;
  const sortie: Record<string, unknown> = { ...bloc, id: poseBloc?.id };
  for (const cle of ["cartes", "traits", "statistiques", "questions"]) {
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

payload.logger.info("[à propos] page écrite dans les deux langues");
process.exit(0);
