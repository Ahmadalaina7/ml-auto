import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="pb-16 sm:pb-0">
        <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
          <p className="font-display text-3xl font-bold text-brand">404</p>
          <h1 className="mt-4 text-2xl font-bold text-ink">Pagina niet gevonden</h1>
          <p className="mt-3 text-muted">
            De opgevraagde pagina bestaat niet of is inmiddels verplaatst.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-md bg-accent px-6 py-3 font-black text-white transition duration-fast hover:bg-accent-dark"
            >
              Naar de startpagina
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-brand px-6 py-3 font-black text-brand transition duration-fast hover:bg-brand hover:text-white"
            >
              Contact opnemen
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
