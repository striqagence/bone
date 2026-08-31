import { Button } from "@/components/ui/Button";
import { Surtitre } from "@/components/ui/Surtitre";
import { lien, type Langue } from "@/lib/i18n";

/**
 * Appel à l'action de fin d'accueil (Figma « Logo »).
 *
 * Le filigrane reprend la géométrie de celui de la section chiffres, en contour
 * plutôt qu'en aplat : deux fichiers distincts, la maquette n'en dérivant pas
 * l'un de l'autre.
 */
export function SectionAppel({
  langue,
  surtitre,
  titre,
  chapo,
  cta,
}: {
  langue: Langue;
  surtitre: string;
  titre: string;
  chapo: string;
  cta: { libelle: string; chemin: string };
}) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-gradient-to-r from-primary-600 to-primary-950 px-6 py-12 lg:px-28 lg:py-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/filigrane-cta.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-[90px] right-[60px] hidden w-[460.14px] max-w-none lg:block"
      />

      <div className="relative flex w-full max-w-[1600px] flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-20">
        <div className="flex flex-1 flex-col items-start justify-center gap-2.5">
          <Surtitre couleur="blanc">{surtitre}</Surtitre>
          <h2 className="w-full titrage text-2xl font-bold leading-[1.4] text-white lg:text-4xl">
            {titre}
          </h2>
          <p className="w-full text-lg leading-[1.5] text-white/80 lg:text-xl">{chapo}</p>
        </div>

        <Button href={lien(cta.chemin, langue)} flecheAvant={false}>
          {cta.libelle}
        </Button>
      </div>
    </section>
  );
}
