import Image from "next/image";

import { Surtitre } from "@/components/ui/Surtitre";
import { FlecheRenvoi } from "@/components/ui/icones";
import { PictoAntenne, PictoBalance, PictoBoussole, PictoSecurite } from "@/components/ui/pictos";

/**
 * Section « À qui s'adresse Bone » de l'accueil (Figma « Container »).
 *
 * Quatre profils sur une grille bord à bord, dont les fonds s'assombrissent de
 * proche en proche — du bleu de marque au marine — dans l'ordre de lecture.
 * Cette progression est portée par la position et non par le contenu : le
 * back-office n'a donc pas à la saisir.
 *
 * Le titre alterne deux intensités, l'énoncé en retrait et sa résolution à
 * pleine opacité — l'inverse du hero, où c'est le verbe qui est appuyé.
 */
const fonds = ["bg-primary-600", "bg-primary-800", "bg-primary-900", "bg-primary-950"];

const pictos = {
  antenne: PictoAntenne,
  securite: PictoSecurite,
  balance: PictoBalance,
  boussole: PictoBoussole,
} as const;

export function SectionProfils({
  surtitre,
  titreHaut,
  titreBas,
  profils,
}: {
  surtitre: string;
  titreHaut: string;
  titreBas: string;
  profils: {
    picto: keyof typeof pictos;
    titre: string;
    description: string;
    reponse: string;
    image?: { src: string; alt: string };
  }[];
}) {
  return (
    <section className="flex w-full flex-col items-center bg-primary-50 pt-16 lg:pt-32">
      <div className="flex w-full max-w-[1600px] flex-col items-center justify-center gap-2.5 px-6 pb-8 lg:px-28 lg:pb-12">
        <Surtitre>{surtitre}</Surtitre>
        <h2 className="w-full titrage text-center text-3xl font-bold leading-[1.2] lg:text-7xl">
          <span className="text-primary-950/50">{titreHaut}</span>{" "}
          <span className="block text-primary-950">{titreBas}</span>
        </h2>
      </div>

      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        {profils.map((profil, index) => (
          <div
            key={profil.titre}
            className={`flex flex-col items-start gap-8 p-8 shadow-[10px_10px_0_0_var(--color-encre)] lg:min-h-[450px] lg:flex-row lg:items-center lg:p-14 ${fonds[index % fonds.length]}`}
          >
            <div className="relative size-[250px] max-w-full shrink-0 overflow-hidden rounded bg-primary-950">
              {profil.image && (
                <Image
                  src={profil.image.src}
                  alt={profil.image.alt}
                  fill
                  sizes="250px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex min-w-px flex-1 flex-col items-start gap-3.5">
              {(() => {
                const Picto = pictos[profil.picto];
                return (
                  <span className="text-primary-50">
                    <Picto />
                  </span>
                );
              })()}
              <p className="w-full titrage text-2xl font-bold leading-[1.4] text-white lg:text-3xl">
                {profil.titre}
              </p>
              <p className="w-full text-base leading-[1.5] text-white opacity-80">
                {profil.description}
              </p>
              <div className="flex w-full items-start gap-2.5 text-primary-50">
                <FlecheRenvoi />
                <span className="flex-1 text-base leading-[1.5] text-white opacity-80">
                  {profil.reponse}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
