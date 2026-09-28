import { headers } from "next/headers";
import Link from "next/link";

import { classesBouton } from "@/components/ui/Button";
import { Surtitre } from "@/components/ui/Surtitre";
import { estUneLangue, langueParDefaut, langues, lien, type Langue } from "@/lib/i18n";

/**
 * Page servie quand une adresse ne correspond à rien.
 *
 * Elle existait jusqu'ici sous sa forme par défaut : une page entièrement
 * blanche, sans un mot ni un lien. Une adresse mal recopiée, un lien vieilli
 * dans un e-mail ou une coquille dans une URL partagée y conduisaient sans
 * retour possible.
 *
 * Next ne passe aucune propriété à ce fichier : la langue ne peut donc pas
 * venir du segment `[locale]`. Elle est relue dans l'en-tête posé par le
 * middleware, qui porte le chemin demandé. L'en-tête absent, on sert le
 * français, langue servie à la racine.
 *
 * L'en-tête et le pied de page viennent de la mise en page parente, qui, elle,
 * connaît la langue : le visiteur garde donc une navigation complète.
 */
async function langueDemandee(): Promise<Langue> {
  const chemin = (await headers()).get("x-pathname") ?? "";
  const segment = chemin.split("/")[1] ?? "";
  return estUneLangue(segment) ? segment : langueParDefaut;
}

const TEXTES: Record<
  Langue,
  { surtitre: string; titre: string; propos: string; accueil: string; contact: string }
> = {
  fr: {
    surtitre: "erreur 404",
    titre: "Cette page n’existe pas.",
    propos:
      "L’adresse est peut-être mal recopiée, ou la page a changé de place depuis le lien que vous avez suivi.",
    accueil: "Retour à l’accueil",
    contact: "Nous écrire",
  },
  en: {
    surtitre: "error 404",
    titre: "This page does not exist.",
    propos:
      "The address may have been mistyped, or the page may have moved since the link you followed was written.",
    accueil: "Back to home",
    contact: "Contact us",
  },
  zh: {
    surtitre: "错误 404",
    titre: "该页面不存在。",
    propos: "地址可能有误，或者该页面在您所点击的链接写下之后已经移动。",
    accueil: "返回首页",
    contact: "联系我们",
  },
};

export default async function Introuvable() {
  const langue = await langueDemandee();
  const { surtitre, titre, propos, accueil, contact } = TEXTES[langue];

  return (
    <main className="flex w-full flex-1 items-center justify-center bg-encre px-6 py-24 lg:px-28 lg:py-32">
      <div className="flex w-full max-w-[720px] flex-col items-start gap-6">
        <Surtitre couleur="blanc">{surtitre}</Surtitre>

        <h1 className="titrage text-3xl font-bold leading-[1.2] text-white lg:text-5xl">
          {titre}
        </h1>

        <p className="max-w-[560px] text-base leading-[1.5] text-white/80">{propos}</p>

        <div className="mt-2 flex flex-wrap items-center gap-4">
          <Link href={lien("/", langue)} className={classesBouton({ variante: "primary" })}>
            {accueil}
          </Link>
          <Link
            href={lien("/contact", langue)}
            className={classesBouton({ variante: "secondary" })}
          >
            {contact}
          </Link>
        </div>

        {/* Les deux autres langues, pour le visiteur arrivé par une adresse
            dans une langue qu'il ne lit pas. */}
        <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
          {langues
            .filter((autre) => autre !== langue)
            .map((autre) => (
              <li key={autre}>
                <Link
                  href={lien("/", autre)}
                  hrefLang={autre}
                  className="underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  {TEXTES[autre].accueil}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
