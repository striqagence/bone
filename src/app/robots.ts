import type { MetadataRoute } from "next";

import { ADRESSE_PROVISOIRE, BASE } from "@/lib/donnees-structurees";

/**
 * robots.txt
 *
 * Tant que le site vit sur une adresse de prévisualisation, l'indexation est
 * refusée en bloc. Une préproduction indexée entre en concurrence avec le
 * domaine définitif sur ses propres contenus, et se déréférence lentement et
 * mal une fois le vrai site en ligne.
 *
 * Le basculement est automatique : dès que le site répond depuis son domaine,
 * `ADRESSE_PROVISOIRE` devient faux et l'indexation s'ouvre. Rien à penser le
 * jour de la mise en ligne.
 *
 * Le back-office et l'API restent fermés aux robots dans tous les cas.
 */
export default function robots(): MetadataRoute.Robots {
  if (ADRESSE_PROVISOIRE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/design-system"] }],
    /* Le plan y est annoncé en plus d'être déposé à la main dans les outils
       pour webmasters : un robot qui découvre le site par un lien extérieur ne
       passe pas par ces outils, et c'est ici qu'il cherche. */
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
