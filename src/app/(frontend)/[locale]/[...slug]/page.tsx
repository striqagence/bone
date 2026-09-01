import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HeroInterne } from "@/components/sections/HeroInterne";
import { HeroPleineImage } from "@/components/sections/HeroPleineImage";
import { RendreSections } from "@/components/sections/RendreSections";
import { derniersArticles } from "@/lib/articles";
import { encoderCourriel } from "@/lib/courriel";
import { chargerNavigation } from "@/lib/navigation";
import { estUneLangue } from "@/lib/i18n";
import { arianeDe, chargerPoles, trouverPage } from "@/lib/pages";

/**
 * Rend une page du back-office à partir de son chemin.
 *
 * Les segments statiques du dossier — /design-system par exemple — sont
 * résolus par Next avant cette route attrape-tout : ils ne sont donc pas
 * captés ici.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[...slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!estUneLangue(locale)) return {};

  const page = await trouverPage(slug, locale);
  if (!page) return {};

  return {
    title: page.metaTitre ?? page.titre,
    description: page.metaDescription ?? undefined,
  };
}

export default async function PageDuSite({ params }: PageProps<"/[locale]/[...slug]">) {
  const { locale, slug } = await params;
  if (!estUneLangue(locale)) notFound();

  const page = await trouverPage(slug, locale);
  if (!page) notFound();

  const image =
    page.image && typeof page.image === "object" && page.image.url
      ? { src: page.image.url, alt: page.image.alt }
      : undefined;

  // Les sections des pôles tirent leurs libellés des pages de pôle : on ne les
  // charge que si la page en affiche.
  const sections = page.sections ?? [];
  const besoinPoles = sections.some((s) => s.blockType === "bandePoles" || s.blockType === "synergie");
  const besoinArticles = sections.some((s) => s.blockType === "articles");
  // Les pages légales affichent l'adresse de courriel : elle vient du même
  // global que le pied de page, pour qu'un seul endroit fasse foi.
  const besoinCourriel = sections.some((s) => s.blockType === "texteLong");
  const [bandes, articles, navigation] = await Promise.all([
    besoinPoles ? chargerPoles(locale) : Promise.resolve([]),
    besoinArticles ? derniersArticles(locale) : Promise.resolve([]),
    besoinCourriel ? chargerNavigation(locale) : Promise.resolve(null),
  ]);

  const cta =
    page.cta?.libelle && page.cta.chemin
      ? { libelle: page.cta.libelle, chemin: page.cta.chemin }
      : undefined;

  // Les pages de pôle prennent le hero sur photo de la maquette, logotype
  // compris ; les autres gardent le hero clair.
  const suite = (
    <RendreSections
      sections={sections}
      langue={locale}
      bandes={bandes}
      articles={articles}
      courriel={navigation ? encoderCourriel(navigation.contact.email) : undefined}
      repliCourriel={navigation?.contact.libelleFormulaire ?? ""}
    />
  );

  if (page.pole) {
    return (
      <>
        <HeroPleineImage
          langue={locale}
          entrees={arianeDe(page)}
          surtitre={page.surtitre ?? page.titre}
          titre={page.accroche ?? page.titre}
          description={page.description ?? ""}
          image={image}
          logo={page.pole}
          cta={cta}
        />
        {suite}
      </>
    );
  }

  return (
    <>
      <HeroInterne
        langue={locale}
        entrees={arianeDe(page)}
        surtitre={page.surtitre ?? page.titre}
        titre={page.accroche ?? page.titre}
        description={page.description ?? ""}
        image={image}
        cta={cta}
      />
      {suite}
    </>
  );
}
