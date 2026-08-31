import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

import { HeroAccueil } from "@/components/sections/HeroAccueil";
import { SectionChiffres } from "@/components/sections/SectionChiffres";
import { SectionDifferenciation } from "@/components/sections/SectionDifferenciation";
import { SectionFaq } from "@/components/sections/SectionFaq";
import { SectionEnBref } from "@/components/sections/SectionEnBref";
import { SectionLeConstat } from "@/components/sections/SectionLeConstat";
import { SectionPoles } from "@/components/sections/SectionPoles";
import { SectionPositionnement } from "@/components/sections/SectionPositionnement";
import { SectionPromesse } from "@/components/sections/SectionPromesse";
import { SectionRole } from "@/components/sections/SectionRole";
import { estUneLangue } from "@/lib/i18n";
import { cheminDe } from "@/lib/pages";

export default async function Accueil({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!estUneLangue(locale)) notFound();

  const payload = await getPayload({ config });
  const { hero, enBref, constat, promesse, positionnement, role, differenciation, poles, chiffres, faq } =
    await payload.findGlobal({ slug: "accueil", locale, depth: 1 });

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
      <SectionPromesse surtitre={promesse.surtitre} titre={promesse.titre} />
      <SectionPositionnement
        surtitre={positionnement.surtitre}
        titre={positionnement.titre}
        gauche={{
          titre: positionnement.gauche.titre,
          sousTitre: positionnement.gauche.sousTitre,
          entrees: positionnement.gauche.entrees ?? [],
        }}
        droite={{
          titre: positionnement.droite.titre,
          sousTitre: positionnement.droite.sousTitre,
          entrees: positionnement.droite.entrees ?? [],
        }}
      />
      <SectionRole
        surtitre={role.surtitre}
        titre={role.titre}
        chapo={role.chapo}
        etapes={role.etapes ?? []}
      />
      <SectionPoles
        langue={locale}
        surtitre={poles.surtitre}
        titreHaut={poles.titreHaut}
        titreBas={poles.titreBas}
        poles={bandes}
      />
      <SectionDifferenciation
        surtitre={differenciation.surtitre}
        titre={differenciation.titre}
        habituelle={{
          badge: differenciation.habituelle.badge,
          titre: differenciation.habituelle.titre,
          puces: (differenciation.habituelle.puces ?? []).map(({ texte }) => texte),
        }}
        bone={{
          badge: differenciation.bone.badge,
          titre: differenciation.bone.titre,
          puces: (differenciation.bone.puces ?? []).map(({ texte }) => texte),
        }}
      />
      <SectionChiffres
        surtitre={chiffres.surtitre}
        titre={chiffres.titre}
        constat={chiffres.constat}
        consequence={chiffres.consequence}
        statistiques={chiffres.statistiques ?? []}
      />
      <SectionFaq
        surtitre={faq.surtitre}
        titre={faq.titre}
        questions={faq.questions ?? []}
        image={photo(faq.image)}
      />
    </>
  );
}
