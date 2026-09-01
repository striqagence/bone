import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { Surtitre } from "@/components/ui/Surtitre";
import { FlecheRenvoi } from "@/components/ui/icones";

/**
 * Texte long d'une page légale.
 *
 * Une colonne unique et étroite : ces pages se lisent en continu, et une
 * mesure de 1600px rendrait chaque ligne impraticable. Les convertisseurs sont
 * ceux du corps d'article, sans les images ni l'encadré — un texte juridique
 * n'en porte pas.
 */
const convertisseurs: JSXConvertersFunction = ({ defaultConverters }) => ({
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
}: {
  surtitre?: string | null;
  corps: SerializedEditorState;
}) {
  return (
    <section className="flex w-full flex-col items-center bg-white px-6 py-16 lg:px-28 lg:py-24">
      <div className="flex w-full max-w-[820px] flex-col gap-6">
        {surtitre && <Surtitre>{surtitre}</Surtitre>}
        <RichText data={corps} converters={convertisseurs} disableContainer />
      </div>
    </section>
  );
}
