import "server-only";

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { epelerCourriel, nomImageCourriel } from "./courriel";
import type { Langue } from "./i18n";

/**
 * L'adresse de courriel telle que les pages légales l'affichent : une image.
 *
 * Le fichier et ses mesures sont produits par
 * `scripts/generer-image-courriel.ts`, puis versionnés. Son absence n'est pas
 * une erreur bloquante : la page se rabat sur un renvoi au formulaire. C'est
 * ce qui arrive si l'adresse change au back-office sans que l'image suive, et
 * mieux vaut un renvoi qu'une adresse périmée affichée avec aplomb.
 */
export type ImageCourriel = {
  src: string;
  alt: string;
  largeur: number;
  hauteur: number;
  /** Distance du haut de l'image à la ligne de base, en pixels du rendu. */
  base: number;
  /** Corps utilisé au rendu : sert à ramener les mesures en `em`. */
  taille: number;
};

export function imageCourriel(adresse: string, langue: Langue): ImageCourriel | undefined {
  const nom = nomImageCourriel(adresse);
  const fichier = path.join(process.cwd(), "public", "brand", nom);
  const mesures = fichier.replace(/\.png$/, ".json");
  if (!existsSync(fichier) || !existsSync(mesures)) return undefined;

  const { largeur, hauteur, base, taille } = JSON.parse(readFileSync(mesures, "utf8"));
  return { src: `/brand/${nom}`, alt: epelerCourriel(adresse, langue), largeur, hauteur, base, taille };
}
