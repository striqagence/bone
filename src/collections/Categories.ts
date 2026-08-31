import type { CollectionConfig } from "payload";

import { revaliderSite } from "../lib/revalidate";

/** Catégories du blog, affichées en étiquette sur les cartes d'article. */
export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Catégorie", plural: "Catégories" },
  /** L'ordre des filtres du blog est celui de la maquette, pas l'alphabet. */
  orderable: true,
  admin: { useAsTitle: "nom", group: "Contenu", defaultColumns: ["nom", "slug"] },
  access: { read: () => true },
  hooks: { afterChange: [() => revaliderSite()] },
  fields: [
    { name: "nom", type: "text", required: true, localized: true, label: "Nom" },
    {
      name: "libelleLong",
      type: "text",
      localized: true,
      label: "Libellé de filtre",
      admin: {
        description:
          "Version développée du nom, pour les filtres du blog : « Capital » sur l’étiquette d’une carte, « Revalorisation / Capital » dans la barre. Vide, le nom sert aux deux.",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug",
      admin: { description: "Sert au filtrage du blog. Non localisé." },
    },
  ],
};
