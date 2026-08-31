import { Button } from "@/components/ui/Button";
import { HeroInterne } from "@/components/sections/HeroInterne";
import { HeroPleineImage } from "@/components/sections/HeroPleineImage";
import { CarteArticle } from "@/components/ui/CarteArticle";
import { CartePole } from "@/components/ui/CartePole";
import { SoumissionFormulaire } from "@/components/ui/SoumissionFormulaire";
import { MenuDeroulant } from "@/components/site/MenuDeroulant";
import { FilDAriane } from "@/components/ui/FilDAriane";
import { Surtitre } from "@/components/ui/Surtitre";
import { estUneLangue } from "@/lib/i18n";
import { chargerNavigation } from "@/lib/navigation";
import { notFound } from "next/navigation";
import { NavLink } from "@/components/site/NavLink";

/**
 * Planche de contrôle du design system.
 *
 * Sert à comparer les composants au fichier Figma pendant l'intégration, sans
 * avoir à monter une page complète pour vérifier une variante. À retirer — ou à
 * passer derrière une condition d'environnement — avant la mise en ligne
 * publique du site.
 */
const variantes = ["primary", "secondary", "tertiaire"] as const;
const tailles = ["lg", "sm"] as const;

export default async function DesignSystem({ params }: PageProps<"/[locale]/design-system">) {
  const { locale } = await params;
  if (!estUneLangue(locale)) notFound();

  const navigation = await chargerNavigation(locale);

  return (
    <main className="flex flex-1 flex-col gap-16 pb-16">
      <section className="flex flex-col gap-6 bg-gris-950 py-16">
        <h2 className="px-16 text-2xl text-white">Liens de navigation</h2>

        {/* Le lien pointant sur la page courante rend l'état Actif visible ici ;
            les deux autres montrent Default, et Hover au survol. */}
        <div className="flex items-center gap-9 px-24">
          <NavLink chemin="/design-system" langue={locale}>Actif</NavLink>
          <NavLink chemin="/exemple-a" langue={locale}>Par défaut</NavLink>
          <NavLink chemin="/exemple-b" langue={locale}>Survole-moi</NavLink>
        </div>

        {/* Le déroulant est aussi montré déplié, pour l'examiner sans avoir à
            maintenir le survol. */}
        <div className="px-16">
          <MenuDeroulant langue={locale} poles={navigation.poles ?? []} />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="px-16 text-2xl">Surtitres et fil d’ariane</h2>
        <div className="flex flex-col gap-6 px-16">
          <Surtitre>Le constat</Surtitre>
          <Surtitre couleur="marine">Nos compétences</Surtitre>
          <FilDAriane
            langue={locale}
            fond="clair"
            entrees={[{ libelle: "Nos compétences" }]}
          />
          <FilDAriane
            langue={locale}
            fond="clair"
            entrees={[
              { libelle: "Nos compétences", chemin: "/competences" },
              { libelle: "Expertise" },
            ]}
          />
        </div>
        <div className="flex flex-col gap-6 bg-gris-950 px-16 py-10">
          <Surtitre couleur="blanc">Le constat</Surtitre>
          <FilDAriane
            langue={locale}
            fond="sombre"
            entrees={[
              { libelle: "Nos compétences", chemin: "/competences" },
              { libelle: "Expertise" },
            ]}
          />
        </div>
      </section>

      {/* La photo viendra de Payload : l'aplat tient sa place en attendant. */}
      <section className="flex flex-col gap-8">
        <h2 className="px-16 text-2xl">Hero de page interne</h2>
        <HeroInterne
          langue={locale}
          entrees={[{ libelle: "Nos compétences" }]}
          surtitre="Nos compétences"
          titre="Trois pôles, une seule logique : sécuriser vos décisions d’infrastructure."
          description="Expertise, Capital et Feed couvrent l’ensemble du cycle de vie de votre infrastructure : conseil et architecture, revalorisation du parc, et environnements critiques pour les médias. Trois entrées distinctes, une même exigence."
          cta={{ libelle: "Parler à un expert", chemin: "/contact" }}
        />
      </section>


      {/* Les photos de fond viendront de Payload : l'aplat marine tient leur
          place, le dégradé de la maquette restant appliqué par-dessus. */}
      <section className="flex flex-col gap-8">
        <h2 className="px-16 text-2xl">Hero de pôle et d’article</h2>
        <HeroPleineImage
          langue={locale}
          entrees={[
            { libelle: "Nos compétences", chemin: "/competences" },
            { libelle: "Expertise" },
          ]}
          surtitre="Réseau • Stockage • systèmes"
          titre="L’expertise qui donne du sens à toute l’infrastructure."
          description="On n’exécute pas une commande. On analyse, on structure, on guide. Bone Expertise ne vend pas qu’une prestation : on sécurise une décision."
          logo="expertise"
          cta={{ libelle: "Parler à un expert", chemin: "/contact" }}
        />
        <HeroPleineImage
          langue={locale}
          entrees={[{ libelle: "Blog", chemin: "/blog" }, { libelle: "Un article" }]}
          surtitre="Réseau • Stockage • systèmes"
          titre="L’expertise qui donne du sens à toute l’infrastructure."
          description="On n’exécute pas une commande. On analyse, on structure, on guide."
          infos={{ date: "avril 2026", tempsDeLecture: "12 min de lecture" }}
        />
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="px-16 text-2xl">Cartes de pôle</h2>
        <p className="px-16 text-sm text-gris-400">
          Le bloc description et action apparaît au survol à partir de 1024px, et reste
          visible en dessous — le survol n’existe pas sur écran tactile.
        </p>
        <div className="flex flex-wrap gap-6 px-16">
          <CartePole
            langue={locale}
            chemin="/competences/expertise"
            pole="expertise"
            eyebrow="Pôle cœur"
            accroche="Réseau • Stockage • systèmes"
            description="Audit de l’existant, cartographie des risques, conformité NIS2/ISO 27001 : Bone Expertise sécurise vos décisions d’architecture."
            libelleAction="Voir le pôle"
          />
          <CartePole
            langue={locale}
            chemin="/competences/capital"
            pole="capital"
            eyebrow="Complément stratégique"
            accroche="Jusqu’à 70% d’économie vs neuf"
            description="Revalorisation plutôt que renouvellement systématique : jusqu’à 70% d’économie sur votre parc IT, avec une expertise infrastructure, pas de logique revendeur."
            libelleAction="Voir le pôle"
          />
          <CartePole
            langue={locale}
            chemin="/competences/feed"
            pole="feed"
            eyebrow="Vertical business"
            accroche="Broadcast • Post-production"
            description="Infrastructures critiques broadcast : flux temps réel, stockage massif, latence zéro tolérée, pensés par des experts du secteur."
            libelleAction="Voir le pôle"
          />
        </div>
      </section>


      <section className="flex flex-col gap-8">
        <h2 className="px-16 text-2xl">Carte d’article</h2>
        <div className="flex flex-wrap gap-12 px-16 pb-12">
          <CarteArticle
            langue={locale}
            chemin="/blog/revendre-ou-revaloriser"
            categorie="Capital"
            date="avril 2026"
            tempsDeLecture="6 min de lecture"
            titre="Revendre ou revaloriser ? Le vrai calcul sur 3 ans"
            description="Entre revente rapide et revalorisation interne, l’écart de coût réel n’est pas celui qu’on imagine."
            libelleAction="Lire l’article"
          />
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="px-16 text-2xl">Soumission de formulaire</h2>
        <div className="flex flex-col gap-10 px-16">
          <SoumissionFormulaire
            libelle="Envoyer ma demande"
            message="En cliquant, vous acceptez les règles de confidentialité et les conditions d’utilisation de Google, ce site étant protégé par reCAPTCHA."
          />
          <SoumissionFormulaire
            libelle="Envoyer ma demande"
            etat="succes"
            message="Votre demande a bien été envoyée. Un membre de l’équipe BONE vous recontacte sous 24 à 48h."
          />
          <SoumissionFormulaire
            libelle="Envoyer ma demande"
            etat="erreur"
            message="Une erreur est survenue lors de l’envoi. Merci de réessayer, ou de nous contacter directement par email."
          />
        </div>
      </section>

      <div className="flex flex-col gap-16 px-16">
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl">Boutons</h1>

        {/* Fond sombre : les variantes secondary et tertiaire sont dessinées
            sur les sections foncées des maquettes, elles seraient illisibles
            sur blanc. */}
        <div className="flex flex-col gap-10 rounded bg-gris-950 p-16">
          {tailles.map((taille) => (
            <div key={taille} className="flex flex-col gap-6">
              <p className="text-xs uppercase tracking-widest text-white/50">
                taille {taille}
              </p>
              <div className="flex flex-wrap items-start gap-12">
                {variantes.map((variante) => (
                  <Button key={variante} href="#" variante={variante} taille={taille}>
                    En savoir plus
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-start gap-12 rounded bg-gris-100 p-16">
          <Button href="#" flecheAvant={false}>
            Flèche à droite seulement
          </Button>
          <Button href="#" flecheApres={false}>
            Flèche à gauche seulement
          </Button>
          <Button href="#" flecheAvant={false} flecheApres={false}>
            Sans flèche
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl">Couleurs</h2>
        <div className="flex flex-wrap gap-4">
          {[
            ["primary-600", "bg-primary-600"],
            ["primary-800", "bg-primary-800"],
            ["primary-900", "bg-primary-900"],
            ["primary-950", "bg-primary-950"],
            ["primary-50", "bg-primary-50"],
            ["accent-700", "bg-accent-700"],
            ["encre", "bg-encre"],
            ["gris-950", "bg-gris-950"],
            ["gris-400", "bg-gris-400"],
            ["gris-300", "bg-gris-300"],
            ["gris-100", "bg-gris-100"],
            ["gris-50", "bg-gris-50"],
          ].map(([nom, classe]) => (
            <div key={nom} className="flex flex-col gap-2">
              <div className={`size-24 rounded border border-gris-300 ${classe}`} />
              <span className="text-xs">{nom}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl">Typographie</h2>
        <p className="titrage text-6xl font-bold">Titrage 6xl</p>
        <p className="titrage text-4xl font-bold">Titrage 4xl</p>
        <p className="titrage text-2xl font-bold">Titrage 2xl</p>
        <p className="text-xl">Corps xl — Work Sans</p>
        <p className="text-base">Corps base — Work Sans</p>
        <p className="text-sm">Corps sm — Work Sans</p>
      </section>
      </div>
    </main>
  );
}
