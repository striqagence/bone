import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "@/components/ui/ArrowRight";
import { classesBouton } from "@/components/ui/Button";
import { Surtitre } from "@/components/ui/Surtitre";
import { lien, type Langue } from "@/lib/i18n";
import type { Article } from "@/lib/articles";

/**
 * Article mis en avant en tête du blog (Figma « À la une »).
 *
 * Même contenu qu'une carte de la grille, posé en deux colonnes : l'image
 * occupe la moitié gauche et le texte respire à droite. Comme la carte, le lien
 * porte sur tout le bloc et le bouton n'en emprunte que l'apparence.
 *
 * Le filigrane et le halo de la maquette sont laissés au fond de la section
 * appelante : ils débordent largement du bloc et ne lui appartiennent pas.
 */
export function SectionArticleUne({
  langue,
  surtitre,
  libelleAction,
  article,
}: {
  langue: Langue;
  surtitre: string;
  libelleAction: string;
  article: Article;
}) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-encre px-6 py-16 lg:px-28 lg:py-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/filigrane-cta.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-[120px] -top-[80px] hidden w-[560px] max-w-none opacity-40 lg:block"
      />

      <div className="relative flex w-full max-w-[1600px] flex-col items-start gap-6">
        <Surtitre couleur="blanc">{surtitre}</Surtitre>

        <Link
          href={lien(article.chemin, langue)}
          className="carte-survol group flex w-full flex-col items-stretch gap-7 rounded bg-gray-50 p-7 shadow-[10px_10px_0_0_rgb(0_0_34/0.3)] xl:min-h-[400px] xl:flex-row xl:items-center xl:gap-10 xl:pr-24"
        >
          {/* Les deux colonnes n'apparaissent qu'à 1280px : à 1024, la colonne
              de texte tombait sous les 340px, le titre passait à cinq lignes et
              le bouton sortait de la carte. La hauteur de l'image est posée en
              dur, un `h-full` se résolvant sur un parent en hauteur
              automatique, où l'image disparaîtrait. */}
          <div className="relative h-[220px] flex-1 overflow-hidden rounded bg-gris-300 xl:h-[344px]">
            {article.image && (
              <Image
                src={article.image.src}
                alt={article.image.alt}
                fill
                sizes="(min-width: 1280px) 718px, 100vw"
                className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                priority
              />
            )}
            <span className="absolute left-2.5 top-2.5 flex items-center justify-center gap-2 rounded bg-encre/80 px-3.5 py-3 text-[10px] font-semibold uppercase leading-none tracking-widest whitespace-nowrap text-white">
              {article.categorie}
            </span>
          </div>

          <div className="flex flex-1 flex-col items-start justify-center gap-3.5">
            <div className="flex w-full items-center gap-4 text-sm font-semibold uppercase leading-none tracking-widest whitespace-nowrap">
              <span className="text-primary-600">{article.date}</span>
              <span className="text-gris-400">{article.tempsDeLecture}</span>
            </div>
            <h2 className="w-full titrage text-2xl font-bold leading-[1.4] text-primary-950 lg:text-3xl">
              {article.titre}
            </h2>
            <p className="w-full text-base leading-[1.5] text-primary-950 opacity-60 lg:text-lg">
              {article.description}
            </p>
            <span className={classesBouton({ variante: "tertiaire", taille: "sm" })}>
              {libelleAction}
              <ArrowRight />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
