"use server";

import { getPayload } from "payload";
import config from "@payload-config";

import { langues, type Langue } from "@/lib/i18n";

/**
 * Enregistre une demande de contact.
 *
 * La validation est refaite ici, indépendamment de celle du formulaire : celle
 * du navigateur guide la saisie, elle ne protège de rien.
 */
export type Champ = "profil" | "nom" | "prenom" | "email" | "telephone" | "contexte";

export type Resultat =
  | { etat: "succes" }
  | { etat: "erreur"; champs?: Partial<Record<Champ, string>> };

const PROFILS = ["dsi", "rssi", "technique", "infra", "dirigeant"];

/** Chiffres, espaces et séparateurs usuels d'un numéro français ou international. */
const TELEPHONE = /^[+()\d][\d\s.\-()]{7,}$/;
const EMAIL = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

export async function envoyerDemande(donnees: FormData): Promise<Resultat> {
  const lire = (champ: Champ) => String(donnees.get(champ) ?? "").trim();

  const valeurs = {
    profil: lire("profil"),
    nom: lire("nom"),
    prenom: lire("prenom"),
    email: lire("email"),
    telephone: lire("telephone"),
    contexte: lire("contexte"),
  };

  const champs: Partial<Record<Champ, string>> = {};

  if (!PROFILS.includes(valeurs.profil)) champs.profil = "Choisissez votre rôle.";
  if (!valeurs.nom) champs.nom = "Le nom est obligatoire.";
  if (!valeurs.prenom) champs.prenom = "Le prénom est obligatoire.";
  if (!EMAIL.test(valeurs.email)) champs.email = "L’adresse e-mail n’est pas valide.";
  if (!TELEPHONE.test(valeurs.telephone)) {
    champs.telephone = "Le numéro ne doit contenir que des chiffres.";
  }
  if (valeurs.contexte.length < 10) champs.contexte = "Décrivez votre demande en quelques mots.";

  if (Object.keys(champs).length > 0) return { etat: "erreur", champs };

  const langueBrute = String(donnees.get("langue") ?? "");
  const langue: Langue | undefined = (langues as readonly string[]).includes(langueBrute)
    ? (langueBrute as Langue)
    : undefined;

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "demandes",
      data: { ...valeurs, profil: valeurs.profil as never, langue },
    });
    return { etat: "succes" };
  } catch {
    // Le détail reste dans les journaux du serveur : le visiteur n'a rien à
    // faire d'un message technique, et le lui montrer renseignerait un attaquant.
    return { etat: "erreur" };
  }
}
