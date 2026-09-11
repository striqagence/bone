import "server-only";

import { draftMode, headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Contexte d'aperçu d'une requête.
 *
 * Deux conditions doivent être réunies pour voir un brouillon : le mode
 * brouillon de Next, posé par la route `/apercu`, et un utilisateur Payload
 * connecté. Le cookie seul ne suffit pas — il vit dans le navigateur et
 * survivrait à une déconnexion.
 *
 * L'utilisateur est renvoyé pour être passé au local API : l'accès en lecture
 * des collections à brouillons le reconnaît et lève le filtre qui les cache.
 *
 * En dehors d'un aperçu, la fonction ne coûte que la lecture d'un cookie :
 * l'authentification n'est tentée que si le mode brouillon est actif.
 */
export type ContexteApercu = {
  /** À passer tel quel aux requêtes `find` et `findByID`. */
  draft: boolean;
  user: Awaited<ReturnType<Awaited<ReturnType<typeof getPayload>>["auth"]>>["user"] | undefined;
};

const HORS_APERCU: ContexteApercu = { draft: false, user: undefined };

export async function contexteApercu(): Promise<ContexteApercu> {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return HORS_APERCU;

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });
  return user ? { draft: true, user } : HORS_APERCU;
}
