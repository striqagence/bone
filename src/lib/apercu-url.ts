/**
 * Adresse du bouton d'aperçu du back-office.
 *
 * Ce module ne dépend de rien : les configurations de collections et de
 * globaux l'importent, et tout ce qui appelle Payload y créerait un cycle.
 * La résolution du chemin réel revient à la route `/apercu`, qui, elle, peut
 * interroger la base.
 */
type Cible = { collection: string; id: string | number } | { global: string };

/**
 * La langue arrive sous deux formes selon l'appelant : une chaîne pour le
 * bouton d'aperçu, un objet de locale pour le panneau côte à côte.
 */
type Langue = string | { code?: string } | null | undefined;

export function urlApercu(cible: Cible, langue?: Langue): string {
  const parametres = new URLSearchParams(
    "global" in cible ? { global: cible.global } : { collection: cible.collection, id: String(cible.id) },
  );
  const code = typeof langue === "string" ? langue : langue?.code;
  if (code) parametres.set("langue", code);
  return `/apercu?${parametres}`;
}

/**
 * Tailles proposées par l'aperçu côte à côte.
 *
 * Ce sont les largeurs sur lesquelles le site a été réglé, pas des tailles
 * d'appareils du commerce : un rédacteur doit pouvoir vérifier ce qu'on a
 * corrigé, notamment la tablette en paysage, où plusieurs blocs basculent.
 */
export const TAILLES_APERCU = [
  { label: "Téléphone", name: "telephone", width: 390, height: 844 },
  { label: "Tablette", name: "tablette", width: 768, height: 1024 },
  { label: "Tablette paysage", name: "tablettePaysage", width: 1024, height: 768 },
  { label: "Ordinateur", name: "ordinateur", width: 1440, height: 900 },
];
