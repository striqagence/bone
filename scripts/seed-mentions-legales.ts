import { getPayload } from "payload";
import config from "@payload-config";

import { liste, paragraphe, racine, titre } from "./lexical";

/**
 * Mentions légales.
 *
 * Les informations d'immatriculation ne sont pas connues du dépôt : elles sont
 * laissées entre crochets, à compléter au back-office avant la mise en ligne.
 * Inventer un numéro RCS serait pire que de le laisser manquant.
 */
const payload = await getPayload({ config });

const heroFr = {
  surtitre: "Informations légales",
  accroche: "Mentions légales",
  description:
    "Qui édite ce site, qui l’héberge, et à qui s’adresser. Dernière mise à jour : septembre 2026.",
};

const heroEn = {
  surtitre: "Legal information",
  accroche: "Legal notice",
  description:
    "Who publishes this site, who hosts it, and who to contact. Last updated: September 2026.",
};

const corpsFr = racine([
  titre("Éditeur du site"),
  paragraphe(
    "Le présent site est édité par BONE, [forme juridique] au capital de [montant] euros, dont le siège " +
      "social est situé 27 avenue de la Baltique, 91140 Villebon-sur-Yvette, France.",
  ),
  liste([
    "Immatriculation : RCS [ville] sous le numéro [numéro]",
    "SIRET : [numéro]",
    "TVA intracommunautaire : [numéro]",
    "Téléphone : 01 80 86 60 66",
    "Courriel : bone@contact.fr",
  ]),
  titre("Directeur de la publication"),
  paragraphe(
    "[Prénom et nom], en sa qualité de [fonction]. Toute demande relative au contenu du site peut lui " +
      "être adressée à bone@contact.fr.",
  ),
  titre("Hébergement"),
  paragraphe(
    "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis " +
      "(vercel.com). Les contenus du site et les données saisies dans ses formulaires sont conservés " +
      "par Supabase, sur une infrastructure située dans l’Union européenne (Irlande).",
  ),
  titre("Conception et réalisation"),
  paragraphe("Le site a été conçu et développé par l’agence StriQ."),
  titre("Propriété intellectuelle"),
  paragraphe(
    "L’ensemble des éléments composant ce site — textes, images, illustrations, logotypes, charte " +
      "graphique, structure et code — est protégé par le droit de la propriété intellectuelle. Toute " +
      "reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite " +
      "préalable, est interdite.",
  ),
  paragraphe(
    "Les marques et logotypes de tiers reproduits sur ce site appartiennent à leurs titulaires " +
      "respectifs. Ils y figurent à titre d’illustration des environnements techniques maîtrisés par " +
      "l’équipe, et ne valent ni partenariat ni approbation de leur part.",
  ),
  titre("Liens vers d’autres sites"),
  paragraphe(
    "Ce site peut renvoyer vers des sites tiers. Ces liens sont proposés pour votre commodité : leur " +
      "contenu ne relève pas de la responsabilité de BONE, qui n’exerce aucun contrôle sur eux.",
  ),
  titre("Données personnelles et cookies"),
  paragraphe(
    "Le traitement des données saisies dans les formulaires du site est décrit dans la politique de " +
      "confidentialité. Le site ne dépose aucun cookie de mesure d’audience ni de publicité.",
  ),
  titre("Droit applicable"),
  paragraphe(
    "Les présentes mentions sont soumises au droit français. À défaut de résolution amiable, tout " +
      "litige relatif au site relève de la compétence des tribunaux français.",
  ),
]);

const corpsEn = racine([
  titre("Site publisher"),
  paragraphe(
    "This site is published by BONE, [legal form] with share capital of [amount] euros, registered " +
      "office at 27 avenue de la Baltique, 91140 Villebon-sur-Yvette, France.",
  ),
  liste([
    "Registration: Trade and Companies Register of [city] under number [number]",
    "SIRET: [number]",
    "VAT number: [number]",
    "Telephone: +33 1 80 86 60 66",
    "Email: bone@contact.fr",
  ]),
  titre("Publication director"),
  paragraphe(
    "[First name and surname], acting as [role]. Any request concerning the content of this site may " +
      "be sent to bone@contact.fr.",
  ),
  titre("Hosting"),
  paragraphe(
    "The site is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States " +
      "(vercel.com). Site content and data submitted through its forms are stored by Supabase, on " +
      "infrastructure located in the European Union (Ireland).",
  ),
  titre("Design and development"),
  paragraphe("The site was designed and built by StriQ."),
  titre("Intellectual property"),
  paragraphe(
    "Every element of this site — text, images, illustrations, logotypes, visual identity, structure " +
      "and code — is protected by intellectual property law. Any reproduction, representation or " +
      "adaptation, in whole or in part, without prior written permission, is prohibited.",
  ),
  paragraphe(
    "Third-party trade marks and logotypes shown on this site belong to their respective owners. They " +
      "appear here to illustrate the technical environments the team works in, and imply neither " +
      "partnership nor endorsement on their part.",
  ),
  titre("Links to other sites"),
  paragraphe(
    "This site may link to third-party sites. Those links are offered for your convenience: their " +
      "content is not the responsibility of BONE, which exercises no control over them.",
  ),
  titre("Personal data and cookies"),
  paragraphe(
    "The processing of data submitted through the site’s forms is described in the privacy policy. " +
      "The site sets no analytics or advertising cookies.",
  ),
  titre("Governing law"),
  paragraphe(
    "This notice is governed by French law. Failing an amicable settlement, any dispute relating to " +
      "the site falls within the jurisdiction of the French courts.",
  ),
]);

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "mentions-legales" } },
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

payload.logger.info("[mentions légales] page écrite dans les deux langues");
process.exit(0);
