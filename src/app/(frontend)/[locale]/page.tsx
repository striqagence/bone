import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

import { HeroAccueil } from "@/components/sections/HeroAccueil";
import { estUneLangue } from "@/lib/i18n";

export default async function Accueil({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!estUneLangue(locale)) notFound();

  const payload = await getPayload({ config });
  const { hero } = await payload.findGlobal({ slug: "accueil", locale, depth: 1 });

  const image =
    hero.image && typeof hero.image === "object" && hero.image.url
      ? { src: hero.image.url, alt: hero.image.alt }
      : undefined;

  return (
    <HeroAccueil
      langue={locale}
      surtitre={hero.surtitre}
      titre={(hero.lignes ?? []).map(({ verbe, complement }) => ({ verbe, complement }))}
      chapo={hero.chapo}
      cta={hero.cta}
      image={image}
    />
  );
}
