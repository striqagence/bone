import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Section « Le constat » de l'accueil.
 *
 * La photo de gauche est celle déjà versée pour la page « Nos compétences » —
 * la maquette emploie le même fichier aux deux endroits.
 */
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

const photoRealite = await media(
  "hero-competences.jpg",
  "Un intervenant désigne un écran de projection devant un auditoire.",
  "A speaker points at a projection screen in front of an audience.",
);
const photoEnjeu = await media(
  "constat-enjeu.jpg",
  "Contre-plongée sur l’atrium vitré d’un immeuble de bureaux.",
  "Upward view of the glazed atrium of an office building.",
);

const fr = {
  surtitre: "Le constat",
  titre: "L’IT n’a jamais été aussi complexe et les erreurs n’ont jamais coûté aussi cher.",
  realite: {
    titre: "La réalité terrain",
    chiffre: "68%",
    legende:
      "des DSI déclarent piloter leur infrastructure sans cartographie complète des risques.",
    puces: [
      { texte: "Des infrastructures empilées projet après projet, sans vision d’ensemble." },
      { texte: "Des décisions prises dans l’urgence, faute de diagnostic clair." },
      { texte: "Des équipes qui gèrent l’incident au lieu d’anticiper le risque." },
    ],
    photo: photoRealite,
  },
  enjeu: {
    titre: "Le vrai enjeu",
    texte:
      "Ce n’est pas la technologie qui manque. Les entreprises disposent déjà des outils, des contrats et des prestataires. Ce qui fait la différence, c’est une vision claire de ce qui compte vraiment : où sont les risques, ce qui pèse sur les coûts, et ce qui mérite d’être traité en priorité.",
    citation: "« La clé n’est pas de trouver plus de solutions. C’est de mieux comprendre. »",
    photo: photoEnjeu,
  },
};

const en = {
  surtitre: "The picture",
  titre: "IT has never been this complex, and mistakes have never cost this much.",
  realite: {
    titre: "On the ground",
    chiffre: "68%",
    legende: "of CIOs say they run their infrastructure without a complete map of the risks.",
    puces: [
      { texte: "Infrastructure stacked project after project, with no overall view." },
      { texte: "Decisions taken under pressure, for lack of a clear diagnosis." },
      { texte: "Teams handling the incident instead of anticipating the risk." },
    ],
    photo: photoRealite,
  },
  enjeu: {
    titre: "What is really at stake",
    texte:
      "Technology is not what is missing. Companies already have the tools, the contracts and the providers. What makes the difference is a clear view of what actually matters: where the risks are, what weighs on costs, and what deserves to be dealt with first.",
    citation: "“The key is not finding more solutions. It is understanding better.”",
    photo: photoEnjeu,
  },
};

await payload.updateGlobal({ slug: "accueil", locale: "fr", data: { constat: fr } });

const pose = await payload.findGlobal({ slug: "accueil", locale: "fr", depth: 0 });

await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: {
    constat: {
      ...en,
      realite: {
        ...en.realite,
        puces: en.realite.puces.map((p, i) => ({
          ...p,
          id: pose.constat?.realite?.puces?.[i]?.id,
        })),
      },
    },
  },
});

payload.logger.info("[accueil] section « Le constat » écrite dans les deux langues");
process.exit(0);
