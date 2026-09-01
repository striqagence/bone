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
2. **Mentions légales incomplètes** : forme juridique, capital, RCS, SIRET,
   TVA et directeur de la publication sont entre crochets dans le texte. Le
   reste — hébergeur, sous-traitants, régions — est exact. À compléter au
   back-office avant la mise en ligne.
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
