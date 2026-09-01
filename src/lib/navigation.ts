import { getPayload } from "payload";
import config from "@payload-config";

import type { Navigation } from "@/payload-types";

import type { Langue } from "./i18n";

/**
 * Libellés de navigation, dans la langue demandée.
 *
 * `depth: 0` : le global ne contient que du texte et des chemins, aucune
 * relation à résoudre.
 */
export async function chargerNavigation(langue: Langue): Promise<Navigation> {
  const payload = await getPayload({ config });
  return payload.findGlobal({ slug: "navigation", locale: langue, depth: 0 });
}

/**
 * Ce que l'en-tête reçoit, adresse de courriel exclue.
 *
 * L'en-tête est un composant client : tout ce qu'on lui passe est sérialisé
 * dans la page servie, y compris ce dont il ne se sert pas. Lui donner le
 * global entier y écrivait l'adresse en clair sur chaque page, et ruinait la
 * peine prise à la dérober ailleurs.
 */
export type NavigationEntete = Omit<Navigation, "contact"> & {
  contact: Omit<Navigation["contact"], "email">;
};

/** Le même global, débarrassé de l'adresse, pour l'en-tête. */
export function pourEntete(navigation: Navigation): NavigationEntete {
  const { email: _email, ...contact } = navigation.contact;
  return { ...navigation, contact };
}

export type { Navigation };
