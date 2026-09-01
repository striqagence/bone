import Image from "next/image";
import Link from "next/link";

import { lien, type Langue } from "@/lib/i18n";

import { ArrowRight } from "./ArrowRight";
import { classesBouton } from "./Button";

/**
 * Carte d'article de blog (Figma « Blog »).
 *
 * Comme la carte de pôle, la carte entière est le lien et le « Lire l'article »
 * n'en emprunte que l'apparence. La maquette place l'ancre sur ce seul bouton,
 * ce qui réduirait la cible cliquable à un rectangle de 130px au bas d'une
 * carte de 400 × 500.
 */
export function CarteArticle({
  langue,
  chemin,
  categorie,
  date,
  tempsDeLecture,
  titre,
  description,
  libelleAction,
  image,
}: {
  langue: Langue;
  chemin: string;
  categorie: string;
  date: string;
  tempsDeLecture: string;
  titre: string;
  description: string;
  libelleAction: string;
  image?: { src: string; alt: string };
}) {
  return (
    <Link
      href={lien(chemin, langue)}
      className="flex h-[500px] w-full flex-col items-start gap-6 rounded bg-gray-50 px-7 pb-9 pt-7 shadow-[10px_10px_0_0_rgb(0_0_34/0.3)]"
    >
      <div className="relative flex w-full flex-col items-start gap-4">
        <div className="relative h-[180px] w-full overflow-hidden rounded bg-gris-300">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 344px, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <span className="absolute left-2.5 top-2.5 flex items-center justify-center gap-2 rounded bg-encre/80 px-3.5 py-3 text-[10px] font-semibold uppercase leading-none tracking-widest whitespace-nowrap text-white">
          {categorie}
        </span>
      </div>

      <div className="flex min-h-px w-full flex-1 flex-col items-start justify-between">
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex w-full items-center justify-between text-xs font-semibold uppercase leading-none tracking-widest whitespace-nowrap">
            <span className="text-primary-600">{date}</span>
            <span className="text-gris-400">{tempsDeLecture}</span>
          </div>
          <h3 className="w-full titrage text-xl font-bold leading-[1.4] text-primary-950">
            {titre}
          </h3>
          <p className="w-full text-base leading-[1.5] text-primary-950 opacity-60">{description}</p>
        </div>

        <span className={classesBouton({ variante: "tertiaire", taille: "sm" })}>
          {libelleAction}
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
