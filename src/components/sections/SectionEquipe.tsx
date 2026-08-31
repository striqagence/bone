import Image from "next/image";

import { Surtitre } from "@/components/ui/Surtitre";

/**
 * Présentation de l'équipe (Figma, écran À propos).
 *
 * La carte chevauche la photo par la droite et déborde vers le bas : elle est
 * donc posée en absolu au-dessus de 1024px. En dessous elle repasse sous la
 * photo, un chevauchement sur 375px de large ne laissant plus voir ni l'une ni
 * l'autre.
 */
export function SectionEquipe({
  surtitre,
  titre,
  texte,
  image,
  statistiques,
}: {
  surtitre: string;
  titre: string;
  texte: string;
  image?: { src: string; alt: string };
  statistiques: { id?: string | null; valeur: string; libelle: string }[];
}) {
  return (
    <section className="flex w-full flex-col items-center bg-white px-6 py-16 lg:px-28 lg:py-32">
      <div className="flex w-full max-w-[1600px] flex-col gap-10 lg:gap-[176px]">
        <div className="relative flex flex-col gap-8 lg:block">
          <div className="relative h-[260px] w-full overflow-hidden rounded bg-gris-300 lg:h-[500px] lg:w-[81.7%]">
            {image && (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 1307px, 100vw"
                className="object-cover"
              />
            )}
          </div>

          <div className="flex flex-col items-start justify-center gap-3.5 rounded bg-gray-50 p-9 shadow-[10px_10px_0_0_var(--color-encre)] lg:absolute lg:right-0 lg:top-[180px] lg:w-[400px]">
            <Surtitre>{surtitre}</Surtitre>
            <p className="w-full titrage text-xl font-bold leading-[1.4] text-primary-950">
              {titre}
            </p>
            <p className="w-full text-base leading-[1.5] text-primary-950 opacity-60">{texte}</p>
          </div>
        </div>

        {statistiques.length > 0 && (
          <ul className="flex flex-col gap-7 lg:flex-row">
            {statistiques.map(({ id, valeur, libelle }) => (
              <li
                key={id ?? valeur}
                className="flex flex-1 flex-col items-start gap-2.5 border-l-2 border-primary-600 px-11 py-5"
              >
                <p className="titrage text-5xl font-semibold leading-[1.2] text-primary-600 lg:text-[72px]">
                  {valeur}
                </p>
                <p className="titrage text-xs font-semibold uppercase leading-5 tracking-[3px] text-primary-950 opacity-60">
                  {libelle}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
