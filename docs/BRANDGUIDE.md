# MLAuto — Brandguide en design system (v3)

> Status: **actief** · Domein: volledige publieke site `/` en beheer-UI `/admin` · Basis:
> "Thuis in Zeeland, bij de weg naar je volgende auto." — gebouwd met dezelfde
> functionele kern als een moderne dealer-site (AutoPoppe), maar met een volledig
> eigen visuele identiteit neergezet vanaf nul.

Deze brandguide is de éne bron van waarheid voor merk, kleur, typografie, vormtaal,
tone of voice, componenten en kwaliteitsprocedures van MLAuto. Wijzigingen aan het
design **moeten** hier gespiegeld worden; broncode volgt deze tokens.

---

## 1. Merk & positionering

**Merklijn:** *Thuis in Zeeland, bij de weg naar je volgende auto.*
**Belofte:** occasionverkoop, eerlijke inkoop, online taxatie en een eigen werkplaats —
alles op één adres in Middelburg (Voltaweg 21, 4338 PS), zonder poespas.

### 1.1 Waar staan we voor
- **Eerlijk & duidelijk** — biedingen zonder kleine lettertjes, offertes vooraf.
- **Alles onder één dak** — van aankoop tot onderhoud blijf je bij ons.
- **Lokaal geworteld** — je spreekt geen callcenter, maar de mensen die je auto kennen.

### 1.2 Persoonlijkheid
Kort, direct, zelfverzekerd, zakelijk-nabij. We zeggen **je**, nooit **u** in de
marketingboodschap ("je praat met iemand, niet tegen een klant"), behalve in strikt
formele contexten. Geen superlatieven zonder bewijs ("beste van Zeeland" is verboden),
geen angst-urgency ("nog maar 2 beschikbaar!"), geen verzonnen social proof.

---

## 2. Kleurpalet

Gebruik uitsluitend semantische tokens (Tailwind utilities zoals `text-brand`,
`bg-accent`). Rauwe hex-waarden buiten `@theme inline` in `globals.css` zijn verboden.

| Token | Waarde | Rol |
|---|---|---|
| `brand` | `#001E50` | Meridiaan-blauw — primaire merkkleur, koppen, containerranden |
| `brand-2` | `#0B2A6B` | Meridiaan-blauw licht — hover van `brand`-oppervlakken |
| `brand-dark` | `#000000` | IJszwart — `surface.base`, secties op donker, hero/header/footer |
| `accent` | `#FF9233` | Seinoranje — **enige** CTA-kleur, badges, route-lijn, focus op donker |
| `accent-dark` | `#DF7413` | Seinoranje donker — hover van `accent`-acties |
| `strong` | `#56C8A4` | Deltawater teal — bevestiging/info (surface.strong), successtatussen |
| `strong-dark` | `#33A185` | Deltawater teal donker — hover van `strong`-vlakken |
| `sand` | `#F4F1EA` | Duinzand — warm licht canvas voor kaarten/alternerende secties |
| `surface` | `#F5F5F5` | Mistgrijs — neutraal bordervlak/statuslijnen |
| `ink` | `#141A45` | Primaire leestekst op lichte oppervlakten |
| `muted` | `#3A4470` | Secundaire tekst (≥4.5:1 op wit en sand) |
| `faint` | `#5D6773` | Tertiaire tekst, alleen voor niet-essentiële info |
| `success` | `#15803D` | Functioneel: succesvolle controle, bevestigingsberichten |
| `success-soft/-border` | `#F0FDF4` / `#BBF7D0` | Succesmelding-achtergrond/-rand |
| `error` | `#B91C1C` | Functioneel: fouten |
| `error-soft/-border` | `#FEF2F2` / `#FECACA` | Foutmelding-achtergrond/-rand |
| `whatsapp` | `#25D366` | WhatsApp-herkenning (iconen, kanalen) |

### 2.1 Compositieregels
- **Accent** alleen voor echte handelingen (knoppen, doorkliklinks, badges) en kleine
  labels — nooit als volledige sectie-achtergrond.
- Tekst **op** accent is altijd `text-brand` (navy `#001E50`) voor voldoende contrast;
  witte tekst op accent is verboden.
- Op donkere secties (`bg-brand-dark`, `bg-brand`): tekst wit (`text-white`), accent is
  dan de kleur van de knoppen.
