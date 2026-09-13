import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPrisma } from "@/lib/server/db";
import { Gallery } from "@/components/Gallery";
import { formatKm, formatMonthly, formatPrice, parseFeatures, parseImages } from "@/lib/occasion";
import { FINANCE_DISCLAIMER, occasionMonthlyCents, financeTermLabel } from "@/lib/finance";
import { SITE, SERVICES } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const occasions = await getPrisma().occasion.findMany({
    where: { status: "Published" },
    select: { slug: true },
  });
  return occasions.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const occasion = await getPrisma().occasion.findUnique({ where: { slug } });
  if (!occasion || occasion.status !== "Published") {
    return { title: "Occasion niet gevonden" };
  }
  const images = parseImages(occasion.images);
  const cover = images[0] ?? "/images/showroom.jpg";
  return {
    title: occasion.title,
    description: `${occasion.title} bij ${SITE.name} in Middelburg. ${formatKm(occasion.mileageKm)}, ${formatPrice(occasion.priceCents)}.`,
    openGraph: {
      title: occasion.title,
      description: occasion.description.slice(0, 160),
      images: [{ url: cover }],
    },
  };
}

export default async function OccasionDetailPage({ params }: Params) {
  const { slug } = await params;
  const occasion = await getPrisma().occasion.findUnique({ where: { slug } });

  if (!occasion || occasion.status !== "Published") {
    notFound();
  }

  const features = parseFeatures(occasion.features);
  const monthly = occasionMonthlyCents(occasion.priceCents, occasion.monthlyFromCents);
  const taxatieService = SERVICES.find((s) => s.slug === "inkoop");

  const specs: Array<[string, string]> = [
    ["Bouwjaar", String(occasion.year)],
    ["Kilometerstand", formatKm(occasion.mileageKm)],
    ["Brandstof", occasion.fuel],
    ["Transmissie", occasion.transmission],
    ["Vermogen", occasion.powerKw > 0 ? `${occasion.powerKw} kW` : "n.v.t."],
    ["Deuren", String(occasion.doors)],
    ["Carrosserie", occasion.bodyType || "n.v.t."],
    ["Kleur", occasion.color || "n.v.t."],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <Gallery images={occasion.images} />

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            {occasion.fuel} · {occasion.transmission}
          </p>
          <h1 className="mt-2 font-display text-2xl font-black leading-tight tracking-tight text-brand sm:text-3xl">
            {occasion.title}
          </h1>

          <div className="mt-5 grid grid-cols-2 gap-6 rounded-xl border border-surface bg-white p-6 shadow-1">
            <div>
              <p className="text-sm text-muted">Totaalprijs</p>
              <p className="mt-1 text-3xl font-black text-brand">{formatPrice(occasion.priceCents)}</p>
              <p className="mt-1 text-xs text-muted">inclusief btw</p>
            </div>
            <div>
              <p className="text-sm text-muted">Vanafprijs per maand</p>
              <p className="mt-1 text-3xl font-black text-accent">{formatMonthly(monthly)}</p>
              <p className="mt-1 text-xs text-muted">{financeTermLabel()}</p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-snug text-faint">{FINANCE_DISCLAIMER}</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${SITE.phone}`}
              className="rounded-md bg-accent px-6 py-3 text-center font-black text-brand transition duration-fast hover:bg-accent-dark"
            >
              Bel {SITE.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="rounded-md border border-brand px-6 py-3 text-center font-black text-brand transition duration-fast hover:bg-brand hover:text-white"
            >
              Vraag een proefrit aan
            </Link>
          </div>

          <div className="mt-6 rounded-xl bg-sand p-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-muted">Werkplaats & inkoop</p>
            <p className="mt-2 text-sm text-muted">
              Deze auto is door onze eigen werkplaats gecheckt en direct rijklaar.
              {taxatieService ? <> Overweeg je een inruil? Bekijk <Link href="/taxatie" className="font-black text-brand underline-offset-4 hover:text-accent hover:underline">online taxatie</Link>.</> : null}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="route-line font-display text-xl font-bold text-brand">Over deze auto</h2>
          <p className="mt-4 whitespace-pre-line leading-relaxed text-ink">{occasion.description}</p>
        </section>

        <section>
          <h2 className="route-line font-display text-xl font-bold text-brand">Specificaties</h2>
          <dl className="mt-4 overflow-hidden rounded-xl border border-surface bg-white shadow-1">
            {specs.map(([label, value], index) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-4 px-4 py-3 text-sm ${index % 2 === 0 ? "bg-sand/40" : ""}`}
              >
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {features.length > 0 && (
        <section className="mt-10">
          <h2 className="route-line font-display text-xl font-bold text-brand">Extra&apos;s & opties</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 rounded-md border border-surface bg-white px-4 py-3 text-sm text-ink shadow-1">
                <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-strong text-brand">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12 rounded-xl bg-brand-dark p-6 text-white shadow-2 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold">Zin in een proefrit?</h2>
            <p className="mt-2 text-sm text-white/75">
              Bel {SITE.phoneDisplay} of stuur een berichtje. We plannen graag een proefrit
              of sturen extra foto&apos;s en een filmpje van deze auto.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:justify-end">
            <a
              href={`tel:${SITE.phone}`}
              className="rounded-md bg-accent px-6 py-3 text-center font-black text-brand transition duration-fast hover:bg-accent-dark"
            >
              {SITE.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="rounded-md border border-white/40 px-6 py-3 text-center font-black text-white transition duration-fast hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
