"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";

function Logo() {
  return (
    <span className="inline-flex items-center gap-2 sm:gap-2.5">
      <span
        aria-hidden="true"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent font-display text-base font-black leading-none text-brand sm:h-9 sm:w-9 sm:text-lg"
      >
        M
      </span>
      <span className="font-display text-lg font-black leading-none tracking-tight text-white sm:text-xl">
        ML<span className="text-accent">AUTO&apos;S</span>
      </span>
    </span>
  );
}

function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function navLinkClass(active: boolean) {
  return [
    "view-transition-link whitespace-nowrap rounded-md px-2 py-1.5 text-[13px] transition duration-fast xl:px-2.5 xl:text-sm",
    active
      ? "font-semibold text-white bg-white/10"
      : "font-medium text-white/80 hover:text-white hover:bg-white/10",
  ].join(" ");
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="on-dark sticky top-0 z-40 border-b border-white/10 bg-brand-dark/95 text-white shadow-2 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="inline-flex shrink-0 items-center" aria-label={`${SITE.name}, naar de homepage`}>
          <Logo />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex" aria-label="Hoofdnavigatie">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link key={link.href} href={link.href} className={navLinkClass(active)} aria-current={active ? "page" : undefined}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={`tel:${SITE.phone}`}
            className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-white/85 transition duration-fast hover:text-accent xl:inline-flex"
          >
            <PhoneIcon />
            <span>{SITE.phoneDisplay}</span>
          </a>

          <Link
            href="/occasions"
            className="hidden items-center whitespace-nowrap rounded-md bg-accent px-4 py-2 text-sm font-black text-brand transition duration-fast hover:bg-accent-dark hover:shadow-2 sm:inline-flex"
          >
            Occasions
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            className="rounded-md p-2 text-white/90 transition duration-fast hover:bg-white/10 xl:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <MobilePanel
          id={menuId}
          pathname={pathname}
          onNavigate={() => setOpen(false)}
        />
      )}
    </header>
  );
}

function MobilePanel({
  id,
  pathname,
  onNavigate,
}: {
  id: string;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <nav
      id={id}
      aria-label="Mobiele navigatie"
      className="on-dark border-t border-white/10 bg-brand-dark px-4 pb-6 pt-4 shadow-2 xl:hidden"
    >
      <ul className="space-y-1" role="list">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`block rounded-md px-3 py-2.5 text-sm transition duration-fast ${
                  active
                    ? "bg-white/10 font-semibold text-white"
                    : "font-medium text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 grid gap-2">
        <a
          href={`tel:${SITE.phone}`}
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 rounded-md border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition duration-fast hover:bg-white/10"
        >
          <PhoneIcon size={18} />
          <span>{SITE.phoneDisplay}</span>
        </a>
        <Link
          href="/occasions"
          onClick={onNavigate}
          className="block w-full rounded-md bg-accent px-5 py-2.5 text-center text-sm font-black text-brand transition duration-fast hover:bg-accent-dark"
        >
          Bekijk occasions
        </Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="on-dark bg-brand-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <Link href="/" className="inline-flex items-center" aria-label={`${SITE.name}, naar de homepage`}>
            <Logo />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            Occasionverkoop, eerlijke inkoop, online taxatie en een eigen werkplaats. Midden in Zeeland.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.24em] text-accent">Navigatie</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 transition duration-fast hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.24em] text-accent">Contact</h2>
          <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-white/70">
            <p>
              {SITE.name}
              <br />
              {SITE.address.street}
              <br />
              {SITE.address.zip} {SITE.address.city}
            </p>
            <p>
              <a href={`tel:${SITE.phone}`} className="text-white transition duration-fast hover:text-accent">
                {SITE.phoneDisplay}
              </a>
              <br />
              <a href={`mailto:${SITE.email}`} className="text-white transition duration-fast hover:text-accent">
                {SITE.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 pb-24 text-center text-xs text-white/40 sm:pb-4">
        © {new Date().getFullYear()} {SITE.name} · {SITE.city} · Thuis in Zeeland
      </div>
    </footer>
  );
}
