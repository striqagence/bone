import { Button } from "@/components/ui/Button";
import { Header } from "@/components/site/Header";
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

export default function DesignSystem() {
  return (
    <main className="flex flex-1 flex-col gap-16 pb-16">
      <section className="flex flex-col gap-6 bg-gris-950 pb-16">
        <Header />
        <h2 className="px-16 text-2xl text-white">En-tête</h2>

        {/* Le lien pointant sur la page courante rend l'état Actif visible ici ;
            les deux autres liens montrent Default, et Hover au survol. */}
        <div className="flex items-center gap-9 px-24">
          <NavLink href="/design-system">Actif</NavLink>
          <NavLink href="/exemple-a">Par défaut</NavLink>
          <NavLink href="/exemple-b">Survole-moi</NavLink>
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
        <p className="font-display text-6xl font-bold">Titrage 6xl</p>
        <p className="font-display text-4xl font-bold">Titrage 4xl</p>
        <p className="font-display text-2xl font-bold">Titrage 2xl</p>
        <p className="text-xl">Corps xl — Work Sans</p>
        <p className="text-base">Corps base — Work Sans</p>
        <p className="text-sm">Corps sm — Work Sans</p>
      </section>
      </div>
    </main>
  );
}
