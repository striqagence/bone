import { Surtitre } from "@/components/ui/Surtitre";

/**
 * Section de synergie entre pôles (Figma « Frame 22 » de l'écran Compétences).
 *
 * Deux colonnes : l'affirmation à gauche, son explication à droite, suivie des
 * trois logotypes alignés et séparés par un filet. Les séparateurs ne
 * s'affichent qu'entre les logos, pas aux extrémités.
 *
 * Le filigrane est celui de la section « En bref » de l'accueil : la maquette
 * réemploie le même fichier, au même débord par la gauche.
 */
const logos = {
  expertise: "/brand/logo-expertise.svg",
  capital: "/brand/logo-capital.svg",
  feed: "/brand/logo-feed.svg",
} as const;

export function SectionSynergie({
  surtitre,
  titre,
  texte,
  poles,
}: {
  surtitre?: string | null;
  titre: string;
  texte: string;
  poles: (keyof typeof logos)[];
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
        <div className="flex flex-col items-start justify-center gap-2.5">
          {surtitre && <Surtitre>{surtitre}</Surtitre>}
          <h2 className="w-full titrage text-3xl font-bold leading-[1.4] text-primary-950 lg:text-5xl">
            {titre}
          </h2>
        </div>

        <div className="flex flex-col items-start justify-center gap-5">
          <p className="w-full text-lg leading-[1.5] text-primary-950">{texte}</p>

          <div className="flex flex-wrap items-center gap-6 lg:gap-10">
            {poles.map((pole, index) => (
              <div key={pole} className="flex items-center gap-6 lg:gap-10">
                {index > 0 && <span aria-hidden className="h-[50px] w-px bg-gris-300" />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logos[pole]}
                  alt={`Bone ${pole}`}
                  width={175.976}
                  height={50}
                  className="h-[38px] w-auto lg:h-[50px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
