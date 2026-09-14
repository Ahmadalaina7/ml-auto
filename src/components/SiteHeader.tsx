"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";

function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-ml-autos.png"
      alt=""
      width={168}
      height={52}
      className="h-8 w-auto object-contain object-left sm:h-9"
      decoding="async"
    />
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
    "view-transition-link relative whitespace-nowrap px-2.5 py-2 text-sm transition duration-fast lg:px-3",
    active
      ? "font-semibold text-white after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent"
      : "font-medium text-white/70 hover:text-white",
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
    <header className="on-dark sticky top-0 z-40 border-b border-white/10 bg-brand/95 text-white shadow-2 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Link href="/" className="inline-flex shrink-0 items-center" aria-label={`${SITE.name}, naar de homepage`}>
          <Logo />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
          aria-label="Hoofdnavigatie"
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(active)}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={`tel:${SITE.phone}`}
            className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-white/80 transition duration-fast hover:text-white xl:inline-flex"
          >
            <PhoneIcon />
            <span>{SITE.phoneDisplay}</span>
          </a>

          <Link
            href="/werkplaats"
            className="hidden items-center whitespace-nowrap rounded-md bg-accent px-4 py-2 text-sm font-black text-white transition duration-fast hover:bg-accent-dark hover:shadow-2 sm:inline-flex"
          >
            Plan afspraak
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            className="rounded-md p-2 text-white/90 transition duration-fast hover:bg-white/10 lg:hidden"
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
      className="on-dark border-t border-white/10 bg-brand px-4 pb-6 pt-4 lg:hidden"
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
                    ? "bg-accent font-semibold text-white"
                    : "font-medium text-white/80 hover:bg-white/5 hover:text-white"
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
          className="flex items-center justify-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition duration-fast hover:bg-white/5"
        >
          <PhoneIcon size={18} />
          <span>{SITE.phoneDisplay}</span>
        </a>
        <Link
          href="/werkplaats"
          onClick={onNavigate}
          className="block w-full rounded-md bg-accent px-5 py-2.5 text-center text-sm font-black text-white transition duration-fast hover:bg-accent-dark"
        >
          Plan afspraak
        </Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="on-dark bg-brand text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <Link href="/" className="inline-flex items-center" aria-label={`${SITE.name}, naar de homepage`}>
            <Logo />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-white/65">
            Occasionverkoop, eerlijke inkoop, online taxatie en een eigen werkplaats. Midden in Zeeland.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.24em] text-accent">Navigatie</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/65 transition duration-fast hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.24em] text-accent">Contact</h2>
          <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-white/65">
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

      <div className="border-t border-white/10 py-4 pb-20 text-center text-xs text-white/40 sm:pb-4">
        © {new Date().getFullYear()} {SITE.name} · {SITE.city} · Thuis in Zeeland
        <span className="mt-1 block text-white/30">
          Sommige demo-foto&apos;s: Wikimedia Commons (CC BY-SA)
        </span>
      </div>
    </footer>
  );
}
