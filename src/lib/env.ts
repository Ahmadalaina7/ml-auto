import { z } from "zod";

export const SMTP_SCHEMA = z.object({
  host: z.string().min(1),
  port: z.coerce.number().int().min(1).max(65535).default(587),
  secure: z
    .union([z.boolean(), z.literal("true"), z.literal("false")])
    .transform((v) => v === true || v === "true")
    .default(false),
  user: z.string().optional(),
  pass: z.string().optional(),
  from: z.string().min(1).default("noreply@mlauto.nl"),
  to: z.string().min(1),
});

export type SmtpConfig = z.infer<typeof SMTP_SCHEMA>;

export function requireAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET ontbreekt of is korter dan 32 tekens.");
  }
  return secret;
}

export function loadSmtpConfig(): SmtpConfig | null {
  const raw = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
  } as Record<string, unknown>;

  const parsed = SMTP_SCHEMA.safeParse(raw);
  return parsed.success ? parsed.data : null;
}