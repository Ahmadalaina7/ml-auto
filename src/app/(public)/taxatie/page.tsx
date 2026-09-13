import type { Metadata } from "next";
import { TaxatieWizard } from "@/components/TaxatieWizard";

export const metadata: Metadata = {
  title: "Online taxatie",
  description: "Vraag in een paar stappen een vrijblijvende taxatie en inkoopprijs voor je auto aan bij MLAuto in Middelburg.",
};

export default function TaxatiePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="route-line max-w-2xl">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-accent">Occasion inkoop</p>
        <h1 className="mt-1 font-display text-2xl font-black tracking-tight text-brand sm:text-3xl">
          Online taxatie in drie stappen
        </h1>
        <p className="mt-3 text-muted">
          Zo ontdek je snel wat je auto waard is. Wij sturen je daarna een
          eerlijk, vrijblijvend bod, meestal binnen één werkdag. Let op: het bod geldt
          pas na een bevestiging op basis van de werkelijke staat van je auto.
        </p>
      </header>

      <div className="mt-10">
        <TaxatieWizard />
      </div>

      <section className="mx-auto mt-14 max-w-2xl rounded-xl bg-sand p-6">
        <h2 className="font-display text-lg font-bold text-brand">Hoe werkt het?</h2>
        <ol className="mt-4 space-y-3 text-sm text-ink">
          {[
            "Vul de gegevens van je auto in. Dat duurt slechts een paar minuten.",
            "Wij bekijken jouw auto en vergelijken met de actuele markt in Zeeland.",
            "Je ontvangt een vrijblijvend inkoopvoorstel per e-mail of telefoon.",
            "Zeg je ja? Dan plannen we een moment om je auto te laten zien en regel je het direct.",
          ].map((item, index) => (
            <li key={item} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-black text-white">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}