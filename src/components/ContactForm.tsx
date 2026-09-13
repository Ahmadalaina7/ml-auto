"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const inputClass =
  "w-full rounded-md border border-brand/20 bg-white px-4 py-3 text-base text-ink outline-none transition duration-fast focus:border-accent focus:ring-2 focus:ring-accent";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim() || "Contact";
    const message = String(data.get("message") ?? "").trim();

    const body = [
      `Hallo MLAuto,`,
      ``,
      `Naam: ${name}`,
      phone ? `Telefoon: ${phone}` : null,
      `E-mail: ${email}`,
      `Onderwerp: ${subject}`,
      ``,
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppLink(SITE.whatsapp, body), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <div className="rounded-xl border border-surface bg-white p-6 shadow-1 sm:p-8">
      {sent ? (
        <div className="rounded-xl border border-strong/30 bg-strong/10 p-6">
          <p className="font-display text-lg font-bold text-brand">WhatsApp geopend</p>
          <p className="mt-2 text-sm text-ink">
            Stuur het bericht om het bij ons af te leveren. Liever mailen?{" "}
            <a href={`mailto:${SITE.email}`} className="font-black text-brand underline-offset-4 hover:underline">
              {SITE.email}
            </a>
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
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

          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-accent px-6 py-2.5 text-sm font-black text-brand transition duration-fast hover:bg-accent-dark sm:w-auto sm:text-base"
          >
            Verstuur via WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
