"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/server/db";
import { logger } from "@/lib/server/logger";
import { isRateLimited } from "@/lib/server/rateLimit";
import { sendNotification } from "@/lib/server/mailer";
import { contactSchema } from "@/lib/validator";

export type ContactFormState = { success?: boolean; error?: string } | null;

export async function submitContactAction(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: "Controleer de ingevulde gegevens (bericht minimaal 10 tekens)." };
  }

  const { name, email, phone, subject, message } = parsed.data;

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(`contact:${ip}`, 5, 60_000)) {
    logger.warn({ event: "contact.locked", ip });
    return { error: "Te veel berichten. Probeer het over een minuut opnieuw." };
  }

  try {
    await getPrisma().contactMessage.create({
      data: { name, email, phone, subject, message },
    });
    logger.info({ event: "contact.created", email, ip });
  } catch (err) {
    logger.error({ event: "contact.error", err: (err as Error).message });
    return { error: "Het bericht kon niet worden opgeslagen. Probeer het later opnieuw." };
  }

  revalidatePath("/admin/berichten");
  void sendNotification({ kind: "contact", name, email, message });

  return { success: true };
}