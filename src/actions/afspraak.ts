"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/server/db";
import { logger } from "@/lib/server/logger";
import { isRateLimited } from "@/lib/server/rateLimit";
import { sendNotification } from "@/lib/server/mailer";
import { afspraakSchema } from "@/lib/validator";

export type AfspraakFormState = { success?: boolean; error?: string } | null;

function clientIp(): string {
  return "local";
}

export async function submitAfspraakAction(
  _prev: AfspraakFormState,
  formData: FormData,
): Promise<AfspraakFormState> {
  const parsed = afspraakSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    date: formData.get("date"),
    timeSlot: formData.get("timeSlot"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return { error: "Controleer de ingevulde gegevens (werkplaats, datum en tijdstip)." };
  }

  const input = parsed.data;

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? clientIp();
  if (isRateLimited(`afspraak:${ip}`, 5, 60_000)) {
    logger.warn({ event: "afspraak.locked", ip });
    return { error: "Te veel aanvragen. Probeer het over een minuut opnieuw." };
  }

  try {
    await getPrisma().afspraak.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        service: input.service,
        date: input.date,
        timeSlot: input.timeSlot,
        notes: input.notes,
      },
    });
    logger.info({ event: "afspraak.created", email: input.email, ip });
  } catch (err) {
    logger.error({ event: "afspraak.error", err: (err as Error).message });
    return { error: "De afspraak kon niet worden opgeslagen. Probeer het later opnieuw." };
  }

  revalidatePath("/admin/afspraken");
  void sendNotification({
    kind: "afspraak",
    name: input.name,
    email: input.email,
    phone: input.phone,
    summary: `${input.service} op ${input.date} om ${input.timeSlot} uur. Opmerkingen: ${input.notes || "-"}`,
  });

  return { success: true };
}