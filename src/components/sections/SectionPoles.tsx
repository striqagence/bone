import { CartePole } from "@/components/ui/CartePole";
import { Surtitre } from "@/components/ui/Surtitre";
import type { Langue } from "@/lib/i18n";

/**
 * Section « Nos 3 pôles » de l'accueil (Figma « Logotype section »).
 *
 * Le titre alterne deux tailles et deux couleurs : l'annonce en grand et en
 * bleu de marque, sa résolution plus bas et en marine. Deux champs plutôt qu'un
 * texte unique, la césure portant le sens.
 *
 * Les trois bandes sont alimentées par les pages de pôle elles-mêmes, et non
 * par un contenu propre à l'accueil : la maquette répète ces libellés au menu
 * déroulant, au pied de page et sur les pages de pôle, et c'est cette
 * duplication qui a produit le Feed/Média/Media du fichier.
 */
export function SectionPoles({
  langue,
  surtitre,
  titreHaut,
  titreBas,
  poles,
}: {
  langue: Langue;
  /** L'en-tête est absent sur l'écran Compétences, dont le hero l'annonce déjà. */
  surtitre?: string | null;
  titreHaut?: string | null;
  titreBas?: string | null;
  poles: {
    pole: "expertise" | "capital" | "feed";
    chemin: string;
    accroche: string;
    tagline: string;
    image?: { src: string; alt: string };
  }[];
}) {
  return (
    <section className={`flex w-full flex-col items-center ${surtitre ? "pt-24 lg:pt-64" : ""}`}>
      {surtitre ? (
        <div className="flex w-full max-w-[1600px] flex-col items-center gap-2.5 px-6 pb-10 lg:px-28 lg:pb-[60px]">
          <Surtitre>{surtitre}</Surtitre>
          <h2 className="w-full titrage text-center font-bold text-primary-950">
            <span className="block text-3xl leading-[1.2] text-primary-600 lg:text-7xl">
              {titreHaut}
            </span>
            <span className="block text-2xl leading-[1.4] lg:text-5xl">{titreBas}</span>
          </h2>
        </div>
      ) : (
        /* Sans en-tête, les trois bandes resteraient rattachées au titre de la
           section précédente. Le titre saisi les couvre quand même, ici hors
           écran : il est déjà en base, seul son affichage est en cause. */
        <h2 className="sr-only">
          {[titreHaut, titreBas].filter(Boolean).join(" ")}
        </h2>
      )}

      <div className="flex w-full flex-col lg:flex-row lg:items-start">
        {poles.map((p) => (
          <CartePole
            key={p.chemin}
            langue={langue}
            chemin={p.chemin}
            pole={p.pole}
            eyebrow={p.accroche}
            accroche={p.tagline}
            image={p.image}
            variante="bande"
          />
        ))}
      </div>
    </section>
  );
}
