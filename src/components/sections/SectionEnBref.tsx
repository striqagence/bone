import { Button } from "@/components/ui/Button";
import { Surtitre } from "@/components/ui/Surtitre";
import { lien, type Langue } from "@/lib/i18n";

/**
 * Section « En bref » de l'accueil (Figma « Frame 22 »).
 *
 * Deux colonnes : le titre à gauche, le propos et son bouton à droite. Le
 * second paragraphe est volontairement atténué — c'est une précision, pas une
 * suite du premier.
 *
 * Le filigrane déborde par la gauche. La maquette l'ancre par la droite, à
 * 1397px du bord dans un cadre de 1920 : ancré ainsi, il se déplacerait à
 * chaque largeur d'écran. Il est donc ancré à gauche, là où il déborde.
 */
export function SectionEnBref({
  langue,
  surtitre,
  titre,
  propos,
  precision,
  cta,
}: {
  langue: Langue;
  surtitre: string;
  titre: string;
  propos: string;
  precision: string;
  cta: { libelle: string; chemin: string };
}) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-white px-6 py-16 lg:px-28 lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/filigrane-enbref.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-[110px] top-10 hidden w-[633px] max-w-none lg:block"
      />

      <div className="relative grid w-full max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-20">
        <div className="flex flex-col items-start justify-center gap-2.5 self-start">
          <Surtitre>{surtitre}</Surtitre>
          <h2
            className="w-full font-display text-3xl font-bold leading-[1.4] text-primary-950 lg:text-5xl"
            style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 120' }}
          >
            {titre}
          </h2>
        </div>

        <div className="flex flex-col items-start justify-center gap-5">
          <p className="w-full text-lg font-medium leading-[1.5] text-primary-950">{propos}</p>
          <p className="w-full text-lg leading-[1.5] text-primary-950 opacity-60">{precision}</p>
          <Button href={lien(cta.chemin, langue)} variante="tertiaire" flecheAvant={false}>
            {cta.libelle}
          </Button>
        </div>
      </div>
    </section>
  );
}
