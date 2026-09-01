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
 * Au-dessus, les deux blocs et leur chevauchement sont exprimés en pourcentages
 * de la colonne — 61,3 %, 51,5 % et 12,9 % reprennent les 476, 400 et 100px de
 * la maquette rapportés à ses 776px. En pixels fixes, la paire réclamait 776px
 * de large et n'entrait que sur un écran de 1824px : sur un portable de 13
 * pouces, la photo recouvrait l'encart.
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
            {/* Le corps du titre suit la largeur disponible : à 60px, un mot
                comme « d'infrastructure » dépasse une colonne de moitié d'écran
                et vient chevaucher la photo. `break-words` n'agit qu'en dernier
                recours, sur un mot qui ne tiendrait sur aucune ligne. */}
            <h1 className="titrage break-words text-3xl font-bold leading-[1.2] text-primary-950 sm:text-4xl xl:text-5xl 2xl:text-6xl">
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
          {/* Sans photo — les pages légales n'en portent pas — la colonne se
              réduit à l'encart : un aplat gris à la place de l'image se lirait
              comme une image qui n'a pas chargé. */}
          {image && (
            <div className="flex flex-col items-start lg:mr-[-12.9%] lg:w-[61.3%] lg:pb-[30px]">
              <div className="relative h-[240px] w-full rounded lg:h-[380px] xl:h-[430px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="rounded object-cover"
                />
              </div>
            </div>
          )}

          {/* L'encart passe au-dessus de la photo, comme dans la maquette : la
              photo est positionnée, elle prendrait sinon le dessus quel que
              soit l'ordre du document, et rognerait le texte. */}
          <div className={`relative flex items-end lg:h-full lg:pt-[30px] ${image ? "lg:w-[51.5%]" : "lg:w-full"}`}>
            <div className="flex flex-1 flex-col items-start justify-center gap-5 rounded bg-gray-50 p-6 shadow-[10px_10px_0_0_var(--color-encre)] xl:p-9">
              <p className="w-full text-base font-medium text-primary-950">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
