import { Surtitre } from "@/components/ui/Surtitre";
import { IconeMainOuverte, IconeMainRefus } from "@/components/ui/icones";

/**
 * « On ne dit pas / On dit » (Figma, écran Notre approche).
 *
 * Deux colonnes séparées par un filet, la gauche estompée et la droite pleine :
 * l'opposition tient au contraste, pas à un libellé. La citation refusée passe
 * donc en bleu clair à 70 % là où l'autre reste blanche.
 *
 * Le halo est reconstitué en dégradés radiaux plutôt qu'importé : la maquette
 * l'obtient par quatre ellipses floutées superposées, dont l'export à plat
 * pèserait lourd pour un décor que deux `radial-gradient` rendent à
 * l'identique. Il déborde à droite et la section le rogne.
 */
export function SectionPosture({
  surtitre,
  refus,
  engagement,
}: {
  surtitre: string;
  refus: { intitule: string; citation: string; precision?: string | null };
  engagement: { intitule: string; citation: string };
}) {
  return (
    <section className="relative w-full overflow-hidden bg-encre px-6 py-16 lg:px-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[280px] top-1/3 hidden size-[900px] lg:block"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(37_60_220/0.55)_0%,rgb(20_28_130/0.35)_40%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgb(70_130_255/0.65)_0%,rgb(32_32_255/0.3)_55%,transparent_78%)] blur-2xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-12 lg:gap-20">
        <Surtitre couleur="blanc" balise="h2">{surtitre}</Surtitre>

        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-20">
          <div className="flex flex-1 flex-col items-start gap-3.5">
            <div className="flex w-full items-center gap-3.5 text-primary-500">
              <IconeMainRefus />
              <h3 className="titrage text-xl font-bold leading-[1.4] text-white/90 lg:text-2xl">
                {refus.intitule}
              </h3>
            </div>
            <p className="titrage w-full break-words text-3xl font-bold leading-[1.4] text-primary-100/70 xl:text-4xl 2xl:text-5xl">
              {refus.citation}
            </p>
            {refus.precision && (
              <p className="w-full text-base font-medium leading-[1.5] text-white/50 lg:text-xl">
                {refus.precision}
              </p>
            )}
          </div>

          <span aria-hidden className="hidden w-px self-stretch bg-white/20 lg:block" />

          <div className="flex flex-1 flex-col items-start gap-3.5">
            <div className="flex w-full items-center gap-3.5 text-primary-500">
              <IconeMainOuverte />
              <h3 className="titrage text-xl font-bold leading-[1.4] text-white/90 lg:text-2xl">
                {engagement.intitule}
              </h3>
            </div>
            <p className="titrage w-full break-words text-3xl font-bold leading-[1.4] text-white xl:text-4xl 2xl:text-5xl">
              {engagement.citation}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
