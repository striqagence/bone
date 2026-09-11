"use client";

import { usePathname } from "next/navigation";

/**
 * Bandeau signalant que la page affichée est un aperçu.
 *
 * Sans lui, un rédacteur qui a ouvert un aperçu voit les brouillons sur tout
 * le site jusqu'à ce qu'il vide ses cookies, sans comprendre pourquoi la page
 * publiée ne ressemble pas à ce qu'il a sous les yeux.
 *
 * Le chemin courant est repris dans le lien de sortie pour revenir sur la même
 * page, cette fois telle que le public la voit.
 */
export function BandeauApercu() {
  const chemin = usePathname();

  return (
    <div
      role="status"
      className="sticky top-0 z-[60] flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-primary-600 px-6 py-2 text-center text-sm font-medium text-white"
    >
      <span>Aperçu : cette page peut contenir des modifications non publiées.</span>
      <a
        href={`/apercu/quitter?retour=${encodeURIComponent(chemin)}`}
        className="underline underline-offset-2"
      >
        Quitter l’aperçu
      </a>
    </div>
  );
}
