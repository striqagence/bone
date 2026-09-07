import { getPayload } from "payload";
import config from "@payload-config";

import { blocEditeur, liste, paragraphe, racine, citation, titre } from "./lexical";

/**
 * Premier article de fond, laissé en brouillon.
 *
 * Le sujet est choisi pour tomber à l'intersection des deux pôles qui vendent
 * du conseil : la fin de support d'un hyperviseur est une décision
 * d'architecture (Expertise) autant qu'un arbitrage entre prolonger et
 * remplacer (Capital). C'est aussi le seul angle que les dix brouillons de la
 * maquette ne couvraient pas.
 *
 * Aucun chiffre n'y est avancé : le dépôt n'en connaît aucun qui soit vérifié,
 * et un ordre de grandeur inventé dans un article de conseil décrédibiliserait
 * le reste. Les fourchettes viendront de l'équipe.
 *
 * Aucun éditeur n'est nommé non plus. Le changement de modèle de licence est
 * cité comme l'un des déclencheurs, sans désigner personne : plusieurs des
 * logotypes affichés sur le site sont ceux d'éditeurs concernés.
 */
const payload = await getPayload({ config });

const { docs: photos } = await payload.find({
  collection: "media",
  where: { filename: { equals: "article-dependances.jpg" } },
  limit: 1,
});

const { docs: categories } = await payload.find({
  collection: "categories",
  where: { slug: { equals: "infrastructure" } },
  limit: 1,
});

const fr = {
  titre: "Fin de support d’un hyperviseur : quatre chemins, et comment choisir",
  extrait:
    "Une date de fin de support n’est pas une échéance technique, c’est un transfert de risque. Voici les quatre issues possibles, et ce qui départage vraiment.",
};

const en = {
  titre: "Hypervisor end of support: four roads, and how to choose",
  extrait:
    "An end-of-support date is not a technical deadline, it is a transfer of risk. Here are the four possible outcomes, and what really decides between them.",
};

