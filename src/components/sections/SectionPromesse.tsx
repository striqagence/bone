import { Surtitre } from "@/components/ui/Surtitre";

/**
 * Section « Notre promesse » de l'accueil (Figma « Frame 35 »).
 *
 * Le décor est fait de quatre halos flous posés en fusion additive sur l'aplat
 * encre, sauf le dernier qui recouvre les autres d'un voile sombre.
 *
 * Ils sont recomposés ici plutôt qu'aplatis en une image : Figma rend le groupe
 * sur un canevas blanc, si bien que l'export livre des coins blancs opaques —
 * un rectangle clair en plein milieu d'une section sombre.
 *
 * Les positions sont celles de la maquette, mesurées depuis le bord gauche de
 * la section : tous les halos y sont massés, et l'ancrage à gauche les fait
 * donc suivre correctement une largeur libre.
 */
const halos = [
  { fichier: "halo-1.svg", largeur: 1042.14, gauche: -546.51, haut: -44.83, fusion: true },
  { fichier: "halo-3.svg", largeur: 781.391, gauche: -139.25, haut: -63.86, fusion: true },
  { fichier: "halo-2.svg", largeur: 919.797, gauche: -174.07, haut: -118.05, fusion: true },
  { fichier: "halo-4.svg", largeur: 795.242, gauche: -423.05, haut: 78.61, fusion: false },
];

export function SectionPromesse({ surtitre, titre }: { surtitre: string; titre: string }) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-encre px-6 py-16 lg:px-28 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {halos.map(({ fichier, largeur, gauche, haut, fusion }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={fichier}
            src={`/brand/${fichier}`}
            alt=""
            className={`absolute max-w-none ${fusion ? "mix-blend-plus-lighter" : ""}`}
            style={{
              left: `${gauche}px`,
              top: `${haut}px`,
              width: `${largeur}px`,
              transform: "rotate(150deg)",
            }}
          />
        ))}
      </div>

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
