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
 * Les rédacteurs connectés continuent de tout voir, ce dont dépendent le
 * back-office et l'aperçu.
 */
export const lectureDesPubliees: Access = ({ req: { user } }) =>
  user ? true : { _status: { equals: "published" } };
