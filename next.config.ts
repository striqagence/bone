import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Supprime `X-Powered-By: Next.js, Payload`. Un seul réglage suffit : c'est
  // `withPayload` qui pose l'en-tête combiné, et il ne l'ajoute que si
  // `poweredByHeader !== false`.
  poweredByHeader: false,

  images: {
    remotePatterns: [
      // Médias servis directement par le CDN Supabase.
      { protocol: "https", hostname: "*.supabase.co" },
    ],
    // Les médias Payload changent de nom de fichier à chaque remplacement :
    // un cache long évite de ré-optimiser à froid à chaque expiration.
    minimumCacheTTL: 2_678_400, // 31 jours
  },

  /**
   * Raccourcis vers les pôles.
   *
   * « Expertise », « Capital » et « Feed » sont des noms de marque avant
   * d'être des rubriques : ils s'écrivent tels quels dans une signature, sur
   * une carte de visite ou dans un message LinkedIn. Les trois adresses
   * courtes répondaient 404, ce qui transforme chacune de ces mentions en
   * impasse. Elles mènent désormais à la page du pôle.
   *
   * Permanentes, parce que la forme longue est et restera la vraie adresse :
   * c'est elle que déclarent le plan du site et les balises canoniques.
   */
  async redirects() {
    const poles = ["expertise", "capital", "feed"];
    return poles.flatMap((pole) => [
      { source: `/${pole}`, destination: `/competences/${pole}`, permanent: true },
      { source: `/en/${pole}`, destination: `/en/competences/${pole}`, permanent: true },
      { source: `/zh/${pole}`, destination: `/zh/competences/${pole}`, permanent: true },
    ]);
  },
};

export default withPayload(nextConfig);
