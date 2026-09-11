# État du projet — 31 août 2026

Site vitrine **BONE IT**, intégré depuis Figma. Ce document sert à reprendre le
travail : il consigne ce qui est en place, les décisions prises et ce qui reste
à trancher.

**Fait à ce jour** : design system, composants partagés, bilinguisme, collection
Pages, et la **page d'accueil complète** (12 sections). Rendu desktop et mobile
validés par la cliente.

---

## Accès et infrastructure

| | |
| --- | --- |
| Repo | [striqagence/bone](https://github.com/striqagence/bone) |
| Projet Vercel | `bone`, scope **StriQ** (`team_TB3tCIuoA5B6EZoldysww0hi`) |
| URL de production | **https://bone-striqagence.vercel.app** |
| Base | Supabase `tdtcgyvesbrvxgqtqzwc`, région `eu-west-1` |
| Médias | bucket public `media`, clés S3 en variables d'environnement |
| Fichier Figma | clé `qVfmMdH5gRReZS5uhzbMw4`, plan **Professional** (200 appels/jour) |

**`bone.vercel.app` n'est pas ce site** : ce sous-domaine appartient à un projet
tiers. L'URL de production est bien `bone-striqagence.vercel.app`.

La **protection de déploiement Vercel est active** : le site répond 302 vers le
SSO pour un visiteur non connecté. À désactiver dans
*Settings > Deployment Protection* le jour de la mise en ligne.

Le repo est relié à Vercel : tout push sur `main` déclenche un déploiement, et
`payload migrate` est joué au build.

---

## Stack

Next.js 16 (App Router) · Payload 3.88 · Postgres (Supabase) · Tailwind 4 · npm.

Deux groupes de routes : `(frontend)` pour le site public, `(payload)` pour le
back-office et l'API. Calqué sur `striq-web`.

---

## Ce qui est en place

### Design system

Transcrit dans `src/app/(frontend)/[locale]/globals.css`. Le kit Figma est
**dérivé de Tailwind** : tailles de texte, espacements, rayons et nuances
`gray/`, `red/` reprennent les valeurs par défaut du framework. Seul ce qui est
propre à la marque est déclaré — redéfinir le reste dupliquerait Tailwind et
dériverait à la prochaine montée de version.

| Figma | Token | Valeur |
| --- | --- | --- |
| Blue Primary/600* | `primary-600` | `#2020ff` |
| Blue Primary/50 · 800 · 900 · 950 | `primary-*` | `#ebf1ff` `#1e1db6` `#20228f` `#131353` |
| Blue Accent/700* | `accent-700` | `#0095ff` |
| Brand Gris/50 · 100 · 300 · 400* · 950 | `gris-*` | `#fafafa` `#f3f3f6` `#dadadb` `#8b8ba4` `#08080c` |
| (non nommé dans Figma) | `encre` | `#000022` |
| family/Primary | `font-display` | Google Sans Flex |
| family/Secondary | `font-sans` | Work Sans |
| Card Shadow | `shadow-card` | `0 4px 14px rgb(0 0 0 / .25)` |

Hauteurs de ligne : 1,5 texte courant, 1,4 titrages, 1,2 au-delà de 48px.

**Google Sans Flex est une variable à axes personnalisés** et la maquette pousse
`wdth` à 120. Sans ce réglage les glyphes sont plus étroits et les largeurs de
boutons changent. Le style `fontVariationSettings` est appliqué partout où cette
police est utilisée — ne pas l'oublier sur un nouveau composant.

### Composants

- `ui/Button.tsx` — 3 types (primary, secondary, tertiaire), 3 tailles
  (`lg`, `sm`, `barre`). La taille `barre` existe parce que le bouton de la
  navigation est plus plat que celui des sections : la nommer évite qu'un
  `px-5 py-3.5` en `className` écrase `p-5` par un effet d'ordre CSS.
- `ui/ArrowRight.tsx` — tracé exporté conservé, pivoté comme dans la maquette.
  Dimensions explicites : glyphe 14,83 × 9,83 dans une boîte de 20.
- `site/Header.tsx` · `Navigation.tsx` · `NavLink.tsx` · `MenuDeroulant.tsx` ·
  `SelecteurLangue.tsx` · `Footer.tsx`

`NavLink` a trois états repris du Figma : Default (Work Sans 400, sans marque),
Hover (500, marque 21 × 25 à `left: -13px`), Active (500, marque 14 × 16 à
`left: -18px`). La marque est en **position absolue** pour que la barre ne se
réorganise pas quand elle apparaît.

### Bilingue

Français à la racine (`/contact`), anglais sous préfixe (`/en/contact`).

- `src/middleware.ts` réécrit les URLs sans préfixe vers `/fr/...` sans changer
  l'URL affichée. Le back-office et l'API sont hors de son périmètre.
- `src/lib/i18n.ts` — helpers `lien()`, `cheminSansLangue()`, `prefixe()`.
- Payload : locales `fr` (défaut) et `en`, **repli activé** — sans lui une page
  non traduite s'afficherait vide.
- Le sélecteur de langue conserve la page consultée.

Vérifié : `/`, `/en`, `/admin`, `/api/*` répondent 200 ; `/de/...` renvoie 404.

### Planche de contrôle

`/design-system` montre boutons, palette, typographie, états de lien et
déroulant. **À retirer ou conditionner à l'environnement avant la mise en
ligne.**

---

## Pièges rencontrés, qui se reposeront

**Les exports Figma embarquent le décor du cadre.** Tout SVG exporté en tant que
nœud contient le fond blanc de la page, sa bordure grise, parfois un rectangle
opaque et l'aplat de la barre sur laquelle l'élément est posé. Ils couvrent tout
le viewBox et se voient sur fond sombre. Le critère de nettoyage est la
position : un tracé qui démarre en dehors du viewBox n'appartient pas au dessin.
**Vérifier par rendu, pas par lecture du fichier.**

**Un groupe exporté en image est rendu sur canevas blanc.** Le décor de « Notre
promesse » livrait des coins blancs opaques. L'aplatir n'y change rien, le blanc
est dans la source : il faut recomposer les éléments un par un.

**Les axes de police doivent être déclarés.** `next/font` ne sert que la graisse
par défaut ; sans `axes: ["slnt", "wdth"]`, le `wdth 120` de toute la maquette
reste sans effet et rien ne le signale. Le réglage vit dans l'utilitaire
`titrage` de `globals.css`, pas en style inline.

**Les migrations sur un global déjà peuplé** échouent sur `column contains null
values`. Motif sûr : créer la colonne avec un défaut, le retirer aussitôt.

**Les tableaux localisés partagent leurs lignes entre langues.** Écrire la
seconde langue sans reprendre les identifiants de lignes efface les libellés de
la première. Tous les scripts de peuplement recopient ces identifiants.

**Le pool Postgres est à quatre connexions.** Le pooler Supabase plafonne à 15 :
le défaut de dix sature dès deux contextes. Mais une seule ne marche pas non
plus — Payload imbrique ses requêtes, et la génération statique expire alors sur
toutes les pages, sans message d'erreur.

---

## Décisions prises, à confirmer

- **Troisième pôle nommé `Feed`.** Le fichier Figma emploie trois graphies :
  « Feed » (déroulant), « Média » (pied de page), « Media » (nom d'écran).
- **L'en-tête a deux états** sur l'accueil : au repos, hors flux et posé sur le
  hero ; compact et fixé dès le défilement. Les pages internes gardent la barre
  compacte, leur hero étant clair.
- **Les cartes sont cliquables en entier**, là où la maquette pose l'ancre sur
  le seul petit bouton.
- **La bande des pôles est alimentée par les pages de pôle**, pas par un contenu
  d'accueil : ces libellés apparaissent à quatre endroits, et c'est cette
  duplication qui a produit le Feed/Média/Media.
- **Le mobile est dérivé du desktop**, aucune maquette mobile n'existant. Validé
  par la cliente.

---

## Contenu à écrire

- **Trois réponses de la FAQ** de l'accueil manquent : la maquette n'en rédige
  qu'une sur quatre.
- **Les accroches des pages internes** : seule « Nos compétences » est
  renseignée, les autres retombent sur leur titre.
- **Les textes alternatifs des images** sont écrits d'après ce que montrent les
  maquettes. À relire — c'est ce qu'une personne non voyante reçoit.
- **Une coquille de la maquette** est reproduite telle quelle : « Challenge le
  besoin avant de propose une solution ».
- **L'anglais est une première passe** sur tout le site.

---

## Questions ouvertes

1. **Vidéo du hero d'accueil** : prévue, une image est servie en attendant. Le
   passage demandera un champ vidéo, une balise `<video>` muette en boucle, et
   l'image actuelle en repli.
2. **Mentions légales complètes** : BONE IT, SARL au capital fixe de
   100 000,00 €, SIREN 847 676 970, SIRET 847 676 970 00027, TVA
   FR61847676970, RCS d'Évry, siège au 12 avenue de Norvège, 91140
   Villebon-sur-Yvette, directeur de la publication Tarek Boukachabia. Plus
   aucun crochet dans le texte.
3. **Pas d'adaptateur e-mail** : ni réinitialisation de mot de passe, ni
   notification du formulaire de contact, ni envoi de la lettre d'information.
   `striq-web` utilise Resend.
4. **Rotation des identifiants Supabase** : ils ont transité par une
   conversation.
5. **`/design-system` est publique** : à retirer ou conditionner avant la mise
   en ligne.
6. **Protection de déploiement Vercel** active : à désactiver le jour J.
7. **Tuiles OpenStreetMap** : le plan de la page contact les charge depuis
   `tile.openstreetmap.org`, sans clé ni compte. La fondation demande qu'on
   évite les usages lourds ; une page de contact reste dans les clous. À
   revoir — fournisseur payant ou tuiles hébergées — si le trafic grimpe.
8. **Ajouter une mesure d'audience** obligerait à reprendre la politique de
   confidentialité et la page cookies, qui affirment toutes deux qu'il n'y en
   a pas, et à poser un bandeau de consentement.

---

## Adresse de courriel

L'adresse n'est jamais écrite dans le HTML servi : elle y est encodée, et le
navigateur la rétablit à l'affichage en un lien `mailto:` ordinaire. C'est ce
qui la dérobe aux moissonneurs, qui n'exécutent pas de JavaScript. Dans les
textes longs — mentions légales, confidentialité — le contenu porte le jeton
`⟦courriel⟧`, que le rendu remplace.

Deux pièges à connaître :

- **Un composant client reçoit tout ce qu'on lui passe**, sérialisé dans la
  page. Donner le global `navigation` entier à l'en-tête y réécrivait l'adresse
  sur chaque page ; `pourEntete()` l'en retire.
- **La vérification se fait sur le HTML servi**, pas sur la page rendue :
  `curl … | grep -E '[^@]+@[^@]+\.[a-z]+'` doit ne rien trouver, tandis que le
  même chemin en navigateur doit bien montrer le lien.

---

## Référencement

Chaque page porte son titre et sa description, saisis au back-office : onglet
« Référencement » des pages, groupe du même nom sur les globals Accueil et
Contact. Le script de peuplement refuse d'écrire au-delà de soixante signes
pour le titre et cent soixante pour la description, longueurs au-delà
desquelles Google tronque. Le gabarit du gabarit de page suffixe « | BONE »,
sauf sur l'accueil qui déclare son titre en absolu.

Les données structurées sont assemblées dans `src/lib/donnees-structurees.ts`
et posées en une seule balise par page. Deux règles s'y tiennent : ne décrire
que ce que la page montre — une FAQ balisée dont la réponse serait absente
enfreindrait les consignes des moteurs — et ne rien inventer, d'où l'absence
des identifiants d'immatriculation, qui manquent aussi aux mentions légales.

**`NEXT_PUBLIC_SERVER_URL` doit porter le domaine de production.** Toutes les
adresses absolues en dépendent : canoniques, alternances de langue, fiches
JSON-LD. En développement elle vaut localhost, ce qui est sans conséquence,
mais une mise en ligne avec cette valeur ferait pointer le balisage sur une
machine locale.

Les articles de blog sont volontairement sans balisage : leur contenu est du
remplissage, il n'y a rien à déclarer aux moteurs tant qu'il n'est pas écrit.

---

## Tablettes

Le seuil `lg` de Tailwind tombe à 1024px, soit exactement la largeur d'une
tablette en paysage. Plusieurs blocs y basculaient en deux colonnes alors que
la place manquait :

- les cartes d'article, en trois colonnes, tombaient à 235px de large ; leur
  hauteur étant figée à 500px, le bouton « Lire l'article » sortait de la carte
  de 56 à 112px ;
- l'article à la une passait en deux colonnes dans une carte de 400px de haut,
  que son titre sur cinq lignes débordait ;
- le hero des pages internes réduisait sa colonne de droite à 376px, dont une
  photo de 230px et un encart de 194px.

Ces blocs passent maintenant à deux colonnes à partir de `xl` (1280px), et les
hauteurs de la maquette sont devenues des minimums plutôt que des valeurs
figées. Les puces de filtre du blog passent à la ligne dès 768px au lieu de
défiler : faire défiler une bande horizontale à la souris est bien moins
commode qu'au doigt.

Le pied de page avait les mêmes symptômes. Ses trois colonnes de liens
tenaient sur deux colonnes de grille, si bien que la troisième se retrouvait
seule sur sa ligne avec jusqu'à six cents pixels de vide à sa droite ; elles
sont désormais sur une rangée dès 640px. La ligne des mentions ne se met à
l'horizontale qu'à 1280px, en dessous de quoi le dernier lien passait seul à la
ligne. Le filigrane est exprimé en pourcentage du bloc plutôt qu'en pixels : sa
largeur sautait de 820 à 1429px à 1024, où il ne restait du mot « Bone » que
les deux premières lettres.

Mesuré de 390 à 1920px, sur le blog, un article, l'accueil, À propos,
Expertise, Contact et le pied de page, en français et en anglais : aucun
débordement, aucune puce tronquée, aucun contenu hors carte.

## Largeurs

La maquette est dessinée pour 1920px. Les sections gardent ses proportions à
cette largeur et s'adaptent en dessous : les paires de blocs qui se chevauchent
sont exprimées en pourcentages, les grilles perdent des colonnes par paliers, et
les corps de titre descendent d'un cran. Les seuils utilisés sont ceux de
Tailwind — `lg` 1024, `xl` 1280, `2xl` 1536 — plus `min-[1920px]` pour la bande
de logotypes, seul endroit où la maquette suppose vraiment 1920.

Le débordement se vérifie en mesurant, pas à l'œil : une page servie dans une
iframe de largeur donnée, on compare `scrollWidth` et `clientWidth` du document,
puis on cherche les éléments à texte qui sortent du premier ancêtre qui rogne.
Contrôlé à 390, 768, 1024, 1280, 1440, 1512 et 1920.

---

## Suite du travail

Les dix écrans de la page « Maquettes desktop » (`1:12`) sont intégrés :
accueil, Contact, Compétences, Expertise, Capital, Feed, Notre approche, Blog,
détail d'un article et À propos.

Restent des contenus à écrire, tous en première main :

- le corps des neuf articles autres que la une — seul celui de « Dette
  technique d'infrastructure » figure dans la maquette ;
- les réponses des FAQ laissées vides, la maquette n'en montrant qu'une par
  écran ;
- la relecture de l'anglais et des textes de remplacement des images.

Les composants partagés sont tous intégrés : bouton, flèche, surtitre, fil
d'ariane, carte de pôle, carte d'article, ligne de soumission, en-tête, pied de
page, et deux gabarits de hero.

---

## Reprendre

Le serveur MCP Figma est déclaré au **scope user** et authentifié — il sera
disponible d'emblée. Charger le guide `skill://figma/figma-design-to-code/SKILL.md`
avant tout appel à `get_design_context`.

```bash
cd ~/bone && npm install && npm run dev
```

Site sur http://localhost:3000, back-office sur http://localhost:3000/admin.
Le `.env` local est déjà renseigné (non versionné).

## Gabarit d'article

Les deux articles rédigés suivent la même trame, et les suivants devraient s'y
tenir :

1. un encadré **« L'essentiel de cet article »** en tête, qui annonce ce que
   l'article couvre ;
2. le corps, en titres de niveau 2 que le sommaire reprend ;
3. un encadré **« à retenir »** en fin de corps, qui dit quoi en faire. Il ne
   répète pas le premier : l'un oriente, l'autre conclut ;
4. la **FAQ**, puis « à lire aussi », puis l'appel à l'action. La FAQ passe
   avant les autres lectures : elle appartient encore à l'article, alors que
   les renvois en sortent.

Les deux encadrés sont le même bloc d'éditeur (`aRetenir`), dont l'étiquette
est libre. Rien n'impose cette trame dans le schéma : c'est une convention
éditoriale, à tenir à la main au back-office.

## Aperçu depuis le back-office

Chaque page, chaque article et les globaux Accueil, Contact et Blog portent un
bouton d'aperçu dans le back-office. Il ouvre la page publique, brouillon
compris, et un bandeau bleu le signale avec un lien pour en sortir.

Le back-office ne connaît pas l'URL publique d'une page : elle se déduit de la
chaîne de ses parents, que la configuration d'une collection ne peut pas
remonter sans importer Payload et créer un cycle. Le bouton pointe donc vers
`/apercu` avec un identifiant, et c'est cette route qui résout le chemin.

Voir un brouillon demande **deux** conditions : le mode brouillon de Next, posé
par cette route, **et** un utilisateur Payload connecté, que `contexteApercu`
revérifie à chaque rendu. Le cookie seul ne suffit pas, il vit dans le
navigateur et survivrait à une déconnexion. Vérifié : un cookie de brouillon
forgé sans session n'ouvre rien.

Ce qui reste à faire de ce côté : l'aperçu côte à côte, qui affiche la page
dans un panneau de l'admin et se rafraîchit à la frappe. Il demande le paquet
`@payloadcms/live-preview-react`, non installé.

## Brouillons

Les collections `pages` et `posts` versionnent leurs contenus. Leur lecture
publique est filtrée sur `_status: published` par `src/lib/acces.ts` : un
brouillon ne sort ni par le blog, ni par l'API REST, ni par GraphQL.

Deux pièges tiennent à Payload et valent d'être connus avant d'écrire une
requête ou un script :

- le local API ignore l'`access` par défaut. Toute requête du front vers
  `pages` ou `posts` doit porter `overrideAccess: false`, sans quoi elle
  ressort les brouillons ;
- `payload.update({ draft: true })` n'écrit que dans la table des versions.
  Pour dépublier un article, il faut écrire `_status` **sans** `draft: true`.

Un premier article de fond attend en brouillon,
« Fin de support d'un hyperviseur : quatre chemins, et comment choisir »
(`scripts/seed-article-hyperviseur.ts`). Il est visible dans le back-office et
se publie depuis là. Les neuf autres articles restent des placeholders : seul
leur titre existe.

## Formulaires et anti-abus

Les deux formulaires publics (contact, lettre d'information) écrivent dans
Supabase. Quatre protections se superposent, décrites dans `src/lib/antiabus.ts` :

1. **Les collections sont fermées en création.** `POST /api/demandes`,
   `POST /api/abonnes` et les mutations GraphQL équivalentes répondent 403.
   C'était la faille principale : on pouvait remplir les tables sans jamais
   toucher au formulaire. L'action serveur écrit par le local API, qui passe
   outre l'`access` : elle est désormais le seul chemin d'écriture.
2. **Un champ leurre**, invisible et hors du parcours clavier. Rempli, l'envoi
   reçoit une réponse de succès et n'écrit rien. Son nom (`complement`) est
   neutre à dessein : un intitulé du genre « societe » serait rempli par le
   remplissage automatique du navigateur et ferait passer un visiteur pour un
   robot.
3. **Un jeton d'ouverture**, signé, valable de 2 secondes à 3 heures après
   l'affichage, et à usage unique. Il écarte l'envoi instantané et le rejeu
   d'une requête capturée. Les pages étant statiques, il est demandé au montage
   par une action dédiée, jamais rendu dans le HTML.
4. **Un plafond de cadence** par adresse : 3 demandes par heure et 10 par jour,
   5 et 20 pour la lettre d'information. C'est la seule protection qui tienne
   face à quelqu'un qui scripte l'action serveur, et donc celle qui empêche le
   remplissage en masse.

Les compteurs vivent dans la collection `verrous`, masquée du back-office et
fermée de tous les côtés. **L'adresse IP n'y est jamais écrite** : seule une
signature tronquée l'est, et le secret qui permettrait de la recalculer n'est
pas dans la base. Les lignes portent leur péremption et sont purgées à l'envoi
suivant. Ce traitement est déclaré dans la politique de confidentialité.

En cas de panne de la base, les contrôles laissent passer plutôt que de
bloquer : l'enregistrement échouera de toute façon juste après, et refuser
fermerait le formulaire à tout le monde sans rien protéger.

Ce qui reste à faire côté abus : rien n'est branché sur une alerte. Si le
volume de demandes devient un sujet, le plus simple est de surveiller la
croissance de la table `demandes` plutôt que d'ajouter un captcha, qui
obligerait à revoir la politique de confidentialité et à poser une bannière de
consentement.

## Adresse de contact

L'adresse n'apparaît plus dans le pied de page. Même dérobée, elle était
présente sur chaque page du site et donc facile à moissonner. Elle subsiste sur
la page de contact et sur les deux pages légales, où elle est obligatoire, et
toujours sous forme encodée (`lib/courriel.ts`).

Elle a aussi été retirée des données structurées, où elle était publiée **en
clair** dans le JSON-LD de chaque page, ce qui annulait toute la peine prise
ailleurs. La propriété `email` de `Organization` est facultative ; le numéro de
téléphone, lui, reste.

Sur les pages légales, où la loi impose de l'afficher, l'adresse est **une
image** : ni cliquable, ni sélectionnable, ni lisible par un moissonneur. Son
texte de remplacement l'épelle (« bone arobase contact point fr ») pour qu'un
lecteur d'écran la restitue sans qu'une expression régulière la reconnaisse. Le
clic et le copier-coller sont perdus : c'est le prix assumé de ce choix.

Le fichier est produit par `npx payload run scripts/generer-image-courriel.ts`,
qui lit l'adresse dans le back-office et la compose dans la police du site via
Chrome. **À relancer si l'adresse change** : le nom du fichier porte une
empreinte de l'adresse, si bien qu'une adresse modifiée sans régénération ne
correspond plus à aucun fichier, et la page se rabat sur un renvoi au
formulaire plutôt que d'afficher une adresse périmée. Chrome n'est nécessaire
qu'à cette génération, jamais au build ni à l'exécution.
