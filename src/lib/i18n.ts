/**
 * Langues du site.
 *
 * Le français est servi à la racine (`/contact`), les autres sous préfixe
 * (`/en/contact`, `/zh/contact`) : les URLs françaises restent courtes et
 * stables, donc sans redirection à gérer au référencement. Le préfixe absent
 * est réintroduit par le middleware, qui réécrit vers `/fr/...` sans changer
 * l'URL visible.
 *
 * L'ordre compte : il est repris tel quel par le sélecteur de langue.
 */
export const langues = ["fr", "en", "zh"] as const;

export type Langue = (typeof langues)[number];

export const langueParDefaut: Langue = "fr";

export function estUneLangue(valeur: string): valeur is Langue {
  return (langues as readonly string[]).includes(valeur);
}

/**
 * Nom de chaque langue, écrit dans cette langue.
 *
 * Un sélecteur qui traduirait les noms de langues obligerait le lecteur à
 * reconnaître le sien dans une langue qu'il ne lit pas. « 中文 » se trouve du
 * premier coup d'œil, « Chinois » non.
 */
export const nomsDeLangue: Record<Langue, string> = {
  fr: "Français",
  en: "English",
  zh: "中文",
};

/** Abréviation affichée par le sélecteur, au format de la maquette. */
export const abreviations: Record<Langue, string> = {
  fr: "Fr",
  en: "En",
  zh: "中",
};

/**
 * Code de langue déclaré aux moteurs et porté par l'attribut `lang`.
 *
 * Le préfixe d'URL reste court (`/zh`), mais « zh » seul ne dit pas quelle
 * écriture est servie. `zh-Hans` nomme le chinois simplifié, ce qui évite
 * qu'un moteur propose la page à un lecteur de chinois traditionnel, dont les
 * caractères diffèrent.
 */
export const codesHreflang: Record<Langue, string> = {
  fr: "fr",
  en: "en",
  zh: "zh-Hans",
};

/**
 * Mention de droits du pied de page.
 *
 * Elle vit dans le code et non au back-office : c'est une formule figée, que
 * personne n'a à rédiger, et elle ne doit jamais manquer. L'année s'y insère à
 * la construction du site.
 */
export const mentionDroits: Record<Langue, (annee: number) => string> = {
  fr: (annee) => `© ${annee} Bone. Tous droits réservés`,
  en: (annee) => `© ${annee} Bone. All rights reserved`,
  zh: (annee) => `© ${annee} Bone. 保留所有权利`,
};

/**
 * Sens d'écriture et découpe des lignes.
 *
 * Le chinois ne sépare pas les mots par des espaces : un navigateur qui
 * applique la coupure occidentale laisse des lignes courtes suivies de vides.
 * `normal` lui rend sa coupure entre caractères.
 */
export const coupureDeLigne: Record<Langue, "normal" | "auto"> = {
  fr: "auto",
  en: "auto",
  zh: "normal",
};

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
