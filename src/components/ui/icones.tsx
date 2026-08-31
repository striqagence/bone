/**
 * Icônes du fil d'ariane, tracés exportés de Figma.
 *
 * Le fichier en fournit une copie par couleur : blanc à 50 % sur fond sombre,
 * `#8B8BA4` sur fond clair. Les chemins étant strictement identiques, le trait
 * passe en `currentColor` et la couleur est portée par le parent.
 *
 * Chaque glyphe est plus petit que sa boîte dans la maquette — 12,67 dans 14
 * pour la maison, 4,25 × 7,5 dans 13 pour le chevron — d'où la boîte de
 * centrage et les dimensions explicites : le laisser remplir sa boîte le
 * déformerait.
 */
export function IconeAccueil() {
  return (
    <span className="inline-flex size-[14px] shrink-0 items-center justify-center">
      <svg width="12.6667" height="12.6667" viewBox="0 0 12.6667 12.6667" fill="none" aria-hidden>
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.33334 9.83333L6.33334 8.08333" />
          <path d="M0.704981 7.04118C0.499052 5.70114 0.396088 5.03112 0.649432 4.43714C0.902776 3.84315 1.46485 3.43675 2.589 2.62395L3.42891 2.01667C4.82734 1.00556 5.52655 0.5 6.33334 0.5C7.14012 0.5 7.83933 1.00556 9.23776 2.01667L10.0777 2.62395C11.2018 3.43675 11.7639 3.84315 12.0172 4.43714C12.2706 5.03112 12.1676 5.70114 11.9617 7.04118L11.7861 8.18389C11.4942 10.0835 11.3482 11.0334 10.6669 11.6C9.98564 12.1667 8.98964 12.1667 6.99764 12.1667H5.66903C3.67703 12.1667 2.68103 12.1667 1.99975 11.6C1.31847 11.0334 1.17251 10.0835 0.880585 8.18389L0.704981 7.04118Z" />
        </g>
      </svg>
    </span>
  );
}

