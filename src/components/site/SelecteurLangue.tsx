"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cheminSansLangue, langues, lien, type Langue } from "@/lib/i18n";

/**
 * Bascule de langue de l'en-tête (le « Fr ▾ » de la maquette).
 *
 * Avec deux langues, un menu déroulant serait disproportionné : le contrôle
 * affiche la langue courante et pointe directement vers l'autre. La page
 * consultée est conservée — passer en anglais depuis /contact mène à
 * /en/contact, et non à l'accueil.
 */
const libelles: Record<Langue, string> = { fr: "Fr", en: "En" };

export function SelecteurLangue({ langue }: { langue: Langue }) {
  const chemin = cheminSansLangue(usePathname());
  const autre = langues.find((l) => l !== langue) ?? langue;

  return (
    <Link
      href={lien(chemin, autre)}
      hrefLang={autre}
      aria-label={`Passer en ${autre === "fr" ? "français" : "anglais"}`}
      className="flex items-center gap-0.5 font-display text-sm font-bold text-white transition-opacity hover:opacity-70"
      style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 120' }}
    >
      {libelles[langue]}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/chevron-bas.svg" alt="" width={8} height={4.29289} className="ml-1" />
    </Link>
  );
}
