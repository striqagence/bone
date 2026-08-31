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
  ],
};
