# ML Auto — Project Map

Website voor autobedrijf ML Auto (Middelburg): publieke bedrijfssite + beveiligd CMS voor occasions en contactberichten.

**Stack:** Next.js 16 (App Router, RSC, Server Actions) · React 19 · TypeScript 6 · Tailwind CSS 4 · Prisma 7 + SQLite (better-sqlite3) · zod · bcryptjs · jose (JWT) · pino · nodemailer · vitest.

**Hosting:** Docker + SQLite op een VPS. Lokaal draaien voor ontwikkeling.

---

## Status

| Mijlpaal | Status |
| --- | --- |
| M0 · Basis (scaffold, deps, Prisma, lib/server, seed) | ✅ klaar |
| M1 · Publieke site (home, over ons, diensten, occasions, contact) | ✅ klaar |
| M2 · Admin-CMS (login, dashboard, occasions CRUD, berichten, uploads) | ✅ klaar |
| M3 · Tests (unit + integratie) | ✅ klaar · 44 slagen |
| M4 · Deploy (Dockerfile, compose, entrypoint) | ⚠️ bestanden klaar, build nog niet lokaal geverifieerd (geen Docker op dev-machine) |

**Build-verificatie (lokaal uitgevoerd):** `npm run typecheck` ✓ · `npm run lint` ✓ · `npm run build` ✓ (geen waarschuwingen). Runtime-smoketest tegen de productieserver: publieke pagina's 200, admin-guard 307, upload-API 401 zonder sessie.

---

## Hoe runnen

```sh
npm install            # draait postinstall: prisma generate (vereist "allowScripts" in package.json voor npm >=11)
cp .env.example .env   # eenmalig; vul secret(s) in
npm run dev            # http://localhost:3000
```

Handige commando's:

```sh
npm run typecheck      # tsc --noEmit
npm run lint           # eslint
npm run test           # vitest run (44 tests)
npm run build          # productiebuild
npm run db:migrate     # prisma migrate dev (nieuwe migratie maken/toepassen)
npm run db:seed        # tsx prisma/seed.ts — idempotent (admin + demo-occasions)
npx prisma generate    # Prisma-client hergenereren
```

- Standaard inlog: `admin@mlauto.nl` / `MlAuto2026!` (uit `.env`; pas aan in productie).
- Werkende demonstratiedata: 3 occasions met foto's (`/images/golf.jpg`, `/images/corsa.jpg`, `/images/v60.jpg`). Seed uptsert idempotent de 3 demo-slugs — ook de bestaande rijen (incl. `images`).

---

## Architectuur

- **Dataflow:** React Server Components lezen Prisma direct (pages met `export const dynamic = "force-dynamic"`). Mutaties lopen via **Server Actions** + formulierzod-schema's. Publieke routes leven in de routegroep `src/app/(public)/`.
- **Auth:** eigen JWT (HS256, jose), HttpOnly-cookie `ml_admin`, 12 uur geldig. Eén admin-account (credentials, bcryptjs cost 12). Login-ratelimit in-memory (10/min per IP). Guard: `getAdminUser()` → `redirect("/admin/login")` in `admin/(panel)/layout.tsx`, plus `requireAdmin()`/`isAdmin()` in acties en de upload-API.
- **Bestanden:** geüploade foto's gaan naar `${DATA_DIR:-data}/uploads/` en worden geserveerd via de beveiligde route `/uploads/[name]` (naampatroon, path-traversal-guard, immutable cache). Uploads alleen als admin (`POST /api/upload`, JPG/PNG/WEBP, ≤5MB/stuk, max 10, random UUID-naam, twee-pass-validatie vóór schrijven).
- **E-mail:** bij nieuw contactbericht wordt eerst de DB-insert gedaan en daarna non-blocking een notificatie verstuurd via nodemailer. Zonder SMTP-configuratie wordt versturen overgeslagen (logt, nooit throws).
- **Logging:** pino; event-veld naamgevingsconventie `domein.actie.status` (bijv. `auth.login`, `occasion.created`, `upload.error`).

### Foto's & unieke positionering (2026-09-13)

