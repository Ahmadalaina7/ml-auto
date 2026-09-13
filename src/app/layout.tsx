import type { Metadata } from "next";
import { Mukta_Mahee } from "next/font/google";
import "./globals.css";

// Design system: font.family.primary = Mukta Mahee.
const mukta = Mukta_Mahee({
  subsets: ["latin"],
  variable: "--font-mukta",
  weight: ["200", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "MLAuto – Occasionverkoop, inkoop en onderhoud in Middelburg",
    template: "%s | MLAuto Middelburg",
  },
  description:
    "MLAuto in Middelburg: occasionverkoop en inkoop, werkplaatsafspraak, online taxatie, reparatie en onderhoud. Voltaweg 21, 4338 PS Middelburg.",
  metadataBase: new URL("https://www.mlauto.nl"),
  alternates: {},
  openGraph: {
    title: "MLAuto – Occasionverkoop, inkoop en onderhoud in Middelburg",
    description:
      "Jonge occasions, eerlijke inkoop, online taxatie en een eigen werkplaats. Midden in Zeeland, bij je in de buurt.",
    siteName: "MLAuto",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={mukta.variable}>
      <body className="min-h-screen bg-white text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Direct naar inhoud
        </a>
        {children}
      </body>
    </html>
  );
}