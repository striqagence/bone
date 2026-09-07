import { Surtitre } from "@/components/ui/Surtitre";
import { pictoTrait, type NomPictoTrait } from "@/components/ui/pictos-traits";

/**
 * Bandeau des valeurs (Figma, écran À propos).
 *
 * Cartes claires posées sur le fond sombre, au filigrane près : c'est la même
 * bande que « Nos 3 pôles » à l'accueil, en plus court et sans lien.
 *
 * La section respire comme les autres, `py-16 lg:py-32`. Son sommet était collé
 * au bloc précédent : il n'avait aucun rembourrage haut au delà de 1024px, et
 * comme les deux blocs partagent le même fond sombre, la coupure ne se voyait
 * pas. Il restait 100px entre les deux contenus, contre 200 à 560 partout
 * ailleurs sur la page.
 */
export function SectionValeurs({
  surtitre,
  cartes,
}: {
  surtitre: string;
  cartes: { id?: string | null; picto: NomPictoTrait; titre: string; texte: string }[];
}) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-encre px-6 py-16 lg:px-28 lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/bone-filigrane.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-7 hidden w-[1115px] max-w-none opacity-50 lg:block"
      />

      <div className="relative flex w-full max-w-[1600px] flex-col items-start gap-6">
        <Surtitre couleur="blanc" balise="h2">{surtitre}</Surtitre>

        {/* Cinq colonnes ne tiennent qu'à partir de 1536px : en dessous, une
            carte n'offrirait que 116px de texte, moins large que ses propres
            mots. */}
        <ul className="apparition-bloc grid w-full grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          {cartes.map(({ id, picto, titre, texte }) => (
            <li
              key={id ?? titre}
              className="carte-survol flex flex-col items-start gap-2.5 rounded bg-gray-50 px-6 py-7 shadow-[5px_5px_0_0_rgb(0_0_34/0.3)] 2xl:px-9"
            >
              <div className="flex items-center gap-2.5 text-primary-600">
                {pictoTrait(picto)}
                <h3 className="titrage text-lg font-bold leading-[1.4] text-primary-950">{titre}</h3>
              </div>
              <p className="text-base leading-[1.5] text-primary-950 opacity-60">{texte}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
