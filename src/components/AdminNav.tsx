"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/occasions", label: "Occasions", exact: false },
  { href: "/admin/acties", label: "Acties", exact: false },
  { href: "/admin/afspraken", label: "Afspraken", exact: false },
  { href: "/admin/taxaties", label: "Taxaties", exact: false },
  { href: "/admin/berichten", label: "Berichten", exact: false },
] as const;

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <header className="on-dark bg-brand-dark text-white shadow-1">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/admin" className="font-display text-lg font-black tracking-tight">
          <span className="mr-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-accent text-sm font-black text-white">M</span>
          MLAuto <span className="text-sm font-semibold text-white/60">Beheer</span>
        </Link>

        <nav className="flex items-center gap-4 overflow-x-auto">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap text-sm transition duration-fast ${
                  active ? "font-black text-accent" : "font-medium text-white/85 hover:text-white"
                }`}
              >
                {item.label}
                {active && (
                  <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}

          <Link href="/" className="whitespace-nowrap text-sm font-medium text-white/85 transition duration-fast hover:text-white">
            Bekijk site ↗
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="whitespace-nowrap rounded-md border border-white/30 px-3 py-1.5 text-sm font-medium text-white/85 transition duration-fast hover:bg-white/10">
              Uitloggen ({email})
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}