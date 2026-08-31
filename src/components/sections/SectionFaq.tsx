import Image from "next/image";

import { Surtitre } from "@/components/ui/Surtitre";
import { ChevronBascule } from "@/components/ui/icones";

/**
 * Section « Questions fréquentes » de l'accueil (Figma « Container »).
 *
 * L'accordéon repose sur `<details>` et `<summary>` natifs plutôt que sur un
 * état React : le dépliage fonctionne sans JavaScript, le clavier et les
 * lecteurs d'écran le comprennent sans qu'on ait à décrire quoi que ce soit, et
 * le navigateur gère l'ouverture au « rechercher dans la page ».
 *
 * La maquette montre la première réponse dépliée. C'est un rendu de maquette,
 * pas une consigne : toutes s'ouvrent ici repliées, l'ouverture d'office de
 * l'une d'elles n'ayant pas de raison d'être.
 */
export function SectionFaq({
  surtitre,
  titre,
  questions,
  image,
  id,
}: {
  surtitre: string;
  titre: string;
  questions: { question: string; reponse?: string | null }[];
  image?: { src: string; alt: string };
  /** Ancre, pour que le sommaire d'un article puisse viser la section. */
  id?: string;
}) {
  return (
    <section
      id={id}
      className="flex w-full scroll-mt-24 flex-col items-center bg-encre px-6 py-16 lg:px-28 lg:py-32"
    >
      <div className="grid w-full max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1fr] lg:gap-x-20">
        <div className="relative h-[320px] w-full overflow-hidden rounded bg-gris-300 lg:h-[666px]">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-col items-start justify-center gap-9">
          <div className="flex w-full flex-col items-start gap-2.5">
            <Surtitre couleur="blanc">{surtitre}</Surtitre>
            <h2 className="w-full titrage text-3xl font-bold leading-[1.4] text-gris-50 lg:text-5xl">
              {titre}
            </h2>
          </div>

          <div className="flex w-full flex-col items-start gap-6">
            {questions.map(({ question, reponse }) => (
              <details
                key={question}
                className="group w-full rounded bg-white/10 shadow-[5px_5px_0_0_rgb(0_0_34/0.3)] open:bg-gray-50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-9 py-7 text-white group-open:pb-1.5 group-open:text-primary-950 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 titrage text-lg font-bold leading-[1.4]">{question}</span>
                  <span className="group-open:hidden">
                    <ChevronBascule sens="bas" />
                  </span>
                  <span className="hidden text-primary-600 group-open:block">
                    <ChevronBascule sens="haut" />
                  </span>
                </summary>
                {reponse && (
                  <p className="px-9 pb-9 text-base leading-[1.5] text-primary-950 opacity-60">
                    {reponse}
                  </p>
                )}
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
