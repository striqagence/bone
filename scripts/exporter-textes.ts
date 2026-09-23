/**
 * Extrait tous les textes traduisibles du site, dans la langue demandée.
 *
 *   npx payload run scripts/exporter-textes.ts fr chemin/de/sortie.json
 *
 * L'écriture se fait dans un fichier et non sur la sortie standard : Payload y
 * mêle ses propres journaux, qui tronquent le JSON.
 */
import { writeFileSync } from "node:fs";

import { getPayload } from "payload";
import config from "@payload-config";

import { COLLECTIONS, GLOBAUX, parcourir } from "./traduction-parcours";

const destination = process.argv[process.argv.length - 1];
const langue = (process.argv[process.argv.length - 2] || "fr") as "fr" | "en" | "zh";
const payload = await getPayload({ config });

const sortie: Record<string, Record<string, string>> = {};

for (const collection of COLLECTIONS) {
  const { docs } = await payload.find({
    collection,
    locale: langue,
    limit: 500,
    depth: 0,
    overrideAccess: true,
  });
  for (const doc of docs) {
    const cle = `${collection}:${doc.id}`;
    const textes: Record<string, string> = {};
    parcourir(doc, ({ chemin, texte }) => {
      textes[chemin] = texte;
    });
    if (Object.keys(textes).length) sortie[cle] = textes;
  }
}

for (const global of GLOBAUX) {
  const doc = await payload.findGlobal({
    slug: global,
    locale: langue,
    depth: 0,
    overrideAccess: true,
  });
  const textes: Record<string, string> = {};
  parcourir(doc, ({ chemin, texte }) => {
    textes[chemin] = texte;
  });
  if (Object.keys(textes).length) sortie[`global:${global}`] = textes;
}

writeFileSync(destination, JSON.stringify(sortie, null, 2));
console.log(
  `  ${Object.keys(sortie).length} documents, ` +
    `${Object.values(sortie).reduce((n, o) => n + Object.keys(o).length, 0)} chaînes écrites dans ${destination}`,
);
process.exit(0);
