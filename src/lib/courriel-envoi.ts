import "server-only";

import { getPayload } from "payload";
import config from "@payload-config";

import type { Langue } from "./i18n";

/**
 * Alerte l'équipe d'une nouvelle demande de contact.
 *
 * Deux principes commandent cette fonction.
 *
 * **Elle ne peut pas faire échouer une demande.** L'enregistrement en base a
 * déjà eu lieu quand elle est appelée : une panne du service d'envoi, une clé
 * expirée ou un quota atteint ne doivent jamais se traduire par un message
 * d'erreur au visiteur, qui recommencerait une saisie pourtant aboutie. Tout
 * est donc capturé, et l'échec part dans les journaux du serveur.
 *
 * **Elle ne transporte pas la demande à la place de la base.** Le courriel
 * reprend les coordonnées pour qu'on puisse répondre sans ouvrir le
 * back-office, mais la source reste la table : c'est elle qui fait foi, et
 * c'est vers elle que renvoie le lien.
 *
 * Les destinataires viennent du back-office et non d'une variable
 * d'environnement : la personne qui reçoit les demandes changera plus souvent
 * que le code, et elle doit pouvoir le faire sans déploiement.
 */
export type DemandeAAlerter = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  profil: string;
  contexte: string;
  langue?: Langue;
};

/**
 * Libellés des profils.
 *
 * La collection stocke un code (« dsi »), qui n'a rien à faire dans le sujet
 * d'un courriel que l'équipe lit dans sa boîte de réception. Ils reprennent
 * ceux du formulaire, sans l'abréger comme le fait la maquette faute de place.
 */
const PROFILS: Record<string, string> = {
  dsi: "DSI",
  rssi: "RSSI",
  technique: "Direction technique",
  infra: "Responsable infrastructure",
  dirigeant: "Dirigeant",
};

/** Comment nommer la langue de la demande dans l'alerte. */
const LANGUES: Record<Langue, string> = {
  fr: "français",
  en: "anglais",
  zh: "chinois",
};

const echapper = (valeur: string) =>
  valeur
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export async function alerterNouvelleDemande(demande: DemandeAAlerter): Promise<void> {
  try {
    const payload = await getPayload({ config });

    const contact = await payload.findGlobal({
      slug: "contact",
      depth: 0,
      overrideAccess: true,
    });

    const destinataires = (contact.notifications?.destinataires ?? [])
      .map(({ adresse }) => adresse)
      .filter((a): a is string => Boolean(a));

    if (destinataires.length === 0) {
      payload.logger.warn(
        "Demande de contact enregistrée, mais aucun destinataire d’alerte n’est configuré.",
      );
      return;
    }

    const langue = demande.langue ? LANGUES[demande.langue] : "non précisée";
    const nomComplet = `${demande.prenom} ${demande.nom}`.trim();
    const profil = PROFILS[demande.profil] ?? demande.profil;

    /* Le sujet porte le nom et le profil : c'est ce qui permet de trier dans
       une boîte de réception sans ouvrir chaque message. */
    const sujet = `Nouvelle demande, ${nomComplet} (${profil})`;

    const lignes = [
      ["Nom", nomComplet],
      ["Profil", profil],
      ["Adresse e-mail", demande.email],
      ["Téléphone", demande.telephone],
      ["Langue de la demande", langue],
    ];

    const texte = [
      ...lignes.map(([cle, valeur]) => `${cle} : ${valeur}`),
      "",
      "Contexte :",
      demande.contexte,
    ].join("\n");

    const html = `<div style="font-family: system-ui, sans-serif; font-size: 15px; line-height: 1.6; color: #14172a;">
  <p style="margin: 0 0 16px;">Une demande vient d’être envoyée par le formulaire du site.</p>
  <table style="border-collapse: collapse; margin: 0 0 20px;">
    ${lignes
      .map(
        ([cle, valeur]) =>
          `<tr><td style="padding: 3px 16px 3px 0; color: #6e7490;">${cle}</td><td style="padding: 3px 0;">${echapper(valeur)}</td></tr>`,
      )
      .join("\n    ")}
  </table>
  <p style="margin: 0 0 6px; color: #6e7490;">Contexte</p>
  <p style="margin: 0; white-space: pre-wrap;">${echapper(demande.contexte)}</p>
</div>`;

    await payload.sendEmail({
      to: destinataires,
      /* La réponse part vers le demandeur, pas vers l'adresse d'envoi
         technique, qui ne reçoit rien. Sans cela, un « Répondre » se perdrait. */
      replyTo: demande.email,
      subject: sujet,
      text: texte,
      html,
    });
  } catch (erreur) {
    /* On ne relaie rien : la demande est enregistrée, c'est ce qui compte. */
    console.error("L’alerte de nouvelle demande n’a pas pu être envoyée.", erreur);
  }
}