Vergelijking met topdealer-sites (Van Mossel, CD Occasions, Rizq Occasions) → gemene delers: foto's dominant, garantie/trust, online afspraak/proefrit, inkoop ("uw auto verkopen"), openingsuren + kaart. Op deze site verwerkt:

- **Hero met showroomfoto** + donkere gradient (i.p.v. kale kleurvlakken).
- **Beloften-strip** ("Dit beloven wij: geen verrassingen"): afspraak/proefrit, eerlijke offertes, inkoop & export.
- **"Hoeveel is uw auto waard?"** — laagdrempelige inkoopsectie via WhatsApp-prefill/telefoon en 3-stappen-uitleg (onderscheidend, geen kentekencheck-backend nodig).
- **Diensten als kaarten-grid** (i.p.v. kale tekstlijst); occasions-cards tonen nu échte foto's.
- **Contact:** keyless Google-Maps-iframe (Voltaweg 21) + afspraak-CTA.
- **Fotocredits:** alle beelden zijn Wikimedia Commons (CC BY-SA 4.0). Een enkele, niet-opdringerige creditregel staat in de footer (auteurs + licentie, zoals CC BY-SA vereist). Klant wil geen apart credits-blok; mochten de foto&apos;s vervangen worden door eigen bedrijfsfoto&apos;s, dan kan de regel weg.

Images liggen statisch in `public/images/` (`golf.jpg`, `corsa.jpg`, `v60.jpg`, `showroom.jpg`); bewust geen `next/image` (projectconventie: `<img>` met per-bestand eslint-disable).

### Modernisering & unieke werking (2026-09-13)

Vergelijking met topdealer-sites (research: inventory-first homepages, filtertruth op SRP, laagdrempelige leadcapture: click-to-call/WhatsApp/micro-formulieren, smooth interactions, vaste animaties) vertaald naar deze site:

- **Paginatransities:** React `<ViewTransition>` op elke publieke pagina (crossfade + subtiele rise). Header is geankerd (`viewTransitionName: mla-header`) zodat deze niet meeschuift; `pointer-events: none` op de overlay en `prefers-reduced-motion` fallback staan in `globals.css`.
- **Scroll-reveals:** `src/components/Reveal.tsx` (IntersectionObserver, stagger via `delay` prop, CSS-only reduced-motion fallback) over secties/kaarten.
- **Hero:** rustige Ken-Burns-zoom (`hero-zoom`) + gestureerde entree (`rise` met `animationDelay`).
- **Keuzehulp "Vind uw auto in 3 stappen"** (`src/components/OccasionFinder.tsx`): interactieve filterwizard — budget → brandstof → versnellingsbak — tegen het echte aanbod (client-side, honeste pas contre). Toont live matchcount en een WhatsApp-fallback bij geen match.
- **"Net binnen"-badge** op occasion-cards: `isRecentlyAdded(createdAt, 21)` in `src/lib/occasion.ts` (echte `createdAt`, geen verzonnen data) + unit tests.
- **Occasion-detail:** drijvende WhatsApp-FAB (vast) en verrijkte CTA-set incl. WhatsApp-knop.
- **Header:** "use client" — scrollstate met backdrop-blur, actief-navigatie met accent-underline-animatie, CTA "Plan een afspraak", serif-woordenmerk. `NAV_LINKS` verhuisd naar `src/lib/nav.ts` (pure data; client- en servercomponenten lezen eruit — import uit "use client" van een servercomponent geeft client-references die niet leesbaar zijn).
- **Typografie:** Fraunces (serif-display, `next/font/google` zelfgehost, `--font-display` als CSS-var in `layout.tsx`; `.font-display` utility in globals). NB: Google-Fonts worden tijdens de build opgehaald → VPS-build met internet (dat heeft npm install al).
- **Design-systeem:** `DESIGN_SYSTEM.md` — implementatieklaar (tokens, componentstaten, WCAG 2.2 AA met toetsbare criteria). Richting-geïnspireerd op dealersite-patternanalyse; gebrandstempeld op MLAuto (navy/rood, Fraunces). Realisatie van de openstaande QA-punten (autopoppe-aanpak, MLAuto-identiteit):
  - Skip-link "Naar de inhoud" in root-layout + `id="main"` op publiek en admin-layout.
  - Globale `:focus-visible`-outline (accent, 2px) in globals.css — gegarandeerde zichtbare keyboard-focus op elke interactieve node; inputs behouden eigen `focus:ring-accent`.
  - Semantische kleurtokens `success`/`error`(+ `-soft`/`-border`) en `whatsapp` in `@theme inline`; ContactForm gebruikt ze (fout `role="alert"`, bevestigingsblok) i.p.v. raw red/green.
  - `border-gray-200` → `border-brand/10` op publieke kaarten (OccasionCard, diensten, service-grid).
  - MobileNav: touch-target p-3 (≥44px), ESC-sluit, focus naar eerste item bij openen, `aria-haspopup="menu"`, CTA ook in mobiel menu.
  - WhatsApp-FAB gebruikt `bg-whatsapp`-token (was raw hex).
  Open: admin-formulieren (bewust buiten scope van dit design-systeem), geautomatiseerde aXe-run per release.

