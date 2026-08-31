import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

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

const photos = {
  dsi: await media(
    "profil-dsi.jpg",
    "Une personne consulte un tableau de bord technique sur un grand écran.",
    "A person reviews a technical dashboard on a large screen.",
  ),
  rssi: await media(
    "profil-rssi.jpg",
    "Vue rapprochée d’un dispositif de sécurité informatique.",
    "Close-up of an IT security device.",
  ),
  technique: await media(
    "profil-technique.jpg",
    "Une équipe technique en réunion autour d’un plan d’architecture.",
    "A technical team meeting around an architecture plan.",
  ),
  dirigeant: await media(
    "profil-dirigeant.jpg",
    "Un dirigeant en réflexion dans un bureau lumineux.",
    "An executive in thought in a bright office.",
  ),
};

const fr = {
  surtitre: "À qui s’adresse Bone",
  titreHaut: "Quatre profils, un même besoin :",
  titreBas: "décider avec clarté.",
  liste: [
    {
      picto: "antenne" as const,
      titre: "DSI",
      description:
        "Vous pilotez l’ensemble du système d’information, mais la vue d’ensemble vous échappe dès que la complexité s’accumule.",
      reponse: "Bone vous aide à retrouver une vision claire des dépendances et des priorités.",
      image: photos.dsi,
    },
    {
      picto: "securite" as const,
      titre: "RSSI",
      description:
        "Vous devez sécuriser l’infrastructure face à des exigences réglementaires de plus en plus strictes (NIS2, ISO 27001).",
      reponse: "Bone traduit ces obligations en plan d’action concret, sans jargon inutile.",
      image: photos.rssi,
    },
    {
      picto: "balance" as const,
      titre: "Direction technique",
      description:
        "Vous devez arbitrer en permanence entre dette technique et feuille de route produit.",
      reponse:
        "Bone objective ces choix pour que la décision ne repose plus sur l’urgence du moment.",
      image: photos.technique,
    },
    {
      picto: "boussole" as const,
      titre: "Dirigeant sans DSI",
      description:
        "Vous devez prendre des décisions IT engageantes sans disposer d’une expertise interne dédiée.",
      reponse: "Bone joue le rôle de DSI externe le temps d’un diagnostic ou d’un projet clé.",
      image: photos.dirigeant,
    },
  ],
};

const en = {
  surtitre: "Who Bone is for",
  titreHaut: "Four profiles, one shared need:",
  titreBas: "deciding with clarity.",
  liste: [
    {
      picto: "antenne" as const,
      titre: "CIO",
      description:
        "You steer the whole information system, but the overall view slips away as soon as complexity builds up.",
      reponse: "Bone helps you regain a clear view of dependencies and priorities.",
      image: photos.dsi,
    },
    {
      picto: "securite" as const,
      titre: "CISO",
      description:
        "You have to secure the infrastructure against increasingly strict regulatory requirements (NIS2, ISO 27001).",
      reponse: "Bone turns those obligations into a concrete action plan, without needless jargon.",
      image: photos.rssi,
    },
    {
      picto: "balance" as const,
      titre: "Head of engineering",
      description: "You constantly arbitrate between technical debt and the product roadmap.",
      reponse: "Bone makes those choices objective, so decisions no longer rest on the urgency of the moment.",
      image: photos.technique,
    },
    {
      picto: "boussole" as const,
      titre: "Executive with no CIO",
      description:
        "You have to make committing IT decisions without dedicated in-house expertise.",
      reponse: "Bone acts as an external CIO for the length of a diagnosis or a key project.",
      image: photos.dirigeant,
    },
  ],
};

await payload.updateGlobal({ slug: "accueil", locale: "fr", data: { profils: fr } });

const pose = await payload.findGlobal({ slug: "accueil", locale: "fr", depth: 0 });

await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: {
    profils: {
      ...en,
      liste: en.liste.map((p, i) => ({ ...p, id: pose.profils?.liste?.[i]?.id })),
    },
  },
});

payload.logger.info("[accueil] section « profils » écrite dans les deux langues");
process.exit(0);
