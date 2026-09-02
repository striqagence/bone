/**
 * Balise JSON-LD d'une page.
 *
 * Le contenu est sérialisé côté serveur et posé tel quel : c'est du texte pour
 * les moteurs, jamais rendu à l'écran. Les chevrons fermants sont échappés,
 * une chaîne du contenu pouvant sinon refermer la balise avant l'heure.
 */
export function DonneesStructurees({ donnees }: { donnees: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(donnees).replace(/</g, "\\u003c"),
      }}
    />
  );
}
