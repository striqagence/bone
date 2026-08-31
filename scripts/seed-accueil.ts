import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Remplit le hero de la page d'accueil avec le contenu de la maquette.
 *
 * Comme pour la navigation, l'anglais reprend les identifiants de lignes posés
 * par le français : un tableau non localisé partage ses lignes entre les
 * langues, et les recréer effacerait les libellés français.
 */
const DOSSIER =
  "/private/tmp/claude-501/-Users-audreybraun/9252f681-a78f-45ef-b4cc-a15965bdb178/scratchpad/photos/pretes";

const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: "media",
  where: { filename: { equals: "hero-accueil.jpg" } },
  limit: 1,
});

const photo =
  docs[0] ??
  (await payload.create({
    collection: "media",
    locale: "fr",
    filePath: path.join(DOSSIER, "hero-accueil.jpg"),
    data: { alt: "Allée d’un centre de données, baies éclairées de bleu dans la pénombre." },
  }));

await payload.update({
  collection: "media",
  id: photo.id,
  locale: "en",
  data: { alt: "Aisle of a data centre, racks lit in blue in the half-light." },
});

const fr = {
  surtitre: "From complexity to decision",
  lignes: [
    { verbe: "Maîtrisez", complement: "vos systèmes." },
    { verbe: "Sécurisez", complement: "vos décisions." },
  ],
  chapo:
    "Votre infrastructure IT est trop complexe pour être laissée au hasard. BONE vous aide à faire les bons choix, au bon moment.",
  cta: { libelle: "Découvrir notre approche", chemin: "/notre-approche" },
  image: photo.id,
};

const en = {
  ...fr,
  surtitre: "From complexity to decision",
  lignes: [
    { verbe: "Master", complement: "your systems." },
    { verbe: "Secure", complement: "your decisions." },
  ],
  chapo:
    "Your IT infrastructure is too complex to be left to chance. BONE helps you make the right choices, at the right time.",
  cta: { libelle: "Discover our approach", chemin: "/notre-approche" },
};

await payload.updateGlobal({ slug: "accueil", locale: "fr", data: { hero: fr } });
payload.logger.info("[accueil] hero écrit pour « fr »");

const pose = await payload.findGlobal({ slug: "accueil", locale: "fr", depth: 0 });

await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: {
    hero: {
      ...en,
      lignes: en.lignes.map((ligne, i) => ({ ...ligne, id: pose.hero?.lignes?.[i]?.id })),
    },
  },
});
payload.logger.info("[accueil] hero écrit pour « en »");

process.exit(0);
