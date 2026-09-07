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
 *
 * La bande déborde jusqu'au bord de l'écran plutôt que de s'arrêter sur la
 * marge de la section. Coupée au ras d'une marge invisible, la dernière carte
 * se lisait comme un défaut de mise en page ; coupée par l'écran, elle se lit
 * comme la promesse d'une suite.
 *
 * Les cartes s'étirent sur la plus haute de la rangée : leur hauteur n'étant
 * plus figée, un titre de quatre lignes décalait sinon le bas d'une carte de
 * cent pixels sur sa voisine.
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
      <div className="flex w-full max-w-[1600px] flex-col items-start gap-6 lg:flex-row lg:items-stretch">
        <div className="flex flex-col items-start justify-center gap-2.5 lg:w-[216px] lg:shrink-0">
          <Surtitre>{surtitre}</Surtitre>
          <h2 className="w-full titrage text-2xl font-bold leading-[1.4] text-primary-950 lg:text-3xl">
            {titre}
          </h2>
        </div>

        {/* Le défilement horizontal est porté par la liste elle-même : sur un
            écran étroit, empiler quatre cartes de 500px de haut noierait la
            section. */}
        <ul className="-mr-6 flex w-[calc(100%+1.5rem)] min-w-px gap-7 overflow-x-auto pb-3 lg:-mr-28 lg:w-auto lg:flex-1">
          {articles.map((article) => (
            /* `flex` sur l'élément de liste : sans lui, la carte garde sa
               hauteur de contenu et ne remplit pas la rangée. */
            <li key={article.chemin} className="flex w-[300px] shrink-0 sm:w-[400px]">
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
