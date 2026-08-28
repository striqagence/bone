"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Lien de la barre de navigation (Figma « Link menu »), trois états.
 *
 * | État    | Texte           | Marque BONE                    |
 * | ------- | --------------- | ------------------------------ |
 * | Default | Work Sans 400   | absente                        |
 * | Hover   | Work Sans 500   | 21 × 25, à `left: -13px`       |
 * | Active  | Work Sans 500   | 14 × 16, à `left: -18px`       |
 *
 * La marque est en position absolue, comme dans la maquette : elle apparaît
 * sans pousser le texte, donc la barre ne se réorganise pas au survol ni au
 * changement de page. Au survol elle dépasse de 13px et mord volontairement sur
 * le début du texte ; à l'état actif elle est plus petite et entièrement
 * dégagée.
 */
export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const chemin = usePathname();
  // Une sous-page (/blog/mon-article) garde son entrée de menu active.
  const actif = chemin === href || chemin.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={actif ? "page" : undefined}
      className={`group relative whitespace-nowrap text-base text-white ${actif ? "font-medium" : "font-normal hover:font-medium"}`}
    >
      {actif ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand/bone-mark-active.svg"
          alt=""
          width={14}
          height={16}
          className="absolute left-[-18px] top-1/2 -translate-y-1/2"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand/bone-mark-hover.svg"
          alt=""
          width={21}
          height={25}
          className="absolute left-[-13px] top-[calc(50%+1px)] -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
      {children}
    </Link>
  );
}
