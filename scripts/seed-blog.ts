import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Catégories et articles du blog, tels que les cartes de la maquette les
 * annoncent. Le corps des articles reste à écrire : seuls les métadonnées et
 * l'extrait figurent dans les maquettes.
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

const categories = [
  { slug: "securite", fr: "Sécurité", en: "Security" },
  { slug: "capital", fr: "Capital", en: "Capital" },
  { slug: "infrastructure", fr: "Infrastructure", en: "Infrastructure" },
];

const idCategories: Record<string, number> = {};
for (const c of categories) {
  const { docs } = await payload.find({
    collection: "categories",
    where: { slug: { equals: c.slug } },
    limit: 1,
  });
  const doc =
    docs[0] ?? (await payload.create({ collection: "categories", locale: "fr", data: { slug: c.slug, nom: c.fr } }));
  await payload.update({ collection: "categories", id: doc.id, locale: "fr", data: { nom: c.fr } });
  await payload.update({ collection: "categories", id: doc.id, locale: "en", data: { nom: c.en } });
  idCategories[c.slug] = doc.id;
  payload.logger.info(`[blog] catégorie ${c.slug}`);
}

const articles = [
  {
    slug: "conformite-nis2-par-ou-commencer",
    categorie: "securite",
    publieLe: "2026-04-01",
    minutes: 6,
    fichier: "article-nis2.jpg",
    altFr: "Une main tient un bouclier numérique lumineux devant des baies serveurs.",
    altEn: "A hand holds a glowing digital shield in front of server racks.",
    fr: {
      titre: "Conformité NIS2 : par où commencer",
      extrait:
        "Pas besoin de tout refaire d’un coup : la méthode pour prioriser sans paniquer face à l’échéance.",
    },
    en: {
      titre: "NIS2 compliance: where to start",
      extrait:
        "No need to redo everything at once: the method to prioritise without panicking as the deadline approaches.",
    },
  },
  {
    slug: "prolonger-son-parc-avec-bone-capital",
    categorie: "capital",
    publieLe: "2026-03-01",
    minutes: 5,
    fichier: "article-capital-parc.jpg",
    altFr: "Une personne de dos observe une allée de baies informatiques.",
    altEn: "A person seen from behind looks down an aisle of server racks.",
    fr: {
      titre: "Prolonger son parc avec Bone Capital",
      extrait:
        "Un matériel en fin de garantie n’est pas forcément un matériel en fin de vie : ce qu’il faut vérifier avant de remplacer.",
    },
    en: {
      titre: "Extending your estate with Bone Capital",
      extrait:
        "Hardware out of warranty is not necessarily hardware at end of life: what to check before replacing it.",
    },
  },
  {
    slug: "notre-methode-de-diagnostic",
    categorie: "infrastructure",
    publieLe: "2026-02-01",
    minutes: 6,
    fichier: "article-diagnostic.jpg",
    altFr: "Un technicien consulte un ordinateur portable dans une salle serveurs.",
    altEn: "A technician consults a laptop in a server room.",
    fr: {
      titre: "Notre méthode de diagnostic",
      extrait:
        "Comprendre avant de décider : comment se déroule un audit d’infrastructure chez BONE, étape par étape.",
    },
    en: {
      titre: "Our diagnostic method",
      extrait:
        "Understand before deciding: how an infrastructure audit runs at BONE, step by step.",
    },
  },
  {
    slug: "revendre-ou-revaloriser",
    categorie: "capital",
    publieLe: "2026-04-01",
    minutes: 6,
    fichier: "article-revaloriser.jpg",
    altFr: "Allée de baies informatiques éclairée de bleu.",
    altEn: "Aisle of server racks lit in blue.",
    fr: {
      titre: "Revendre ou revaloriser ? Le vrai calcul sur 3 ans",
      extrait:
        "Entre revente rapide et revalorisation interne, l’écart de coût réel n’est pas celui qu’on imagine.",
    },
    en: {
      titre: "Resell or remarket? The real three-year maths",
      extrait:
        "Between a quick resale and internal remarketing, the real cost gap is not the one you would expect.",
    },
  },
];

for (const a of articles) {
  const image = await media(a.fichier, a.altFr, a.altEn);
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: a.slug } },
    limit: 1,
    draft: true,
  });

  const commun = {
    slug: a.slug,
    categorie: idCategories[a.categorie],
    publieLe: a.publieLe,
    minutesLecture: a.minutes,
    image,
    _status: "published" as const,
  };

  const doc = docs[0]
    ? await payload.update({ collection: "posts", id: docs[0].id, locale: "fr", data: { ...commun, ...a.fr } })
    : await payload.create({ collection: "posts", locale: "fr", data: { ...commun, ...a.fr } });

  await payload.update({ collection: "posts", id: doc.id, locale: "en", data: a.en });
  payload.logger.info(`[blog] article ${a.slug}`);
}

process.exit(0);
