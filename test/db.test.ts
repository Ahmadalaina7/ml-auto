import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { rmSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createPrismaClient, resolveDbPath } from "@/lib/server/db";
import type { PrismaClient } from "@/generated/prisma/client";
import { formatPrice } from "@/lib/occasion";

const exec = promisify(execFile);

const PROJECT_ROOT = path.resolve(__dirname, "..");
const DB_NAME = `test-${randomUUID()}.db`;
const DATABASE_URL = `file:./${DB_NAME}`;

let prisma: PrismaClient;

beforeAll(async () => {
  await exec(
    process.execPath,
    [path.join("node_modules", "prisma", "build", "index.js"), "db", "push"],
    { cwd: PROJECT_ROOT, env: { ...process.env, DATABASE_URL }, windowsHide: true },
  );
  prisma = createPrismaClient(DATABASE_URL);
}, 60000);

afterAll(async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
  const dbFile = resolveDbPath(DATABASE_URL);
  rmSync(dbFile, { force: true });
  rmSync(`${dbFile}-journal`, { force: true });
  rmSync(`${dbFile}-wal`, { force: true });
  rmSync(`${dbFile}-shm`, { force: true });
});

describe("domein CRUD", () => {
  it("maakt en leest een admin", async () => {
    const admin = await prisma.adminUser.create({
      data: { email: "tester@mlauto.nl", passwordHash: "hash-placeholder" },
    });
    const found = await prisma.adminUser.findUnique({ where: { id: admin.id } });
    expect(found?.email).toBe("tester@mlauto.nl");
  });

  it("voorkomt dubbele admin-e-mail (unique constraint)", async () => {
    await prisma.adminUser.create({
      data: { email: "unique@mlauto.nl", passwordHash: "x" },
    });
    await expect(
      prisma.adminUser.create({ data: { email: "unique@mlauto.nl", passwordHash: "y" } }),
    ).rejects.toThrow();
  });

  it("publieke lees: alleen gepubliceerde occasions zichtbaar", async () => {
    const published = await prisma.occasion.create({
      data: {
        slug: "test-publiek",
        brand: "Volkswagen",
        model: "Golf",
        title: "VW Golf",
        year: 2021,
        mileageKm: 48500,
        fuel: "Benzine",
        transmission: "Automaat",
        priceCents: 2599500,
        description: "Goed onderhouden auto, volledig gereed.",
        images: "[]",
        status: "Published",
      },
    });
    const draft = await prisma.occasion.create({
      data: {
        slug: "test-concept",
        brand: "Opel",
        model: "Corsa",
        title: "Opel Corsa",
        year: 2020,
        mileageKm: 61000,
        fuel: "Benzine",
        transmission: "Handgeschakeld",
        priceCents: 1499500,
        description: "Concept-advertentie, nog niet live.",
        images: "[]",
        status: "Draft",
      },
    });

    const visible = await prisma.occasion.findMany({
      where: { status: "Published" },
      select: { slug: true },
    });
    expect(visible.some((o) => o.slug === published.slug)).toBe(true);
    expect(visible.some((o) => o.slug === draft.slug)).toBe(false);
  });

  it("slug-uniekheid wordt afgedwongen", async () => {
    await expect(
      prisma.occasion.create({
        data: {
          slug: "test-publiek",
          brand: "Volvo",
          model: "V60",
          title: "Dubbele slug",
          year: 2019,
          mileageKm: 100000,
          fuel: "Diesel",
          transmission: "Automaat",
          priceCents: 100000,
          description: "Test duplicaat-slug.",
          images: "[]",
        },
      }),
    ).rejects.toThrow();
  });

  it("contactbericht-levenscyclus: nieuw -> afgehandeld", async () => {
    const message = await prisma.contactMessage.create({
      data: { name: "Pieter", email: "pieter@test.nl", message: "Ik wil een proefrit plannen." },
    });
    expect(message.status).toBe("New");

    const handled = await prisma.contactMessage.update({
      where: { id: message.id },
      data: { status: "Handled" },
    });
    expect(handled.status).toBe("Handled");
    expect(formatPrice(handled.id * 100)).toMatch(/^€/);
  });

  it("bewerken occasion werkt via update", async () => {
    const occasion = await prisma.occasion.create({
      data: {
        slug: "test-bewerk",
        brand: "Renault",
        model: "Clio",
        title: "Renault Clio",
        year: 2018,
        mileageKm: 80000,
        fuel: "Benzine",
        transmission: "Handgeschakeld",
        priceCents: 99900,
        description: "Oorspronkelijke omschrijving.",
        images: "[]",
      },
    });
    const updated = await prisma.occasion.update({
      where: { id: occasion.id },
      data: { priceCents: 109900, description: "Bijgewerkte omschrijving." },
    });
    expect(updated.priceCents).toBe(109900);
  });
});