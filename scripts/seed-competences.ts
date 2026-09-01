import { getPayload } from "payload";
import config from "@payload-config";

/** Sections de l'écran Compétences, sous son hero déjà renseigné. */
const payload = await getPayload({ config });

/**
 * La bande des pôles n'affiche pas son titre ici — le hero l'annonce déjà —
 * mais le garde en base : sans lui, les trois bandes se rattacheraient au
 * titre de la section précédente pour qui parcourt la page à l'oreille.
 */
const BANDE_FR = {
  blockType: "bandePoles" as const,
  avecEnTete: false,
  titreHaut: "Trois pôles, une seule logique :",
  titreBas: "sécuriser vos décisions d’infrastructure.",
};

const BANDE_EN = {
  blockType: "bandePoles" as const,
  avecEnTete: false,
  titreHaut: "Three divisions, one logic:",
  titreBas: "making your infrastructure decisions safe.",
};

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "competences" } },
  limit: 1,
  draft: true,
});
if (!docs[0]) throw new Error("page « competences » introuvable");

const fr = [
  BANDE_FR,
  {
    blockType: "synergie" as const,
    titre: "Les 3 pôles ne fonctionnent pas en silo ils se renforcent.",
    texte:
      "Un audit Expertise peut révéler un parc à revaloriser (Capital) ; un projet Media s’appuie sur la même rigueur.",
  },
  {
    blockType: "appelAction" as const,
    surtitre: "notre point de départ",
    titre: "On part de votre problème.",
    chapo: "Un diagnostic clair, sans engagement, pour savoir par où commencer.",
    cta: { libelle: "Demander un audit", chemin: "/contact" },
  },
];

const en = [
  BANDE_EN,
  {
    blockType: "synergie" as const,
    titre: "The three divisions do not work in silos, they reinforce each other.",
    texte:
      "An Expertise audit can reveal an estate worth remarketing (Capital); a Feed project rests on the same rigour.",
  },
  {
    blockType: "appelAction" as const,
    surtitre: "our starting point",
    titre: "We start from your problem.",
    chapo: "A clear diagnosis, with no commitment, to know where to start.",
    cta: { libelle: "Request an audit", chemin: "/contact" },
  },
];

await payload.update({
  collection: "pages",
  id: docs[0].id,
  locale: "fr",
  data: { sections: fr, _status: "published" },
});

// Les blocs partagent leurs lignes entre langues : sans reprendre leurs
// identifiants, l'anglais les recréerait et effacerait le français.
const pose = await payload.findByID({ collection: "pages", id: docs[0].id, locale: "fr", depth: 0 });

await payload.update({
  collection: "pages",
  id: docs[0].id,
  locale: "en",
  data: {
    sections: en.map((bloc, i) => ({ ...bloc, id: pose.sections?.[i]?.id })),
  },
});

payload.logger.info("[compétences] sections écrites dans les deux langues");
process.exit(0);
