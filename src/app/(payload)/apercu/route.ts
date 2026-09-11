import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

import { cheminDe } from "@/lib/pages";
import { estUneLangue, langueParDefaut, lien } from "@/lib/i18n";

/**
 * Ouvre l'aperçu d'un document depuis le back-office.
 *
 * Le back-office ne connaît pas l'URL publique d'une page : elle se déduit de
 * la chaîne de ses parents, que la configuration d'une collection ne peut pas
 * remonter sans importer Payload et créer un cycle. Le bouton d'aperçu pointe
 * donc ici avec un identifiant, et c'est cette route qui résout le chemin.
 *
 * Elle active au passage le mode brouillon de Next, sans quoi l'aperçu d'un
 * document non publié afficherait une page introuvable.
 *
 * L'activation est réservée aux utilisateurs connectés : le mode brouillon
 * lève le filtre qui cache les brouillons au public, et une route ouverte
 * l'offrirait à quiconque connaît son adresse.
 */
export async function GET(requete: Request) {
  const { searchParams } = new URL(requete.url);
  const collection = searchParams.get("collection");
  const global = searchParams.get("global");
  const id = searchParams.get("id");
  const langueBrute = searchParams.get("langue") ?? langueParDefaut;
  const langue = estUneLangue(langueBrute) ? langueBrute : langueParDefaut;

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: requete.headers });
  if (!user) {
    return new Response("L’aperçu est réservé aux utilisateurs connectés.", { status: 403 });
  }

  const chemin = await resoudre(payload, { collection, global, id, langue });
  if (!chemin) return new Response("Document introuvable.", { status: 404 });

  (await draftMode()).enable();
  // `lien("/", "en")` vaut « /en/ » : la barre finale provoquerait une
  // redirection de plus avant d'atteindre la page.
  const destination = lien(chemin, langue).replace(/(.)\/$/, "$1");
  return Response.redirect(new URL(destination, requete.url), 307);
}

async function resoudre(
  payload: Awaited<ReturnType<typeof getPayload>>,
  {
    collection,
    global,
    id,
    langue,
  }: { collection: string | null; global: string | null; id: string | null; langue: "fr" | "en" },
): Promise<string | null> {
  if (global === "accueil") return "/";
  if (global === "contact") return "/contact";
  if (global === "blog") return "/blog";

  if (!id) return null;

  if (collection === "posts") {
    const article = await payload.findByID({
      collection: "posts", id, locale: langue, depth: 0, draft: true, overrideAccess: true,
    });
    return article ? `/blog/${article.slug}` : null;
  }

  if (collection === "pages") {
    // `depth: 2` suffit à remonter les parents : la maquette ne dépasse pas
    // deux niveaux d'arborescence.
    const page = await payload.findByID({
      collection: "pages", id, locale: langue, depth: 2, draft: true, overrideAccess: true,
    });
    return page ? `/${cheminDe(page)}` : null;
  }

  return null;
}
