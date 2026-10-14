/**
 * Lève la contradiction de la FAQ sur la vente de matériel.
 *
 *   npx payload run scripts/corriger-faq-materiel.ts
 *
 * La FAQ répondait deux choses incompatibles à deux questions voisines :
 * « On ne revend pas de matériel » à « Que fait exactement Bone ? », puis
 * « Bone est un cabinet de conseil qui préconise et peut vendre le matériel
 * adéquat » à la question suivante. Le visiteur ne pouvait plus situer le
 * modèle économique, et c'est l'indépendance — le cœur du discours — qui s'en
 * trouvait affaiblie.
 *
 * Deux divergences se cachaient derrière la première. Le français avait été
 * corrigé au back-office sur la seule réponse 2 ; l'anglais et le chinois sont
 * restés sur la version d'avant (« Bone resells no hardware », « 不转售任何
 * 硬件 »), si bien que les trois langues du site ne disaient pas la même chose.
 * Et le même couple de questions figure sur trois surfaces — l'accueil, le pôle
 * Expertise et le pôle Capital — qui avaient déjà divergé entre elles.
 *
 * Le parti retenu : une seule formulation, identique partout et dans les trois
 * langues. Elle assume l'activité matérielle au lieu de la nier, et fonde
 * l'indépendance sur ce qui la rend vérifiable — l'absence d'engagement envers
 * un constructeur — plutôt que sur l'absence de vente.
 *
 * Les réponses sont désignées par l'identifiant de leur question, pas par leur
 * rang : les blocs FAQ ne sont pas au même indice d'une page à l'autre, et un
 * bloc déplacé au back-office ferait écrire la correction au mauvais endroit.
 */
import { getPayload } from "payload";
import config from "@payload-config";

import { langues, type Langue } from "../src/lib/i18n";

/** Les deux réponses à réécrire, dans les trois langues. */
const REPONSES: Record<string, Record<Langue, string>> = {
  /* « Que fait exactement Bone ? » — la phrase finale niait la vente. */
  quoi: {
    fr:
      "Bone conseille et architecture des infrastructures IT : réseau, stockage, " +
      "systèmes et sécurité. On audite l’existant, on pose un diagnostic, on " +
      "hiérarchise les risques et on accompagne la mise en œuvre, jusqu’à la " +
      "fourniture du matériel quand le projet le demande.",
    en:
      "Bone advises on and architects IT infrastructure: network, storage, systems " +
      "and security. We audit what exists, make a diagnosis, rank the risks and " +
      "support the implementation, through to supplying the hardware when the " +
      "project calls for it.",
    zh:
      "BONE 为 IT 基础设施提供咨询与架构设计：网络、存储、系统与安全。我们评估现状、" +
      "给出诊断、梳理风险优先级，并陪伴实施落地；项目需要时，硬件也由我们供应。",
  },
  /* « Bone est-il un revendeur de matériel ou un cabinet de conseil ? » */
  revendeur: {
    fr:
      "Un cabinet de conseil, qui intervient aussi en intégration et en fourniture " +
      "de matériel lorsque le projet le nécessite. Nos recommandations ne sont " +
      "limitées à aucun constructeur : nous privilégions les solutions adaptées à " +
      "vos contraintes techniques et budgétaires, en neuf comme en reconditionné.",
    en:
      "A consultancy, which also handles integration and hardware supply when the " +
      "project calls for it. Our recommendations are tied to no single " +
      "manufacturer: we favour the solutions that fit your technical and budget " +
      "constraints, new or refurbished.",
    zh:
      "是咨询公司，同时在项目需要时承担集成与硬件供应。我们的建议不绑定任何一家厂商：" +
      "全新与翻新设备皆在考虑之列，我们优先选择契合您技术与预算约束的方案。",
  },
};

/** Où se trouvent ces deux réponses, par identifiant de question. */
const EMPLACEMENTS = [
  { ou: { type: "global", slug: "accueil" }, quoi: "6a96f54f5b9f007b580b2d34", revendeur: "6a96f54f5b9f007b580b2d35" },
  { ou: { type: "page", id: 8, nom: "expertise" }, quoi: "6a96f5847d2c777c49487f07", revendeur: "6a96f5847d2c777c49487f08" },
  { ou: { type: "page", id: 9, nom: "capital" }, quoi: "6a96f56fca7f277bf05008a7", revendeur: "6a96f56fca7f277bf05008a8" },
] as const;

type Bloc = { blockType?: string; questions?: { id?: string; reponse?: string }[] };

const payload = await getPayload({ config });
let ecrites = 0;
const introuvables: string[] = [];

/**
 * Réécrit les deux réponses d'un jeu de sections et dit combien ont changé.
 * Les sections sont modifiées sur place : Payload réécrit le tableau entier.
 */
const corriger = (sections: Bloc[], ids: Record<string, string>, langue: Langue) => {
  let n = 0;
  for (const [cle, id] of Object.entries(ids)) {
    const question = sections
      .filter((s) => s.blockType === "faq")
      .flatMap((s) => s.questions ?? [])
      .find((q) => q.id === id);
    if (!question) {
      introuvables.push(`${cle} (${id}) en ${langue}`);
      continue;
    }
    const texte = REPONSES[cle][langue];
    if (question.reponse !== texte) n += 1;
    question.reponse = texte;
  }
  return n;
};

for (const emplacement of EMPLACEMENTS) {
  const { ou, ...ids } = emplacement;
  for (const langue of langues) {
    if (ou.type === "global") {
      const global = await payload.findGlobal({ slug: "accueil", locale: langue, depth: 0 });
      const sections = (global.sections ?? []) as Bloc[];
      const n = corriger(sections, ids, langue);
      if (n) {
        await payload.updateGlobal({ slug: "accueil", locale: langue, data: { sections } as never });
        ecrites += n;
      }
      console.log(`global accueil [${langue}] : ${n} réponse(s) réécrite(s)`);
    } else {
      const page = await payload.findByID({ collection: "pages", id: ou.id, locale: langue, depth: 0 });
      const sections = (page.sections ?? []) as Bloc[];
      const n = corriger(sections, ids, langue);
      if (n) {
        /* Pas de `draft: true` : la page est publiée, et un enregistrement en
           brouillon n'irait que dans la table des versions — la correction ne
           serait jamais servie au visiteur. */
        await payload.update({
          collection: "pages",
          id: ou.id,
          locale: langue,
          data: { sections, _status: page._status ?? "published" } as never,
        });
        ecrites += n;
      }
      console.log(`page ${ou.nom} [${langue}] : ${n} réponse(s) réécrite(s)`);
    }
  }
}

console.log(`\n${ecrites} réponse(s) réécrite(s) au total.`);
if (introuvables.length) {
  console.error("Questions introuvables :", introuvables.join(", "));
  process.exit(1);
}