const corpsFr = racine([
  /**
   * Le résumé ouvre l'article, l'encadré « à retenir » le referme. Le premier
   * annonce ce que l'article couvre, le second ce qu'il faut en faire.
   */
  blocEditeur({
    blockType: "aRetenir",
    etiquette: "L’essentiel de cet article",
    points: [
      { texte: "Ce qu’une date de fin de support change vraiment, et pour qui." },
      { texte: "Les quatre issues possibles, et non les deux qu’on pose d’habitude." },
      { texte: "Ce qui départage réellement ces quatre chemins." },
    ],
  }),
  titre("Ce qu’une fin de support change vraiment"),
  paragraphe(
    "Une date de fin de support ne casse rien le jour venu. Les machines tournent, les sauvegardes " +
      "passent, personne ne remarque quoi que ce soit. Ce qui change est ailleurs : à partir de cette " +
      "date, plus aucun correctif de sécurité ne sortira, et plus aucun recours ne sera possible auprès " +
      "de l’éditeur en cas de défaut.",
  ),
  paragraphe(
    "Autrement dit, le risque ne disparaît pas, il change de porteur. Il passe de l’éditeur à vous. " +
      "C’est ce transfert que vos auditeurs, votre assureur et, depuis NIS2, votre obligation de " +
      "conformité vont regarder, et non la version installée.",
  ),
  citation(
    "« Une migration d’hyperviseur qui commence par le choix de l’hyperviseur commence par la fin. »",
  ),

  titre("Quatre chemins, pas deux"),
  paragraphe(
    "La question est presque toujours posée comme un choix binaire : on migre ou on ne migre pas. Il " +
      "y en a quatre, et trois sont régulièrement écartés trop vite.",
  ),
  liste([
    "Rester, en connaissance de cause. Décision légitime si la plateforme est isolée du reste, si son " +
      "exposition est documentée et si l’échéance de remplacement est datée. Elle devient indéfendable " +
      "dès qu’elle est prise par défaut, faute d’avoir instruit le sujet.",
    "Migrer vers un autre hyperviseur. Le chemin le plus direct, et le plus souvent surestimé dans sa " +
      "simplicité : ce n’est pas la conversion des machines virtuelles qui coûte, ce sont la sauvegarde, " +
      "la supervision, l’ordonnancement et les scripts maison qui parlaient à l’ancien.",
    "Déplacer une partie vers le cloud. Rarement la totalité, souvent les charges les plus élastiques. " +
      "Le calcul se fait sur trois ans, sortie comprise, sans quoi la comparaison est faussée dès la " +
      "première année.",
    "Réduire le besoin. Une partie du parc virtualisé n’a plus d’usage réel, ou pourrait revenir sur du " +
      "matériel physique consolidé. C’est le chemin le moins souvent envisagé, et parfois le moins cher.",
  ]),

  titre("Ce qui décide n’est pas la technologie"),
  paragraphe(
    "Les quatre chemins sont techniquement viables. Ce qui les départage tient à votre contexte, et " +
      "s’instruit avant tout comparatif de fonctionnalités.",
  ),
  liste([
    "La carte des dépendances : ce qui parle à la plateforme, et non ce qui tourne dessus.",
    "Le coût sur trois ans, licences, matériel, sortie et heures internes comprises.",
    "Les compétences réellement disponibles dans l’équipe, aujourd’hui et dans dix-huit mois.",
    "La durée d’interruption tolérable, application par application, pas en moyenne.",
    "L’âge et la compatibilité du matériel en place, qui décident souvent à eux seuls.",
  ]),
  paragraphe(
    "Un comparatif d’hyperviseurs mené avant cet inventaire donne toujours une réponse. Rarement la " +
      "bonne, et jamais défendable devant un comité.",
  ),

  titre("Par où commencer"),
  paragraphe(
    "Dans l’ordre : inventaire de ce qui tourne et de ce qui en dépend, puis chiffrage des quatre " +
      "chemins sur trois ans, puis décision. Le choix de la technologie arrive en dernier, et découle " +
      "des deux premières étapes plutôt que de les précéder.",
  ),
  paragraphe(
    "Compté en jours, ce travail est court. Compté en conséquences, c’est la partie de la migration " +
      "qui coûte le plus cher à rattraper une fois qu’elle a été sautée.",
  ),

  blocEditeur({
    blockType: "aRetenir",
    etiquette: "à retenir",
    points: [
      { texte: "Une fin de support ne casse rien : elle vous transfère le risque." },
      { texte: "Quatre chemins, pas deux. Réduire le besoin en est un." },
      { texte: "La technologie se choisit en dernier, une fois les dépendances connues." },
    ],
  }),
]);

