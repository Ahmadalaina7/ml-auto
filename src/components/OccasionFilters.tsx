"use client";

import { useState } from "react";
import { BODY_TYPES, FUELS, TRANSMISSIONS } from "@/lib/site";

export type OccasionFilters = {
  merk?: string;
  brandstof?: string;
  transmissie?: string;
  carrosserie?: string;
  zoek?: string;
};

const inputClass =
  "w-full rounded-md border border-brand/20 bg-white px-3 py-2 text-sm text-ink outline-none transition duration-fast focus:border-accent focus:ring-2 focus:ring-accent";

export function OccasionFilterBar({
  merken,
  value,
  onChange,
}: {
  merken: string[];
  value: OccasionFilters;
  onChange: (next: OccasionFilters) => void;
}) {
  return (
    <div className="rounded-xl border border-surface bg-white p-4 shadow-1">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2 lg:col-span-2">
          <label htmlFor="f-zoek" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Zoeken
          </label>
          <input
            id="f-zoek"
            type="search"
            placeholder="Merk, model of uitvoering…"
            value={value.zoek ?? ""}
            onChange={(e) => onChange({ ...value, zoek: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="f-merk" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Merk
          </label>
          <select
            id="f-merk"
            value={value.merk ?? ""}
            onChange={(e) => onChange({ ...value, merk: e.target.value })}
            className={inputClass}
          >
            <option value="">Alle merken</option>
            {merken.map((merk) => (
              <option key={merk} value={merk}>{merk}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-brandstof" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Brandstof
          </label>
          <select
            id="f-brandstof"
            value={value.brandstof ?? ""}
            onChange={(e) => onChange({ ...value, brandstof: e.target.value })}
            className={inputClass}
          >
            <option value="">Alle</option>
            {FUELS.map((fuel) => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-transmissie" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Transmissie
          </label>
          <select
            id="f-transmissie"
            value={value.transmissie ?? ""}
            onChange={(e) => onChange({ ...value, transmissie: e.target.value })}
            className={inputClass}
          >
            <option value="">Alle</option>
            {TRANSMISSIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-carrosserie" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
            Carrosserie
          </label>
          <select
            id="f-carrosserie"
            value={value.carrosserie ?? ""}
            onChange={(e) => onChange({ ...value, carrosserie: e.target.value })}
            className={inputClass}
          >
            <option value="">Alle</option>
            {BODY_TYPES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export { BODY_TYPES, FUELS, TRANSMISSIONS };

export function useFilters(initial: OccasionFilters) {
  const [filters, setFilters] = useState<OccasionFilters>(initial);
  return [filters, setFilters] as const;
}