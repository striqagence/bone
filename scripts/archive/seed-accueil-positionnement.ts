import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

const fr = {
  surtitre: "positionnement",
  titre: "Ce qui fait la différence avec Bone",
  gauche: {
    titre: "Nos domaines d’expertise",
    sousTitre: "Ce que nous maîtrisons de bout en bout",
    entrees: [
      { titre: "Réseau", texte: "Switches, routeurs, pare-feux : la circulation de vos données." },
      { titre: "Stockage", texte: "Baies, disques, SAN : la disponibilité de vos données." },
      { titre: "Systèmes", texte: "Serveurs, virtualisation, licences : le socle de vos applications." },
      { titre: "Accompagnement", texte: "Un regard qui challenge la demande, pas un simple ticket exécuté." },
    ],
  },
  droite: {
    titre: "Notre vraie valeur",
    sousTitre: "Ce qui compte vraiment pour nous",
    entrees: [
      {
        titre: "Performance durable",
        texte:
          "Un parc informatique conçu pour tenir dans la durée et rester performant année après année.",
      },
      {
        titre: "Décisions sécurisées",
        texte: "Une architecture pensée pour maîtriser les risques et protéger vos activités.",
      },
      {
        titre: "Transversalité",
        texte:
          "Réseau, stockage et systèmes abordés comme un tout cohérent, pour une vision d’ensemble.",
      },
      {
        titre: "Expertise pointue",
        texte:
          "Des ingénieurs seniors qui comprennent vos enjeux et parlent le langage de la technique.",
      },
    ],
  },
};

const en = {
  surtitre: "positioning",
  titre: "What makes the difference with Bone",
  gauche: {
    titre: "Our fields of expertise",
    sousTitre: "What we master end to end",
    entrees: [
      { titre: "Network", texte: "Switches, routers, firewalls: how your data travels." },
      { titre: "Storage", texte: "Arrays, disks, SAN: how available your data is." },
      { titre: "Systems", texte: "Servers, virtualisation, licences: the base your applications run on." },
      { titre: "Support", texte: "A view that challenges the request, not a ticket simply executed." },
    ],
  },
  droite: {
    titre: "Our real value",
    sousTitre: "What genuinely matters to us",
    entrees: [
      {
        titre: "Lasting performance",
        texte: "An IT estate built to last and to stay performant year after year.",
      },
      {
        titre: "Secured decisions",
        texte: "An architecture designed to master risk and protect your operations.",
      },
      {
        titre: "Cross-cutting view",
        texte: "Network, storage and systems addressed as one coherent whole.",
      },
      {
        titre: "Deep expertise",
        texte: "Senior engineers who understand your stakes and speak the language of the technology.",
      },
    ],
  },
};

await payload.updateGlobal({ slug: "accueil", locale: "fr", data: { positionnement: fr } });

const pose = await payload.findGlobal({ slug: "accueil", locale: "fr", depth: 0 });

const avecIds = (cote: "gauche" | "droite") => ({
  ...en[cote],
  entrees: en[cote].entrees.map((e, i) => ({
    ...e,
    id: pose.positionnement?.[cote]?.entrees?.[i]?.id,
  })),
});

await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: {
    positionnement: { ...en, gauche: avecIds("gauche"), droite: avecIds("droite") },
  },
});

payload.logger.info("[accueil] section « Positionnement » écrite dans les deux langues");
process.exit(0);
