import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Corps et sections de l'article mis à la une, seul dont la maquette donne le
 * contenu rédigé. Les neuf autres n'ont qu'un titre et un extrait.
 *
 * Le texte riche est écrit ici en JSON Lexical plutôt que saisi : c'est la
 * forme que la base attend, et la reproduire à la main dans le back-office
 * pour dix paragraphes n'apporterait rien.
 */
const payload = await getPayload({ config });

const texte = (contenu: string) => ({
  type: "text" as const,
  detail: 0,
  format: 0,
  mode: "normal" as const,
  style: "",
  text: contenu,
  version: 1,
});

const paragraphe = (contenu: string) => ({
  type: "paragraph" as const,
  children: [texte(contenu)],
  direction: "ltr" as const,
  format: "" as const,
  indent: 0,
  textFormat: 0,
  version: 1,
});

const titre = (contenu: string) => ({
  type: "heading" as const,
  tag: "h2" as const,
  children: [texte(contenu)],
  direction: "ltr" as const,
  format: "" as const,
  indent: 0,
  version: 1,
});

const citation = (contenu: string) => ({
  type: "quote" as const,
  children: [texte(contenu)],
  direction: "ltr" as const,
  format: "" as const,
  indent: 0,
  version: 1,
});

const liste = (points: string[]) => ({
  type: "list" as const,
  listType: "bullet" as const,
  start: 1,
  tag: "ul" as const,
  children: points.map((p, i) => ({
    type: "listitem" as const,
    checked: undefined,
    value: i + 1,
    children: [texte(p)],
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
  })),
  direction: "ltr" as const,
  format: "" as const,
  indent: 0,
  version: 1,
});

const aRetenir = (etiquette: string, points: string[]) => ({
  type: "block" as const,
  fields: {
    blockType: "aRetenir",
    etiquette,
    points: points.map((texte) => ({ texte })),
  },
  format: "" as const,
  version: 2,
});

const racine = (enfants: unknown[]) => ({
  root: {
    type: "root" as const,
    children: enfants,
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
  },
});

const contenuFr = racine([
  titre("Le coût invisible d’une infra qu’on n’ausculte plus"),
  paragraphe(
    "Une infrastructure vieillissante ne prévient jamais par une alerte claire. Elle s’exprime par des symptômes diffus : un incident de plus, une heure d’astreinte de plus, une migration repoussée d’un trimestre. Chaque signal pris isolément semble mineur. Additionnés, ils forment un coût réel, rarement identifié comme tel dans les arbitrages budgétaires.",
  ),
  citation(
    "« On ne répare pas une infra qu’on n’a pas comprise. La dette technique, c’est d’abord un défaut de diagnostic. »",
  ),
  titre("Les 7 signaux à surveiller"),
  liste([
    "Des incidents « inexpliqués » qui reviennent : le même type de panne survient à intervalles irréguliers, sans qu’aucune cause définitive ne soit jamais actée.",
    "Personne ne sait dire de quoi dépend quoi : une modification mineure sur un composant produit un effet imprévu ailleurs, révélant une carte des dépendances incomplète.",
    "Le moindre changement fait peur à tout le monde : les équipes évitent de toucher à certains systèmes par crainte de casser quelque chose qu’elles ne maîtrisent plus totalement.",
    "Les temps d’intervention s’allongent : ce qui prenait une heure en prend désormais trois, faute de documentation à jour ou de compréhension partagée.",
    "Le support constructeur touche à sa fin : certains équipements ne bénéficient plus de mises à jour de sécurité, ce qui expose l’ensemble du système.",
    "Les compétences internes reposent sur une seule personne : une seule personne connaît réellement le fonctionnement d’un système critique, ce qui constitue un risque en soi.",
    "Le budget d’exploitation augmente sans explication claire : les coûts de maintenance progressent chaque année, sans qu’un diagnostic global n’ait jamais été posé.",
  ]),
  titre("Comment chiffrer"),
  paragraphe(
    "Chiffrer sa dette technique commence par une question simple : combien coûte, chaque année, le fait de ne rien changer ? On additionne le temps passé sur les incidents récurrents, les heures de support hors contrat, et le risque financier d’un arrêt non planifié. Ce chiffre, une fois posé, change souvent la nature de la décision : ce n’est plus « faut-il investir », mais « peut-on continuer à ne pas le faire ».",
  ),
  titre("Que faire ensuite"),
  paragraphe(
    "La réponse n’est jamais un remplacement complet et immédiat. Elle commence par un diagnostic ciblé, qui distingue ce qui doit être traité en urgence de ce qui peut encore attendre. C’est cette hiérarchisation, plus que la liste des symptômes, qui permet de reprendre la main sur son infrastructure sans y consacrer un budget disproportionné.",
  ),
  aRetenir("à retenir", [
    "La dette technique est un coût réel, pas une fatalité comptable.",
    "Un diagnostic de 2h suffit à révéler les 5 risques prioritaires.",
    "Revaloriser coûte souvent moins que remplacer à l’identique.",
  ]),
]);

