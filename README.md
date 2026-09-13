# ML Auto

Website voor autobedrijf ML Auto (Middelburg): publieke bedrijfssite en beveiligd CMS.

Zie **[PROJECT_MAP.md](./PROJECT_MAP.md)** voor architectuur en details.

## Snel starten (lokaal)

```sh
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Admin: `/admin` (credentials in `.env`).

## Deploy op Plesk (Git)

Dit is een **Node.js**-app (geen statische `out/`-map). Vereist de Node.js-extensie in Plesk en **Node 20+**.

### 1. Git-repository

- Extern repository: `https://github.com/Ahmadalaina7/ml-auto`
- Publicatiemodus: Automatisch
- Zoekpad server: map van je (sub)domein, bijv. `/httpdocs` of `/MLAutos.webnestiq.nl`

### 2. Aanvullende acties bij publicatie

Vink **Aanvullende acties bij publicatie** aan en plak:

```sh
bash scripts/plesk-deploy.sh
```

Dat doet: `npm ci` → `prisma migrate deploy` → `npm run build`.

### 3. Eenmalig: `.env` op de server

Maak in de applicatiemap een `.env` (niet via Git), bijvoorbeeld:

```env
DATABASE_URL="file:./data/prod.db"
AUTH_SECRET="plak-hier-minstens-32-willekeurige-tekens"
ADMIN_EMAIL="admin@mlauto.nl"
ADMIN_PASSWORD="sterk-wachtwoord"
DATA_DIR="data"
LOG_LEVEL="info"
```

Daarna één keer admin + demo-data:

```sh
npm run db:seed
```

### 4. Node.js in Plesk

| Instelling | Waarde |
| --- | --- |
| Node.js-versie | 20 of nieuwer |
| Application root | map met `package.json` |
| Application startup file | `server.js` |
| Application mode | production |

Herstart de Node.js-app na elke geslaagde Git-publicatie.

### Let op

- `better-sqlite3` moet op de server kunnen compileren (build tools). Lukt dat niet, gebruik Docker op een VPS (`docker compose up -d --build`).
- Zet nooit `.env` in Git.
