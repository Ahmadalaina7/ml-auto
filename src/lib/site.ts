// Centrale configuratie van de site: contactgegevens, openingstijden, diensten
// en keuzelijsten. Wordt gedeeld door de UI en de formulieren.

export const SITE = {
  name: "MLAuto",
  tagline: "Occasionverkoop, inkoop en onderhoud in Middelburg",
  city: "Middelburg",
  phone: "+31646830085",
  phoneDisplay: "06 46 83 00 85",
  whatsapp: "+31646830085",
  whatsappMessage: "Hallo MLAuto, ik heb een vraag over jullie occasions of werkplaats.",
  email: "info@mlauto.nl",
  address: {
    street: "Voltaweg 21",
    zip: "4338 PS",
    city: "Middelburg",
  },
  hours: [
    { day: "Maandag t/m vrijdag", time: "08:00 – 18:00" },
    { day: "Zaterdag", time: "09:00 – 17:00" },
    { day: "Zondag", time: "Gesloten" },
  ],
} as const;

export const NAV_LINKS = [
  { href: "/occasions", label: "Occasions" },
  { href: "/acties", label: "Acties" },
  { href: "/diensten", label: "Diensten" },
  { href: "/werkplaats", label: "Werkplaats" },
  { href: "/taxatie", label: "Taxatie" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    slug: "onderhoud",
    title: "Onderhoud & beurten",
    description:
      "Periodiek onderhoud volgens voorschrift van de fabrikant: kleine en grote beurten, inclusief vloeistoffen, filters en volledige controle.",
    price: "Vanaf € 89",
  },
  {
    slug: "reparatie",
    title: "Reparatie & diagnose",
    description:
      "Wij sporen storingen snel op met moderne diagnoseapparatuur en repareren de oorzaak, niet alleen het symptoom.",
    price: "Offerte op afspraak",
  },
  {
    slug: "apk",
    title: "APK-keuring",
    description:
      "APK-keuring in onze eigen werkplaats. Komt er iets uit de keuring? Dan ontvang je altijd eerst een vrijblijvende offerte.",
    price: "Vanaf € 64,95",
  },
  {
    slug: "banden",
    title: "Banden- en velgservice",
    description:
      "Nieuwe banden, wisselset, uitlijnen en balanceren. Altijd de juiste band voor jouw rijgedrag en seizoen.",
    price: "Vanaf € 25 per band",
  },
  {
    slug: "schade",
    title: "Schadeherstel",
    description:
      "Blikschade, lakreparatie of spuitwerk: wij herstellen het zorgvuldig, vaak in overleg met jouw verzekering.",
    price: "Gratis schadebeoordeling",
  },
  {
    slug: "inkoop",
    title: "Occasion inkoop & inruil",
    description:
      "Verkoop je auto aan ons of ruil hem in. Een eerlijke taxatie met directe uitbetaling, zonder verplichtingen.",
    price: "Direct een bod",
  },
] as const;

export const APPOINTMENT_SERVICES = [
  "APK",
  "Onderhoud",
  "Reparatie",
  "Banden",
  "Schade",
  "Overig",
] as const;

export const SERVICE_TIMESLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

export const FUELS = ["Benzine", "Diesel", "Elektrisch", "Hybride", "LPG"] as const;

export const TRANSMISSIONS = ["Handgeschakeld", "Automaat"] as const;

export const BODY_TYPES = ["Hatchback", "Sedan", "Stationwagon", "SUV", "Coupé", "Cabriolet"] as const;

export const OCCASION_STATUSES = ["Draft", "Published", "Sold"] as const;

export const OCCASION_CONDITIONS = ["Goed", "Zeer goed", "Uitstekend"] as const;