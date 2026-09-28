"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vidéo de fond du hero.
 *
 * Elle se superpose à l'image, qui reste en place dessous : celle-ci s'affiche
 * immédiatement et sert d'affiche, si bien que le premier rendu est le même
 * qu'avant et qu'aucune zone vide n'apparaît pendant le chargement.
 *
 * **Elle n'est montée qu'aux conditions où elle a du sens.** Le fichier pèse
 * plusieurs mégaoctets : l'imposer à un téléphone en itinérance coûterait cher
 * pour un décor. En dessous de 1024px, la largeur à laquelle la maquette
 * bascule déjà en une colonne, l'image suffit.
 *
 * Le second garde-fou est le mouvement réduit. Un fond animé en boucle gêne
 * réellement certaines personnes, et le système d'exploitation permet de le
 * dire : on l'écoute plutôt que de le deviner.
 *
 * Le montage se fait après l'hydratation, jamais au rendu serveur : la requête
 * de média n'existe pas côté serveur, et supposer une réponse produirait un
 * écart entre les deux rendus.
 */
export function VideoFond({ source, affiche }: { source: string; affiche?: string }) {
  const [montee, setMontee] = useState(false);
  const [prete, setPrete] = useState(false);
  const element = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const assezLarge = window.matchMedia("(min-width: 1024px)");
    const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decider = () => setMontee(assezLarge.matches && !mouvementReduit.matches);
    decider();

    assezLarge.addEventListener("change", decider);
    mouvementReduit.addEventListener("change", decider);
    return () => {
      assezLarge.removeEventListener("change", decider);
      mouvementReduit.removeEventListener("change", decider);
    };
  }, []);

  /**
   * La lecture est demandée à la main plutôt que laissée à l'attribut.
   *
   * Sur une balise insérée après coup par React, `autoPlay` reste sans effet :
   * le navigateur a déjà arbitré la lecture automatique quand la source lui
   * parvient. Mesuré ici, la vidéo restait figée à zéro, sans erreur ni
   * message. L'appel explicite lève l'ambiguïté, et son refus éventuel est
   * capturé : la page garde alors son image de fond, ce qui est acceptable.
   */
  useEffect(() => {
    const video = element.current;
    if (!video) return;
    void video.play().catch(() => undefined);
  }, [montee]);

  if (!montee) return null;

  return (
    <video
      ref={element}
      src={source}
      poster={affiche}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      tabIndex={-1}
      onCanPlay={() => setPrete(true)}
      /* L'apparition attend que la lecture soit possible : sans cela, la vidéo
         remplacerait l'image par une image fixe identique à sa première
         trame, produisant un clignotement à la reprise de la boucle. */
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        prete ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
