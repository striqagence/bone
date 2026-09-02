"use client";

import { useEffect, useRef, useState } from "react";

import { type Langue } from "@/lib/i18n";
import type { Navigation as NavigationGlobal } from "@/lib/navigation";

import { MenuDeroulant } from "./MenuDeroulant";
import { NavLink } from "./NavLink";

/**
 * Navigation principale, avec le déroulant des pôles.
 *
 * Le panneau mesure 781px là où l'entrée de menu en fait moins de 150 : il ne
 * peut pas être aligné sur elle. Aucune maquette ne le montre posé dans une
 * page — il n'existe qu'à l'état de composant isolé — je le centre donc sous la
 * barre, ce qui est le placement le plus neutre.
 *
 * L'ouverture répond au survol et au focus clavier, et Échap referme : au
 * survol seul, l'entrée serait inatteignable sans souris.
 *
 * La fermeture est retardée d'un cinquième de seconde. Entre l'entrée de menu
 * et le panneau court une bande que ni l'une ni l'autre n'occupe : la barre y
 * pose sa marge basse, et le panneau son décalage. En fermant au premier
 * mouvement sortant, le menu disparaissait sous le curseur qui le visait. Le
 * délai laisse le temps de traverser, et toute entrée dans l'entrée de menu ou
 * dans le panneau l'annule.
 */
const DELAI_FERMETURE = 200;

export function Navigation({
  langue,
  liens,
  poles,
  className = "h-11 px-6 py-3",
}: {
  langue: Langue;
  liens: NonNullable<NavigationGlobal["liensPrincipaux"]>;
  poles: NonNullable<NavigationGlobal["poles"]>;
  /** L'état au repos enveloppe la navigation dans une pastille qui porte déjà
      ses marges : elles sont donc pilotées par l'appelant. */
  className?: string;
}) {
  const [ouvert, setOuvert] = useState(false);
  const minuterie = useRef<number | null>(null);

  const annulerFermeture = () => {
    if (minuterie.current === null) return;
    clearTimeout(minuterie.current);
    minuterie.current = null;
  };

  const fermerBientot = () => {
    annulerFermeture();
    minuterie.current = window.setTimeout(() => setOuvert(false), DELAI_FERMETURE);
  };

  const ouvrir = (avecDeroulant: boolean) => {
    annulerFermeture();
    setOuvert(avecDeroulant);
  };

  useEffect(() => annulerFermeture, []);

  return (
    <nav
      className={`flex items-center justify-center gap-9 ${className}`}
      onMouseLeave={fermerBientot}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOuvert(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOuvert(false);
      }}
    >
      {liens.map(({ libelle, chemin, avecDeroulant }) => (
        <span
          key={chemin}
          onMouseEnter={() => ouvrir(Boolean(avecDeroulant))}
          onFocus={() => ouvrir(Boolean(avecDeroulant))}
        >
          <NavLink
            chemin={chemin}
            langue={langue}
            aria-expanded={avecDeroulant ? ouvert : undefined}
          >
            {libelle}
          </NavLink>
        </span>
      ))}

      {ouvert && (
        <div
          className="absolute left-1/2 top-full z-10 -translate-x-1/2 pt-2"
          onMouseEnter={annulerFermeture}
          onMouseLeave={fermerBientot}
        >
          <MenuDeroulant langue={langue} poles={poles} />
        </div>
      )}
    </nav>
  );
}