- **Deltawater (strong)** voor bevestigingen, "Net binnen"-badges en info-blokken; nooit
  voor primaire acties.
- **Duinzand (sand)** als afwisselend canvas (homepage-dienstensectie, kaarten); witte
  secties blijven het dominante canvas.
- Maximaal één dominante actie per viewport; opbouw in hiërarchie: accent > brand > neutral.

---

## 3. Typografie — Mukta Mahee

Lettertype: **Mukta Mahee** via `next/font/google`, subsets `latin`,
`variable: --font-mukta`, gewichten `200/400/600/700/800`.

| Token | Waarde | Gebruik |
|---|---|---|
| `--font-sans` | `var(--font-mukta)` | alles (basissans) |
| `.font-display` | `var(--font-mukta)` | logo, H1–H2, kaarttitels, tel-nummers, kerncijfers |
| `font-size.body` | `18px` / `line-height: 24px` | standaard-paraagrafen |
| `font-weight.body` | `200` (`--font-base-wght`) | rustige, luchtige doorstroomtekst |
| `font-size.lg` | `26px` | subkoppen / telefonische CTA's |
| `font-size.xl–4xl` | `28/44/56/62px` | sectiekoppen → hero H1 |
| letter-spacing | `tracking-tight` (koppen), `tracking-[0.2–0.28em]` (kickers) | |

