/**
 * Réinjecte des traductions dans une langue, aux emplacements d'où elles ont
 * été extraites.
 *
 *   npx payload run scripts/importer-traductions.ts zh traductions-zh.json
 *
 * Le document de référence est relu en français à chaque passage, puis
 * recopié champ par champ : le chemin d'une chaîne désigne ainsi exactement
 * le même endroit qu'à l'extraction, y compris dans un corps d'article, où
 * les nœuds de texte n'ont pas de nom.
 *
 * Une chaîne sans traduction est laissée telle quelle plutôt que vidée :
 * Payload sert alors le français en repli, ce qui vaut mieux qu'un blanc.
 * Le compte des manquantes est affiché à la fin.
 */
import { readFileSync } from "node:fs";

import { getPayload } from "payload";
import config from "@payload-config";

import { COLLECTIONS, GLOBAUX, parcourir } from "./traduction-parcours";

const fichier = process.argv[process.argv.length - 1];
const langue = process.argv[process.argv.length - 2] as "en" | "zh";

if (!fichier?.endsWith(".json") || !["en", "zh"].includes(langue)) {
  console.error(
    "Usage : npx payload run scripts/importer-traductions.ts <langue> <fichier.json>",
  );
  process.exit(1);
}

const traductions: Record<string, Record<string, string>> = JSON.parse(
  readFileSync(fichier, "utf8"),
);
const payload = await getPayload({ config });

let ecrits = 0;
let remplacees = 0;
let manquantes = 0;
const sansTraduction: string[] = [];

/** Applique les traductions d'un document et dit combien ont servi. */
const appliquer = (document: unknown, textes: Record<string, string>) => {
  let n = 0;
  parcourir(document, ({ chemin, texte }) => {
    const traduit = textes[chemin];
    if (typeof traduit === "string" && traduit.trim() && traduit !== texte) {
      n += 1;
      return traduit;
    }
    if (!traduit) {
      manquantes += 1;
      if (sansTraduction.length < 8) sansTraduction.push(`${chemin} = « ${texte.slice(0, 40)} »`);
    }
    return undefined;
  });
  return n;
};

for (const collection of COLLECTIONS) {
  const { docs } = await payload.find({
    collection,
    locale: "fr",
    limit: 500,
    depth: 0,
    overrideAccess: true,
  });
  for (const doc of docs) {
    const textes = traductions[`${collection}:${doc.id}`];
    if (!textes) continue;
    const copie = structuredClone(doc) as unknown as Record<string, unknown>;
    const n = appliquer(copie, textes);
    if (n === 0) continue;
    await payload.update({
      collection,
      id: doc.id,
      locale: langue,
      data: copie as never,
      overrideAccess: true,
    });
    ecrits += 1;
    remplacees += n;
  }
}

for (const global of GLOBAUX) {
  const textes = traductions[`global:${global}`];
  if (!textes) continue;
  const doc = await payload.findGlobal({
    slug: global,
    locale: "fr",
    depth: 0,
    overrideAccess: true,
  });
  const copie = structuredClone(doc) as unknown as Record<string, unknown>;
  const n = appliquer(copie, textes);
  if (n === 0) continue;
  await payload.updateGlobal({
    slug: global,
    locale: langue,
    data: copie as never,
    overrideAccess: true,
  });
  ecrits += 1;
  remplacees += n;
}

console.log(`  ${remplacees} chaînes traduites dans ${ecrits} documents`);
if (manquantes) {
  console.log(`  ${manquantes} sans traduction, laissées en repli français :`);
  for (const s of sansTraduction) console.log(`    ${s}`);
}
process.exit(0);
