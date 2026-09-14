"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-3xl font-bold text-accent">Oeps</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">Er ging iets mis</h1>
      <p className="mt-3 text-muted">
        Er is een onverwachte fout opgetreden. Probeer het opnieuw of neem contact met ons op.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-accent px-6 py-3 font-black text-white transition duration-fast hover:bg-accent-dark"
        >
          Opnieuw proberen
        </button>
        <Link
          href="/contact"
          className="rounded-md border border-brand px-6 py-3 font-black text-brand transition duration-fast hover:bg-brand hover:text-white"
        >
          Contact opnemen
        </Link>
      </div>
    </div>
  );
}