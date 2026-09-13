import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Over ons",
  description: "Leer MLAuto in Middelburg kennen: een autobedrijf met verkoop, inkoop, taxatie en een eigen werkplaats.",
};

const WAARDEN = [
  {
    titel: "Eerlijk & duidelijk",
    tekst: "Biedingen zonder kleine lettertjes, offertes vooraf en een prijs die we ook zo zeggen.",
  },
  {
    titel: "Alles onder één dak",
    tekst: "Verkoop, inkoop, taxatie en onderhoud. Van aankoop tot de volgende beurt blijf je bij ons.",
  },
  {
    titel: "Lokaal geworteld",
    tekst: "Thuis in Zeeland. Je spreekt geen callcenter, maar de mensen die jouw auto kennen.",
  },
];

export default function OverOnsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="route-line max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Over ons</p>
        <h1 className="mt-1 font-display text-2xl font-black tracking-tight text-brand sm:text-3xl">
          MLAuto: occasions, onderhoud en inkoop op één adres in Middelburg
        </h1>
      </header>

      <Reveal className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-ink">
          <p>
            MLAuto combineert persoonlijke service met de snelheid van deze tijd.
            Geen overdreven beloftes, geen verborgen kosten: een degelijke auto
            tegen een reële prijs, met een werkplaats die er voor je is.
          </p>
          <p>
            Aan de Voltaweg in Middelburg verkopen we jonge, goed onderhouden occasions.
            Elke auto wordt vóór de verkoop grondig gecontroleerd door onze eigen monteurs,
            zodat je met vertrouwen de weg op gaat.
          </p>
          <p>
            Naast verkoop kopen we ook in. Je huidige auto kan direct worden ingeruild.
            Via de{" "}
            <Link href="/taxatie" className="font-black text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline">
              online taxatie
            </Link>{" "}
            weet je binnen een dag waar je aan toe bent.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl shadow-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/showroom.jpg" alt="De werkplaats en showroom van MLAuto" className="h-72 w-full object-cover" />
        </div>
      </Reveal>

      <section className="mt-14">
        <Reveal className="grid gap-5 md:grid-cols-3">
          {WAARDEN.map((w, index) => (
            <div key={w.titel} className="rounded-xl border border-surface bg-white p-6 shadow-1 transition duration-fast hover:shadow-2">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-brand">{w.titel}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{w.tekst}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="mt-14 rounded-xl bg-brand-dark p-6 text-white shadow-2 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold">Kennismaken?</h2>
            <p className="mt-2 text-sm text-white/75">
              Bezoek onze showroom aan de Voltaweg of plan een proefrit.
              We helpen je graag verder.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:justify-end">
            <Link
              href="/contact"
              className="rounded-md bg-accent px-6 py-3 text-center font-black text-brand transition duration-fast hover:bg-accent-dark"
            >
              Neem contact op
            </Link>
            <Link
              href="/occasions"
              className="rounded-md border border-white/40 px-6 py-3 text-center font-black text-white transition duration-fast hover:bg-white/10"
            >
              Bekijk occasions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
