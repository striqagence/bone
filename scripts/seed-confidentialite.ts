import { getPayload } from "payload";
import config from "@payload-config";

import { liste, paragraphe, racine, titre } from "./lexical";

/**
 * Politique de confidentialité.
 *
 * Le texte décrit ce que le site fait réellement : deux formulaires, deux
 * sous-traitants techniques, et les tuiles de la carte. Il ne mentionne ni
 * mesure d'audience ni publicité, le site n'en ayant pas — et il faudra le
 * reprendre le jour où l'un ou l'autre sera ajouté.
 */
const payload = await getPayload({ config });

const heroFr = {
  surtitre: "Vos données",
  accroche: "Politique de confidentialité",
  description:
    "Ce que le site collecte, pourquoi, pendant combien de temps, et comment reprendre la main. " +
    "Dernière mise à jour : septembre 2026.",
};

const heroEn = {
  surtitre: "Your data",
  accroche: "Privacy policy",
  description:
    "What the site collects, why, for how long, and how to take back control. " +
    "Last updated: September 2026.",
};

const corpsFr = racine([
  titre("Qui est responsable de vos données"),
  paragraphe(
    "BONE, dont le siège est situé 27 avenue de la Baltique, 91140 Villebon-sur-Yvette, est " +
      "responsable des traitements décrits ici. Pour toute question, écrivez à ⟦courriel⟧.",
  ),

  titre("Ce que nous collectons, et pourquoi"),
  paragraphe(
    "Le site ne collecte que ce que vous y saisissez. Il n’y a ni compte, ni profilage, ni " +
      "reconstitution de votre navigation.",
  ),
  paragraphe(
    "Formulaire de contact — votre rôle, votre nom, votre prénom, votre adresse professionnelle, " +
      "votre numéro de téléphone et la description de votre demande. Ces données servent à vous " +
      "répondre et à préparer le premier échange. La base légale est l’exécution de mesures " +
      "précontractuelles prises à votre demande.",
  ),
  paragraphe(
    "Inscription à la lettre d’information — votre adresse électronique et la langue de la page " +
      "depuis laquelle vous vous êtes inscrit. Ces données servent à vous envoyer une analyse " +
      "mensuelle. La base légale est votre consentement, que vous pouvez retirer à tout moment.",
  ),

  titre("Combien de temps nous les conservons"),
  liste([
    "Demandes de contact : trois ans à compter de notre dernier échange.",
    "Inscriptions à la lettre d’information : jusqu’au retrait de votre consentement, puis trois ans au titre de la preuve de ce consentement.",
  ]),

  titre("Qui y a accès"),
  paragraphe(
    "Vos données sont accessibles à l’équipe de BONE chargée de vous répondre, et aux prestataires " +
      "techniques qui font fonctionner le site. Elles ne sont ni vendues, ni louées, ni transmises à " +
      "des fins commerciales.",
  ),
  liste([
    "Vercel Inc. (États-Unis) héberge le site. Les transferts hors Union européenne qui en découlent sont encadrés par les clauses contractuelles types de la Commission européenne.",
    "Supabase conserve la base de données et les fichiers, sur une infrastructure située dans l’Union européenne (Irlande).",
    "La Fondation OpenStreetMap fournit les images de la carte de la page de contact : l’affichage de cette carte transmet votre adresse IP à ses serveurs.",
  ]),

  titre("Cookies"),
  paragraphe(
    "Le site ne dépose aucun cookie de mesure d’audience, de publicité ou de réseau social. Seul " +
      "l’espace d’administration, réservé à l’équipe, utilise un cookie de session nécessaire à la " +
      "connexion. Aucun bandeau de consentement n’est donc affiché.",
  ),

  titre("Vos droits"),
  paragraphe(
    "Vous disposez d’un droit d’accès, de rectification, d’effacement et de portabilité de vos " +
      "données, ainsi que d’un droit d’opposition et de limitation de leur traitement. Vous pouvez " +
      "retirer votre consentement à la lettre d’information à tout moment.",
  ),
  paragraphe(
    "Pour exercer ces droits, écrivez à ⟦courriel⟧. Une réponse vous est apportée dans un délai " +
      "d’un mois. Si la réponse ne vous satisfait pas, vous pouvez saisir la Commission nationale de " +
      "l’informatique et des libertés (CNIL), 3 place de Fontenoy, 75007 Paris, cnil.fr.",
  ),

  titre("Sécurité"),
  paragraphe(
    "Les échanges avec le site sont chiffrés. L’accès aux données saisies est réservé aux comptes " +
      "administrateurs, protégés par mot de passe.",
  ),

  titre("Évolution de cette politique"),
  paragraphe(
    "Cette politique est mise à jour lorsque les traitements changent. La date de dernière mise à " +
      "jour figure en tête de page.",
  ),
]);

