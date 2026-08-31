import { Surtitre } from "@/components/ui/Surtitre";

/**
 * Section « Le problème central, en chiffres » de l'accueil (Figma « Frame 34 »).
 *
 * Trois statistiques en escalier, chacune décalée de 50px sur la précédente et
 * bordée d'un filet d'accent. Le chapô alterne deux intensités : le constat à
 * pleine opacité, sa conséquence à moitié — deux champs, comme pour le titre du
 * hero, la césure portant le sens.
 *
 * Une colonne vide occupe le premier quart dans la maquette, réservée au
 * filigrane. Elle est rendue par une grille à quatre colonnes dont le contenu
 * commence à la seconde, plutôt que par une colonne fantôme.
 */
export function SectionChiffres({
  surtitre,
  titre,
  constat,
  consequence,
  statistiques,
}: {
  surtitre: string;
  titre: string;
  constat: string;
  consequence?: string | null;
  statistiques: { valeur: string; unite: string; libelle: string; precision: string }[];
}) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-encre bg-[linear-gradient(253.88deg,rgb(0_0_0/0)_3.28%,rgb(32_32_255/0.2)_94.98%)] px-6 py-16 lg:px-28 lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/filigrane-chiffres.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-[13.22%_79.68%_24.65%_-3.65%] hidden max-w-none lg:block"
      />

      <div className="relative grid w-full max-w-[1600px] grid-cols-1 gap-x-7 gap-y-14 lg:grid-cols-4">
        <div className="flex flex-col items-start gap-6 lg:col-start-2 lg:col-end-5 lg:items-end lg:pl-[100px]">
          <Surtitre couleur="blanc" className="w-full">
            {surtitre}
          </Surtitre>
          <h2 className="w-full titrage text-3xl font-bold leading-[1.2] text-white lg:text-6xl">
            {titre}
          </h2>
          <p className="w-full text-lg leading-[1.5] text-white lg:text-2xl">
            {constat}
            {consequence && <span className="text-white/50"> {consequence}</span>}
          </p>
        </div>

        {statistiques.map(({ valeur, unite, libelle, precision }, index) => (
          <div
            key={libelle}
            className={`flex flex-col items-start ${index === 0 ? "lg:col-start-2" : ""} ${index === 1 ? "lg:pt-[50px]" : ""} ${index === 2 ? "lg:pt-[100px]" : ""}`}
          >
            <div className="flex w-full flex-col items-start gap-2.5 border-l-2 border-accent-700 px-11 py-5 shadow-[10px_10px_0_0_rgb(0_0_34/0.3)]">
              <p className="titrage pb-5 font-semibold leading-[1.2] whitespace-nowrap text-white">
                <span className="text-7xl">{valeur}</span>
                <span className="text-lg font-light">{unite}</span>
              </p>
              <p className="titrage text-xs font-semibold uppercase leading-5 tracking-[3px] whitespace-nowrap text-accent-700">
                {libelle}
              </p>
              <p className="w-full max-w-[292px] text-base leading-[1.5] text-white opacity-80">
                {precision}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
