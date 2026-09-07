import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

import { CHAMP_LEURRE } from "./leurre";

/**
 * Protections des formulaires publics.
 *
 * Trois défenses se complètent, parce qu'aucune ne suffit seule :
 *
 * 1. le leurre, un champ invisible que seul un robot remplit ;
 * 2. le jeton, émis à l'affichage du formulaire, signé, à usage unique et
 *    valable seulement après un court délai — un envoi instantané ou rejoué
 *    est écarté ;
 * 3. la cadence, qui plafonne le nombre d'envois par adresse et par heure.
 *
 * Les deux premières arrêtent les robots ordinaires. Seule la troisième tient
 * face à quelqu'un qui scripte l'action serveur, et c'est elle qui empêche le
 * remplissage en masse de la base.
 *
 * L'adresse IP n'est jamais enregistrée : seule sa signature l'est, tronquée,
 * et le secret qui permettrait de la recalculer ne figure pas dans la base.
 */
const SECRET = process.env.PAYLOAD_SECRET ?? "";

const signer = (valeur: string) => createHmac("sha256", SECRET).update(valeur).digest("base64url");

/** Comparaison à durée constante : une comparaison ordinaire fuit par le temps. */
function identiques(a: string, b: string): boolean {
  const ta = Buffer.from(a);
  const tb = Buffer.from(b);
  return ta.length === tb.length && timingSafeEqual(ta, tb);
}

/**
 * Empreinte de l'appelant, portée par formulaire.
 *
 * Derrière Vercel, l'adresse réelle est en tête de `x-forwarded-for` ; les
 * valeurs suivantes sont ajoutées par les relais et ne sont pas fiables.
 */
async function empreinte(portee: string): Promise<string> {
  const entetes = await headers();
  const chaine = entetes.get("x-forwarded-for") ?? entetes.get("x-real-ip") ?? "";
  const adresse = chaine.split(",")[0]?.trim() || "inconnue";
  return `${portee}:${signer(adresse).slice(0, 32)}`;
}

/* --------------------------------------------------------------- le leurre */

export const leurreRempli = (donnees: FormData) =>
  String(donnees.get(CHAMP_LEURRE) ?? "").trim() !== "";

/* ---------------------------------------------------------------- le jeton */

/** En deçà, personne n'a rempli le formulaire à la main. */
const DELAI_MINIMUM = 2_000;
/** Au delà, la page traînait ouverte : le jeton est périmé. */
const VALIDITE = 3 * 60 * 60 * 1_000;

/** Émis au montage du formulaire, jamais au build : les pages sont statiques. */
export function emettreJeton(): string {
  const charge = `${Date.now()}.${randomBytes(9).toString("base64url")}`;
  return `${charge}.${signer(charge)}`;
}

export async function jetonRecevable(jeton: string): Promise<boolean> {
  const [emission, alea, signature] = jeton.split(".");
  if (!emission || !alea || !signature) return false;
  if (!identiques(signature, signer(`${emission}.${alea}`))) return false;

  const age = Date.now() - Number(emission);
  if (!Number.isFinite(age) || age < DELAI_MINIMUM || age > VALIDITE) return false;

  // Usage unique : sans cela, une requête capturée se rejouerait indéfiniment.
  return consommer(`jeton:${alea}`, VALIDITE);
}

/* -------------------------------------------------------------- la cadence */

export type Fenetre = { max: number; secondes: number };

/**
 * Vrai si l'appelant a dépassé l'une des fenêtres. Un envoi accepté est
 * compté, un envoi refusé ne l'est pas : une rafale ne repousse pas
 * indéfiniment la réouverture.
 */
export async function cadenceDepassee(portee: string, fenetres: Fenetre[]): Promise<boolean> {
  const cle = await empreinte(portee);
  try {
    const payload = await getPayload({ config });
    await purger(payload);

    for (const { max, secondes } of fenetres) {
      const depuis = new Date(Date.now() - secondes * 1_000).toISOString();
      const { totalDocs } = await payload.count({
        collection: "verrous",
        where: { and: [{ cle: { equals: cle } }, { createdAt: { greater_than: depuis } }] },
        overrideAccess: true,
      });
      if (totalDocs >= max) return true;
    }

    const plusLongue = Math.max(...fenetres.map((f) => f.secondes));
    await payload.create({
      collection: "verrous",
      data: { cle, expiration: new Date(Date.now() + plusLongue * 1_000).toISOString() },
      overrideAccess: true,
    });
    return false;
  } catch {
    // La base qui compte est celle qui reçoit les demandes : si elle ne répond
    // plus, l'enregistrement échouera juste après. Refuser ici ne protégerait
    // de rien et fermerait le formulaire à tout le monde.
    return false;
  }
}

/** Pose une clé si elle est libre. Faux si elle était déjà prise. */
async function consommer(cle: string, dureeMs: number): Promise<boolean> {
  try {
    const payload = await getPayload({ config });
    const { totalDocs } = await payload.count({
      collection: "verrous",
      where: { cle: { equals: cle } },
      overrideAccess: true,
    });
    if (totalDocs > 0) return false;
    await payload.create({
      collection: "verrous",
      data: { cle, expiration: new Date(Date.now() + dureeMs).toISOString() },
      overrideAccess: true,
    });
    return true;
  } catch {
    return true;
  }
}

/** Purge opportuniste : pas de tâche planifiée à faire vivre pour si peu. */
async function purger(payload: Awaited<ReturnType<typeof getPayload>>) {
  await payload.delete({
    collection: "verrous",
    where: { expiration: { less_than: new Date().toISOString() } },
    overrideAccess: true,
  });
}
