import "server-only";

import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Y a-t-il quelqu'un de connecté au back-office ?
 *
 * Sert aux pages de travail que l'équipe consulte mais que le public n'a pas à
 * voir. À la différence de `contexteApercu`, la question ne dépend pas du mode
 * brouillon : la page est réservée en toutes circonstances.
 *
 * L'appel échoue silencieusement plutôt que de casser la page : une panne
 * d'authentification doit refuser l'accès, jamais l'ouvrir.
 */
export async function estConnecte(): Promise<boolean> {
  try {
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: await headers() });
    return Boolean(user);
  } catch {
    return false;
  }
}
