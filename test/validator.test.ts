import { describe, expect, it } from "vitest";
import { contactSchema, loginSchema, occasionInputSchema } from "@/lib/validator";

describe("contactSchema", () => {
  it("accepteert een geldig bericht", () => {
    const result = contactSchema.safeParse({
      name: "Jan Jansen",
      email: "jan@voorbeeld.nl",
      message: "Ik zoek een betrouwbare occasion tot 15.000 euro.",
    });
    expect(result.success).toBe(true);
  });

  it("weigert ongevalideerde e-mail", () => {
    const result = contactSchema.safeParse({
      name: "Jan Jansen",
      email: "geen-mail",
      message: "Voldoende lange testboodschap.",
    });
    expect(result.success).toBe(false);
  });

  it("weigert te kort bericht", () => {
    const result = contactSchema.safeParse({
      name: "Jan Jansen",
      email: "jan@voorbeeld.nl",
      message: "kort",
    });
    expect(result.success).toBe(false);
  });

  it("trimt naam en bericht", () => {
    const result = contactSchema.safeParse({
      name: "  Jan Jansen  ",
      email: "jan@voorbeeld.nl",
      message: "  Ik zoek een occasion tot 15.000 euro.  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Jan Jansen");
    }
  });
});

describe("loginSchema", () => {
  it("accepteert geldige login", () => {
    const result = loginSchema.safeParse({ email: "admin@mlauto.nl", password: "geheim123" });
    expect(result.success).toBe(true);
  });

  it("weigert kort wachtwoord", () => {
    const result = loginSchema.safeParse({ email: "admin@mlauto.nl", password: "kort" });
    expect(result.success).toBe(false);
  });
});

describe("occasionInputSchema", () => {
  const valid = {
    brand: "Volkswagen",
    model: "Golf",
    variant: "1.5 TSI Life",
    bodyType: "Hatchback",
    title: "Volkswagen Golf 1.5 TSI",
    year: "2021",
    mileageKm: "48500",
    fuel: "Benzine",
    transmission: "Automaat",
    powerKw: "110",
    doors: "5",
    color: "Maanlichtblauw",
    price: "25995",
    monthlyFrom: "0",
    description: "Goed onderhouden auto met volledige dealerhistorie.",
    features: [],
    featured: "on",
    status: "Published",
    images: ["/uploads/a.jpg"],
  };

  it("accepteert en coerct formulierwaarden", () => {
    const result = occasionInputSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.year).toBe(2021);
      expect(result.data.mileageKm).toBe(48500);
      expect(result.data.price).toBe(25995);
      expect(result.data.featured).toBe(true);
    }
  });

  it("parseert price als decimaal", () => {
    const result = occasionInputSchema.safeParse({ ...valid, price: "12999.50" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.price).toBe(12999.5);
    }
  });

  it("weigert onbekende brandstof", () => {
    const result = occasionInputSchema.safeParse({ ...valid, fuel: "Waterstof" });
    expect(result.success).toBe(false);
  });

  it("weigert ongeldig bouwjaar", () => {
    const result = occasionInputSchema.safeParse({ ...valid, year: "1200" });
    expect(result.success).toBe(false);
  });

  it("limiteert afbeeldingen op 10", () => {
    const result = occasionInputSchema.safeParse({
      ...valid,
      images: Array.from({ length: 11 }, (_, i) => `/uploads/${i}.jpg`),
    });
    expect(result.success).toBe(false);
  });
});