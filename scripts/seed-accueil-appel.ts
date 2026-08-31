import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

await payload.updateGlobal({
  slug: "accueil",
  locale: "fr",
  data: {
    appel: {
      surtitre: "notre point de départ",
      titre: "Les bonnes décisions transforment votre infrastructure en avantage durable.",
      chapo: "Un diagnostic clair, sans engagement, pour savoir par où commencer.",
      cta: { libelle: "Demander un audit", chemin: "/contact" },
    },
  },
});

await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: {
    appel: {
      surtitre: "our starting point",
      titre: "The right decisions turn your infrastructure into a lasting advantage.",
      chapo: "A clear diagnosis, with no commitment, to know where to start.",
      cta: { libelle: "Request an audit", chemin: "/contact" },
    },
  },
});

payload.logger.info("[accueil] appel à l’action écrit dans les deux langues");
process.exit(0);
