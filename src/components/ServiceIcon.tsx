import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  onderhoud: (
    <path
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  reparatie: (
    <>
      <path d="M9 17l-2 4M15 17l2 4M6 8h12M6 12h12" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M7 12v4h10v-4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  apk: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.8} />
      <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  banden: (
    <>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={1.8} />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={1.8} />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  schade: (
    <path
      d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  inkoop: (
    <>
      <path d="M4 7h16l-1.5 10.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 7z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
};

export function ServiceIcon({ slug }: { slug: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {ICONS[slug] ?? ICONS.reparatie}
    </svg>
  );
}
