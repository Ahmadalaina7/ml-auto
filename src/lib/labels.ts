// NL-labels voor status- en vaste keuzelijsten in admin-inboxen.
export const AFRSPAAK_STATUSEN = [
  { value: "New", label: "Nieuw" },
  { value: "Confirmed", label: "Bevestigd" },
  { value: "Done", label: "Klaar" },
  { value: "Cancelled", label: "Geannuleerd" },
] as const;

export const OCCASIE_FILTERS = [
  { value: "", label: "Alle statussen" },
  { value: "Draft", label: "Concept" },
  { value: "Published", label: "Gepubliceerd" },
  { value: "Sold", label: "Verkocht" },
] as const;

export const ACTIE_FILTERS = [
  { value: "", label: "Alle statussen" },
  { value: "Draft", label: "Concept" },
  { value: "Published", label: "Gepubliceerd" },
] as const;