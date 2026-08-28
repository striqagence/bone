import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { lien, type Langue } from "@/lib/i18n";

import { NavLink } from "./NavLink";

/**
 * Pied de page (Figma « Footer »).
 *
 * Le filigrane géant est ancré en bas plutôt qu'à son `top: 402px` d'origine :
 * dans la maquette, ses 206px de haut s'arrêtent pile sur les 608px du bloc, et
 * l'ancrer par le haut le décalerait dès que le contenu grandit — ce qui
 * arrivera en anglais, où les libellés sont plus longs.
 */
const colonnes = [
  {
    titre: "Nos pôles",
    liens: [
      { libelle: "Expertise", chemin: "/competences/expertise" },
      { libelle: "Capital", chemin: "/competences/capital" },
      { libelle: "Feed", chemin: "/competences/feed" },
    ],
  },
  {
    titre: "L’entreprise",
    liens: [
      { libelle: "Approche", chemin: "/notre-approche" },
      { libelle: "À propos", chemin: "/a-propos" },
    ],
  },
];

const legales = [
  { libelle: "Mentions légales", chemin: "/mentions-legales" },
  { libelle: "Politique de confidentialité", chemin: "/politique-de-confidentialite" },
  { libelle: "Gestion des cookies", chemin: "/gestion-des-cookies" },
];

export function Footer({ langue }: { langue: Langue }) {
  return (
    <footer className="relative flex w-full flex-col items-center overflow-hidden bg-encre px-28">
      <div className="relative flex w-full max-w-[1600px] flex-col gap-2.5 pb-64 pt-20">
        <div className="flex w-full items-start justify-center py-8">
          <div className="relative grid flex-1 grid-cols-[max-content_1fr_1fr_1fr_max-content] gap-x-28 gap-y-5 pt-5">
            <div className="flex w-[493px] flex-col items-start gap-[30px] self-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/bone-logotype-clair.svg"
                alt="BONE IT"
                width={246}
                height={70}
              />
              <p className="text-xl text-white/80">
                Les bonnes décisions transforment votre infrastructure en avantage durable.
              </p>
            </div>

            {colonnes.map(({ titre, liens }) => (
              <div key={titre} className="flex flex-col items-start justify-center gap-2.5 self-start">
                <TitreColonne>{titre}</TitreColonne>
                {liens.map(({ libelle, chemin }) => (
                  <NavLink key={chemin} chemin={chemin} langue={langue}>
                    {libelle}
                  </NavLink>
                ))}
              </div>
            ))}

            <div className="flex flex-col items-start justify-center gap-2.5 self-start">
              <TitreColonne>Contact</TitreColonne>
              <NavLink chemin="/contact" langue={langue}>
                Notre formulaire
              </NavLink>
              {/* Adresse et réseau social sortent du site : ni l'un ni l'autre
                  ne peut porter l'indicateur de page courante. */}
              <a href="mailto:bone@contact.fr" className="text-base text-white">
                bone@contact.fr
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-base text-white"
              >
                Linkedin
              </a>
            </div>

            <div className="flex h-[45px] items-center gap-5 justify-self-start">
              <Button
                href={lien("/contact", langue)}
                variante="secondary"
                flecheAvant={false}
              >
                Demander un audit
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
          className="pointer-events-none absolute bottom-0 left-[85.51px] max-w-none"
        />

        <div className="flex w-full items-start justify-between">
          {/* L'année se calcule au build : figée dans le code, elle serait
              périmée au premier janvier suivant. */}
          <p className="text-xs whitespace-nowrap text-white/80">
            © {new Date().getFullYear()} Bone. Tous droits réservés
          </p>
          <div className="flex items-center justify-end gap-7 text-xs text-white/80">
            {legales.map(({ libelle, chemin }) => (
              <Link key={chemin} href={lien(chemin, langue)} className="whitespace-nowrap">
                {libelle}
              </Link>
            ))}
            <a
              href="https://www.striq.fr"
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap"
            >
              Site conçu par l’agence StriQ
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
