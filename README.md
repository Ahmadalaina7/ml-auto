# ML Auto

Website voor autobedrijf ML Auto (Middelburg).

## Lokaal ontwikkelen

```sh
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

## Publiceren op Plesk (zoals je andere sites)

Deze site gaat als **statische map `out/`** online. Geen Node.js nodig op Plesk.

### 1. Lokaal bouwen en pushen

```sh
npm run build:static
git add out
git commit -m "Update static site"
git push
```

### 2. In Plesk Git

| Instelling | Waarde |
| --- | --- |
| Repository | `https://github.com/Ahmadalaina7/ml-auto` |
| **Zoekpad server** | **`out`** (belangrijk) |
| Publicatiemodus | Automatisch |

Daarna Pull/Publiceren. Klaar: geen Node.js, geen deploy-script.

### Let op

- Voorraad/acties wijzigen: lokaal data aanpassen → opnieuw `npm run build:static` → push `out/`
- Formulieren openen WhatsApp (past bij statische hosting)
- Admin (`/admin`) werkt lokaal met `npm run dev`, niet op de statische Plesk-site
