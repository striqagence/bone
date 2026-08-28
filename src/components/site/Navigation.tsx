"use client";

import { useState } from "react";

import { MenuDeroulant } from "./MenuDeroulant";
import { NavLink } from "./NavLink";

/**
 * Navigation principale, avec le déroulant des compétences.
 *
 * Le panneau mesure 781px là où l'entrée de menu en fait moins de 150 : il ne
 * peut pas être aligné sur elle. Aucune maquette ne le montre posé dans une
 * page — il n'existe qu'à l'état de composant isolé — je le centre donc sous la
 * barre, ce qui est le placement le plus neutre. À revoir si la maquette
 * tranche autrement.
 *
 * L'ouverture répond au survol et au focus clavier, et Échap referme : au
 * survol seul, l'entrée « Nos compétences » serait inatteignable sans souris.
 */
const liens = [
  { libelle: "Nos compétences", href: "/competences", deroulant: true },
  { libelle: "Notre approche", href: "/notre-approche", deroulant: false },
  { libelle: "Blog", href: "/blog", deroulant: false },
  { libelle: "À propos", href: "/a-propos", deroulant: false },
  { libelle: "Contact", href: "/contact", deroulant: false },
];

export function Navigation() {
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
      {liens.map(({ libelle, href, deroulant }) => (
        <span
          key={href}
          onMouseEnter={() => setOuvert(deroulant)}
          onFocus={() => setOuvert(deroulant)}
        >
          <NavLink href={href} aria-expanded={deroulant ? ouvert : undefined}>
            {libelle}
          </NavLink>
        </span>
      ))}

      {ouvert && (
        <div className="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2">
          <MenuDeroulant />
        </div>
      )}
    </nav>
  );
}
