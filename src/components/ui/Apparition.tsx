/**
 * Révèle son contenu quand il entre dans la fenêtre.
 *
 * L'animation est portée par la feuille de style seule, accrochée à la
 * progression du défilement. Aucun JavaScript n'intervient, et c'est le point
 * important : un observateur en JavaScript aurait fait dépendre la visibilité
 * du contenu de la bonne exécution d'un script. Ici, le pire qui puisse
 * arriver est que l'animation ne joue pas — les navigateurs qui ignorent
 * `animation-timeline` affichent simplement les sections, sans mouvement.
 *
 * L'enveloppe est un bloc pleine largeur, posé autour d'une section qui l'est
 * déjà : la mise en page n'en est pas changée.
 */
export function Apparition({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`apparition ${className}`}>{children}</div>;
}
