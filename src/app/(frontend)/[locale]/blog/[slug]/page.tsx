import type { Metadata } from "next";
import { getPayload } from "payload";
import { notFound } from "next/navigation";
import config from "@payload-config";

import { CorpsArticle, titresDe } from "@/components/article/CorpsArticle";
import { PartageArticle } from "@/components/article/PartageArticle";
import { SommaireArticle } from "@/components/article/SommaireArticle";
import { HeroPleineImage } from "@/components/sections/HeroPleineImage";
import { RendreSections } from "@/components/sections/RendreSections";
import { derniersArticles, enArticle } from "@/lib/articles";
import { estUneLangue, type Langue } from "@/lib/i18n";
import type { Post } from "@/payload-types";

/**
 * Détail d'un article.
 *
 * Le corps est encadré de deux colonnes étroites : le sommaire à gauche, le
 * partage à droite. Les deux disparaissent sous 1024px, où la colonne centrale
 * occupe toute la largeur — la maquette ne prévoit pas de rangement pour elles.
 */
async function chargerArticle(slug: string, langue: Langue): Promise<Post | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    locale: langue,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  return docs[0] ?? null;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!estUneLangue(locale)) return {};

  const article = await chargerArticle(slug, locale);
  if (!article) return {};

  return {
    title: article.metaTitre ?? article.titre,
    description: article.metaDescription ?? article.extrait,
  };
}

export default async function PageArticle({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!estUneLangue(locale)) notFound();

  const article = await chargerArticle(slug, locale);
  if (!article) notFound();

  const payload = await getPayload({ config });
  const sections = article.sections ?? [];
  const [libelles, aLireAussi] = await Promise.all([
    payload.findGlobal({ slug: "blog", locale }),
    sections.some((s) => s.blockType === "articles")
      ? derniersArticles(locale, 5)
      : Promise.resolve([]),
  ]);

  const resume = enArticle(article, locale);
  const titres = titresDe(article.contenu);
  const sommaire = sections.some((s) => s.blockType === "faq")
    ? [...titres, { texte: libelles.libelleFaq, ancre: "faq" }]
    : titres;

  return (
    <>
      <HeroPleineImage
        langue={locale}
        entrees={[
          { libelle: "Blog", chemin: "/blog" },
          { libelle: article.titre },
        ]}
        surtitre={resume.categorie}
        titre={article.titre}
        description={article.extrait}
        image={resume.image}
        infos={{ date: resume.date, tempsDeLecture: resume.tempsDeLecture }}
      />

      <section className="flex w-full flex-col items-center bg-white px-6 py-16 lg:px-28 lg:py-24">
        <div className="grid w-full max-w-[1500px] grid-cols-1 gap-12 lg:grid-cols-[270px_minmax(0,1fr)_53px] lg:gap-x-12">
          <div className="hidden lg:block">
            <SommaireArticle surtitre={libelles.libelleSommaire} entrees={sommaire} />
          </div>

          {article.contenu ? (
            <CorpsArticle contenu={article.contenu} />
          ) : (
            <div className="min-w-px" />
          )}

          <div className="lg:sticky lg:top-32 lg:self-start">
            <PartageArticle
              libelles={{
                linkedin: libelles.libellePartageLinkedin,
                copier: libelles.libelleCopierLien,
                copie: libelles.libelleLienCopie,
              }}
            />
          </div>
        </div>
      </section>

      <RendreSections
        sections={sections}
        langue={locale}
        bandes={[]}
        // L'article courant n'a pas à figurer dans ses propres « à lire aussi ».
        articles={aLireAussi.filter((a) => a.id !== article.id)}
      />
    </>
  );
}
