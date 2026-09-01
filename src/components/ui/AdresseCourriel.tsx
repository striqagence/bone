"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { decoderCourriel } from "@/lib/courriel";
import { lien, type Langue } from "@/lib/i18n";

/**
 * Adresse de courriel affichée sans être écrite dans la page.
 *
 * Le serveur n'envoie que la forme encodée : le navigateur la rétablit au
 * montage, et l'adresse devient un lien `mailto:` ordinaire, cliquable et
 * copiable. Les lecteurs d'écran exécutent le JavaScript comme n'importe quel
 * navigateur : rien n'est perdu pour eux.
 *
 * Avant le montage — et pour le rare visiteur sans JavaScript — c'est un lien
 * vers le formulaire de contact qui s'affiche, quand un libellé de repli est
 * fourni : les mentions légales doivent offrir un moyen de nous joindre en
 * toute circonstance. Sur la page de contact elle-même, où le formulaire est
 * déjà sous les yeux, le repli est inutile et l'adresse s'efface.
 */
export function AdresseCourriel({
  code,
  langue,
  repli,
  className = "",
}: {
  /** L'adresse encodée par `encoderCourriel`, jamais l'adresse elle-même. */
  code: string;
  langue: Langue;
  /** Libellé du lien de repli, vers le formulaire. Absent, rien ne s'affiche. */
  repli?: string;
  className?: string;
}) {
  const [adresse, setAdresse] = useState("");

  useEffect(() => setAdresse(decoderCourriel(code)), [code]);

  if (!adresse) {
    return repli ? (
      <Link href={lien("/contact", langue)} className={className}>
        {repli}
      </Link>
    ) : null;
  }

  return (
    <a href={`mailto:${adresse}`} className={className}>
      {adresse}
    </a>
  );
}
