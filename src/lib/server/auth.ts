import { cookies } from "next/headers";
import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/server/db";
import { logger } from "@/lib/server/logger";
import { requireAuthSecret } from "@/lib/env";

export const SESSION_COOKIE = "ml_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 uur

function secretKey(): Uint8Array {
  return new TextEncoder().encode(requireAuthSecret());
}

export function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return compare(password, passwordHash);
}

export async function signSession(adminId: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(adminId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

export async function readSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

export async function verifySessionToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

export async function getAdminId(): Promise<string | null> {
  const token = await readSessionToken();
  if (!token) return null;
  const sub = await verifySessionToken(token);
  if (!sub) {
    logger.warn({ event: "auth.jwt.invalid" });
  }
  return sub;
}

export async function getAdminUser() {
  const id = await getAdminId();
  if (!id) return null;
  const admin = await getPrisma().adminUser.findUnique({
    where: { id: Number.parseInt(id, 10) },
    select: { id: true, email: true },
  });
  return admin;
}

export async function isAdmin(): Promise<boolean> {
  return (await getAdminUser()) !== null;
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}