import { getPayload } from "payload";
import config from "@payload-config";

/** Section « En bref » de l'accueil, contenu de la maquette. */
const payload = await getPayload({ config });

const fr = {
  surtitre: "En bref",
  titre:
    "Bone : l’expert indépendant des infrastructures IT critiques, au service des décisions DSI et RSSI",
  propos:
    "Bone est un expert indépendant des infrastructures IT critiques : réseau, stockage et systèmes pilotés comme un seul système, plutôt que trois briques séparées. Son indépendance garantit des recommandations guidées par l’intérêt de l’organisation, sans lien avec un éditeur ou un constructeur.",
  precision:
    "Bone accompagne DSI, RSSI et dirigeants dans l’audit, la mise en conformité NIS2/ISO 27001 et les choix de performance durable du parc pour décider en connaissance de cause, pas pour vendre une solution.",
  cta: { libelle: "En savoir plus", chemin: "/a-propos" },
};

const en = {
  surtitre: "In brief",
  titre:
    "Bone: the independent expert in critical IT infrastructure, at the service of CIO and CISO decisions",
  propos:
    "Bone is an independent expert in critical IT infrastructure: network, storage and systems steered as a single system rather than three separate blocks. Its independence guarantees recommendations guided by the organisation’s interest, with no ties to a vendor or manufacturer.",
  precision:
    "Bone supports CIOs, CISOs and executives through audits, NIS2/ISO 27001 compliance and sustainable performance choices for the estate, to decide in full knowledge rather than to sell a solution.",
  cta: { libelle: "Find out more", chemin: "/a-propos" },
};

await payload.updateGlobal({ slug: "accueil", locale: "fr", data: { enBref: fr } });
await payload.updateGlobal({ slug: "accueil", locale: "en", data: { enBref: en } });
payload.logger.info("[accueil] section « En bref » écrite dans les deux langues");

process.exit(0);
