# bone

Site Next.js (App Router) piloté par Payload CMS.

## Stack

- **Next.js 16** — App Router, deux groupes de routes : `(frontend)` pour le
  site public, `(payload)` pour le back-office et l'API.
- **Payload 3.88** — base Postgres (Supabase), éditeur Lexical, médias sur
  Supabase Storage (compatible S3) en production.
- **Tailwind CSS 4**.

## Démarrage

```bash
cp .env.example .env
# renseigner DATABASE_URI et PAYLOAD_SECRET
npm install
npm run dev
```

- Site : http://localhost:3000
- Back-office : http://localhost:3000/admin (le premier compte se crée au
  premier accès)

## Base de données

Le schéma n'est pas poussé automatiquement (`push: false`) : en serverless, une
synchronisation au démarrage se déclencherait sur chaque instance à froid. Après
un changement de collection :

```bash
npm run migrate:create
npm run migrate
```

## Scripts

| Commande | Effet |
| --- | --- |
| `npm run dev` | serveur de développement |
| `npm run build` | build de production |
| `npm run generate:types` | régénère `src/payload-types.ts` |
| `npm run generate:importmap` | régénère la carte d'imports du back-office |
| `npm run migrate:create` | crée une migration à partir du schéma |
| `npm run migrate` | applique les migrations en attente |
