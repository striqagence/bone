import { CarteAcces } from "@/components/site/CarteAcces";
import { AdresseCourriel } from "@/components/ui/AdresseCourriel";
import { FormulaireContact } from "@/components/site/FormulaireContact";
import { FilDAriane } from "@/components/ui/FilDAriane";
import { Surtitre } from "@/components/ui/Surtitre";
import { encoderCourriel } from "@/lib/courriel";
import type { Langue } from "@/lib/i18n";

/**
 * Section formulaire de la page de contact (Figma « Contact »).
 *
 * Le plan et l'encart de coordonnées se chevauchent de 20px, comme la maquette
 * les superpose. Le chevauchement tombe en dessous de 1024px, où les deux blocs
 * s'empilent.
 */
export function SectionFormulaireContact({
  langue,
  surtitre,
  titre,
  description,
  mentionChamps,
  profils,
  libelles,
  carte,
  coordonnees,
  ariane,
}: {
  langue: Langue;
  surtitre: string;
  titre: string;
  description: string;
  mentionChamps: string;
  profils: { valeur: string; libelle: string }[];
  libelles: React.ComponentProps<typeof FormulaireContact>["libelles"];
  carte: { latitude: number; longitude: number; zoom: number; intitule: string };
  coordonnees: { badge: string; adresse: string; email: string; contact: string };
  ariane: string;
}) {
  return (
    <section className="flex w-full flex-col items-center overflow-hidden bg-gris-100 px-6 pb-16 pt-24 lg:px-28 lg:pb-28 lg:pt-32">
      <div className="grid w-full max-w-[1600px] grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-[1fr_0.5fr]">
        <FilDAriane
          entrees={[{ libelle: ariane }]}
          langue={langue}
          fond="clair"
          className="lg:col-span-2"
        />

        <div className="flex flex-col items-start gap-10">
          <div className="flex w-full flex-col items-start gap-2">
            <Surtitre couleur="marine">{surtitre}</Surtitre>
            <h1 className="w-full titrage text-3xl font-bold leading-[1.4] text-primary-950 lg:text-5xl">
              {titre}
            </h1>
            <p className="w-full text-lg leading-[1.5] text-primary-950 opacity-60">{description}</p>
            <p className="text-sm font-medium leading-[1.5] text-primary-600">{mentionChamps}</p>
          </div>

          <FormulaireContact langue={langue} profils={profils} libelles={libelles} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex w-full flex-col items-start lg:mb-[-20px] lg:px-9">
            <div className="relative h-[280px] w-full overflow-hidden rounded bg-gris-300 lg:h-[500px]">
              <CarteAcces
                latitude={carte.latitude}
                longitude={carte.longitude}
                zoom={carte.zoom}
                intitule={carte.intitule}
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-4 rounded bg-primary-600 px-9 py-7 shadow-[10px_10px_0_0_var(--color-encre)]">
            <span className="flex items-center justify-center rounded bg-encre/40 px-3.5 py-3 text-[10px] font-semibold uppercase leading-none tracking-widest whitespace-nowrap text-primary-50">
              {coordonnees.badge}
            </span>
            <p className="w-full text-base leading-[1.5] text-white opacity-80">
              {coordonnees.adresse}
            </p>
            <p className="w-full text-base leading-[1.5] text-white opacity-80">
              <AdresseCourriel
                code={encoderCourriel(coordonnees.email)}
                langue={langue}
                className="underline underline-offset-2"
              />
              {" · "}
              {coordonnees.contact}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