const corpsEn = racine([
  blocEditeur({
    blockType: "aRetenir",
    etiquette: "The essentials of this article",
    points: [
      { texte: "What an end-of-support date really changes, and for whom." },
      { texte: "The four possible outcomes, not the two usually put on the table." },
      { texte: "What actually decides between those four roads." },
    ],
  }),
  titre("What an end of support actually changes"),
  paragraphe(
    "An end-of-support date breaks nothing on the day. The machines run, the backups pass, nobody " +
      "notices a thing. What changes is elsewhere: from that date, no security fix will be issued, and " +
      "no recourse to the vendor will be possible if something goes wrong.",
  ),
  paragraphe(
    "In other words, the risk does not disappear, it changes hands. It moves from the vendor to you. " +
      "That transfer is what your auditors, your insurer and, since NIS2, your compliance obligation " +
      "will look at, not the version installed.",
  ),
  citation(
    "“A hypervisor migration that starts with the choice of hypervisor starts at the end.”",
  ),

  titre("Four roads, not two"),
  paragraphe(
    "The question is almost always framed as a binary: migrate or do not migrate. There are four, and " +
      "three are routinely dismissed too quickly.",
  ),
  liste([
    "Stay, knowingly. A legitimate decision if the platform is isolated from the rest, if its exposure " +
      "is documented and if a replacement date is set. It becomes indefensible the moment it is taken " +
      "by default, for want of having examined the question.",
    "Migrate to another hypervisor. The most direct road, and the one whose simplicity is most often " +
      "overestimated: converting the virtual machines is not what costs, it is the backup, monitoring, " +
      "scheduling and in-house scripts that spoke to the old one.",
    "Move part of it to the cloud. Rarely all of it, often the most elastic workloads. The maths must " +
      "run over three years, exit included, or the comparison is skewed from the first year.",
    "Reduce the need. Part of the virtualised estate no longer has a real use, or could return to " +
      "consolidated physical hardware. It is the least considered road, and sometimes the cheapest.",
  ]),

  titre("What decides is not the technology"),
  paragraphe(
    "All four roads are technically viable. What separates them belongs to your context, and is " +
      "established before any feature comparison.",
  ),
  liste([
    "The dependency map: what talks to the platform, not what runs on it.",
    "The three-year cost, licences, hardware, exit and internal hours included.",
    "The skills genuinely available in the team, today and in eighteen months.",
    "The tolerable downtime, application by application, not on average.",
    "The age and compatibility of the hardware in place, which often decides on its own.",
  ]),
  paragraphe(
    "A hypervisor comparison run before that inventory always produces an answer. Rarely the right " +
      "one, and never one you can defend to a steering committee.",
  ),

  titre("Where to start"),
  paragraphe(
    "In order: an inventory of what runs and what depends on it, then a three-year costing of the four " +
      "roads, then the decision. The choice of technology comes last, and follows from the first two " +
      "steps rather than preceding them.",
  ),
  paragraphe(
    "Counted in days, this work is short. Counted in consequences, it is the part of a migration that " +
      "costs the most to make up for once it has been skipped.",
  ),

  blocEditeur({
    blockType: "aRetenir",
    etiquette: "what to remember",
    points: [
      { texte: "An end of support breaks nothing: it transfers the risk to you." },
      { texte: "Four roads, not two. Reducing the need is one of them." },
      { texte: "The technology is chosen last, once the dependencies are known." },
    ],
  }),
]);

const { docs: photosFaq } = await payload.find({
  collection: "media",
  where: { filename: { equals: "article-stockage-video.jpg" } },
  limit: 1,
});

const sectionsFr = [
  {
    blockType: "faq" as const,
    surtitre: "Questions fréquentes",
    titre: "Vos questions, nos réponses franches.",
    image: photosFaq[0]?.id,
    questions: [
      {
        question: "Peut-on rester sur une version qui n’est plus supportée ?",
        reponse:
          "Oui, à condition de l’avoir décidé plutôt que subi : exposition documentée, plateforme isolée du reste, et date de remplacement posée.",
      },
      {
        question: "Combien de temps prend une migration d’hyperviseur ?",
        reponse:
          "La conversion des machines est la partie courte. C’est la sauvegarde, la supervision et les scripts maison qui allongent le calendrier, et eux seuls se chiffrent après inventaire.",
      },
      {
        question: "Faut-il choisir l’hyperviseur avant ou après l’audit ?",
        reponse:
          "Après. Un comparatif mené avant l’inventaire des dépendances donne toujours une réponse, rarement la bonne.",
      },
    ],
  },
  {
    blockType: "articles" as const,
    surtitre: "à lire aussi",
    titre: "Nos derniers articles",
    libelleAction: "Lire l’article",
    nombre: 4,
  },
  {
    blockType: "appelAction" as const,
    surtitre: "notre point de départ",
    titre: "Instruire les quatre chemins avant d’en écarter trois.",
    chapo:
      "Un diagnostic de deux heures suffit à poser la carte des dépendances et à savoir lesquels méritent d’être chiffrés.",
    cta: { libelle: "Demander un audit", chemin: "/contact" },
  },
];

