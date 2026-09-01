/**
 * Repères chiffrés en escalier (Figma, écran À propos).
 *
 * Chaque carte descend de 50px par rapport à la précédente : c'est ce décalage
 * qui fait la section, pas les cartes elles-mêmes. Il n'existe donc que là où
 * les quatre cartes tiennent sur une seule ligne, à partir de 1280px — en
 * dessous, un décalage réparti sur deux rangées ne dessinerait plus d'escalier.
 *
 * Le nombre ne prend ses 72px qu'à partir de 1536px : à quatre colonnes sur un
 * portable de 13 pouces, « Bac+5 » réclamait 200px pour 155 disponibles et
 * sortait de sa carte.
 *
 * Le halo bleu part du bord gauche, comme dans la maquette, et la section le
 * rogne.
 */
export function SectionReperes({
  cartes,
}: {
  cartes: {
    id?: string | null;
    prefixe?: string | null;
    valeur: string;
    suffixe?: string | null;
    libelle: string;
    description: string;
  }[];
}) {
  return (
    <section className="relative w-full overflow-hidden bg-encre px-6 py-16 lg:px-28 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[340px] top-1/4 hidden size-[900px] lg:block"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(37_60_220/0.5)_0%,rgb(20_28_130/0.3)_42%,transparent_70%)] blur-3xl" />
        <div className="absolute inset-[32%] rounded-full bg-[radial-gradient(circle,rgb(70_130_255/0.55)_0%,rgb(32_32_255/0.25)_55%,transparent_78%)] blur-2xl" />
      </div>

      <ul className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-start gap-10 [--marche:0px] lg:grid-cols-2 lg:gap-7 xl:grid-cols-4 xl:[--marche:50px]">
        {cartes.map(({ id, prefixe, valeur, suffixe, libelle, description }, index) => (
          <li
            key={id ?? valeur}
            className="flex min-w-0 flex-col items-start gap-2.5 border-l-2 border-accent-700 px-8 py-5 shadow-[10px_10px_0_0_rgb(0_0_34/0.3)] 2xl:px-11"
            style={{ marginTop: `calc(${index} * var(--marche))` }}
          >
            <p className="titrage font-semibold leading-[1.2] text-white">
              {prefixe && <span className="text-lg font-light">{prefixe}</span>}
              <span className="text-5xl 2xl:text-[72px]">{valeur}</span>
              {suffixe && <span className="text-lg font-light">{suffixe}</span>}
            </p>
            <p className="titrage text-xs font-semibold uppercase leading-5 tracking-[3px] text-accent-700">
              {libelle}
            </p>
            <p className="w-full text-base leading-[1.5] text-white/80">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
