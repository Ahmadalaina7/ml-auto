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

## Publiceren op Plesk (statisch, geen Node)

De live site staat in **`out/`**. In de repo-root zit een **`.htaccess`** die alles naar `out/` stuurt, zodat het domein werkt ook als Zoekpad de hele git-map is (niet alleen `out`).

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
| Zoekpad server | map met `package.json` **of** map `out` |
| Publicatiemodus | Automatisch |
| Aanvullende actie (aanbevolen) | `bash scripts/plesk-deploy.sh` |

Daarna **Pull / Publiceren**. Geen Node.js nodig.

Als de Plesk-defaultpagina blijft staan: run de aanvullende actie of verwijder handmatig `index.html` in de document root (alleen als die de Plesk-tekst “Domain Default page” bevat).

### Let op

- Voorraad/acties wijzigen: lokaal data aanpassen → opnieuw `npm run build:static` → push `out/`
- Formulieren openen WhatsApp (past bij statische hosting)
- Admin (`/admin`) werkt lokaal met `npm run dev`, niet op de statische Plesk-site
