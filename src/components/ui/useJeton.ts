"use client";

import { useEffect, useState } from "react";

import { demanderJeton } from "@/actions/jetonFormulaire";

/**
 * Jeton d'ouverture du formulaire.
 *
 * Les pages du site sont générées au build : un jeton rendu avec le HTML
 * serait identique pour tous les visiteurs et périmé dès le lendemain. Il est
 * donc demandé au montage, ce qui date l'ouverture du formulaire côté serveur.
 *
 * `pret` commande le bouton d'envoi. Il passe à vrai dès que le jeton arrive,
 * et aussi quand on renonce à l'obtenir : un bouton désactivé pour toujours,
 * sans un mot d'explication, est le pire des aboutissements. Sans jeton
 * l'envoi sera refusé, mais avec un message qui dit quoi faire.
 */
export function useJeton(): { jeton: string; pret: boolean } {
  const [jeton, setJeton] = useState("");
  const [pret, setPret] = useState(false);

  useEffect(() => {
    let vivant = true;

    const demander = async (essaisRestants: number): Promise<void> => {
      try {
        const valeur = await demanderJeton();
        if (!vivant) return;
        setJeton(valeur);
        setPret(true);
      } catch {
        if (!vivant) return;
        if (essaisRestants > 0) {
          setTimeout(() => demander(essaisRestants - 1), 1_000);
          return;
        }
        setPret(true);
      }
    };

    void demander(1);
    return () => {
      vivant = false;
    };
  }, []);

  return { jeton, pret };
}
