import Link from "next/link";

import { CarteArticle } from "@/components/ui/CarteArticle";
import { IconePlus } from "@/components/ui/icones";
import { classesBouton } from "@/components/ui/Button";
import { lien, type Langue } from "@/lib/i18n";
import type { Article } from "@/lib/articles";

/**
 * Grille des articles du blog, précédée de ses filtres (Figma, écran Blog).
 *
 * Le filtre et la pagination passent par l'URL plutôt que par un état de
 * composant : une catégorie devient partageable, la page reste rendue côté
 * serveur, et le tri fonctionne sans JavaScript. Le bouton « charger plus »
 * est donc un lien vers la page suivante, qui rouvre la liste plus longue.
 */
export function SectionListeArticles({
  langue,
  chemin,
  categories,
  categorieActive,
  articles,
  pageSuivante,
  libelles,
}: {
  langue: Langue;
  /** Chemin de la liste, sans préfixe de langue ni paramètres. */
  chemin: string;
  categories: { slug: string; libelle: string }[];
  categorieActive?: string;
  articles: Article[];
  pageSuivante?: number;
  libelles: {
    titre: string;
    tousSujets: string;
    compte: string;
    charger: string;
    lire: string;
    vide: string;
  };
}) {
  const url = (categorie?: string, page?: number) => {
    const parametres = new URLSearchParams();
    if (categorie) parametres.set("categorie", categorie);
    if (page && page > 1) parametres.set("page", String(page));
    const suite = parametres.toString();
    return `${lien(chemin, langue)}${suite ? `?${suite}` : ""}`;
  };

  const puce = (actif: boolean) =>
    `shrink-0 rounded px-3.5 py-3 text-xs font-semibold uppercase leading-none tracking-widest whitespace-nowrap ${
      actif ? "bg-encre/80 text-white" : "bg-encre/15 text-primary-950"
    }`;

  return (
    <section className="flex w-full flex-col items-center bg-white px-6 py-16 lg:px-28 lg:py-20">
      <div className="flex w-full max-w-[1600px] flex-col items-stretch gap-9">
        {/* La maquette ne titre pas la grille : le titre existe quand même pour
            qui navigue au clavier ou à l'oreille, sans rien changer à l'écran. */}
        <h2 className="sr-only">{libelles.titre}</h2>

        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Les filtres défilent au doigt : cinq puces ne tiennent pas sur la
              largeur d'un téléphone, et les passer à la ligne repousserait la
              grille d'autant. */}
          <ul className="-mx-6 flex w-[calc(100%+3rem)] items-center gap-2.5 overflow-x-auto px-6 lg:mx-0 lg:w-auto lg:px-0">
            <li>
              <Link href={url()} className={puce(!categorieActive)}>
                {libelles.tousSujets}
              </Link>
            </li>
            {categories.map(({ slug, libelle }) => (
              <li key={slug}>
                <Link href={url(slug)} className={puce(categorieActive === slug)}>
                  {libelle}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-xs font-semibold uppercase leading-none tracking-widest whitespace-nowrap text-gris-400">
            {libelles.compte}
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="py-12 text-lg text-primary-950 opacity-60">{libelles.vide}</p>
        ) : (
          <ul className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.chemin} className="flex">
                <CarteArticle
                  langue={langue}
                  chemin={article.chemin}
                  categorie={article.categorie}
                  date={article.date}
                  tempsDeLecture={article.tempsDeLecture}
                  titre={article.titre}
                  description={article.description}
                  libelleAction={libelles.lire}
                  image={article.image}
                />
              </li>
            ))}
          </ul>
        )}

        {pageSuivante && (
          <div className="flex justify-center pt-6">
            <Link
              href={url(categorieActive, pageSuivante)}
              scroll={false}
              className={classesBouton({ variante: "tertiaire", taille: "lg" })}
            >
              {libelles.charger}
              <IconePlus />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
