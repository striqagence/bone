import type { CollectionConfig } from "payload";

/**
 * Compteurs anti-abus des formulaires publics.
 *
 * Une ligne par envoi accepté et par jeton consommé. Rien d'autre n'y est
 * écrit : ni adresse IP, ni contenu de formulaire. La clé est une signature
 * de l'adresse, que le secret du serveur seul permet de recalculer.
 *
 * La collection est fermée de tous les côtés, y compris en lecture : elle ne
 * sert qu'au code du serveur, qui écrit par le local API. Elle est masquée du
 * back-office, où elle ne dirait rien d'utile à un rédacteur.
 *
 * Les lignes portent leur date de péremption et sont purgées à l'envoi
 * suivant : la table reste de la taille du trafic récent, pas de l'historique.
 */
export const Verrous: CollectionConfig = {
  slug: "verrous",
  labels: { singular: "Verrou", plural: "Verrous" },
  admin: { hidden: true },
  access: {
    create: () => false,
    read: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: "cle", type: "text", required: true, index: true, label: "Clé" },
    { name: "expiration", type: "date", required: true, index: true, label: "Expiration" },
  ],
};
