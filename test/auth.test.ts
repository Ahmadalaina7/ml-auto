import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { hashPassword, signSession, verifyPassword, verifySessionToken } from "@/lib/server/auth";

const ORIGINAL_SECRET = process.env.AUTH_SECRET;

beforeAll(() => {
  process.env.AUTH_SECRET = "test-secret-minimaal-32-tekens-lang-123456";
});

afterAll(() => {
  if (ORIGINAL_SECRET === undefined) {
    delete process.env.AUTH_SECRET;
  } else {
    process.env.AUTH_SECRET = ORIGINAL_SECRET;
  }
});

describe("password hashing", () => {
  it("valueert en verifieert wachtwoord", async () => {
    const hash = await hashPassword("SterkWachtwoord2026!");
    expect(hash).not.toBe("SterkWachtwoord2026!");
    await expect(verifyPassword("SterkWachtwoord2026!", hash)).resolves.toBe(true);
    await expect(verifyPassword("FoutWachtwoord", hash)).resolves.toBe(false);
  });

  it("produceert unieke zout-hashes voor dezelfde input", async () => {
    const a = await hashPassword("zelfde-wachtwoord");
    const b = await hashPassword("zelfde-wachtwoord");
    expect(a).not.toBe(b);
  });
});

describe("session tokens", () => {
  it("rondt sign/verify af met sub", async () => {
    const token = await signSession("42");
    await expect(verifySessionToken(token)).resolves.toBe("42");
  });

  it("verwerpt geknoeide tokens", async () => {
    const token = await signSession("42");
    await expect(verifySessionToken(`${token}x`)).resolves.toBeNull();
  });

  it("verwerkt vervallen tokens", async () => {
    const { SignJWT } = await import("jose");
    const expired = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject("1")
      .setIssuedAt(Math.floor(Date.now() / 1000) - 120)
      .setExpirationTime(Math.floor(Date.now() / 1000) - 60)
      .sign(new TextEncoder().encode("test-secret-minimaal-32-tekens-lang-123456"));
    await expect(verifySessionToken(expired)).resolves.toBeNull();
  });
});