const contenuEn = racine([
  titre("The invisible cost of an infrastructure nobody examines"),
  paragraphe(
    "An ageing infrastructure never warns you with a clear alert. It speaks through diffuse symptoms: one more incident, one more hour on call, a migration pushed back another quarter. Taken alone, each signal looks minor. Added up, they form a real cost, rarely identified as such when budgets are arbitrated.",
  ),
  citation(
    "“You cannot repair an infrastructure you have not understood. Technical debt is, first of all, a failure of diagnosis.”",
  ),
  titre("The 7 signals to watch"),
  liste([
    "“Unexplained” incidents that keep coming back: the same kind of failure recurs at irregular intervals, with no definitive cause ever agreed on.",
    "Nobody can say what depends on what: a minor change to one component has an unexpected effect elsewhere, revealing an incomplete dependency map.",
    "The slightest change frightens everyone: teams avoid touching certain systems for fear of breaking something they no longer fully master.",
    "Response times keep growing: what took an hour now takes three, for want of up-to-date documentation or shared understanding.",
    "Vendor support is coming to an end: some equipment no longer receives security updates, which exposes the whole system.",
    "In-house knowledge rests on a single person: only one person genuinely understands how a critical system works, which is a risk in itself.",
    "Operating costs rise with no clear explanation: maintenance spending grows every year without any overall diagnosis ever being made.",
  ]),
  titre("How to put a figure on it"),
  paragraphe(
    "Costing your technical debt starts with a simple question: how much does it cost, each year, to change nothing? Add up the time spent on recurring incidents, the out-of-contract support hours, and the financial risk of an unplanned outage. Once that figure exists, it often changes the nature of the decision: it is no longer “should we invest”, but “can we carry on not investing”.",
  ),
  titre("What comes next"),
  paragraphe(
    "The answer is never a complete, immediate replacement. It starts with a targeted diagnosis that separates what must be dealt with urgently from what can still wait. That ranking, more than the list of symptoms, is what lets you take back control of your infrastructure without spending a disproportionate budget on it.",
  ),
  aRetenir("what to remember", [
    "Technical debt is a real cost, not an accounting inevitability.",
    "A two-hour diagnosis is enough to reveal the five priority risks.",
    "Remarketing often costs less than replacing like for like.",
  ]),
]);

const { docs: photosFaq } = await payload.find({
  collection: "media",
  where: { filename: { equals: "article-exemple.jpg" } },
  limit: 1,
});
const photoFaq = photosFaq[0]?.id;

