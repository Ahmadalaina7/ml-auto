"use client";

import { useActionState } from "react";
import { submitContactAction, type ContactFormState } from "@/actions/contact";

const inputClass =
  "w-full rounded-md border border-brand/20 bg-white px-4 py-3 text-base text-ink outline-none transition duration-fast focus:border-accent focus:ring-2 focus:ring-accent";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactFormState, FormData>(
    submitContactAction,
    null,
  );

  return (
    <div className="rounded-xl border border-surface bg-white p-6 shadow-1 sm:p-8">
      {state?.success ? (
        <div className="rounded-xl border border-strong/30 bg-strong/10 p-6">
          <p className="font-display text-lg font-bold text-brand">Bericht verzonden</p>
          <p className="mt-2 text-sm text-ink">
            Bedankt voor je bericht! We reageren zo snel mogelijk, meestal binnen één werkdag.
          </p>
        </div>
      ) : (
        <form action={formAction}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className="mb-1.5 block text-sm font-semibold text-ink">
                Naam
              </label>
              <input id="c-name" name="name" type="text" required minLength={2} placeholder="Voor- en achternaam" className={inputClass} />
            </div>
            <div>
              <label htmlFor="c-phone" className="mb-1.5 block text-sm font-semibold text-ink">
                Telefoonnummer <span className="font-normal text-muted">(optioneel)</span>
              </label>
              <input id="c-phone" name="phone" type="tel" maxLength={30} placeholder="06……" className={inputClass} />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="c-email" className="mb-1.5 block text-sm font-semibold text-ink">
              E-mailadres
            </label>
            <input id="c-email" name="email" type="email" required placeholder="naam@voorbeeld.nl" className={inputClass} />
          </div>
          <div className="mt-4">
            <label htmlFor="c-subject" className="mb-1.5 block text-sm font-semibold text-ink">
              Onderwerp
            </label>
            <select id="c-subject" name="subject" className={inputClass}>
              <option value="">Kies een onderwerp…</option>
              <option value="Proefrit / interesse in occasion">Proefrit / interesse in occasion</option>
              <option value="Vraag over een occasion">Vraag over een occasion</option>
              <option value="Werkplaatsafspraak">Werkplaatsafspraak</option>
              <option value="Verkoop / inruil van mijn auto">Verkoop / inruil van mijn auto</option>
              <option value="Actie / promotie">Actie / promotie</option>
              <option value="Overig">Overig</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="c-message" className="mb-1.5 block text-sm font-semibold text-ink">
              Bericht
            </label>
            <textarea
              id="c-message"
              name="message"
              rows={5}
              required
              minLength={10}
              maxLength={5000}
              placeholder="Waar kunnen we je mee helpen?"
              className={inputClass}
            />
          </div>

          {state?.error && (
            <p role="alert" className="mt-4 rounded-md border border-error-border bg-error-soft px-4 py-3 text-sm text-error">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-5 w-full sm:w-auto rounded-md bg-accent px-6 py-2.5 font-black text-brand text-sm sm:text-base transition duration-fast hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending ? "Versturen…" : "Verstuur bericht"}
          </button>
        </form>
      )}
    </div>
  );
}