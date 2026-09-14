# Scripts d'amorçage retirés du circuit

Ces onze scripts remplissaient les sections de l'accueil quand celles-ci
étaient des groupes figés du global. Depuis leur passage en blocs, ils écrivent
dans des champs qui n'existent plus et ne compilent pas : le dossier est exclu
du typage.

Ils sont gardés pour une seule raison : ils portent les textes d'origine de la
page d'accueil, dans les deux langues. Si le contenu venait à être perdu ou
qu'il faille revenir à la version de départ, c'est ici qu'il se trouve, et non
dans une sauvegarde de base.

Pour les remettre en service, il faudrait écrire dans le tableau `sections` du
global plutôt que dans un groupe : voir `scripts/accueil-en-sections.ts`, qui a
fait la reprise.
