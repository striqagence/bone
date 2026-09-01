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
 *
 * Le texte peut passer à la ligne : « Votre première étape dépend de votre
 * rôle » réclame 390px d'un seul tenant, plus que la largeur d'un téléphone.
 */
const couleurs = {
  noir: "text-black",
  blanc: "text-white",
  marine: "text-primary-950",
} as const;

/**
 * Le surtitre est d'ordinaire une simple accroche posée au-dessus du titre, et
 * reste alors un paragraphe. Mais quelques sections — les valeurs, les
 * partenaires, la posture — n'ont que lui pour titre : il prend là le niveau de
 * titre que la section réclame, sans changer d'apparence.
 */
export function Surtitre({
  children,
  couleur = "noir",
  className = "",
  balise: Balise = "p",
}: {
  children: React.ReactNode;
  couleur?: keyof typeof couleurs;
  className?: string;
  balise?: "p" | "h2" | "h3";
}) {
  return (
    <Balise
      className={`flex items-center gap-2.5 titrage text-xs font-semibold uppercase leading-5 tracking-widest ${couleurs[couleur]} ${className}`}
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
    </Balise>
  );
}
