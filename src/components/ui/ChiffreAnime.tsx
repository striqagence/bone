"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Chiffre clé qui défile de zéro jusqu'à sa valeur en entrant dans l'écran.
 *
 * La valeur exacte est écrite dans la page dès le rendu du serveur : le
 * défilement n'est qu'une amélioration posée par-dessus. Si le script ne
 * s'exécute pas, ou si l'observateur ne se déclenche jamais, le chiffre reste
 * affiché, juste. C'est l'inverse d'une révélation par l'opacité, où un script
 * en échec laisse un vide.
 *
 * Les valeurs de la maquette ne sont pas de purs nombres : « ~2 » porte un
 * signe devant, « 15+ » un signe derrière. Seule la partie chiffrée défile, ce
 * qui l'encadre est laissé tel quel. Une valeur sans chiffre du tout ne défile
 * pas.
 *
 * Le nombre qui défile est masqué aux lecteurs d'écran, un jumeau invisible
 * portant la valeur finale : entendre égrener soixante-douze nombres avant le
 * bon n'apporterait rien.
 */
const DUREE = 1100;

/** Découpe « ~2 » en (« ~ », 2, « ») et « 15+ » en (« », 15, « + »). */
function decouper(valeur: string) {
  const m = valeur.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return null;
  const [, avant, nombre, apres] = m;
  const separateur = nombre.includes(",") ? "," : ".";
  const decimales = nombre.split(/[.,]/)[1]?.length ?? 0;
  return {
    avant,
    apres,
    cible: Number(nombre.replace(",", ".")),
    formater: (n: number) =>
      decimales ? n.toFixed(decimales).replace(".", separateur) : String(Math.round(n)),
  };
}

export function ChiffreAnime({ valeur, className = "" }: { valeur: string; className?: string }) {
  const element = useRef<HTMLSpanElement>(null);
  const [affiche, setAffiche] = useState(valeur);

  useEffect(() => {
    const cible = element.current;
    const parts = decouper(valeur);
    if (!cible || !parts) return;

    const bouge = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!bouge || !("IntersectionObserver" in window)) return;

    let image = 0;
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (!entree.isIntersecting) return;
        observateur.disconnect();

        const depart = performance.now();
        const avancer = (maintenant: number) => {
          const t = Math.min(1, (maintenant - depart) / DUREE);
          // Décélération : le chiffre part vite et se pose sur sa valeur.
          const adouci = 1 - Math.pow(1 - t, 3);
          setAffiche(parts.avant + parts.formater(parts.cible * adouci) + parts.apres);
          if (t < 1) image = requestAnimationFrame(avancer);
        };
        image = requestAnimationFrame(avancer);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observateur.observe(cible);
    return () => {
      observateur.disconnect();
      cancelAnimationFrame(image);
    };
  }, [valeur]);

  return (
    <span ref={element} className={className}>
      <span aria-hidden="true">{affiche}</span>
      <span className="sr-only">{valeur}</span>
    </span>
  );
}
