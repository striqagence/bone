import type { CollectionConfig } from "payload";

/**
 * Inscriptions à la newsletter, depuis le bandeau du blog.
 *
 * L'adresse est unique : une seconde inscription avec la même adresse est
 * refusée par la base, et l'action la traite comme un succès — répondre « vous
 * êtes déjà inscrit » révélerait qui figure dans la liste.
 *
 * Comme les demandes de contact, la collection est fermée à l'API publique :
 * seule l'action serveur y écrit, après ses contrôles anti-abus.
 */
export const Abonnes: CollectionConfig = {
  slug: "abonnes",
  labels: { singular: "Abonné", plural: "Abonnés" },
  admin: { group: "Contact", useAsTitle: "email", defaultColumns: ["email", "langue", "createdAt"] },
  access: {
    // Fermée : `POST /api/abonnes` et la mutation GraphQL équivalente laissaient
    // écrire n'importe qui, sans passer par le formulaire ni par ses
    // protections. L'action serveur écrit par le local API, qui passe outre.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true, label: "Adresse e-mail" },
    {
      name: "langue",
      type: "select",
      label: "Langue",
      options: [
        { label: "Français", value: "fr" },
        { label: "Anglais", value: "en" },
      ],
      admin: { description: "Langue de la page depuis laquelle l’inscription a été faite." },
    },
  ],
};
