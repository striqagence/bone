import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Google_Sans_Flex, Work_Sans } from "next/font/google";

import { Header } from "@/components/site/Header";
import { estUneLangue, langues } from "@/lib/i18n";

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
});

const policeSecondaire = Work_Sans({
  subsets: ["latin"],
  variable: "--police-secondaire",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BONE IT",
  description: "",
};

export function generateStaticParams() {
  return langues.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  // Le middleware ne réécrit que vers une langue connue, mais une URL forgée
  // comme /de/contact atteindrait ce segment sans passer par lui.
  if (!estUneLangue(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${policePrimaire.variable} ${policeSecondaire.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header langue={locale} />
        {children}
      </body>
    </html>
  );
}
