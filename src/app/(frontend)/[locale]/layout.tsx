import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Google_Sans_Flex, Work_Sans } from "next/font/google";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BASE } from "@/lib/donnees-structurees";
import { estUneLangue, langues } from "@/lib/i18n";
import { chargerNavigation, pourEntete } from "@/lib/navigation";

import "./globals.css";

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

  return (
    <html
      lang={locale}
      className={`${policePrimaire.variable} ${policeSecondaire.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header langue={locale} navigation={pourEntete(navigation)} />
        {children}
        <Footer langue={locale} navigation={navigation} />
      </body>
    </html>
  );
}
