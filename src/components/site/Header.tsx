"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cheminSansLangue, lien, type Langue } from "@/lib/i18n";
import type { Navigation as NavigationGlobal } from "@/lib/navigation";

import { MenuMobile } from "./MenuMobile";
import { Navigation } from "./Navigation";
import { SelecteurLangue } from "./SelecteurLangue";

/**
 * En-tête du site, en deux états (Figma « Frame 39 » et « Menu sticky »).
 *
 * Au repos, par-dessus le hero de l'accueil : trois blocs flottants distincts
 * — logotype nu sur la photo, pastille de navigation, pastille langue puis
 * bouton — sans flou d'arrière-plan.
 *
 * Une fois la page défilée : une barre unique, plus basse, à fond plus opaque
 * et floutée, logotype réduit. C'est l'état permanent des pages internes, dont
 * le hero est clair : un logotype blanc y serait illisible.
 *
 * La barre reste collée en haut dans les deux états. La maquette laisse celui
 * du repos défiler avec le hero, mais la navigation deviendrait alors
 * inatteignable sur une page de 10 000px sans remonter tout en haut.
 *
 * Les SVG sont servis en `<img>` et non via next/image : ce sont des vectoriels
 * à dimensions fixes, que l'optimiseur ne peut ni redimensionner utilement ni
 * convertir, et qui exigeraient en prime d'ouvrir `dangerouslyAllowSVG`.
 */
export function Header({
  langue,
  navigation,
}: {
  langue: Langue;
  navigation: NavigationGlobal;
}) {
  const surAccueil = cheminSansLangue(usePathname()) === "/";
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    if (!surAccueil) return;
    const surDefilement = () => setDefile(window.scrollY > 40);
    surDefilement(); // au rechargement, la page peut déjà être défilée
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, [surAccueil]);

  const compact = !surAccueil || defile;

  const linkedin = (
    <a href={navigation.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/linkedin.svg" alt="" width={15.697} height={15} />
    </a>
  );

  /* Filet de séparation : 1 × 20px blanc dans la maquette. Rendu en CSS plutôt
     qu'en SVG — un trait droit n'a rien d'un glyphe. */
  const filet = <span aria-hidden className="h-5 w-px bg-white" />;

  const logotype = (
    <Link href={lien("/", langue)} aria-label="BONE IT — accueil">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/bone-logotype.svg"
        alt="BONE IT"
        width={141}
        height={40}
        className={compact ? "w-[106px] xl:w-[141px]" : "w-[150px] xl:w-[211px]"}
      />
    </Link>
  );

  const navigationComplete = (marges?: string) => (
    <Navigation
      langue={langue}
      liens={navigation.liensPrincipaux ?? []}
      poles={navigation.poles ?? []}
      className={marges}
    />
  );

  if (compact) {
    return (
      <header className="sticky top-0 z-50 flex h-[86px] w-full items-center justify-center px-4 py-4 xl:h-[114px] xl:py-5">
        <div className="relative flex w-full max-w-[1648px] items-center justify-between rounded bg-encre/80 px-4 py-3 backdrop-blur-[5px] xl:px-6 xl:py-3.5">
          {logotype}

          <div className="hidden xl:block">{navigationComplete()}</div>

          <div className="hidden h-[45px] items-center gap-5 xl:flex">
            <div className="flex h-11 items-center justify-center gap-4 rounded py-3 pl-6 pr-4">
              {linkedin}
              {filet}
              <SelecteurLangue langue={langue} />
            </div>

            <Button
              href={lien(navigation.boutonEntete.chemin, langue)}
              taille="barre"
              flecheAvant={false}
            >
              {navigation.boutonEntete.libelle}
            </Button>
          </div>

          <MenuMobile langue={langue} navigation={navigation} />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 flex w-full justify-center px-4 pt-8 xl:px-28">
      <div className="relative flex w-full max-w-[1600px] items-center justify-between py-5">
        {logotype}

        <div className="relative hidden h-[60px] items-center justify-center rounded bg-encre/70 px-8 py-5 xl:flex">
          {navigationComplete("h-full")}
        </div>

        <div className="hidden items-center gap-5 xl:flex">
          <div className="flex h-[60px] items-center justify-center gap-4 rounded bg-encre/70 py-3 pl-7 pr-5">
            {linkedin}
            {filet}
            <SelecteurLangue langue={langue} />
          </div>

          <Button href={lien(navigation.boutonEntete.chemin, langue)} flecheAvant={false}>
            {navigation.boutonEntete.libelle}
          </Button>
        </div>

        <MenuMobile langue={langue} navigation={navigation} />
      </div>
    </header>
  );
}
