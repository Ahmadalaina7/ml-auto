"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getPrisma } from "@/lib/server/db";
import { logger } from "@/lib/server/logger";
import { requireAdmin } from "@/lib/server/auth";
import { jsonFeatures, jsonImages, slugify } from "@/lib/occasion";
import { occasionInputSchema } from "@/lib/validator";

const idSchema = z.coerce.number().int().positive();

export type OccasionFormState = { error?: string } | null;

type Db = ReturnType<typeof getPrisma>;

function parseOccasionForm(formData: FormData) {
  return occasionInputSchema.safeParse({
    brand: formData.get("brand"),
    model: formData.get("model"),
    variant: formData.get("variant"),
    bodyType: formData.get("bodyType"),
    title: formData.get("title"),
    year: formData.get("year"),
    mileageKm: formData.get("mileageKm"),
    fuel: formData.get("fuel"),
    transmission: formData.get("transmission"),
    powerKw: formData.get("powerKw"),
    doors: formData.get("doors"),
    color: formData.get("color"),
    price: formData.get("price"),
    monthlyFrom: formData.get("monthlyFrom"),
    description: formData.get("description"),
    features: formData.getAll("features"),
    featured: formData.get("featured"),
    status: formData.get("status"),
    images: formData.getAll("images"),
  });
}

async function nextSlug(title: string, db: Db, excludeId?: number): Promise<string> {
  const base = slugify(title) || "occasion";
  let slug = base;
  let i = 1;
  for (;;) {
    const found = await db.occasion.findUnique({ where: { slug } });
    const isSelf = found && excludeId !== undefined && found.id === excludeId;
    if (!found || isSelf) return slug;
    slug = `${base}-${i}`;
    i += 1;
  }
}

export async function createOccasionAction(
  _prev: OccasionFormState,
  formData: FormData,
): Promise<OccasionFormState> {
  await requireAdmin();

  const parsed = parseOccasionForm(formData);
  if (!parsed.success) {
    return { error: "Controleer de ingevulde velden." };
  }

  const input = parsed.data;
  const db = getPrisma();

  try {
    await db.occasion.create({
      data: {
        slug: await nextSlug(input.title, db),
        brand: input.brand,
        model: input.model,
        variant: input.variant,
        bodyType: input.bodyType,
        title: input.title,
        year: input.year,
        mileageKm: input.mileageKm,
        fuel: input.fuel,
        transmission: input.transmission,
        powerKw: input.powerKw,
        doors: input.doors,
        color: input.color,
        priceCents: Math.round(input.price * 100),
        monthlyFromCents: Math.round(input.monthlyFrom * 100),
        description: input.description,
        features: jsonFeatures(input.features),
        images: jsonImages(input.images),
        featured: input.featured,
        status: input.status,
      },
    });
    logger.info({ event: "occasion.created", title: input.title });
  } catch (err) {
    logger.error({ event: "occasion.create.error", err: (err as Error).message });
    return { error: "Opslaan mislukt. Probeer het opnieuw." };
  }

  revalidatePath("/occasions");
  revalidatePath("/");
  redirect("/admin/occasions");
}

export async function updateOccasionAction(
  _prev: OccasionFormState,
  formData: FormData,
): Promise<OccasionFormState> {
  await requireAdmin();

  const id = idSchema.safeParse(formData.get("id"));
  if (!id.success) {
    return { error: "Ongeldige occasion-id." };
  }

  const parsed = parseOccasionForm(formData);
  if (!parsed.success) {
    return { error: "Controleer de ingevulde velden." };
  }

  const input = parsed.data;
  const db = getPrisma();

  try {
    await db.occasion.update({
      where: { id: id.data },
      data: {
        slug: await nextSlug(input.title, db, id.data),
        brand: input.brand,
        model: input.model,
        variant: input.variant,
        bodyType: input.bodyType,
        title: input.title,
        year: input.year,
        mileageKm: input.mileageKm,
        fuel: input.fuel,
        transmission: input.transmission,
        powerKw: input.powerKw,
        doors: input.doors,
        color: input.color,
        priceCents: Math.round(input.price * 100),
        monthlyFromCents: Math.round(input.monthlyFrom * 100),
        description: input.description,
        features: jsonFeatures(input.features),
        images: jsonImages(input.images),
        featured: input.featured,
        status: input.status,
      },
    });
    logger.info({ event: "occasion.updated", id: id.data });
  } catch (err) {
    logger.error({ event: "occasion.update.error", id: id.data, err: (err as Error).message });
    return { error: "Opslaan mislukt. Probeer het opnieuw." };
  }

  revalidatePath("/occasions");
  revalidatePath("/");
  redirect("/admin/occasions");
}

export async function deleteOccasionAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = idSchema.safeParse(formData.get("id"));
  if (!id.success) {
    logger.warn({ event: "occasion.delete.invalid_id" });
    return;
  }

  try {
    await getPrisma().occasion.delete({ where: { id: id.data } });
    logger.info({ event: "occasion.deleted", id: id.data });
  } catch (err) {
    logger.error({ event: "occasion.delete.error", id: id.data, err: (err as Error).message });
  }

  revalidatePath("/occasions");
  revalidatePath("/");
  redirect("/admin/occasions");
}