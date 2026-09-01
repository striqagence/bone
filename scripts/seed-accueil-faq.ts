import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Section « Questions fréquentes ».
 *
 * La maquette ne rédige la réponse que de la première question dépliée : les
 * trois autres restent à écrire depuis le back-office.
 */
const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: "media",
  where: { filename: { equals: "article-exemple.jpg" } },
  limit: 1,
});
const photo = docs[0]?.id;

const fr = {
  surtitre: "Questions fréquentes",
  titre: "Vos questions, nos réponses franches.",
  image: photo,
  questions: [
    {
        question: "Que fait exactement Bone ?",
        reponse:
          "Bone conseille et architecture des infrastructures IT : réseau, stockage, systèmes et sécurité. On audite l’existant, on pose un diagnostic, on hiérarchise les risques et on accompagne la mise en œuvre. On ne revend pas de matériel.",
      },
    {
      question: "Bone est-il un revendeur de matériel ou un cabinet de conseil ?",
      reponse:
        "Bone ne revend aucun matériel : c’est un cabinet de conseil et d’architecture indépendant, rémunéré pour la clarté de la décision.",
    },
    {
        question: "Faut-il un budget pour démarrer avec Bone ?",
        reponse:
          "Non. Le premier diagnostic est offert et sans engagement : il sert justement à distinguer ce qui mérite un budget de ce qui n’en demande pas.",
      },
    {
        question: "Bone intervient-il sans créer de dépendance ?",
        reponse:
          "Oui, c’est la règle. Chaque mission se termine par des livrables qui restent chez vous — cartographie, documentation, plan d’action — et par un transfert à vos équipes. Vous devez pouvoir continuer sans nous.",
      },
  ],
};

const en = {
  surtitre: "Frequently asked questions",
  titre: "Your questions, our straight answers.",
  image: photo,
  questions: [
    {
        question: "What exactly does Bone do?",
        reponse:
          "Bone advises on and architects IT infrastructure: network, storage, systems and security. We audit what exists, make a diagnosis, rank the risks and support the implementation. We do not resell hardware.",
      },
    {
      question: "Is Bone a hardware reseller or a consultancy?",
      reponse:
        "Bone resells no hardware: it is an independent consultancy and architecture practice, paid for the clarity of the decision.",
    },
    {
        question: "Do I need a budget to start with Bone?",
        reponse:
          "No. The first diagnosis is free and non-binding: its purpose is precisely to separate what deserves a budget from what does not.",
      },
    {
        question: "Does Bone work without creating dependency?",
        reponse:
          "Yes, that is the rule. Every engagement ends with deliverables that stay with you — maps, documentation, an action plan — and with a handover to your teams. You must be able to carry on without us.",
      },
  ],
};

await payload.updateGlobal({ slug: "accueil", locale: "fr", data: { faq: fr } });

const pose = await payload.findGlobal({ slug: "accueil", locale: "fr", depth: 0 });

await payload.updateGlobal({
  slug: "accueil",
  locale: "en",
  data: {
    faq: {
      ...en,
      questions: en.questions.map((q, i) => ({ ...q, id: pose.faq?.questions?.[i]?.id })),
    },
  },
});

payload.logger.info("[accueil] section « FAQ » écrite dans les deux langues");
process.exit(0);
