"use client";

import { useActionState } from "react";

import { classesBouton } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/ArrowRight";
import { IconeErreur, IconeSucces } from "@/components/ui/icones";
import { abonnerNewsletter, type ResultatAbonnement } from "@/actions/abonnerNewsletter";
import type { Langue } from "@/lib/i18n";

/**
 * Inscription à la newsletter (Figma « La newsletter bone »).
 *
 * Le champ garde son type `email` : le clavier du téléphone s'adapte et le
 * navigateur signale une saisie manifestement fausse avant l'aller-retour.
 * L'action serveur revalide de toute façon.
 *
 * Le message de retour prend la place du champ une fois l'inscription passée :
 * laisser le formulaire vide en place invite à recommencer.
 */
export function FormulaireNewsletter({
  langue,
  libelles,
}: {
  langue: Langue;
  libelles: { placeholder: string; bouton: string; succes: string };
}) {
  const [resultat, action, enCours] = useActionState<ResultatAbonnement | null, FormData>(
    (_precedent, donnees) => abonnerNewsletter(donnees),
    null,
  );

  if (resultat?.etat === "succes") {
    return (
      <p className="flex items-center gap-2.5 text-base leading-[1.5] text-white lg:w-[590px]">
        <IconeSucces />
        {libelles.succes}
      </p>
    );
  }

  return (
    <form action={action} className="flex w-full flex-col items-start gap-3 lg:w-auto">
      <div className="flex w-full flex-col items-stretch gap-5 lg:flex-row lg:items-center">
        <input type="hidden" name="langue" value={langue} />
        <label className="sr-only" htmlFor="newsletter-email">
          {libelles.placeholder}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={libelles.placeholder}
          className="h-[60px] rounded bg-gray-50 px-5 text-base leading-[1.5] text-primary-950 shadow-[10px_10px_0_0_rgb(0_0_34)] outline-none placeholder:text-primary-950/50 focus-visible:ring-2 focus-visible:ring-white lg:w-[450px]"
        />
        <button
          type="submit"
          disabled={enCours}
          className={`${classesBouton({ taille: "lg" })} disabled:opacity-70`}
        >
          {libelles.bouton}
          <ArrowRight />
        </button>
      </div>

      {resultat?.etat === "erreur" && (
        <p className="flex items-center gap-2 text-sm text-white">
          <IconeErreur />
          {resultat.message}
        </p>
      )}
    </form>
  );
}
