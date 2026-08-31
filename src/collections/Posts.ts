import type { CollectionConfig } from "payload";

import { revaliderSite } from "../lib/revalidate";

/**
 * Articles du blog.
 *
 * Le `slug` n'est pas localisé, comme celui des pages : la structure est la
 * même dans les deux langues, seul le préfixe change.
 *
 * Le temps de lecture est saisi plutôt que calculé : la maquette l'affiche dès
 * la carte, et un article peut être publié avec un contenu encore court sans
 * que l'estimation devienne absurde.
 */
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Article", plural: "Articles" },
  admin: {
    useAsTitle: "titre",
    group: "Contenu",
    defaultColumns: ["titre", "categorie", "publieLe", "_status"],
  },
  access: { read: () => true },
  versions: { drafts: true },
  hooks: {
    afterChange: [() => revaliderSite()],
    afterDelete: [() => revaliderSite()],
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "titre", type: "text", required: true, localized: true, label: "Titre", admin: { width: "60%" } },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          label: "Slug",
          admin: { width: "40%", description: "Sans barre oblique." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "categorie",
          type: "relationship",
          relationTo: "categories",
          required: true,
          label: "Catégorie",
          admin: { width: "40%" },
        },
        {
          name: "publieLe",
          type: "date",
          required: true,
          label: "Date de publication",
          admin: { width: "30%", date: { pickerAppearance: "monthOnly", displayFormat: "MMMM yyyy" } },
        },
        {
          name: "minutesLecture",
          type: "number",
          required: true,
          min: 1,
          label: "Minutes de lecture",
          admin: { width: "30%" },
        },
      ],
    },
    {
      name: "extrait",
      type: "textarea",
      required: true,
      localized: true,
      label: "Extrait",
      admin: { description: "Affiché sur la carte, sous le titre." },
    },
    { name: "image", type: "upload", relationTo: "media", label: "Image de couverture" },
    {
      type: "tabs",
      tabs: [
        {
          label: "Contenu",
          fields: [
            { name: "contenu", type: "richText", localized: true, label: "Corps de l’article" },
          ],
        },
        {
          label: "Référencement",
          fields: [
            { name: "metaTitre", type: "text", localized: true, label: "Titre pour les moteurs" },
            {
              name: "metaDescription",
              type: "textarea",
              localized: true,
              label: "Description pour les moteurs",
            },
          ],
        },
      ],
    },
  ],
};
