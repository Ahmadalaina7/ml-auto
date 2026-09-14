"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { APPOINTMENT_SERVICES, SERVICE_TIMESLOTS, SITE } from "@/lib/site";
import { openWhatsApp } from "@/lib/whatsapp";

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

function isSunday(isoDate: string): boolean {
  if (!isoDate) return false;
  const d = new Date(`${isoDate}T12:00:00`);
  return d.getDay() === 0;
}

export function WerkplaatsWizard() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [service, setService] = useState<string>(APPOINTMENT_SERVICES[0]);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<string>(SERVICE_TIMESLOTS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, done]);

  const sundaySelected = isSunday(date);
  const canNext =
    step === 0
      ? service.length > 0
      : step === 1
        ? date.length > 0 && timeSlot.length > 0 && !sundaySelected
        : name.trim().length > 1 && phone.trim().length > 0 && email.includes("@");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < 2) {
      setStep((s) => s + 1);
      return;
    }
    const body = [
      `Werkplaatsafspraak via de website`,
      ``,
      `Dienst: ${service}`,
      `Datum: ${date}`,
      `Tijd: ${timeSlot} uur`,
      notes ? `Opmerkingen: ${notes}` : null,
      ``,
      `Naam: ${name}`,
      `Telefoon: ${phone}`,
      `E-mail: ${email}`,
    ]
      .filter(Boolean)
      .join("\n");
    openWhatsApp(SITE.whatsapp, body);
    setDone(true);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ol className="flex items-center gap-2" aria-label="Stappen">
        {STEPS.map((s, index) => (
          <li key={s.title} className="flex min-w-0 flex-1 flex-col items-start gap-1.5" aria-current={index === step ? "step" : undefined}>
            <span className={`h-1.5 w-full rounded-full transition duration-fast ${index <= step ? "bg-accent" : "bg-brand/15"}`} />
            <span className={`truncate text-xs font-semibold ${index === step ? "text-brand" : "text-muted"}`}>
              {index + 1}. {s.title}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-xl border border-surface bg-white p-6 shadow-1 sm:p-8">
        <h2 ref={headingRef} tabIndex={-1} className="font-display text-xl font-bold text-brand outline-none">
          {STEPS[step].label}
        </h2>

        {done ? (
          <div className="mt-6 rounded-xl border border-strong/30 bg-strong/10 p-6">
            <p className="font-display text-lg font-bold text-brand">Doorgaan in WhatsApp</p>
            <p className="mt-2 text-sm text-ink">
              Stuur het vooraf ingevulde bericht om je afspraakaanvraag bij ons af te leveren. We bevestigen zo snel mogelijk.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6">
            {step === 0 && (
              <fieldset className="space-y-3">
                <legend className="sr-only">Werkzaamheden</legend>
                {APPOINTMENT_SERVICES.map((value) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-2 px-4 py-3 text-sm font-semibold transition duration-fast ${
                      service === value ? "border-accent bg-accent/10 text-brand" : "border-surface text-ink hover:border-brand/30"
                    }`}
                  >
                    <input type="radio" className="sr-only" checked={service === value} onChange={() => setService(value)} />
                    <span>{value}</span>
                  </label>
                ))}
              </fieldset>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="w-date" className="mb-1.5 block text-sm font-semibold text-ink">Datum</label>
                  <input
                    id="w-date"
                    type="date"
                    min={todayString()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className={inputClass}
                  />
                  {sundaySelected && (
                    <p className="mt-2 text-sm text-error" role="alert">
                      Op zondag is de werkplaats gesloten. Kies een andere dag.
                    </p>
                  )}
                </div>
                <fieldset>
                  <legend className="mb-1.5 block text-sm font-semibold text-ink">Tijdstip</legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {SERVICE_TIMESLOTS.map((slot) => (
                      <label
                        key={slot}
                        className={`cursor-pointer rounded-lg border-2 px-3 py-2 text-center text-sm font-semibold transition duration-fast ${
                          timeSlot === slot ? "border-accent bg-accent/10 text-brand" : "border-surface text-ink hover:border-brand/30"
                        }`}
                      >
                        <input type="radio" className="sr-only" checked={timeSlot === slot} onChange={() => setTimeSlot(slot)} />
                        {slot} uur
                      </label>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted">Ma–vr 08:00–18:00 · za 09:00–17:00 · zo gesloten</p>
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="w-name" className="mb-1.5 block text-sm font-semibold text-ink">Naam</label>
                    <input id="w-name" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="w-phone" className="mb-1.5 block text-sm font-semibold text-ink">Telefoonnummer</label>
                    <input id="w-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="w-email" className="mb-1.5 block text-sm font-semibold text-ink">E-mailadres</label>
                  <input id="w-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="w-notes" className="mb-1.5 block text-sm font-semibold text-ink">
                    Opmerkingen <span className="font-normal text-muted">(optioneel)</span>
                  </label>
                  <textarea id="w-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} />
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
                className="ml-auto rounded-md bg-accent px-6 py-2.5 font-black text-white transition duration-fast hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step < 2 ? "Volgende stap" : "Aanvraag via WhatsApp"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
