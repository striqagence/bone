/**
 * Retire l'imputation d'intention du bloc « différenciation ».
 *
 *   npx payload run scripts/adoucir-differenciation.ts
 *
 * Le bloc oppose « l'approche habituelle » à celle de Bone, en deux colonnes
 * de trois puces lues en vis-à-vis. Le titre — « Là où les autres exécutent,
 * Bone aide à décider » — pose un contraste de méthode, ce qui se défend. La
 * troisième puce de gauche allait plus loin : « Optimiser pour le contrat,
 * plus que pour votre risque » ne décrit plus une méthode mais prête une
 * mauvaise foi au reste du marché. Une accusation que le visiteur ne peut pas
 * vérifier affaiblit les affirmations voisines, qui, elles, sont vérifiables.
 *
 * La puce de gauche décrit désormais ce sur quoi le modèle classique est jugé,
 * sans lui prêter de motif. Et la première puce de Bone reprend la formulation
 * demandée, accordée à la grammaire de sa colonne : les puces y complètent le
 * titre « Bone », donc troisième personne et pas « nous ». Elle corrige au
 * passage la coquille « avant de propose une solution ».
 *
 * Le bloc figure sur deux surfaces, l'accueil et le pôle Capital, avec les
 * mêmes textes mais des identifiants distincts. Le bloc du pôle Feed porte le
 * même type sans rien d'accusateur : il n'est pas touché.
 *
 * Les puces sont désignées par leur identifiant : leur rang changerait si
 * l'ordre était modifié au back-office.
 */
import { getPayload } from "payload";
import config from "@payload-config";

import { langues, type Langue } from "../src/lib/i18n";

const TEXTES: Record<string, Record<Langue, string>> = {
  /* Colonne de gauche : ce sur quoi le modèle classique est mesuré. */
  habituelle: {
    fr: "Être jugé sur la livraison, pas sur le risque évité.",
    en: "Being judged on delivery, not on the risk avoided.",
    zh: "衡量标准是交付本身，而不是规避掉的风险。",
  },
  /* Colonne de droite : la formulation demandée, à la troisième personne. */
  bone: {
    fr: "Vérifie qu’une solution répond au bon problème avant de la proposer.",
    en: "Checks that a solution answers the right problem before proposing it.",
    zh: "先确认方案对应的是真正的问题，再提出方案。",
  },
};

const EMPLACEMENTS = [
  {
    ou: { type: "global" as const, slug: "accueil" as const },
    habituelle: "6a954d393bf8f72b052db2b1",
    bone: "6a954d393bf8f72b052db2b2",
  },
  {
    ou: { type: "page" as const, id: 9, nom: "capital" },
    habituelle: "6a96f56fca7f277bf050089e",
    bone: "6a96f56fca7f277bf050089f",
  },
];

type Puce = { id?: string; texte?: string };
type Bloc = {
  blockType?: string;
  habituelle?: { puces?: Puce[] };
  bone?: { puces?: Puce[] };
};

const payload = await getPayload({ config });
let ecrites = 0;
const introuvables: string[] = [];

/** Réécrit les deux puces d'un jeu de sections et dit combien ont changé. */
const adoucir = (sections: Bloc[], ids: Record<string, string>, langue: Langue) => {
  let n = 0;
  for (const cote of ["habituelle", "bone"] as const) {
    const puce = sections
      .filter((s) => s.blockType === "differenciation")
      .flatMap((s) => s[cote]?.puces ?? [])
      .find((p) => p.id === ids[cote]);
    if (!puce) {
      introuvables.push(`${cote} (${ids[cote]}) en ${langue}`);
      continue;
    }
    const texte = TEXTES[cote][langue];
    if (puce.texte !== texte) n += 1;
    puce.texte = texte;
  }
  return n;
};

for (const { ou, ...ids } of EMPLACEMENTS) {
  for (const langue of langues) {
    if (ou.type === "global") {
      const global = await payload.findGlobal({ slug: ou.slug, locale: langue, depth: 0 });
      const sections = (global.sections ?? []) as Bloc[];
      const n = adoucir(sections, ids, langue);
      if (n) {
        await payload.updateGlobal({ slug: ou.slug, locale: langue, data: { sections } as never });
        ecrites += n;
      }
      console.log(`global ${ou.slug} [${langue}] : ${n} puce(s) réécrite(s)`);
    } else {
      const page = await payload.findByID({ collection: "pages", id: ou.id, locale: langue, depth: 0 });
      const sections = (page.sections ?? []) as Bloc[];
      const n = adoucir(sections, ids, langue);
      if (n) {
        /* Pas de `draft: true` : la page est publiée, et un enregistrement en
           brouillon n'irait que dans la table des versions. */
        await payload.update({
          collection: "pages",
          id: ou.id,
          locale: langue,
          data: { sections, _status: page._status ?? "published" } as never,
        });
        ecrites += n;
      }
      console.log(`page ${ou.nom} [${langue}] : ${n} puce(s) réécrite(s)`);
    }
  }
}

console.log(`\n${ecrites} puce(s) réécrite(s) au total.`);
if (introuvables.length) {
  console.error("Puces introuvables :", introuvables.join(", "));
  process.exit(1);
}
