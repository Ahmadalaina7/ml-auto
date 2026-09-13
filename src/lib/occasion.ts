// Occasion-domein: re-export van format-helpers + occasionspecifieke logica.

export {
  slugify,
  uniqueSlug,
  parseImages,
  jsonImages,
  parseFeatures,
  jsonFeatures,
  formatPrice,
  formatMonthly,
  formatKm,
  formatYearMonth,
  isRecentlyAdded,
} from "./format";

export function occasionTitle(occ: { brand: string; model: string; variant?: string }): string {
  return [occ.brand, occ.model, occ.variant].filter(Boolean).join(" ");
}

/** Korte technische samenvatting voor kaarten, bv. "2021 · 48.500 km · Automaat". */
export function occasionMeta(occ: {
  year: number;
  mileageKm: number;
  transmission: string;
  fuel: string;
}): string {
  return `${occ.year} · ${occ.fuel} · ${occ.transmission}`;
}