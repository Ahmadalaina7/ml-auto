# ML Auto

Website voor autobedrijf ML Auto (Middelburg): publieke site + beveiligd CMS.

## Lokaal

```sh
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Admin: `/admin`

## Plesk (belangrijk)

Zonder **Node.js** blijft je domein de Plesk-defaultpagina tonen. Alleen Git-koppelen is niet genoeg.

### A. Git

1. Extern repository: `https://github.com/Ahmadalaina7/ml-auto`
2. **Zoekpad server** = website-map van het subdomain (waar de site naartoe moet), bv. `mlaoutos.webnestiq.nl`
3. Vink **Aanvullende acties bij publicatie** aan:

```sh
bash scripts/plesk-deploy.sh
```

4. Publiceren / Pull

Het script:
- verwijdert de Plesk-`index.html` (die blokkeert anders de app)
- maakt `.env` aan als die ontbreekt
- installeert dependencies, migreert de database, bouwt de site
- seedt admin bij de eerste deploy

### B. Node.js (verplicht)

In Plesk → **Node.js** voor dit domein:

| Instelling | Waarde |
| --- | --- |
| Node.js-versie | **20 of hoger** |
| Application root | map met `package.json` |
| Application startup file | **`server.js`** |
| Application mode | production |
| Enabled | **Aan** |

Daarna **Herstarten**.

### C. Wachtwoord wijzigen

Na eerste deploy log in op `/admin` met:
- e-mail: `admin@mlauto.nl`
- wachtwoord: `WijzigDitWachtwoord123` (staat in `.env` → meteen wijzigen)

### Lukt Node.js niet op je hosting?

Dan kan deze Next.js-app (admin, database, formulieren) niet draaien op alleen statische hosting. Gebruik een VPS met Docker (`docker compose up -d --build`) of een pakket mét Node.js.
