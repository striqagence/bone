import Image from "next/image";

import { Surtitre } from "@/components/ui/Surtitre";
import { FlecheRenvoi } from "@/components/ui/icones";

type Photo = { src: string; alt: string };

/**
 * Section « Le constat » de l'accueil (Figma « Frame 25 »).
 *
 * Deux blocs symétriques : une photo, et une carte qui la chevauche par la
 * droite. La seconde paire est décalée vers le bas, ce qui produit l'escalier
 * de la maquette.
 *
 * Le chevauchement est obtenu en positionnant la carte en absolu par-dessus la
 * photo, comme dans la maquette. Il tombe en dessous de 1024px, où superposer
 * une carte de 400px sur une photo la rendrait illisible : les deux s'empilent.
 */
export function SectionLeConstat({
  surtitre,
  titre,
  realite,
  enjeu,
}: {
  surtitre: string;
  titre: string;
  realite: {
    titre: string;
    chiffre: string;
    legende: string;
    puces: string[];
    photo?: Photo;
  };
  enjeu: {
    titre: string;
    texte: string;
    citation: string;
    photo?: Photo;
  };
}) {
  return (
    <section className="flex w-full flex-col items-center bg-gradient-to-b from-primary-50 to-white px-6 py-16 lg:px-28 lg:py-32">
      <div className="grid w-full max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center gap-2.5 lg:col-span-2">
          <Surtitre>{surtitre}</Surtitre>
          <h2 className="w-full titrage text-3xl font-bold leading-[1.2] text-primary-950 lg:text-6xl">
            {titre}
          </h2>
        </div>

        <Paire photo={realite.photo}>
          <div className="flex flex-col items-start justify-center gap-5 rounded bg-gray-50 p-9 shadow-[10px_10px_0_0_var(--color-encre)]">
            <h3 className="w-full titrage text-xl font-bold leading-[1.4] text-primary-950">
              {realite.titre}
            </h3>
            <div className="flex w-full flex-col items-start justify-end gap-5">
              <p className="titrage text-6xl font-bold leading-[1.2] whitespace-nowrap text-primary-600 lg:text-7xl">
                {realite.chiffre}
              </p>
              <p className="w-full text-base font-semibold leading-[1.5] text-primary-950">
                {realite.legende}
              </p>
            </div>
            <ul className="flex w-full flex-col items-start gap-2">
              {realite.puces.map((puce) => (
                <li key={puce} className="flex w-full items-start gap-2.5 text-primary-600">
                  <FlecheRenvoi />
                  <span className="flex-1 text-base leading-[1.5] text-primary-950 opacity-60">
                    {puce}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Paire>

        <Paire photo={enjeu.photo} decalee>
          <div className="flex flex-col items-start justify-center gap-5 rounded bg-primary-600 p-9 text-white shadow-[10px_10px_0_0_var(--color-encre)]">
            <h3 className="w-full titrage text-xl font-bold leading-[1.4]">{enjeu.titre}</h3>
            <p className="w-full text-base leading-[1.5] opacity-80">{enjeu.texte}</p>
            <p className="w-full titrage-italique text-lg font-bold leading-[1.4]">
              {enjeu.citation}
            </p>
          </div>
        </Paire>
      </div>
    </section>
  );
}

function Paire({
  photo,
  decalee = false,
  children,
}: {
  photo?: Photo;
  decalee?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative flex flex-col gap-6 lg:block ${decalee ? "lg:mt-32" : ""}`}>
      <div className="relative h-[280px] w-full overflow-hidden rounded bg-gris-300 lg:h-[560px] lg:max-w-[500px]">
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 500px, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="lg:absolute lg:right-0 lg:top-0 lg:flex lg:h-[560px] lg:w-[400px] lg:items-center">
        {children}
      </div>
    </div>
  );
}
