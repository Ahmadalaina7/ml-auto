import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Brandguide",
  description: "De complete merkrichtlijnen van MLAuto: kleuren, typografie, vormtaal en tone of voice.",
};

const KLEUREN: Array<{ naam: string; token: string; hex: string; css: string }> = [
  { naam: "Meridiaan-blauw · brand", token: "--color-brand", hex: "#001E50", css: "#001e50" },
  { naam: "Meridiaan-blauw licht · brand-2", token: "--color-brand-2", hex: "#0B2A6B", css: "#0b2a6b" },
  { naam: "IJszwart · brand-dark", token: "--color-brand-dark", hex: "#000000", css: "#000000" },
  { naam: "Seinoranje · accent", token: "--color-accent", hex: "#FF9233", css: "#ff9233" },
  { naam: "Seinoranje donker · accent-dark", token: "--color-accent-dark", hex: "#DF7413", css: "#df7413" },
  { naam: "Deltawater · strong", token: "--color-strong", hex: "#56C8A4", css: "#56c8a4" },
  { naam: "Deltawater donker · strong-dark", token: "--color-strong-dark", hex: "#33A185", css: "#33a185" },
  { naam: "Duinzand · sand", token: "--color-sand", hex: "#F4F1EA", css: "#f4f1ea" },
  { naam: "Mistgrijs · surface", token: "--color-surface", hex: "#F5F5F5", css: "#f5f5f5" },
  { naam: "Inkt · ink", token: "--color-ink", hex: "#141A45", css: "#141a45" },
  { naam: "Gedempt · muted", token: "--color-muted", hex: "#3A4470", css: "#3a4470" },
  { naam: "Vervagend · faint", token: "--color-faint", hex: "#5D6773", css: "#5d6773" },
];

const TEKENREEKSEN = ["0123456789", "Aa Bb Cc Dd Ee", "€ 29.950 (incl. btw)"];

