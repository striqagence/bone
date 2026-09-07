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
 * Sur les pages légales, l'adresse est allée plus loin : elle y est une image,
 * pour n'être ni cliquable ni sélectionnable. Son texte de remplacement épelle
 * l'adresse (« bone arobase contact point fr ») plutôt que de l'écrire : un
 * lecteur d'écran la restitue correctement, une expression régulière ne la
 * reconnaît pas. Le clic et le copier-coller sont perdus, ce qui est le prix
 * assumé de ce choix.
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

/**
 * Nom du fichier image d'une adresse.
 *
 * Il porte une empreinte de l'adresse : si celle-ci change au back-office sans
 * que l'image soit régénérée, le nom attendu ne correspond plus à aucun
 * fichier et la page affiche un renvoi au formulaire plutôt qu'une adresse
 * périmée. Une erreur visible vaut mieux qu'un mensonge silencieux.
 *
 * L'empreinte est un FNV-1a, sans dépendance : c'est un nom de fichier, pas
 * une protection.
 */
export function nomImageCourriel(adresse: string) {
  let empreinte = 0x811c9dc5;
  for (let i = 0; i < adresse.length; i++) {
    empreinte ^= adresse.charCodeAt(i);
    empreinte = Math.imul(empreinte, 0x01000193) >>> 0;
  }
  return `courriel-${empreinte.toString(16).padStart(8, "0")}.png`;
}

/** Comment un lecteur d'écran doit prononcer l'adresse. */
const EPELLATION = {
  fr: { "@": " arobase ", ".": " point " },
  en: { "@": " at ", ".": " dot " },
} as const;

/**
 * Texte de remplacement de l'image : l'adresse épelée.
 *
 * Elle reste compréhensible à l'oreille sans jamais former le motif que
 * cherchent les moissonneurs.
 */
export function epelerCourriel(adresse: string, langue: "fr" | "en") {
  const { "@": arobase, ".": point } = EPELLATION[langue];
  return adresse.replaceAll("@", arobase).replaceAll(".", point);
}
