/**
 * Nom du champ leurre des formulaires publics.
 *
 * Il vit à part parce que le client le pose et que le serveur le lit, et que
 * `lib/antiabus` est réservé au serveur.
 *
 * Le nom est volontairement neutre. Un intitulé reconnaissable — « societe »,
 * « organization » — serait rempli par le remplissage automatique du
 * navigateur, et une demande légitime serait alors prise pour un robot. Un
 * robot qui remplit tout ce qu'il trouve tombe dedans quand même.
 */
export const CHAMP_LEURRE = "complement";
