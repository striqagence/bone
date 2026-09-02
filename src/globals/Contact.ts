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
            {
              name: "carte",
              type: "group",
              label: "Plan d’accès",
              admin: {
                description:
                  "Le plan est une vraie carte, dessinée par OpenStreetMap : ce sont ces coordonnées qui la centrent et qui posent le repère.",
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "latitude",
                      type: "number",
                      required: true,
                      min: -90,
                      max: 90,
                      label: "Latitude",
                      admin: { width: "34%" },
                    },
                    {
                      name: "longitude",
                      type: "number",
                      required: true,
                      min: -180,
                      max: 180,
                      label: "Longitude",
                      admin: { width: "33%" },
                    },
                    {
                      name: "zoom",
                      type: "number",
                      required: true,
                      min: 1,
                      max: 19,
                      defaultValue: 15,
                      label: "Niveau de zoom",
                      admin: { width: "33%", description: "1 le monde, 19 la rue." },
                    },
                  ],
                },
                {
                  name: "intitule",
                  type: "text",
                  required: true,
                  localized: true,
                  label: "Nom du repère",
                  admin: {
                    description:
                      "Lu à la place de la carte, affiché au survol du repère, et recherché sur Google Maps.",
                  },
                },
                {
                  name: "libelleLien",
                  type: "text",
                  required: true,
                  localized: true,
                  label: "Bouton vers Google Maps",
                  admin: { description: "Posé sur la carte, et porté par l’adresse de l’encart." },
                },
              ],
            },
            {
              name: "coordonnees",
              type: "group",
              label: "Encart",
              fields: [
                { name: "badge", type: "text", required: true, localized: true, label: "Étiquette" },
                { name: "adresse", type: "textarea", required: true, localized: true, label: "Adresse" },
                {
                  name: "email",
                  type: "email",
                  required: true,
                  label: "Adresse e-mail",
                  admin: {
                    description:
                      "Affichée à part du reste de la ligne : elle n’est pas écrite dans la page, mais rétablie à l’affichage, pour la dérober aux moissonneurs d’adresses.",
                  },
                },
                {
                  name: "contact",
                  type: "text",
                  required: true,
                  localized: true,
                  label: "Suite de la ligne de contact",
                  admin: { description: "Ce qui suit l’adresse : téléphone, réseau social." },
                },
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
