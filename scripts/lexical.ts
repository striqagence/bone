/**
 * Fabrique de texte riche pour les scripts de peuplement.
 *
 * Le texte riche est stocké en JSON Lexical. Le composer à la main dans chaque
 * script serait illisible, et le ressaisir dans le back-office pour des pages
 * entières de texte juridique n'apporterait rien : ces fonctions produisent la
 * même structure que l'éditeur.
 */
const texte = (contenu: string) => ({
  type: "text" as const,
  detail: 0,
  format: 0,
  mode: "normal" as const,
  style: "",
  text: contenu,
  version: 1,
});

const commun = {
  direction: "ltr" as const,
  format: "" as const,
  indent: 0,
  version: 1,
};

export const paragraphe = (contenu: string) => ({
  type: "paragraph" as const,
  children: [texte(contenu)],
  textFormat: 0,
  ...commun,
});

export const titre = (contenu: string, niveau: "h2" | "h3" = "h2") => ({
  type: "heading" as const,
  tag: niveau,
  children: [texte(contenu)],
  ...commun,
});

export const citation = (contenu: string) => ({
  type: "quote" as const,
  children: [texte(contenu)],
  ...commun,
});

export const liste = (points: string[]) => ({
  type: "list" as const,
  listType: "bullet" as const,
  start: 1,
  tag: "ul" as const,
  children: points.map((p, i) => ({
    type: "listitem" as const,
    checked: undefined,
    value: i + 1,
    children: [texte(p)],
    ...commun,
  })),
  ...commun,
});

/** Un bloc de l'éditeur — l'encadré « à retenir » des articles. */
export const blocEditeur = (champs: Record<string, unknown>) => ({
  type: "block" as const,
  fields: champs,
  format: "" as const,
  version: 2,
});

export const racine = (enfants: unknown[]) => ({
  root: {
    type: "root" as const,
    children: enfants,
    ...commun,
  },
});
