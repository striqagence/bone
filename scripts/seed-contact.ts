import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

const DOSSIER =
  "/private/tmp/claude-501/-Users-audreybraun/9252f681-a78f-45ef-b4cc-a15965bdb178/scratchpad/photos/pretes";

const payload = await getPayload({ config });

async function media(fichier: string, altFr: string, altEn: string) {
  const { docs } = await payload.find({
    collection: "media",
    where: { filename: { equals: fichier } },
    limit: 1,
  });
  const doc =
    docs[0] ??
    (await payload.create({
      collection: "media",
      locale: "fr",
      filePath: path.join(DOSSIER, fichier),
      data: { alt: altFr },
    }));
  await payload.update({ collection: "media", id: doc.id, locale: "en", data: { alt: altEn } });
  return doc.id;
}

/**
 * Coordonnées relevées sur OpenStreetMap pour le 27 avenue de la Baltique.
 * Le plan n'est plus une image : c'est la carte elle-même, centrée là.
 */
const carte = {
  latitude: 48.6915304,
  longitude: 2.2151003,
  zoom: 16,
};

const { docs: photos } = await payload.find({
  collection: "media",
  where: { filename: { equals: "article-exemple.jpg" } },
  limit: 1,
});

const profils = [
  { valeur: "dsi", fr: "DSI", en: "CIO" },
  { valeur: "rssi", fr: "RSSI", en: "CISO" },
  { valeur: "technique", fr: "Dir. technique", en: "Head of engineering" },
  { valeur: "infra", fr: "Resp. infra", en: "Infrastructure lead" },
  { valeur: "dirigeant", fr: "Dirigeant", en: "Executive" },
];

const fr = {
  surtitre: "Première étape, non engageante",
  titre: "Demandez votre diagnostic.",
  description:
    "Dites-nous votre rôle : on adapte le point d’entrée (diagnostic 2h, audit ciblé, health check ou appel technique).",
  mentionChamps: "Tous les champs sont obligatoires.",
  profils: profils.map((p) => ({ valeur: p.valeur, libelle: p.fr })),
  libelles: {
    vousEtes: "Vous êtes",
    nom: "Nom",
    prenom: "Prénom",
    email: "E-mail pro",
    telephone: "Téléphone",
    contexte: "Votre contexte",
    contextePlaceholder: "Décrivez-nous votre demande",
    envoyer: "Envoyer ma demande",
    mentionLegale:
      "Vos coordonnées servent uniquement à répondre à votre demande. Elles ne sont ni revendues, ni utilisées à d’autres fins.",
    succes:
      "Votre demande a bien été envoyée. Un membre de l’équipe BONE vous recontacte sous 24 à 48h.",
    erreur:
      "Une erreur est survenue lors de l’envoi. Merci de réessayer, ou de nous contacter directement par email.",
  },
  carte: { ...carte, intitule: "Bone, 27 avenue de la Baltique, Villebon-sur-Yvette" },
  coordonnees: {
    badge: "coordonnées",
    adresse: "27 Av. de la Baltique, 91140 Villebon-sur-Yvette",
    contact: "bone@contact.fr · 01 80 86 60 66 · LinkedIn",
  },
  faq: {
    surtitre: "Questions fréquentes",
    titre: "Vos questions, nos réponses franches.",
    image: photos[0]?.id,
    questions: [
      {
        question: "Le diagnostic est-il payant ?",
        reponse:
          "Non, le premier diagnostic est offert et sans engagement. Seules les missions qui en découlent sont facturées, sur devis.",
      },
      {
        question: "Sous quel délai serai-je recontacté ?",
        reponse: "Une réponse est apportée sous 24 à 48 heures ouvrées.",
      },
      {
        question: "Faut-il préparer des documents avant l’échange ?",
        reponse:
          "Rien n’est obligatoire. Si vous les avez sous la main, un schéma d’architecture, un inventaire du parc ou la liste de vos derniers incidents rendent le premier échange plus concret.",
      },
    ],
  },
  appel: {
    surtitre: "notre contenu expert",
    titre: "Pas encore prêt à échanger ? Suivez notre contenu expert.",
    chapo: "Pédagogie · Déconstruction · Analyse · Performance · Durabilité IT",
    cta: { libelle: "Nous suivre sur", url: "https://www.linkedin.com" },
  },
};

const en = {
  ...fr,
  surtitre: "A first step, with no commitment",
  titre: "Request your diagnosis.",
  description:
    "Tell us your role: we adapt the entry point (2h diagnosis, targeted audit, health check or technical call).",
  mentionChamps: "All fields are required.",
  profils: profils.map((p) => ({ valeur: p.valeur, libelle: p.en })),
  libelles: {
    vousEtes: "You are",
    nom: "Last name",
    prenom: "First name",
    email: "Work e-mail",
    telephone: "Phone",
    contexte: "Your context",
    contextePlaceholder: "Tell us about your request",
    envoyer: "Send my request",
    mentionLegale:
      "Your details are used only to answer your request. They are neither sold on nor used for anything else.",
    succes: "Your request has been sent. A member of the BONE team will get back to you within 24 to 48 hours.",
    erreur: "Something went wrong while sending. Please try again, or contact us directly by email.",
  },
  carte: { ...carte, intitule: "Bone, 27 avenue de la Baltique, Villebon-sur-Yvette, France" },
  coordonnees: {
    badge: "contact details",
    adresse: "27 Av. de la Baltique, 91140 Villebon-sur-Yvette, France",
    contact: "bone@contact.fr · +33 1 80 86 60 66 · LinkedIn",
  },
  faq: {
    ...fr.faq,
    surtitre: "Frequently asked questions",
    titre: "Your questions, our straight answers.",
    questions: [
      {
        question: "Is the diagnosis chargeable?",
        reponse:
          "No, the first diagnosis is free and non-binding. Only the engagements that follow are billed, against a quote.",
      },
      {
        question: "How soon will I be contacted?",
        reponse: "We reply within 24 to 48 working hours.",
      },
      {
        question: "Do I need to prepare documents beforehand?",
        reponse:
          "Nothing is required. If you have them to hand, an architecture diagram, an estate inventory or a list of your recent incidents make the first conversation more concrete.",
      },
    ],
  },
  appel: {
    surtitre: "our expert content",
    titre: "Not ready to talk yet? Follow our expert content.",
    chapo: "Teaching · Unpacking · Analysis · Performance · Sustainable IT",
    cta: { libelle: "Follow us on", url: "https://www.linkedin.com" },
  },
};

await payload.updateGlobal({ slug: "contact", locale: "fr", data: fr });

const pose = await payload.findGlobal({ slug: "contact", locale: "fr", depth: 0 });

await payload.updateGlobal({
  slug: "contact",
  locale: "en",
  data: {
    ...en,
    profils: en.profils.map((p, i) => ({ ...p, id: pose.profils?.[i]?.id })),
    faq: {
      ...en.faq,
      questions: en.faq.questions.map((q, i) => ({ ...q, id: pose.faq?.questions?.[i]?.id })),
    },
  },
});

payload.logger.info("[contact] page écrite dans les deux langues");
process.exit(0);
