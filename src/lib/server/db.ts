import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

export function resolveDbPath(raw: string | undefined): string {
  const url = raw ?? "file:./dev.db";
  const file = url.startsWith("file:") ? url.slice("file:".length) : url;
  return path.isAbsolute(file)
    ? file
    : path.join(/* turbopackIgnore: true */ process.cwd(), file);
}

export function createPrismaClient(databaseUrl?: string): PrismaClient {
  const adapter = new PrismaBetterSqlite3({ url: resolveDbPath(databaseUrl) });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { __mlPrisma?: PrismaClient };

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.__mlPrisma) {
    globalForPrisma.__mlPrisma = createPrismaClient(process.env.DATABASE_URL);
  }
  return globalForPrisma.__mlPrisma;
}