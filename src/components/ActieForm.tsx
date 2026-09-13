"use client";

import { useActionState } from "react";
import type { ActieFormState } from "@/actions/actie";

const inputClass =
  "w-full rounded-md border border-brand/20 bg-white px-3 py-2 text-sm text-ink outline-none transition duration-fast focus:border-accent focus:ring-2 focus:ring-accent";

function dateForInput(date: Date | null): string {
  if (!date) return "";
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

type Props = {
  action: (prev: ActieFormState, formData: FormData) => Promise<ActieFormState>;
  initial?: {
    id?: number;
    title?: string;
    badge?: string;
    summary?: string;
    body?: string;
    image?: string;
    featured?: boolean;
    status?: string;
    startsAt?: Date;
    endsAt?: Date | null;
  };
};

export function ActieForm({ action, initial }: Props) {
  const [state, formAction, pending] = useActionState<ActieFormState, FormData>(action, null);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="id" value={initial?.id ?? ""} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="a-title" className="mb-1.5 block text-sm font-semibold text-ink">Titel</label>
          <input id="a-title" name="title" type="text" required defaultValue={initial?.title ?? ""} placeholder="Zomeractie op APK" className={inputClass} />
        </div>
        <div>
          <label htmlFor="a-badge" className="mb-1.5 block text-sm font-semibold text-ink">Badge (kort label)</label>
          <input id="a-badge" name="badge" type="text" defaultValue={initial?.badge ?? ""} placeholder="T/m augustus" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="a-summary" className="mb-1.5 block text-sm font-semibold text-ink">Samenvatting</label>
        <input id="a-summary" name="summary" type="text" required defaultValue={initial?.summary ?? ""} placeholder="Korte teaser die op de kaart verschijnt" className={inputClass} />
      </div>

      <div>
        <label htmlFor="a-body" className="mb-1.5 block text-sm font-semibold text-ink">Actietekst (volledig)</label>
        <textarea id="a-body" name="body" rows={6} required minLength={20} defaultValue={initial?.body ?? ""} placeholder="Volledige uitleg van de actie, condities, geldigheid…" className={inputClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="a-start" className="mb-1.5 block text-sm font-semibold text-ink">Geldig vanaf</label>
          <input id="a-start" name="startsAt" type="date" required defaultValue={dateForInput(initial?.startsAt ?? new Date())} className={inputClass} />
        </div>
        <div>
          <label htmlFor="a-end" className="mb-1.5 block text-sm font-semibold text-ink">Geldig t/m (optioneel)</label>
          <input id="a-end" name="endsAt" type="date" defaultValue={dateForInput(initial?.endsAt ?? null)} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="a-image" className="mb-1.5 block text-sm font-semibold text-ink">Afbeelding (optioneel)</label>
          <input id="a-image" name="image" type="text" defaultValue={initial?.image ?? ""} placeholder="/uploads/actie.jpg" className={inputClass} />
        </div>
        <div>
          <label htmlFor="a-status" className="mb-1.5 block text-sm font-semibold text-ink">Status</label>
          <select id="a-status" name="status" defaultValue={initial?.status ?? "Draft"} className={inputClass}>
            <option value="Draft">Concept</option>
            <option value="Published">Gepubliceerd</option>
          </select>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
        <input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} className="h-4 w-4 accent-[--color-accent]" />
        Uitgelicht bovenaan (featured)
      </label>

      {state?.error && (
        <p className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}

      <div className="flex items-center justify-end gap-3">
        <a href="/admin/acties" className="rounded-md border border-brand px-5 py-2.5 font-black text-brand transition duration-fast hover:bg-brand hover:text-white">
          Annuleren
        </a>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-accent px-6 py-2.5 font-black text-brand transition duration-fast hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "Opslaan…" : initial?.id ? "Wijzigingen opslaan" : "Actie aanmaken"}
        </button>
      </div>
    </form>
  );
}