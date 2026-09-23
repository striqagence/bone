/**
 * Parcours commun à l'extraction et à la réinjection des traductions.
 *
 * Le même chemin doit désigner la même chaîne dans les deux sens, sinon une
 * traduction atterrit dans le mauvais champ sans que rien ne le signale. Un
 * seul parcours est donc partagé, plutôt que deux écritures jumelles vouées à
 * diverger.
 */

/**
 * Clés à ne jamais traduire.
 *
 * `chemin` mérite une mention : il porte des chemins d'URL, et les
 * identifiants d'URL ne sont pas localisés. Traduire « /notre-approche »
 * fabriquerait des liens morts dans toute la version chinoise.
 */
const CLES_IGNOREES = new Set([
  "id",
  "slug",
  "chemin",
  "url",
  "filename",
  "mimeType",
  "blockType",
  "blockName",
  "createdAt",
  "updatedAt",
  "publieLe",
  "_status",
  "thumbnailURL",
  "sizes",
  "width",
  "height",
  "focalX",
  "focalY",
  "filesize",
  "prefix",
  "pole",
  "categorie",
  "image",
  "parent",
  "valeur",
  "langue",
  /* Champs de service de Payload, qui ressemblent à du texte sans en être :
     `globalType` nomme le global, `_order` ordonne les catégories. */
  "globalType",
  "_order",
  /* Attributs de structure de l'éditeur de texte riche. Ils ressemblent à des
     chaînes, mais décrivent la mise en forme : « h2 », « paragraph », « ltr ».
     Traduire « type: paragraph » détruirait le document. */
  "tag",
  "type",
  "direction",
  "format",
  "mode",
  "version",
  "listType",
  "textFormat",
  "textStyle",
  "style",
  "language",
  "relationTo",
  "docId",
  "rel",
  "target",
  "indent",
  /* Valeurs de listes déroulantes : ce sont des clés, pas du texte. Traduire
     « picto: securite » ferait disparaître le pictogramme. */
  "picto",
  "profil",
  /* Noms de fichiers des logos partenaires. */
  "fichier",
  /* Adresses : une URL traduite est un lien mort. */
  "linkedin",
  "href",
  "lien",
]);

export type Chaine = { chemin: string; texte: string };

/** Vrai pour un nœud de texte Lexical. */
const estTexteLexical = (v: unknown): v is { type: "text"; text: string } =>
  !!v && typeof v === "object" && (v as { type?: string }).type === "text" &&
  typeof (v as { text?: unknown }).text === "string";

/**
 * Parcourt un document et appelle `visiter` sur chaque chaîne traduisible.
 *
 * `visiter` peut renvoyer une chaîne de remplacement : c'est ainsi que la
 * réinjection se fait, sur une copie, sans second parcours.
 */
export function parcourir(
  valeur: unknown,
  visiter: (c: Chaine) => string | void,
  chemin = "",
): void {
  if (Array.isArray(valeur)) {
    valeur.forEach((v, i) => parcourir(v, visiter, `${chemin}[${i}]`));
    return;
  }
  if (!valeur || typeof valeur !== "object") return;

  const objet = valeur as Record<string, unknown>;

  if (estTexteLexical(objet)) {
    const remplacement = visiter({ chemin: `${chemin}.text`, texte: objet.text as string });
    if (typeof remplacement === "string") objet.text = remplacement;
    return;
  }

  for (const [cle, v] of Object.entries(objet)) {
    if (CLES_IGNOREES.has(cle)) continue;
    const sous = chemin ? `${chemin}.${cle}` : cle;
    if (typeof v === "string") {
      if (!v.trim()) continue;
      const remplacement = visiter({ chemin: sous, texte: v });
      if (typeof remplacement === "string") objet[cle] = remplacement;
    } else {
      parcourir(v, visiter, sous);
    }
  }
}

export const COLLECTIONS = ["pages", "posts", "categories", "media"] as const;
export const GLOBAUX = ["accueil", "contact", "navigation", "blog"] as const;
