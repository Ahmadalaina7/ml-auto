export function buildWhatsAppLink(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp; falls back to same-tab navigation if the popup is blocked. */
export function openWhatsApp(phone: string, message: string): void {
  const url = buildWhatsAppLink(phone, message);
  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) {
    window.location.assign(url);
  }
}