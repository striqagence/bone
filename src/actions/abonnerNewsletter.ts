"use server";

import { getPayload } from "payload";
import config from "@payload-config";

import { langues, type Langue } from "@/lib/i18n";

/**
 * Enregistre une inscription à la newsletter.
 *
 * Une adresse déjà inscrite renvoie un succès : la base la refuse, mais
 * l'annoncer dirait à n'importe qui si telle adresse figure dans la liste.
 *
 * Comme pour le formulaire de contact, la validation est refaite ici : celle du
 * navigateur guide la saisie, elle ne protège de rien.
 */
export type ResultatAbonnement = { etat: "succes" } | { etat: "erreur"; message: string };

const EMAIL = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

const MESSAGES: Record<Langue, { invalide: string; panne: string }> = {
  fr: {
    invalide: "L’adresse e-mail n’est pas valide.",
    panne: "L’inscription n’a pas pu être enregistrée. Réessayez dans un instant.",
  },
  en: {
    invalide: "This email address is not valid.",
    panne: "Your subscription could not be saved. Please try again in a moment.",
  },
};

export async function abonnerNewsletter(donnees: FormData): Promise<ResultatAbonnement> {
  const langueBrute = String(donnees.get("langue") ?? "");
  const langue: Langue = (langues as readonly string[]).includes(langueBrute)
    ? (langueBrute as Langue)
    : "fr";
  const messages = MESSAGES[langue];

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
      await payload.create({ collection: "abonnes", data: { email, langue } });
    }
    return { etat: "succes" };
  } catch {
    return { etat: "erreur", message: messages.panne };
  }
}
