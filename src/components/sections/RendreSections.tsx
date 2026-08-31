import { SectionAppel } from "@/components/sections/SectionAppel";
import { SectionArticles } from "@/components/sections/SectionArticles";
import { SectionFaq } from "@/components/sections/SectionFaq";
import { SectionGrille } from "@/components/sections/SectionGrille";
import { SectionChiffres } from "@/components/sections/SectionChiffres";
import { SectionDifferenciation } from "@/components/sections/SectionDifferenciation";
import { SectionPartenaires } from "@/components/sections/SectionPartenaires";
import { SectionPointsEntree } from "@/components/sections/SectionPointsEntree";
import { SectionPosture } from "@/components/sections/SectionPosture";
import { SectionProfils } from "@/components/sections/SectionProfils";
import { SectionPromesse } from "@/components/sections/SectionPromesse";
import { SectionRole } from "@/components/sections/SectionRole";
import { SectionPoles } from "@/components/sections/SectionPoles";
import { SectionSynergie } from "@/components/sections/SectionSynergie";
import type { Langue } from "@/lib/i18n";
import type { Article } from "@/lib/articles";
import type { Page } from "@/lib/pages";

type Bande = {
  pole: "expertise" | "capital" | "feed";
  chemin: string;
  accroche: string;
  tagline: string;
  image?: { src: string; alt: string };
};

/**
 * Rend les sections composées depuis le back-office.
 *
 * Les blocs qui parlent des pôles sont alimentés par les pages de pôle et non
 * par une saisie : ces libellés n'ont qu'une source dans tout le site.
 */
/** Un média non résolu reste un identifiant : seul l'objet porte une URL. */
function photo(valeur: unknown) {
  return valeur && typeof valeur === "object" && "url" in valeur && typeof valeur.url === "string"
    ? { src: valeur.url, alt: String((valeur as { alt?: string }).alt ?? "") }
    : undefined;
}

export function RendreSections({
  sections,
  langue,
  bandes,
  articles,
}: {
  sections: NonNullable<Page["sections"]>;
  langue: Langue;
  bandes: Bande[];
  articles: Article[];
}) {
  return (
    <>
      {sections.map((section) => {
        switch (section.blockType) {
          case "bandePoles":
            return (
              <SectionPoles
                key={section.id}
                langue={langue}
                surtitre={section.avecEnTete ? section.surtitre : null}
                titreHaut={section.titreHaut}
                titreBas={section.titreBas}
                poles={bandes}
              />
            );
          case "synergie":
            return (
              <SectionSynergie
                key={section.id}
                surtitre={section.surtitre}
                titre={section.titre}
                texte={section.texte}
                poles={bandes.map(({ pole }) => pole)}
              />
            );
          case "grille":
            return (
              <SectionGrille
                key={section.id}
                surtitre={section.surtitre}
                titre={section.titre}
                chapo={section.chapo}
                intitules={section.intitules ?? []}
              />
            );
          case "escalier":
            return (
              <SectionRole
                key={section.id}
                surtitre={section.surtitre}
                titre={section.titre}
                chapo={section.chapo}
                etapes={section.cartes ?? []}
              />
            );
          case "enjeux":
            return (
              <SectionProfils
                key={section.id}
                surtitre={section.surtitre}
                titreHaut={section.titreHaut}
                titreBas={section.titreBas}
                profils={(section.cartes ?? []).map((c) => ({
                  picto: c.picto,
                  titre: c.titre,
                  description: c.description,
                  reponse: c.reponse,
                  image: photo(c.image),
                }))}
              />
            );
          case "differenciation":
            return (
              <SectionDifferenciation
                key={section.id}
                surtitre={section.surtitre}
                titre={section.titre}
                habituelle={{
                  badge: section.habituelle.badge,
                  titre: section.habituelle.titre,
                  texte: section.habituelle.texte,
                  puces: (section.habituelle.puces ?? []).map(({ texte }) => texte),
                }}
                bone={{
                  badge: section.bone.badge,
                  titre: section.bone.titre,
                  texte: section.bone.texte,
                  puces: (section.bone.puces ?? []).map(({ texte }) => texte),
                }}
              />
            );
          case "partenaires":
            return (
              <SectionPartenaires
                key={section.id}
                surtitre={section.surtitre}
                logos={section.logos ?? []}
              />
            );
          case "posture":
            return (
              <SectionPosture
                key={section.id}
                surtitre={section.surtitre}
                refus={section.refus}
                engagement={section.engagement}
              />
            );
          case "pointsEntree":
            return (
              <SectionPointsEntree
                key={section.id}
                surtitre={section.surtitre}
                titre={section.titre}
                enTetes={section.enTetes}
                lignes={section.lignes ?? []}
              />
            );
          case "promesse":
            return (
              <SectionPromesse key={section.id} surtitre={section.surtitre} titre={section.titre} />
            );
          case "chiffres":
            return (
              <SectionChiffres
                key={section.id}
                surtitre={section.surtitre}
                titre={section.titre}
                constat={section.constat}
                consequence={section.consequence}
                statistiques={section.statistiques ?? []}
              />
            );
          case "articles":
            return (
              <SectionArticles
                key={section.id}
                langue={langue}
                surtitre={section.surtitre}
                titre={section.titre}
                libelleAction={section.libelleAction}
                articles={articles.slice(0, section.nombre)}
              />
            );
          case "faq":
            return (
              <SectionFaq
                key={section.id}
                surtitre={section.surtitre}
                titre={section.titre}
                questions={section.questions ?? []}
                image={photo(section.image)}
              />
            );
          case "appelAction":
            return (
              <SectionAppel
                key={section.id}
                langue={langue}
                surtitre={section.surtitre}
                titre={section.titre}
                chapo={section.chapo}
                cta={section.cta}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
