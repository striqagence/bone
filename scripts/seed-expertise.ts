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

await payload.update({
  collection: "pages",
  id,
  locale: "fr",
  data: { ...heroFr, sections: [grilleFr], _status: "published" },
});

const pose = await payload.findByID({ collection: "pages", id, locale: "fr", depth: 0 });
const bloc = pose.sections?.[0];

await payload.update({
  collection: "pages",
  id,
  locale: "en",
  data: {
    ...heroEn,
    sections: [
      {
        ...grilleEn,
        id: bloc?.id,
        intitules: grilleEn.intitules.map((t, i) => ({
          ...t,
          id: bloc && "intitules" in bloc ? bloc.intitules?.[i]?.id : undefined,
        })),
      },
    ],
  },
});

payload.logger.info("[expertise] hero et grille écrits dans les deux langues");
process.exit(0);
