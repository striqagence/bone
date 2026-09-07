import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { getPayload } from "payload";
import config from "@payload-config";

import { nomImageCourriel } from "../src/lib/courriel";

/**
 * Fabrique l'image de l'adresse de courriel des pages légales.
 *
 * À relancer si l'adresse change au back-office. Sans cela, la page ne trouve
 * plus le fichier attendu et se rabat sur un renvoi au formulaire.
 *
 * Le rendu passe par Chrome plutôt que par une bibliothèque d'images : c'est
 * le seul moyen d'obtenir exactement la police du site, ses ligatures et son
 * crénage. Le prix est une dépendance à Chrome, mais seulement ici, à la
 * génération, jamais au build ni à l'exécution.
 *
 * Deux passes sont nécessaires. La première mesure la ligne et, surtout, la
 * position de sa ligne de base : une image posée dans un paragraphe s'aligne
 * par le bas, et sans cette mesure l'adresse flotterait au-dessus du texte qui
 * l'entoure. La seconde capture la boîte ainsi mesurée, sur fond transparent.
 */
const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((c) => existsSync(c));

if (!CHROME) {
  console.error("Chrome est introuvable : impossible de générer l’image.");
  process.exit(1);
}

/**
 * Rendu à quatre fois la taille d'affichage la plus grande (18px), pour que
 * l'image reste nette sur un écran à forte densité.
 */
const TAILLE = 72;
const INTERLIGNE = 1.6;

const payload = await getPayload({ config });
const { contact } = await payload.findGlobal({ slug: "navigation", depth: 0 });
const adresse = contact.email;

const page = (mesure: boolean) => `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400&display=block">
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  #ligne {
    display: inline-block;
    font: 400 ${TAILLE}px/${INTERLIGNE} "Work Sans", sans-serif;
    /* La couleur du corps de texte. L'opacité du paragraphe s'applique par
       dessus à l'affichage : la baker ici l'appliquerait deux fois. */
    color: #131353;
    white-space: nowrap;
  }
  /* Repère de hauteur nulle : son bas tombe sur la ligne de base. */
  #base { display: inline-block; width: 0; height: 0; }
</style></head>
<body><span id="ligne">${adresse}<span id="base"></span></span>
<script>
  document.fonts.ready.then(() => {
    const ligne = document.getElementById("ligne").getBoundingClientRect();
    const base = document.getElementById("base").getBoundingClientRect();
    document.title = [Math.ceil(ligne.width), Math.ceil(ligne.height), Math.round(base.bottom - ligne.top)].join(",");
    ${mesure ? "" : 'document.body.style.width = "max-content";'}
  });
</script></body></html>`;

const dossier = mkdtempSync(path.join(tmpdir(), "courriel-"));
const fichierHtml = path.join(dossier, "ligne.html");

const lancer = (args: string[]) =>
  execFileSync(CHROME, ["--headless", "--disable-gpu", "--hide-scrollbars", ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });

// ------------------------------------------------------------ première passe
writeFileSync(fichierHtml, page(true));
const dom = lancer(["--virtual-time-budget=8000", "--dump-dom", `file://${fichierHtml}`]);
const titre = /<title>([\d,]+)<\/title>/.exec(dom)?.[1];
if (!titre) {
  console.error("La mesure a échoué : la police n’a probablement pas pu être chargée.");
  process.exit(1);
}
const [largeur, hauteur, base] = titre.split(",").map(Number);
console.log(`mesure : ${largeur}×${hauteur} px, ligne de base à ${base} px du haut`);

// ------------------------------------------------------------ seconde passe
const nom = nomImageCourriel(adresse);
const destination = path.join(process.cwd(), "public", "brand", nom);
writeFileSync(fichierHtml, page(false));
lancer([
  `--window-size=${largeur},${hauteur}`,
  "--default-background-color=00000000",
  "--virtual-time-budget=8000",
  `--screenshot=${destination}`,
  `file://${fichierHtml}`,
]);

writeFileSync(
  destination.replace(/\.png$/, ".json"),
  JSON.stringify({ largeur, hauteur, base, taille: TAILLE }, null, 2) + "\n",
);

console.log(`image écrite : public/brand/${nom}`);
process.exit(0);
