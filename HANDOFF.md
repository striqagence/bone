# État du projet — 28 août 2026

Site vitrine **BONE IT**, intégré depuis Figma. Ce document sert à reprendre le
travail : il consigne ce qui est en place, les décisions prises et ce qui reste
à trancher.

---

## Accès et infrastructure

| | |
| --- | --- |
| Repo | [striqagence/bone](https://github.com/striqagence/bone) |
| Projet Vercel | `bone`, scope **StriQ** (`team_TB3tCIuoA5B6EZoldysww0hi`) |
| URL de production | **https://bone-striqagence.vercel.app** |
| Base | Supabase `tdtcgyvesbrvxgqtqzwc`, région `eu-west-1` |
| Médias | bucket public `media`, clés S3 en variables d'environnement |
| Fichier Figma | clé `qVfmMdH5gRReZS5uhzbMw4` |

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

## Décisions prises, à confirmer

- **Troisième pôle nommé `Feed`.** Le fichier Figma emploie trois graphies :
  « Feed » (déroulant), « Média » (footer), « Media » (nom d'écran). Retenu
  `Feed` partout, URL `/competences/feed`.
- **Placement du déroulant** : centré sous la barre. Il fait 781px là où
  l'entrée de menu en fait 150, et aucune maquette ne le montre posé dans une
  page.
- **Filigrane du footer ancré en bas**, pas à son `top: 402px` d'origine :
  équivalent aujourd'hui, mais résistant à l'allongement du contenu en anglais.
- **Liens légaux créés** (`/mentions-legales`, `/politique-de-confidentialite`,
  `/gestion-des-cookies`) alors que Figma n'y met que du texte. **Ces pages
  n'existent pas encore.**

---

## Questions ouvertes

1. **Où vivent les libellés de navigation ?** Ils sont écrits en dur en français
   dans `Navigation.tsx`, `MenuDeroulant.tsx` et `Footer.tsx`, alors que le site
   est bilingue. Deux options : un global Payload « Navigation » (traduisible
   depuis le back-office, sans déploiement) ou des fichiers de traduction dans
   le code. **Préférence : le global Payload.** À trancher avant d'aller plus
   loin — chaque composant ajouté aggrave la dette.
2. **Collections Payload** : rien n'est modélisé au-delà de `Users` et `Media`.
   Un site vitrine avec blog appelle au minimum `Pages` et `Posts`.
3. **Adaptation mobile** : aucune maquette mobile trouvée dans le fichier (l'API
   ne liste qu'une page, « Cover »). Décision actée : **le mobile sera dérivé du
   desktop**, en signalant les points relevant d'un choix de design (navigation
   repliée, éléments masqués, recadrages) plutôt qu'en les glissant dans le
   code. Les frames mobile restent l'arbitre si elles sont fournies.
4. **Pas d'adaptateur e-mail** : la réinitialisation de mot de passe du
   back-office ne part pas. `striq-web` utilise Resend.
5. **Rotation des identifiants Supabase** : ils ont transité par une
   conversation. À régénérer si l'on veut être rigoureux.

---

## Suite du travail

Composants partagés restants, avec leurs identifiants Figma :

| Composant | Node |
| --- | --- |
| Hero pages internes niveau 1 | `4180:6614` |
| Hero pages internes niveau 2 | `4180:7024` |
| Fil d'ariane | `4180:6407` |
| Surtitre | `4048:1052` |
| Pôles | `4112:787` |
| Formulaire | `4186:6095` |
| Carte blog | `4135:3497` |
| Logo compétences | `4180:7000` |

Puis les écrans, page « Maquettes desktop » (`1:12`) :

| Écran | Node | Hauteur |
| --- | --- | --- |
| Homepage | `4042:1110` | 10 669 px |
| Compétences | `4135:1171` | 2 559 px |
| Compétences → Expertise | `4135:2651` | 6 089 px |
| Compétences → Capital | `4145:4904` | 5 367 px |
| Compétences → Media | `4146:5686` | 4 008 px |
| Notre approche | `4147:6348` | 4 623 px |
| Blog | `4148:8071` | 4 186 px |
| Détail d'un article | `4153:9100` | 5 862 px |
| À propos | `4159:10191` | 4 891 px |
| Contact | `4159:11124` | 2 940 px |

Section « Composants » : `4028:97`.

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
