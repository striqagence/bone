"use client";

import { useState } from "react";

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
 */
export function Navigation({
  langue,
  liens,
  poles,
}: {
  langue: Langue;
  liens: NonNullable<NavigationGlobal["liensPrincipaux"]>;
  poles: NonNullable<NavigationGlobal["poles"]>;
}) {
  const [ouvert, setOuvert] = useState(false);

  return (
    <nav
      className="flex h-11 items-center justify-center gap-9 px-6 py-3"
      onMouseLeave={() => setOuvert(false)}
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
          onMouseEnter={() => setOuvert(Boolean(avecDeroulant))}
          onFocus={() => setOuvert(Boolean(avecDeroulant))}
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
        <div className="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2">
          <MenuDeroulant langue={langue} poles={poles} />
        </div>
      )}
    </nav>
  );
}
