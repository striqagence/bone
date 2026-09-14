/* Root layout du back-office Payload.
   Ne pas y ajouter de markup : RootLayout rend son propre <html>/<body>. */
import { Google_Sans_Flex, Work_Sans } from "next/font/google";
import type { ServerFunctionClient } from "payload";

import config from "@payload-config";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./admin/importMap.js";

// Feuille de style compilée du back-office. Sans elle, l'admin s'affiche en
// HTML brut : RootLayout ne l'embarque pas, elle doit être importée ici.
import "@payloadcms/next/css";

// Charte du site, posée après la feuille de Payload pour passer devant elle.
import "./charte.css";

/**
 * Les deux familles du site, chargées ici comme elles le sont côté public.
 * `htmlProps` les pose sur la racine du document : c'est le seul endroit que
 * `RootLayout` laisse ouvert, puisqu'il rend lui-même `<html>` et `<body>`.
 */
const policeTitres = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--police-bo-titres",
  display: "swap",
  axes: ["wdth"],
});

const policeTexte = Work_Sans({
  subsets: ["latin"],
  variable: "--police-bo-texte",
  display: "swap",
});

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

const Layout = ({ children }: Args) => (
  <RootLayout
    config={config}
    importMap={importMap}
    serverFunction={serverFunction}
    htmlProps={{
      className: `${policeTitres.variable} ${policeTexte.variable}`,
    }}
  >
    {children}
  </RootLayout>
);

export default Layout;
