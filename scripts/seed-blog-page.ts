import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Page « Blog » : son hero, son bandeau newsletter et les libellés de la liste.
 *
 * La grille et l'article à la une ne sont pas saisis — ils viennent de la
 * collection Articles —, mais les mots qui les entourent le sont, comme
 * partout ailleurs sur le site.
 */
const payload = await getPayload({ config });

const DOSSIER =
  "/private/tmp/claude-501/-Users-audreybraun/9252f681-a78f-45ef-b4cc-a15965bdb178/scratchpad/photos/pretes";

const { docs: photos } = await payload.find({
  collection: "media",
  where: { filename: { equals: "hero-blog.jpg" } },
  limit: 1,
});
const photo =
  photos[0] ??
  (await payload.create({
    collection: "media",
    locale: "fr",
    filePath: path.join(DOSSIER, "hero-blog.jpg"),
    data: { alt: "Une ingénieure annote un porte-bloc au milieu d’une salle serveurs." },
  }));
await payload.update({
  collection: "media",
  id: photo.id,
  locale: "en",
  data: { alt: "An engineer takes notes on a clipboard in the middle of a server room." },
});
const photoHero = photo.id;

const heroFr = {
  surtitre: "ressources",
  accroche: "Comprendre avant d’investir.",
  description:
    "Analyses, retours d’expérience et repères de décision sur l’infrastructure IT, la revalorisation du parc et les infrastructures audiovisuelles critiques. Pas de jargon gratuit : des repères utiles à la décision.",
  image: photoHero,
};

const heroEn = {
  surtitre: "resources",
  accroche: "Understand before you invest.",
  description:
    "Analysis, field experience and decision markers on IT infrastructure, hardware remarketing and critical broadcast environments. No gratuitous jargon: markers that help you decide.",
  image: photoHero,
};

const newsletterFr = {
  blockType: "newsletter" as const,
  surtitre: "La newsletter bone",
  titre: "Un repère utile par mois. Zéro spam.",
  chapo: "Une analyse courte pour décider mieux sur votre infra. Désinscription en un clic.",
  libelleChamp: "Votre email pro",
  libelleBouton: "S’abonner",
  messageSucces: "C’est noté, vous recevrez la prochaine analyse.",
};

const newsletterEn = {
  blockType: "newsletter" as const,
  surtitre: "The bone newsletter",
  titre: "One useful marker a month. Zero spam.",
  chapo: "A short analysis to decide better on your infrastructure. Unsubscribe in one click.",
  libelleChamp: "Your work email",
  libelleBouton: "Subscribe",
  messageSucces: "Noted, you will receive the next analysis.",
};

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "blog" } },
  limit: 1,
  draft: true,
});
const id = docs[0]!.id;

await payload.update({
  collection: "pages",
  id,
  locale: "fr",
  data: { ...heroFr, sections: [newsletterFr], _status: "published" },
});

/** Les blocs partagent leurs lignes entre langues : l'identifiant est repris. */
const pose = await payload.findByID({ collection: "pages", id, locale: "fr", depth: 0 });
const idBloc = (pose.sections?.[0] as { id?: string } | undefined)?.id;

await payload.update({
  collection: "pages",
  id,
  locale: "en",
  data: { ...heroEn, sections: [{ ...newsletterEn, id: idBloc }] as never },
});

await payload.updateGlobal({
  slug: "blog",
  locale: "fr",
  data: {
    surtitreUne: "À la une",
    libelleLire: "Lire l’article",
    titreListe: "Tous les articles",
    libelleTousSujets: "Tous les sujets",
    gabaritCompte: "{n} articles",
    libelleCharger: "Charger plus d’articles",
    libelleSommaire: "Sommaire",
    libelleFaq: "FAQ",
    libellePartageLinkedin: "Partager sur LinkedIn",
    libelleCopierLien: "Copier le lien",
    libelleLienCopie: "Lien copié",
    messageVide: "Aucun article dans cette catégorie pour le moment.",
  },
});

await payload.updateGlobal({
  slug: "blog",
  locale: "en",
  data: {
    surtitreUne: "Featured",
    libelleLire: "Read the article",
    titreListe: "All articles",
    libelleTousSujets: "All topics",
    gabaritCompte: "{n} articles",
    libelleCharger: "Load more articles",
    libelleSommaire: "Contents",
    libelleFaq: "FAQ",
    libellePartageLinkedin: "Share on LinkedIn",
    libelleCopierLien: "Copy the link",
    libelleLienCopie: "Link copied",
    messageVide: "No article in this category yet.",
  },
});

payload.logger.info("[blog] page et libellés écrits dans les deux langues");
process.exit(0);
