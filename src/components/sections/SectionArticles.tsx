import { CarteArticle } from "@/components/ui/CarteArticle";
import { Surtitre } from "@/components/ui/Surtitre";
import type { Langue } from "@/lib/i18n";
import type { Article } from "@/lib/articles";

/**
 * Bandeau « À lire aussi » (Figma, écran Expertise).
 *
 * Le titre tient dans une colonne étroite à gauche, les cartes défilent
 * horizontalement à droite. Le débordement est assumé : la maquette laisse la
 * dernière carte coupée, ce qui signale qu'il y en a d'autres.
 */
export function SectionArticles({
  langue,
  surtitre,
  titre,
  libelleAction,
  articles,
}: {
  langue: Langue;
  surtitre: string;
  titre: string;
  libelleAction: string;
  articles: Article[];
}) {
  return (
    <section className="flex w-full flex-col items-center bg-white px-6 pb-16 pt-12 lg:px-28 lg:pb-24 lg:pt-20">
      <div className="flex w-full max-w-[1600px] flex-col items-start gap-6 lg:flex-row lg:items-end">
        <div className="flex flex-col items-start justify-end gap-2.5 lg:w-[216px] lg:shrink-0">
          <Surtitre>{surtitre}</Surtitre>
          <h2 className="w-full titrage text-2xl font-bold leading-[1.4] text-primary-950 lg:text-3xl">
            {titre}
          </h2>
        </div>

        {/* Le défilement horizontal est porté par la liste elle-même : sur un
            écran étroit, empiler quatre cartes de 500px de haut noierait la
            section. */}
        <ul className="flex w-full min-w-px gap-7 overflow-x-auto pb-3 lg:flex-1">
          {articles.map((article) => (
            <li key={article.chemin} className="shrink-0">
              <CarteArticle
                langue={langue}
                chemin={article.chemin}
                categorie={article.categorie}
                date={article.date}
                tempsDeLecture={article.tempsDeLecture}
                titre={article.titre}
                description={article.description}
                libelleAction={libelleAction}
                image={article.image}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
