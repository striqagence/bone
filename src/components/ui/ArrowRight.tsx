/**
 * Flèche du design system (« arrow-right-02-round »).
 *
 * Le tracé est celui exporté de Figma, où l'icône pointe vers le bas : la
 * rotation est reprise telle quelle depuis la maquette plutôt que de redessiner
 * le chemin, pour que la géométrie reste rigoureusement identique. La boîte est
 * donc transposée (14.83 × 9.83) et le groupe pivoté puis miroité.
 *
 * Les deux dimensions sont posées explicitement. La maquette place un glyphe de
 * 14.83 × 9.83 — stroke compris — centré dans une boîte de 20 × 20 : laisser le
 * SVG remplir la boîte le ferait letterboxer et l'afficherait 1,5 fois trop
 * petit en hauteur.
 *
 * Le trait passe en `currentColor` : Figma exporte une variante par couleur
 * (blanc, #000022), alors que le glyphe est strictement le même.
 *
 * La flèche avance de deux pixels quand on survole le bouton ou la carte qui la
 * porte : c'est le seul mouvement du bouton, le reste étant affaire de couleur.
 */
export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex size-5 shrink-0 items-center justify-center transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 ${className}`}
    >
      <svg
        width="14.8334"
        height="9.83333"
        viewBox="0 0 14.8334 9.83333"
        fill="none"
        aria-hidden
      >
        <g
          transform="rotate(-90) scale(-1, 1)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.91647 14.0833L4.91647 0.75" />
          <path d="M9.08333 9.91677L4.91663 14.0834L0.75 9.91674" />
        </g>
      </svg>
    </span>
  );
}
