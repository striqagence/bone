import { getPayload } from "payload";
import config from "@payload-config";

import type { Langue } from "./i18n";
import type { Post } from "@/payload-types";

/**
 * Articles pour les cartes du site.
 *
 * Le mois de publication est formaté ici, dans la langue de la page : la
 * maquette affiche « avril 2026 » et « April 2026 », que la base ne stocke pas
 * — elle n'a qu'une date.
 */
export type Article = {
  id: number | string;
  chemin: string;
  categorie: string;
  date: string;
  tempsDeLecture: string;
  titre: string;
  description: string;
  image?: { src: string; alt: string };
};

const MINUTES: Record<Langue, (n: number) => string> = {
  fr: (n) => `${n} min de lecture`,
  en: (n) => `${n} min read`,
};

export function enArticle(post: Post, langue: Langue): Article {
  const categorie =
    post.categorie && typeof post.categorie === "object" ? post.categorie.nom : "";
  const image =
    post.image && typeof post.image === "object" && post.image.url
      ? { src: post.image.url, alt: post.image.alt }
      : undefined;

  return {
    id: post.id,
    chemin: `/blog/${post.slug}`,
    categorie,
    date: new Intl.DateTimeFormat(langue, { month: "long", year: "numeric" }).format(
      new Date(post.publieLe),
    ),
    tempsDeLecture: MINUTES[langue](post.minutesLecture),
    titre: post.titre,
    description: post.extrait,
    image,
  };
}

/** Les derniers articles publiés, du plus récent au plus ancien. */
export async function derniersArticles(langue: Langue, limite = 4): Promise<Article[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    locale: langue,
    sort: "-publieLe",
    depth: 2,
    limit: limite,
  });
  return docs.map((post) => enArticle(post, langue));
}

/** Les catégories, dans l'ordre que le back-office leur donne. */
export async function chargerCategories(langue: Langue) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "categories", locale: langue, limit: 50, sort: "_order" });
  return docs.map((c) => ({ slug: c.slug, libelle: c.libelleLong ?? c.nom }));
}

/**
 * Une page de la liste du blog.
 *
 * La pagination est cumulative — le bouton de la maquette dit « charger plus »,
 * pas « page suivante » : la page 2 renvoie donc les 18 premiers articles et
 * non les articles 10 à 18.
 */
export async function listerArticles({
  langue,
  categorie,
  page = 1,
  parPage = 9,
  exclure,
}: {
  langue: Langue;
  categorie?: string;
  page?: number;
  parPage?: number;
  /** Article déjà affiché ailleurs — la une du blog — à retirer du décompte. */
  exclure?: number | string;
}): Promise<{ articles: Article[]; total: number; encore: boolean }> {
  const payload = await getPayload({ config });
  const { docs, totalDocs } = await payload.find({
    collection: "posts",
    locale: langue,
    sort: "-publieLe",
    depth: 2,
    limit: page * parPage,
    where: {
      and: [
        ...(categorie ? [{ "categorie.slug": { equals: categorie } }] : []),
        ...(exclure ? [{ id: { not_equals: exclure } }] : []),
      ],
    },
  });
  return {
    articles: docs.map((post) => enArticle(post, langue)),
    total: totalDocs,
    encore: docs.length < totalDocs,
  };
}
