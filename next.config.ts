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
    const raccourcis = poles.flatMap((pole) => [
      { source: `/${pole}`, destination: `/competences/${pole}`, permanent: true },
      { source: `/en/${pole}`, destination: `/en/competences/${pole}`, permanent: true },
      { source: `/zh/${pole}`, destination: `/zh/competences/${pole}`, permanent: true },
    ]);

    /**
     * Chemins de l'ancien site.
     *
     * Le nouveau site reprend le domaine de l'ancien, www.bone-it.com, au lieu
     * d'en adopter un nouveau. Ces redirections ne relèvent donc plus d'une
     * migration entre domaines : elles sont la seule chose qui rattrape les
     * quatorze adresses indexées depuis 2023, au moment où elles cessent
     * d'exister. Sans elles, chacune répondrait « page introuvable » le jour de
     * la bascule, et les positions acquises seraient perdues.
     *
     * Le regroupement vers « capital » n'est pas un raccourci : les quatre
     * pages de valorisation, vente de pièces, upgrade et effacement des
     * données décrivent ce que ce pôle couvre désormais d'un seul tenant.
     */
    const ancienSite = Object.entries({
      "/qui-sommes-nous": "/a-propos",
      "/a-propos-esn-integration-infogerance-cybersecurite": "/a-propos",
      "/notre-histoire": "/a-propos",
      "/notre-histoire-valorisation-cloud-cybersecurite": "/a-propos",
      "/nos-services": "/competences",
      "/nos-services-it-integration-cloud-cybersecurite": "/competences",
      "/audit-test-diagnostic": "/competences/expertise",
      "/valorisation-de-parc-informatique": "/competences/capital",
      "/vente-de-piece-informatique": "/competences/capital",
      "/upgrade-des-equipements": "/competences/capital",
      "/effacement-des-donnees": "/competences/capital",
      /* Trois pages de l'ancien site n'ont pas d'équivalent : les conditions
         générales de vente, la page de recrutement et sa candidature, et la
         foire aux questions, devenue des sections au fil des pages. Elles
         mènent à l'accueil, faute de mieux.

         C'est un pis-aller assumé et non une correspondance : un moteur qui
         voit plusieurs adresses converger vers l'accueil y lit souvent une
         page disparue plutôt qu'une page déplacée, et ne transmet alors rien.
         La vraie réponse serait de republier ces contenus. */
      "/conditions-generales-de-vente-bone-it": "/",
      "/nous-rejoindre": "/",
      "/foire-aux-questions": "/",
    }).map(([source, destination]) => ({ source, destination, permanent: true }));

    return [...raccourcis, ...ancienSite];
  },
};

export default withPayload(nextConfig);
