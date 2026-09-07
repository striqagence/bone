import { CHAMP_LEURRE } from "@/lib/leurre";

/**
 * Champ leurre : invisible, hors du parcours au clavier, et jamais rempli par
 * un visiteur. Un envoi qui le renseigne vient d'un robot.
 *
 * Il est sorti de l'écran plutôt que masqué par `display: none` : certains
 * robots ignorent les champs que la feuille de style cache, aucun ne calcule
 * une position.
 */
export function ChampLeurre() {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
      <label htmlFor={CHAMP_LEURRE}>Ne remplissez pas ce champ</label>
      <input
        id={CHAMP_LEURRE}
        name={CHAMP_LEURRE}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
