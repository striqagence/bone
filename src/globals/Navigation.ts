import type { GlobalConfig } from "payload";

import { revaliderSite } from "../lib/revalidate";

/**
 * Libellés et liens de l'en-tête et du pied de page.
 *
 * Tout est `localized` : c'est la raison d'être de ce global. Écrits en dur,
 * ces libellés auraient imposé un déploiement pour chaque correction de
 * formulation, et une reprise du code pour chaque traduction.
 *
 * Les chemins restent saisissables : une page vitrine se renomme (« Notre
 * approche » devient « Notre méthode »), et l'URL suit. Ils ne sont pas
 * localisés en revanche — la structure des deux versions est identique, seul
 * le préfixe de langue change et il est ajouté à l'affichage.
 */
const champLibelle = {
  name: "libelle",
  type: "text" as const,
  required: true,
  localized: true,
  label: "Libellé",
};

const champChemin = {
  name: "chemin",
  type: "text" as const,
  required: true,
  label: "Chemin",
  admin: {
    description: "Sans préfixe de langue : « /contact », pas « /fr/contact ».",
  },
};

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: { group: "Configuration" },
  access: { read: () => true },
  hooks: { afterChange: [() => revaliderSite()] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "En-tête",
          fields: [
            {
              name: "liensPrincipaux",
              type: "array",
              label: "Liens du menu",
              minRows: 1,
              admin: { initCollapsed: true },
              fields: [
                champLibelle,
                champChemin,
                {
                  name: "avecDeroulant",
                  type: "checkbox",
                  label: "Ouvre le panneau des pôles",
                  defaultValue: false,
                },
              ],
            },
            {
              name: "boutonEntete",
              type: "group",
              label: "Bouton de la barre",
              fields: [champLibelle, champChemin],
            },
          ],
        },
        {
          label: "Pôles",
          description:
            "Panneau déroulant de l'en-tête. Les mêmes pôles alimentent la première colonne du pied de page.",
          fields: [
            {
              name: "poles",
              type: "array",
              label: "Pôles",
              minRows: 1,
              admin: { initCollapsed: true },
              fields: [
                { ...champLibelle, name: "titre", label: "Titre" },
                {
                  name: "sousTitre",
                  type: "text",
                  required: true,
                  localized: true,
                  label: "Sous-titre",
                },
                champChemin,
              ],
            },
          ],
        },
        {
          label: "Pied de page",
          fields: [
            {
              name: "baseline",
              type: "textarea",
              required: true,
              localized: true,
              label: "Phrase d'accroche",
            },
            {
              name: "titrePoles",
              type: "text",
              required: true,
              localized: true,
              label: "Titre de la colonne des pôles",
            },
            {
              name: "colonnes",
              type: "array",
              label: "Colonnes de liens",
              admin: { initCollapsed: true },
              fields: [
                { ...champLibelle, name: "titre", label: "Titre de la colonne" },
                {
                  name: "liens",
                  type: "array",
                  label: "Liens",
                  minRows: 1,
                  fields: [champLibelle, champChemin],
                },
              ],
            },
            {
              name: "contact",
              type: "group",
              label: "Colonne contact",
              fields: [
                { ...champLibelle, name: "titre", label: "Titre de la colonne" },
                { ...champLibelle, name: "libelleFormulaire", label: "Libellé du lien vers le formulaire" },
                { name: "email", type: "email", required: true, label: "Adresse e-mail" },
                { name: "linkedin", type: "text", required: true, label: "URL LinkedIn" },
              ],
            },
            {
              name: "liensLegaux",
              type: "array",
              label: "Liens légaux",
              admin: { initCollapsed: true },
              fields: [champLibelle, champChemin],
            },
            {
              name: "credit",
              type: "group",
              label: "Crédit de conception",
              fields: [
                champLibelle,
                { name: "url", type: "text", required: true, label: "URL" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
