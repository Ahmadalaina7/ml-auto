import { describe, expect, it } from "vitest";
import { buildWhatsAppLink } from "@/lib/whatsapp";

describe("buildWhatsAppLink", () => {
  it("behoudt alleen cijfers uit het telefoonnummer", () => {
    expect(buildWhatsAppLink("+31 6 46 83 00 85", "Hallo")).toBe(
      "https://wa.me/31646830085?text=Hallo",
    );
  });

  it("verwijdert niet-numerieke tekens inclusief een plus", () => {
    expect(buildWhatsAppLink("+31646830085-", "Goedendag")).toBe(
      "https://wa.me/31646830085?text=Goedendag",
    );
  });

  it("encodet het vooringevulde bericht", () => {
    expect(buildWhatsAppLink("+31646830085", "Hallo MLAuto, ik heb een vraag.")).toBe(
      "https://wa.me/31646830085?text=Hallo%20MLAuto%2C%20ik%20heb%20een%20vraag.",
    );
  });
});