const sectionsEn = [
  {
    blockType: "faq" as const,
    surtitre: "Frequently asked questions",
    titre: "Your questions, our straight answers.",
    image: photosFaq[0]?.id,
    questions: [
      {
        question: "Can we stay on a version that is no longer supported?",
        reponse:
          "Yes, provided it is a decision rather than a drift: documented exposure, a platform isolated from the rest, and a replacement date set.",
      },
      {
        question: "How long does a hypervisor migration take?",
        reponse:
          "Converting the machines is the short part. Backup, monitoring and in-house scripts are what stretch the schedule, and they can only be costed after an inventory.",
      },
      {
        question: "Should the hypervisor be chosen before or after the audit?",
        reponse:
          "After. A comparison run before the dependency inventory always produces an answer, rarely the right one.",
      },
    ],
  },
  {
    blockType: "articles" as const,
    surtitre: "further reading",
    titre: "Our latest articles",
    libelleAction: "Read the article",
    nombre: 4,
  },
  {
    blockType: "appelAction" as const,
    surtitre: "our starting point",
    titre: "Examine all four roads before ruling out three.",
    chapo:
      "A two-hour diagnosis is enough to draw the dependency map and know which roads deserve costing.",
    cta: { libelle: "Request an audit", chemin: "/contact" },
  },
];

const SLUG = "fin-de-support-hyperviseur";

const { docs } = await payload.find({
  collection: "posts",
  where: { slug: { equals: SLUG } },
  limit: 1,
  draft: true,
});

const commun = {
  slug: SLUG,
  categorie: categories[0]?.id,
  publieLe: "2026-09-04",
  minutesLecture: 8,
  image: photos[0]?.id,
  metaTitre: "Fin de support d’un hyperviseur : quatre chemins",
  metaDescription:
    "Une date de fin de support n’est pas une échéance technique, c’est un transfert de risque. Les quatre issues possibles, et ce qui départage vraiment.",
  // Brouillon : l'article n'apparaît ni sur le blog ni dans les « à lire
  // aussi » tant qu'il n'est pas publié depuis le back-office.
  //
  // Les écritures qui suivent passent par `draft: true`, qui n'écrit que dans
  // la table des versions : relancer ce script après une publication met le
  // brouillon à jour sans dépublier ce qui est en ligne.
  _status: "draft" as const,
};

const doc = docs[0]
  ? await payload.update({
      collection: "posts",
      id: docs[0].id,
      locale: "fr",
      draft: true,
      data: { ...commun, ...fr, contenu: corpsFr as never, sections: sectionsFr as never },
    })
  : await payload.create({
      collection: "posts",
      locale: "fr",
      draft: true,
      data: { ...commun, ...fr, contenu: corpsFr as never, sections: sectionsFr as never },
    });

/** Les blocs partagent leurs lignes entre langues : les identifiants sont repris. */
const pose = await payload.findByID({
  collection: "posts",
  id: doc.id,
  locale: "fr",
  draft: true,
  depth: 0,
});

const avecIds = (bloc: Record<string, unknown>, i: number) => {
  const poseBloc = pose.sections?.[i] as Record<string, unknown> | undefined;
  const sortie: Record<string, unknown> = { ...bloc, id: poseBloc?.id };
  if (Array.isArray(bloc.questions) && Array.isArray(poseBloc?.questions)) {
    sortie.questions = (bloc.questions as Record<string, unknown>[]).map((q, j) => ({
      ...q,
      id: (poseBloc.questions as Record<string, unknown>[])[j]?.id,
    }));
  }
  return sortie;
};

await payload.update({
  collection: "posts",
  id: doc.id,
  locale: "en",
  draft: true,
  data: {
    ...en,
    metaTitre: "Hypervisor end of support: four roads",
    metaDescription:
      "An end-of-support date is not a technical deadline, it is a transfer of risk. The four possible outcomes, and what really decides between them.",
    contenu: corpsEn as never,
    sections: sectionsEn.map(avecIds) as never,
    _status: "draft",
  },
});

payload.logger.info(`[blog] brouillon « ${fr.titre} » écrit dans les deux langues`);
process.exit(0);
