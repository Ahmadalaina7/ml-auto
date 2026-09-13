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
| Zoekpad server | map met `package.json` (hele repo) |
| Publicatiemodus | Automatisch |
| Aanvullende actie | `bash scripts/plesk-deploy.sh` (**verplicht**) |

Daarna **Pull / Publiceren**. Geen Node.js nodig.

Het script kopieert `out/` naar de document root en herstelt `DirectoryIndex`. Zonder die actie geeft `/` vaak een 404 terwijl `/index.html` wél werkt.

### Let op

- Voorraad/acties wijzigen: lokaal data aanpassen → opnieuw `npm run build:static` → push `out/`
- Formulieren openen WhatsApp (past bij statische hosting)
- Admin (`/admin`) werkt lokaal met `npm run dev`, niet op de statische Plesk-site
