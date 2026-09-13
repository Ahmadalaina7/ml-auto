// Pure presentatie/parsing-hulpfuncties – geen data-afhankelijkheid.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

export function uniqueSlug(input: string, taken: (slug: string) => boolean): string {
  const base = slugify(input);
  let slug = base;
  let i = 1;
  while (taken(slug)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}

export function parseImages(imagesJson: string): string[] {
  return parseStringList(imagesJson);
}

export function jsonImages(images: string[]): string {
  return JSON.stringify(images.filter((v) => v.length > 0).slice(0, 10));
}

export function parseFeatures(featuresJson: string): string[] {
  return parseStringList(featuresJson);
}

export function jsonFeatures(features: string[]): string {
  return JSON.stringify(features.filter((v) => v.length > 0).slice(0, 30));
}

function parseStringList(json: string): string[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === "string" && v.length > 0)
      : [];
  } catch {
    return [];
  }
}

export function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

export function formatMonthly(monthlyCents: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(monthlyCents / 100);
}

export function formatKm(mileageKm: number): string {
  return `${new Intl.NumberFormat("nl-NL").format(Math.round(mileageKm / 1000) * 1000)} km`;
}

export function formatYearMonth(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export function isRecentlyAdded(
  createdAt: string | Date | null | undefined,
  withinDays = 21,
): boolean {
  if (!createdAt) return false;
  const then = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  if (Number.isNaN(then.getTime())) return false;
  const ageMs = Date.now() - then.getTime();
  return ageMs >= 0 && ageMs <= withinDays * 24 * 60 * 60 * 1000;
}