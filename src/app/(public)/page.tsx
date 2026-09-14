import Link from "next/link";
import type { Metadata } from "next";
import { getPrisma } from "@/lib/server/db";
import { OccasionCard } from "@/components/OccasionCard";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { SERVICES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Occasionverkoop, inkoop en onderhoud in Middelburg",
  description:
    "MLAuto's in Middelburg: jonge occasions, eerlijke inkoop, online taxatie en een eigen werkplaats. Midden in Zeeland.",
};

export default async function HomePage() {
  const db = getPrisma();

  const [featuredOccasions, acties, services] = await Promise.all([
    db.occasion.findMany({
      where: { status: "Published" },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 6,
    }),
    db.actie.findMany({
      where: {
        status: "Published",
        startsAt: { lte: new Date() },
        OR: [{ endsAt: null }, { endsAt: { gte: new Date() } }],
      },
      orderBy: { featured: "desc" },
      take: 2,
    }),
    Promise.resolve(SERVICES),
  ]);

  return (
    <>
      {/* Hero — garagefoto + logo-kleuren (zwart/rood/wit) */}
      <section className="relative min-h-[70vh] overflow-hidden sm:min-h-[78vh]">
        <div
          className="hero-zoom absolute inset-0 bg-cover bg-[center_42%]"
          style={{ backgroundImage: "url(/images/garage.jpg)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand from-0% via-brand/85 via-40% to-transparent to-75%"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-center px-4 py-20 sm:min-h-[78vh] sm:px-6 sm:py-28 lg:py-32">
          <div className="max-w-xl sm:max-w-2xl">
            <p className="rise inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-sm font-black uppercase tracking-[0.28em] text-accent">
              Thuis in Zeeland
            </p>
            <h1 className="rise mt-4 font-display text-2xl font-black leading-[1.08] tracking-tight text-white sm:text-3xl lg:text-4xl">
              Jouw volgende auto vind je hier.{" "}
              <span className="text-accent">Helder en betrouwbaar.</span>
            </h1>
            <p className="rise mt-5 text-base leading-relaxed text-white/80 sm:text-lg" style={{ animationDelay: "200ms" }}>
              Goed onderhouden occasions, eerlijke inruil en een eigen werkplaats.
              Op één adres in Middelburg.
            </p>
            <div className="rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: "300ms" }}>
              <Link
                href="/occasions"
                className="rounded-md bg-accent px-6 py-2.5 text-sm font-black text-white transition duration-fast hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-2 sm:text-base"
              >
                Bekijk occasions
              </Link>
              <Link
                href="/taxatie"
                className="rounded-md border border-white/35 bg-white/5 px-6 py-2.5 text-sm font-black text-white transition duration-fast hover:border-accent hover:text-accent sm:text-base"
              >
                Start gratis taxatie
              </Link>
              <a
                href={`tel:${SITE.phone}`}
                className="hidden items-center gap-2 text-white/75 transition duration-fast hover:text-accent sm:inline-flex"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span className="text-sm font-black">{SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Karakteristiek */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="grid gap-6 sm:grid-cols-3">
            {[
              { k: "Lokale expertise", t: "Autobedrijf met eigen werkplaats en APK-keuring, midden in Middelburg." },
              { k: "Eerlijke inkoop", t: "Direct een bod op je inruil. Duidelijk, zonder verplichtingen en zonder verrassingen." },
              { k: "Bij je in de buurt", t: "Voltaweg 21 in Middelburg, met een werkplaats die jouw auto kent." },
            ].map((item) => (
              <div key={item.k} className="rounded-xl border border-surface bg-sand p-6 transition duration-fast hover:border-brand/20 hover:shadow-1">
                <p className="font-display text-xl font-black text-brand sm:text-2xl">{item.k}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.t}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Occasions */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="route-line flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Occasions</p>
              <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-brand sm:text-3xl lg:text-4xl">
                Jonge occasions, goed onderhouden
              </h2>
            </div>
            <Link
              href="/occasions"
              className="font-black text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline"
            >
              Alle occasions →
            </Link>
          </Reveal>

          <Reveal className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredOccasions.map((occ) => (
              <OccasionCard key={occ.id} occasion={occ} />
            ))}
            {featuredOccasions.length === 0 && (
              <p className="col-span-full rounded-xl border border-dashed border-brand/25 bg-sand p-10 text-center text-muted">
                De voorraad wordt binnenkort aangevuld. Kom snel terug of bel {SITE.phoneDisplay}.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* Diensten */}
      <section className="bg-sand py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="route-line">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Onze diensten</p>
            <h2 className="mt-1 max-w-2xl font-display text-2xl font-black tracking-tight text-brand sm:text-3xl lg:text-4xl">
              Van inkoop tot export, alles onder één dak
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Inkoop en verkoop, onderhoud en APK, schadeherstel, spuitwerk en import/export — dichtbij in Middelburg.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              return (
                <Reveal key={service.slug} delay={(index % 3) * 80}>
                  <Link
                    href={service.href}
                    className="block h-full rounded-xl border border-brand/10 bg-white p-6 shadow-1 transition duration-fast hover:-translate-y-0.5 hover:shadow-2"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand text-white">
                      <ServiceIcon slug={service.slug} />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-brand">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                    <p className="mt-4 text-sm font-black text-accent">{service.price}</p>
                    <p className="mt-3 text-sm font-black text-brand">{service.cta}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-8 text-center">
            <Link
              href="/werkplaats"
              className="inline-block rounded-md bg-brand px-6 py-2.5 text-sm font-black text-white transition duration-fast hover:-translate-y-0.5 hover:bg-brand-2 hover:shadow-2 sm:text-base"
            >
              Plan een werkplaatsafspraak
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Acties */}
      {acties.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="route-line flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Acties</p>
                <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-brand sm:text-3xl lg:text-4xl">
                  Profiteer nu van onze aanbiedingen
                </h2>
              </div>
              <Link
                href="/acties"
                className="font-black text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline"
              >
                Alle acties →
              </Link>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {acties.map((actie) => {
                const cover = actie.image || "/images/showroom.jpg";
                return (
                  <Reveal key={actie.id}>
                    <Link href="/acties" className="block h-full overflow-hidden rounded-xl border border-surface bg-sand shadow-1 transition duration-fast hover:-translate-y-0.5 hover:shadow-2">
                      {actie.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cover} alt={actie.title} className="h-44 w-full object-cover" />
                      )}
                      <div className="p-6">
                        {actie.badge && (
                          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-black text-white">
                            {actie.badge}
                          </span>
                        )}
                        <h3 className="mt-3 font-display text-lg font-bold text-brand">{actie.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{actie.summary}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Taxatie CTA — luxe zwart + goud */}
      <section className="bg-brand py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Online taxatie</p>
              <h2 className="mt-1 font-display text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                Wat is jouw auto nog waard?
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
                In 3 stappen een eerlijk, vrijblijvend inruilvoorstel. Je krijgt antwoord via
                {" "}{SITE.phoneDisplay} of e-mail, meestal binnen één werkdag.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-white/85">
                <li className="flex items-center gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-black text-white">1</span> Gegevens invullen (merk, model, km-stand, staat)</li>
                <li className="flex items-center gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-black text-white">2</span> Wij beoordelen en berekenen de marktwaarde</li>
                <li className="flex items-center gap-3"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-black text-white">3</span> Je ontvangt ons voorstel per mail of telefoon</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <Link
                href="/taxatie"
                className="w-full rounded-md bg-accent px-6 py-2.5 text-center text-sm font-black text-white transition duration-fast hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-2 md:w-auto sm:text-base"
              >
                Start gratis taxatie
              </Link>
              <p className="text-center text-sm text-white/70 md:text-right">
                Gratis · vrijblijvend · antwoord binnen één werkdag
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Openingstijden */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="rounded-xl border border-surface bg-sand p-6 shadow-1 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="font-display text-xl font-bold text-brand sm:text-2xl">Wij zijn voor je klaar</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {SITE.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4 border-b border-brand/10 pb-2">
                      <span>{h.day}</span>
                      <span className="font-semibold text-ink">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center gap-2 md:items-end md:text-right">
                <a href={`tel:${SITE.phone}`} className="font-display text-2xl font-black text-brand transition duration-fast hover:text-accent sm:text-3xl">
                  {SITE.phoneDisplay}
                </a>
                <a href={`mailto:${SITE.email}`} className="font-black text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline">
                  {SITE.email}
                </a>
                <p className="mt-2 text-sm text-muted">
                  {SITE.address.street} · {SITE.address.zip} {SITE.address.city}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
