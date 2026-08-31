import { getPayload } from "payload";
import config from "@payload-config";

import type { Page } from "@/payload-types";

import type { Langue } from "./i18n";

/**
 * Résout une page à partir des segments d'URL.
 *
 * Le dernier segment identifie la page ; les précédents doivent correspondre à
 * sa chaîne de parents. Sans cette vérification, /nimporte-quoi/expertise
 * servirait la même page que /competences/expertise, et deux URLs répondraient
 * pour un même contenu.
 */
export async function trouverPage(
  segments: string[],
  langue: Langue,
): Promise<Page | null> {
  if (segments.length === 0) return null;

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    locale: langue,
    where: { slug: { equals: segments[segments.length - 1] } },
    depth: 2,
    limit: 1,
  });

  const page = docs[0];
  if (!page) return null;

  return cheminDe(page) === segments.join("/") ? page : null;
}

/** Chemin complet d'une page, remontée de parents comprise. */
export function cheminDe(page: Page): string {
  const morceaux = [page.slug];
  let parent = page.parent;
  // `depth: 2` ne résout que deux niveaux : au-delà, `parent` reste un
  // identifiant et la remontée s'arrête — ce que la maquette n'atteint pas.
  while (parent && typeof parent === "object") {
    morceaux.unshift(parent.slug);
    parent = parent.parent;
  }
  return morceaux.join("/");
}

/**
 * Les trois pôles, dans l'ordre de la maquette, tels que leurs pages les
 * décrivent. Sert aux sections qui les affichent — bande et synergie — pour que
 * leur nom n'ait qu'une seule source.
 */
export async function chargerPoles(langue: Langue) {
  const ordre = ["expertise", "capital", "feed"] as const;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "pages",
    locale: langue,
    where: { pole: { in: [...ordre] } },
    depth: 2,
    limit: 3,
  });

  return ordre.flatMap((cle) => {
    const page = docs.find((p) => p.pole === cle);
    if (!page) return [];
    const image =
      page.image && typeof page.image === "object" && page.image.url
        ? { src: page.image.url, alt: page.image.alt }
        : undefined;
    return [{
      pole: cle,
      chemin: `/${cheminDe(page)}`,
      accroche: page.accrocheCourte ?? "",
      tagline: page.surtitre ?? "",
      image,
    }];
  });
}

/** Entrées du fil d'ariane : les ancêtres cliquables, puis la page courante. */
export function arianeDe(page: Page): { libelle: string; chemin?: string }[] {
  const ancetres: { libelle: string; chemin?: string }[] = [];
  let parent = page.parent;
  while (parent && typeof parent === "object") {
    ancetres.unshift({ libelle: parent.titre, chemin: `/${cheminDe(parent)}` });
    parent = parent.parent;
  }
  return [...ancetres, { libelle: page.titre }];
}

export type { Page };
