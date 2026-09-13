"use client";

import { useActionState } from "react";
import { loginAction, type AuthState } from "@/actions/auth";

const inputClass =
  "w-full rounded-md border border-brand/20 bg-white px-3 py-2 text-ink outline-none transition duration-fast focus:border-accent focus:ring-2 focus:ring-accent";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(loginAction, null);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p role="alert" className="rounded-md border border-error-border bg-error-soft px-4 py-3 text-sm text-error">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          E-mailadres
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink">
          Wachtwoord
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-accent px-6 py-3 font-black text-brand transition duration-fast hover:bg-accent-dark hover:text-white disabled:opacity-60"
      >
        {pending ? "Inloggen…" : "Inloggen"}
      </button>
    </form>
  );
}