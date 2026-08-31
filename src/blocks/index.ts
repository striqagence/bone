import type { Block } from "payload";

/**
 * Sections composables des pages.
 *
 * Les écrans internes enchaînent des sections différentes sous un même hero.
 * Un champ de blocs sur la collection Pages évite d'avoir un global par page,
 * et laisse le back-office réordonner les sections sans passer par le code.
 */
export const BandePoles: Block = {
  slug: "bandePoles",
  labels: { singular: "Bande des pôles", plural: "Bandes des pôles" },
  admin: {
    group: "Sections",
  },
  fields: [
    {
      name: "avecEnTete",
      type: "checkbox",
      label: "Afficher le titre au-dessus",
      defaultValue: false,
      admin: {
        description:
          "À laisser décoché quand le hero de la page annonce déjà les pôles.",
      },
    },
    { name: "surtitre", type: "text", localized: true, label: "Surtitre" },
    { name: "titreHaut", type: "text", localized: true, label: "Titre, première ligne" },
    { name: "titreBas", type: "text", localized: true, label: "Titre, seconde ligne" },
  ],
};

export const Synergie: Block = {
  slug: "synergie",
  labels: { singular: "Synergie des pôles", plural: "Synergies des pôles" },
  admin: { group: "Sections" },
  fields: [
    { name: "surtitre", type: "text", localized: true, label: "Surtitre" },
    { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
    { name: "texte", type: "textarea", required: true, localized: true, label: "Texte" },
  ],
};

export const AppelAction: Block = {
  slug: "appelAction",
  labels: { singular: "Appel à l’action", plural: "Appels à l’action" },
  admin: { group: "Sections" },
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
};

export const Grille: Block = {
  slug: "grille",
  labels: { singular: "Grille d’intitulés", plural: "Grilles d’intitulés" },
  admin: { group: "Sections" },
  fields: [
    { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
    { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
    {
      name: "chapo",
      type: "textarea",
      localized: true,
      label: "Précision",
      admin: { description: "Affichée à droite du titre." },
    },
    {
      name: "intitules",
      type: "array",
      label: "Intitulés",
      minRows: 1,
      fields: [
        { name: "texte", type: "text", required: true, localized: true, label: "Intitulé" },
        {
          name: "description",
          type: "textarea",
          localized: true,
          label: "Explication",
          admin: { description: "Facultative. Affichée sous l’intitulé, précédée d’une flèche." },
        },
      ],
    },
  ],
};

export const Escalier: Block = {
  slug: "escalier",
  labels: { singular: "Cartes en escalier", plural: "Cartes en escalier" },
  admin: { group: "Sections" },
  fields: [
    { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
    { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
    { name: "chapo", type: "textarea", required: true, localized: true, label: "Chapô" },
    {
      name: "cartes",
      type: "array",
      label: "Cartes",
      minRows: 1,
      maxRows: 3,
      admin: {
        description:
          "Chaque carte porte soit un numéro, soit un pictogramme. La dernière est souvent mise en avant.",
      },
      fields: [
        { name: "numero", type: "text", label: "Numéro" },
        {
          name: "picto",
          type: "select",
          label: "Pictogramme",
          options: [
            { label: "Antenne", value: "antenne" },
            { label: "Stockage", value: "stockage" },
            { label: "Systèmes", value: "systemes" },
          ],
          admin: { description: "Remplace le numéro s’il est renseigné." },
        },
        { name: "titre", type: "text", required: true, localized: true, label: "Titre" },
        { name: "texte", type: "textarea", required: true, localized: true, label: "Texte" },
        { name: "accentuee", type: "checkbox", label: "Mise en avant", defaultValue: false },
      ],
    },
  ],
};

export const Articles: Block = {
  slug: "articles",
  labels: { singular: "À lire aussi", plural: "À lire aussi" },
  admin: { group: "Sections" },
  fields: [
    { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
    { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
    {
      name: "libelleAction",
      type: "text",
      required: true,
      localized: true,
      label: "Libellé du bouton des cartes",
    },
    {
      name: "nombre",
      type: "number",
      required: true,
      min: 1,
      max: 8,
      defaultValue: 4,
      label: "Nombre d’articles",
      admin: {
        description:
          "Les derniers articles publiés sont repris automatiquement : leur contenu se gère depuis le blog.",
      },
    },
  ],
};

export const Faq: Block = {
  slug: "faq",
  labels: { singular: "Questions fréquentes", plural: "Questions fréquentes" },
  admin: { group: "Sections" },
  fields: [
    { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
    { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
    { name: "image", type: "upload", relationTo: "media", label: "Photo" },
    {
      name: "questions",
      type: "array",
      label: "Questions",
      minRows: 1,
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
};

export const Enjeux: Block = {
  slug: "enjeux",
  labels: { singular: "Cartes d’enjeux", plural: "Cartes d’enjeux" },
  admin: { group: "Sections" },
  fields: [
    { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
    {
      name: "titreHaut",
      type: "text",
      localized: true,
      label: "Titre, énoncé",
      admin: { description: "Facultatif. Affiché en retrait devant le titre." },
    },
    { name: "titreBas", type: "text", required: true, localized: true, label: "Titre" },
    {
      name: "cartes",
      type: "array",
      label: "Cartes",
      minRows: 1,
      maxRows: 4,
      admin: {
        initCollapsed: true,
        description: "Les fonds s’assombrissent dans l’ordre : la progression suit la position.",
      },
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
            { label: "Dette", value: "dette" },
            { label: "Alerte", value: "alerte" },
            { label: "Interdépendances", value: "liens" },
          ],
        },
        { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
        { name: "description", type: "textarea", required: true, localized: true, label: "Situation" },
        { name: "reponse", type: "textarea", required: true, localized: true, label: "Ce que Bone apporte" },
        { name: "image", type: "upload", relationTo: "media", label: "Photo" },
      ],
    },
  ],
};

export const Promesse: Block = {
  slug: "promesse",
  labels: { singular: "Affirmation sur halos", plural: "Affirmations sur halos" },
  admin: { group: "Sections" },
  fields: [
    { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
    { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
  ],
};

export const Chiffres: Block = {
  slug: "chiffres",
  labels: { singular: "Statistiques", plural: "Statistiques" },
  admin: { group: "Sections" },
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
      localized: true,
      label: "Conséquence",
      admin: {
        description:
          "Facultative. Affichée en retrait à la suite du constat — l’accueil l’emploie, Capital énonce d’un seul tenant.",
      },
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
        { name: "precision", type: "textarea", required: true, localized: true, label: "Précision" },
      ],
    },
  ],
};

export const Differenciation: Block = {
  slug: "differenciation",
  labels: { singular: "Comparaison", plural: "Comparaisons" },
  admin: { group: "Sections" },
  fields: [
    { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
    { name: "titre", type: "textarea", required: true, localized: true, label: "Titre" },
    {
      name: "habituelle",
      type: "group",
      label: "Carte de gauche",
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
      label: "Carte de droite, mise en avant",
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
};

export const sections = [
  BandePoles,
  Synergie,
  Grille,
  Escalier,
  Enjeux,
  Promesse,
  Chiffres,
  Articles,
  Faq,
  Differenciation,
  AppelAction,
];
