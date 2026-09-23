import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Efface le second facteur d'un compte.
 *
 * Le greffon de double authentification ne prévoit **aucun code de secours** :
 * un téléphone perdu ou réinitialisé enferme dehors, et le courriel de
 * réinitialisation n'est pas branché. Ce script est donc le seul chemin de
 * retour, et il demande un accès à la base.
 *
 * Après passage, la prochaine connexion redemande la configuration d'une
 * application d'authentification, `forceSetup` étant actif.
 *
 *   npx payload run scripts/reinitialiser-double-authentification.ts adresse@exemple.fr
 */
const adresse = process.argv[process.argv.length - 1];

if (!adresse || !adresse.includes("@")) {
  console.error(
    "Usage : npx payload run scripts/reinitialiser-double-authentification.ts <adresse>",
  );
  process.exit(1);
}

const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: "users",
  where: { email: { equals: adresse } },
  limit: 1,
  depth: 0,
  overrideAccess: true,
});

if (!docs[0]) {
  console.error(`Aucun compte pour « ${adresse} ».`);
  process.exit(1);
}

await payload.update({
  collection: "users",
  id: docs[0].id,
  data: { totpSecret: null } as never,
  overrideAccess: true,
});

console.log(`  second facteur effacé pour ${adresse}`);
console.log("  la prochaine connexion redemandera la configuration.");
process.exit(0);
