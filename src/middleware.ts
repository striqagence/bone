import { NextResponse, type NextRequest } from "next/server";

import { langueParDefaut, langues } from "@/lib/i18n";

/**
 * Réintroduit le préfixe de langue absent des URLs françaises.
 *
 * `/contact` est réécrit en interne vers `/fr/contact` : l'arborescence de
 * routes n'a qu'une seule forme, `[locale]/...`, sans avoir à dupliquer le site
 * pour la langue servie à la racine. La réécriture ne modifie pas l'URL
 * affichée, contrairement à une redirection qui renverrait un 308.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const dejaPrefixe = langues.some(
    (langue) => pathname === `/${langue}` || pathname.startsWith(`/${langue}/`),
  );
  if (dejaPrefixe) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${langueParDefaut}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /**
   * Le back-office et l'API de Payload sont hors du périmètre : ils vivent dans
   * le groupe de routes `(payload)`, qui n'a pas de segment de langue. Les
   * fichiers statiques et les assets de marque sont exclus pour la même raison.
   */
  matcher: ["/((?!admin|api|_next/static|_next/image|brand|favicon.ico|.*\\.).*)"],
};
