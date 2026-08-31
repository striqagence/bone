import type { GlobalConfig } from "payload";

import { revaliderSite } from "../lib/revalidate";

/**
 * Page de contact.
 *
 * Un global plutôt qu'une page de la collection : sa structure lui est propre —
 * un formulaire, des coordonnées, une FAQ — et ne se range pas dans le gabarit
 * des pages internes.
 *
 * Les libellés du formulaire y figurent aussi : ils sont visibles par le
 * visiteur, donc traduisibles depuis le back-office comme le reste.
 */
export const Contact: GlobalConfig = {
  slug: "contact",
  label: "Contact",
  admin: { group: "Contenu" },
  access: { read: () => true },
  hooks: { afterChange: [() => revaliderSite()] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Formulaire",
          fields: [
            { name: "surtitre", type: "text", required: true, localized: true, label: "Surtitre" },
            { name: "titre", type: "text", required: true, localized: true, label: "Titre" },
            {
              name: "description",
              type: "textarea",
              required: true,
              localized: true,
              label: "Description",
            },
            {
              name: "mentionChamps",
              type: "text",
              required: true,
              localized: true,
              label: "Mention sur les champs",
            },
            {
              name: "profils",
              type: "array",
              label: "Rôles proposés",
              minRows: 1,
              admin: {
                description:
                  "La valeur doit correspondre à l’un des rôles de la collection Demandes.",
              },
              fields: [
                { name: "valeur", type: "text", required: true, label: "Valeur" },
                { name: "libelle", type: "text", required: true, localized: true, label: "Libellé" },
              ],
            },
            {
              name: "libelles",
              type: "group",
              label: "Libellés des champs",
              fields: [
                { name: "vousEtes", type: "text", required: true, localized: true, label: "Vous êtes" },
                { name: "nom", type: "text", required: true, localized: true, label: "Nom" },
                { name: "prenom", type: "text", required: true, localized: true, label: "Prénom" },
                { name: "email", type: "text", required: true, localized: true, label: "E-mail" },
                { name: "telephone", type: "text", required: true, localized: true, label: "Téléphone" },
                { name: "contexte", type: "text", required: true, localized: true, label: "Contexte" },
                {
                  name: "contextePlaceholder",
                  type: "text",
                  required: true,
                  localized: true,
                  label: "Invite du champ contexte",
                },
                { name: "envoyer", type: "text", required: true, localized: true, label: "Bouton d’envoi" },
                {
                  name: "mentionLegale",
                  type: "textarea",
                  required: true,
                  localized: true,
                  label: "Mention légale",
                },
                { name: "succes", type: "textarea", required: true, localized: true, label: "Message de succès" },
                { name: "erreur", type: "textarea", required: true, localized: true, label: "Message d’erreur" },
              ],
            },
          ],
        },
        {
          label: "Coordonnées",
          fields: [
            { name: "carte", type: "upload", relationTo: "media", label: "Plan d’accès" },
            {
              name: "coordonnees",
              type: "group",
              label: "Encart",
              fields: [
                { name: "badge", type: "text", required: true, localized: true, label: "Étiquette" },
                { name: "adresse", type: "textarea", required: true, localized: true, label: "Adresse" },
                { name: "contact", type: "text", required: true, localized: true, label: "Ligne de contact" },
              ],
            },
          ],
        },
        {
          label: "Questions et suite",
          fields: [
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
                  fields: [
                    { name: "question", type: "text", required: true, localized: true, label: "Question" },
                    { name: "reponse", type: "textarea", localized: true, label: "Réponse" },
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
                    { name: "url", type: "text", required: true, label: "URL" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
