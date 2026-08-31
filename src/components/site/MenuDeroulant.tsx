import Link from "next/link";

import { lien, type Langue } from "@/lib/i18n";
import type { Navigation } from "@/lib/navigation";

/**
 * Panneau déroulant des compétences (Figma « Menu déroulant sticky V3 »).
 *
 * Trois pôles en ligne, séparés par un filet à 10 %. La marque BONE en dégradé
 * est strictement la même image pour les trois : Figma en exporte trois copies
 * qui ne diffèrent que par les identifiants de leurs dégradés.
 */
export function MenuDeroulant({
  langue,
  poles,
}: {
  langue: Langue;
  poles: NonNullable<Navigation["poles"]>;
}) {
  return (
    <div className="flex items-start gap-6 rounded bg-black/90 py-4 pl-6 pr-9 backdrop-blur-[2px]">
      {poles.map(({ titre, sousTitre, chemin }, index) => (
        <div key={chemin} className="flex items-start gap-6">
          {index > 0 && <span aria-hidden className="w-px self-stretch bg-white/10" />}
          <Link href={lien(chemin, langue)} className="flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/bone-mark-degrade.svg"
              alt=""
              width={17.257}
              height={20}
              className="shrink-0"
            />
            <span className="flex flex-col items-start whitespace-nowrap text-white">
              <span
                className="titrage text-sm font-bold leading-[1.4]"
              >
                {titre}
              </span>
              <span className="text-xs opacity-60">{sousTitre}</span>
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}
