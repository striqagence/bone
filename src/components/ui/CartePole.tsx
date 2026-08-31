import Image from "next/image";
import Link from "next/link";

import { lien, type Langue } from "@/lib/i18n";

import { ArrowRight } from "./ArrowRight";
import { classesBouton } from "./Button";

/**
 * Carte de pôle (Figma « Pôles »).
 *
 * La maquette définit deux états, Default et Hover : au survol, le dégradé
 * s'assombrit et un bloc description + bouton apparaît.
 *
 * Ce bloc est visible d'emblée en dessous de 1024px. Le survol n'existe pas sur
 * écran tactile : l'y cacher rendrait la description et l'appel à l'action
 * inatteignables, alors même que c'est là que la carte dit ce qu'elle vend.
 *
 * La carte entière est le lien. Le « Voir le pôle » n'en emprunte que
 * l'apparence — une ancre imbriquée dans une autre est invalide, et les
 * lecteurs d'écran l'annonceraient deux fois.
 */
const logos = {
  expertise: "/brand/logo-expertise.svg",
  capital: "/brand/logo-capital.svg",
  feed: "/brand/logo-feed.svg",
} as const;

export function CartePole({
  langue,
  chemin,
  pole,
  eyebrow,
  accroche,
  description,
  libelleAction,
  image,
}: {
  langue: Langue;
  chemin: string;
  pole: keyof typeof logos;
  eyebrow: string;
  accroche: string;
  description: string;
  libelleAction: string;
  image?: { src: string; alt: string };
}) {
  return (
    <Link
      href={lien(chemin, langue)}
      className="group relative flex h-[400px] w-full max-w-[640px] flex-col justify-center gap-5 overflow-hidden rounded p-8 lg:p-14"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-primary-950">
        {image && (
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_34/0.3),rgb(0_0_34/0.6))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_34/0.45),rgb(0_0_34/0.9))] opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="relative flex flex-col items-start gap-5">
        <p
          className="font-display text-xs font-bold leading-[1.2] text-white"
          style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 120' }}
        >
          {eyebrow}
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logos[pole]}
          alt={`Bone ${pole}`}
          width={211.172}
          height={60}
          className="w-[170px] lg:w-[211.172px]"
        />

        <p
          className="font-display text-lg font-bold leading-[1.4] text-white"
          style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 120' }}
        >
          {accroche}
        </p>

        <div className="flex w-full items-end justify-between gap-5 lg:hidden lg:group-hover:flex">
          <p className="max-w-[350px] flex-1 text-sm leading-[1.5] text-white">{description}</p>
          <span className={classesBouton({ taille: "sm", className: "w-[136px] shrink-0" })}>
            {libelleAction}
            <ArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
}
