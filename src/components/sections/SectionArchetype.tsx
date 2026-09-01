import { Surtitre } from "@/components/ui/Surtitre";
import { pictoTrait, type NomPictoTrait } from "@/components/ui/pictos-traits";

/**
 * Archétype du partenaire (Figma, écran À propos).
 *
 * L'énoncé occupe la moitié gauche, ses traits la moitié droite en quatre
 * étiquettes. Le filigrane sort par la gauche, à cheval sur le bord.
 */
export function SectionArchetype({
  surtitre,
  titre,
  chapo,
  traits,
}: {
  surtitre: string;
  titre: string;
  chapo: string;
  traits: { id?: string | null; picto: NomPictoTrait; libelle: string }[];
}) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-white px-6 py-16 lg:px-28 lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/bone-filigrane.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-[110px] -top-[69px] hidden w-[633px] max-w-none opacity-50 lg:block"
      />

      <div className="relative grid w-full max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col items-start justify-center gap-2.5">
          <Surtitre>{surtitre}</Surtitre>
          <h2 className="w-full titrage text-3xl font-bold leading-[1.4] text-primary-950 lg:text-5xl">
            {titre}
          </h2>
          <p className="w-full text-lg font-medium leading-[1.5] text-primary-950">{chapo}</p>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {traits.map(({ id, picto, libelle }) => (
            <li
              key={id ?? libelle}
              className="carte-survol flex items-center gap-2.5 rounded border border-gris-300 px-9 py-8 text-primary-600 shadow-[10px_10px_0_0_rgb(0_0_34/0.1)]"
            >
              {pictoTrait(picto)}
              <p className="titrage text-lg font-bold leading-[1.4] text-primary-950">{libelle}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
