import type { GlobalConfig } from "payload";

import { revaliderSite } from "../lib/revalidate";
import { TAILLES_APERCU, urlApercu } from "../lib/apercu-url";
import { sections } from "../blocks";

/**
 * Contenu de la page d'accueil.
 *
 * Un global plutôt qu'une page de la collection : l'accueil est unique, et ses
 * sections ne suivent pas le gabarit des pages internes. Les champs sont
 * ajoutés section par section, au fil de l'intégration.
 */
export const Accueil: GlobalConfig = {
  /**
   * Lecture dispensée de la double authentification : le site public la fait
   * en permanence, sans compte connecté. L'écriture, elle, reste enveloppée.
   */
  custom: { totp: { disableAccessWrapper: { read: true } } },
  slug: "accueil",
  label: "Accueil",
  admin: {
    group: "Contenu",
    description: "La page d’accueil. Ses sections sont fixes : leur contenu se modifie ici, pas leur ordre.",
    preview: (_, { locale }) => urlApercu({ global: "accueil" }, locale),
    livePreview: {
      breakpoints: TAILLES_APERCU,
      url: ({ locale }) => urlApercu({ global: "accueil" }, locale),
    },
  },
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
      name: "sections",
      type: "blocks",
      label: "Sections",
      blocks: sections,
      admin: {
        initCollapsed: true,
        description:
          "Les sections de la page, dans l’ordre d’affichage. Le hero ci-dessus reste en tête.",
      },
    },
  ],
};
