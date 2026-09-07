import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Remplace l'image du hero de la page Blog.
 *
 * Usage :
 *   npx payload run scripts/remplacer-image-blog.ts <chemin> "<texte alternatif>"
 *
 * Le fichier est versé dans Supabase par la collection `media`, puis rattaché
 * à la page. L'ancienne image n'est pas supprimée : elle reste disponible au
 * back-office, et rien ne dit qu'elle ne resservira pas ailleurs.
 *
 * Le texte alternatif est obligatoire. Une image de hero n'est pas décorative :
 * elle porte le sujet de la page, et un `alt` vide la rendrait muette pour qui
 * ne la voit pas. Il n'est pas non plus devinable depuis un nom de fichier.
 */
const [chemin, alt] = process.argv.slice(-2);

if (!chemin || !alt || chemin.startsWith("-") || chemin === alt) {
  console.error(
    'Usage : npx payload run scripts/remplacer-image-blog.ts <chemin> "<texte alternatif>"',
  );
  process.exit(1);
}

const payload = await getPayload({ config });

const media = await payload.create({
  collection: "media",
  data: { alt },
  filePath: chemin,
});
console.log(`versée : ${media.filename} (${media.width}×${media.height})`);

const { docs } = await payload.find({
  collection: "pages",
  where: { slug: { equals: "blog" } },
  limit: 1,
  depth: 0,
  overrideAccess: true,
});

if (!docs[0]) {
  console.error("La page « blog » est introuvable.");
  process.exit(1);
}

// Le champ image n'est pas localisé : une seule écriture suffit aux deux
// langues. Seul le texte alternatif, porté par le média, l'est.
await payload.update({
  collection: "pages",
  id: docs[0].id,
  data: { image: media.id },
  overrideAccess: true,
});

console.log("La page Blog pointe désormais sur cette image.");
process.exit(0);
