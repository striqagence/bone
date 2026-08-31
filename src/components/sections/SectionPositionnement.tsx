import { Fragment } from "react";

import { Surtitre } from "@/components/ui/Surtitre";
import { FlecheRenvoi, FlecheRenvoiRonde } from "@/components/ui/icones";

type Entree = { titre: string; texte: string };
type Colonne = { titre: string; sousTitre: string; entrees: Entree[] };

/**
 * Section « Positionnement » de l'accueil (Figma « Container »).
 *
 * Deux colonnes affrontées : à gauche les domaines d'expertise sur cartes
 * translucides, à droite la valeur ajoutée sur cartes claires. La maquette les
 * distingue jusque dans la pointe de leurs puces, anguleuse d'un côté et
 * arrondie de l'autre.
 *
 * Le filigrane superpose un halo flouté et une silhouette pleine, tous deux à
 * moitié opaques. Ses positions sont exprimées en pourcentages dans la
 * maquette : elles transposent telles quelles à une largeur libre, ce qui n'est
 * pas le cas des filigranes calés en pixels ailleurs.
 */
export function SectionPositionnement({
  surtitre,
  titre,
  gauche,
  droite,
}: {
  surtitre: string;
  titre: string;
  gauche: Colonne;
  droite: Colonne;
}) {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-encre px-6 py-16 lg:px-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[2.58%_11.98%_-23.83%_29.93%] hidden opacity-50 lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/filigrane-position-halo.svg"
          alt=""
          className="absolute inset-[-21.78%_-25.28%] max-w-none"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/filigrane-position.svg" alt="" className="absolute inset-0 max-w-none" />
      </div>

      <div className="relative grid w-full max-w-[1600px] grid-cols-1 gap-x-7 gap-y-6 lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center gap-2.5 pb-5 lg:col-span-2">
          <Surtitre couleur="blanc">{surtitre}</Surtitre>
          <h2 className="w-full titrage text-2xl font-bold leading-[1.4] text-gris-50 lg:text-4xl">
            {titre}
          </h2>
        </div>

        <EnTeteColonne colonne={gauche} opacites="opacity-70 opacity-60" />
        <EnTeteColonne colonne={droite} opacites="opacity-90 opacity-80" />

        {/* Les deux colonnes sont entrelacées ligne à ligne : sur une grille à
            deux colonnes, chaque paire se retrouve ainsi côte à côte. */}
        {gauche.entrees.map((entree, index) => (
          <Fragment key={entree.titre}>
            <Carte entree={entree} sombre />
            {droite.entrees[index] && <Carte entree={droite.entrees[index]} />}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function EnTeteColonne({ colonne, opacites }: { colonne: Colonne; opacites: string }) {
  const [titre, sousTitre] = opacites.split(" ");
  return (
    <div className="flex flex-col items-start justify-center gap-1 text-white">
      <p className={`w-full titrage text-xl font-bold leading-[1.4] ${titre}`}>{colonne.titre}</p>
      <p className={`w-full text-lg leading-[1.5] ${sousTitre}`}>{colonne.sousTitre}</p>
    </div>
  );
}

function Carte({ entree, sombre = false }: { entree: Entree; sombre?: boolean }) {
  return (
    <div
      className={`flex flex-col items-start justify-center gap-2.5 rounded px-9 py-7 shadow-[5px_5px_0_0_rgb(0_0_34/0.3)] ${sombre ? "bg-white/10 text-white" : "bg-gray-50 text-primary-950"}`}
    >
      <p className={`w-full titrage text-lg font-bold leading-[1.4] ${sombre ? "opacity-80" : ""}`}>
        {entree.titre}
      </p>
      <div className="flex w-full items-start gap-2.5 text-primary-600">
        {sombre ? <FlecheRenvoiRonde /> : <FlecheRenvoi />}
        <span className={`flex-1 text-base leading-[1.5] opacity-60 ${sombre ? "text-white" : "text-primary-950"}`}>
          {entree.texte}
        </span>
      </div>
    </div>
  );
}
