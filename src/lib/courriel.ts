/**
 * Adresse de courriel dérobée aux moissonneurs.
 *
 * Le principe est simple : la chaîne `bone@contact.fr` ne doit apparaître nulle
 * part dans ce que le serveur envoie. Les robots qui ratissent les pages
 * cherchent un motif « quelque chose arobase quelque chose point quelque
 * chose » dans le HTML brut ; ils n'exécutent pas le JavaScript. Une adresse
 * encodée passe donc au travers, et le navigateur la rétablit à l'affichage.
 *
 * L'encodage n'est pas du chiffrement : il ne protège de rien d'autre que
 * d'une expression régulière. C'est précisément ce dont il s'agit.
 *
 * Une image de l'adresse aurait été moins bonne : pour rester lisible aux
 * lecteurs d'écran elle aurait porté l'adresse en texte de remplacement, que
 * les moissonneurs lisent aussi, et elle aurait interdit le clic et le
 * copier-coller.
 */
export function encoderCourriel(adresse: string) {
  return Buffer.from(adresse, "utf8").toString("base64");
}

/** Le pendant côté navigateur : `atob` suffit, l'adresse étant en ASCII. */
export function decoderCourriel(code: string) {
  try {
    return atob(code);
  } catch {
    return "";
  }
}
