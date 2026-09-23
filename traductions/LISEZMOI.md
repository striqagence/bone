# Traductions

`source-fr.json` est l'extraction des textes français du back-office,
`zh.json` leur traduction chinoise. Les deux fichiers sont versionnés pour que
la traduction soit relisible sans accès à la base, et rejouable si un contenu
est écrasé.

Extraire une langue :

```
npx payload run scripts/exporter-textes.ts fr traductions/source-fr.json
```

Réinjecter une traduction :

```
npx payload run scripts/importer-traductions.ts zh traductions/zh.json
```

La clé d'une chaîne est son chemin dans le document. Elle désigne le même
endroit dans les deux sens, y compris dans un corps d'article, où les nœuds de
texte n'ont pas de nom. Une chaîne sans traduction est laissée telle quelle :
Payload sert alors le français en repli, et le compte des manquantes s'affiche
à la fin de l'import.

Ce qui n'est jamais traduit est listé dans `scripts/traduction-parcours.ts` :
identifiants d'URL, clés de pictogrammes, noms de fichiers, attributs de mise
en forme de l'éditeur, adresses. Cette liste s'est construite en regardant ce
qui sortait de l'extraction ; en ajouter une entrée demande de vérifier qu'elle
ne masque pas un libellé au passage, ce qui est arrivé pour « email » et
« telephone », à la fois données de contact et libellés de formulaire.
