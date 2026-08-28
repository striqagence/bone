import type { Metadata } from "next";
import { Google_Sans_Flex, Work_Sans } from "next/font/google";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${policePrimaire.variable} ${policeSecondaire.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
