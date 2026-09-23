"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import {
  abreviations,
  cheminSansLangue,
  codesHreflang,
  langues,
  lien,
  nomsDeLangue,
  type Langue,
} from "@/lib/i18n";

/**
 * Bascule de langue de l'en-tête (le « Fr ▾ » de la maquette).
 *
 * Tant que le site n'avait que deux langues, le contrôle pointait directement
 * vers l'autre et le chevron n'ouvrait rien. À trois, il faut choisir : le
 * chevron déplie enfin la liste qu'il annonçait.
 *
 * Chaque langue s'y nomme dans sa propre écriture. Traduire « 中文 » par
 * « Chinois » obligerait le lecteur à reconnaître sa langue dans une autre
 * qu'il ne lit pas.
 *
 * La page consultée est conservée : passer en anglais depuis /contact mène à
 * /en/contact, et non à l'accueil.
 *
 * L'alignement du panneau suit la position du contrôle. Dans l'en-tête il est
 * collé à droite de l'écran, et le panneau s'ouvre vers la gauche ; dans le
 * menu replié il est à gauche de sa rangée, et le même réglage faisait sortir
 * le panneau du cadre par la gauche, de huit pixels.
 */
export function SelecteurLangue({
  langue,
  alignement = "droite",
}: {
  langue: Langue;
  alignement?: "gauche" | "droite";
}) {
  const chemin = cheminSansLangue(usePathname());
  const [ouvert, setOuvert] = useState(false);
  const conteneur = useRef<HTMLDivElement>(null);
  const identifiant = useId();

  useEffect(() => {
    if (!ouvert) return;

    /* Un clic au dehors referme, comme tout menu. `pointerdown` plutôt que
       `click` : le menu doit disparaître avant que la page ne réagisse. */
    const auDehors = (evenement: PointerEvent) => {
      if (!conteneur.current?.contains(evenement.target as Node)) setOuvert(false);
    };
    const echappement = (evenement: KeyboardEvent) => {
      if (evenement.key === "Escape") setOuvert(false);
    };

    document.addEventListener("pointerdown", auDehors);
    document.addEventListener("keydown", echappement);
    return () => {
      document.removeEventListener("pointerdown", auDehors);
      document.removeEventListener("keydown", echappement);
    };
  }, [ouvert]);

  return (
    <div ref={conteneur} className="relative">
      <button
        type="button"
        aria-expanded={ouvert}
        aria-controls={identifiant}
        aria-label="Changer de langue"
        onClick={() => setOuvert((valeur) => !valeur)}
        className="flex cursor-pointer items-center gap-0.5 titrage text-sm font-bold text-white transition-opacity hover:opacity-70"
      >
        {abreviations[langue]}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/chevron-bas.svg"
          alt=""
          width={8}
          height={4.29289}
          className={`ml-1 transition-transform duration-200 ${ouvert ? "rotate-180" : ""}`}
        />
      </button>

      {ouvert && (
        <ul
          id={identifiant}
          className={`absolute top-full z-50 mt-3 min-w-36 overflow-hidden rounded bg-encre py-1 shadow-lg ring-1 ring-white/15 ${
            alignement === "gauche" ? "left-0" : "right-0"
          }`}
        >
          {langues.map((autre) => (
            <li key={autre}>
              <Link
                href={lien(chemin, autre)}
                hrefLang={codesHreflang[autre]}
                lang={codesHreflang[autre]}
                aria-current={autre === langue ? "true" : undefined}
                onClick={() => setOuvert(false)}
                className={`block px-4 py-2 text-sm whitespace-nowrap transition-colors hover:bg-white/10 ${
                  autre === langue ? "font-bold text-white" : "text-white/70"
                }`}
              >
                {nomsDeLangue[autre]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