### Directory (src)

```
app/            routes: (public)/…, admin/login, admin/(panel)/…, api/upload, uploads/[name]
components/     client-componenten (Header/Footer, MobileNav, OccasionCard, OccasionFinder,
                Reveal, ContactForm, LoginForm, AdminNav, OccasionForm, ConfirmForm)
actions/        Server Actions (auth, contact, occasion, bericht)
lib/            env, validator (zod), occasion-helpers, nav-links (data), whatsapp (wa.me-linkbouwer)
lib/server/     db, auth, mailer, logger, rateLimit  (alleen server-side)
generated/      gegenereerde Prisma-client (gitignored)
```

### Datamodel (SQLite — geen enums)

- `AdminUser`: `id` (int @id @autoincrement), `email` (unique), `passwordHash`.
- `Occasion`: `id`, `slug` (unique), `brand`, `model`, `title`, `year`, `mileageKm`, `fuel` (text), `transmission` (text), `priceCents` (int), `description`, `featured` (bool), `status` (`Published`|`Draft`), `images` (JSON-string: `["/uploads/…"]`), timestamps.
- `ContactMessage`: `id`, `name`, `email`, `message`, `status` (`New`|`Handled`), `createdAt`.

---

## Configuratie (`.env`)

| Variabele | Standaard | Toelichting |
| --- | --- | --- |
| `DATABASE_URL` | `file:./dev.db` | SQLite-pad. In Docker absoluut: `file:/app/data/mlauto.db` |
| `DATA_DIR` | `data` | Map voor geüploade bestanden (hierin: `uploads/`) |
| `AUTH_SECRET` | — | JWT-geheim, min. 32 tekens. **Vereist.** |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | `admin@mlauto.nl` / — | Seed-account (eerste seed). **Password vereist in productie.** |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` / `SMTP_TO` | leeg | Leeg ⇒ e-mailnotificatie uit (alleen DB-insert + log) |

Kopieer `.env.example` → `.env`. `.env` is gitignored; `.env.example` wordt wel getracked (geen geheimen daarin).

---

## Tests

Vitest 5, `npm test`.

| Bestand | Dekt |
| --- | --- |
| `test/validator.test.ts` | zod-schema's (contact, login, occasion-input) inclusief coercion/voorwaarden |
| `test/occasion.test.ts` | slugify (incl. diakritiek, punten), uniqueSlug, image JSON roundtrip, prijs/km-formatters, `isRecentlyAdded` |
| `test/auth.test.ts` | bcrypt roundtrip + uniek zout; JWT sign/verify, geknoei, verval |
| `test/whatsapp.test.ts` | `buildWhatsAppLink`: cijfers uit nummer halen, bericht URL-encoden |
| `test/db.test.ts` | CRUD + unique-constraints + publicatie-filter tegen een tijdelijke SQLite (Prisma CLI `db push`) |
| `test/*` | totaal 40 tests groen; seed is idempotent (upsert incl. `images` op bestaande demo-rows) |

---

## Deploy (VPS met Docker)

1. Bestanden naar de VPS kopiëren (`ml-auto/`), daar `.env` aanmaken.
2. `docker compose up -d --build`.
3. Eerste keer: `.env` met `ML_AUTO_SEED=1` zetten (maakt admin-account + demo-occasions); daarna op `0`.
4. Later: `docker compose build && docker compose up -d` na een nieuwe commit.
5. Poort 3000 achter nginx/Caddy met TLS; zet `X-Forwarded-For` (gebruikt door de login-ratelimit).

De container start met: `prisma migrate deploy` → optioneel seed → `next start`. Uploads + database leven in het Docker-volume `mlauto-data` (`/app/data`).

> ⚠️ De Docker-build is geschreven maar nog niet tegen een echte Dockerdaemon getest (geen Docker op de dev-machine). Dat is het eerste verificatiepunt op de VPS.

---

## [Klaar voor de klant?]

- [x] Publieke pagina's (home, over ons, diensten, occasions incl. detail, contactformulier)
- [x] WhatsApp-knop op de contactpagina (`wa.me` met vooringevuld bericht)
- [x] Admin: login, dashboard, occasions aanmaken/bewerken/verwijderen, status publicatie, berichten-inbox (nieuw → afgehandeld → heropenen → verwijderen)
- [x] Foto-upload met preview en prullenbak (vóór opslaan), max 10 afbeeldingen
- [x] Beveiliging: JWT-cookie, admin-guards op alle admin-routes/acties/API, login-ratelimit, invoervalidatie, path-traversal-guard
- [x] Tests groen (44), typecheck/lint/build zonder fouten
- [x] Deploy-bestanden (Dockerfile, compose, entrypoint)
- [ ] E-mailnotificatie écht verzonden (klant vult SMTP-waarden in en test)
- [ ] E2E-check in een echte browser (inloggen, occasion aanmaken met foto's) op de VPS
- [ ] Beeldmateriaal van de demo-occasions zijn Commons-voorbeelden (CC BY-SA/CC BY). Klant kan eigen foto's leveren via de admin (upload) en deze vervangen.

---

## [ORPHANS & PENDING]

- Docker-build lokaal niet geverifieerd (geen Docker beschikbaar) → verifiëren op VPS, inclusief `migrate deploy` + volume.
- Server-action-inlog is niet headless te testen (Nederlandse vormformulieren vereisen JS, `$ACTION_REF` wordt client-side opgelost); browser-E2E op de VPS is nog open.
- SMTP-velden zijn leeg in de lokale `.env`; de notificatiecode is never-throwend, echte levering is ongetest.
- De 3 demo-occasions dragen nu Commons-voorbeeldfoto's; klant kan deze in de admin vervangen door echte bedrijfsfoto's.
- `import "server-only"`-marker op `src/lib/server/*` is bewust niet toegevoegd (voorkomt import-padproblemen in seed/tests); guard is een codeconventie.

## [BUIKPUNTEN & RISICO'S]

- In-memory ratelimit: gedeeld per Node-proces; meerdere replica's delen hem niet (irrelevant voor één VPS-instantie).
- ratelimit steunt op `x-forwarded-for`; als een reverse proxy die header niet zet, telt iedereen als `local`.
- bcrypt cost 12 (~0,5 s/poging): bewust traag, beschermt het account; voelt niet merkbaar bij één login.
- SQLite: deze opzet is single-writer-vriendelijk; geen gelijktijdige meerdere replicas schrijven.
- Next 16 + Turbopack: `npm ci` en `prisma generate` eisen `"allowScripts"` in package.json (npm ≥ 11-beleid); al aanwezig.

## Beslissingsregister (mede door klant bevestigd)

1. **VPS/Docker-hosting** (geen Vercel) met SQLite op NVMe-volume.
2. **SQLite** via `@prisma/adapter-better-sqlite3` (geen losse DB-server).
3. **Lokale image-upload** (geen CDN/cloud) in `data/uploads`.
4. **E-mailnotificatie** bij contactberichten via nodemailer (genoemd "ja").
5. **Eén admin-account** inloggen met e-mail + wachtwoord; geen registratie.
6. **Geen Auth.js** (v5 beta): eigen, kleine JWT-laag (jose) — minder afhankelijkheden.
7. TypeScript **6.0.x** en Prisma **7 LTS**; geen TS 7.0.2 (Go-tooling-gaps) en geen Prisma 8 RC.