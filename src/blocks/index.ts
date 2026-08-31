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
      fields: [{ name: "texte", type: "text", required: true, localized: true, label: "Intitulé" }],
    },
  ],
};

export const sections = [BandePoles, Synergie, Grille, AppelAction];
