import { draftMode } from "next/headers";

/**
 * Sort du mode brouillon.
 *
 * Sans cette sortie, un rédacteur qui a ouvert un aperçu continuerait de voir
 * les brouillons sur tout le site, sans comprendre pourquoi sa page publiée ne
 * ressemble pas à ce qu'il a sous les yeux.
 */
export async function GET(requete: Request) {
  (await draftMode()).disable();
  const retour = new URL(requete.url).searchParams.get("retour");
  const sur = retour?.startsWith("/") && !retour.startsWith("//") ? retour : "/";
  return Response.redirect(new URL(sur, requete.url), 307);
}
