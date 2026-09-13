import type { Metadata } from "next";
import Link from "next/link";
import { getPrisma } from "@/lib/server/db";
import { OccasionGrid } from "@/components/OccasionGrid";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Occasions",
  description: "Bekijk het actuele occasionaanbod van MLAuto in Middelburg. Jonge occasions, rijk uitgerust en scherp geprijsd.",
};

export const dynamic = "force-dynamic";

export default async function OccasionsPage() {
  const occasions = await getPrisma().occasion.findMany({
    where: { status: "Published" },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    select: {
      slug: true,
      title: true,
      brand: true,
      model: true,
      variant: true,
      year: true,
      mileageKm: true,
      fuel: true,
      transmission: true,
      bodyType: true,
      priceCents: true,
      monthlyFromCents: true,
      images: true,
      featured: true,
      createdAt: true,
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-muted" aria-label="Kruimelpad">
        <Link href="/" className="transition duration-fast hover:text-ink hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Occasions</span>
      </nav>

      <header className="route-line mt-4">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Occasions</p>
        <h1 className="mt-1 max-w-2xl font-display text-2xl font-black tracking-tight text-brand sm:text-3xl">
          Jonge occasions bij MLAuto in Middelburg
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Alle auto&apos;s zijn rijklaar, hebben een volledige historie en komen uit
          onze eigen voorraad. Zo weet je precies waar je aan toe bent.
        </p>
      </header>

      <div className="mt-8">
        <OccasionGrid occasions={occasions} />
      </div>

      <section className="mt-14 rounded-xl bg-brand-dark p-6 text-white shadow-2 sm:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold">Zoek je een specifieke auto?</h2>
            <p className="mt-2 text-sm text-white/75">
              Die geven we je graag. Laat ons weten wat je zoekt, dan houden we je op de
              hoogte zodra er iets passends binnenkomt.
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
