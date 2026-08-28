/**
 * Langues du site.
 *
 * Le français est servi à la racine (`/contact`) et l'anglais sous préfixe
 * (`/en/contact`) : les URLs françaises restent courtes et stables, donc sans
 * redirection à gérer au référencement. Le préfixe absent est réintroduit par
 * le middleware, qui réécrit vers `/fr/...` sans changer l'URL visible.
 */
export const langues = ["fr", "en"] as const;

export type Langue = (typeof langues)[number];

export const langueParDefaut: Langue = "fr";

export function estUneLangue(valeur: string): valeur is Langue {
  return (langues as readonly string[]).includes(valeur);
}

/** Préfixe d'URL d'une langue — vide pour le français, servi à la racine. */
export function prefixe(langue: Langue): string {
  return langue === langueParDefaut ? "" : `/${langue}`;
}

/** Construit une URL dans la langue donnée à partir d'un chemin non préfixé. */
export function lien(chemin: string, langue: Langue): string {
  return `${prefixe(langue)}${chemin}`;
}

/**
 * Retire le préfixe de langue d'un chemin visible.
 *
 * Sert à comparer une URL courante à un chemin de référence, et à conserver la
 * page consultée lors d'un changement de langue.
 */
export function cheminSansLangue(chemin: string): string {
  for (const langue of langues) {
    if (chemin === `/${langue}`) return "/";
    if (chemin.startsWith(`/${langue}/`)) return chemin.slice(langue.length + 1);
  }
  return chemin;
}
