"use server";

import { emettreJeton } from "@/lib/antiabus";

/**
 * Jeton d'ouverture d'un formulaire.
 *
 * Les pages sont générées au build : un jeton posé dans le HTML serait le même
 * pour tout le monde et périmé le lendemain. Il est donc demandé au montage.
 */
export async function demanderJeton(): Promise<string> {
  return emettreJeton();
}
