/**
 * Pictogrammes de la charte, tracés exportés de Figma.
 *
 * Ils sont en ligne et non servis en `<img>` : la maquette les emploie dans des
 * couleurs différentes selon le fond — bleu de marque sur carte claire, blanc
 * ou primary-50 sur fond sombre — et une image ne peut pas hériter de la
 * couleur du texte. Les dupliquer par teinte reviendrait à multiplier des
 * fichiers identiques au trait près.
 *
 * La boîte est carrée et pilotée par `taille` ; le viewBox conserve le rapport
 * du glyphe, qui s'y inscrit sans déformation.
 */

export function PictoAntenne({ taille = 40 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 34.8333 31.5003"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M20.75 9.08338C20.75 10.9243 19.2576 12.4167 17.4167 12.4167C15.5757 12.4167 14.0833 10.9243 14.0833 9.08338C14.0833 7.24243 15.5757 5.75005 17.4167 5.75005C19.2576 5.75005 20.75 7.24243 20.75 9.08338Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M25.6814 4.08338C26.7809 5.53273 27.4167 7.24672 27.4167 9.08338C27.4167 10.92 26.7809 12.634 25.6814 14.0834M9.15196 4.08338C8.05238 5.53273 7.41667 7.24672 7.41667 9.08338C7.41667 10.92 8.05238 12.634 9.15196 14.0834" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.2765 0.750046C33.0494 3.13352 34.0833 5.99978 34.0833 9.08338C34.0833 12.167 33.0494 15.0332 31.2765 17.4167M3.55681 0.750046C1.78393 3.13352 0.75 5.99978 0.75 9.08338C0.75 12.167 1.78393 15.0332 3.55681 17.4167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.75 12.4167L9.08333 30.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25.75 30.75L19.0833 12.4167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.5833 24.0834H23.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PictoStockage({ taille = 40 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 24 26.5"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M12 0.75C10.9773 0.75 10.0002 1.1692 8.04616 2.00762C3.18205 4.09459 0.75 5.13808 0.75 6.89332V18.5656M12 0.75C13.0227 0.75 13.9998 1.1692 15.9538 2.00762C20.8179 4.09459 23.25 5.13808 23.25 6.89332V18.5656M12 0.75L12 13.0366M23.25 18.5656C23.25 17.8109 22.248 17.3344 20.2441 16.3812L16.5926 14.6445C14.339 13.5726 13.2121 13.0366 12 13.0366M23.25 18.5656C23.25 19.3203 22.248 19.7969 20.2441 20.75M0.75 18.5656C0.75 17.8109 1.75196 17.3344 3.75589 16.3812L7.4074 14.6445C9.66104 13.5726 10.7879 13.0366 12 13.0366M0.75 18.5656C0.75 19.3203 1.75196 19.7969 3.75589 20.75M4.91504 11.6112L7.40739 10.4258" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 25.75V23.25M17 24.5L15.125 22M7 24.5L8.875 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PictoSystemes({ taille = 40 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 24.0001 26.5"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M0.750072 10.3508V9.3857C0.750072 7.51468 0.750072 6.57917 1.10456 5.78928C1.3232 5.30209 1.63646 4.86086 2.02704 4.48997C2.66029 3.88864 3.5577 3.56016 5.35251 2.90321L9.03747 1.55439C10.5025 1.01813 11.2351 0.75 12.0001 0.75C12.7651 0.75 13.4976 1.01813 14.9627 1.55439L18.6476 2.90321C20.4424 3.56016 21.3399 3.88864 21.9731 4.48997C22.3637 4.86086 22.6769 5.30209 22.8956 5.78928C23.2501 6.57917 23.2501 7.51468 23.2501 9.3857V10.3508C23.2501 13.3555 23.2501 14.8578 22.8791 16.2327C22.421 17.9306 21.5524 19.4966 20.3462 20.7992C19.3695 21.854 18.0807 22.6752 15.503 24.3177C14.349 25.053 13.7721 25.4207 13.1587 25.5917C12.4014 25.8028 11.5987 25.8028 10.8414 25.5917C10.2281 25.4207 9.6511 25.053 8.49715 24.3177C5.91949 22.6752 4.63065 21.854 3.65396 20.7992C2.44776 19.4966 1.57917 17.9306 1.12104 16.2327C0.750072 14.8578 0.750072 13.3555 0.750072 10.3508Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.00007 10.0972C8.43612 8.92893 10.1512 8.25 11.9933 8.25C13.8412 8.25 15.5613 8.93322 17.0001 10.1083M14.7179 13.25C13.8978 12.7386 12.9725 12.4508 11.9933 12.4508C11.019 12.4508 10.0981 12.7357 9.28103 13.2423" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.0001 17H12.008" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PictoSecurite({ taille = 40 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 33.1644 34.8333"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M16.5792 0.75C11.5663 0.75 8.31586 4.11499 4.47174 5.3415C2.9087 5.84022 2.12717 6.08957 1.81089 6.44108C1.49461 6.79259 1.40199 7.30625 1.21676 8.33356C-0.765388 19.3267 3.56705 29.49 13.8994 33.4458C15.0095 33.8708 15.5646 34.0833 16.5847 34.0833C17.6048 34.0833 18.1598 33.8708 19.2699 33.4458C29.6016 29.4899 33.9299 19.3266 31.9472 8.33354C31.7619 7.30606 31.6692 6.79233 31.3529 6.44081C31.0365 6.0893 30.255 5.84008 28.6921 5.34164C24.8465 4.11524 21.5924 0.75 16.5792 0.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5822 19.0833C11.5822 19.0833 13.2489 19.0833 14.9156 22.4167C14.9156 22.4167 20.2097 14.0833 24.9156 12.4167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PictoBalance({ taille = 40 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 34.8333 34.8333"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M32.4167 25.75L27.4167 14.0833L22.4167 25.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.4167 25.75L7.41666 14.0833L2.41666 25.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.08332 14.0833H5.83032C7.93609 14.0833 9.97916 12.9078 11.6235 10.75C15.0104 6.30556 19.8229 6.30556 23.2098 10.75C24.8542 12.9078 26.8972 14.0833 29.003 14.0833H30.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27.4167 34.0833C30.0172 34.0833 32.2803 32.3305 33.4468 29.7457C34.0345 28.4435 34.3283 27.7924 33.8294 26.7712C33.3305 25.75 32.5042 25.75 30.8516 25.75H23.9817C22.3291 25.75 21.5028 25.75 21.0039 26.7712C20.505 27.7924 20.7989 28.4435 21.3865 29.7457C22.553 32.3305 24.8161 34.0833 27.4167 34.0833Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.41666 34.0833C10.0172 34.0833 12.2803 32.3305 13.4468 29.7457C14.0345 28.4435 14.3283 27.7924 13.8294 26.7712C13.3305 25.75 12.5042 25.75 10.8516 25.75H3.98171C2.32913 25.75 1.50284 25.75 1.00394 26.7712C0.505027 27.7924 0.798855 28.4435 1.38651 29.7457C2.55299 32.3305 4.81608 34.0833 7.41666 34.0833Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20.75 4.08333C20.75 5.92428 19.2576 7.41667 17.4167 7.41667C15.5757 7.41667 14.0833 5.92428 14.0833 4.08333C14.0833 2.24238 15.5757 0.75 17.4167 0.75C19.2576 0.75 20.75 2.24238 20.75 4.08333Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PictoBoussole({ taille = 40 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 31.5002 34.8335"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M12.4168 14.0833L4.08342 34.0833M19.0834 14.0833L27.4168 34.0833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.7501 4.08333L15.7501 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.750084 19.0833C4.06798 24.1237 9.54956 27.4167 15.7501 27.4167C21.9506 27.4167 27.4322 24.1237 30.7501 19.0833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15.7501 25.75V29.0833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PictoDette({ taille = 40 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 34.8334 33.1669"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M12.4167 2.78856C5.7367 4.30432 0.75 10.2782 0.75 17.4169C0.75 18.2686 0.820997 19.1038 0.957396 19.9169M10.75 7.41686L12.4167 2.78856L7.41667 0.750198M29.1908 24.0835C30.1888 22.0753 30.75 19.8116 30.75 17.4169C30.75 9.98437 25.3443 3.81446 18.25 2.62426M26.5833 19.0835L29.1908 24.0835L34.0833 20.7502M3.27591 25.7502C5.96679 29.7701 10.5493 32.4169 15.75 32.4169C19.5918 32.4169 23.0962 30.9726 25.75 28.5974M3.27591 31.5835V25.7502H9.08333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PictoAlerte({ taille = 40 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 31.5 34.8333"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M4.34728 16.5684C4.22482 18.895 4.3656 21.3716 2.28689 22.9307C1.31939 23.6563 0.75 24.7951 0.75 26.0044C0.75 27.668 2.053 29.0833 3.75 29.0833H27.75C29.447 29.0833 30.75 27.668 30.75 26.0044C30.75 24.7951 30.1806 23.6563 29.2131 22.9307C27.1344 21.3716 27.2752 18.895 27.1527 16.5684C26.8335 10.5037 21.823 5.75 15.75 5.75C9.67696 5.75 4.66647 10.5037 4.34728 16.5684Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.25 2.625C13.25 4.00571 14.3693 5.75 15.75 5.75C17.1307 5.75 18.25 4.00571 18.25 2.625C18.25 1.24429 17.1307 0.75 15.75 0.75C14.3693 0.75 13.25 1.24429 13.25 2.625Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20.75 29.0833C20.75 31.8448 18.5114 34.0833 15.75 34.0833C12.9886 34.0833 10.75 31.8448 10.75 29.0833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PictoLiens({ taille = 40 }: { taille?: number }) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 34.8333 34.8333"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M0.75 17.4167H34.0833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
