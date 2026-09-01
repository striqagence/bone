import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

import { SectionAppel } from "@/components/sections/SectionAppel";
import { SectionFaq } from "@/components/sections/SectionFaq";
import { SectionFormulaireContact } from "@/components/sections/SectionFormulaireContact";
import { IconeLinkedin } from "@/components/ui/IconeLinkedin";
import { estUneLangue } from "@/lib/i18n";

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
  const { titre, description } = await payload.findGlobal({
    slug: "contact",
    locale,
    depth: 0,
  });
  return { title: titre, description };
}

export default async function PageContact({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!estUneLangue(locale)) notFound();

  const payload = await getPayload({ config });
  const contenu = await payload.findGlobal({ slug: "contact", locale, depth: 1 });

  const photo = (valeur: unknown) =>
    valeur && typeof valeur === "object" && "url" in valeur && typeof valeur.url === "string"
      ? { src: valeur.url, alt: String((valeur as { alt?: string }).alt ?? "") }
      : undefined;

  return (
    <>
      <SectionFormulaireContact
        langue={locale}
        ariane={contenu.titre}
        surtitre={contenu.surtitre}
        titre={contenu.titre}
        description={contenu.description}
        mentionChamps={contenu.mentionChamps}
        profils={(contenu.profils ?? []).map(({ valeur, libelle }) => ({ valeur, libelle }))}
        libelles={contenu.libelles}
        carte={contenu.carte}
        coordonnees={contenu.coordonnees}
      />
      <SectionFaq
        surtitre={contenu.faq.surtitre}
        titre={contenu.faq.titre}
        questions={contenu.faq.questions ?? []}
        image={photo(contenu.faq.image)}
      />
      <SectionAppel
        langue={locale}
        surtitre={contenu.appel.surtitre}
        titre={contenu.appel.titre}
        chapo={contenu.appel.chapo}
        cta={contenu.appel.cta}
        icone={<IconeLinkedin />}
      />
    </>
  );
}
