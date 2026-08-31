import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Le pooler Supabase plafonne à 15 connexions simultanées. Le build prérend
   * les pages sur autant de workers qu'il y a de cœurs, chacun ouvrant son
   * propre pool Payload : sur cette machine, la génération statique saturait le
   * pooler et échouait sans message clair, juste des délais dépassés.
   *
   * Deux workers suffisent largement pour une poignée de pages statiques, et
   * laissent la marge nécessaire aux requêtes imbriquées de Payload — que
   * réduire le pool à une connexion faisait au contraire interbloquer.
   */
  experimental: { cpus: 2 },
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
};

export default withPayload(nextConfig);
