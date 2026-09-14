import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES, SITE } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Inkoop en verkoop, onderhoud en APK, schadeherstel, spuitwerk, import en export. De diensten van MLAuto's in Middelburg.",
};

export default function DienstenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="route-line">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Onze diensten</p>
        <h1 className="mt-1 max-w-3xl font-display text-2xl font-black tracking-tight text-brand sm:text-3xl">
          Alles onder één dak in Middelburg
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Van inkoop en verkoop tot onderhoud, schadeherstel, spuitwerk en import/export.
          Duidelijk advies en snelle afhandeling.
        </p>
      </header>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <Reveal key={service.slug} delay={(index % 3) * 80}>
            <article className="flex h-full flex-col rounded-xl border border-surface bg-white p-6 shadow-1 transition duration-fast hover:-translate-y-0.5 hover:shadow-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand text-white">
                <ServiceIcon slug={service.slug} />
              </div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.2em] text-accent">{service.price}</p>
              <h2 className="mt-2 font-display text-lg font-bold text-brand">{service.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">{service.description}</p>
              <Link
                href={service.href}
                className="mt-5 inline-block font-black text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline"
              >
                {service.cta}
              </Link>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="mt-14 rounded-xl bg-brand-dark p-6 text-white shadow-2 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold">Vragen over onze diensten?</h2>
            <p className="mt-2 text-sm text-white/75">
              Plan een werkplaatsafspraak of bel ons direct. Wij denken graag met je mee.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:justify-end">
            <Link
              href="/werkplaats"
              className="rounded-md bg-accent px-6 py-3 text-center font-black text-white transition duration-fast hover:bg-accent-dark"
            >
              Plan werkplaatsafspraak
            </Link>
            <a
              href={`tel:${SITE.phone}`}
              className="rounded-md border border-white/40 px-6 py-3 text-center font-black text-white transition duration-fast hover:bg-white/10"
            >
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