const corpsEn = racine([
  titre("Who is responsible for your data"),
  paragraphe(
    "BONE, registered office at 27 avenue de la Baltique, 91140 Villebon-sur-Yvette, France, is the " +
      "controller for the processing described here. For any question, write to ⟦courriel⟧.",
  ),

  titre("What we collect, and why"),
  paragraphe(
    "The site collects only what you type into it. There is no account, no profiling, and no " +
      "reconstruction of your browsing.",
  ),
  paragraphe(
    "Contact form — your role, surname, first name, work email address, telephone number and the " +
      "description of your request. This data is used to answer you and to prepare the first " +
      "conversation. The legal basis is the performance of pre-contractual steps taken at your request.",
  ),
  paragraphe(
    "Newsletter subscription — your email address and the language of the page you subscribed from. " +
      "This data is used to send you a monthly analysis. The legal basis is your consent, which you " +
      "may withdraw at any time.",
  ),

  titre("How long we keep it"),
  liste([
    "Contact requests: three years from our last exchange.",
    "Newsletter subscriptions: until you withdraw your consent, then three years as proof of that consent.",
  ]),

  titre("Who has access"),
  paragraphe(
    "Your data is accessible to the BONE team answering you, and to the technical providers that run " +
      "the site. It is neither sold, rented, nor passed on for commercial purposes.",
  ),
  liste([
    "Vercel Inc. (United States) hosts the site. The resulting transfers outside the European Union are covered by the European Commission’s standard contractual clauses.",
    "Supabase holds the database and the files, on infrastructure located in the European Union (Ireland).",
    "The OpenStreetMap Foundation supplies the map imagery on the contact page: displaying that map sends your IP address to its servers.",
  ]),

  titre("Cookies"),
  paragraphe(
    "The site sets no analytics, advertising or social network cookies. Only the administration area, " +
      "reserved for the team, uses a session cookie required to sign in. No consent banner is " +
      "therefore displayed.",
  ),

  titre("Your rights"),
  paragraphe(
    "You have the right to access, rectify, erase and port your data, as well as the right to object " +
      "to and restrict its processing. You may withdraw your consent to the newsletter at any time.",
  ),
  paragraphe(
    "To exercise these rights, write to ⟦courriel⟧. You will receive a reply within one month. " +
      "If that reply does not satisfy you, you may refer the matter to the French data protection " +
      "authority (CNIL), 3 place de Fontenoy, 75007 Paris, cnil.fr.",
  ),

  titre("Security"),
  paragraphe(
    "Exchanges with the site are encrypted. Access to submitted data is restricted to administrator " +
      "accounts, protected by password.",
  ),

  titre("Changes to this policy"),
  paragraphe(
    "This policy is updated whenever the processing changes. The date of the last update appears at " +
      "the top of the page.",
  ),
]);

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "politique-de-confidentialite" } },
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

payload.logger.info("[confidentialité] page écrite dans les deux langues");
process.exit(0);
