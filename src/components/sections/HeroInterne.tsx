import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { FilDAriane } from "@/components/ui/FilDAriane";
import { Surtitre } from "@/components/ui/Surtitre";
import { lien, type Langue } from "@/lib/i18n";

/**
 * Hero des pages internes, niveau 1 (Figma « Hero pages internes niveau 1 »).
 *
 * Deux colonnes sous le fil d'ariane : le discours à gauche, à droite une photo
 * et un encart de texte qui se chevauchent. Ce chevauchement est obtenu comme
 * dans la maquette — la photo déborde de 100px sur l'encart, l'un décalé de
 * 30px vers le haut, l'autre vers le bas — et non par un positionnement absolu,
 * pour que l'ensemble garde sa hauteur naturelle.
 *
 * Le décalage tombe en dessous de 1024px : superposer deux blocs de 476 et
 * 400px sur un téléphone les rendrait illisibles, ils s'empilent donc.
 *
 * La photo est un contenu, pas un élément de charte : elle vient en props et
 * passe par next/image — contrairement aux vectoriels de la charte, un JPEG de
 * 2400px gagne à être redimensionné pour le gabarit réellement affiché.
 */
export function HeroInterne({
  langue,
  entrees,
  surtitre,
  titre,
  description,
  image,
  cta,
}: {
  langue: Langue;
  entrees: { libelle: string; chemin?: string }[];
  surtitre: string;
  titre: string;
  description: string;
  image?: { src: string; alt: string };
  cta?: { libelle: string; chemin: string };
}) {
  return (
    <section className="flex w-full flex-col items-center overflow-hidden bg-gris-100 px-6 pb-16 pt-24 lg:px-28 lg:pb-28 lg:pt-32">
      <div className="grid w-full max-w-[1600px] grid-cols-1 gap-x-12 gap-y-5 lg:grid-cols-2">
        <FilDAriane entrees={entrees} langue={langue} fond="clair" className="lg:col-span-2" />

        <div className="flex flex-col items-start justify-center gap-5 py-8">
          <div className="flex w-full flex-col items-start justify-end gap-5">
            <Surtitre couleur="marine">{surtitre}</Surtitre>
            <h1
              className="font-display text-4xl font-bold leading-[1.2] text-primary-950 lg:text-6xl"
              style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 120' }}
            >
              {titre}
            </h1>
          </div>
          {cta && (
            <Button
              href={lien(cta.chemin, langue)}
              taille="sm"
              flecheAvant={false}
            >
              {cta.libelle}
            </Button>
          )}
        </div>

        <div className="flex flex-col items-stretch lg:flex-row lg:items-center">
          <div className="flex flex-col items-start lg:mr-[-100px] lg:w-[476px] lg:pb-[30px]">
            <div className="relative h-[240px] w-full rounded lg:h-[430px] lg:max-w-[500px]">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 476px, 100vw"
                  className="rounded object-cover"
                />
              ) : (
                <div className="absolute inset-0 rounded bg-gris-300" />
              )}
            </div>
          </div>

          <div className="flex items-end lg:h-full lg:w-[400px] lg:pt-[30px]">
            <div className="flex flex-1 flex-col items-start justify-center gap-5 rounded bg-gray-50 p-9 shadow-[10px_10px_0_0_var(--color-encre)]">
              <p className="w-full text-base font-medium text-primary-950">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
