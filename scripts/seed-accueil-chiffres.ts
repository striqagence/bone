import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

const fr = {
  surtitre: "le problème central, en chiffres",
  titre: "Ce que coûte l’improvisation",
  constat:
    "Une infrastructure pilotée sans vision claire coûte toujours plus cher qu’elle n’y paraît.",
  consequence:
    "Retards, dette technique et dépendance aux constructeurs s’accumulent silencieusement jusqu’à l’incident.",
  statistiques: [
    {
      valeur: "73",
      unite: "%",
      libelle: "PROJETS DÉPASSÉS",
      precision: "en délai ou en budget, faute de diagnostic initial",
    },
    {
      valeur: "3",
      unite: "%",
      libelle: "COÛT DE REMÉDIATION",
      precision: "comparé au coût d’une anticipation du risque",
    },
    {
      valeur: "60",
      unite: "%",
      libelle: "DÉPENDANCE CONSTRUCTEURS",
      precision: "des infrastructures auditées en dépendent fortement",
    },
  ],
};

const en = {
  surtitre: "the core problem, in figures",
  titre: "What improvisation costs",
  constat: "Infrastructure run without a clear view always costs more than it appears to.",
  consequence:
    "Delays, technical debt and vendor dependency build up quietly until the incident.",
  statistiques: [
    {
      valeur: "73",
      unite: "%",
      libelle: "PROJECTS OVERRUN",
      precision: "on time or on budget, for want of an initial diagnosis",
    },
    {
      valeur: "3",
      unite: "%",
      libelle: "REMEDIATION COST",
      precision: "compared with the cost of anticipating the risk",
    },
    {
      valeur: "60",
      unite: "%",
      libelle: "VENDOR DEPENDENCY",
      precision: "of audited infrastructures depend heavily on them",
    },
  ],
};

await payload.updateGlobal({ slug: "accueil", locale: "fr", data: { chiffres: fr } });

const pose = await payload.findGlobal({ slug: "accueil", locale: "fr", depth: 0 });

await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: {
    chiffres: {
      ...en,
      statistiques: en.statistiques.map((s, i) => ({
        ...s,
        id: pose.chiffres?.statistiques?.[i]?.id,
      })),
    },
  },
});

payload.logger.info("[accueil] section « en chiffres » écrite dans les deux langues");
process.exit(0);
