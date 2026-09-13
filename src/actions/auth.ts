"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/server/db";
import { logger } from "@/lib/server/logger";
import { isRateLimited } from "@/lib/server/rateLimit";
import {
  clearSessionCookie,
  setSessionCookie,
  signSession,
  verifyPassword,
} from "@/lib/server/auth";
import { loginSchema } from "@/lib/validator";

export type AuthState = { error?: string; email?: string } | null;

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Ongeldig e-mailadres of wachtwoord." };
  }

  const { email, password } = parsed.data;

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(`login:${ip}`, 10, 60_000)) {
    logger.warn({ event: "auth.locked", email, ip });
    return { error: "Te veel inlogpogingen. Probeer het over een minuut opnieuw." };
  }

  const user = await getPrisma().adminUser.findUnique({ where: { email: email.toLowerCase() } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    logger.warn({ event: "auth.failed", email, ip });
    return { error: "Ongeldig e-mailadres of wachtwoord." };
  }

  const token = await signSession(String(user.id));
  await setSessionCookie(token);
  logger.info({ event: "auth.login", adminId: user.id, ip });
  redirect("/admin/occasions");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  logger.info({ event: "auth.logout" });
  redirect("/admin/login");
}