import type { GlobalConfig } from "payload";

import { revaliderSite } from "../lib/revalidate";

/**
 * Libellés de la liste du blog.
 *
 * Ils accompagnent des contenus que la page ne saisit pas — l'article à la une
 * et la grille sont calculés depuis la collection Articles — mais ce sont des
 * textes, et ils vivent donc en base comme le reste : en dur, ils auraient
 * imposé un déploiement pour chaque reformulation et une reprise du code pour
 * chaque traduction.
 */
export const Blog: GlobalConfig = {
  slug: "blog",
  label: "Blog",
  admin: { group: "Configuration" },
  access: { read: () => true },
  hooks: { afterChange: [() => revaliderSite()] },
  fields: [
    { name: "surtitreUne", type: "text", required: true, localized: true, label: "Surtitre de l’article à la une" },
    { name: "libelleLire", type: "text", required: true, localized: true, label: "Bouton des cartes" },
    {
      name: "titreListe",
      type: "text",
      required: true,
      localized: true,
      label: "Titre de la liste",
      admin: {
        description:
          "Lu par les lecteurs d’écran, pas affiché : la maquette ne titre pas la grille, mais neuf articles sans titre restent difficiles à situer.",
      },
    },
    {
      name: "libelleTousSujets",
      type: "text",
      required: true,
      localized: true,
      label: "Premier filtre",
      admin: { description: "Le filtre qui n’en applique aucun : « Tous les sujets »." },
    },
    {
      name: "gabaritCompte",
      type: "text",
      required: true,
      localized: true,
      label: "Compteur d’articles",
      admin: { description: "« {n} articles » — {n} est remplacé par le nombre trouvé." },
    },
    { name: "libelleCharger", type: "text", required: true, localized: true, label: "Bouton « charger plus »" },
    {
      name: "libelleSommaire",
      type: "text",
      required: true,
      localized: true,
      label: "Titre du sommaire d’un article",
    },
    {
      name: "libelleFaq",
      type: "text",
      required: true,
      localized: true,
      label: "Entrée « FAQ » du sommaire",
      admin: { description: "Ajoutée au sommaire quand l’article porte une FAQ." },
    },
    {
      name: "libellePartageLinkedin",
      type: "text",
      required: true,
      localized: true,
      label: "Partage LinkedIn",
    },
    { name: "libelleCopierLien", type: "text", required: true, localized: true, label: "Copier le lien" },
    { name: "libelleLienCopie", type: "text", required: true, localized: true, label: "Lien copié" },
    {
      name: "messageVide",
      type: "text",
      required: true,
      localized: true,
      label: "Aucun article",
      admin: { description: "Affiché quand un filtre ne ramène rien." },
    },
  ],
};
