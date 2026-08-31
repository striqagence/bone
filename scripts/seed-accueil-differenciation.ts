import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Section « Différenciation » de l'accueil.
 *
 * La maquette écrit « avant de propose une solution » : la coquille est
 * reproduite telle quelle, le contenu revenant au back-office.
 */
const payload = await getPayload({ config });

const fr = {
  surtitre: "différenciation",
  titre: "Là où les autres exécutent, Bone aide à décider.",
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

const en = {
  surtitre: "what sets us apart",
  titre: "Where others execute, Bone helps you decide.",
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

await payload.updateGlobal({ slug: "accueil", locale: "fr", data: { differenciation: fr } });

const pose = await payload.findGlobal({ slug: "accueil", locale: "fr", depth: 0 });

const avecIds = (cle: "habituelle" | "bone") => ({
  ...en[cle],
  puces: en[cle].puces.map((p, i) => ({
    ...p,
    id: pose.differenciation?.[cle]?.puces?.[i]?.id,
  })),
});

await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: { differenciation: { ...en, habituelle: avecIds("habituelle"), bone: avecIds("bone") } },
});

payload.logger.info("[accueil] section « Différenciation » écrite dans les deux langues");
process.exit(0);
