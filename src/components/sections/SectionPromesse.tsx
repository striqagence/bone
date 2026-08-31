import { Surtitre } from "@/components/ui/Surtitre";

/**
 * Section « Notre promesse » de l'accueil (Figma « Frame 35 »).
 *
 * Le décor est un groupe de quatre halos pivotés, posés en fusion additive sur
 * l'aplat encre. Il est exporté d'un bloc et aplati sur ce même aplat : le fond
 * de la section étant uni, cuire la fusion dans l'image donne le même rendu et
 * fait passer le fichier de 827 à 30 Ko.
 *
 * Son calage est approché — celui de la maquette, mesuré dans un cadre de
 * 1920px, ne transpose pas à une largeur libre. Sur un halo diffus, l'écart ne
 * se voit pas ; sur un élément net, il aurait fallu s'y tenir.
 */
export function SectionPromesse({ surtitre, titre }: { surtitre: string; titre: string }) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-encre px-6 py-16 lg:px-28 lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/halos-promesse.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-[180%] w-auto max-w-none -translate-x-[45%] -translate-y-1/2"
      />

      <div className="relative flex w-full max-w-[1600px] items-start">
        <div className="flex flex-1 flex-col items-start justify-center gap-2.5">
          <Surtitre couleur="blanc">{surtitre}</Surtitre>
          <h2 className="w-full titrage text-3xl font-bold leading-[1.2] text-white lg:text-7xl">
            {titre}
          </h2>
        </div>
      </div>
    </section>
  );
}
