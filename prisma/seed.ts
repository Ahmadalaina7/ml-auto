import "dotenv/config";
import path from "node:path";
import { hash } from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { slugify, jsonFeatures, jsonImages } from "../src/lib/occasion";

function resolveDbPath(raw: string | undefined): string {
  const url = raw ?? "file:./dev.db";
  const file = url.startsWith("file:") ? url.slice("file:".length) : url;
  return path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
}

async function main(): Promise<void> {
  const prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3({ url: resolveDbPath(process.env.DATABASE_URL) }),
  });

  try {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (email && password) {
      if (password.length < 8) {
        throw new Error("ADMIN_PASSWORD moet minimaal 8 tekens bevatten.");
      }
      const exists = await prisma.adminUser.findUnique({ where: { email } });
      if (!exists) {
        await prisma.adminUser.create({
          data: { email, passwordHash: await hash(password, 12) },
        });
        console.log(`Admin-account aangemaakt: ${email}`);
      } else {
        console.log(`Admin-account bestaat al: ${email} (overgeslagen)`);
      }
    } else {
      console.warn("ADMIN_EMAIL / ADMIN_PASSWORD niet ingesteld; admin-account niet aangemaakt.");
    }

    const occasions = [
      {
        brand: "Volkswagen",
        model: "Golf",
        variant: "1.5 TSI Life",
        bodyType: "Hatchback",
        title: "Volkswagen Golf 1.5 TSI Life (2021)",
        year: 2021,
        mileageKm: 48500,
        fuel: "Benzine",
        transmission: "Automaat",
        powerKw: 110,
        doors: 5,
        color: "Pearl Black",
        priceCents: 2599500,
        monthlyFromCents: 31900,
        description:
          "Goed onderhouden Volkswagen Golf uit 2021 met volledige dealerhistorie. Eerste eigenaar, technisch in topconditie en gereed voor directe levering. APK geldig tot eind volgend jaar en inclusief nieuwe onderhoudsbeurt.",
        features: ["Adaptive Cruise Control", "Digitale cockpit", "CarPlay", "Parkeerassistent", "Verwarmde voorstoelen", "LED-koplampen"],
images: ["/images/golf.jpg"],
        featured: true,
        status: "Published",
      },
      {
        brand: "Audi",
        model: "A3",
        variant: "35 TFSI S line",
        bodyType: "Hatchback",
        title: "Audi A3 35 TFSI S line (2020)",
        year: 2020,
        mileageKm: 42000,
        fuel: "Benzine",
        transmission: "Automaat",
        powerKw: 110,
        doors: 5,
        color: "Daytona Grijs",
        priceCents: 2999500,
        monthlyFromCents: 35900,
        description:
          "Complete Audi A3 met S line-uitrusting, sportonderstel en volledig digitale cockpit. Rijke uitrusting, geen reparaties uit de historie bekend en in nieuwstaat verkerend onderhoud.",
        features: ["S line-uitvoering", "Digitale cockpit plus", "Audi virtual cockpit", "CarPlay", "Sportstoelen", "Adaptive cruise control"],
        images: ["/images/golf.jpg"],
        featured: true,
        status: "Published",
      },
      {
        brand: "Opel",
        model: "Corsa",
        variant: "1.2 Turbo Edition",
        bodyType: "Hatchback",
        title: "Opel Corsa 1.2 Turbo Edition (2020)",
        year: 2020,
        mileageKm: 61000,
        fuel: "Benzine",
        transmission: "Handgeschakeld",
        powerKw: 75,
        doors: 5,
        color: "Justice Blue",
        priceCents: 1499500,
        monthlyFromCents: 18900,
        description:
          "Zuivere en complete Opel Corsa met lichtmetalen velgen, airconditioning en parkeersensoren. Klaar om te rijden, inclusief nieuwe APK en onderhoudsbeurt.",
        features: ["Airconditioning", "Parkeersensoren", "Lichtmetalen velgen", "Bluetooth", "Cruise control"],
        images: ["/images/corsa.jpg"],
        featured: false,
        status: "Published",
      },
      {
        brand: "Volvo",
        model: "V60",
        variant: "D4 Momentum Business",
        bodyType: "Stationwagon",
        title: "Volvo V60 D4 Momentum Business (2019)",
        year: 2019,
        mileageKm: 118000,
        fuel: "Diesel",
        transmission: "Automaat",
        powerKw: 140,
        doors: 5,
        color: "Osmium Grijs",
        priceCents: 2199500,
        monthlyFromCents: 0,
        description:
          "Comfortabele en veilige Volvo V60 Business met riant uitrustingsniveau. Zowel zakelijk als particulier: geen gebreken en direct oproepbaar.",
        features: ["Zakelijk pakket", "Adaptive cruise control", "Verwarmde stoelen", "CarPlay", "Autonoom remsysteem", "Lane assist"],
        images: ["/images/v60.jpg"],
        featured: false,
        status: "Published",
      },
      {
        brand: "Škoda",
        model: "Octavia",
        variant: "1.5 TSI Style",
        bodyType: "Stationwagon",
        title: "Škoda Octavia 1.5 TSI Style (2022)",
        year: 2022,
        mileageKm: 35000,
        fuel: "Benzine",
        transmission: "Automaat",
        powerKw: 110,
        doors: 5,
        color: "Middenblauw",
        priceCents: 2799500,
        monthlyFromCents: 33900,
        description:
          "Jonge en zeer complete Škoda Octavia met enorme bagageruimte. Volledige dealerhistorie en fabrieksgarantie tot 2027.",
        features: ["Ledermultifunctioneel stuur", "CarPlay", "Adaptive cruise control", "Parkeerassistent", "Elektrische achterklep", "Omgevingscamera"],
        images: ["/images/golf.jpg"],
        featured: true,
        status: "Published",
      },
      {
        brand: "SEAT",
        model: "Arona",
        variant: "1.0 EcoTSI Xperience",
        bodyType: "SUV",
        title: "SEAT Arona 1.0 EcoTSI Xperience (2021)",
        year: 2021,
        mileageKm: 52000,
        fuel: "Benzine",
        transmission: "Handgeschakeld",
        powerKw: 81,
        doors: 5,
        color: "Energy Orange",
        priceCents: 1899500,
        monthlyFromCents: 22900,
        description:
          "Frisse en complete SEAT Arona in topuitrusting. Ideaal als eerste auto of compacte gezinsauto, klaar voor vele kilometers.",
        features: ["Led-koplampen", "8\" infotainment", "CarPlay", "Parkeersensoren", "Cruise control", "Privacyglas"],
        images: ["/images/corsa.jpg"],
        featured: false,
        status: "Published",
      },
      {
        brand: "Volkswagen",
        model: "T-Cross",
        variant: "1.0 TSI Life",
        bodyType: "SUV",
        title: "Volkswagen T-Cross 1.0 TSI Life (2020)",
        year: 2020,
        mileageKm: 73000,
        fuel: "Benzine",
        transmission: "Handgeschakeld",
        powerKw: 70,
        doors: 5,
        color: "Energetic Orange",
        priceCents: 1799500,
        monthlyFromCents: 21900,
        description:
          "Compacte VW SUV met veel ruimte en een zuinige 1.0 TSI. Compleet met digitale cockpit, CarPlay en verwarmde voorstoelen.",
        features: ["Digitale cockpit", "CarPlay", "Verwarmde voorstoelen", "Led-koplampen", "Parkeersensoren"],
        images: ["/images/corsa.jpg"],
        featured: false,
        status: "Draft",
      },
    ];

    for (const demo of occasions) {
      const slug = `${slugify(demo.brand)}-${slugify(demo.model)}-${demo.year}`;
      await prisma.occasion.upsert({
        where: { slug },
        update: {
          brand: demo.brand,
          model: demo.model,
          variant: demo.variant,
          bodyType: demo.bodyType,
          title: demo.title,
          year: demo.year,
          mileageKm: demo.mileageKm,
          fuel: demo.fuel,
          transmission: demo.transmission,
          powerKw: demo.powerKw,
          doors: demo.doors,
          color: demo.color,
          priceCents: demo.priceCents,
          monthlyFromCents: demo.monthlyFromCents,
          description: demo.description,
          features: jsonFeatures(demo.features),
          images: jsonImages(demo.images),
          featured: demo.featured,
          status: demo.status,
        },
        create: {
          slug,
          brand: demo.brand,
          model: demo.model,
          variant: demo.variant,
          bodyType: demo.bodyType,
          title: demo.title,
          year: demo.year,
          mileageKm: demo.mileageKm,
          fuel: demo.fuel,
          transmission: demo.transmission,
          powerKw: demo.powerKw,
          doors: demo.doors,
          color: demo.color,
          priceCents: demo.priceCents,
          monthlyFromCents: demo.monthlyFromCents,
          description: demo.description,
          features: jsonFeatures(demo.features),
          images: jsonImages(demo.images),
          featured: demo.featured,
          status: demo.status,
        },
      });
    }
    console.log(`${occasions.length} occasions aangemaakt/bijgewerkt (idempotent).`);

    const acties = [
      {
        title: "Zomerdeal: € 1.000 prijsvoordeel",
        badge: "Tijdelijk",
        summary: "Ontvang € 1.000 extra inruilvoordeel op geselecteerde occasions.",
        body: "Ruil je huidige auto in en profiteer tijdelijk van € 1.000 extra inruilvoordeel op geselecteerde occasions uit onze voorraad. Het voordeel wordt direct verwerkt in je offerte. Vrijblijvend, zonder verplichtingen, en op = op.",
        image: "",
        featured: true,
        startsAt: new Date("2026-01-01"),
        endsAt: new Date("2026-12-31"),
        status: "Published",
      },
      {
        title: "Voordelige financiering vanaf 4,9%",
        badge: "Financiering",
        summary: "Rij direct weg voor een vast, laag maandbedrag met onze financieringspartner.",
        body: "Bij MLAuto regel je de financiering direct aan de balie. Kies zelf de looptijd (12 tot 72 maanden) en een eventuele inruil. Het maandbedrag vind je bij elke occasion op de detailpagina.",
        image: "",
        featured: true,
        startsAt: new Date("2026-01-01"),
        endsAt: null,
        status: "Published",
      },
      {
        title: "APK-keuring met garantie",
        badge: "Service",
        summary: "Laat je auto keuren en onderhouden door onze eigen werkplaats in Middelburg.",
        body: "Onze eigen APK-er keurt je auto direct op afspraak. Wanneer er iets gevonden wordt, ontvang je een vrijblijvende offerte. Geen verrassingen achteraf.",
        image: "",
        featured: false,
        startsAt: new Date("2026-01-01"),
        endsAt: null,
        status: "Published",
      },
    ];

    for (const actie of acties) {
      const slug = slugify(actie.title) || "actie";
      await prisma.actie.upsert({
        where: { slug },
        update: {
          title: actie.title,
          badge: actie.badge,
          summary: actie.summary,
          body: actie.body,
          image: actie.image,
          featured: actie.featured,
          startsAt: actie.startsAt,
          endsAt: actie.endsAt,
          status: actie.status,
        },
        create: {
          slug,
          title: actie.title,
          badge: actie.badge,
          summary: actie.summary,
          body: actie.body,
          image: actie.image,
          featured: actie.featured,
          startsAt: actie.startsAt,
          endsAt: actie.endsAt,
          status: actie.status,
        },
      });
    }
    console.log(`${acties.length} acties aangemaakt/bijgewerkt (idempotent).`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err: unknown) => {
  console.error("Seed mislukt:", err);
  process.exit(1);
});