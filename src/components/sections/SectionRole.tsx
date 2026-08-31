import { Surtitre } from "@/components/ui/Surtitre";

/**
 * Section « Notre rôle fondamental » de l'accueil (Figma « Container »).
 *
 * Trois étapes en escalier, chacune décalée de 40px sur la précédente ; la
 * dernière est mise en avant sur fond bleu. L'escalier tombe en dessous de
 * 1024px, où les cartes s'empilent.
 *
 * La section n'a pas de marge basse : elle se prolonge dans la suivante, comme
 * dans la maquette.
 */
export function SectionRole({
  surtitre,
  titre,
  chapo,
  etapes,
}: {
  surtitre: string;
  titre: string;
  chapo: string;
  etapes: { numero: string; titre: string; texte: string; accentuee?: boolean | null }[];
}) {
  return (
    <section className="flex w-full flex-col items-center bg-encre bg-[linear-gradient(249.27deg,rgb(0_0_0/0)_3.28%,rgb(32_32_255/0.2)_94.98%)] px-6 pt-16 lg:px-28 lg:pt-32">
      <div className="grid w-full max-w-[1600px] grid-cols-1 gap-x-7 gap-y-12 lg:grid-cols-3">
        <div className="flex flex-col items-start gap-6 lg:col-span-3 lg:flex-row lg:items-end">
          <div className="flex flex-col items-start gap-2.5 lg:w-[1036px]">
            <Surtitre couleur="blanc">{surtitre}</Surtitre>
            <h2 className="w-full titrage text-3xl font-bold leading-[1.2] text-primary-50 lg:text-6xl">
              {titre}
            </h2>
          </div>
          <p className="flex-1 text-lg leading-[1.5] text-white opacity-80">{chapo}</p>
        </div>

        {etapes.map(({ numero, titre: titreEtape, texte, accentuee }, index) => (
          <div
            key={numero}
            className={`flex flex-col items-start ${index === 1 ? "lg:pt-10" : ""} ${index === 2 ? "lg:pt-20" : ""}`}
          >
            <div
              className={`flex w-full flex-col items-start justify-center gap-3 rounded px-9 pb-11 pt-14 shadow-[10px_10px_0_0_var(--color-encre)] ${accentuee ? "bg-primary-600 text-white" : "bg-white text-primary-950"}`}
            >
              <p className="titrage pb-8 text-7xl font-semibold leading-[1.2] opacity-20">
                {numero}
              </p>
              <p className="w-full titrage text-xl font-bold leading-[1.4]">{titreEtape}</p>
              <p className={`w-full text-base leading-[1.5] ${accentuee ? "opacity-80" : "opacity-60"}`}>
                {texte}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
