import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Google_Sans_Flex, Noto_Sans_SC, Work_Sans } from "next/font/google";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BASE } from "@/lib/donnees-structurees";
import { codesHreflang, estUneLangue, langues } from "@/lib/i18n";
import { chargerNavigation, pourEntete } from "@/lib/navigation";

import "./globals.css";
import { BandeauApercu } from "@/components/site/BandeauApercu";
import { RafraichirEnApercu } from "@/components/site/RafraichirEnApercu";
import { contexteApercu } from "@/lib/apercu";

/**
 * Les deux familles du design system, chargées en variable : une seule requête
 * par famille couvre toute la plage de graisses utilisée dans les maquettes
 * (400 à 700), au lieu d'un fichier par graisse.
 */
const policePrimaire = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--police-primaire",
  display: "swap",
  /**
   * Sans cette liste, next/font ne sert que l'axe de graisse : le fichier
   * arrive figé en `font-stretch: 100%` et tout réglage de `wdth` reste sans
   * effet. La maquette pousse la largeur à 120 sur tous les titrages, et
   * incline de -10 les citations.
   */
  axes: ["slnt", "wdth"],
});

const policeSecondaire = Work_Sans({
  subsets: ["latin"],
  variable: "--police-secondaire",
  display: "swap",
});

/**
 * Police des idéogrammes.
 *
 * Ni `Google Sans Flex` ni `Work Sans` ne portent de caractères chinois : sans
 * cette famille, la version chinoise tomberait sur la police du système, qui
 * diffère d'une machine à l'autre et n'a rien de la charte.
 *
 * Elle est déclarée en **repli** derrière les deux autres, et non à leur
 * place : les mots latins qui parsèment le chinois, à commencer par « BONE »,
 * gardent ainsi la police de marque, le navigateur ne descendant dans la pile
 * que pour les caractères absents de la première famille.
 *
 * `preload: false` est ici une nécessité et non un réglage de confort. Une
 * fonte chinoise pèse plusieurs mégaoctets, découpés par plages Unicode :
 * précharger l'ensemble sur chaque page, y compris françaises, coûterait bien
 * plus que ce qu'on gagnerait.
 */
const policeChinoise = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  subsets: [],
  preload: false,
  variable: "--police-chinoise",
  display: "swap",
});

/**
 * Réglages communs à toutes les pages.
 *
 * `metadataBase` rend absolues les adresses que chaque page déclare en
 * relatif — canoniques, alternances de langue, images de partage. Sans elle,
 * Next les laisse relatives et les réseaux sociaux ne les résolvent pas.
 *
 * Le gabarit de titre suffixe la marque, sauf sur l'accueil, qui la porte déjà
 * et déclare son titre en absolu.
 */
export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { default: "BONE", template: "%s | BONE" },
  openGraph: { siteName: "BONE", type: "website" },
};

export function generateStaticParams() {
  return langues.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  // Le middleware ne réécrit que vers une langue connue, mais une URL forgée
  // comme /de/contact atteindrait ce segment sans passer par lui.
  if (!estUneLangue(locale)) notFound();

  const navigation = await chargerNavigation(locale);
  // Le bandeau n'apparaît qu'en aperçu : hors de ce cas, `contexteApercu` ne
  // lit qu'un cookie et ne tente aucune authentification.
  const { draft: enApercu } = await contexteApercu();

  return (
    <html
      /* « zh » seul ne dit pas quelle écriture est servie : `zh-Hans` nomme le
         chinois simplifié, ce dont dépendent la coupure des lignes, le choix
         des glyphes et la proposition de traduction du navigateur. */
      lang={codesHreflang[locale]}
      className={`${policePrimaire.variable} ${policeSecondaire.variable} ${policeChinoise.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {enApercu && <BandeauApercu />}
        {enApercu && <RafraichirEnApercu />}
        <Header langue={locale} navigation={pourEntete(navigation)} />
        {children}
        <Footer langue={locale} navigation={navigation} />
      </body>
    </html>
  );
}
