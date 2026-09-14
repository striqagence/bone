import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

await payload.updateGlobal({
  slug: "accueil",
  locale: "fr",
  data: {
    promesse: {
      surtitre: "notre promesse",
      titre:
        "Donner aux décideurs tous les éléments pour choisir en toute confiance et en pleine connaissance de cause.",
    },
  },
});

await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: {
    promesse: {
      surtitre: "our promise",
      titre:
        "Giving decision-makers everything they need to choose with confidence and full knowledge of the facts.",
    },
  },
});

payload.logger.info("[accueil] section « Notre promesse » écrite dans les deux langues");
process.exit(0);
