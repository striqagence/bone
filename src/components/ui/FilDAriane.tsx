import Link from "next/link";

import { lien, type Langue } from "@/lib/i18n";

import { ChevronDroite, IconeAccueil } from "./icones";

/**
 * Fil d'ariane (Figma « Fil d'ariane »).
 *
 * Quatre variantes dans la maquette — deux fonds × un ou deux niveaux — qui se
 * ramènent à deux règles : la couleur dépend du fond, et seul le dernier niveau
 * est à pleine intensité, les précédents sont atténués. Un tableau d'entrées
 * couvre donc les quatre cas, et les profondeurs suivantes s'il en vient.
 *
 * Le dernier niveau désigne la page courante : il n'est pas cliquable, et porte
 * `aria-current` plutôt qu'un lien vers lui-même.
 */
export function FilDAriane({
  entrees,
  langue,
  fond = "sombre",
  className = "",
}: {
  entrees: { libelle: string; chemin?: string }[];
  langue: Langue;
  fond?: "clair" | "sombre";
  className?: string;
}) {
  const attenue = fond === "sombre" ? "text-white/50" : "text-gris-400";
  const appuye = fond === "sombre" ? "text-white" : "text-primary-950";

  return (
    <nav aria-label="Fil d’ariane" className={className}>
      <ol
        className={`flex h-[16.5px] items-center gap-1 text-[9px] font-semibold leading-none whitespace-nowrap ${attenue}`}
        style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 120' }}
      >
        <li className="flex items-center gap-1">
          <Link href={lien("/", langue)} aria-label="Accueil" className="flex items-center">
            <IconeAccueil />
          </Link>
          <ChevronDroite />
        </li>

        {entrees.map(({ libelle, chemin }, index) => {
          const dernier = index === entrees.length - 1;
          return (
            <li key={libelle} className="flex items-center gap-1 font-display">
              {dernier || !chemin ? (
                <span className={dernier ? appuye : undefined} aria-current={dernier ? "page" : undefined}>
                  {libelle}
                </span>
              ) : (
                <Link href={lien(chemin, langue)}>{libelle}</Link>
              )}
              {!dernier && <ChevronDroite />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
