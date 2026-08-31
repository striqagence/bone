import { SectionAppel } from "@/components/sections/SectionAppel";
import { SectionGrille } from "@/components/sections/SectionGrille";
import { SectionRole } from "@/components/sections/SectionRole";
import { SectionPoles } from "@/components/sections/SectionPoles";
import { SectionSynergie } from "@/components/sections/SectionSynergie";
import type { Langue } from "@/lib/i18n";
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
export function RendreSections({
  sections,
  langue,
  bandes,
}: {
  sections: NonNullable<Page["sections"]>;
  langue: Langue;
  bandes: Bande[];
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
                intitules={(section.intitules ?? []).map(({ texte }) => texte)}
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
