"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cheminSansLangue, lien, type Langue } from "@/lib/i18n";
import type { NavigationEntete } from "@/lib/navigation";

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
 * Sur les pages dont le hero porte une photo en pleine largeur, la barre au
 * repos est posée par-dessus et sort du flux : le hero occupe donc bien toute
 * la hauteur prévue, image comprise, et la barre défile avec lui. Dès les
 * premiers pixels de défilement elle cède la place à la barre compacte, fixée
 * en haut — sans quoi la navigation deviendrait inatteignable sur une page de
 * 10 000px.
 *
 * Ces pages sont l'accueil et les trois pôles. La liste n'est pas écrite ici :
 * elle se déduit des chemins de pôle du global de navigation, les seules pages
 * à porter ce hero. Renommer un pôle au back-office n'a donc rien à casser.
 *
 * Les deux ne reçoivent pas le même état. L'accueil garde ses trois blocs
 * flottants ; les pôles montrent la barre pleine, logotype réduit à l'intérieur
 * de la pastille, simplement posée sur leur photo au lieu de la surmonter.
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
  navigation: NavigationEntete;
}) {
  const chemin = cheminSansLangue(usePathname());
  const surAccueil = chemin === "/";
  const surPole = (navigation.poles ?? []).some((pole) => pole.chemin === chemin);
  /** Pages dont le hero porte une photo pleine largeur : la barre s'y pose dessus. */
  const surHeroImage = surAccueil || surPole;
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    if (!surHeroImage) return;
    const surDefilement = () => setDefile(window.scrollY > 40);
    surDefilement(); // au rechargement, la page peut déjà être défilée
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, [surHeroImage]);

  /**
   * L'état déployé, logotype nu sur la photo et pastilles séparées, n'existe
   * que sur l'accueil. Les pages de pôle montrent la barre pleine, logotype
   * réduit compris, mais posée sur leur image.
   */
  const compact = !surAccueil || defile;

  /**
   * Hors du flux tant que la barre se pose sur une photo : en absolu au repos,
   * pour qu'elle défile avec le hero, puis fixée dès les premiers pixels sans
   * quoi la navigation deviendrait inatteignable.
   */
  const position = defile
    ? "fixed inset-x-0 top-0"
    : surHeroImage
      ? "absolute inset-x-0 top-0"
      : "sticky top-0";

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
    <Link href={lien("/", langue)} aria-label="BONE IT, accueil">
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
      <header
        className={`z-50 flex h-[86px] w-full items-center justify-center px-4 py-4 xl:h-[114px] xl:py-5 ${position}`}
      >
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
    <header className="absolute inset-x-0 top-0 z-50 flex w-full justify-center px-4 pt-8 xl:px-28">
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
