import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { lien, type Langue } from "@/lib/i18n";
import type { Navigation as NavigationGlobal } from "@/lib/navigation";

import { MenuMobile } from "./MenuMobile";
import { Navigation } from "./Navigation";
import { SelecteurLangue } from "./SelecteurLangue";

/**
 * En-tête du site (Figma « Menu sticky »).
 *
 * La barre flotte au-dessus du contenu : fond encre à 80 % et flou d'arrière-
 * plan, dans un conteneur de 1648px centré, lui-même dans une bande de 114px.
 *
 * En dessous de 1280px la navigation se replie (cf. MenuMobile) : les cinq
 * entrées, le sélecteur de langue et le bouton d'audit réunis demandent près de
 * 1200px, et le déroulant des pôles en fait 781 à lui seul.
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
  return (
    <header className="sticky top-0 z-50 flex h-[86px] w-full items-center justify-center px-4 py-4 xl:h-[114px] xl:py-5">
      <div className="relative flex w-full max-w-[1648px] items-center justify-between rounded bg-encre/80 px-4 py-3 backdrop-blur-[5px] xl:px-6 xl:py-3.5">
        <Link href={lien("/", langue)} aria-label="BONE IT — accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/bone-logotype.svg"
            alt="BONE IT"
            width={141}
            height={40}
            className="w-[106px] xl:w-[141px]"
          />
        </Link>

        <div className="hidden xl:block">
          <Navigation
            langue={langue}
            liens={navigation.liensPrincipaux ?? []}
            poles={navigation.poles ?? []}
          />
        </div>

        <div className="hidden h-[45px] items-center gap-5 xl:flex">
          <div className="flex h-11 items-center justify-center gap-4 rounded py-3 pl-6 pr-4">
            <a
              href={navigation.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/linkedin.svg" alt="" width={15.697} height={15} />
            </a>

            {/* Filet de séparation : 1 × 20px blanc dans la maquette. Rendu en
                CSS plutôt qu'en SVG — un trait droit n'a rien d'un glyphe. */}
            <span aria-hidden className="h-5 w-px bg-white" />

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
