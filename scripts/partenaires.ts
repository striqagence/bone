/**
 * Les logotypes de la bande partenaires, partagés par les écrans qui la
 * portent — Expertise et Feed. Une seule liste : les deux bandes montrent la
 * même rangée dans la maquette, à un décalage près, et deux copies auraient
 * fini par diverger.
 *
 * Les hauteurs viennent de la maquette, logo par logo : elle les cale à l'œil
 * plutôt que sur une hauteur commune, un logotype large ne pesant pas comme un
 * logotype carré.
 *
 * HPE ouvre et ferme la rangée : la bande déborde de l'écran des deux côtés, et
 * ce doublon en est la couture — le retirer laisserait la fin de la rangée se
 * terminer net là où la maquette la fait continuer.
 */
export const logosPartenaires = [
  { fichier: "hpe.svg", nom: "Hewlett Packard Enterprise", hauteur: 32 },
  { fichier: "fortinet.svg", nom: "Fortinet", hauteur: 32 },
  { fichier: "paloalto.svg", nom: "Palo Alto Networks", hauteur: 45 },
  { fichier: "huawei.svg", nom: "Huawei", hauteur: 42 },
  { fichier: "vmware.svg", nom: "VMware", hauteur: 26 },
  { fichier: "microsoft.svg", nom: "Microsoft", hauteur: 36 },
  { fichier: "proxmox.svg", nom: "Proxmox", hauteur: 33 },
  { fichier: "hpe.svg", nom: "Hewlett Packard Enterprise", hauteur: 32 },
];
