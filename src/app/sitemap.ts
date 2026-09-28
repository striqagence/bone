import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

import { ADRESSE_PROVISOIRE, BASE } from "@/lib/donnees-structurees";
import { codesHreflang, langueParDefaut, langues, lien } from "@/lib/i18n";
import { cheminDe } from "@/lib/pages";

/**
 * Plan du site.
 *
 * Il manquait : les moteurs devaient découvrir les pages de proche en proche,
 * par les liens. C'est tenable sur un site d'une langue, beaucoup moins sur
 * trois, où chaque page existe en trois adresses qu'il faut relier entre elles
 * pour éviter qu'elles ne se concurrencent.
 *
 * Chaque entrée déclare donc ses traductions, comme le font déjà les balises
 * des pages. Un chemin n'apparaît qu'une fois, sous son adresse française, les
 * deux autres langues étant portées par `alternates`.
 *
 * Tant que le site vit sur une adresse de prévisualisation, le plan reste vide :
 * le `robots.txt` y refuse l'indexation, et publier un plan que rien ne doit
 * lire inviterait à l'indexer malgré tout.
 */
export const dynamic = "force-dynamic";

/** Les chemins que le code sert lui-même, hors collection. */
const CHEMINS_FIXES = ["/", "/contact", "/blog"];

/** Une entrée du plan, avec ses trois adresses. */
function entree(chemin: string, modifie?: string | null): MetadataRoute.Sitemap[number] {
  // `lien("/", "zh")` vaut « /zh/ » quand la canonique de la même page vaut
  // « /zh » : la barre finale tombe, sauf à la racine où elle est l'adresse.
  const adresse = (langue: (typeof langues)[number]) =>
    `${BASE}${lien(chemin, langue).replace(/(.)\/$/, "$1")}`;

  return {
    url: adresse(langueParDefaut),
    lastModified: modifie ? new Date(modifie) : undefined,
    alternates: {
      languages: Object.fromEntries(langues.map((l) => [codesHreflang[l], adresse(l)])),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (ADRESSE_PROVISOIRE) return [];

  const payload = await getPayload({ config });

  const [{ docs: pages }, { docs: articles }] = await Promise.all([
    payload.find({
      collection: "pages",
      // Le local API ignore l'`access` par défaut : sans ceci, un brouillon
      // entrerait dans le plan et serait proposé à l'indexation.
      overrideAccess: false,
      locale: langueParDefaut,
      limit: 500,
      depth: 2,
    }),
    payload.find({
      collection: "posts",
      overrideAccess: false,
      locale: langueParDefaut,
      limit: 500,
      depth: 0,
    }),
  ]);

  /* La page « contact » existe dans la collection pour le back-office, mais
     c'est une route dédiée qui la sert : elle est déjà dans les chemins fixes.
     La planche du design system est réservée aux personnes connectées. */
  const EXCLUS = new Set(["contact", "blog", "design-system"]);

  return [
    ...CHEMINS_FIXES.map((c) => entree(c)),
    ...pages
      .filter((p) => !EXCLUS.has(cheminDe(p)))
      .map((p) => entree(`/${cheminDe(p)}`, p.updatedAt)),
    ...articles.map((a) => entree(`/blog/${a.slug}`, a.updatedAt)),
  ];
}