export function ChevronDroite() {
  return (
    <span className="inline-flex size-[13px] shrink-0 items-center justify-center">
      <svg width="4.25003" height="7.50007" viewBox="0 0 4.25003 7.50007" fill="none" aria-hidden>
        <path
          d="M0.500058 0.500033C0.500058 0.500033 3.75003 2.89362 3.75003 3.75006C3.75004 4.6065 0.500033 7.00003 0.500033 7.00003"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Pictogrammes d'état du formulaire, tracés exportés de Figma.
 *
 * Comme les précédents, ils mesurent 22,33 dans une boîte de 25 et passent en
 * `currentColor`. La maquette les colore respectivement en bleu de marque et en
 * rouge 600 — ce dernier plus soutenu que le rouge 500 du texte qui
 * l'accompagne, nuance conservée telle quelle.
 */
function Cercle({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex size-[25px] shrink-0 items-center justify-center">
      <svg width="22.3333" height="22.3333" viewBox="0 0 22.3333 22.3333" fill="none" aria-hidden>
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {children}
        </g>
      </svg>
    </span>
  );
}

export function IconeSucces() {
  return (
    <Cercle>
      <path d="M14.2917 1.22688C13.3052 0.917036 12.2554 0.750001 11.1667 0.750001C5.4137 0.750001 0.75 5.4137 0.75 11.1667C0.75 16.9196 5.4137 21.5833 11.1667 21.5833C16.9196 21.5833 21.5833 16.9196 21.5833 11.1667C21.5833 10.0779 21.4163 9.02817 21.1065 8.04167" />
      <path d="M7.52083 8.5625L11.1667 12.2083L20.5419 1.79167" />
    </Cercle>
  );
}

export function IconeErreur() {
  return (
    <Cercle>
      <path d="M14.291 14.2917L8.04167 8.04167M8.04233 14.2917L14.2917 8.04167" />
      <path d="M21.5833 11.1667C21.5833 5.4137 16.9196 0.750001 11.1667 0.750001C5.4137 0.750001 0.75 5.4137 0.75 11.1667C0.75 16.9196 5.4137 21.5833 11.1667 21.5833C16.9196 21.5833 21.5833 16.9196 21.5833 11.1667Z" />
    </Cercle>
  );
}

/**
 * Flèche de renvoi des puces (Figma « arrow-move-down-right-sharp »).
 *
 * Tracé exporté, mesuré 17,96 × 20,25 dans une boîte de 25. La maquette
 * l'emploie aussi dans une boîte de 20, où le glyphe est réduit d'autant : la
 * taille est donc un paramètre, plutôt qu'un second composant.
 *
 * Elle est colorée en bleu de marque, porté ici par le parent via
 * `currentColor`.
 */
export function FlecheRenvoi({ taille = 25 }: { taille?: 20 | 25 }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${taille === 20 ? "size-5" : "size-[25px]"}`}
    >
      <svg
        width={17.9596 * (taille / 25)}
        height={20.25 * (taille / 25)}
        viewBox="0 0 17.9596 20.25"
        fill="none"
        aria-hidden
      >
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0.750003 0.75V2.91346C0.750003 4.99777 0.750003 6.03992 0.901384 6.91192C1.73468 11.712 5.861 15.4766 11.1222 16.2369C12.078 16.375 14.0904 16.375 16.375 16.375" />
          <path d="M14.2917 19.5L16.7096 17.0821C17.0429 16.7488 17.2096 16.5821 17.2096 16.375C17.2096 16.1679 17.0429 16.0012 16.7096 15.6679L14.2917 13.25" />
        </g>
      </svg>
    </span>
  );
}

/**
 * Variante à pointe arrondie de la flèche de renvoi (« arrow-move-down-right-round »).
 *
 * La maquette distingue les deux colonnes de la section « Positionnement » par
 * cette seule nuance : pointe anguleuse à droite, arrondie à gauche.
 */
export function FlecheRenvoiRonde() {
  return (
    <span className="inline-flex size-[25px] shrink-0 items-center justify-center">
      <svg width="18.1667" height="20.25" viewBox="0 0 18.1667 20.25" fill="none" aria-hidden>
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0.750003 0.75V2.91346C0.750003 4.99777 0.750003 6.03992 0.901384 6.91192C1.73468 11.712 5.861 15.4766 11.1222 16.2369C12.078 16.375 14.0904 16.375 16.375 16.375" />
          <path d="M14.2917 19.5C14.9238 18.8856 17.4167 17.2503 17.4167 16.375C17.4167 15.4997 14.9238 13.8644 14.2917 13.25" />
        </g>
      </svg>
    </span>
  );
}

/**
 * Chevrons de bascule de l'accordéon (Figma « ToggleArrowDown » / « ToggleArrowUp »).
 *
 * Les tracés exportés sont horizontaux ; la maquette les pivote et les miroite
 * pour les rendre verticaux. La transformation est reprise telle quelle plutôt
 * que les chemins redessinés, et la boîte transposée en conséquence — 11,92 ×
 * 17,96 dans une boîte de 25.
 */
export function ChevronBascule({ sens }: { sens: "bas" | "haut" }) {
  const traces =
    sens === "bas"
      ? [
          "M16.375 5.95845L0.75 5.95845",
          "M12.2084 0.75L16.7096 5.25123C17.043 5.58456 17.2096 5.75123 17.2096 5.95833C17.2096 6.16544 17.043 6.33211 16.7096 6.66544L12.2084 11.1667",
        ]
      : [
          "M1.58456 5.95833L17.2096 5.95833",
          "M5.75123 0.75L1.25 5.25123C0.916667 5.58456 0.75 5.75123 0.75 5.95833C0.75 6.16544 0.916667 6.33211 1.25 6.66544L5.75123 11.1667",
        ];

  return (
    <span className="inline-flex size-[25px] shrink-0 items-center justify-center">
      <svg width="11.9167" height="17.9596" viewBox="0 0 11.9167 17.9596" fill="none" aria-hidden>
        <g
          transform="rotate(-90) scale(-1, 1)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {traces.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </svg>
    </span>
  );
}

/**
 * Les deux mains de la section « posture », et le document de la colonne
 * « Livrable ».
 *
 * Figma les exporte en `#4C5AFF` et `#2020FF` ; le trait passe en
 * `currentColor` comme le reste du fichier, la nuance étant portée par le
 * parent. Chaque tracé est plus petit que sa boîte dans la maquette — 34,83
 * dans 40 pour les mains — d'où les dimensions explicites.
 */
export function IconeMainRefus() {
  return (
    <span className="inline-flex size-10 shrink-0 items-center justify-center">
      <svg width="34.8333" height="34.8338" viewBox="0 0 34.8333 34.8338" fill="none" aria-hidden>
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M26.5833 34.0838V32.1428C26.5833 30.605 27.4145 29.394 28.25 28.25M10.75 34.0838C10.75 32.2216 10.1263 29.9616 8.97845 28.4954L2.97896 20.8317C2.20967 19.8027 2.23179 18.382 3.03275 17.3777C4.07954 16.0651 6.03128 15.9566 7.21616 17.1452L9.91667 19.8542V9.91667" />
          <path d="M19.9196 6.58333C19.9196 5.20262 21.0389 4.08333 22.4196 4.08333C23.8003 4.08333 24.9196 5.20262 24.9196 6.58333V9.91667M14.92 8.25075V5.75L14.9196 3.25C14.9196 1.86929 16.0389 0.75 17.4196 0.75C18.8003 0.75 19.9196 1.86929 19.9196 3.25V6.58333M19.9196 6.58333V13.2504M14.92 5.75C14.9194 4.36978 13.8003 3.25195 12.42 3.25107C11.0396 3.25019 10.75 4.08333 10.75 4.08333M24.9196 17.4167V9.91667M24.9196 9.91667C24.9196 8.53596 26.0389 7.41667 27.4196 7.41667C28.8003 7.41667 29.9196 8.53595 29.9196 9.91667V20.1947C29.9196 21.3854 29.9196 22.3995 29.9 23.25" />
          <path d="M0.75 0.75L34.0833 34.0833" strokeLinejoin="miter" />
        </g>
      </svg>
    </span>
  );
}

export function IconeMainOuverte() {
  return (
    <span className="inline-flex size-10 shrink-0 items-center justify-center">
      <svg width="26.5004" height="34.8333" viewBox="0 0 26.5004 34.8333" fill="none" aria-hidden>
        <path
          d="M3.875 34.0833V31.9444C3.875 30.2195 3.47966 28.5182 2.7203 26.9754L2.23462 25.9886C1.25829 24.0049 0.75 21.8176 0.75 19.5998L0.75 11.0675C0.75 9.7525 1.79933 8.68651 3.09375 8.68651C4.38817 8.68651 5.4375 9.7525 5.4375 11.0675M17.9375 34.0833C17.9375 33.3623 17.9362 32.6441 17.9375 31.9519C17.941 30.0459 19.9304 29.0772 21.5574 28.1277C23.4163 27.0429 24.9072 25.2923 25.5947 23.1847C26.0467 21.7988 24.7944 20.5929 23.2988 20.5929C21.8033 20.5929 20.5326 21.9005 19.4482 22.9017C19.2784 23.0585 19.1171 23.181 18.9874 23.264C16.8728 24.6117 14.0511 22.9898 14.0511 20.5929C14.0511 18.196 16.8728 16.5741 18.9874 17.9218C19.514 18.1983 19.9484 18.5657 20.2955 18.9472C21.083 19.8125 22.1223 20.5929 23.3107 20.5929C24.8336 20.5929 26.11 19.3657 25.6575 17.952C24.5277 14.4223 21.1933 11.8644 17.2557 11.8644C15.5938 11.8644 14.8125 12.3347 14.8125 12.3347L18.3872 3.99531C19.0118 2.44713 17.891 0.75 16.244 0.75C15.3667 0.75 14.5647 1.25354 14.1723 2.0507L10.125 10.2738M10.125 10.2738L9.37902 11.7895M10.125 10.2738L10.125 4.71825C10.125 3.40329 9.07567 2.3373 7.78125 2.3373C6.48683 2.3373 5.4375 3.40329 5.4375 4.71825V11.0675M5.4375 11.0675L5.4375 16.623"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function IconeLivrable() {
  return (
    <span className="inline-flex size-[25px] shrink-0 items-center justify-center">
      <svg width="20.2502" height="22.3334" viewBox="0 0 20.2502 22.3334" fill="none" aria-hidden>
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.1667 17.4167C11.1667 17.4167 12.2083 17.4167 13.25 19.5C13.25 19.5 16.5588 14.2917 19.5 13.25" />
          <path d="M9.08333 21.5834H8.79924C5.40215 21.5834 3.70361 21.5834 2.52403 20.7523C2.18606 20.5142 1.88602 20.2318 1.63302 19.9137C0.750001 18.8035 0.75 17.2049 0.75 14.0076V11.3561C0.75 8.26947 0.750001 6.72615 1.23848 5.49354C2.02377 3.51194 3.68452 1.94888 5.78996 1.20979C7.09961 0.750045 8.73939 0.750044 12.0189 0.750044C13.893 0.750044 14.83 0.750044 15.5784 1.01275C16.7815 1.43509 17.7305 2.32827 18.1792 3.46061C18.4583 4.16496 18.4583 5.04686 18.4583 6.81065V9.08338" />
          <path d="M0.75 11.1667C0.75 9.24906 2.30457 7.69449 4.22222 7.69449C4.91575 7.69449 5.73337 7.81601 6.40767 7.63533C7.00679 7.4748 7.47476 7.00684 7.63529 6.40772C7.81597 5.73342 7.69445 4.91579 7.69445 4.22227C7.69445 2.30461 9.24901 0.750046 11.1667 0.750046" />
        </g>
      </svg>
    </span>
  );
}

/** Le « plus » encadré du bouton « charger plus d'articles ». */
export function IconePlus() {
  return (
    <span className="inline-flex size-5 shrink-0 items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="0.75" y="0.75" width="14.5" height="14.5" rx="3" />
          <path d="M8 4.75V11.25M4.75 8H11.25" />
        </g>
      </svg>
    </span>
  );
}
