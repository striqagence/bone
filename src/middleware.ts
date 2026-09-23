import { NextResponse, type NextRequest } from "next/server";

import { langueParDefaut, langues } from "@/lib/i18n";

/**
 * Deux rôles, l'un pour le site, l'autre pour le back-office.
 *
 * Pour le site : réintroduit le préfixe de langue absent des URLs françaises.
 * `/contact` est réécrit en interne vers `/fr/contact`, ce qui laisse à
 * l'arborescence une seule forme, `[locale]/...`, sans dupliquer le site pour
 * la langue servie à la racine. La réécriture ne change pas l'URL affichée,
 * contrairement à une redirection qui renverrait un 308.
 *
 * Pour le back-office : pose le chemin demandé dans un en-tête. La double
 * authentification en a besoin pour savoir sur quelle vue elle se trouve, un
 * composant serveur n'ayant pas accès au chemin. Sans cet en-tête, la
 * vérification du code boucle indéfiniment en redirections.
 */
const HORS_SITE = ["/admin", "/api", "/apercu"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const entetes = new Headers(request.headers);
  entetes.set("x-pathname", pathname);

  const reponse = (init?: { rewrite?: URL }) => {
    const r = init?.rewrite
      ? NextResponse.rewrite(init.rewrite, { request: { headers: entetes } })
      : NextResponse.next({ request: { headers: entetes } });
    // Le greffon lit l'en-tête côté réponse : on le pose des deux côtés, le
    // rendu serveur et la réponse ne les partageant pas.
    r.headers.set("x-pathname", pathname);
    return r;
  };

  if (HORS_SITE.some((prefixe) => pathname === prefixe || pathname.startsWith(`${prefixe}/`))) {
    return reponse();
  }

  const dejaPrefixe = langues.some(
    (langue) => pathname === `/${langue}` || pathname.startsWith(`/${langue}/`),
  );
  if (dejaPrefixe) return reponse();

  const url = request.nextUrl.clone();
  url.pathname = `/${langueParDefaut}${pathname}`;
  return reponse({ rewrite: url });
}

export const config = {
  /**
   * Le back-office entre désormais dans le périmètre, pour l'en-tête de chemin
   * uniquement : la réécriture de langue l'écarte explicitement plus haut. Les
   * fichiers statiques et les assets de marque restent dehors, ils n'ont besoin
   * ni de l'une ni de l'autre.
   */
  matcher: ["/((?!_next/static|_next/image|brand|favicon.ico|.*\\.).*)"],
};
