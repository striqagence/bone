/**
 * Surtitre de section (Figma « Surtitre »).
 *
 * La maquette définit deux variantes, « Sur blanc » (noir) et « Sur dark »
 * (blanc), mais le hero des pages internes surcharge la couleur en marine. Les
 * trois sont donc nommées ici plutôt que laissées à une surcharge par
 * `className` : entre `text-black` et `text-primary-950`, c'est l'ordre des
 * règles compilées qui trancherait, pas l'ordre des classes.
 *
 * La marque bleue, elle, ne change pas d'une variante à l'autre.
 */
const couleurs = {
  noir: "text-black",
  blanc: "text-white",
  marine: "text-primary-950",
} as const;

export function Surtitre({
  children,
  couleur = "noir",
  className = "",
}: {
  children: React.ReactNode;
  couleur?: keyof typeof couleurs;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center justify-center gap-2.5 titrage text-xs font-semibold uppercase leading-5 tracking-widest whitespace-nowrap ${couleurs[couleur]} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/surtitre-marque.svg"
        alt=""
        width={7.7833}
        height={12}
        className="shrink-0"
      />
      {children}
    </p>
  );
}
