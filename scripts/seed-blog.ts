import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Catégories et articles du blog, tels que les cartes de la maquette les
 * annoncent. Le corps des articles reste à écrire : seuls les métadonnées et
 * l'extrait figurent dans les maquettes.
 *
 * Les dates ne portent que le mois dans la maquette. Le jour sert ici à fixer
 * l'ordre entre articles d'un même mois — et donc à décider lequel tient la
 * une, toujours le plus récent.
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

/**
 * L'ordre de ce tableau est celui des filtres de la maquette. Le nom court
 * tient sur l'étiquette d'une carte, le long dans la barre de filtres.
 */
const categories = [
  {
    slug: "infrastructure",
    fr: { nom: "Infrastructure", libelleLong: "Infrastructure & risques" },
    en: { nom: "Infrastructure", libelleLong: "Infrastructure & risk" },
  },
  {
    slug: "capital",
    fr: { nom: "Capital", libelleLong: "Revalorisation / Capital" },
    en: { nom: "Capital", libelleLong: "Remarketing / Capital" },
  },
  {
    slug: "media",
    fr: { nom: "Média", libelleLong: "Broadcast / Media" },
    en: { nom: "Media", libelleLong: "Broadcast / Media" },
  },
  {
    slug: "securite",
    fr: { nom: "Sécurité", libelleLong: "Sécurité & conformité" },
    en: { nom: "Security", libelleLong: "Security & compliance" },
  },
];

const idCategories: Record<string, number> = {};
for (const c of categories) {
  const { docs } = await payload.find({
    collection: "categories",
    where: { slug: { equals: c.slug } },
    limit: 1,
  });
  const doc =
    docs[0] ??
    (await payload.create({ collection: "categories", locale: "fr", data: { slug: c.slug, ...c.fr } }));
  await payload.update({ collection: "categories", id: doc.id, locale: "fr", data: c.fr });
  await payload.update({ collection: "categories", id: doc.id, locale: "en", data: c.en });
  idCategories[c.slug] = doc.id;
  payload.logger.info(`[blog] catégorie ${c.slug}`);
}

const articles = [
  {
    slug: "dette-technique-sept-signaux",
    categorie: "infrastructure",
    publieLe: "2026-04-20",
    minutes: 12,
    fichier: "article-dette-technique.jpg",
    altFr: "Un opérateur se prend la tête devant des écrans de supervision en alerte.",
    altEn: "An operator holds their head in front of monitoring screens in alert.",
    fr: {
      titre: "Dette technique d’infrastructure : 7 signaux que votre parc vous coûte déjà cher",
      extrait:
        "Le coût d’une infrastructure vieillissante est rarement une ligne du budget, il se cache dans les incidents, les heures perdues et les décisions reportées. Voici comment le rendre visible.",
    },
    en: {
      titre: "Infrastructure technical debt: 7 signs your estate is already costing you",
      extrait:
        "The cost of an ageing infrastructure is rarely a budget line; it hides in incidents, lost hours and deferred decisions. Here is how to make it visible.",
    },
  },
  {
    slug: "revendre-ou-revaloriser",
    categorie: "capital",
    publieLe: "2026-04-15",
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
  {
    slug: "fin-de-garantie-nest-pas-fin-de-vie",
    categorie: "capital",
    publieLe: "2026-04-10",
    minutes: 6,
    fichier: "article-fin-garantie.jpg",
    altFr: "Allée de baies informatiques traversée d’un dégradé rouge et turquoise.",
    altEn: "An aisle of server racks crossed by a red and turquoise gradient.",
    fr: {
      titre: "Fin de garantie ≠ fin de vie : prolonger sans risque",
      extrait:
        "Une garantie expirée ne signifie pas qu’un équipement doit partir à la benne, à condition de savoir ce qui peut vraiment durer.",
    },
    en: {
      titre: "Out of warranty ≠ end of life: extending without risk",
      extrait:
        "An expired warranty does not mean a machine belongs in the skip, provided you know what can genuinely last.",
    },
  },
  {
    slug: "conformite-nis2-par-ou-commencer",
    categorie: "securite",
    publieLe: "2026-04-05",
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
    slug: "broadcast-24-7",
    categorie: "media",
    publieLe: "2026-03-20",
    minutes: 5,
    fichier: "article-broadcast-247.jpg",
    altFr: "Un technicien de régie face à un mur d’écrans de diffusion.",
    altEn: "A control-room technician facing a wall of broadcast screens.",
    fr: {
      titre: "Broadcast 24/7 : concevoir une infra qui ne tombe jamais",
      extrait:
        "Latence zéro tolérée, redondance absolue : ce qui distingue une architecture broadcast d’une infra IT classique.",
    },
    en: {
      titre: "Broadcast 24/7: designing infrastructure that never goes down",
      extrait:
        "Zero tolerated latency, absolute redundancy: what sets a broadcast architecture apart from ordinary IT.",
    },
  },
  {
    slug: "stockage-video-dimensionner",
    categorie: "media",
    publieLe: "2026-03-15",
    minutes: 5,
    fichier: "article-stockage-video.jpg",
    altFr: "Une main annote une tablette devant des baies de stockage.",
    altEn: "A hand annotates a tablet in front of storage racks.",
    fr: {
      titre: "Stockage vidéo : dimensionner sans surpayer le pic",
      extrait:
        "Calibrer une architecture de stockage sur le pic d’activité coûte cher toute l’année pour un usage ponctuel.",
    },
    en: {
      titre: "Video storage: sizing without overpaying for the peak",
      extrait:
        "Sizing a storage architecture for peak activity costs money all year round for occasional use.",
    },
  },
  {
    slug: "prolonger-son-parc-avec-bone-capital",
    categorie: "capital",
    publieLe: "2026-03-10",
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
    slug: "nis2-quand-on-a-du-retard",
    categorie: "securite",
    publieLe: "2026-02-20",
    minutes: 6,
    fichier: "article-nis2-retard.jpg",
    altFr: "Cadenas et empreinte digitale stylisés sur fond de réseau lumineux.",
    altEn: "Stylised padlocks and a fingerprint over a glowing network.",
    fr: {
      titre: "NIS2 : par où commencer quand on a déjà du retard",
      extrait:
        "Pas besoin de tout refaire d’un coup : la méthode pour prioriser sans paniquer face à l’échéance.",
    },
    en: {
      titre: "NIS2: where to start when you are already behind",
      extrait:
        "No need to redo everything at once: the method to prioritise without panicking as the deadline approaches.",
    },
  },
  {
    slug: "cartographier-ses-dependances",
    categorie: "infrastructure",
    publieLe: "2026-02-15",
    minutes: 6,
    fichier: "article-dependances.jpg",
    altFr: "Une ingénieure consulte un ordinateur portable dans une salle serveurs.",
    altEn: "An engineer consults a laptop in a server room.",
    fr: {
      titre: "Cartographier ses dépendances avant qu’un incident le fasse",
      extrait:
        "Réseau, stockage, systèmes : sans carte des interdépendances, chaque incident devient une enquête.",
    },
    en: {
      titre: "Map your dependencies before an incident does it for you",
      extrait:
        "Network, storage, systems: without a map of interdependencies, every incident turns into an investigation.",
    },
  },
  {
    slug: "notre-methode-de-diagnostic",
    categorie: "infrastructure",
    publieLe: "2026-02-10",
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
