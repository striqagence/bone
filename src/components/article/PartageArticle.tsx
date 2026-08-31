"use client";

import { useState } from "react";

import { IconeLien, IconeLinkedin } from "@/components/ui/icones";

/**
 * Partage d'un article (Figma, colonne de droite du détail).
 *
 * La colonne de la maquette ne porte que deux gestes : publier sur LinkedIn et
 * copier l'adresse. L'adresse est lue dans le navigateur au moment du clic
 * plutôt que passée en propriété : la page est servie sans savoir sous quel
 * domaine elle sera lue.
 */
export function PartageArticle({
  libelles,
}: {
  libelles: { linkedin: string; copier: string; copie: string };
}) {
  const [copie, setCopie] = useState(false);

  const partagerLinkedIn = () => {
    const cible = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href,
    )}`;
    window.open(cible, "_blank", "noopener,noreferrer");
  };

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      // Presse-papiers refusé : le lien reste dans la barre d'adresse.
    }
  };

  const bouton =
    "flex size-[53px] items-center justify-center text-primary-950 transition-colors hover:text-primary-600";

  return (
    <div className="flex items-center gap-2 lg:flex-col lg:gap-0">
      <button type="button" onClick={partagerLinkedIn} className={bouton} title={libelles.linkedin}>
        <span className="sr-only">{libelles.linkedin}</span>
        <IconeLinkedin />
      </button>
      <button
        type="button"
        onClick={copier}
        className={bouton}
        title={copie ? libelles.copie : libelles.copier}
      >
        <span className="sr-only">{copie ? libelles.copie : libelles.copier}</span>
        <IconeLien />
      </button>
    </div>
  );
}
