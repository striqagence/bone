/* Root layout du back-office Payload.
   Ne pas y ajouter de markup : RootLayout rend son propre <html>/<body>. */
import type { ServerFunctionClient } from "payload";

import config from "@payload-config";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./admin/importMap.js";

// Feuille de style compilée du back-office. Sans elle, l'admin s'affiche en
// HTML brut : RootLayout ne l'embarque pas, elle doit être importée ici.
import "@payloadcms/next/css";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
