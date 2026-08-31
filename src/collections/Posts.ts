import type { CollectionConfig } from "payload";
import {
  BlocksFeature,
  BlockquoteFeature,
  BoldFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { Articles, AppelAction, Faq } from "../blocks";
import { ARetenir } from "../blocks/article";
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
/** Ce qui peut suivre le corps d'un article, dans l'ordre de la maquette. */
const sectionsArticle = [Articles, Faq, AppelAction];

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
            {
              name: "contenu",
              type: "richText",
              localized: true,
              label: "Corps de l’article",
              /**
               * L'éditeur est restreint à ce que la maquette sait mettre en
               * page : deux niveaux de titre, du texte, des listes, des
               * citations, des images légendées et l'encadré « à retenir ».
               * Ouvrir tout Lexical laisserait produire des mises en forme
               * qu'aucune feuille de style du site ne couvre.
               */
              editor: lexicalEditor({
                features: [
                  ParagraphFeature(),
                  HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
                  BoldFeature(),
                  ItalicFeature(),
                  LinkFeature(),
                  UnorderedListFeature(),
                  BlockquoteFeature(),
                  UploadFeature({
                    collections: {
                      media: {
                        fields: [
                          {
                            name: "legende",
                            type: "text",
                            localized: true,
                            label: "Légende",
                            admin: { description: "Affichée sous l’image." },
                          },
                        ],
                      },
                    },
                  }),
                  BlocksFeature({ blocks: [ARetenir] }),
                  InlineToolbarFeature(),
                ],
              }),
            },
          ],
        },
        {
          label: "Sections",
          fields: [
            {
              name: "sections",
              type: "blocks",
              label: "Sections de bas de page",
              blocks: sectionsArticle,
              admin: {
                description:
                  "Ce qui suit le corps de l’article : les articles à lire aussi, la FAQ et l’appel à l’action.",
              },
            },
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
