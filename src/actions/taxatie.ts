"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getPrisma } from "@/lib/server/db";
import { logger } from "@/lib/server/logger";
import { isRateLimited } from "@/lib/server/rateLimit";
import { sendNotification } from "@/lib/server/mailer";
import { taxatieSchema } from "@/lib/validator";

export type TaxatieFormState = { success?: boolean; error?: string } | null;

export async function submitTaxatieAction(
  _prev: TaxatieFormState,
  formData: FormData,
): Promise<TaxatieFormState> {
  const parsed = taxatieSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    brand: formData.get("brand"),
    model: formData.get("model"),
    year: formData.get("year"),
    mileageKm: formData.get("mileageKm"),
    fuel: formData.get("fuel"),
    condition: formData.get("condition"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return { error: "Controleer de ingevulde gegevens (auto en contactgegevens)." };
  }

  const input = parsed.data;

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(`taxatie:${ip}`, 5, 60_000)) {
    logger.warn({ event: "taxatie.locked", ip });
    return { error: "Te veel aanvragen. Probeer het over een minuut opnieuw." };
  }

  try {
    await getPrisma().taxatie.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        brand: input.brand,
        model: input.model,
        year: input.year,
        mileageKm: input.mileageKm,
        fuel: input.fuel,
        condition: input.condition,
        notes: input.notes,
      },
    });
    logger.info({ event: "taxatie.created", email: input.email, ip });
  } catch (err) {
    logger.error({ event: "taxatie.error", err: (err as Error).message });
    return { error: "De taxatie-aanvraag kon niet worden opgeslagen. Probeer het later opnieuw." };
  }

  revalidatePath("/admin/taxaties");
  void sendNotification({
    kind: "taxatie",
    name: input.name,
    email: input.email,
    phone: input.phone,
    summary: `${input.brand} ${input.model} (${input.year}, ${input.mileageKm} km, ${input.fuel}, staat: ${input.condition}). Opmerkingen: ${input.notes || "-"}`,
  });

  return { success: true };
}