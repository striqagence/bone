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
 * Sa largeur est donnée en proportion du bloc, 89,3 % et 5,34 % de décalage,
 * soit exactement les 1429 et 85,51px de la maquette rapportés à ses 1600. En
 * pixels fixes, elle sautait de 820 à 1429px à 1024 : sur une tablette en
 * paysage, il ne restait du mot « Bone » que les deux premières lettres.
 *
 * La première colonne de liens reprend les pôles du déroulant : le pied de page
 * et l'en-tête doivent les nommer pareil, les tenir en double invitait à ce
 * qu'ils divergent.
 *
 * Les trois colonnes de liens tiennent sur une rangée dès 640px. Sur deux
 * colonnes, la troisième se retrouvait seule sur sa ligne avec jusqu'à six
 * cents pixels de vide à sa droite, ce qui se voyait sur toute la plage des
 * tablettes. Le logotype et le bouton, eux, occupent la rangée entière
 * jusqu'à 1280px, où la maquette range les cinq blocs côte à côte.
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
          <div className="relative flex flex-1 flex-col gap-10 pt-0 sm:grid sm:grid-cols-3 sm:gap-x-10 sm:gap-y-10 lg:gap-y-5 lg:pt-5 xl:grid-cols-[minmax(0,1.5fr)_1fr_1fr_1fr_max-content] xl:gap-x-14 2xl:gap-x-20">
            <div className="flex w-full flex-col items-start gap-[30px] self-start sm:col-span-3 xl:col-span-1 xl:max-w-[493px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/bone-logotype-clair.svg"
                alt="BONE IT"
                width={246}
                height={70}
                className="w-[200px] 2xl:w-[246px]"
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
              {/* L'adresse de courriel ne figure plus ici. Même dérobée, elle
                  était présente sur chaque page du site, ce qui en faisait la
                  cible la plus facile à moissonner. Le formulaire est le
                  chemin de contact, et les pages légales portent l'adresse là
                  où elle est obligatoire.

                  Le réseau social sort du site : il ne peut pas porter
                  l'indicateur de page courante. */}
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-base text-white"
              >
                Linkedin
              </a>
            </div>

            <div className="flex h-[45px] items-center gap-5 sm:col-span-3 xl:col-span-1 xl:justify-self-start">
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
          className="pointer-events-none absolute bottom-0 left-0 h-auto w-[820px] max-w-none lg:left-[5.34%] lg:w-[89.3%]"
        />

        {/* Le décompte et les mentions ne partagent leur ligne qu'à partir de
            1280px : en dessous, le dernier lien passait seul à la ligne
            suivante, aligné à droite, ce qui se lisait comme un oubli. */}
        <div className="flex w-full flex-col items-start gap-4 xl:flex-row xl:justify-between">
          {/* L'année se calcule au build : figée dans le code, elle serait
              périmée au premier janvier suivant. */}
          <p className="text-xs whitespace-nowrap text-white/80">
            © {new Date().getFullYear()} Bone. Tous droits réservés
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-xs text-white/80 xl:justify-end">
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

/** Chaque colonne de liens est un groupe : son intitulé est un vrai titre. */
function TitreColonne({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="titrage text-base font-bold leading-[1.4] whitespace-nowrap text-white">
      {children}
    </h2>
  );
}
