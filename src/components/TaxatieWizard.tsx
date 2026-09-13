"use client";

import { useState, type FormEvent } from "react";
import { FUELS, OCCASION_CONDITIONS, SITE } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const inputClass =
  "w-full rounded-md border border-brand/20 bg-white px-3 py-2.5 text-sm text-ink outline-none transition duration-fast focus:border-accent focus:ring-2 focus:ring-accent";

const STEPS = [
  { title: "Je auto", label: "Vertel iets over je auto" },
  { title: "Staat", label: "In welke staat verkeert je auto?" },
  { title: "Contact", label: "We sturen je voorstel snel" },
];

export function TaxatieWizard() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileageKm, setMileageKm] = useState("");
  const [fuel, setFuel] = useState<string>(FUELS[0]);
  const [condition, setCondition] = useState<string>(OCCASION_CONDITIONS[1]);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const canNext =
    step === 0
      ? brand.trim().length > 0 && model.trim().length > 0 && year.trim().length > 0
      : step === 1
        ? mileageKm.trim().length > 0 && condition.length > 0
        : name.trim().length > 1 && phone.trim().length > 0 && email.includes("@");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < 2) {
      setStep((s) => s + 1);
      return;
    }
    const body = [
      `Taxatie-aanvraag via de website`,
      ``,
      `Auto: ${brand} ${model} (${year})`,
      `Brandstof: ${fuel}`,
      `Km-stand: ${mileageKm}`,
      `Staat: ${condition}`,
      notes ? `Toelichting: ${notes}` : null,
      ``,
      `Naam: ${name}`,
      `Telefoon: ${phone}`,
      `E-mail: ${email}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(buildWhatsAppLink(SITE.whatsapp, body), "_blank", "noopener,noreferrer");
    setDone(true);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ol className="flex items-center gap-2" aria-label="Stappen">
        {STEPS.map((s, index) => (
          <li key={s.title} className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
            <span className={`h-1.5 w-full rounded-full transition duration-fast ${index <= step ? "bg-accent" : "bg-brand/15"}`} />
            <span className={`truncate text-xs font-semibold ${index === step ? "text-brand" : "text-muted"}`}>
              {index + 1}. {s.title}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-xl border border-surface bg-white p-6 shadow-1 sm:p-8">
        <h2 className="font-display text-xl font-bold text-brand">{STEPS[step].label}</h2>

        {done ? (
          <div className="mt-6 rounded-xl border border-strong/30 bg-strong/10 p-6">
            <p className="font-display text-lg font-bold text-brand">WhatsApp geopend</p>
            <p className="mt-2 text-sm text-ink">
              Stuur het bericht om je taxatie-aanvraag bij ons af te leveren. We reageren meestal binnen één werkdag.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6">
            {step === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="t-brand" className="mb-1.5 block text-sm font-semibold text-ink">Merk</label>
                  <input id="t-brand" value={brand} onChange={(e) => setBrand(e.target.value)} required placeholder="Bijv. Volkswagen" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="t-model" className="mb-1.5 block text-sm font-semibold text-ink">Model</label>
                  <input id="t-model" value={model} onChange={(e) => setModel(e.target.value)} required placeholder="Bijv. Golf" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="t-year" className="mb-1.5 block text-sm font-semibold text-ink">Bouwjaar</label>
                  <input id="t-year" type="number" min={1900} max={2100} value={year} onChange={(e) => setYear(e.target.value)} required placeholder="2019" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="t-fuel" className="mb-1.5 block text-sm font-semibold text-ink">Brandstof</label>
                  <select id="t-fuel" value={fuel} onChange={(e) => setFuel(e.target.value)} className={inputClass}>
                    {FUELS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="t-km" className="mb-1.5 block text-sm font-semibold text-ink">Kilometerstand</label>
                  <input id="t-km" type="number" min={0} value={mileageKm} onChange={(e) => setMileageKm(e.target.value)} required placeholder="125000" className={inputClass} />
                </div>
                <fieldset>
                  <legend className="mb-1.5 block text-sm font-semibold text-ink">Algehele staat</legend>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {OCCASION_CONDITIONS.map((c) => (
                      <label
                        key={c}
                        className={`cursor-pointer rounded-lg border-2 px-3 py-2.5 text-center text-sm font-semibold transition duration-fast ${
                          condition === c ? "border-accent bg-accent/5 text-brand" : "border-surface text-ink hover:border-brand/30"
                        }`}
                      >
                        <input type="radio" className="sr-only" checked={condition === c} onChange={() => setCondition(c)} />
                        {c}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="t-notes" className="mb-1.5 block text-sm font-semibold text-ink">
                    Toelichting <span className="font-normal text-muted">(optioneel)</span>
                  </label>
                  <textarea id="t-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="t-name" className="mb-1.5 block text-sm font-semibold text-ink">Naam</label>
                    <input id="t-name" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="t-phone" className="mb-1.5 block text-sm font-semibold text-ink">Telefoonnummer</label>
                    <input id="t-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="t-email" className="mb-1.5 block text-sm font-semibold text-ink">E-mailadres</label>
                  <input id="t-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
                </div>
                <div className="rounded-lg bg-sand px-4 py-3 text-sm text-muted">
                  Samenvatting: <span className="font-semibold text-ink">{brand} {model}</span> · {year} · {mileageKm || "?"} km · {fuel} · staat {condition.toLowerCase()}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              {step > 0 ? (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="rounded-md border border-brand px-5 py-2.5 font-black text-brand transition duration-fast hover:bg-brand hover:text-white">
                  Terug
                </button>
              ) : (
                <span />
              )}
              <button
                type="submit"
                disabled={!canNext}
                className="ml-auto rounded-md bg-accent px-6 py-2.5 font-black text-brand transition duration-fast hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step < 2 ? "Volgende stap" : "Voorstel via WhatsApp"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
