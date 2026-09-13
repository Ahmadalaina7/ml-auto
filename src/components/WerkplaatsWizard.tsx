"use client";

import { useActionState, useState } from "react";
import { APPOINTMENT_SERVICES, SERVICE_TIMESLOTS } from "@/lib/site";
import { submitAfspraakAction, type AfspraakFormState } from "@/actions/afspraak";

const inputClass =
  "w-full rounded-md border border-brand/20 bg-white px-3 py-2.5 text-sm text-ink outline-none transition duration-fast focus:border-accent focus:ring-2 focus:ring-accent";

const STEPS = [
  { title: "Dienst", label: "Kies wat we mogen doen" },
  { title: "Moment", label: "Kies het moment dat jou uitkomt" },
  { title: "Contact", label: "We bevestigen je afspraak snel" },
];

function todayString(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function WerkplaatsWizard() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string>(APPOINTMENT_SERVICES[0]);
  const [date, setDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>(SERVICE_TIMESLOTS[0]);
  const [state, formAction, pending] = useActionState<AfspraakFormState, FormData>(
    submitAfspraakAction,
    null,
  );

  const canNext =
    step === 0
      ? service.length > 0
      : step === 1
        ? date.length > 0 && timeSlot.length > 0
        : true;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stappenindicator */}
      <ol className="flex items-center gap-2" aria-label="Stappen">
        {STEPS.map((s, index) => (
          <li key={s.title} className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
            <span
              className={`h-1.5 w-full rounded-full transition duration-fast ${
                index <= step ? "bg-accent" : "bg-brand/15"
              }`}
            />
            <span
              className={`truncate text-xs font-semibold ${
                index === step ? "text-brand" : "text-muted"
              }`}
            >
              {index + 1}. {s.title}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-xl border border-surface bg-white p-6 shadow-1 sm:p-8">
        <h2 className="font-display text-xl font-bold text-brand">{STEPS[step].label}</h2>

        {state?.success ? (
          <div className="mt-6 rounded-xl border border-strong/30 bg-strong/10 p-6">
            <p className="font-display text-lg font-bold text-brand">Afspraak aangevraagd</p>
            <p className="mt-2 text-sm text-ink">
              Bedankt! We bevestigen je werkplaatsafspraak zo snel mogelijk via e-mail of
              telefoon. Tijdens openingsuren meestal binnen een uur.
            </p>
          </div>
        ) : (
          <form action={formAction} className="mt-6">
            {step === 0 && (
              <fieldset className="space-y-3">
                <legend className="sr-only">Werkzaamheden</legend>
                {APPOINTMENT_SERVICES.map((value) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-2 px-4 py-3 text-sm font-semibold transition duration-fast ${
                      service === value
                        ? "border-accent bg-accent/5 text-brand"
                        : "border-surface text-ink hover:border-brand/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceRadio"
                      value={value}
                      checked={service === value}
                      onChange={() => setService(value)}
                      className="sr-only"
                    />
                    <span>{value}</span>
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        service === value ? "border-accent bg-accent text-brand" : "border-brand/25"
                      }`}
                    >
                      {service === value && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  </label>
                ))}
              </fieldset>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="w-date" className="mb-1.5 block text-sm font-semibold text-ink">
                    Datum
                  </label>
                  <input
                    id="w-date"
                    type="date"
                    name="date"
                    value={date}
                    min={todayString()}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
                <fieldset>
                  <legend className="mb-1.5 block text-sm font-semibold text-ink">Tijdstip</legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {SERVICE_TIMESLOTS.map((slot) => (
                      <label
                        key={slot}
                        className={`cursor-pointer rounded-lg border-2 px-3 py-2 text-center text-sm font-semibold transition duration-fast ${
                          timeSlot === slot
                            ? "border-accent bg-accent/5 text-brand"
                            : "border-surface text-ink hover:border-brand/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeSlot"
                          value={slot}
                          checked={timeSlot === slot}
                          onChange={() => setTimeSlot(slot)}
                          className="sr-only"
                        />
                        {slot} uur
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="w-name" className="mb-1.5 block text-sm font-semibold text-ink">
                      Naam
                    </label>
                    <input id="w-name" name="name" type="text" required minLength={2} placeholder="Voor- en achternaam" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="w-phone" className="mb-1.5 block text-sm font-semibold text-ink">
                      Telefoonnummer
                    </label>
                    <input id="w-phone" name="phone" type="tel" required maxLength={30} placeholder="06……" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="w-email" className="mb-1.5 block text-sm font-semibold text-ink">
                    E-mailadres
                  </label>
                  <input id="w-email" name="email" type="email" required placeholder="naam@voorbeeld.nl" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="w-notes" className="mb-1.5 block text-sm font-semibold text-ink">
                    Opmerkingen <span className="font-normal text-muted">(optioneel)</span>
                  </label>
                  <textarea
                    id="w-notes"
                    name="notes"
                    rows={3}
                    maxLength={2000}
                    placeholder="Kenteken, specifieke klacht of vragen…"
                    className={inputClass}
                  />
                </div>
                <input type="hidden" name="service" value={service} />
                <input type="hidden" name="date" value={date} />
                <input type="hidden" name="timeSlot" value={timeSlot} />
              </div>
            )}

            {state?.error && (
              <p role="alert" className="mt-4 rounded-md border border-error-border bg-error-soft px-4 py-3 text-sm text-error">
                {state.error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-md border border-brand px-5 py-2.5 font-black text-brand transition duration-fast hover:bg-brand hover:text-white"
                >
                  Terug
                </button>
              ) : (
                <span />
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext}
                  className="ml-auto rounded-md bg-brand px-6 py-2.5 font-black text-white transition duration-fast hover:bg-brand-2 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Volgende stap
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={pending}
                  className="ml-auto rounded-md bg-accent px-6 py-2.5 font-black text-brand transition duration-fast hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {pending ? "Versturen…" : "Afspraak bevestigen"}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}