export default function BrandguidePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-muted" aria-label="Kruimelpad">
        <Link href="/" className="transition duration-fast hover:text-ink hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Brandguide</span>
      </nav>

      <header className="route-line mt-4 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Brandguide</p>
        <h1 className="mt-1 font-display text-2xl font-black tracking-tight text-brand sm:text-3xl">
          De identiteit van MLAuto, precies gedocumenteerd
        </h1>
        <p className="mt-3 text-muted">
          Eén merklijn: <span className="font-black text-ink">“Thuis in Zeeland, bij de weg naar je volgende auto.”</span>{" "}
          Alles wat we maken volgt dezelfde vorm- en kleurtaal, zodat elke pagina onmiskenbaar van ons is.
        </p>
      </header>

      <section className="mt-12">
        <Reveal className="route-line max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Gebruik</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-brand">Woorden & toon</h2>
        </Reveal>
        <Reveal className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-surface bg-white p-6 shadow-1">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-muted">Wel</p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink">
              <li className="flex gap-2"><span className="font-black text-strong">✓</span> Kort en zakelijk Nederlands, zonder vakjargon.</li>
              <li className="flex gap-2"><span className="font-black text-strong">✓</span> We zeggen “uw” nooit. Je praat met iemand, niet tegen een klant.</li>
              <li className="flex gap-2"><span className="font-black text-strong">✓</span> Concrete cijfers: prijzen “vanaf”, tijden, adressen.</li>
              <li className="flex gap-2"><span className="font-black text-strong">✓</span> Zeeuws referentiekader: “thuis in Zeeland”, “vanuit Middelburg”.</li>
              <li className="flex gap-2"><span className="font-black text-strong">✓</span> Een belofte onderbouwen: “meestal binnen één werkdag”.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-surface bg-white p-6 shadow-1">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-muted">Niet</p>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink">
              <li className="flex gap-2"><span className="font-black text-error">✕</span> Overdrijven: geen “ongekende prijzen” of “anders dan altijd”.</li>
              <li className="flex gap-2"><span className="font-black text-error">✕</span> Verplichte “u”-vormen en formele wij-vormen.</li>
              <li className="flex gap-2"><span className="font-black text-error">✕</span> Emoji als decoratie; alleen functionele symbolen (vinkje, pijl).</li>
              <li className="flex gap-2"><span className="font-black text-error">✕</span> Bang-bang-uitspraken over concurrenten.</li>
              <li className="flex gap-2"><span className="font-black text-error">✕</span> Engelse leenwoorden als het Nederlandse woord even goed is.</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="mt-14">
        <Reveal className="route-line max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Identiteit</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-brand">Logo & teken</h2>
        </Reveal>
        <Reveal className="mt-6 space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="on-dark flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl bg-brand-dark p-8 shadow-1">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-display text-lg font-black text-brand">M</span>
                <span className="font-display text-2xl font-black tracking-tight text-white">MLAUTO</span>
              </div>
              <p className="text-xs text-white/60">Thuis in Zeeland</p>
            </div>
            <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-surface bg-white p-8 shadow-1">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand font-display text-lg font-black text-white">M</span>
                <span className="font-display text-2xl font-black tracking-tight text-brand">MLAUTO</span>
              </div>
              <p className="text-xs text-muted">Thuis in Zeeland</p>
            </div>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            Op donkere ondergronden volstaat het wit-blauwe logo; op lichte ondergronden de
            blauwe variant. De oranje “M”-blok is het herkenbare accent en mag nooit van kleur
            veranderen.
          </p>
        </Reveal>
      </section>

      <section className="mt-14">
        <Reveal className="route-line max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Palet</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-brand">Kleuren</h2>
        </Reveal>
        <Reveal className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KLEUREN.map((k) => (
            <div key={k.token} className="overflow-hidden rounded-xl border border-surface bg-white shadow-1">
              <div className="h-24" style={{ background: k.css }} />
              <div className="p-4">
                <p className="text-sm font-black text-brand">{k.naam}</p>
                <p className="mt-1 text-xs text-muted">{k.token}</p>
                <p className="mt-1 text-xs font-semibold text-ink">{k.hex}</p>
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-8 max-w-3xl rounded-xl border border-surface bg-white p-6 shadow-1">
          <h3 className="font-display text-lg font-bold text-brand">Regels</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            <li><span className="font-black text-brand">Accent:</span> alleen voor echte handelingen (knoppen, links op actielijnen) en kleine badge-achtige labels, nooit voor hele achtergronden van secties.</li>
            <li><span className="font-black text-brand">Op donker:</span> merk-blauw of ijszwart voor secties; tekst wordt wit, accent kleurt dan de knoppen.</li>
            <li><span className="font-black text-brand">Deltawater (strong):</span> bevestigingen, succesmeldingen en neutrale info-badges.</li>
            <li><span className="font-black text-brand">Duinzand (sand):</span> het “warme” canvas voor kaarten en ter ondersteuning van witte secties.</li>
            <li><span className="font-black text-brand">Ink & gedempt:</span> alle hoofdtekst is ink; muted is voor secundaire teksten; faint alleen voor kleine voetnoten.</li>
          </ul>
        </Reveal>
      </section>

      <section className="mt-14">
        <Reveal className="route-line max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Typografie</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-brand">Mukta Mahee</h2>
        </Reveal>
        <Reveal className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-surface bg-white p-6 shadow-1">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-muted">Titels · font-display</p>
            <p className="mt-3 font-display text-4xl font-black text-brand">De weg naar</p>
            <p className="font-display text-2xl font-black text-brand">je volgende auto</p>
            <div className="mt-6 border-t border-surface pt-4">
              <p className="text-xs text-muted">Gewichten: 200 (basis) · 400 · 600 · 700 · 800 (kop hoogte)</p>
            </div>
          </div>
          <div className="rounded-xl border border-surface bg-white p-6 shadow-1">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-muted">Lopende tekst · text-base (18/24)</p>
            <p className="mt-3 text-base text-ink">
              Standaardtekst draait op gewicht 200 voor een rustige, luchtige pagina. De
              standaardgrootte is 18px op een regelhoogte van 24px, genoeg om lange teksten
              prettig leesbaar te houden op elk scherm.
            </p>
            {TEKENREEKSEN.map((t) => (
              <p key={t} className="mt-4 border-t border-surface pt-3 font-display text-2xl font-black text-brand">
                {t}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-14">
        <Reveal className="route-line max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Vormtaal</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-brand">Route-lijn & pijlen</h2>
        </Reveal>
        <Reveal className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-surface bg-white p-6 shadow-1">
            <div className="route-line h-10" />
            <p className="mt-3 text-sm font-black text-brand">De stippellijn met pijl</p>
            <p className="mt-1 text-sm text-muted">
              Het handtekening-element van de site: een oranje stippellijn boven
              sectietitels: een verwijzing naar de weg én de vuurtorenboei.
            </p>
          </div>
          <div className="rounded-xl border border-surface bg-white p-6 shadow-1">
            <div className="flex h-10 items-center justify-center gap-3 text-4xl text-accent">
              <span aria-hidden="true">→</span>
              <span aria-hidden="true">➜</span>
            </div>
            <p className="mt-3 text-sm font-black text-brand">Richting & doorgaan</p>
            <p className="mt-1 text-sm text-muted">
              Pijlen wijzen altijd naar de volgende stap. Gebruik “→” om door te bladeren,
              nooit een emoji-pijl als decoratie.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mt-14">
        <Reveal className="route-line max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Componenten</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-brand">Knop & status</h2>
        </Reveal>
        <Reveal className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button type="button" className="rounded-md bg-accent px-7 py-3 font-black text-brand transition duration-fast hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-2">
                Primaire actie
              </button>
              <button type="button" className="rounded-md bg-brand px-7 py-3 font-black text-white transition duration-fast hover:bg-brand-2">
                Secundair
              </button>
              <button type="button" className="rounded-md border border-brand px-7 py-3 font-black text-brand transition duration-fast hover:bg-brand hover:text-white">
                Tertiair
              </button>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Primaire acties zijn altijd seinoranje met donkerblauwe tekst. Na een klik of op
              touch volgt zweeffeedback met een subtiele verticale beweging (400ms).
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-strong px-2.5 py-0.5 text-xs font-black text-brand">Net binnen</span>
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-black text-brand">Uitgelicht</span>
              <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-black text-white">Nieuw</span>
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-black text-red-700">Verkocht</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Statusbadges hebben een afgeronde vorm, mogen op elke achtergrond en volgen de
              kleuren van het palet: deltawater = nieuw/deel van de stroom, seinoranje = actie
              of uitgelicht.
            </p>
          </div>
        </Reveal>
      </section>

      <footer className="mt-16 rounded-xl bg-brand-dark p-6 text-sm text-white/70">
        <p>
          Brandguide v2, onderdeel van het MLAuto design system. Zie ook{" "}
          <Link href="/" className="font-black text-accent underline-offset-4 hover:underline">
            de homepage
          </Link>{" "}
          en <span className="text-white">docs/BRANDGUIDE.md</span> voor de volledige specificatie.
        </p>
      </footer>
    </div>
  );
}