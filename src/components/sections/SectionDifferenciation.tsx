import { Surtitre } from "@/components/ui/Surtitre";
import { FlecheRenvoi } from "@/components/ui/icones";

type Carte = {
  badge: string;
  titre: string;
  /** La maquette alterne : une liste à puces sur l'accueil, un paragraphe sur
      la page Media. Le paragraphe l'emporte quand il est renseigné. */
  texte?: string | null;
  puces: string[];
};

/**
 * Section « Différenciation » de l'accueil (Figma « Container »).
 *
 * Deux cartes affrontées, l'approche habituelle et celle de Bone, la seconde
 * relevée de 30px sur la première. Le décalage tombe en dessous de 1024px, où
 * les cartes s'empilent.
 */
export function SectionDifferenciation({
  surtitre,
  titre,
  habituelle,
  bone,
}: {
  surtitre: string;
  titre: string;
  habituelle: Carte;
  bone: Carte;
}) {
  return (
    <section className="flex w-full flex-col items-center bg-white px-6 py-16 lg:px-28 lg:py-32">
      <div className="grid w-full max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-[0.5fr_2fr]">
        <div className="flex flex-col items-start justify-end gap-2.5">
          <Surtitre>{surtitre}</Surtitre>
          <h2 className="w-full titrage text-2xl font-bold leading-[1.4] text-primary-950 lg:text-3xl">
            {titre}
          </h2>
        </div>

        <div className="flex flex-col gap-7 lg:flex-row lg:items-end">
          <CarteComparaison carte={habituelle} />
          <CarteComparaison carte={bone} accentuee />
        </div>
      </div>
    </section>
  );
}

function CarteComparaison({ carte, accentuee = false }: { carte: Carte; accentuee?: boolean }) {
  return (
    <div className={`flex flex-1 flex-col items-start ${accentuee ? "lg:pb-[30px]" : ""}`}>
      <div
        className={`flex w-full flex-col items-start gap-4 rounded px-9 py-7 ${
          accentuee
            ? "bg-primary-600 text-primary-50 shadow-[10px_10px_0_0_var(--color-encre)]"
            : "bg-gray-50 text-primary-950 shadow-[10px_10px_0_0_rgb(0_0_34/0.3)]"
        }`}
      >
        <span
          className={`flex items-center justify-center rounded px-3.5 py-3 text-[10px] font-semibold uppercase leading-none tracking-widest whitespace-nowrap ${
            accentuee ? "bg-encre/40 text-primary-50" : "bg-encre/10 text-encre"
          }`}
        >
          {carte.badge}
        </span>

        <p className="w-full titrage text-2xl font-bold leading-[1.4]">{carte.titre}</p>

        {carte.texte ? (
          <p
            className={`w-full text-base leading-[1.5] ${accentuee ? "text-white opacity-80" : "text-primary-950 opacity-60"}`}
          >
            {carte.texte}
          </p>
        ) : (
          <ul className="flex w-full flex-col items-start gap-2">
            {carte.puces.map((puce) => (
              <li key={puce} className="flex w-full items-start gap-2.5 text-primary-600">
                <FlecheRenvoi taille={20} />
                <span
                  className={`flex-1 text-base leading-[1.5] ${accentuee ? "text-white opacity-80" : "text-primary-950 opacity-60"}`}
                >
                  {puce}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
