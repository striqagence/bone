import { Surtitre } from "@/components/ui/Surtitre";

/**
 * Bande de logotypes partenaires (Figma « Logotype section » de la page Media).
 *
 * Chaque logo porte sa propre hauteur : la maquette les cale à l'œil — 26px
 * pour VMware, 45px pour un autre — et les aligner sur une hauteur unique
 * déséquilibrerait la rangée, les logos n'ayant pas le même poids optique.
 *
 * La rangée défile horizontalement en dessous de sa largeur : sept logos ne
 * tiennent pas côte à côte sur un téléphone, et les empiler ferait perdre la
 * lecture en bandeau.
 */
export function SectionPartenaires({
  surtitre,
  logos,
}: {
  surtitre: string;
  logos: { fichier: string; nom: string; hauteur: number }[];
}) {
  return (
    <section className="flex w-full flex-col items-center justify-center border-b border-gris-300 py-16 lg:py-24">
      <div className="flex w-full flex-col items-center justify-center gap-6 px-6 lg:px-28">
        <div className="flex w-full max-w-[1600px] flex-col items-start justify-center p-2.5">
          <Surtitre>{surtitre}</Surtitre>
        </div>

        <ul className="flex w-full max-w-[1600px] items-center gap-10 overflow-x-auto lg:justify-center">
          {logos.map(({ fichier, nom, hauteur }, index) => (
            <li key={fichier} className="flex shrink-0 items-center gap-10">
              {index > 0 && <span aria-hidden className="h-[50px] w-px bg-gris-300" />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/brand/partenaires/${fichier}`}
                alt={nom}
                style={{ height: `${hauteur}px` }}
                className="w-auto max-w-none"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
