/**
 * Adresse publique du site, telle que le serveur la connaît.
 *
 * Le même calcul sert à la configuration Payload et aux collections, qui ne
 * peuvent pas importer celle-ci sans créer un cycle. Il vit donc à part, sans
 * aucune dépendance.
 */
export function adresseServeur(): string | undefined {
  if (process.env.NEXT_PUBLIC_SERVER_URL)
    return process.env.NEXT_PUBLIC_SERVER_URL;
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return production ? `https://${production}` : undefined;
}

/**
 * Vrai quand le site est servi en HTTPS.
 *
 * Sert à décider si le cookie de session doit être marqué « secure ». On suit
 * le protocole et non l'environnement : en local, `npm start` tourne en mode
 * production tout en servant du HTTP, et un cookie « secure » y rendrait la
 * connexion impossible.
 */
export function serveurEnHttps(): boolean {
  const adresse = adresseServeur();
  return adresse ? adresse.startsWith("https://") : true;
}
