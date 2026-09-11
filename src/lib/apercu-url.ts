/**
 * Adresse du bouton d'aperçu du back-office.
 *
 * Ce module ne dépend de rien : les configurations de collections et de
 * globaux l'importent, et tout ce qui appelle Payload y créerait un cycle.
 * La résolution du chemin réel revient à la route `/apercu`, qui, elle, peut
 * interroger la base.
 */
type Cible = { collection: string; id: string | number } | { global: string };

export function urlApercu(cible: Cible, langue?: string): string {
  const parametres = new URLSearchParams(
    "global" in cible ? { global: cible.global } : { collection: cible.collection, id: String(cible.id) },
  );
  if (langue) parametres.set("langue", langue);
  return `/apercu?${parametres}`;
}
