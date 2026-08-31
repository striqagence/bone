import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Surtitre } from "@/components/ui/Surtitre";
import { lien, type Langue } from "@/lib/i18n";

/**
 * Hero de la page d'accueil (Figma « Frame 39 »).
 *
 * Le titre alterne deux intensités de blanc, une par membre de phrase : le
 * verbe à pleine opacité, son complément à 50 %. C'est porté par le contenu et
 * non par la mise en page — d'où deux couples de champs plutôt qu'un texte
 * unique où il faudrait deviner la césure.
 *
 * Le hero occupe toute la hauteur de la fenêtre. La maquette le fixe à 1080px,
 * ce qui laisserait une bande vide sur un écran plus haut et couperait le titre
 * sur un portable ; `min-h-screen` respecte l'intention en s'y adaptant.
 *
 * Le filigrane BONE déborde volontairement en bas à droite, comme au pied de
 * page. Il est masqué en dessous de 1024px, où il recouvrirait le titre.
 */
export function HeroAccueil({
  langue,
  surtitre,
  titre,
  chapo,
  cta,
  image,
}: {
  langue: Langue;
  surtitre: string;
  titre: { verbe: string; complement: string }[];
  chapo: string;
  cta: { libelle: string; chemin: string };
  image?: { src: string; alt: string };
}) {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-end overflow-hidden px-6 pb-20 pt-8 lg:px-28 lg:pb-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-encre">
        {image && (
          <Image src={image.src} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        {/* Voile de la maquette : un dégradé oblique posé en fusion « multiply »,
            qui assombrit la photo sans la teinter uniformément. */}
        <div className="absolute inset-0 mix-blend-multiply bg-[linear-gradient(73.03deg,rgb(0_0_34/0.4)_1.93%,rgb(19_19_83/0.4)_100%)]" />
      </div>

      <div className="relative flex w-full max-w-[1600px] flex-col items-start gap-10 lg:h-[676px] lg:flex-row lg:items-end lg:gap-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/filigrane-accueil.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-[233px] -right-[254px] hidden w-[818.871px] max-w-none lg:block"
        />

        <div className="flex w-full flex-1 flex-col items-start justify-end gap-5">
          <Surtitre couleur="blanc">{surtitre}</Surtitre>
          <h1
            className="titrage text-4xl font-bold leading-[1.2] text-white lg:text-7xl"
          >
            {titre.map(({ verbe, complement }) => (
              <span key={verbe} className="block">
                {verbe} <span className="text-white/50">{complement}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="flex w-full flex-col items-start gap-10 lg:h-full lg:w-[367px] lg:items-end lg:justify-between">
          <p className="text-lg leading-[1.5] text-white lg:text-xl">{chapo}</p>
          <Button
            href={lien(cta.chemin, langue)}
            variante="secondary"
            flecheAvant={false}
          >
            {cta.libelle}
          </Button>
        </div>
      </div>
    </section>
  );
}
