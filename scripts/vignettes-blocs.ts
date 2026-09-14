import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Régénère les vignettes du sélecteur de blocs du back-office.
 *
 * Chaque bloc est photographié sur le site lui-même, cadré en 16:9 depuis son
 * sommet : c'est là que se trouvent le surtitre et le titre, donc ce qui permet
 * de le reconnaître. Un bloc plus court que le cadre laisse voir le début du
 * suivant, ce qui est sans conséquence à cette taille.
 *
 * À relancer quand une section change d'allure. Demande le site servi sur le
 * port 3000 et Chrome installé ; ni l'un ni l'autre n'est nécessaire au build.
 *
 *   npm start &
 *   npx payload run scripts/vignettes-blocs.ts
 */
const SITE = process.env.SITE ?? "http://localhost:3000";
const LARGEUR = 1440;
const HAUTEUR = 810;
/** Largeur de la vignette servie au back-office. */
const VIGNETTE = 360;
const PORT = 9223;

const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((c) => existsSync(c));
if (!CHROME) {
  console.error("Chrome est introuvable : impossible de générer les vignettes.");
  process.exit(1);
}

/**
 * Repères de capture.
 *
 * La plupart des blocs se retrouvent par leur titre. Deux n'en ont pas :
 * `reperes` n'affiche que des chiffres, `texteLong` un corps de texte libre.
 */
const REPERES_MANUELS: Record<string, { chemin: string; repere: string }> = {
  reperes: { chemin: "/a-propos", repere: "ans d’expérience" },
  texteLong: { chemin: "/mentions-legales", repere: "Éditeur du site" },
};

const payload = await getPayload({ config });

type Noeud = { slug: string; parent?: Noeud | number | null; sections?: Section[] };
type Section = { blockType: string; [cle: string]: unknown };

const cheminDe = (page: Noeud): string => {
  const morceaux = [page.slug];
  let parent: Noeud | number | null | undefined = page.parent;
  while (parent && typeof parent === "object") {
    morceaux.unshift(parent.slug);
    parent = parent.parent;
  }
  return `/${morceaux.join("/")}`;
};

const { docs } = await payload.find({
  collection: "pages",
  limit: 50,
  depth: 2,
  locale: "fr",
  draft: true,
  overrideAccess: true,
});

const carte: Record<string, { url: string; repere: string }> = {};
for (const [bloc, { chemin, repere }] of Object.entries(REPERES_MANUELS)) {
  carte[bloc] = { url: `${SITE}${chemin}`, repere };
}

/** Le texte le plus long a le plus de chances d'être unique dans la page. */
const repereDe = (section: Section): string | null => {
  const candidats = [section.titreBas, section.titre, section.surtitre, section.titreHaut].filter(
    (v): v is string => typeof v === "string" && v.trim().length > 8,
  );
  return candidats.length ? candidats.sort((a, b) => b.length - a.length)[0].slice(0, 48) : null;
};

// L'accueil porte quatre blocs qu'aucune autre page n'utilise.
const accueil = await payload.findGlobal({ slug: "accueil", locale: "fr", depth: 0 });
for (const section of (accueil.sections ?? []) as unknown as Section[]) {
  if (carte[section.blockType]) continue;
  const repere = repereDe(section);
  if (repere) carte[section.blockType] = { url: `${SITE}/`, repere };
}
for (const page of docs as unknown as Noeud[]) {
  for (const section of page.sections ?? []) {
    if (carte[section.blockType]) continue;
    const repere = repereDe(section);
    if (repere) carte[section.blockType] = { url: `${SITE}${cheminDe(page)}`, repere };
  }
}

const profil = mkdtempSync(path.join(tmpdir(), "vignettes-"));
const chrome = spawn(
  CHROME,
  ["--headless", "--disable-gpu", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profil}`, "about:blank"],
  { stdio: "ignore" },
);

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));
await dormir(3000);

const cible = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find(
  (c: { type: string }) => c.type === "page",
);
const ws = new WebSocket(cible.webSocketDebuggerUrl);
let n = 0;
/** Réponse du protocole de débogage : on n'en lit que le résultat. */
type Reponse = { id: number; result?: { data?: string; result?: { value?: string } } };
const attente = new Map<number, (m: Reponse) => void>();
ws.onmessage = (e) => {
  const m = JSON.parse(String(e.data));
  attente.get(m.id)?.(m);
  attente.delete(m.id);
};
await new Promise((r) => (ws.onopen = r as never));
const env = (method: string, params: object = {}) =>
  new Promise<Reponse>((r) => {
    const id = ++n;
    attente.set(id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });

await env("Page.enable");
await env("Emulation.setDeviceMetricsOverride", {
  width: LARGEUR, height: HAUTEUR, deviceScaleFactor: 1, mobile: false,
});

const dossier = path.join(process.cwd(), "public", "blocs");
mkdirSync(dossier, { recursive: true });
const brut = mkdtempSync(path.join(tmpdir(), "brut-"));

let derniere = "";
let posees = 0;
for (const [bloc, { url, repere }] of Object.entries(carte)) {
  if (url !== derniere) {
    await env("Page.navigate", { url });
    await dormir(3200);
    derniere = url;
  }
  const place = await env("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      // L'en-tête est collant : il recouvrirait le surtitre du bloc.
      const entete = document.querySelector('header'); if (entete) entete.style.visibility = 'hidden';
      const s = [...document.querySelectorAll('section')].find((s) => s.textContent.includes(${JSON.stringify(repere)}));
      if (!s) return 'introuvable';
      window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY);
      return 'ok';
    })()`,
  });
  if (place.result?.result?.value !== "ok") {
    console.log(`  ${bloc.padEnd(16)} section introuvable, vignette inchangée`);
    continue;
  }
  // Les apparitions sont pilotées au défilement : il faut les laisser finir.
  await dormir(1600);
  const capture = await env("Page.captureScreenshot", { format: "png" });
  const png = path.join(brut, `${bloc}.png`);
  writeFileSync(png, Buffer.from(capture.result?.data ?? "", "base64"));
  execFileSync("sips", [
    "-s", "format", "jpeg", "-s", "formatOptions", "72",
    "-Z", String(VIGNETTE), png, "--out", path.join(dossier, `${bloc}.jpg`),
  ]);
  console.log(`  ${bloc.padEnd(16)} vignette écrite`);
  posees++;
}

chrome.kill();
console.log(`\n  ${posees} vignettes dans public/blocs`);
process.exit(0);
