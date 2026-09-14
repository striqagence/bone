import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

const fr = {
  surtitre: "Notre rôle fondamental",
  titre: "Transformer la complexité technique en décisions claires.",
  chapo:
    "La technique reste exigeante ; nous la rendons lisible, pour que la décision coule de source.",
  etapes: [
    {
      numero: "01",
      titre: "Complexité technique",
      texte:
        "Réseau, stockage, systèmes : des couches interdépendantes, rarement lues comme un tout.",
      accentuee: false,
    },
    {
      numero: "02",
      titre: "Compréhension systémique",
      texte: "On cartographie les dépendances réelles pour révéler ce qui compte vraiment.",
      accentuee: false,
    },
    {
      numero: "03",
      titre: "Décisions claires",
      texte: "Un diagnostic net, des priorités hiérarchisées, une décision qu’on peut assumer.",
      accentuee: true,
    },
  ],
};

const en = {
  surtitre: "Our fundamental role",
  titre: "Turning technical complexity into clear decisions.",
  chapo: "The technical side stays demanding; we make it legible, so the decision follows on its own.",
  etapes: [
    {
      numero: "01",
      titre: "Technical complexity",
      texte:
        "Network, storage, systems: interdependent layers, rarely read as a whole.",
      accentuee: false,
    },
    {
      numero: "02",
      titre: "Systemic understanding",
      texte: "We map the real dependencies to reveal what actually matters.",
      accentuee: false,
    },
    {
      numero: "03",
      titre: "Clear decisions",
      texte: "A sharp diagnosis, ranked priorities, a decision you can stand behind.",
      accentuee: true,
    },
  ],
};

await payload.updateGlobal({ slug: "accueil", locale: "fr", data: { role: fr } });

const pose = await payload.findGlobal({ slug: "accueil", locale: "fr", depth: 0 });

await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: {
    role: {
      ...en,
      etapes: en.etapes.map((e, i) => ({ ...e, id: pose.role?.etapes?.[i]?.id })),
    },
  },
});

payload.logger.info("[accueil] section « Notre rôle » écrite dans les deux langues");
process.exit(0);
