import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Fabrique l'image de partage du site (« Open Graph »).
 *
 * Sans elle, un lien posté sur LinkedIn s'affiche en bloc de texte nu. C'est
 * gênant pour n'importe quel site, et particulièrement ici : LinkedIn est le
 * canal de l'entreprise, et le seul que le pied de page mette en avant.
 *
 * Une seule image sert les trois langues. Elle ne porte que la marque, aucun
 * texte rédigé : le titre et la description accompagnent déjà le lien, dans la
 * langue de la page, et les répéter dans l'image les rendrait illisibles sur
 * une vignette.
 *
 * Le rendu passe par Chrome, comme pour l'image de l'adresse de courriel :
 * c'est le seul moyen d'obtenir la photographie, le dégradé et le logotype
 * composés exactement comme sur le site. La dépendance à Chrome reste ici, à
 * la génération, et n'existe ni au build ni à l'exécution.
 *
 *   npx payload run scripts/generer-image-partage.ts
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

/** Dimensions attendues par LinkedIn, Facebook et X. */
const LARGEUR = 1200;
const HAUTEUR = 630;

const payload = await getPayload({ config });

/* La photographie vient du back-office et non d'un fichier figé : c'est celle
   du héros de l'accueil, et elle suivra un changement de visuel. */
const { docs } = await payload.find({
  collection: "media",
  where: { filename: { equals: "hero-accueil.jpg" } },
  limit: 1,
  depth: 0,
  overrideAccess: true,
});
const fond = (docs[0] as { url?: string } | undefined)?.url;
if (!fond) {
  console.error("La photographie « hero-accueil.jpg » est introuvable en base.");
  process.exit(1);
}

const logotype = path.join(process.cwd(), "public", "brand", "bone-logotype.svg");
const filigrane = path.join(process.cwd(), "public", "brand", "filigrane-cta.svg");

const page = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  html, body { margin: 0; padding: 0; }
  body {
    width: ${LARGEUR}px; height: ${HAUTEUR}px;
    position: relative; overflow: hidden;
    background: #000022;
  }
  .photo {
    position: absolute; inset: 0;
    width: 100%; height: 100%; object-fit: cover;
  }
  /* Le même voile que les héros du site : la photographie reste lisible, le
     logotype blanc garde son contraste sur toute la largeur. */
  .voile {
    position: absolute; inset: 0;
    background:
      linear-gradient(90deg, rgba(0,0,34,0.92) 0%, rgba(0,0,34,0.72) 55%, rgba(0,0,34,0.55) 100%),
      linear-gradient(0deg, rgba(0,0,34,0.6) 0%, rgba(0,0,34,0) 60%);
  }
  .filigrane {
    position: absolute; right: -40px; bottom: -80px;
    width: 520px; opacity: 0.5;
  }
  .marque {
    position: absolute; left: 88px; top: 50%;
    transform: translateY(-50%);
    width: 620px;
  }
</style></head>
<body>
  <img class="photo" src="${fond}" alt="">
  <div class="voile"></div>
  <img class="filigrane" src="file://${filigrane}" alt="">
  <img class="marque" src="file://${logotype}" alt="">
</body></html>`;

const dossier = mkdtempSync(path.join(tmpdir(), "partage-"));
const fichier = path.join(dossier, "partage.html");
writeFileSync(fichier, page);

const destination = path.join(process.cwd(), "public", "brand", "partage.png");
execFileSync(
  CHROME,
  [
    "--headless",
    "--disable-gpu",
    "--hide-scrollbars",
    `--window-size=${LARGEUR},${HAUTEUR}`,
    "--virtual-time-budget=15000",
    `--screenshot=${destination}`,
    `file://${fichier}`,
  ],
  { stdio: ["ignore", "pipe", "ignore"] },
);

console.log(`image écrite : public/brand/partage.png (${LARGEUR}×${HAUTEUR})`);
process.exit(0);
