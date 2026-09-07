"use server";

import { getPayload } from "payload";
import config from "@payload-config";

import { cadenceDepassee, jetonRecevable, leurreRempli } from "@/lib/antiabus";
import { langues, type Langue } from "@/lib/i18n";

/**
 * Enregistre une inscription à la newsletter.
 *
 * Une adresse déjà inscrite renvoie un succès : la base la refuse, mais
 * l'annoncer dirait à n'importe qui si telle adresse figure dans la liste.
 *
 * Comme pour le formulaire de contact, la validation est refaite ici : celle du
 * navigateur guide la saisie, elle ne protège de rien. Les mêmes protections
 * anti-abus s'appliquent : l'action est un point d'entrée POST joignable sans
 * passer par la page.
 */

/** Cinq inscriptions par heure et vingt par jour depuis une même adresse. */
const CADENCE = [
  { max: 5, secondes: 60 * 60 },
  { max: 20, secondes: 24 * 60 * 60 },
];
export type ResultatAbonnement = { etat: "succes" } | { etat: "erreur"; message: string };

const EMAIL = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

const MESSAGES: Record<Langue, { invalide: string; panne: string; trop: string; expire: string }> = {
  fr: {
    invalide: "L’adresse e-mail n’est pas valide.",
    panne: "L’inscription n’a pas pu être enregistrée. Réessayez dans un instant.",
    trop: "Vous avez déjà tenté plusieurs inscriptions. Réessayez dans une heure.",
    expire: "Votre session a expiré. Rechargez la page et réessayez.",
  },
  en: {
    invalide: "This email address is not valid.",
    panne: "Your subscription could not be saved. Please try again in a moment.",
    trop: "You have already attempted several sign-ups. Please try again in an hour.",
    expire: "Your session has expired. Please reload the page and try again.",
  },
};

export async function abonnerNewsletter(donnees: FormData): Promise<ResultatAbonnement> {
  const langueBrute = String(donnees.get("langue") ?? "");
  const langue: Langue = (langues as readonly string[]).includes(langueBrute)
    ? (langueBrute as Langue)
    : "fr";
  const messages = MESSAGES[langue];

  // Répondre « réussi » à un robot plutôt que de lui apprendre qu'il est vu.
  if (leurreRempli(donnees)) return { etat: "succes" };

  if (!(await jetonRecevable(String(donnees.get("jeton") ?? "")))) {
    return { etat: "erreur", message: messages.expire };
  }

  if (await cadenceDepassee("abonnement", CADENCE)) {
    return { etat: "erreur", message: messages.trop };
  }

  const email = String(donnees.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!EMAIL.test(email)) return { etat: "erreur", message: messages.invalide };

  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "abonnes",
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    });
    if (docs.length === 0) {
      // Comme pour les demandes : l'API publique ne peut plus créer, le local
      // API passe outre, cette action reste le seul chemin d'écriture.
      await payload.create({ collection: "abonnes", data: { email, langue }, overrideAccess: true });
    }
    return { etat: "succes" };
  } catch {
    return { etat: "erreur", message: messages.panne };
  }
}
