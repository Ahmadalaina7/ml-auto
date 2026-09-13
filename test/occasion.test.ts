import { describe, expect, it } from "vitest";
import {
  formatKm,
  formatPrice,
  isRecentlyAdded,
  jsonImages,
  parseImages,
  slugify,
  uniqueSlug,
} from "@/lib/occasion";

describe("slugify", () => {
  it("maakt slug van titel", () => {
    expect(slugify("Volkswagen Golf 1.5 TSI Life")).toBe("volkswagen-golf-15-tsi-life");
  });

  it("verwijdert diakritische tekens", () => {
    expect(slugify("Café Amsterdam")).toBe("cafe-amsterdam");
  });

  it("verwijdert leidende/trailing streepjes", () => {
    expect(slugify("  ---  BMW 320i  --- ")).toBe("bmw-320i");
  });

  it("valt terug naar leeg bij ongeldige input", () => {
    expect(slugify("!!??")).toBe("");
  });
});

describe("uniqueSlug", () => {
  it("voegt suffix toe bij conflict", () => {
    const taken = new Set(["volvo-v60"]);
    expect(uniqueSlug("Volvo V60", (s) => taken.has(s))).toBe("volvo-v60-1");
  });

  it("zonder conflict basis-slug", () => {
    expect(uniqueSlug("Volvo V60", () => false)).toBe("volvo-v60");
  });
});

describe("image parsing", () => {
  it("parsed geldige JSON", () => {
    expect(parseImages('["/uploads/a.jpg","/uploads/b.png"]')).toEqual(["/uploads/a.jpg", "/uploads/b.png"]);
  });

  it("retourneert leeg bij kapotte JSON", () => {
    expect(parseImages("kapot{")).toEqual([]);
  });

  it("filtreert non-strings", () => {
    expect(parseImages('[1,"/uploads/a.jpg",null]')).toEqual(["/uploads/a.jpg"]);
  });

  it("serialiseert naar JSON-capable string", () => {
    expect(parseImages(jsonImages(["/uploads/a.jpg", "/b.jpg"]))).toEqual(["/uploads/a.jpg", "/b.jpg"]);
  });

  it("limiteert op 10 bij serialisatie", () => {
    const many = Array.from({ length: 15 }, (_, i) => `/uploads/${i}.jpg`);
    expect(parseImages(jsonImages(many)).length).toBe(10);
  });
});

describe("formatPrice", () => {
  it("formatteert centen als euro's", () => {
    expect(formatPrice(2599500)).toBe("€\u00A025.995");
  });

  it("rondt af zonder centen", () => {
    expect(formatPrice(125)).toBe("€\u00A01");
  });
});

describe("formatKm", () => {
  it("formatteert kilometerstand in nl-NL", () => {
    expect(formatKm(48500)).toBe("49.000 km");
  });

  it("rondt af op 1000", () => {
    expect(formatKm(118000)).toBe("118.000 km");
  });
});

describe("isRecentlyAdded", () => {
  it("is waar binnen de gestelde dagen", () => {
    const created = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
    expect(isRecentlyAdded(created.toISOString(), 21)).toBe(true);
  });

  it("is onwaar bij null/leeg", () => {
    expect(isRecentlyAdded(null)).toBe(false);
    expect(isRecentlyAdded(undefined)).toBe(false);
  });

  it("is onwaar buiten het venster", () => {
    const created = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    expect(isRecentlyAdded(created.toISOString(), 21)).toBe(false);
  });

  it("is onwaar bij ongeldige datum of datum in de toekomst", () => {
    expect(isRecentlyAdded("geen-datum")).toBe(false);
    expect(isRecentlyAdded(new Date(Date.now() + 1000 * 60).toISOString())).toBe(false);
  });
});