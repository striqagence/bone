import Image from "next/image";
import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { FlecheRenvoi } from "@/components/ui/icones";

/**
 * Corps d'un article (Figma, écran « Détail d'un article »).
 *
 * Le rendu du texte riche est fait de convertisseurs plutôt que d'une feuille
 * de style générique : les titres portent l'ancre que le sommaire vise, les
 * puces reprennent la flèche de la charte, et l'encadré « à retenir » est un
 * bloc de l'éditeur, pas une mise en forme.
 */
export type PointARetenir = { texte: string };

/** Ancre d'un titre : la même règle sert au sommaire et au rendu. */
export function ancre(texte: string) {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Le texte brut d'un nœud Lexical, enfants compris. */
function texteDe(noeud: { text?: string; children?: unknown[] }): string {
  if (typeof noeud.text === "string") return noeud.text;
  if (!Array.isArray(noeud.children)) return "";
  return noeud.children.map((e) => texteDe(e as { text?: string; children?: unknown[] })).join("");
}

/** Les titres de niveau 2 du corps, dans l'ordre : ce que liste le sommaire. */
export function titresDe(contenu?: SerializedEditorState | null) {
  const racine = contenu?.root as { children?: unknown[] } | undefined;
  return (racine?.children ?? [])
    .filter((n) => {
      const noeud = n as { type?: string; tag?: string };
      return noeud.type === "heading" && noeud.tag === "h2";
    })
    .map((n) => texteDe(n as { children?: unknown[] }))
    .filter(Boolean)
    .map((texte) => ({ texte, ancre: ancre(texte) }));
}

const convertisseurs: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const enfants = nodesToJSX({ nodes: node.children });
    const texte = texteDe(node as unknown as { children?: unknown[] });
    if (node.tag === "h2") {
      return (
        <h2
          id={ancre(texte)}
          className="scroll-mt-32 titrage text-2xl font-bold leading-[1.4] text-primary-950 lg:text-3xl"
        >
          {enfants}
        </h2>
      );
    }
    return (
      <h3 className="titrage text-xl font-bold leading-[1.4] text-primary-950">{enfants}</h3>
    );
  },
  paragraph: ({ node, nodesToJSX }) => (
    <p className="text-lg leading-[1.5] text-primary-950 opacity-80">
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),
  quote: ({ node, nodesToJSX }) => (
    <blockquote className="border-l-2 border-accent-700 pl-10 titrage text-xl font-bold leading-[1.4] text-primary-950 lg:text-2xl">
      {nodesToJSX({ nodes: node.children })}
    </blockquote>
  ),
  list: ({ node, nodesToJSX }) => (
    <ul className="flex flex-col gap-4">{nodesToJSX({ nodes: node.children })}</ul>
  ),
  listitem: ({ node, nodesToJSX }) => (
    <li className="flex items-start gap-2.5 text-primary-600">
      <FlecheRenvoi />
      <span className="flex-1 text-base leading-[1.5] text-primary-950 opacity-80">
        {nodesToJSX({ nodes: node.children })}
      </span>
    </li>
  ),
  upload: ({ node }) => {
    const media = node.value as { url?: string; alt?: string; width?: number; height?: number };
    const legende = (node.fields as { legende?: string } | undefined)?.legende;
    if (!media?.url) return null;
    return (
      <figure className="flex flex-col gap-4">
        <div className="relative aspect-[1081/400] w-full overflow-hidden rounded bg-gris-300">
          <Image
            src={media.url}
            alt={media.alt ?? ""}
            fill
            sizes="(min-width: 1024px) 1081px, 100vw"
            className="object-cover"
          />
        </div>
        {legende && (
          <figcaption className="text-base leading-[1.5] text-primary-950 opacity-60">
            {legende}
          </figcaption>
        )}
      </figure>
    );
  },
  blocks: {
    aRetenir: ({ node }: { node: { fields: unknown } }) => {
      const { etiquette, points } = node.fields as {
        etiquette: string;
        points?: PointARetenir[];
      };
      return (
        <aside className="flex flex-col items-start gap-5 rounded bg-encre/5 px-9 py-7">
          <span className="rounded bg-encre/80 px-3.5 py-3 text-[10px] font-semibold uppercase leading-none tracking-widest text-white">
            {etiquette}
          </span>
          <ul className="flex w-full flex-col gap-2">
            {(points ?? []).map(({ texte }) => (
              <li key={texte} className="flex items-start gap-2.5 text-primary-600">
                <FlecheRenvoi taille={20} />
                <span className="flex-1 text-base leading-[1.5] text-primary-950 opacity-80">
                  {texte}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      );
    },
  },
});

export function CorpsArticle({ contenu }: { contenu: SerializedEditorState }) {
  return (
    <div className="flex flex-col gap-8">
      <RichText data={contenu} converters={convertisseurs} disableContainer />
    </div>
  );
}
