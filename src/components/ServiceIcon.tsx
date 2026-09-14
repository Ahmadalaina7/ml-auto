import type { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  "inkoop-verkoop": (
    <>
      <path d="M4 7h16l-1.5 10.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 7z" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  "onderhoud-apk": (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.8} />
      <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
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
  spuitwerk: (
    <>
      <path d="M7 20h10M9 16h6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M12 3v7M9 7c0 2 1.5 3 3 3s3-1 3-3" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  import: (
    <>
      <path d="M12 3v12M8 11l4 4 4-4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19h14" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
  export: (
    <>
      <path d="M12 21V9M8 13l4-4 4 4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 5h14" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    </>
  ),
};

export function ServiceIcon({ slug }: { slug: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {ICONS[slug] ?? ICONS["onderhoud-apk"]}
    </svg>
  );
}
