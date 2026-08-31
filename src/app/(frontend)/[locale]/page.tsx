import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

import { HeroAccueil } from "@/components/sections/HeroAccueil";
import { SectionEnBref } from "@/components/sections/SectionEnBref";
import { SectionLeConstat } from "@/components/sections/SectionLeConstat";
import { estUneLangue } from "@/lib/i18n";

export default async function Accueil({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!estUneLangue(locale)) notFound();

  const payload = await getPayload({ config });
  const { hero, enBref, constat } = await payload.findGlobal({ slug: "accueil", locale, depth: 1 });

  /** Un média non résolu reste un identifiant : seul l'objet porte une URL. */
  const photo = (valeur: unknown) =>
    valeur && typeof valeur === "object" && "url" in valeur && typeof valeur.url === "string"
      ? { src: valeur.url, alt: String((valeur as { alt?: string }).alt ?? "") }
      : undefined;

  const image = photo(hero.image);

  return (
    <>
      <HeroAccueil
        langue={locale}
        surtitre={hero.surtitre}
        titre={(hero.lignes ?? []).map(({ verbe, complement }) => ({ verbe, complement }))}
        chapo={hero.chapo}
        cta={hero.cta}
        image={image}
      />
      <SectionEnBref
        langue={locale}
        surtitre={enBref.surtitre}
        titre={enBref.titre}
        propos={enBref.propos}
        precision={enBref.precision}
        cta={enBref.cta}
      />
      <SectionLeConstat
        surtitre={constat.surtitre}
        titre={constat.titre}
        realite={{
          titre: constat.realite.titre,
          chiffre: constat.realite.chiffre,
          legende: constat.realite.legende,
          puces: (constat.realite.puces ?? []).map(({ texte }) => texte),
          photo: photo(constat.realite.photo),
        }}
        enjeu={{
          titre: constat.enjeu.titre,
          texte: constat.enjeu.texte,
          citation: constat.enjeu.citation,
          photo: photo(constat.enjeu.photo),
        }}
      />
    </>
  );
}
