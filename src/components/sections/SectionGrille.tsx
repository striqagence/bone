import { Surtitre } from "@/components/ui/Surtitre";
import { FlecheRenvoi } from "@/components/ui/icones";

/**
 * Grille d'intitulés sur fond sombre (Figma, écran Expertise).
 *
 * L'en-tête pose l'annonce à gauche et sa précision à droite ; suit une grille
 * de deux colonnes de cartes claires. L'intitulé peut suffire — c'est le cas
 * sur Expertise — ou porter une explication, comme sur Capital.
 *
 * Le filigrane est celui de la section « Positionnement » de l'accueil, halo
 * flouté et silhouette pleine superposés. Ses positions sont en pourcentages,
 * donc transposables à toute largeur.
 */
export function SectionGrille({
  surtitre,
  titre,
  chapo,
  intitules,
}: {
  surtitre: string;
  titre: string;
  chapo?: string | null;
  intitules: { texte: string; description?: string | null }[];
}) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-encre px-6 py-16 lg:px-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[3.64%_11.98%_-74.93%_29.93%] hidden opacity-50 lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/filigrane-position-halo.svg"
          alt=""
          className="absolute inset-[-21.78%_-25.28%] max-w-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/filigrane-position.svg" alt="" className="absolute inset-0 max-w-none" />
      </div>

      <div className="relative grid w-full max-w-[1600px] grid-cols-1 gap-x-7 gap-y-6 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6 lg:col-span-2 lg:flex-row lg:items-end lg:justify-center">
          <div className="flex flex-1 flex-col items-start gap-2.5">
            <Surtitre couleur="blanc">{surtitre}</Surtitre>
            <h2 className="w-full titrage text-2xl font-bold leading-[1.4] text-gris-50 lg:text-4xl">
              {titre}
            </h2>
          </div>
          {chapo && (
            <p className="text-lg leading-[1.5] text-white opacity-80 lg:w-[600px]">{chapo}</p>
          )}
        </div>

        {intitules.map(({ texte, description }) => (
          <div
            key={texte}
            className="flex flex-col items-start justify-center gap-2.5 rounded bg-gray-50 px-9 py-7 shadow-[5px_5px_0_0_rgb(0_0_34/0.3)]"
          >
            <p className="w-full titrage text-lg font-bold leading-[1.4] text-primary-950">
              {texte}
            </p>
            {description && (
              <div className="flex w-full items-start gap-2.5 text-primary-600">
                <FlecheRenvoi />
                <span className="flex-1 text-base leading-[1.5] text-primary-950 opacity-60">
                  {description}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
