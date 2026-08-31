import { ArrowRight } from "./ArrowRight";
import { classesBouton } from "./Button";
import { IconeErreur, IconeSucces } from "./icones";

/**
 * Ligne de soumission d'un formulaire (Figma « Formulaire »).
 *
 * Le composant du fichier ne couvre pas les champs, seulement cette ligne : le
 * bouton d'envoi et, à sa droite, la mention légale, la confirmation ou
 * l'erreur selon l'état.
 *
 * Le message est annoncé aux lecteurs d'écran par `role="status"` — sans lui,
 * une confirmation qui remplace la mention légale après l'envoi passerait
 * totalement inaperçue pour qui ne voit pas l'écran.
 */
const messages = {
  succes: { Icone: IconeSucces, couleur: "text-primary-600" },
  erreur: { Icone: IconeErreur, couleur: "text-red-600" },
} as const;

export function SoumissionFormulaire({
  libelle,
  etat = "repos",
  message,
  enCours = false,
}: {
  libelle: string;
  etat?: "repos" | "succes" | "erreur";
  message: string;
  enCours?: boolean;
}) {
  return (
    <div className="flex w-full max-w-[1034.667px] flex-col items-start gap-4 lg:flex-row lg:items-end lg:gap-[29px]">
      <button
        type="submit"
        disabled={enCours}
        className={classesBouton({
          taille: "barre",
          className: "shrink-0 disabled:cursor-not-allowed disabled:opacity-60",
        })}
      >
        {libelle}
        <ArrowRight />
      </button>

      {etat === "repos" ? (
        <p className="max-w-[510px] text-sm leading-[1.5] text-black opacity-60 lg:pt-3.5">
          {message}
        </p>
      ) : (
        <div
          role="status"
          className={`flex items-center gap-[9px] lg:pt-3.5 ${messages[etat].couleur}`}
        >
          {(() => {
            const { Icone } = messages[etat];
            return <Icone />;
          })()}
          <p className="max-w-[510px] text-base font-medium leading-[1.5]">{message}</p>
        </div>
      )}
    </div>
  );
}
