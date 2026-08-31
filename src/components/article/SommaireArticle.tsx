import { Surtitre } from "@/components/ui/Surtitre";

/**
 * Sommaire d'un article (Figma, colonne de gauche du détail).
 *
 * Les entrées sont dérivées des titres du corps plutôt que saisies : un
 * sommaire ressaisi à la main finit toujours par mentir sur le contenu qu'il
 * annonce. Il colle en haut au défilement, la colonne étant plus courte que
 * l'article.
 */
export function SommaireArticle({
  surtitre,
  entrees,
}: {
  surtitre: string;
  entrees: { texte: string; ancre: string }[];
}) {
  if (entrees.length === 0) return null;

  return (
    <nav aria-label={surtitre} className="flex w-full flex-col gap-2.5 lg:sticky lg:top-32">
      <Surtitre>{surtitre}</Surtitre>
      <ul className="flex flex-col">
        {entrees.map(({ texte, ancre }) => (
          <li key={ancre}>
            <a
              href={`#${ancre}`}
              className="block py-1.5 pl-5 text-base leading-[1.5] text-primary-950 opacity-60 transition-opacity hover:opacity-100"
            >
              {texte}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
