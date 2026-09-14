import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

import { SectionFormulaireContact } from "@/components/sections/SectionFormulaireContact";
import { DonneesStructurees } from "@/components/site/DonneesStructurees";
import {
  alternatives,
  filDAriane,
  graphe,
  organisation,
  page as fichePage,
  questionsFrequentes,
} from "@/lib/donnees-structurees";
import { estUneLangue } from "@/lib/i18n";
import { RendreSections } from "@/components/sections/RendreSections";
import { imageCourriel } from "@/lib/image-courriel";

/**
 * Page de contact.
 *
 * Route dédiée plutôt que page de la collection : sa structure lui est propre,
 * et Next résout les segments statiques avant l'attrape-tout — /contact ne
 * passe donc plus par le gabarit des pages internes.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!estUneLangue(locale)) return {};
  const payload = await getPayload({ config });
  const { referencement } = await payload.findGlobal({
    slug: "contact",
    locale,
    depth: 0,
  });
  return {
    title: referencement.metaTitre,
    description: referencement.metaDescription,
    alternates: alternatives("/contact", locale),
  };
}

export default async function PageContact({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!estUneLangue(locale)) notFound();

  const payload = await getPayload({ config });
  const contenu = await payload.findGlobal({
    slug: "contact",
    locale,
    depth: 1,
  });

  const structure = graphe([
    organisation(locale),
    fichePage(locale, {
      chemin: "/contact",
      titre: contenu.referencement.metaTitre,
      description: contenu.referencement.metaDescription,
      type: "ContactPage",
    }),
    filDAriane(locale, [{ libelle: contenu.titre, chemin: "/contact" }]),
    // La FAQ n'est plus un groupe fixe : on la retrouve parmi les sections.
    questionsFrequentes(
      (contenu.sections ?? []).flatMap((s) =>
        s.blockType === "faq" ? (s.questions ?? []) : [],
      ),
    ),
  ]);

  return (
    <>
      <DonneesStructurees donnees={structure} />

      <SectionFormulaireContact
        langue={locale}
        ariane={contenu.titre}
        surtitre={contenu.surtitre}
        titre={contenu.titre}
        description={contenu.description}
        mentionChamps={contenu.mentionChamps}
        profils={(contenu.profils ?? []).map(({ valeur, libelle }) => ({
          valeur,
          libelle,
        }))}
        libelles={contenu.libelles}
        carte={contenu.carte}
        coordonnees={contenu.coordonnees}
        courriel={imageCourriel(contenu.coordonnees.email, locale)}
      />
      <RendreSections
        sections={contenu.sections ?? []}
        langue={locale}
        bandes={[]}
        articles={[]}
      />
    </>
  );
}
