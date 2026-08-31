import type { CollectionConfig } from "payload";

/**
 * Demandes envoyées depuis le formulaire de contact.
 *
 * Les demandes sont enregistrées avant toute notification : un envoi d'e-mail
 * qui échoue ne doit pas faire disparaître une demande. La notification viendra
 * s'ajouter quand un adaptateur d'e-mail sera branché.
 *
 * En lecture, la collection est réservée aux utilisateurs connectés — elle
 * contient des coordonnées professionnelles. En création elle est ouverte,
 * c'est le formulaire public qui écrit.
 */
export const Demandes: CollectionConfig = {
  slug: "demandes",
  labels: { singular: "Demande", plural: "Demandes" },
  admin: {
    group: "Contact",
    useAsTitle: "email",
    defaultColumns: ["email", "nom", "prenom", "profil", "createdAt"],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "profil",
      type: "select",
      required: true,
      label: "Profil",
      options: [
        { label: "DSI", value: "dsi" },
        { label: "RSSI", value: "rssi" },
        { label: "Direction technique", value: "technique" },
        { label: "Responsable infrastructure", value: "infra" },
        { label: "Dirigeant", value: "dirigeant" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "nom", type: "text", required: true, label: "Nom", admin: { width: "50%" } },
        { name: "prenom", type: "text", required: true, label: "Prénom", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "email", type: "email", required: true, label: "E-mail", admin: { width: "50%" } },
        {
          name: "telephone",
          type: "text",
          required: true,
          label: "Téléphone",
          admin: { width: "50%" },
        },
      ],
    },
    { name: "contexte", type: "textarea", required: true, label: "Contexte" },
    {
      name: "langue",
      type: "text",
      label: "Langue de la demande",
      admin: {
        readOnly: true,
        description: "Renseignée automatiquement, utile pour répondre dans la bonne langue.",
      },
    },
  ],
};
