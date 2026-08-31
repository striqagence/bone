import type { CollectionConfig } from "payload";

import { revaliderSite } from "../lib/revalidate";

/** Catégories du blog, affichées en étiquette sur les cartes d'article. */
export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Catégorie", plural: "Catégories" },
  admin: { useAsTitle: "nom", group: "Contenu", defaultColumns: ["nom", "slug"] },
  access: { read: () => true },
  hooks: { afterChange: [() => revaliderSite()] },
  fields: [
    { name: "nom", type: "text", required: true, localized: true, label: "Nom" },
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
