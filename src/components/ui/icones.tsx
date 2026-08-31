/**
 * Icônes du fil d'ariane, tracés exportés de Figma.
 *
 * Le fichier en fournit une copie par couleur : blanc à 50 % sur fond sombre,
 * `#8B8BA4` sur fond clair. Les chemins étant strictement identiques, le trait
 * passe en `currentColor` et la couleur est portée par le parent.
 *
 * Chaque glyphe est plus petit que sa boîte dans la maquette — 12,67 dans 14
 * pour la maison, 4,25 × 7,5 dans 13 pour le chevron — d'où la boîte de
 * centrage et les dimensions explicites : le laisser remplir sa boîte le
 * déformerait.
 */
export function IconeAccueil() {
  return (
    <span className="inline-flex size-[14px] shrink-0 items-center justify-center">
      <svg width="12.6667" height="12.6667" viewBox="0 0 12.6667 12.6667" fill="none" aria-hidden>
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.33334 9.83333L6.33334 8.08333" />
          <path d="M0.704981 7.04118C0.499052 5.70114 0.396088 5.03112 0.649432 4.43714C0.902776 3.84315 1.46485 3.43675 2.589 2.62395L3.42891 2.01667C4.82734 1.00556 5.52655 0.5 6.33334 0.5C7.14012 0.5 7.83933 1.00556 9.23776 2.01667L10.0777 2.62395C11.2018 3.43675 11.7639 3.84315 12.0172 4.43714C12.2706 5.03112 12.1676 5.70114 11.9617 7.04118L11.7861 8.18389C11.4942 10.0835 11.3482 11.0334 10.6669 11.6C9.98564 12.1667 8.98964 12.1667 6.99764 12.1667H5.66903C3.67703 12.1667 2.68103 12.1667 1.99975 11.6C1.31847 11.0334 1.17251 10.0835 0.880585 8.18389L0.704981 7.04118Z" />
        </g>
      </svg>
    </span>
  );
}

export function ChevronDroite() {
  return (
    <span className="inline-flex size-[13px] shrink-0 items-center justify-center">
      <svg width="4.25003" height="7.50007" viewBox="0 0 4.25003 7.50007" fill="none" aria-hidden>
        <path
          d="M0.500058 0.500033C0.500058 0.500033 3.75003 2.89362 3.75003 3.75006C3.75004 4.6065 0.500033 7.00003 0.500033 7.00003"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
