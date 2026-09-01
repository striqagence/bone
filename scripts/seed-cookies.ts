import { getPayload } from "payload";
import config from "@payload-config";

import { paragraphe, racine, titre } from "./lexical";

/**
 * Gestion des cookies.
 *
 * Le pied de page renvoie vers cette page : la laisser vide vaudrait aveu. Le
 * texte dit l'état réel du site — aucun cookie de mesure ni de publicité — et
 * devra être repris le jour où une mesure d'audience sera ajoutée.
 */
const payload = await getPayload({ config });

const heroFr = {
  surtitre: "Vos données",
  accroche: "Gestion des cookies",
  description:
    "Ce site n’en dépose aucun à des fins de mesure ou de publicité. " +
    "Dernière mise à jour : septembre 2026.",
};

const heroEn = {
  surtitre: "Your data",
  accroche: "Cookie settings",
  description:
    "This site sets none for analytics or advertising purposes. Last updated: September 2026.",
};

const corpsFr = racine([
  titre("Ce site ne vous suit pas"),
  paragraphe(
    "Naviguer sur ce site ne dépose aucun cookie sur votre appareil : ni mesure d’audience, ni " +
      "publicité, ni bouton de réseau social qui vous reconnaîtrait. C’est la raison pour laquelle " +
      "aucun bandeau de consentement ne vous est présenté : il n’y a rien à accepter ni à refuser.",
  ),
  titre("La seule exception"),
  paragraphe(
    "L’espace d’administration, réservé à l’équipe de BONE, utilise un cookie de session pour " +
      "maintenir la connexion. Il est strictement nécessaire au fonctionnement de cet espace et ne " +
      "concerne pas les visiteurs du site.",
  ),
  titre("Ce que voient nos prestataires"),
  paragraphe(
    "Sans cookie, certains services voient tout de même passer votre adresse IP, comme n’importe quel " +
      "serveur que votre navigateur contacte : l’hébergeur du site, et la Fondation OpenStreetMap " +
      "lorsque la carte de la page de contact s’affiche. Le détail figure dans la politique de " +
      "confidentialité.",
  ),
  titre("Si cela change"),
  paragraphe(
    "L’ajout d’une mesure d’audience ou de tout autre traceur donnerait lieu à un bandeau de " +
      "consentement et à la mise à jour de cette page.",
  ),
]);

const corpsEn = racine([
  titre("This site does not track you"),
  paragraphe(
    "Browsing this site sets no cookie on your device: no analytics, no advertising, no social " +
      "network button that would recognise you. That is why no consent banner is shown: there is " +
      "nothing to accept or refuse.",
  ),
  titre("The one exception"),
  paragraphe(
    "The administration area, reserved for the BONE team, uses a session cookie to keep the sign-in " +
      "alive. It is strictly necessary to that area and does not concern site visitors.",
  ),
  titre("What our providers see"),
  paragraphe(
    "Without cookies, some services still see your IP address, as any server your browser contacts " +
      "does: the site’s host, and the OpenStreetMap Foundation when the contact page map is " +
      "displayed. The detail is set out in the privacy policy.",
  ),
  titre("If this changes"),
  paragraphe(
    "Adding analytics or any other tracker would call for a consent banner and an update to this page.",
  ),
]);

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "gestion-des-cookies" } },
  limit: 1,
  draft: true,
});
const id = docs[0]!.id;

await payload.update({
  collection: "pages",
  id,
  locale: "fr",
  data: {
    ...heroFr,
    sections: [{ blockType: "texteLong", corps: corpsFr }] as never,
    _status: "published",
  },
});

const pose = await payload.findByID({ collection: "pages", id, locale: "fr", depth: 0 });
const idBloc = (pose.sections?.[0] as { id?: string } | undefined)?.id;

await payload.update({
  collection: "pages",
  id,
  locale: "en",
  data: {
    ...heroEn,
    sections: [{ blockType: "texteLong", corps: corpsEn, id: idBloc }] as never,
  },
});

payload.logger.info("[cookies] page écrite dans les deux langues");
process.exit(0);
