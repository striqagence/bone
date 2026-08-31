"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { lien, type Langue } from "@/lib/i18n";
import type { Navigation as NavigationGlobal } from "@/lib/navigation";

import { NavLink } from "./NavLink";
import { SelecteurLangue } from "./SelecteurLangue";

/**
 * Navigation repliée, en dessous de 1280px.
 *
 * Aucune maquette mobile n'existe : le repli est déduit du desktop. Ce qui en
 * découle mécaniquement — les liens s'empilent, la barre ne garde que le
 * logotype — est repris tel quel. Trois points relèvent en revanche d'un choix,
 * à confirmer :
 *
 * 1. Le pictogramme d'ouverture est dessiné ici, faute d'équivalent dans le
 *    fichier Figma.
 * 2. Les pôles sont dépliés d'emblée sous « Nos compétences » plutôt que
 *    repliés derrière un second niveau : à trois entrées, un accordéon coûte un
 *    geste de plus pour ne rien gagner en hauteur.
 * 3. Le bouton d'audit, la langue et LinkedIn descendent dans le panneau. Les
 *    garder dans la barre ne tenait pas : logotype et bouton réunis dépassent
 *    déjà la largeur d'un téléphone.
 */
export function MenuMobile({
  langue,
  navigation,
}: {
  langue: Langue;
  navigation: NavigationGlobal;
}) {
  const [ouvert, setOuvert] = useState(false);
  const chemin = usePathname();

  // Le panneau reste monté d'une page à l'autre : sans cela il masquerait la
  // page qu'on vient d'ouvrir.
  useEffect(() => setOuvert(false), [chemin]);

  // Le panneau couvre l'écran : laisser la page défiler derrière donnerait
  // l'impression que le menu glisse tout seul.
  useEffect(() => {
    if (!ouvert) return;
    const precedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = precedent;
    };
  }, [ouvert]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
        aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
        className="flex size-11 items-center justify-center text-white"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          {ouvert ? (
            <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M5 5l14 14" />
              <path d="M19 5L5 19" />
            </g>
          ) : (
            <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </g>
          )}
        </svg>
      </button>

      {ouvert && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 flex flex-col gap-6 rounded bg-encre/95 p-6 pl-10 backdrop-blur-[5px]">
          <nav className="flex flex-col gap-5">
            {(navigation.liensPrincipaux ?? []).map(({ libelle, chemin: vers, avecDeroulant }) => (
              <div key={vers} className="flex flex-col gap-3">
                <NavLink chemin={vers} langue={langue}>
                  {libelle}
                </NavLink>
                {avecDeroulant && (
                  <div className="flex flex-col gap-3 border-l border-white/10 pl-4">
                    {(navigation.poles ?? []).map(({ titre, sousTitre, chemin: versPole }) => (
                      <Link key={versPole} href={lien(versPole, langue)} className="flex flex-col">
                        <span
                          className="font-display text-sm font-bold leading-[1.4] text-white"
                          style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 120' }}
                        >
                          {titre}
                        </span>
                        <span className="text-xs text-white/60">{sousTitre}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <a
              href={navigation.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/linkedin.svg" alt="" width={15.697} height={15} />
            </a>
            <span aria-hidden className="h-5 w-px bg-white" />
            <SelecteurLangue langue={langue} />
          </div>

          <Button
            href={lien(navigation.boutonEntete.chemin, langue)}
            taille="barre"
            flecheAvant={false}
            className="self-start"
          >
            {navigation.boutonEntete.libelle}
          </Button>
        </div>
      )}
    </div>
  );
}
