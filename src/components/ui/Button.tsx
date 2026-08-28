import Link from "next/link";

import { ArrowRight } from "./ArrowRight";

type Variante = "primary" | "secondary" | "tertiaire";
type Taille = "lg" | "sm" | "barre";

/**
 * Bouton du design system (Figma « Bouton large » / « Bouton small »).
 *
 * L'ombre dure décalée de 10px est la signature visuelle du composant. Figma
 * l'applique en `drop-shadow` sur la variante primaire et en `box-shadow` sur
 * les deux autres ; on retient `box-shadow` partout, identique à l'œil sur un
 * rectangle opaque et sans le coût d'un filtre au repaint.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded font-display font-bold leading-7 whitespace-nowrap transition-colors";

const variantes: Record<Variante, string> = {
  primary:
    "bg-primary-600 text-white shadow-[10px_10px_0_0_var(--color-gris-950)] hover:bg-primary-800",
  secondary:
    "bg-encre/50 text-white border-[0.5px] border-white/80 shadow-[10px_10px_0_0_rgb(255_255_255/0.3)] hover:shadow-[10px_10px_0_0_rgb(255_255_255/0.6)]",
  tertiaire:
    "bg-encre/10 text-encre shadow-[10px_10px_0_0_rgb(0_0_34/0.3)] hover:bg-encre/15 hover:shadow-[10px_10px_0_0_rgb(0_0_34/0.5)]",
};

/**
 * Trois paddings distincts dans la maquette, et non deux : le bouton de la barre
 * de navigation est moins haut que le « Bouton large » posé dans les sections.
 * Les nommer évite d'écraser `p-5` par un `px-5 py-3.5` passé en `className`,
 * dont l'issue dépendrait de l'ordre des règles dans la feuille compilée.
 */
const tailles: Record<Taille, string> = {
  lg: "p-5 text-sm",
  sm: "p-3.5 text-xs",
  barre: "px-5 py-3.5 text-sm",
};

/**
 * Google Sans Flex est une police variable à axes personnalisés. Sans ce
 * réglage, le rendu s'écarte de la maquette : `wdth` 120 élargit sensiblement
 * les glyphes, ce qui change la largeur des boutons.
 */
const axesTypo = { fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 120' };

export function Button({
  href,
  children,
  variante = "primary",
  taille = "lg",
  flecheAvant = true,
  flecheApres = true,
  className = "",
  target,
}: {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  taille?: Taille;
  flecheAvant?: boolean;
  flecheApres?: boolean;
  className?: string;
  target?: "_blank";
}) {
  const fleche = <ArrowRight />;

  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      style={axesTypo}
      className={`${base} ${variantes[variante]} ${tailles[taille]} ${className}`}
    >
      {flecheAvant && fleche}
      {children}
      {flecheApres && fleche}
    </Link>
  );
}
