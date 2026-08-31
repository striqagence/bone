import { Button } from "@/components/ui/Button";
import { FilDAriane } from "@/components/ui/FilDAriane";
import { Surtitre } from "@/components/ui/Surtitre";
import { lien, type Langue } from "@/lib/i18n";

/**
 * Hero sur photo pleine largeur (Figma « Hero pages internes niveau 2 »).
 *
 * Un même bloc sert les pages de pôle et les articles : le logo du pôle et le
 * couple date / temps de lecture s'excluent dans la maquette, ce sont les deux
 * seules variantes. Les rendre optionnels évite d'entretenir deux composants
 * dont seule cette ligne diffère.
 *
 * Le dégradé descend de 45 % à 90 % d'encre en s'arrêtant à 64 % de la hauteur,
 * comme dans la maquette : le texte du bas repose ainsi sur la partie la plus
 * dense, quelle que soit la photo.
 */
const logos = {
  expertise: "/brand/logo-expertise.svg",
  capital: "/brand/logo-capital.svg",
  feed: "/brand/logo-feed.svg",
} as const;

export function HeroPleineImage({
  langue,
  entrees,
  surtitre,
  titre,
  description,
  image,
  logo,
  infos,
  cta,
}: {
  langue: Langue;
  entrees: { libelle: string; chemin?: string }[];
  surtitre: string;
  titre: string;
  description: string;
  image?: { src: string; alt: string };
  logo?: keyof typeof logos;
  infos?: { date: string; tempsDeLecture: string };
  cta?: { libelle: string; chemin: string };
}) {
  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-5 overflow-hidden rounded px-6 pb-16 pt-24 lg:px-28 lg:pb-24 lg:pt-36">
      {/* Fond décoratif : l'aplat tient lieu de photo tant qu'aucune n'est
          fournie, pour que le dégradé ne se détache pas sur du vide. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-primary-950">
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.src} alt="" className="absolute inset-0 size-full object-cover" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_34/0.45),rgb(0_0_34/0.9)_64.271%)]" />
      </div>

      <div className="relative grid w-full max-w-[1600px] grid-cols-1 gap-14 lg:grid-cols-[1fr_0.5fr]">
        <FilDAriane entrees={entrees} langue={langue} fond="sombre" className="lg:col-span-2" />

        <div className="flex flex-col items-start justify-end gap-12">
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logos[logo]}
              alt=""
              width={247}
              height={70}
              className="w-[200px] lg:w-[246.367px]"
            />
          )}

          <div className="flex w-full flex-col items-start gap-4">
            <Surtitre couleur="blanc" className="opacity-60">
              {surtitre}
            </Surtitre>
            <h1
              className="font-display text-3xl font-bold leading-[1.4] text-white lg:text-5xl"
              style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 120' }}
            >
              {titre}
            </h1>
          </div>

          {cta && (
            <Button href={lien(cta.chemin, langue)} taille="sm" flecheAvant={false}>
              {cta.libelle}
            </Button>
          )}
        </div>

        <div className="flex items-end justify-end">
          <div className="flex max-w-[350px] flex-1 flex-col justify-center gap-2.5 border-l border-accent-700 pl-10">
            {infos && (
              <div className="flex w-full items-center gap-4 text-xs font-semibold uppercase leading-none tracking-widest whitespace-nowrap">
                <span className="text-accent-700">{infos.date}</span>
                <span className="text-gris-400">{infos.tempsDeLecture}</span>
              </div>
            )}
            <p className="w-full text-lg font-medium leading-[1.5] text-white">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
