import type { CollectionConfig } from "payload";

import { serveurEnHttps } from "../lib/adresse";

/**
 * Comptes du back-office.
 *
 * Longueur minimale du mot de passe : Payload en accepte trois caractères par
 * défaut, ce qui ne tient pas une minute face à une machine. Douze sont
 * exigés, le seuil que recommande l'ANSSI dès lors qu'un blocage limite les
 * tentatives — ce qui est le cas ici, cinq essais puis dix minutes de pause.
 *
 * La règle est posée en validation plutôt qu'en longueur de champ : Payload
 * fabrique le champ de mot de passe lui-même et ne l'expose pas à la
 * configuration.
 */
const LONGUEUR_MINIMALE = 12;

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utilisateur", plural: "Utilisateurs" },
  admin: {
    useAsTitle: "email",
    group: "Administration",
    description: "Les comptes qui accèdent à ce back-office.",
  },
  auth: {
    /* Écrits plutôt que laissés aux valeurs par défaut : ce sont des décisions,
       et une mise à jour de Payload ne doit pas les changer dans notre dos. */
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 2 * 60 * 60,
    /* Aucune intégration ne s'authentifie par clé : la laisser ouverte
       ajouterait une porte sans usage. */
    useAPIKey: false,
    cookies: {
      sameSite: "Lax",
      /* Sans cela, le cookie de session voyagerait aussi en clair. Le réglage
         suit le protocole du site plutôt que l'environnement : en local, où
         `npm start` sert pourtant en mode production, il resterait sinon
         impossible de se connecter. */
      secure: serveurEnHttps(),
    },
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const motDePasse = data?.password;
        if (typeof motDePasse === "string" && motDePasse.length > 0) {
          if (motDePasse.length < LONGUEUR_MINIMALE) {
            throw new Error(
              `Le mot de passe doit faire au moins ${LONGUEUR_MINIMALE} caractères.`,
            );
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nom",
    },
  ],
};
