import type { Metadata } from "next";
import Link from "next/link";
import { WerkplaatsWizard } from "@/components/WerkplaatsWizard";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Werkplaatsafspraak maken",
  description: "Plan online een werkplaatsafspraak bij MLAuto in Middelburg. Kies werkzaamheden, datum en tijdstip.",
};

export default function WerkplaatsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-muted" aria-label="Kruimelpad">
        <Link href="/" className="transition duration-fast hover:text-ink hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/diensten" className="transition duration-fast hover:text-ink hover:underline">Diensten</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Werkplaatsafspraak</span>
      </nav>

      <header className="route-line mt-4 max-w-2xl">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Werkplaats</p>
        <h1 className="mt-1 font-display text-2xl font-black tracking-tight text-brand sm:text-3xl">
          Plan online je werkplaatsafspraak
        </h1>
        <p className="mt-3 text-muted">
          Kies je werkzaamheden, een dag en een tijdstip. Binnen openingsuren bevestigen we
          je afspraak meestal binnen een uur.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <WerkplaatsWizard />

        <aside className="space-y-6">
          <div className="rounded-xl border border-surface bg-white p-6 shadow-1">
            <h2 className="font-display text-lg font-bold text-brand">Liever direct regelen?</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink">
              <li>
                <a href={`tel:${SITE.phone}`} className="font-black text-brand transition duration-fast hover:text-accent">
                  {SITE.phoneDisplay}
                </a>
                <span className="block text-muted">telefonisch reserveren</span>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="font-black text-brand transition duration-fast hover:text-accent">
                  {SITE.email}
                </a>
                <span className="block text-muted">e-mail of aanvraagformulier</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-brand-dark p-6 text-white shadow-2">
            <h2 className="font-display text-lg font-bold">Openingstijden werkplaats</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {SITE.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-3 border-b border-white/10 pb-2 last:border-0 last:pb-0">
                  <span>{h.day}</span>
                  <span className="shrink-0 font-semibold text-white">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-surface bg-sand p-6">
            <h2 className="font-display text-lg font-bold text-brand">APK?</h2>
            <p className="mt-2 text-sm text-muted">
              APK-keuring in onze eigen werkplaats. Komt er iets uit de keuring? Dan ontvang
              je eerst altijd een vrijblijvende offerte.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
