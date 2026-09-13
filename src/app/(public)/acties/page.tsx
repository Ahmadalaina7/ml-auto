import type { Metadata } from "next";
import Link from "next/link";
import { getPrisma } from "@/lib/server/db";
import { Reveal } from "@/components/Reveal";
import { formatYearMonth } from "@/lib/occasion";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acties",
  description: "Bekijk de actuele acties en aanbiedingen van MLAuto in Middelburg.",
};

export default async function ActiesPage() {
  const acties = await getPrisma().actie.findMany({
    where: { status: "Published", startsAt: { lte: new Date() } },
    orderBy: [{ featured: "desc" }, { startsAt: "desc" }],
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-muted" aria-label="Kruimelpad">
        <Link href="/" className="transition duration-fast hover:text-ink hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Acties</span>
      </nav>

      <header className="route-line mt-4">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Acties & promoties</p>
        <h1 className="mt-1 max-w-3xl font-display text-2xl font-black tracking-tight text-brand sm:text-3xl">
          Profiteer van onze actuele aanbiedingen
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Van prijsvoordelen tot voordelige financiering. Acties zijn beperkt beschikbaar.
        </p>
      </header>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        {acties.map((actie, index) => (
          <Reveal key={actie.id} delay={(index % 2) * 100}>
            <article className="flex h-full flex-col overflow-hidden rounded-xl border border-surface bg-white shadow-1 transition duration-fast hover:-translate-y-0.5 hover:shadow-2">
              {actie.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={actie.image} alt={actie.title} className="h-48 w-full object-cover" />
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-3">
                  {actie.badge && (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-black text-brand">
                      {actie.badge}
                    </span>
                  )}
                  <span className="text-xs text-muted">Geldig t/m {formatYearMonth(actie.endsAt ?? actie.startsAt)}</span>
                </div>
                <h2 className="mt-3 font-display text-lg font-bold text-brand">{actie.title}</h2>
                <p className="mt-2 text-sm text-muted">{actie.summary}</p>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink">{actie.body}</p>
                <div className="mt-6 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                  <a
                    href={`tel:${SITE.phone}`}
                    className="rounded-md bg-accent px-5 py-2.5 text-center font-black text-brand transition duration-fast hover:bg-accent-dark"
                  >
                    {SITE.phoneDisplay}
                  </a>
                  <Link
                    href="/occasions"
                    className="rounded-md border border-brand px-5 py-2.5 text-center font-black text-brand transition duration-fast hover:bg-brand hover:text-white"
                  >
                    Bekijk occasions
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
        {acties.length === 0 && (
          <p className="col-span-full rounded-xl border border-dashed border-brand/25 bg-sand p-12 text-center text-muted">
            Er zijn op dit moment geen acties. Kijk binnenkort weer op deze pagina.
          </p>
        )}
      </section>
    </div>
  );
}
