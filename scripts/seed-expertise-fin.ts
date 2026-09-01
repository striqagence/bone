import path from "path";
import { getPayload } from "payload";
import config from "@payload-config";

/** Complète Expertise : enjeux, bande des pôles et appel final. */
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

const photos = {
  nis2: await media("enjeu-nis2.jpg", "Écran affichant un tableau de conformité.", "Screen showing a compliance dashboard."),
  pra: await media("enjeu-pra.jpg", "Salle technique vue de nuit.", "Technical room seen at night."),
  dette: await media("enjeu-dette.jpg", "Câblage réseau dense dans une baie.", "Dense network cabling in a rack."),
  liens: await media("enjeu-liens.jpg", "Allée de serveurs en perspective.", "Server aisle in perspective."),
};

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "expertise" } },
  limit: 1,
  draft: true,
});
const id = docs[0]!.id;
const page = await payload.findByID({ collection: "pages", id, locale: "fr", depth: 0 });
const existantes = page.sections ?? [];

const enjeuxFr = {
  blockType: "enjeux" as const,
  surtitre: "Les enjeux que nous traitons",
  titreBas: "Ce qui inquiète vraiment les DSI et RSSI",
  cartes: [
    {
      picto: "securite" as const,
      titre: "NIS2 : l’impact réel sur vos infrastructures",
      description:
        "La directive NIS2 ne se limite pas à un enjeu juridique : elle impose des changements concrets sur votre architecture et vos process.",
      reponse: "Cartographie des écarts entre votre existant et les exigences de conformité.",
      image: photos.nis2,
    },
    {
      picto: "dette" as const,
      titre: "PRA/PCA : au-delà du document, des plans testés",
      description:
        "Un plan de reprise qui n’a jamais été testé n’est qu’une hypothèse, pas une garantie.",
      reponse: "Simulation réelle de bascule pour valider les délais annoncés.",
      image: photos.pra,
    },
    {
      picto: "alerte" as const,
      titre: "Dette technique : la voir avant qu’elle ne coûte",
      description:
        "La dette technique ne s’annonce jamais elle-même : elle se révèle dans un incident, au pire moment.",
      reponse: "Diagnostic chiffré des zones de risque prioritaires sur votre parc.",
      image: photos.dette,
    },
    {
      picto: "liens" as const,
      titre: "Interdépendances réseau / stockage / systèmes",
      description:
        "Une décision sur une couche a toujours des conséquences sur les deux autres, souvent invisibles jusqu’à l’incident.",
      reponse: "Carte des dépendances croisées pour anticiper les effets domino.",
      image: photos.liens,
    },
  ],
};

const enjeuxEn = {
  ...enjeuxFr,
  surtitre: "The issues we handle",
  titreBas: "What really worries CIOs and CISOs",
  cartes: enjeuxFr.cartes.map((c, i) => ({
    ...c,
    titre: [
      "NIS2: the real impact on your infrastructure",
      "DRP/BCP: beyond the document, tested plans",
      "Technical debt: seeing it before it costs",
      "Network / storage / systems interdependencies",
    ][i],
    description: [
      "The NIS2 directive is not only a legal matter: it forces concrete changes to your architecture and your processes.",
      "A recovery plan that has never been tested is a hypothesis, not a guarantee.",
      "Technical debt never announces itself: it surfaces during an incident, at the worst moment.",
      "A decision on one layer always affects the other two, often invisibly until the incident.",
    ][i],
    reponse: [
      "Mapping the gaps between your estate and the compliance requirements.",
      "A real failover simulation to validate the announced recovery times.",
      "A costed diagnosis of the priority risk areas across your estate.",
      "A cross-dependency map to anticipate domino effects.",
    ][i],
  })),
};

/** Titre non affiché, mais lu : cf. la bande des pôles de « Nos compétences ». */
const bandeFr = {
  blockType: "bandePoles" as const,
  avecEnTete: false,
  titreHaut: "Trois pôles, une seule logique :",
  titreBas: "sécuriser vos décisions d’infrastructure.",
};
const appelFr = {
  blockType: "appelAction" as const,
  surtitre: "notre point de départ",
  titre: "On part de votre problème.",
  chapo: "Un diagnostic clair, sans engagement, pour savoir par où commencer.",
  cta: { libelle: "Demander un audit", chemin: "/contact" },
};
const bandeEn = {
  blockType: "bandePoles" as const,
  avecEnTete: false,
  titreHaut: "Three divisions, one logic:",
  titreBas: "making your infrastructure decisions safe.",
};
const appelEn = {
  blockType: "appelAction" as const,
  surtitre: "our starting point",
  titre: "We start from your problem.",
  chapo: "A clear diagnosis, with no commitment, to know where to start.",
  cta: { libelle: "Request an audit", chemin: "/contact" },
};

// L'ordre de la maquette : grille, couches, enjeux, FAQ, à lire aussi, bande, appel.
const [grille, couches, faq, articles] = existantes;

await payload.update({
  collection: "pages",
  id,
  locale: "fr",
  data: {
    sections: [grille, couches, enjeuxFr, faq, articles, bandeFr, appelFr],
    _status: "published",
  },
});

const pose = await payload.findByID({ collection: "pages", id, locale: "fr", depth: 0 });
const blocEnjeux = pose.sections?.[2];
const blocAppel = pose.sections?.[6];
const blocBande = pose.sections?.[5];

/**
 * Les blocs que ce script ne réécrit pas sont relus en anglais, sans repli sur
 * le français : renvoyés depuis la lecture française, ils auraient recopié le
 * français dans la version anglaise — et un repli, lui, aurait figé en base un
 * texte qui n'était qu'affiché à défaut de traduction.
 */
const poseEn = await payload.findByID({
  collection: "pages",
  id,
  locale: "en",
  fallbackLocale: false,
  depth: 0,
});

await payload.update({
  collection: "pages",
  id,
  locale: "en",
  data: {
    sections: [
      poseEn.sections![0],
      poseEn.sections![1],
      {
        ...enjeuxEn,
        id: blocEnjeux?.id,
        cartes: enjeuxEn.cartes.map((c, i) => ({
          ...c,
          id: blocEnjeux && "cartes" in blocEnjeux ? blocEnjeux.cartes?.[i]?.id : undefined,
        })),
      },
      poseEn.sections![3],
      poseEn.sections![4],
      { ...bandeEn, id: blocBande?.id },
      { ...appelEn, id: blocAppel?.id },
    ],
  },
});

payload.logger.info("[expertise] page complétée dans les deux langues");
process.exit(0);
