import type { Metadata } from "next";
import { getPayload } from "payload";
import { notFound } from "next/navigation";
import config from "@payload-config";

import { HeroInterne } from "@/components/sections/HeroInterne";
import { RendreSections } from "@/components/sections/RendreSections";
import { SectionArticleUne } from "@/components/sections/SectionArticleUne";
import { SectionListeArticles } from "@/components/sections/SectionListeArticles";
import { chargerCategories, listerArticles } from "@/lib/articles";
import { estUneLangue } from "@/lib/i18n";
import { arianeDe, trouverPage } from "@/lib/pages";

/**
 * Liste du blog.
 *
 * Le hero et le bandeau newsletter viennent de la page « blog » du
 * back-office ; l'article à la une et la grille sont calculés depuis la
 * collection. Le plus récent tient la une et ne réapparaît pas dans la grille,
 * qui reprend à partir du suivant.
 *
 * La catégorie et la pagination vivent dans l'URL, ce qui rend un filtre
 * partageable et laisse la page rendue par le serveur.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  if (!estUneLangue(locale)) return {};

  const page = await trouverPage(["blog"], locale);
  if (!page) return {};

  return {
    title: page.metaTitre ?? page.titre,
    description: page.metaDescription ?? undefined,
  };
}

export default async function PageBlog({
  params,
  searchParams,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!estUneLangue(locale)) notFound();

  const page = await trouverPage(["blog"], locale);
  if (!page) notFound();

  const filtres = await searchParams;
  const categorie = typeof filtres.categorie === "string" ? filtres.categorie : undefined;
  const page1 = Number(Array.isArray(filtres.page) ? filtres.page[0] : filtres.page);
  const numero = Number.isInteger(page1) && page1 > 1 ? page1 : 1;

  const payload = await getPayload({ config });
  // La une est toujours le dernier article publié, filtre ou non ; la grille
  // reprend donc au suivant, sinon il paraîtrait deux fois sur la même page.
  const [libelles, categories, une] = await Promise.all([
    payload.findGlobal({ slug: "blog", locale }),
    chargerCategories(locale),
    listerArticles({ langue: locale, parPage: 1 }),
  ]);
  const articleUne = une.articles[0];
  const liste = await listerArticles({
    langue: locale,
    categorie,
    page: numero,
    exclure: articleUne?.id,
  });

  const image =
    page.image && typeof page.image === "object" && page.image.url
      ? { src: page.image.url, alt: page.image.alt }
      : undefined;

  return (
    <>
      <HeroInterne
        langue={locale}
        entrees={arianeDe(page)}
        surtitre={page.surtitre ?? page.titre}
        titre={page.accroche ?? page.titre}
        description={page.description ?? ""}
        image={image}
      />

      {articleUne && (
        <SectionArticleUne
          langue={locale}
          surtitre={libelles.surtitreUne}
          libelleAction={libelles.libelleLire}
          article={articleUne}
        />
      )}

      <SectionListeArticles
        langue={locale}
        chemin="/blog"
        categories={categories}
        categorieActive={categorie}
        articles={liste.articles}
        pageSuivante={liste.encore ? numero + 1 : undefined}
        libelles={{
          titre: libelles.titreListe,
          tousSujets: libelles.libelleTousSujets,
          compte: libelles.gabaritCompte.replace("{n}", String(liste.total)),
          charger: libelles.libelleCharger,
          lire: libelles.libelleLire,
          vide: libelles.messageVide,
        }}
      />

      <RendreSections sections={page.sections ?? []} langue={locale} bandes={[]} articles={[]} />
    </>
  );
}
