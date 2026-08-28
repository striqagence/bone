import { revalidatePath } from "next/cache";

/**
 * Rafraîchit le cache statique du site après une modification en back-office,
 * pour que les changements soient visibles en quelques secondes sans
 * redéploiement.
 *
 * `revalidatePath("/", "layout")` invalide toutes les pages qui partagent le
 * layout racine (donc tout le site public) — simple et fiable pour un site de
 * cette taille : la régénération se fait à la prochaine visite.
 *
 * Enveloppé dans un try/catch : hors contexte de requête Next (scripts,
 * migrations, seed), `revalidatePath` n'est pas disponible — on ignore alors
 * silencieusement pour ne pas casser ces opérations.
 */
export function revaliderSite(): void {
  try {
    revalidatePath("/", "layout");
  } catch {
    /* Hors contexte de requête : sans effet. */
  }
}
