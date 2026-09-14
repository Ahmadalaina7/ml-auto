/* eslint-disable @next/next/no-img-element -- upload- en demo-paden; next/image-optimalisatie is niet nodig. */
import Link from "next/link";
import { formatKm, formatMonthly, formatPrice, isRecentlyAdded, parseImages } from "@/lib/occasion";
import { FINANCE_DISCLAIMER, occasionMonthlyCents } from "@/lib/finance";

type CardOccasion = {
  slug: string;
  title: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  mileageKm: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  priceCents: number;
  monthlyFromCents: number;
  images: string;
  featured: boolean;
  createdAt: Date;
};

export function OccasionCard({ occasion }: { occasion: CardOccasion }) {
  const images = parseImages(occasion.images);
  const cover = images[0] ?? "/images/showroom.jpg";
  const recent = isRecentlyAdded(occasion.createdAt);
  const monthly = occasionMonthlyCents(occasion.priceCents, occasion.monthlyFromCents);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-surface bg-white shadow-1 transition duration-fast hover:-translate-y-0.5 hover:shadow-2">
      <Link href={`/occasions/${occasion.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white">
        <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden bg-sand">
          <img
            src={cover}
            alt={`${occasion.brand} ${occasion.model}${occasion.variant ? ` ${occasion.variant}` : ""} (${occasion.year})`}
            className="h-full w-full object-cover transition duration-fast group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {recent && (
              <span className="rounded-full bg-strong px-2.5 py-0.5 text-xs font-semibold text-brand">
                Net binnen
              </span>
            )}
            {occasion.featured && (
              <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-black text-white">
                Uitgelicht
              </span>
            )}
          </div>
          <span className="absolute bottom-3 right-3 rounded-md bg-brand-dark/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {occasion.bodyType || occasion.fuel}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {occasion.year} · {occasion.fuel} · {occasion.transmission}
          </p>
          <h3 className="mt-1 font-display text-lg sm:text-xl font-bold leading-tight text-brand line-clamp-2">
            {occasion.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{formatKm(occasion.mileageKm)}</p>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-muted">Vanafprijs per maand</p>
              <p className="text-lg sm:text-xl font-black text-brand">{formatMonthly(monthly)}/mnd</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted">Totaal</p>
              <p className="text-xl sm:text-2xl font-black text-brand">{formatPrice(occasion.priceCents)}</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-snug text-faint">{FINANCE_DISCLAIMER}</p>
        </div>
      </Link>
    </article>
  );
}