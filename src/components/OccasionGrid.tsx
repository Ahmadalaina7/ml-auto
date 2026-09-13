"use client";

import { useMemo, useState } from "react";
import { OccasionCard } from "@/components/OccasionCard";
import { OccasionFilterBar, type OccasionFilters } from "@/components/OccasionFilters";

type OccasionItem = {
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

export function OccasionGrid({ occasions }: { occasions: OccasionItem[] }) {
  const merken = useMemo(() => {
    return Array.from(new Set(occasions.map((o) => o.brand))).sort((a, b) => a.localeCompare(b, "nl"));
  }, [occasions]);

  const [filters, setFilters] = useState<OccasionFilters>({});

  const filtered = useMemo(() => {
    return occasions.filter((occ) => {
      if (filters.zoek) {
        const q = filters.zoek.toLowerCase();
        const haystack = `${occ.brand} ${occ.model} ${occ.variant} ${occ.title}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.merk && occ.brand !== filters.merk) return false;
      if (filters.brandstof && occ.fuel !== filters.brandstof) return false;
      if (filters.transmissie && occ.transmission !== filters.transmissie) return false;
      if (filters.carrosserie && occ.bodyType !== filters.carrosserie) return false;
      return true;
    });
  }, [occasions, filters]);

  return (
    <div>
      <OccasionFilterBar merken={merken} value={filters} onChange={setFilters} />

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {filtered.length === 1 ? "1 occasion gevonden" : `${filtered.length} occasions gevonden`}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((occ) => (
            <OccasionCard key={occ.slug} occasion={occ} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-brand/25 bg-sand p-12 text-center">
          <p className="font-display text-xl font-bold text-brand">Geen occasions gevonden</p>
          <p className="mt-2 text-sm text-muted">
            Probeer filters te verruimen of neem contact op. Wij zoeken graag met je mee.
          </p>
          <a
            href="tel:+31646830085"
            className="mt-4 inline-block rounded-md bg-accent px-6 py-2.5 font-black text-brand transition duration-fast hover:bg-accent-dark"
          >
            06 46 83 00 85
          </a>
        </div>
      )}
    </div>
  );
}