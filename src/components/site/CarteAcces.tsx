"use client";

import { useEffect, useRef } from "react";

import "leaflet/dist/leaflet.css";

/**
 * Plan d'accès de la page contact.
 *
 * La maquette montrait une capture de Google Maps, qu'on ne peut pas
 * redistribuer. La carte est donc dessinée pour de bon, à partir des tuiles
 * d'OpenStreetMap : ni clé d'API, ni compte, ni cookie déposé chez le
 * visiteur — l'attribution suffit, et Leaflet l'affiche.
 *
 * Leaflet manipule le DOM lui-même : la carte est montée après le rendu, dans
 * un conteneur que React ne touche plus ensuite. Le module est importé à la
 * demande pour qu'il ne pèse que sur cette page.
 *
 * Le repère est dessiné en SVG plutôt qu'importé : les icônes par défaut de
 * Leaflet arrivent avec leurs images, dont les chemins se cassent au moindre
 * changement de base d'URL.
 */
const REPERE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 44" width="32" height="44">
  <path d="M16 43C16 43 30 26.5 30 16A14 14 0 1 0 2 16c0 10.5 14 27 14 27Z"
        fill="#2020FF" stroke="#000022" stroke-width="2"/>
  <circle cx="16" cy="16" r="5" fill="#fff"/>
</svg>`;

export function CarteAcces({
  latitude,
  longitude,
  zoom,
  intitule,
}: {
  latitude: number;
  longitude: number;
  zoom: number;
  intitule: string;
}) {
  const conteneur = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = conteneur.current;
    if (!element) return;

    let carte: import("leaflet").Map | undefined;
    let annule = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (annule || !element) return;

      carte = L.map(element, {
        center: [latitude, longitude],
        zoom,
        // La molette fait défiler la page : sur une carte insérée dans un
        // formulaire, la capturer piégerait le défilement.
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(carte);

      L.marker([latitude, longitude], {
        title: intitule,
        alt: intitule,
        icon: L.divIcon({
          html: REPERE,
          className: "",
          iconSize: [32, 44],
          iconAnchor: [16, 44],
        }),
      }).addTo(carte);
    })();

    return () => {
      annule = true;
      carte?.remove();
    };
  }, [latitude, longitude, zoom, intitule]);

  return (
    <div
      ref={conteneur}
      role="img"
      aria-label={intitule}
      className="size-full bg-gris-300 [&_.leaflet-control-attribution]:text-[10px] [&_.leaflet-tile-pane]:contrast-[1.05] [&_.leaflet-tile-pane]:saturate-[0.85]"
    />
  );
}
