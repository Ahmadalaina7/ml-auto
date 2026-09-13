import { SITE } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppLink(SITE.whatsapp, SITE.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-2 transition duration-fast hover:-translate-y-0.5 hover:brightness-110"
      aria-label="Neem contact op via WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.7A9.3 9.3 0 0 0 3.4 17L2 22l5.2-1.4A9.3 9.3 0 1 0 12 2.7Zm5.5 13.3c-.25.7-1.45 1.35-2 1.4-.5.05-1.1.2-3.7-.77-3.15-1.2-5.2-4.35-5.36-4.55-.16-.2-1.28-1.7-1.28-3.25 0-1.55.8-2.3 1.1-2.6.27-.3.6-.37.8-.37h.55c.17 0 .4-.06.63.48.23.55.8 1.9.87 2.04.07.14.1.3.02.48-.18.37-.3.55-.55.85-.15.2-.3.36-.15.71.3.55 1.35 2.2 2.9 3 .75.37 1.15.66 1.55.47.25-.13.75-.87.95-1.17.2-.3.4-.25.65-.15l1.7.8c.25.12.4.18.46.28.06.1.06.6-.2 1.3Z" />
      </svg>
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}