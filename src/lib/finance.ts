// Financiering/maandprijs-berekeningen zodat de website "precies zoals Auto Poppe"
// een maandbedrag toont bij elke occasion.

export type FinanceInput = {
  priceCents: number;
  // Inruil / aanbetaling in centen.
  downPaymentCents?: number;
  // Looptijd in maanden.
  termMonths?: number;
  // Jaarrente, bv. 0.049 voor 4,9%.
  annualRate?: number;
};

export const DEFAULT_TERM_MONTHS = 60;
export const DEFAULT_ANNUAL_RATE = 0.049;
const TOTAL_BUDGET = 5_000_000_000_000; // sanitaire bovengrens in centen (50 miljard)

/** Maandtermijn van een annuïteitenhypotheek (gebalanceerde aflossing). */
export function monthlyAmountCents(input: FinanceInput): number {
  const price = Math.max(0, input.priceCents);
  const down = Math.max(0, input.downPaymentCents ?? 0);
  const principal = Math.max(0, price - down);
  const months = Math.max(1, input.termMonths ?? DEFAULT_TERM_MONTHS);
  const rate = input.annualRate ?? DEFAULT_ANNUAL_RATE;

  if (principal === 0) return 0;
  const r = rate / 12;
  if (r <= 0) return Math.round(principal / months);

  // Annuitair: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const factor = Math.pow(1 + r, months);
  const monthly = (principal * r * factor) / (factor - 1);
  return Math.min(Math.round(monthly), TOTAL_BUDGET);
}

/**
 * Vanafprijs per maand voor de UI.
 * - Occasion met expliciete `monthlyFromCents` > 0 toont dat bedrag (zoals de
 *   dealer het in de administratie heeft staan).
 * - Anders wordt het maandbedrag op basis van de prijs berekend (standaard
 *   60 maanden, 4,9% rente, geen inruil), zoals gebruikelijk bij "vanafprijs".
 */
export function occasionMonthlyCents(priceCents: number, monthlyFromCents: number): number {
  if (monthlyFromCents > 0) return monthlyFromCents;
  return monthlyAmountCents({ priceCents });
}

/** Kort overzicht van de financieringskeuze, bv. "60 mnd · 4,9%" */
export function financeTermLabel(termMonths = DEFAULT_TERM_MONTHS, rate = DEFAULT_ANNUAL_RATE): string {
  return `${termMonths} maanden · ${(rate * 100).toLocaleString("nl-NL", { maximumFractionDigits: 1 })}% rente`;
}