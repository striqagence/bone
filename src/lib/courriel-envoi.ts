import "server-only";

import { getPayload } from "payload";
import config from "@payload-config";

import { BASE } from "./donnees-structurees";
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
  /** Identifiant de la ligne créée, pour renvoyer vers sa fiche. */
  id?: string | number;
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

    /* Le nom et le profil coiffent déjà le message : les répéter dans le
       tableau allongerait la lecture sans rien apprendre. */
    const lignes = [
      ["Adresse e-mail", demande.email],
      ["Téléphone", demande.telephone],
      ["Langue de la demande", langue],
    ];

    /* Le lien vers la fiche, que la version HTML met en bouton et la version
       texte en dernière ligne. */
    const lienFiche = demande.id
      ? `${BASE}/admin/collections/demandes/${demande.id}`
      : `${BASE}/admin/collections/demandes`;

    /* La version texte reprend le nom et le profil, que la version HTML place
       en titre : un client qui n'affiche que le texte ne doit rien perdre. */
    const texte = [
      `Nom : ${nomComplet}`,
      `Profil : ${profil}`,
      ...lignes.map(([cle, valeur]) => `${cle} : ${valeur}`),
      "",
      "Contexte :",
      demande.contexte,
      "",
      `Ouvrir la demande : ${lienFiche}`,
    ].join("\n");

    const html = gabarit({
      nomComplet,
      profil,
      lignes,
      contexte: demande.contexte,
      lienFiche,
    });

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

/**
 * Gabarit du courriel d'alerte.
 *
 * Un courriel n'est pas une page web, et son HTML le montre. Les tableaux
 * remplacent la mise en page moderne parce qu'Outlook s'appuie sur le moteur de
 * rendu de Word, qui ignore les dispositions en grille. Les styles sont écrits
 * en ligne parce que plusieurs clients suppriment la feuille de style de
 * l'en-tête. Les largeurs sont en pixels parce que les unités relatives y sont
 * mal suivies.
 *
 * **Le logotype est typographique et non une image.** La plupart des clients
 * bloquent les images tant que le destinataire ne les autorise pas : un en-tête
 * bâti sur un fichier s'afficherait vide à la première lecture, c'est-à-dire
 * précisément quand le message compte.
 *
 * Les polices de la marque ne peuvent pas être chargées non plus. La pile
 * retenue prend la police système de chaque plateforme, qui est toujours celle
 * que le lecteur trouve la plus lisible chez lui.
 *
 * Le rendu s'adapte aux petites largeurs de deux façons, car la requête de
 * média n'est pas partout honorée : elle réduit les marges et empile les
 * libellés quand elle passe, et la structure reste lisible sans elle, chaque
 * libellé tenant sur une ligne courte.
 */
function gabarit({
  nomComplet,
  profil,
  lignes,
  contexte,
  lienFiche,
}: {
  nomComplet: string;
  profil: string;
  lignes: string[][];
  contexte: string;
  lienFiche: string;
}): string {
  const ENCRE = "#000022";
  const MARQUE = "#2020ff";
  const FOND = "#f3f3f6";
  const TEXTE = "#08080c";
  const DOUX = "#57576b";
  const FILET = "#e4e4ec";
  const POLICE =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const rangees = lignes
    .map(
      ([cle, valeur], i) => `
            <tr>
              <td class="cellule" style="padding: ${i === 0 ? "0" : "12px"} 16px 12px 0; font: 13px/1.4 ${POLICE}; color: ${DOUX}; white-space: nowrap; vertical-align: top;">${echapper(cle)}</td>
              <td class="cellule" style="padding: ${i === 0 ? "0" : "12px"} 0 12px 0; font: 15px/1.5 ${POLICE}; color: ${TEXTE}; vertical-align: top;">${echapper(valeur)}</td>
            </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Nouvelle demande</title>
<style>
  /* La carte devient fluide bien avant que sa largeur fixe ne dépasse le
     cadre. Sans ce premier palier, elle débordait de cent cinquante pixels
     entre 481 et 631, soit précisément la largeur d'un volet de lecture. */
  @media only screen and (max-width: 640px) {
    .carte { width: 100% !important; }
  }
  /* Le second palier n'arrive qu'à la largeur d'un téléphone : empiler les
     libellés plus tôt gaspillerait la place d'une tablette. */
  @media only screen and (max-width: 480px) {
    .marge { padding-left: 24px !important; padding-right: 24px !important; }
    .cellule { display: block !important; width: 100% !important; white-space: normal !important; padding-right: 0 !important; }
    .cellule + .cellule { padding-top: 2px !important; padding-bottom: 14px !important; }
  }
</style>
</head>
<body style="margin: 0; padding: 0; background-color: ${FOND}; -webkit-font-smoothing: antialiased;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${echapper(nomComplet)} (${echapper(profil)}) vient d’écrire par le formulaire du site.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${FOND};">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <table role="presentation" class="carte" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 600px; background-color: #ffffff; border-radius: 4px; overflow: hidden;">

          <tr>
            <td class="marge" style="background-color: ${ENCRE}; padding: 26px 40px;">
              <div style="font: 700 22px/1 ${POLICE}; letter-spacing: -0.4px; color: #ffffff;">BONE</div>
              <div style="font: 11px/1.4 ${POLICE}; letter-spacing: 1.4px; text-transform: uppercase; color: #8b8ba4; padding-top: 6px;">from complexity to decision</div>
            </td>
          </tr>

          <tr>
            <td class="marge" style="padding: 36px 40px 0 40px;">
              <div style="font: 11px/1 ${POLICE}; letter-spacing: 1.6px; text-transform: uppercase; color: ${MARQUE};">Nouvelle demande</div>
              <div style="font: 700 24px/1.3 ${POLICE}; letter-spacing: -0.5px; color: ${TEXTE}; padding-top: 12px;">${echapper(nomComplet)}</div>
              <div style="font: 15px/1.5 ${POLICE}; color: ${DOUX}; padding-top: 4px;">${echapper(profil)}</div>
            </td>
          </tr>

          <tr>
            <td class="marge" style="padding: 28px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid ${FILET}; padding-top: 4px;">
                <tr><td colspan="2" style="height: 24px; line-height: 24px; font-size: 0;">&nbsp;</td></tr>${rangees}
              </table>
            </td>
          </tr>

          <tr>
            <td class="marge" style="padding: 20px 40px 0 40px;">
              <div style="font: 11px/1 ${POLICE}; letter-spacing: 1.4px; text-transform: uppercase; color: ${DOUX}; padding-bottom: 10px;">Contexte</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-left: 2px solid ${MARQUE}; padding: 2px 0 2px 16px; font: 15px/1.6 ${POLICE}; color: ${TEXTE}; white-space: pre-wrap;">${echapper(contexte)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="marge" style="padding: 32px 40px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color: ${MARQUE}; border-radius: 3px;">
                    <a href="${lienFiche}" style="display: inline-block; padding: 14px 26px; font: 700 14px/1 ${POLICE}; color: #ffffff; text-decoration: none;">Ouvrir la demande</a>
                  </td>
                </tr>
              </table>
              <div style="font: 13px/1.6 ${POLICE}; color: ${DOUX}; padding-top: 18px;">Répondre à ce message écrit directement au demandeur.</div>
            </td>
          </tr>

        </table>

        <div style="font: 12px/1.6 ${POLICE}; color: #8b8ba4; padding-top: 20px; max-width: 600px;">Message automatique du formulaire de www.bone-it.com</div>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
