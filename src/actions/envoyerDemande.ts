"use server";

import { getPayload } from "payload";
import config from "@payload-config";

import { cadenceDepassee, jetonRecevable, leurreRempli } from "@/lib/antiabus";
import { langues, type Langue } from "@/lib/i18n";

/**
 * Enregistre une demande de contact.
 *
 * La validation est refaite ici, indépendamment de celle du formulaire : celle
 * du navigateur guide la saisie, elle ne protège de rien.
 *
 * Une action serveur est un point d'entrée POST comme un autre : elle est
 * appelable sans passer par la page. Les protections décrites dans
 * `lib/antiabus` s'appliquent donc ici, avant toute écriture.
 */
export type Champ = "profil" | "nom" | "prenom" | "email" | "telephone" | "contexte";

export type Resultat =
  | { etat: "succes" }
  | { etat: "erreur"; champs?: Partial<Record<Champ, string>>; message?: string };

/**
 * Trois demandes par heure et dix par jour depuis une même adresse. Un
 * visiteur qui se reprend ou corrige une faute de frappe passe ; un script
 * qui veut remplir la table ne passe pas.
 */
const CADENCE = [
  { max: 3, secondes: 60 * 60 },
  { max: 10, secondes: 24 * 60 * 60 },
];

/**
 * Messages de refus. Ils vivent dans le code plutôt que dans le back-office :
 * un rédacteur n'a pas à les écrire, et ils ne doivent jamais manquer.
 */
const TROP_DE_DEMANDES: Record<Langue, string> = {
  fr: "Vous avez déjà envoyé plusieurs demandes. Réessayez dans une heure, ou écrivez-nous directement.",
  en: "You have already sent several requests. Please try again in an hour, or write to us directly.",
};

const REESSAYER: Record<Langue, string> = {
  fr: "Votre session a expiré. Rechargez la page et renvoyez votre demande.",
  en: "Your session has expired. Please reload the page and send your request again.",
};

const PROFILS = ["dsi", "rssi", "technique", "infra", "dirigeant"];

/** Chiffres, espaces et séparateurs usuels d'un numéro français ou international. */
const TELEPHONE = /^[+()\d][\d\s.\-()]{7,}$/;
const EMAIL = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

export async function envoyerDemande(donnees: FormData): Promise<Resultat> {
  const langueBrute = String(donnees.get("langue") ?? "");
  const langue: Langue | undefined = (langues as readonly string[]).includes(langueBrute)
    ? (langueBrute as Langue)
    : undefined;

  // Le leurre a été rempli : c'est un robot. On lui répond comme à un envoi
  // réussi — lui signaler qu'il est repéré ne ferait que l'aider à s'ajuster.
  if (leurreRempli(donnees)) return { etat: "succes" };

  if (!(await jetonRecevable(String(donnees.get("jeton") ?? "")))) {
    return { etat: "erreur", message: REESSAYER[langue ?? "fr"] };
  }

  if (await cadenceDepassee("demande", CADENCE)) {
    return { etat: "erreur", message: TROP_DE_DEMANDES[langue ?? "fr"] };
  }

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

  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "demandes",
      data: { ...valeurs, profil: valeurs.profil as never, langue },
      // La collection est fermée en création pour l'API publique. Le local
      // API passe outre, ce qui fait de cette action le seul chemin d'écriture.
      overrideAccess: true,
    });
    return { etat: "succes" };
  } catch {
    // Le détail reste dans les journaux du serveur : le visiteur n'a rien à
    // faire d'un message technique, et le lui montrer renseignerait un attaquant.
    return { etat: "erreur" };
  }
}
