import type { CollectionConfig } from "payload";

import { revaliderSite } from "../lib/revalidate";

/** Ligatures que la normalisation Unicode ne décompose pas d'elle-même. */
const LIGATURES: Record<string, string> = { œ: "oe", Œ: "oe", æ: "ae", Æ: "ae", ß: "ss" };

/**
 * Ramène un nom de fichier à l'ASCII minuscule, tirets compris.
 *
 * Le stockage Supabase rejette les clés accentuées par un `InvalidKey`, et
 * l'upload échouait alors avec un simple « Something went wrong » côté
 * back-office. Le piège vient de macOS, qui enregistre les noms de fichiers en
 * forme *décomposée* : le « é » de « Ribeauvillé » y est un « e » suivi d'un
 * accent combinant (U+0301), si bien que le nom paraît correct à l'écran tout
 * en étant refusé. Passer par NFD puis retirer les marques combinantes traite
 * les deux formes d'un coup, décomposée comme précomposée.
 *
 * Le nom de fichier n'a aucune incidence sur le référencement ici : c'est le
 * champ « Texte alternatif » qui porte le sens, et lui accepte les accents.
 */
export function nomDeFichierSur(nom: string): string {
  const point = nom.lastIndexOf(".");
  const base = point > 0 ? nom.slice(0, point) : nom;
  const extension = point > 0 ? nom.slice(point + 1).toLowerCase().replace(/[^a-z0-9]/g, "") : "";

  const racine = base
    .replace(/[œŒæÆß]/g, (c) => LIGATURES[c] ?? c)
    .normalize("NFD") // sépare les lettres de leurs accents
    .replace(/[̀-ͯ]/g, "") // puis supprime les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // Un nom entièrement non latin (cyrillique, idéogrammes…) se réduirait à
  // rien : on lui donne alors un nom neutre plutôt que de laisser passer une
  // clé vide, que le stockage refuserait aussi.
  const propre = racine || "fichier";
  return extension ? `${propre}.${extension}` : propre;
}

export const Media: CollectionConfig = {
  slug: "media",
  hooks: {
    beforeOperation: [
      ({ req }) => {
        const fichier = req.file;
        if (!fichier?.name) return;
        const avant = fichier.name;
        const apres = nomDeFichierSur(avant);
        if (apres === avant) return;
        // `req.file` est un objet simple construit par `fileFactory`, malgré un
        // type qui annonce un `File` du web dont `name` serait en lecture seule.
        (fichier as { name: string }).name = apres;
        req.payload.logger.info(`[media] nom de fichier nettoyé : « ${avant} » -> « ${apres} »`);
      },
    ],
    afterChange: [() => revaliderSite()],
    afterDelete: [() => revaliderSite()],
  },
  labels: { singular: "Média", plural: "Médias" },
  admin: { group: "Contenu" },
  access: { read: () => true },
  upload: {
    // Trois largeurs couvrant les usages courants : vignette, carte, bandeau.
    imageSizes: [
      { name: "thumbnail", width: 480, height: undefined, position: "centre" },
      { name: "card", width: 768, height: undefined, position: "centre" },
      { name: "hero", width: 1920, height: undefined, position: "centre" },
    ],
    focalPoint: true,
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Texte alternatif",
      admin: { description: "Décrit l’image pour les lecteurs d’écran et le SEO." },
    },
  ],
};
