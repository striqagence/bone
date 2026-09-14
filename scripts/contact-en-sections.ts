import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Déplace la FAQ et l'appel à l'action du contact dans le champ de blocs.
 *
 * Le formulaire, le plan et l'encart de coordonnées restent des champs fixes :
 * ils sont la page elle-même, pas des sections qu'on réordonne. Seul ce qui
 * les suit devient composable.
 *
 * Comme pour l'accueil, l'anglais reprend les identifiants posés par le
 * français : sans ce report, l'écriture anglaise créerait des doublons au lieu
 * de compléter les lignes existantes.
 */
const payload = await getPayload({ config });
const forcer = process.argv.includes("--forcer");

type Objet = Record<string, unknown>;

function greffer(source: unknown, cible: unknown): unknown {
  if (Array.isArray(source) && Array.isArray(cible)) {
    return cible.map((element, i) => greffer(source[i], element));
  }
  if (source && cible && typeof source === "object" && typeof cible === "object") {
    const s = source as Objet;
    const c = cible as Objet;
    const sortie: Objet = { ...c };
    if (typeof s.id === "string" || typeof s.id === "number") sortie.id = s.id;
    for (const cle of Object.keys(c)) {
      if (cle !== "id") sortie[cle] = greffer(s[cle], c[cle]);
    }
    return sortie;
  }
  return cible;
}

const construire = (c: Objet): Objet[] => [
  { blockType: "faq", ...((c.faq ?? {}) as Objet) },
  { blockType: "appelAction", ...((c.appel ?? {}) as Objet) },
];

const avant = (await payload.findGlobal({
  slug: "contact", locale: "fr", depth: 0,
})) as unknown as Objet;

if (Array.isArray(avant.sections) && avant.sections.length > 0 && !forcer) {
  console.log(`  ${(avant.sections as unknown[]).length} sections déjà en place. Relancer avec --forcer pour réécrire.`);
  process.exit(0);
}

await payload.updateGlobal({
  slug: "contact", locale: "fr", data: { sections: construire(avant) } as never,
});
const pose = (await payload.findGlobal({
  slug: "contact", locale: "fr", depth: 0,
})) as unknown as Objet;
console.log(`  français : ${(pose.sections as unknown[]).length} sections écrites`);

const anglais = (await payload.findGlobal({
  slug: "contact", locale: "en", depth: 0, fallbackLocale: false,
})) as unknown as Objet;
await payload.updateGlobal({
  slug: "contact", locale: "en",
  data: { sections: greffer(pose.sections, construire(anglais)) } as never,
});
const poseEn = (await payload.findGlobal({
  slug: "contact", locale: "en", depth: 0,
})) as unknown as Objet;
console.log(`  anglais  : ${(poseEn.sections as unknown[]).length} sections écrites`);

const memesIds =
  JSON.stringify((pose.sections as Objet[]).map((s) => s.id)) ===
  JSON.stringify((poseEn.sections as Objet[]).map((s) => s.id));
console.log(`  identifiants communs aux deux langues : ${memesIds ? "oui" : "NON"}`);
process.exit(0);
