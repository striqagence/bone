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
