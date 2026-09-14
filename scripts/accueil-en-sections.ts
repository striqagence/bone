import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Déplace les sections figées de l'accueil dans le champ de blocs.
 *
 * Les onze groupes deviennent onze blocs, dans l'ordre où la page les affiche.
 * Sept d'entre eux existaient déjà comme blocs des autres pages et sont repris
 * tels quels ; quatre ont été dérivés des groupes, champ pour champ, pour que
 * la reprise soit une copie et non une transcription.
 *
 * Deux renommages seulement, imposés par les blocs d'accueil :
 * « poles » devient une bande de pôles, « profils » des cartes d'enjeux, dont
 * la liste s'appelle `cartes` et non `liste`.
 *
 * Le script est rejouable : il n'écrit que si le champ est vide, sauf à passer
 * `--forcer`.
 */
const payload = await getPayload({ config });
const forcer = process.argv.includes("--forcer");

type Objet = Record<string, unknown>;

/**
 * Reporte les identifiants d'une structure sur l'autre, en parallèle.
 *
 * Les lignes d'un tableau localisé sont les mêmes dans les deux langues : sans
 * ce report, l'écriture anglaise créerait des doublons au lieu de compléter
 * les lignes françaises.
 */
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

/** Les onze sections, dans l'ordre de la page. */
const construire = (a: Objet): Objet[] => {
  const g = (nom: string) => (a[nom] ?? {}) as Objet;
  const poles = g("poles");
  const profils = g("profils");
  return [
    { blockType: "enBref", ...g("enBref") },
    { blockType: "constat", ...g("constat") },
    { blockType: "promesse", ...g("promesse") },
    { blockType: "positionnement", ...g("positionnement") },
    { blockType: "role", ...g("role") },
    {
      blockType: "bandePoles",
      // L'accueil affiche le surtitre de la bande, les pages de pôle non.
      avecEnTete: true,
      surtitre: poles.surtitre,
      titreHaut: poles.titreHaut,
      titreBas: poles.titreBas,
    },
    { blockType: "differenciation", ...g("differenciation") },
    { blockType: "chiffres", ...g("chiffres") },
    {
      blockType: "enjeux",
      surtitre: profils.surtitre,
      titreHaut: profils.titreHaut,
      titreBas: profils.titreBas,
      cartes: profils.liste,
    },
    { blockType: "faq", ...g("faq") },
    { blockType: "appelAction", ...g("appel") },
  ];
};

const avant = (await payload.findGlobal({ slug: "accueil", locale: "fr", depth: 0 })) as unknown as Objet;
const dejaFait = Array.isArray(avant.sections) && avant.sections.length > 0;
if (dejaFait && !forcer) {
  console.log(`  ${(avant.sections as unknown[]).length} sections déjà en place. Relancer avec --forcer pour réécrire.`);
  process.exit(0);
}

await payload.updateGlobal({
  slug: "accueil",
  locale: "fr",
  data: { sections: construire(avant) } as never,
});
const pose = (await payload.findGlobal({ slug: "accueil", locale: "fr", depth: 0 })) as unknown as Objet;
console.log(`  français : ${(pose.sections as unknown[]).length} sections écrites`);

const anglais = (await payload.findGlobal({
  slug: "accueil", locale: "en", depth: 0, fallbackLocale: false,
})) as unknown as Objet;
await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: { sections: greffer(pose.sections, construire(anglais)) } as never,
});
const poseEn = (await payload.findGlobal({ slug: "accueil", locale: "en", depth: 0 })) as unknown as Objet;
console.log(`  anglais  : ${(poseEn.sections as unknown[]).length} sections écrites`);

const memesIds =
  JSON.stringify((pose.sections as Objet[]).map((s) => s.id)) ===
  JSON.stringify((poseEn.sections as Objet[]).map((s) => s.id));
console.log(`  identifiants communs aux deux langues : ${memesIds ? "oui" : "NON"}`);
process.exit(0);
