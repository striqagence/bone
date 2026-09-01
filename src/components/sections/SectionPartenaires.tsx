import { Surtitre } from "@/components/ui/Surtitre";

/**
 * Bande de logotypes partenaires (Figma « Logotype section » de la page Media).
 *
 * La rangée est plus large que l'écran et déborde des deux côtés : la maquette
 * coupe le premier et le dernier logotype, ce qui donne le bandeau continu
 * plutôt qu'une liste qui commence et s'arrête. HPE y figure donc deux fois,
 * en ouverture et en fermeture, comme la couture d'une boucle.
 *
 * Chaque logo porte sa propre hauteur : la maquette les cale à l'œil — 26px
 * pour VMware, 45px pour Palo Alto — et les aligner sur une hauteur unique
 * déséquilibrerait la rangée, les logos n'ayant pas le même poids optique.
 *
 * Le débordement centré ne vaut qu'à partir de 1920px, la largeur pour laquelle
 * la maquette est dessinée. En dessous, la rangée passe en défilement aligné à
 * gauche : centrée, elle escamotait deux logotypes entiers sur un portable de
 * 13 pouces, sans aucun moyen de les atteindre.
 */
export function SectionPartenaires({
  surtitre,
  logos,
}: {
  surtitre: string;
  logos: { id?: string | null; fichier: string; nom: string; hauteur: number }[];
}) {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-6 border-b border-gris-300 py-16 lg:py-24">
      <div className="flex w-full justify-center px-6 lg:px-28">
        <div className="flex w-full max-w-[1600px] flex-col items-start justify-center p-2.5">
          <Surtitre balise="h2">{surtitre}</Surtitre>
        </div>
      </div>

      <div className="w-full overflow-x-auto min-[1920px]:overflow-hidden">
        <ul className="mx-auto flex w-max items-center gap-10 px-6 min-[1920px]:w-full min-[1920px]:justify-center min-[1920px]:px-0">
          {logos.map(({ id, fichier, nom, hauteur }, index) => (
            <li key={id ?? `${fichier}-${index}`} className="flex shrink-0 items-center gap-10">
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
