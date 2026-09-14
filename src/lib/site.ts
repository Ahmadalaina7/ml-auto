// Centrale configuratie van de site: contactgegevens, openingstijden, diensten
// en keuzelijsten. Wordt gedeeld door de UI en de formulieren.

export const SITE = {
  name: "MLAuto's",
  tagline: "Occasionverkoop, inkoop en onderhoud in Middelburg",
  city: "Middelburg",
  phone: "+31646830085",
  phoneDisplay: "06 46 83 00 85",
  whatsapp: "+31646830085",
  whatsappMessage: "Hallo MLAuto's, ik heb een vraag over jullie occasions of werkplaats.",
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
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Voltaweg 21, 4338 PS Middelburg"),
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
    slug: "inkoop-verkoop",
    title: "Inkoop en verkoop",
    description:
      "Jonge occasions kopen of jouw auto verkopen/inruilen. Eerlijke taxatie, duidelijke prijzen en snelle afhandeling.",
    price: "Taxatie & voorraad",
    href: "/occasions",
    cta: "Bekijk occasions →",
  },
  {
    slug: "onderhoud-apk",
    title: "Onderhoud en APK",
    description:
      "Periodiek onderhoud en APK-keuring in onze eigen werkplaats. Heldere offertes vooraf, zodat je weet waar je aan toe bent.",
    price: "Afspraak maken",
    href: "/werkplaats",
    cta: "Plan afspraak →",
  },
  {
    slug: "schade",
    title: "Schadeherstel en schade-expertises",
    description:
      "Schade herstellen én laten beoordelen. Wij helpen bij expertise, herstel en afstemming met jouw verzekering.",
    price: "Gratis beoordeling",
    href: "/werkplaats",
    cta: "Plan afspraak →",
  },
  {
    slug: "spuitwerk",
    title: "Spuitwerkzaamheden",
    description:
      "Professioneel spuitwerk en lakherstel. Van kleine reparaties tot grotere werkzaamheden, netjes afgewerkt.",
    price: "Offerte op maat",
    href: "/werkplaats",
    cta: "Plan afspraak →",
  },
  {
    slug: "import",
    title: "Importprocedures",
    description:
      "Hulp bij de import van jouw auto: papieren, keuringen en procedures zodat alles correct en soepel verloopt.",
    price: "Advies op maat",
    href: "/contact",
    cta: "Neem contact op →",
  },
  {
    slug: "export",
    title: "Export documenten",
    description:
      "Wij verzorgen de juiste documenten voor export, zodat jouw auto correct en zonder gedoe de grens over kan.",
    price: "Advies op maat",
    href: "/contact",
    cta: "Neem contact op →",
  },
] as const;

export const APPOINTMENT_SERVICES = [
  "Onderhoud en APK",
  "Schadeherstel",
  "Schade-expertise",
  "Spuitwerk",
  "Import",
  "Export",
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