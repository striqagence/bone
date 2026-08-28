import Link from "next/link";

import { Button } from "@/components/ui/Button";

/**
 * En-tête du site (Figma « Menu sticky »).
 *
 * La barre flotte au-dessus du contenu : fond encre à 80 % et flou d'arrière-
 * plan, dans un conteneur de 1648px centré, lui-même dans une bande de 114px.
 *
 * Les SVG sont servis en `<img>` et non via next/image : ce sont des vectoriels
 * à dimensions fixes, que l'optimiseur ne peut ni redimensionner utilement ni
 * convertir, et qui exigeraient en prime d'ouvrir `dangerouslyAllowSVG`.
 */
const liens = [
  { libelle: "Nos compétences", href: "/competences" },
  { libelle: "Notre approche", href: "/notre-approche" },
  { libelle: "Blog", href: "/blog" },
  { libelle: "À propos", href: "/a-propos" },
  { libelle: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-[114px] w-full items-center justify-center px-4 py-5">
      <div className="flex w-full max-w-[1648px] items-center justify-between rounded bg-encre/80 px-6 py-3.5 backdrop-blur-[5px]">
        <Link href="/" aria-label="BONE IT — accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/bone-logotype.svg" alt="BONE IT" width={141} height={40} />
        </Link>

        <nav className="flex h-11 items-center justify-center gap-9 px-6 py-3">
          {liens.map(({ libelle, href }) => (
            <Link
              key={href}
              href={href}
              className="text-base whitespace-nowrap text-white transition-opacity hover:opacity-70"
            >
              {libelle}
            </Link>
          ))}
        </nav>

        <div className="flex h-[45px] items-center gap-5">
          <div className="flex h-11 items-center justify-center gap-4 rounded py-3 pl-6 pr-4">
            <a
              href="https://www.linkedin.com"
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

            <button
              type="button"
              className="flex items-center gap-0.5 font-display text-sm font-bold text-white"
              style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 120' }}
            >
              Fr
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/chevron-bas.svg" alt="" width={8} height={4.29289} className="ml-1" />
            </button>
          </div>

          <Button href="/contact" taille="barre" flecheAvant={false}>
            Demander un audit
          </Button>
        </div>
      </div>
    </header>
  );
}
