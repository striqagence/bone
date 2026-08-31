/**
 * Logo LinkedIn du bouton « Nous suivre sur » (Figma, page Contact).
 *
 * Le fichier de marque est servi tel quel : c'est un logo tiers, qui ne doit
 * pas suivre la couleur du texte comme le font les pictogrammes du site.
 */
export function IconeLinkedin() {
  return (
    <span className="inline-flex size-5 shrink-0 items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/linkedin.svg" alt="" width={15.697} height={15} />
    </span>
  );
}
