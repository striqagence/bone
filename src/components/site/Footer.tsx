import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { lien, type Langue } from "@/lib/i18n";
import type { Navigation as NavigationGlobal } from "@/lib/navigation";

import { NavLink } from "./NavLink";

/**
 * Pied de page (Figma « Footer »).
 *
 * Le filigrane géant est ancré en bas plutôt qu'à son `top: 402px` d'origine :
 * dans la maquette, ses 206px de haut s'arrêtent pile sur les 608px du bloc, et
 * l'ancrer par le haut le décalerait dès que le contenu grandit — ce qui
 * arrivera en anglais, où les libellés sont plus longs.
 *
 * La première colonne de liens reprend les pôles du déroulant : le pied de page
 * et l'en-tête doivent les nommer pareil, les tenir en double invitait à ce
 * qu'ils divergent.
 */
export function Footer({
  langue,
  navigation,
}: {
  langue: Langue;
  navigation: NavigationGlobal;
}) {
  const { poles, colonnes, contact, liensLegaux, credit } = navigation;

  return (
    <footer className="relative flex w-full flex-col items-center overflow-hidden bg-encre px-6 lg:px-28">
      <div className="relative flex w-full max-w-[1600px] flex-col gap-10 pb-44 pt-12 lg:gap-2.5 lg:pb-64 lg:pt-20">
        <div className="flex w-full items-start justify-center py-0 lg:py-8">
          <div className="relative flex flex-1 flex-col gap-10 pt-0 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-[max-content_1fr_1fr_1fr_max-content] lg:gap-x-28 lg:gap-y-5 lg:pt-5">
            <div className="flex w-full flex-col items-start gap-[30px] self-start sm:col-span-2 lg:col-span-1 lg:w-[493px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/bone-logotype-clair.svg"
                alt="BONE IT"
                width={246}
                height={70}
              />
              <p className="text-lg text-white/80 lg:text-xl">{navigation.baseline}</p>
            </div>

            <div className="flex flex-col items-start justify-center gap-2.5 self-start">
              <TitreColonne>{navigation.titrePoles}</TitreColonne>
              {(poles ?? []).map(({ titre, chemin }) => (
                <NavLink key={chemin} chemin={chemin} langue={langue}>
                  {titre}
                </NavLink>
              ))}
            </div>

            {(colonnes ?? []).map(({ titre, liens }) => (
              <div key={titre} className="flex flex-col items-start justify-center gap-2.5 self-start">
                <TitreColonne>{titre}</TitreColonne>
                {(liens ?? []).map(({ libelle, chemin }) => (
                  <NavLink key={chemin} chemin={chemin} langue={langue}>
                    {libelle}
                  </NavLink>
                ))}
              </div>
            ))}

            <div className="flex flex-col items-start justify-center gap-2.5 self-start">
              <TitreColonne>{contact.titre}</TitreColonne>
              <NavLink chemin="/contact" langue={langue}>
                {contact.libelleFormulaire}
              </NavLink>
              {/* Adresse et réseau social sortent du site : ni l'un ni l'autre
                  ne peut porter l'indicateur de page courante. */}
              <a href={`mailto:${contact.email}`} className="text-base text-white">
                {contact.email}
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-base text-white"
              >
                Linkedin
              </a>
            </div>

            <div className="flex h-[45px] items-center gap-5 sm:col-span-2 lg:col-span-1 lg:justify-self-start">
              <Button
                href={lien(navigation.boutonEntete.chemin, langue)}
                variante="secondary"
                flecheAvant={false}
              >
                {navigation.boutonEntete.libelle}
              </Button>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/bone-filigrane.svg"
          alt=""
          width={1429}
          height={206}
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-auto w-[820px] max-w-none lg:left-[85.51px] lg:w-[1429px]"
        />

        <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:justify-between">
          {/* L'année se calcule au build : figée dans le code, elle serait
              périmée au premier janvier suivant. */}
          <p className="text-xs whitespace-nowrap text-white/80">
            © {new Date().getFullYear()} Bone. Tous droits réservés
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-xs text-white/80 lg:justify-end">
            {(liensLegaux ?? []).map(({ libelle, chemin }) => (
              <Link key={chemin} href={lien(chemin, langue)} className="whitespace-nowrap">
                {libelle}
              </Link>
            ))}
            <a
              href={credit.url}
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap"
            >
              {credit.libelle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TitreColonne({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-display text-base font-bold leading-[1.4] whitespace-nowrap text-white"
      style={{ fontVariationSettings: '"GRAD" 0, "ROND" 0, "wdth" 120' }}
    >
      {children}
    </p>
  );
}
