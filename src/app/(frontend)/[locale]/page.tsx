import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

import { HeroAccueil } from "@/components/sections/HeroAccueil";
import { DonneesStructurees } from "@/components/site/DonneesStructurees";
import {
  graphe,
  organisation,
  page as fichePage,
  questionsFrequentes,
  siteWeb,
} from "@/lib/donnees-structurees";
import { estUneLangue } from "@/lib/i18n";
import { cheminDe } from "@/lib/pages";
import { RendreSections } from "@/components/sections/RendreSections";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!estUneLangue(locale)) return {};

  const payload = await getPayload({ config });
  const { referencement } = await payload.findGlobal({ slug: "accueil", locale, depth: 0 });

  // L'accueil porte le nom du site : le gabarit qui suffixe les autres pages
  // le répéterait.
  return {
    title: { absolute: referencement.metaTitre },
    description: referencement.metaDescription,
    alternates: { canonical: locale === "fr" ? "/" : `/${locale}` },
  };
}

/**
 * Page d'accueil.
 *
 * Le hero reste un champ fixe du global : toute page en a exactement un, et
 * rien ne justifie de pouvoir le retirer ou le dupliquer. Le reste est un
 * tableau de blocs, comme sur les autres pages, et se réorganise au
 * back-office sans passer par le code.
 */
export default async function Accueil({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!estUneLangue(locale)) notFound();

  const payload = await getPayload({ config });
  const { hero, sections, referencement } = await payload.findGlobal({
    slug: "accueil",
    locale,
    depth: 2,
  });

  /** Un média non résolu reste un identifiant : seul l'objet porte une URL. */
  const photo = (valeur: unknown) =>
    valeur && typeof valeur === "object" && "url" in valeur && typeof valeur.url === "string"
      ? { src: valeur.url, alt: String((valeur as { alt?: string }).alt ?? "") }
      : undefined;

  const image = photo(hero.image);

  /**
   * Les bandes des pôles sont alimentées par leurs pages, pour que le nom d'un
   * pôle n'ait qu'une seule source. L'ordre suit celui de la maquette.
   */
  const ordre = ["expertise", "capital", "feed"] as const;
  const { docs: pagesPoles } = await payload.find({
    collection: "pages",
    // Le local API ignore l’`access` par défaut : sans ceci, un brouillon sortirait.
    overrideAccess: false,
    locale,
    where: { pole: { in: [...ordre] } },
    depth: 2,
    limit: 3,
  });
  const bandes = ordre.flatMap((cle) => {
    const page = pagesPoles.find((p) => p.pole === cle);
    return page
      ? [{
          pole: cle,
          chemin: `/${cheminDe(page)}`,
          accroche: page.accrocheCourte ?? "",
          tagline: page.surtitre ?? "",
          image: photo(page.image),
        }]
      : [];
  });

  const structure = graphe([
    organisation(locale),
    siteWeb(locale, referencement.metaDescription),
    fichePage(locale, {
      chemin: "/",
      titre: referencement.metaTitre,
      description: referencement.metaDescription,
    }),
    // La FAQ n'est plus un groupe fixe : on la retrouve parmi les sections.
    questionsFrequentes(
      (sections ?? []).flatMap((s) => (s.blockType === "faq" ? (s.questions ?? []) : [])),
    ),
  ]);

  return (
    <>
      <DonneesStructurees donnees={structure} />

      <HeroAccueil
        langue={locale}
        surtitre={hero.surtitre}
        titre={(hero.lignes ?? []).map(({ verbe, complement }) => ({ verbe, complement }))}
        chapo={hero.chapo}
        cta={hero.cta}
        image={image}
      />

      <RendreSections
        sections={sections ?? []}
        langue={locale}
        bandes={bandes}
        articles={[]}
      />
    </>
  );
}
