import type { Block } from "payload";

/**
 * Encadré « à retenir », posé dans le corps d'un article.
 *
 * C'est un bloc de l'éditeur et non une section de page : il s'intercale dans
 * le texte, à l'endroit que l'auteur choisit, et non en bas de l'article.
 */
export const ARetenir: Block = {
  slug: "aRetenir",
  labels: { singular: "À retenir", plural: "À retenir" },
  fields: [
    {
      name: "etiquette",
      type: "text",
      required: true,
      localized: true,
      label: "Étiquette",
      defaultValue: "à retenir",
    },
    {
      name: "points",
      type: "array",
      label: "Points",
      minRows: 1,
      fields: [{ name: "texte", type: "textarea", required: true, localized: true, label: "Texte" }],
    },
  ],
};
