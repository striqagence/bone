import type { Access, Config } from "payload";

/**
 * Durcissement de la double authentification.
 *
 * Le greffon `payload-totp` laisse une porte ouverte, visible dans son
 * `totpAccess` : un compte qui n'a pas *encore* configuré son second facteur
 * (`hasTotp` faux) obtient l'accès complet avec le seul mot de passe. L'option
 * `forceSetup` ne contraint que l'écran d'administration, qui redirige vers la
 * configuration ; elle ne protège pas l'API REST ni GraphQL. Un mot de passe
 * dérobé sur un compte jamais enrôlé suffisait donc à lire les demandes de
 * contact et la liste des abonnés.
 *
 * Ce greffon local repasse derrière et exige le second facteur vérifié pour
 * toute requête authentifiée. Il s'applique après `payloadTotp`, sur la
 * configuration que celui-ci a déjà transformée.
 *
 * L'enrôlement n'en souffre pas : les points d'entrée `/setup-totp` et
 * `/verify-totp` du greffon écrivent en `overrideAccess: true` et ne consultent
 * jamais ces règles. Un compte tout neuf peut donc toujours s'enrôler.
 */

/** Contenus dont la lecture doit rester ouverte : ils alimentent le site. */
const LECTURE_PUBLIQUE = new Set([
  "pages",
  "posts",
  "categories",
  "media",
  "accueil",
  "contact",
  "navigation",
  "blog",
]);

/**
 * Exige une session dont le second facteur a été vérifié.
 *
 * Une requête anonyme n'est pas refusée ici : elle est rendue à la règle
 * d'origine, qui seule sait si la ressource est publique. Sans cela, la lecture
 * du site s'effondrerait — c'est exactement l'erreur que commet le greffon.
 */
/**
 * Payload note sur l'utilisateur la stratégie qui l'a authentifié, mais ne
 * l'expose pas dans les types engendrés. Le greffon y inscrit « totp » une fois
 * le code vérifié : c'est la seule marque du second facteur.
 */
type StrategieConnue = { _strategy?: string };

export const secondFacteurVerifie =
  (interne?: Access): Access =>
  (args) => {
    const user = args.req.user as (StrategieConnue | null) | undefined;
    if (!user) return interne ? interne(args) : false;
    if (user._strategy !== "totp") return false;
    return interne ? interne(args) : true;
  };

export const exigerSecondFacteur = (config: Config): Config => ({
  ...config,
  collections: (config.collections ?? []).map((collection) => {
    const { access = {} } = collection;
    return {
      ...collection,
      access: {
        ...access,
        create: secondFacteurVerifie(access.create),
        update: secondFacteurVerifie(access.update),
        delete: secondFacteurVerifie(access.delete),
        unlock: secondFacteurVerifie(access.unlock),
        readVersions: secondFacteurVerifie(access.readVersions),
        // La lecture des contenus reste celle du site ; tout le reste se ferme.
        read: LECTURE_PUBLIQUE.has(collection.slug)
          ? access.read
          : secondFacteurVerifie(access.read),
      },
    };
  }),
  globals: (config.globals ?? []).map((global) => {
    const { access = {} } = global;
    return {
      ...global,
      access: {
        ...access,
        update: secondFacteurVerifie(access.update),
        readVersions: secondFacteurVerifie(access.readVersions),
        read: LECTURE_PUBLIQUE.has(global.slug)
          ? access.read
          : secondFacteurVerifie(access.read),
      },
    };
  }),
});

/**
 * Formulations françaises de la double authentification.
 *
 * Le greffon est traduit, mais ses titres portent des capitales anglaises
 * (« Configuration de l'Authentification à Deux Facteurs ») et son vocabulaire
 * ne suit pas celui du reste du back-office. Ses propres chaînes écrasant
 * celles qu'on lui passe, la correction se fait après lui, sur la
 * configuration qu'il a déjà produite.
 */
export const traduireSecondFacteur = (config: Config): Config => ({
  ...config,
  i18n: {
    ...config.i18n,
    translations: {
      ...config.i18n?.translations,
      fr: {
        ...config.i18n?.translations?.fr,
        totpPlugin: {
          ...(config.i18n?.translations?.fr as { totpPlugin?: object })
            ?.totpPlugin,
          authApp: "Application d'authentification",
          configured: "Configurée",
          errors: {
            alreadySet: "Votre double authentification est déjà configurée.",
          },
          fieldDescription:
            "Une application d'authentification engendre le code à six chiffres demandé à chaque connexion.",
          setup: {
            addCodeManually: "Saisir la clé à la main",
            button: "Configurer",
            description:
              "Installez une application d'authentification sur votre téléphone, par exemple Google Authenticator, Authy ou le gestionnaire de mots de passe que vous utilisez déjà, puis scannez ce code avec elle.",
            enterCode:
              "Saisissez le code à {digits} chiffres affiché par votre application :",
            incorrectCode:
              "Code refusé. Si cela se répète, scannez de nouveau le code.",
            title: "Configuration de la double authentification",
          },
          verify: { title: "Vérification" },
        },
      },
    },
  },
});
