import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Verse les photos de la maquette dans la médiathèque et les rattache aux pages.
 *
 * Les originaux Figma pèsent 8 à 12 Mo : ils ont été ramenés à 2400px de côté
 * avant d'arriver ici. Le fichier servi étant l'original — le stockage n'expose
 * pas les déclinaisons sous une URL prévisible — l'y verser tel quel aurait
 * chargé des heros de 12 Mo.
 *
 * Les textes alternatifs décrivent ce que montre chaque photo, tel que je l'ai
 * observé sur les maquettes. Ils sont à relire : c'est le seul contenu du site
 * qu'une personne non voyante reçoit à la place de l'image.
 */
const DOSSIER =
  "/private/tmp/claude-501/-Users-audreybraun/9252f681-a78f-45ef-b4cc-a15965bdb178/scratchpad/photos/pretes";

const medias = [
  {
    fichier: "hero-competences.jpg",
    page: "competences",
    fr: "Un intervenant désigne un écran de projection devant un auditoire.",
    en: "A speaker points at a projection screen in front of an audience.",
  },
  {
    fichier: "hero-expertise.jpg",
    page: "expertise",
    fr: "Vue abstraite et sombre d’une salle serveurs baignée de bleu.",
    en: "Dark, abstract view of a server room bathed in blue light.",
  },
  {
    fichier: "pole-capital.jpg",
    page: "capital",
    fr: "Structures verticales bleutées évoquant des baies informatiques.",
    en: "Bluish vertical structures evoking server racks.",
  },
  {
    fichier: "pole-feed.jpg",
    page: "feed",
    fr: "Trame lumineuse de diodes violettes et bleues.",
    en: "Luminous grid of purple and blue diodes.",
  },
  {
    fichier: "article-exemple.jpg",
    fr: "Deux personnes en conversation devant un ordinateur portable.",
    en: "Two people in conversation over a laptop.",
  },
];

const payload = await getPayload({ config });

for (const media of medias) {
  const { docs } = await payload.find({
    collection: "media",
    where: { filename: { equals: media.fichier } },
    limit: 1,
  });

  const doc =
    docs[0] ??
    (await payload.create({
      collection: "media",
      locale: "fr",
      filePath: path.join(DOSSIER, media.fichier),
      data: { alt: media.fr },
    }));

  await payload.update({ collection: "media", id: doc.id, locale: "fr", data: { alt: media.fr } });
  await payload.update({ collection: "media", id: doc.id, locale: "en", data: { alt: media.en } });

  if (media.page) {
    const { docs: pages } = await payload.find({
      collection: "pages",
      where: { slug: { equals: media.page } },
      limit: 1,
      draft: true,
    });
    if (pages[0]) {
      await payload.update({
        collection: "pages",
        id: pages[0].id,
        data: { image: doc.id, _status: "published" },
      });
    }
  }

  payload.logger.info(`[médias] ${media.fichier}${media.page ? ` → ${media.page}` : ""}`);
}

process.exit(0);
