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

export type { Navigation };
