import type { Access } from "payload";

/**
 * Lecture publique des collections à brouillons.
 *
 * Payload garde le brouillon et la version publiée dans la même table : sans
 * filtre, `payload.find` renvoie le dernier état enregistré, brouillon compris.
 * Un `access.read` ouvert à tous laisse donc sortir un article non publié par
 * le blog, l'API REST et le sitemap.
 *
 * Le filtre est posé ici plutôt que dans chaque requête du front : c'est le
 * seul endroit qui couvre aussi les chemins qu'on n'écrit pas soi-même.
 *
 * **Une session connectée ne suffit pas à lever le filtre : il faut que son
 * second facteur ait été vérifié.** La version précédente ouvrait tout à
 * quiconque était connecté, si bien qu'un mot de passe dérobé sur un compte
 * non encore enrôlé donnait accès à l'ensemble des brouillons par
 * `GET /api/posts?draft=true`. L'enveloppe de `lib/second-facteur.ts` ne
 * rattrapait pas ce cas : la lecture de ces deux collections en est dispensée,
 * puisque c'est elle qui alimente le site public.
 *
 * Les rédacteurs enrôlés continuent de tout voir, ce dont dépendent le
 * back-office et l'aperçu.
 */
export const lectureDesPubliees: Access = ({ req: { user } }) => {
  const strategie = (user as { _strategy?: string } | null | undefined)?._strategy;
  if (user && strategie === "totp") return true;
  return { _status: { equals: "published" } };
};
