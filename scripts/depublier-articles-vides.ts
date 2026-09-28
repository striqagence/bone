import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Remet en brouillon les articles publiés dont le corps est vide.
 *
 * Un article sans corps s'affiche : titre, catégorie, date, chapô, puis plus
 * rien. Sur un site indexé, ces pages desservent le reste, et un visiteur qui
 * clique y voit une promesse non tenue.
 *
 * Le passage par `_status` est délibéré. `payload.update({ draft: true })`
 * n'écrit que dans la table des versions : le document publié reste en ligne,
 * et le script paraît avoir fonctionné alors que rien n'a changé. Écrire
 * `_status` sans le drapeau touche bien la ligne servie.
 *
 *   npx payload run scripts/depublier-articles-vides.ts
 *   npx payload run scripts/depublier-articles-vides.ts --republier
 */
const republier = process.argv.includes("--republier");
const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: "posts",
  locale: "fr",
  limit: 200,
  depth: 0,
  overrideAccess: true,
  draft: true,
});

const vide = (a: unknown) =>
  !((a as { root?: { children?: unknown[] } } | null | undefined)?.root?.children?.length);

let touches = 0;

for (const article of docs) {
  const sansCorps = vide(article.contenu);
  const statut = (article as { _status?: string })._status;

  const aDepublier = !republier && sansCorps && statut === "published";
  const aRepublier = republier && sansCorps && statut === "draft";
  if (!aDepublier && !aRepublier) continue;

  await payload.update({
    collection: "posts",
    id: article.id,
    data: { _status: republier ? "published" : "draft" } as never,
    overrideAccess: true,
  });
  touches += 1;
  console.log(`  ${republier ? "republié" : "remis en brouillon"} : ${article.slug}`);
}

const { totalDocs: publies } = await payload.find({
  collection: "posts",
  limit: 0,
  depth: 0,
  overrideAccess: false,
});
console.log(`  ${touches} article(s) touché(s), ${publies} encore publié(s)`);
process.exit(0);
