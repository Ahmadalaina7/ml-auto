import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met MLAuto in Middelburg: telefonisch, via WhatsApp, mail of het contactformulier.",
};

export default function ContactPage() {
  const waHref = buildWhatsAppLink(SITE.phone, SITE.whatsappMessage);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-muted" aria-label="Kruimelpad">
        <Link href="/" className="transition duration-fast hover:text-ink hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Contact</span>
      </nav>

      <header className="route-line mt-4 max-w-2xl">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Contact</p>
        <h1 className="mt-1 font-display text-2xl font-black tracking-tight text-brand sm:text-3xl">
          We horen graag van je
        </h1>
        <p className="mt-3 text-muted">
          Een vraag over een occasion, een werkplaatsafspraak of de verkoop van je auto?
          Bel, app of mail ons. We reageren snel en duidelijk.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ContactForm />

        <aside className="space-y-6">
          <div className="rounded-xl border border-surface bg-white p-6 shadow-1">
            <h2 className="font-display text-lg font-bold text-brand">Direct contact</h2>
            <div className="mt-4 space-y-4">
              <a href={`tel:${SITE.phone}`} className="group block rounded-lg border border-surface p-4 transition duration-fast hover:border-accent hover:shadow-2">
                <span className="block text-xs font-black uppercase tracking-[0.2em] text-muted">Bellen</span>
                <span className="mt-1 block font-display text-lg font-black text-brand group-hover:text-accent">{SITE.phoneDisplay}</span>
              </a>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="group block rounded-lg border border-surface p-4 transition duration-fast hover:border-whatsapp hover:shadow-2">
                <span className="block text-xs font-black uppercase tracking-[0.2em] text-muted">WhatsApp</span>
                <span className="mt-1 block font-display text-lg font-black text-brand group-hover:text-whatsapp">{SITE.phoneDisplay}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="group block rounded-lg border border-surface p-4 transition duration-fast hover:border-accent hover:shadow-2">
                <span className="block text-xs font-black uppercase tracking-[0.2em] text-muted">Mail</span>
                <span className="mt-1 block font-display text-lg font-black text-brand group-hover:text-accent">{SITE.email}</span>
              </a>
            </div>
          </div>

          <div className="rounded-xl bg-brand-dark p-6 text-white shadow-2">
            <h2 className="font-display text-lg font-bold">Openingstijden</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {SITE.hours.map((h) => (
                <li key={h.day} className="flex justify-between border-b border-white/10 pb-2">
                  <span>{h.day}</span>
                  <span className="font-semibold text-white">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-surface bg-sand p-6">
            <h2 className="font-display text-lg font-bold text-brand">Adres</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              {SITE.address.street}
              <br />
              {SITE.address.zip} {SITE.address.city}
            </p>
            <p className="mt-4 text-sm text-muted">
              Voldoende parkeergelegenheid direct voor de deur.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}