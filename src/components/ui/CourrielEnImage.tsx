import type { ImageCourriel } from "@/lib/image-courriel";

/**
 * L'adresse de courriel des pages légales, en image.
 *
 * Ni cliquable, ni sélectionnable, ni lisible par un moissonneur : la loi
 * impose d'afficher une adresse, pas d'en faire un lien.
 *
 * Les dimensions sont exprimées en `em` pour que l'image suive la taille du
 * texte, qui grandit à partir de 1024px. Le décalage vertical replace la ligne
 * de base de l'image sur celle du paragraphe : sans lui, une image s'aligne
 * par son bord inférieur et l'adresse flotterait au-dessus de la ligne.
 */
export function CourrielEnImage({ image }: { image: ImageCourriel }) {
  const { src, alt, largeur, hauteur, base, taille } = image;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={largeur}
      height={hauteur}
      draggable={false}
      className="inline-block select-none"
      style={{
        width: `${largeur / taille}em`,
        height: `${hauteur / taille}em`,
        verticalAlign: `-${(hauteur - base) / taille}em`,
      }}
    />
  );
}