### 3.1 Regels
- Regelbreedte alinea **max** 65 tekens (in praktijk `max-w-prose`-niveau).
- Koppen in `font-black` (800), zelden onder 700 op lichte ondergrond voor contrast.
- Kickers (kleine labels boven koppen) altijd `uppercase tracking-[0.28em] text-accent font-black`.
- Display-tekst nooit dunner dan `font-semibold` op witte achtergrond.
- Standaardweergave van totale prijzen: `formatPrice()` (nl-NL, hele euro's),
  maandprijzen via `formatMonthly()`, km via `formatKm()` (afgerond op 1.000).

---

## 4. Vormtaal — "Route"

Het signatuurelement van MLAuto is **de oranje stippellijn met pijl**, een verwijzing
naar de weg én de Zeeuwse vuurtoren/boei.

### 4.1 Route-lijn (`.route-line`)
- Eén klasse `.route-line` op de element-container (kopblokken): 3px hoge, ronde,
  oranje gestippelde lijn (`radial-gradient`, spacing 14px) vóór de titel.
- Variant `.route-animate::before` laat de lijn subtiel "rijden" (alleen wanneer
  `prefers-reduced-motion` het toestaat); optioneel, gebruik spaarzaam.

### 4.2 Pijlen
- Pijlen (→) wijzen altijd naar de volgende stap of een doorkliklink.
- Gebruik het unicode-teken `→` in links/CTA's; geen emoji-pijlen als decoratie.
- Richting is functioneel: "Alle occasions →", "Afspraak maken →".

---

## 5. Componenten

### 5.1 Knoppen & links-als-knop
- **Primair:** `bg-accent text-brand font-black rounded-md px-7 py-3`; hover
  `hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-2` (400ms).
- **Secundair:** `bg-brand text-white`; hover `hover:bg-brand-2`.
- **Tertiair:** `border border-brand text-brand`; hover `hover:bg-brand hover:text-white`.
- Focus-visible: globale ring `outline: 2px solid brand; offset 2px`; binnen `.on-dark`
  wit. Nooit `outline-none` zonder alternatieve ring.
- Miniatuur-target ≥44×44px voor touch (knoppen conform WCAG 2.2 Target Size).
- Staten: loading toont "…" tekstvariant (`pending`), disabled `disabled:opacity-40`.
- **Op donkere secties:** de accentknop blijft de enige opvallende actie;
  secundair wordt `border border-white/40 text-white hover:bg-white/10`.

### 5.2 Logo ("M-blok")
- Vorm: 8×8 (36px), `rounded-md`, `bg-accent`, letter **M** (`text-brand`,
  `font-display font-black`); ernaast `ML` in `brand` (licht: brand) of
  `ML` + woordschrift `Auto` in accent.
- Op donker de variant met wit; de oranje M-blok **mag nooit** van kleur veranderen.
- Gebruik: header links, footer, admin-header.

### 5.3 Header (SiteHeader)
- Sticky `bg-brand-dark/95 backdrop-blur-md`, witte tekst, `h-16`.
- Nav: `NAV_LINKS` uit `src/lib/site.ts`; normale items `text-white/80 hover:text-white`.
- Mobiel: hamburger met `aria-expanded` + `aria-controls`, paneel `#mobile-nav`,
  CTA-knop onderaan ("Bekijk voorraad").

### 5.4 Footer (SiteFooter)
- Donker (`bg-brand-dark`), 3 kolommen: brand/tekst, navigatie (2-klomngrid), contact.
- Onderaan `© {jaar} MLAuto – Middelburg · Thuis in Zeeland`.
- Contactadres hardgecodeerd = Voltaweg 21, 4338 PS Middelburg (synchron met `SITE`).

### 5.5 WhatsApp FAB (WhatsAppButton)
- `fixed bottom-5 right-5 z-50`, cirkel `rounded-full`, `bg-whatsapp` of accent met
  WhatsApp-glyph, `aria-label="Stel een vraag via WhatsApp"`.
- href via `buildWhatsAppLink(SITE.phone, SITE.whatsappMessage)`; `target="_blank"`
  `rel="noopener noreferrer"`.
- Target ≥44×44px; pagina reserveren `pb-24`-achtige ruimte onderaan zodat de FAB geen
  inhoud bedekt; één FAB per viewport.

### 5.6 StatusBadge
- Badges: `Net binnen` → `bg-strong text-brand`; `Uitgelicht` → `bg-accent text-brand`;
  `Nieuw` → `bg-accent text-brand` (inbox); andere statussen `bg-surface text-muted`.
- Radius `rounded-full`, `text-xs font-black/semibold px-2.5 py-0.5`.
- "Net binnen" alleen als `isRecentlyAdded(createdAt, 21)` waar is — nooit handmatig.

### 5.7 OccasionCard
- Eén kaart = één `Link`; `rounded-xl border border-surface bg-white shadow-1`;
  hover `-translate-y-0.5 shadow-2` (400ms).
- Media: `h-48 object-cover`, `group-hover:scale-105` binnen `overflow-hidden`.
  Ontbrekende afbeelding → fallback `/images/showroom.jpg`.
- Content: kicker (jaar · brandstof · transmissie), titel (`font-display text-lg font-bold`),
  km, "Vanafprijs per maand" (`formatMonthly`) + totale prijs (`formatPrice`).
- Fallback bij geen-afbeelding en lange titels: `line-clamp` waar combineerbaar.

### 5.8 OccasionFilterBar / OccasionGrid
- Filterbalk: zoekveld + selects (merk/brandstof/transmissie/carrosserie) vanuit
  de echte dataset (`merken` afgeleid uit occasions).
- Resultaat-aankondiging `aria-live="polite"` ("N occasions gevonden").
- Lege staat: uitleg + telefoonnummer als fallback; nooit een dode lege pagina.

### 5.9 Wizards (WerkplaatsWizard, TaxatieWizard)
- Multi-step met stappenindicator: 3 gelijke segmenten (actieve/afgewerkte = accent).
- "Volgende stap" disabled tot de stap volledig en valide is; "Terug" = vorige stap.
- Server-actie via `useActionState`; fout `role="alert"`-blok bij servererror;
  success-blok na indienen met concrete vervolgbelofte ("binnen één werkdag").
- Verplichte velden conform `validator.ts` (afspraakSchema / taxatieSchema).

### 5.10 Formulieren (ContactForm)
- Labels zichtbaar (nooit placeholder-only); inputs `rounded-md border-brand/20`,
  focus `focus:border-accent focus:ring-2 focus:ring-accent`.
- Verplichte velden + server-zod spiegeling; success-blok met "Bericht verzonden".
- Onderwerp als `<select>` (5 standaardonderwerpen + Overig).

### 5.11 Admin-UI (/admin)
- Beheersectie eigen visueel: doorlopend donkere header (AdminNav) met actieve
  route-accentlijn, witte `(panel)`-secties; overig voldoet aan dezelfde tokens.
- Inboxen: `StatusBadge` per item, acties via `ConfirmForm` (verwijderen met
  `window.confirm`). Afspraak-status via select met auto-submit.

---

## 6. Motion

| Token | Waarde | Gebruik |
|---|---|---|
| `--duration-instant` | 300 ms | pop-in chips, micro-interacties |
| `--duration-fast` | 400 ms | hover-lifts, reveals, transitions |
| ken-burns | 26 s `ease-out` | hero-zoom (`.hero-zoom`) |
| rise | 400 ms `cubic-bezier(0.16,1,0.3,1)` | hero-entree (`.rise`, delays 120/240/360ms) |
| scroll-reveal | 400 ms + IO | `.reveal`/`Reveal.tsx` |

### 6.1 Regels
- Alleen `transform`/`opacity` animeren (GPU-vriendelijk).
- Scroll-reveal via `IntersectionObserver` + `is-visible`; `disconnect()` na zichtbaar;
  herstart nooit.
- `Reveal` gebruikt `as="div|section|article|li"` + `delay`-stagger ≤160ms per stap.
- **Reduced motion:** alles uit via `prefers-reduced-motion: reduce`-blok in
  `globals.css` (reveal wordt direct zichtbaar, transitions op 0s).
- Paginatransities via View Transitions API: `.page-enter`/`.page-exit`, header-anker
  `mla-header`, `::view-transition` zonder pointer-events.

---

## 7. Formulieren & data (server-validatie)

- Schemas in `src/lib/validator.ts` (zod v4): `loginSchema`, `contactSchema`,
  `occasionInputSchema`, `actieInputSchema`, `afspraakSchema`, `taxatieSchema`.
- Formulier-AI's: `src/actions/*.ts` (server actions, `requireAdmin` voor handlers).
- Input-schoning: client `required/minLength/maxLength` spiegelt zod.
- Rate limiting: `isRateLimited(kind:ip, 5, 60_000)` per formulierkanaal.

---

## 8. Toegankelijkheid (WCAG 2.2 AA)

- Skip-link "Direct naar inhoud" (`#main`) in root layout.
- Focus-visible ring overal; donker-context witte ring (`.on-dark`).
- Contrast: tekst ≥4.5:1; accent-tekst op wit alleen `accent-dark` (>4.5:1).
- Labels gekoppeld (`htmlFor`); foutmeldingen tekst + `role="alert"`, nooit kleur-only.
- Targets ≥24px, aanbevolen ≥44px (FAB/knoppen).
- Unieke `title`/metadata per pagina + één H1; `main#main`, `footer`, `nav` semantiek.
- Toetsbare routes: `/`, `/occasions`, `/occasions/[slug]`, `/contact`, `/werkplaats`,
  `/taxatie`, `/acties`, `/diensten`, `/over-ons`, `/brandguide`.

---

## 9. Content & tone

| Doen | Niet doen |
|---|---|
| Kort en zakelijk Nederlands, concrete cijfers | Vakjargon, "dé #1", superlatieven zonder bewijs |
| Elke claim onderbouwd ("meestal binnen één werkdag") | Verzonnen staten/social proof |
| Tel & WhatsApp als klikbare links, identiek over pagina's | "Klik hier" / "Lees verder" als label |
| Werkwoord-CTA's ("Bekijk voorraad", "Plan werkplaatsafspraak") | Ambigue CTA-labels |
| CTA's altijd vergezeld van telefonisch/WhatsApp-vervanger | Dooie eindpagina's zonder vervolgoptie |

---

## 10. Kwaliteitsprocedures

Per release/blok: `npm run lint` en `npm run typecheck` zonder fouten,
`npm run test` (baseline 44) groen, `npm run build` succesvol.
Daarna handmatige aXe-scan op de publieke routes (0 critical/serious), tab-route
(skip-link → nav → main → CTA's → footer), reduced-motion-emulatie en mobiel 360px
(zonder horizontale scroll; FAB botst niet).

---

## 11. Bestanden waar deze richtlijnen leven

- `src/app/globals.css` — tokens + basis + circatractie
- `src/app/layout.tsx` — lettertype + metadata
- `src/lib/site.ts` — SITE-config, NAV_LINKS, SERVICES, keuzelijsten
- `src/lib/{format,finance,occasion}.ts` — presentatie-hulpfuncties (prijzen, km, slugs)
- `src/components/*` — componenten voldoen aan deze brandguide
- `/brandguide` — publieke, interactieve weergave van deze documentatie