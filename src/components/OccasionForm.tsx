"use client";

import { useActionState, useState } from "react";
import { BODY_TYPES, FUELS, OCCASION_STATUSES, TRANSMISSIONS } from "@/lib/site";
import type { OccasionFormState } from "@/actions/occasion";

const inputClass =
  "w-full rounded-md border border-brand/20 bg-white px-3 py-2 text-sm text-ink outline-none transition duration-fast focus:border-accent focus:ring-2 focus:ring-accent";

type Props = {
  action: (prev: OccasionFormState, formData: FormData) => Promise<OccasionFormState>;
  initial?: {
    id?: number;
    brand?: string;
    model?: string;
    variant?: string;
    bodyType?: string;
    title?: string;
    year?: number;
    mileageKm?: number;
    fuel?: string;
    transmission?: string;
    powerKw?: number;
    doors?: number;
    color?: string;
    priceEuros?: number;
    monthlyFromEuros?: number;
    description?: string;
    features?: string[];
    images?: string[];
    featured?: boolean;
    status?: string;
  };
};

export function OccasionForm({ action, initial }: Props) {
  const [state, formAction, pending] = useActionState<OccasionFormState, FormData>(action, null);
  const [features, setFeatures] = useState<string>(initial?.features?.join("\n") ?? "");
  const [images, setImages] = useState<string>(initial?.images?.join("\n") ?? "");

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="id" value={initial?.id ?? ""} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="o-brand" className="mb-1.5 block text-sm font-semibold text-ink">Merk</label>
          <input id="o-brand" name="brand" type="text" required defaultValue={initial?.brand ?? ""} placeholder="Volkswagen" className={inputClass} />
        </div>
        <div>
          <label htmlFor="o-model" className="mb-1.5 block text-sm font-semibold text-ink">Model</label>
          <input id="o-model" name="model" type="text" required defaultValue={initial?.model ?? ""} placeholder="Golf" className={inputClass} />
        </div>
        <div>
          <label htmlFor="o-variant" className="mb-1.5 block text-sm font-semibold text-ink">Uitvoering</label>
          <input id="o-variant" name="variant" type="text" defaultValue={initial?.variant ?? ""} placeholder="1.5 TSI Life" className={inputClass} />
        </div>
        <div>
          <label htmlFor="o-title" className="mb-1.5 block text-sm font-semibold text-ink">Advertentietitel</label>
          <input id="o-title" name="title" type="text" required defaultValue={initial?.title ?? ""} placeholder="Volkswagen Golf 1.5 TSI Life" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="o-year" className="mb-1.5 block text-sm font-semibold text-ink">Bouwjaar</label>
          <input id="o-year" name="year" type="number" required min={1900} max={2100} defaultValue={initial?.year ?? new Date().getFullYear()} className={inputClass} />
        </div>
        <div>
          <label htmlFor="o-km" className="mb-1.5 block text-sm font-semibold text-ink">Kilometerstand</label>
          <input id="o-km" name="mileageKm" type="number" required min={0} defaultValue={initial?.mileageKm ?? ""} placeholder="25000" className={inputClass} />
        </div>
        <div>
          <label htmlFor="o-bodytype" className="mb-1.5 block text-sm font-semibold text-ink">Carrosserie</label>
          <select id="o-bodytype" name="bodyType" defaultValue={initial?.bodyType ?? BODY_TYPES[0]} className={inputClass}>
            {BODY_TYPES.map((body) => (
              <option key={body} value={body}>{body}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="o-fuel" className="mb-1.5 block text-sm font-semibold text-ink">Brandstof</label>
          <select id="o-fuel" name="fuel" defaultValue={initial?.fuel ?? FUELS[0]} className={inputClass}>
            {FUELS.map((fuel) => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="o-transmission" className="mb-1.5 block text-sm font-semibold text-ink">Transmissie</label>
          <select id="o-transmission" name="transmission" defaultValue={initial?.transmission ?? TRANSMISSIONS[1]} className={inputClass}>
            {TRANSMISSIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="o-power" className="mb-1.5 block text-sm font-semibold text-ink">Vermogen (kW)</label>
          <input id="o-power" name="powerKw" type="number" min={0} defaultValue={initial?.powerKw ?? 0} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="o-doors" className="mb-1.5 block text-sm font-semibold text-ink">Aantal deuren</label>
          <input id="o-doors" name="doors" type="number" min={2} max={7} defaultValue={initial?.doors ?? 5} className={inputClass} />
        </div>
        <div>
          <label htmlFor="o-color" className="mb-1.5 block text-sm font-semibold text-ink">Kleur</label>
          <input id="o-color" name="color" type="text" defaultValue={initial?.color ?? ""} placeholder="Maanlichtblauw" className={inputClass} />
        </div>
        <div>
          <label htmlFor="o-status" className="mb-1.5 block text-sm font-semibold text-ink">Status</label>
          <select id="o-status" name="status" defaultValue={initial?.status ?? "Draft"} className={inputClass}>
            {OCCASION_STATUSES.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="o-price" className="mb-1.5 block text-sm font-semibold text-ink">Prijs (€)</label>
          <input id="o-price" name="price" type="number" step="0.01" min={0} required defaultValue={initial?.priceEuros ?? ""} placeholder="29950" className={inputClass} />
        </div>
        <div>
          <label htmlFor="o-monthly" className="mb-1.5 block text-sm font-semibold text-ink">Vanafprijs/mnd (€, optioneel)</label>
          <input id="o-monthly" name="monthlyFrom" type="number" step="0.01" min={0} defaultValue={initial?.monthlyFromEuros ?? 0} placeholder="0 = automatisch" className={inputClass} />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
            <input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} className="h-4 w-4 accent-[--color-accent]" />
            Uitgelicht (featured)
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="o-desc" className="mb-1.5 block text-sm font-semibold text-ink">Omschrijving</label>
        <textarea
          id="o-desc"
          name="description"
          rows={5}
          required
          minLength={10}
          defaultValue={initial?.description ?? ""}
          placeholder="Beschrijf de auto: staat, onderhoudshistorie, uitrusting, etc."
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="o-features" className="mb-1.5 block text-sm font-semibold text-ink">Extra&apos;s (één per regel)</label>
        <textarea
          id="o-features"
          name="featuresRaw"
          rows={4}
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          placeholder={"Airconditioning\nCruise control\nParkeersensoren"}
          className={inputClass}
        />
        {features.split("\n").filter((f) => f.trim().length > 0).map((feature) => (
          <input key={feature} type="hidden" name="features" value={feature} />
        ))}
      </div>

      <div>
        <label htmlFor="o-images" className="mb-1.5 block text-sm font-semibold text-ink">Afbeeldingen (één per regel: /uploads/… of URL)</label>
        <textarea
          id="o-images"
          name="imagesRaw"
          rows={4}
          value={images}
          onChange={(e) => setImages(e.target.value)}
          placeholder={"/images/golf.jpg"}
          className={inputClass}
        />
        {images.split("\n").filter((img) => img.trim().length > 0).map((img) => (
          <input key={img} type="hidden" name="images" value={img} />
        ))}
      </div>

      {state?.error && (
        <p className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}

      <div className="flex items-center justify-end gap-3">
        <a href="/admin/occasions" className="rounded-md border border-brand px-5 py-2.5 font-black text-brand transition duration-fast hover:bg-brand hover:text-white">
          Annuleren
        </a>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-accent px-6 py-2.5 font-black text-brand transition duration-fast hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "Opslaan…" : initial?.id ? "Wijzigingen opslaan" : "Occasion aanmaken"}
        </button>
      </div>
    </form>
  );
}