const sectionsFr = [
  {
    blockType: "articles" as const,
    surtitre: "à lire aussi",
    titre: "Nos derniers articles",
    libelleAction: "Lire l’article",
    nombre: 4,
  },
  {
    blockType: "faq" as const,
    surtitre: "Questions fréquentes",
    titre: "Vos questions, nos réponses franches.",
    image: photoFaq,
    questions: [
      {
        question: "Comment chiffrer le coût de ma dette technique ?",
        reponse:
          "En additionnant ce que coûte l’immobilisme sur douze mois : heures passées sur les incidents récurrents, support hors contrat, et risque financier d’un arrêt non planifié. C’est ce total, et non la liste des symptômes, qui fait basculer une décision.",
      },
      {
        question: "Faut-il tout remplacer d’un coup ?",
        reponse:
          "Non, un diagnostic permet de distinguer ce qui doit être traité en urgence de ce qui peut encore attendre.",
      },
      {
        question: "En combien de temps voit-on un retour ?",
        reponse:
          "Les premiers effets se mesurent en semaines : moins d’incidents répétés, des interventions plus courtes. Le gain budgétaire, lui, se lit sur l’exercice, une fois documentés les remplacements évités.",
      },
    ],
  },
  {
    blockType: "appelAction" as const,
    surtitre: "notre point de départ",
    titre: "Mesurer ce que votre parc vous coûte déjà.",
    chapo:
      "Un diagnostic de deux heures suffit à poser un chiffre sur ce que l’immobilisme coûte chaque année.",
    cta: { libelle: "Demander un audit", chemin: "/contact" },
  },
];

const sectionsEn = [
  {
    blockType: "articles" as const,
    surtitre: "further reading",
    titre: "Our latest articles",
    libelleAction: "Read the article",
    nombre: 4,
  },
  {
    blockType: "faq" as const,
    surtitre: "Frequently asked questions",
    titre: "Your questions, our straight answers.",
    image: photoFaq,
    questions: [
      {
        question: "How do I put a figure on my technical debt?",
        reponse:
          "By adding up what standing still costs over twelve months: hours spent on recurring incidents, out-of-contract support, and the financial risk of an unplanned outage. It is that total, not the list of symptoms, that tips a decision.",
      },
      {
        question: "Do I have to replace everything at once?",
        reponse:
          "No: a diagnosis separates what must be dealt with urgently from what can still wait.",
      },
      {
        question: "How long before we see a return?",
        reponse:
          "The first effects are measurable in weeks: fewer repeat incidents, shorter interventions. The budget gain reads over the financial year, once the avoided replacements are documented.",
      },
    ],
  },
  {
    blockType: "appelAction" as const,
    surtitre: "our starting point",
    titre: "Measure what your estate already costs you.",
    chapo:
      "A two-hour diagnosis is enough to put a figure on what standing still costs each year.",
    cta: { libelle: "Request an audit", chemin: "/contact" },
  },
];

const { docs } = await payload.find({
  collection: "posts",
  where: { slug: { equals: "dette-technique-sept-signaux" } },
  limit: 1,
  draft: true,
});
const id = docs[0]!.id;

await payload.update({
  collection: "posts",
  id,
  locale: "fr",
  data: { contenu: contenuFr as never, sections: sectionsFr as never, _status: "published" },
});

/** Les blocs partagent leurs lignes entre langues : les identifiants sont repris. */
const pose = await payload.findByID({ collection: "posts", id, locale: "fr", depth: 0 });

const avecIds = (bloc: Record<string, unknown>, i: number) => {
  const poseBloc = pose.sections?.[i] as Record<string, unknown> | undefined;
  const sortie: Record<string, unknown> = { ...bloc, id: poseBloc?.id };
  if (Array.isArray(bloc.questions) && Array.isArray(poseBloc?.questions)) {
    sortie.questions = (bloc.questions as Record<string, unknown>[]).map((l, j) => ({
      ...l,
      id: (poseBloc.questions as Record<string, unknown>[])[j]?.id,
    }));
  }
  return sortie;
};

await payload.update({
  collection: "posts",
  id,
  locale: "en",
  data: { contenu: contenuEn as never, sections: sectionsEn.map(avecIds) as never },
});

payload.logger.info("[blog] corps et sections de l’article à la une");
process.exit(0);
