"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

/**
 * Rafraîchit la page affichée dans le panneau d'aperçu à chaque enregistrement.
 *
 * Le back-office et le site partagent la même origine : celle de la fenêtre
 * suffit donc à valider la provenance des messages, et elle reste juste quel
 * que soit l'alias par lequel l'admin est ouvert, ce qu'une adresse figée en
 * configuration ne garantirait pas.
 *
 * Le rafraîchissement se fait à l'enregistrement, pas à la frappe : les pages
 * sont rendues par le serveur, et leur contenu ne vit pas dans un état de
 * composant qu'on pourrait remplacer à la volée.
 */
export function RafraichirEnApercu() {
  const router = useRouter();

  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={typeof window === "undefined" ? "" : window.location.origin}
    />
  );
}
