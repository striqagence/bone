import { Surtitre } from "@/components/ui/Surtitre";
import { FlecheRenvoi, IconeLivrable } from "@/components/ui/icones";

/**
 * Tableau « un point d'entrée par fonction » (Figma, écran Notre approche).
 *
 * Les cellules sont posées directement dans la grille, sans conteneur de
 * ligne : à trois colonnes elles se rangent d'elles-mêmes, et à une seule
 * colonne la lecture reste juste, le profil ouvrant chaque groupe.
 *
 * Les en-têtes disparaissent alors, remplacés dans chaque cellule par leur
 * libellé : hors du tableau, « Cartographie des risques » ne dirait pas de
 * lui-même qu'il s'agit du livrable.
 */
export function SectionPointsEntree({
  surtitre,
  titre,
  enTetes,
  lignes,
}: {
  surtitre: string;
  titre: string;
  enTetes: { profil: string; pointEntree: string; livrable: string };
  lignes: { id?: string | null; profil: string; pointEntree: string; livrable: string }[];
}) {
  const enTeteMobile = "titrage text-xs font-semibold uppercase tracking-widest lg:hidden";

  return (
    <section className="flex w-full flex-col items-center bg-encre px-6 py-16 lg:px-28 lg:py-32">
      <div className="grid w-full max-w-[1600px] grid-cols-1 gap-x-7 gap-y-6 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col items-start gap-2.5 pb-5 lg:col-span-3">
          <Surtitre couleur="blanc">{surtitre}</Surtitre>
          <h2 className="w-full titrage text-2xl font-bold leading-[1.4] text-gris-50 lg:text-4xl">
            {titre}
          </h2>
        </div>

        <p className="hidden titrage text-xl font-bold leading-[1.4] text-white/70 lg:block">
          {enTetes.profil}
        </p>
        <p className="hidden titrage text-xl font-bold leading-[1.4] text-white/90 lg:block">
          {enTetes.pointEntree}
        </p>
        <p className="hidden titrage text-xl font-bold leading-[1.4] text-white/90 lg:block">
          {enTetes.livrable}
        </p>

        {lignes.map(({ id, profil, pointEntree, livrable }) => (
          <div key={id ?? profil} className="contents">
            <div className="mt-6 flex flex-col justify-center rounded bg-white/10 px-9 py-7 shadow-[5px_5px_0_0_rgb(0_0_34/0.3)] lg:mt-0">
              <p className="titrage text-lg font-bold leading-[1.4] text-white/80">{profil}</p>
            </div>
            <div className="flex flex-col justify-center gap-2 rounded bg-gray-50 px-9 py-7 shadow-[5px_5px_0_0_rgb(0_0_34/0.3)]">
              <span className={`${enTeteMobile} text-primary-600`}>{enTetes.pointEntree}</span>
              <div className="flex items-start gap-2.5 text-primary-600">
                <FlecheRenvoi />
                <span className="flex-1 text-base leading-[1.5] text-primary-950 opacity-60">
                  {pointEntree}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2 rounded bg-gray-50 px-9 py-7 shadow-[5px_5px_0_0_rgb(0_0_34/0.3)]">
              <span className={`${enTeteMobile} text-primary-600`}>{enTetes.livrable}</span>
              <div className="flex items-start gap-2.5 text-primary-600">
                <IconeLivrable />
                <span className="flex-1 text-base leading-[1.5] text-primary-950 opacity-60">
                  {livrable}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
