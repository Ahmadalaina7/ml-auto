// Status-badge met design tokens. Kan op elke inbox-rij gebruikt worden.
export function StatusBadge({ status }: { status: string }) {
  const palette: Record<string, string> = {
    New: "bg-accent text-white",
    Handled: "bg-strong/25 text-brand",
    Confirmed: "bg-strong text-white",
    Done: "bg-strong/25 text-brand",
    Cancelled: "bg-surface text-muted",
    Sold: "bg-surface text-muted",
    Published: "bg-strong/25 text-brand",
    Draft: "bg-surface text-muted",
  };

  const label: Record<string, string> = {
    New: "Nieuw",
    Handled: "Afgehandeld",
    Confirmed: "Bevestigd",
    Done: "Klaar",
    Cancelled: "Geannuleerd",
    Sold: "Verkocht",
    Published: "Gepubliceerd",
    Draft: "Concept",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${palette[status] ?? "bg-surface text-muted"}`}>
      {label[status] ?? status}
    </span>
  );
}