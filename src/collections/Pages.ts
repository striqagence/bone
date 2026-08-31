import type { CollectionConfig } from "payload";

import { revaliderSite } from "../lib/revalidate";

/**
 * Pages du site vitrine.
 *
 * Le `slug` n'est pas localisé : la structure des deux langues est identique,
 * seul le préfixe de langue distingue les URLs. Une page vit donc à
 * /competences et /en/competences, et non sous deux slugs différents — ce qui
 * évite d'avoir à faire correspondre les deux arborescences pour le sélecteur
 * de langue.
 *
 * Le `parent` sert au fil d'ariane et à l'URL : une page rattachée à
 * « Nos compétences » est servie à /competences/expertise. La profondeur est
 * libre, mais la maquette ne dépasse pas deux niveaux.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    useAsTitle: "titre",
    group: "Contenu",
    defaultColumns: ["titre", "slug", "parent", "_status"],
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
        {
          name: "titre",
          type: "text",
          required: true,
          localized: true,
          label: "Titre",
          admin: { width: "50%" },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          label: "Slug",
          admin: {
            width: "50%",
            description: "Sans barre oblique : « competences », « expertise ».",
          },
        },
      ],
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "pages",
      label: "Page parente",
      admin: {
        description:
          "Détermine l’URL et le fil d’ariane. Laisser vide pour une page de premier niveau.",
      },
      /** Une page ne peut pas être sa propre parente. */
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
    },
    {
      name: "pole",
      type: "select",
      label: "Pôle",
      options: [
        { label: "Expertise", value: "expertise" },
        { label: "Capital", value: "capital" },
        { label: "Feed", value: "feed" },
      ],
      admin: {
        description:
          "Bascule la page sur le hero sur photo et y affiche le logotype du pôle. Laisser vide pour une page ordinaire.",
      },
    },
    {
      name: "accrocheCourte",
      type: "text",
      localized: true,
      label: "Accroche courte",
      admin: {
        description:
          "Deux ou trois mots situant le pôle (« Pôle cœur »). Affichée sur la bande des pôles de l’accueil.",
        condition: (donnees) => Boolean(donnees?.pole),
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "surtitre",
              type: "text",
              localized: true,
              label: "Surtitre",
            },
            {
              name: "accroche",
              type: "textarea",
              localized: true,
              label: "Titre principal",
              admin: { description: "Le grand titre du hero, distinct du titre de la page." },
            },
            {
              name: "description",
              type: "textarea",
              localized: true,
              label: "Texte de l’encart",
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "Photo du hero",
            },
            {
              name: "cta",
              type: "group",
              label: "Bouton",
              fields: [
                { name: "libelle", type: "text", localized: true, label: "Libellé" },
                {
                  name: "chemin",
                  type: "text",
                  label: "Chemin",
                  admin: { description: "Sans préfixe de langue." },
                },
              ],
            },
          ],
        },
        {
          label: "Référencement",
          fields: [
            {
              name: "metaTitre",
              type: "text",
              localized: true,
              label: "Titre pour les moteurs",
              admin: { description: "À défaut, le titre de la page est utilisé." },
            },
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
