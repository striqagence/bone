import Link from "next/link";
import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { CourrielEnImage } from "@/components/ui/CourrielEnImage";
import { Surtitre } from "@/components/ui/Surtitre";
import { FlecheRenvoi } from "@/components/ui/icones";
import { lien, type Langue } from "@/lib/i18n";
import type { ImageCourriel } from "@/lib/image-courriel";

/**
 * Texte long d'une page légale.
 *
 * Une colonne unique et étroite : ces pages se lisent en continu, et une
 * mesure de 1600px rendrait chaque ligne impraticable. Les convertisseurs sont
 * ceux du corps d'article, sans les images ni l'encadré — un texte juridique
 * n'en porte pas.
 *
 * Les mentions légales doivent afficher une adresse de courriel, la loi
 * l'exige : elle ne peut pas être remplacée par un renvoi au formulaire. Le
 * texte porte donc un jeton à sa place, et le rendu y substitue une image de
 * l'adresse. Elle n'est ainsi ni écrite dans la page, ni cliquable.
 *
 * Faute d'image, c'est le renvoi au formulaire qui s'affiche : mieux vaut un
 * détour qu'une adresse fausse.
 */
const JETON = "⟦courriel⟧";

const fabriquer =
  (courriel: ImageCourriel | undefined, langue: Langue, repli: string): JSXConvertersFunction =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const enfants = nodesToJSX({ nodes: node.children });
    return node.tag === "h2" ? (
      <h2 className="titrage pt-6 text-2xl font-bold leading-[1.4] text-primary-950">{enfants}</h2>
    ) : (
      <h3 className="titrage text-xl font-bold leading-[1.4] text-primary-950">{enfants}</h3>
    );
  },
  paragraph: ({ node, nodesToJSX }) => (
    <p className="text-base leading-[1.6] text-primary-950 opacity-80 lg:text-lg">
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),
  list: ({ node, nodesToJSX }) => (
    <ul className="flex flex-col gap-3">{nodesToJSX({ nodes: node.children })}</ul>
  ),
  listitem: ({ node, nodesToJSX }) => (
    <li className="flex items-start gap-2.5 text-primary-600">
      <FlecheRenvoi />
      <span className="flex-1 text-base leading-[1.6] text-primary-950 opacity-80">
        {nodesToJSX({ nodes: node.children })}
      </span>
    </li>
  ),
  text: ({ node }) => {
    const morceaux = node.text.split(JETON);
    if (morceaux.length === 1) return node.text;
    return morceaux.map((morceau, i) => (
      <span key={i}>
        {i > 0 &&
          (courriel ? (
            <CourrielEnImage image={courriel} />
          ) : (
            /* Sans image, la phrase ne peut pas s'arrêter dans le vide : elle
               renvoie au formulaire, qui reste un moyen de nous joindre. */
            <Link
              href={lien("/contact", langue)}
              className="text-primary-600 underline underline-offset-2"
            >
              {repli}
            </Link>
          ))}
        {morceau}
      </span>
    ));
  },
  link: ({ node, nodesToJSX }) => {
    const champs = node.fields as { url?: string; newTab?: boolean; doc?: unknown };
    return (
      <a
        href={champs.url ?? "#"}
        target={champs.newTab ? "_blank" : undefined}
        rel={champs.newTab ? "noreferrer" : undefined}
        className="text-primary-600 underline underline-offset-2"
      >
        {nodesToJSX({ nodes: node.children })}
      </a>
    );
  },
});

export function SectionTexteLong({
  surtitre,
  corps,
  courriel,
  langue,
  repliCourriel,
}: {
  surtitre?: string | null;
  corps: SerializedEditorState;
  /** L'image de l'adresse, si la page en porte une. */
  courriel?: ImageCourriel;
  langue: Langue;
  repliCourriel: string;
}) {
  return (
    <section className="flex w-full flex-col items-center bg-white px-6 py-16 lg:px-28 lg:py-24">
      <div className="flex w-full max-w-[820px] flex-col gap-6">
        {surtitre && <Surtitre>{surtitre}</Surtitre>}
        <RichText data={corps} converters={fabriquer(courriel, langue, repliCourriel)} disableContainer />
      </div>
    </section>
  );
}
