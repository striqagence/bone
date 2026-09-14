import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Section « Nos 3 pôles » : ses titres, et les accroches courtes portées par
 * les pages de pôle. Le surtitre des pages fournit déjà la ligne de résumé
 * (« Réseau • Stockage • systèmes »), leur photo la bande.
 */
const payload = await getPayload({ config });

const accroches = {
  expertise: { fr: "Pôle cœur", en: "Core division" },
  capital: { fr: "Complément stratégique", en: "Strategic complement" },
  feed: { fr: "Vertical business", en: "Vertical business" },
};

const surtitres = {
  expertise: { fr: "Réseau • Stockage • systèmes", en: "Network • Storage • systems" },
  capital: { fr: "Jusqu’à 70% d’économie vs neuf", en: "Up to 70% savings versus new" },
  feed: { fr: "Broadcast • Post-production", en: "Broadcast • Post-production" },
};

for (const [slug, textes] of Object.entries(accroches)) {
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
    draft: true,
  });
  if (!docs[0]) continue;
  const cle = slug as keyof typeof surtitres;
  await payload.update({
    collection: "pages",
    id: docs[0].id,
    locale: "fr",
    data: { accrocheCourte: textes.fr, surtitre: surtitres[cle].fr, _status: "published" },
  });
  await payload.update({
    collection: "pages",
    id: docs[0].id,
    locale: "en",
    data: { accrocheCourte: textes.en, surtitre: surtitres[cle].en },
  });
  payload.logger.info(`[pôles] accroche de ${slug}`);
}

await payload.updateGlobal({
  slug: "accueil",
  locale: "fr",
  data: {
    poles: {
      surtitre: "nos 3 pôles",
      titreHaut: "Trois pôles, une seule logique :",
      titreBas: "sécuriser vos décisions d’infrastructure.",
    },
  },
});

await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: {
    poles: {
      surtitre: "our 3 divisions",
      titreHaut: "Three divisions, one logic:",
      titreBas: "making your infrastructure decisions safe.",
    },
  },
});

payload.logger.info("[accueil] section « Nos 3 pôles » écrite dans les deux langues");
process.exit(0);
