import type { GlobalConfig } from "payload";

import { revaliderSite } from "../lib/revalidate";

/**
 * Contenu de la page d'accueil.
 *
 * Un global plutôt qu'une page de la collection : l'accueil est unique, et ses
 * sections ne suivent pas le gabarit des pages internes. Les champs sont
 * ajoutés section par section, au fil de l'intégration.
 */
export const Accueil: GlobalConfig = {
  slug: "accueil",
  label: "Accueil",
  admin: { group: "Contenu" },
  access: { read: () => true },
  hooks: { afterChange: [() => revaliderSite()] },
  fields: [
    {
      name: "referencement",
      type: "group",
      label: "Référencement",
      admin: { description: "Ce que les moteurs et les réseaux sociaux affichent." },
      fields: [
        {
          name: "metaTitre",
          type: "text",
          required: true,
          localized: true,
          label: "Titre pour les moteurs",
          admin: { description: "Une soixantaine de signes : au-delà, Google tronque." },
        },
        {
          name: "metaDescription",
          type: "textarea",
          required: true,
          localized: true,
          label: "Description pour les moteurs",
          admin: { description: "Cent cinquante à cent soixante signes." },
        },
      ],
    },
    {
      name: "hero",
      type: "group",
      label: "Hero",
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        {
          name: "lignes",
          type: "array",
          label: "Lignes du titre",
          minRows: 1,
          maxRows: 3,
          admin: {
            description:
              "Chaque ligne se compose d’un verbe à pleine intensité et d’un complément atténué.",
          },
          fields: [
            { name: "verbe", type: "text", required: true, localized: true, label: "Verbe" },
            {
              name: "complement",
              type: "text",
              required: true,
              localized: true,
              label: "Complément",
            },
          ],
        },
        { name: "chapo", type: "textarea", required: true, localized: true, label: "Chapô" },
        {
          name: "cta",
          type: "group",
          label: "Bouton",
          fields: [
            { name: "libelle", type: "text", required: true, localized: true, label: "Libellé" },
            { name: "chemin", type: "text", required: true, label: "Chemin" },
          ],
        },
        { name: "image", type: "upload", relationTo: "media", label: "Photo de fond" },
      ],
    },
    {
      name: "enBref",
      type: "group",
      label: "En bref",
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
        { name: "propos", type: "textarea", required: true, localized: true, label: "Propos" },
        {
          name: "precision",
          type: "textarea",
          required: true,
          localized: true,
          label: "Précision",
          admin: { description: "Affichée en retrait sous le propos." },
        },
        {
          name: "cta",
          type: "group",
          label: "Bouton",
          fields: [
            { name: "libelle", type: "text", required: true, localized: true, label: "Libellé" },
            { name: "chemin", type: "text", required: true, label: "Chemin" },
          ],
        },
      ],
    },
    {
      name: "constat",
      type: "group",
      label: "Le constat",
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
        {
          name: "realite",
          type: "group",
          label: "Carte « La réalité terrain »",
          fields: [
            { name: "titre", type: "text", required: true, localized: true, label: "Titre" },
            {
              name: "chiffre",
              type: "text",
              required: true,
              label: "Chiffre",
              admin: { description: "Affiché en très grand, en bleu de marque." },
            },
            { name: "legende", type: "textarea", required: true, localized: true, label: "Légende" },
            {
              name: "puces",
              type: "array",
              label: "Puces",
              fields: [
                { name: "texte", type: "textarea", required: true, localized: true, label: "Texte" },
              ],
            },
            { name: "photo", type: "upload", relationTo: "media", label: "Photo" },
          ],
        },
        {
          name: "enjeu",
          type: "group",
          label: "Carte « Le vrai enjeu »",
          fields: [
            { name: "titre", type: "text", required: true, localized: true, label: "Titre" },
            { name: "texte", type: "textarea", required: true, localized: true, label: "Texte" },
            {
              name: "citation",
              type: "textarea",
              required: true,
              localized: true,
              label: "Citation",
              admin: { description: "Affichée en italique, guillemets compris." },
            },
            { name: "photo", type: "upload", relationTo: "media", label: "Photo" },
          ],
        },
      ],
    },
    {
      name: "promesse",
      type: "group",
      label: "Notre promesse",
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
      ],
    },
    {
      name: "role",
      type: "group",
      label: "Notre rôle fondamental",
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
        { name: "chapo", type: "textarea", required: true, localized: true, label: "Chapô" },
        {
          name: "etapes",
          type: "array",
          label: "Étapes",
          minRows: 1,
          admin: { initCollapsed: true },
          fields: [
            { name: "numero", type: "text", required: true, label: "Numéro" },
            { name: "titre", type: "text", required: true, localized: true, label: "Titre" },
            { name: "texte", type: "textarea", required: true, localized: true, label: "Texte" },
            {
              name: "accentuee",
              type: "checkbox",
              label: "Mise en avant",
              defaultValue: false,
              admin: { description: "Affiche la carte sur fond bleu." },
            },
          ],
        },
      ],
    },
    {
      name: "positionnement",
      type: "group",
      label: "Positionnement",
      admin: {
        description:
          "Les deux colonnes se lisent par paires : la première entrée de gauche fait face à la première de droite.",
      },
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
        {
          name: "gauche",
          type: "group",
          label: "Colonne de gauche",
          fields: [
            { name: "titre", type: "text", required: true, localized: true, label: "Titre" },
            { name: "sousTitre", type: "text", required: true, localized: true, label: "Sous-titre" },
            {
              name: "entrees",
              type: "array",
              label: "Entrées",
              minRows: 1,
              fields: [
                { name: "titre", type: "text", required: true, localized: true, label: "Titre" },
                { name: "texte", type: "textarea", required: true, localized: true, label: "Texte" },
              ],
            },
          ],
        },
        {
          name: "droite",
          type: "group",
          label: "Colonne de droite",
          fields: [
            { name: "titre", type: "text", required: true, localized: true, label: "Titre" },
            { name: "sousTitre", type: "text", required: true, localized: true, label: "Sous-titre" },
            {
              name: "entrees",
              type: "array",
              label: "Entrées",
              minRows: 1,
              fields: [
                { name: "titre", type: "text", required: true, localized: true, label: "Titre" },
                { name: "texte", type: "textarea", required: true, localized: true, label: "Texte" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "differenciation",
      type: "group",
      label: "Différenciation",
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
        {
          name: "habituelle",
          type: "group",
          label: "Carte « L’approche habituelle »",
          fields: [
            { name: "badge", type: "text", required: true, localized: true, label: "Étiquette" },
            { name: "titre", type: "text", required: true, localized: true, label: "Titre" },
            {
              name: "puces",
              type: "array",
              label: "Puces",
              minRows: 1,
              fields: [
                { name: "texte", type: "textarea", required: true, localized: true, label: "Texte" },
              ],
            },
          ],
        },
        {
          name: "bone",
          type: "group",
          label: "Carte « Bone »",
          fields: [
            { name: "badge", type: "text", required: true, localized: true, label: "Étiquette" },
            { name: "titre", type: "text", required: true, localized: true, label: "Titre" },
            {
              name: "puces",
              type: "array",
              label: "Puces",
              minRows: 1,
              fields: [
                { name: "texte", type: "textarea", required: true, localized: true, label: "Texte" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "poles",
      type: "group",
      label: "Nos 3 pôles",
      admin: {
        description:
          "Les trois bandes sont alimentées par les pages de pôle : leur accroche courte, leur surtitre et leur photo. Seuls les titres de la section se saisissent ici.",
      },
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        {
          name: "titreHaut",
          type: "text",
          required: true,
          localized: true,
          label: "Titre, première ligne",
          admin: { description: "En grand, bleu de marque." },
        },
        {
          name: "titreBas",
          type: "text",
          required: true,
          localized: true,
          label: "Titre, seconde ligne",
          admin: { description: "Plus petite, marine." },
        },
      ],
    },
    {
      name: "chiffres",
      type: "group",
      label: "Le problème en chiffres",
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
        {
          name: "constat",
          type: "textarea",
          required: true,
          localized: true,
          label: "Constat",
          admin: { description: "Première moitié du chapô, à pleine intensité." },
        },
        {
          name: "consequence",
          type: "textarea",
          required: true,
          localized: true,
          label: "Conséquence",
          admin: { description: "Seconde moitié, affichée en retrait." },
        },
        {
          name: "statistiques",
          type: "array",
          label: "Statistiques",
          minRows: 1,
          admin: { initCollapsed: true },
          fields: [
            { name: "valeur", type: "text", required: true, label: "Valeur" },
            { name: "unite", type: "text", required: true, label: "Unité" },
            { name: "libelle", type: "text", required: true, localized: true, label: "Libellé" },
            {
              name: "precision",
              type: "textarea",
              required: true,
              localized: true,
              label: "Précision",
            },
          ],
        },
      ],
    },
    {
      name: "faq",
      type: "group",
      label: "Questions fréquentes",
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
        { name: "image", type: "upload", relationTo: "media", label: "Photo" },
        {
          name: "questions",
          type: "array",
          label: "Questions",
          minRows: 1,
          admin: { initCollapsed: true },
          fields: [
            { name: "question", type: "text", required: true, localized: true, label: "Question" },
            {
              name: "reponse",
              type: "textarea",
              localized: true,
              label: "Réponse",
              admin: { description: "Sans réponse, la question s’affiche sans pouvoir se déplier." },
            },
          ],
        },
      ],
    },
    {
      name: "appel",
      type: "group",
      label: "Appel à l’action",
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
        { name: "chapo", type: "textarea", required: true, localized: true, label: "Chapô" },
        {
          name: "cta",
          type: "group",
          label: "Bouton",
          fields: [
            { name: "libelle", type: "text", required: true, localized: true, label: "Libellé" },
            { name: "chemin", type: "text", required: true, label: "Chemin" },
          ],
        },
      ],
    },
    {
      name: "profils",
      type: "group",
      label: "À qui s’adresse Bone",
      admin: {
        description:
          "Les fonds s’assombrissent dans l’ordre des profils : la progression suit la position, elle ne se saisit pas.",
      },
      fields: [
        { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
        {
          name: "titreHaut",
          type: "text",
          required: true,
          localized: true,
          label: "Titre, énoncé",
          admin: { description: "Affiché en retrait." },
        },
        {
          name: "titreBas",
          type: "text",
          required: true,
          localized: true,
          label: "Titre, résolution",
        },
        {
          name: "liste",
          type: "array",
          label: "Profils",
          minRows: 1,
          maxRows: 4,
          admin: { initCollapsed: true },
          fields: [
            {
              name: "picto",
              type: "select",
              required: true,
              label: "Pictogramme",
              options: [
                { label: "Antenne", value: "antenne" },
                { label: "Sécurité", value: "securite" },
                { label: "Balance", value: "balance" },
                { label: "Boussole", value: "boussole" },
              ],
            },
            { name: "titre", type: "text", required: true, localized: true, label: "Profil" },
            {
              name: "description",
              type: "textarea",
              required: true,
              localized: true,
              label: "Situation",
            },
            {
              name: "reponse",
              type: "textarea",
              required: true,
              localized: true,
              label: "Ce que Bone apporte",
            },
            { name: "image", type: "upload", relationTo: "media", label: "Photo" },
          ],
        },
      ],
    },
  ],
};
