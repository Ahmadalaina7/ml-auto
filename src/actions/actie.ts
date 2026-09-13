"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getPrisma } from "@/lib/server/db";
import { logger } from "@/lib/server/logger";
import { requireAdmin } from "@/lib/server/auth";
import { slugify } from "@/lib/occasion";
import { actieInputSchema } from "@/lib/validator";

const idSchema = z.coerce.number().int().positive();

export type ActieFormState = { error?: string } | null;

type Db = ReturnType<typeof getPrisma>;

function parseActieForm(formData: FormData) {
  return actieInputSchema.safeParse({
    title: formData.get("title"),
    badge: formData.get("badge"),
    summary: formData.get("summary"),
    body: formData.get("body"),
    image: formData.get("image"),
    featured: formData.get("featured"),
    status: formData.get("status"),
    startsAt: formData.get("startsAt"),
    endsAt: formData.get("endsAt"),
  });
}

async function nextSlug(title: string, db: Db, excludeId?: number): Promise<string> {
  const base = slugify(title) || "actie";
  let slug = base;
  let i = 1;
  for (;;) {
    const found = await db.actie.findUnique({ where: { slug } });
    const isSelf = found && excludeId !== undefined && found.id === excludeId;
    if (!found || isSelf) return slug;
    slug = `${base}-${i}`;
    i += 1;
  }
}

export async function createActieAction(
  _prev: ActieFormState,
  formData: FormData,
): Promise<ActieFormState> {
  await requireAdmin();

  const parsed = parseActieForm(formData);
  if (!parsed.success) {
    return { error: "Controleer de ingevulde velden." };
  }

  const input = parsed.data;
  const db = getPrisma();

  try {
    await db.actie.create({
      data: {
        slug: await nextSlug(input.title, db),
        title: input.title,
        badge: input.badge,
        summary: input.summary,
        body: input.body,
        image: input.image,
        featured: input.featured,
        status: input.status,
        startsAt: new Date(input.startsAt),
        endsAt: input.endsAt ? new Date(input.endsAt) : null,
      },
    });
    logger.info({ event: "actie.created", title: input.title });
  } catch (err) {
    logger.error({ event: "actie.create.error", err: (err as Error).message });
    return { error: "Opslaan mislukt. Probeer het opnieuw." };
  }

  revalidatePath("/acties");
  revalidatePath("/");
  redirect("/admin/acties");
}

export async function updateActieAction(
  _prev: ActieFormState,
  formData: FormData,
): Promise<ActieFormState> {
  await requireAdmin();

  const id = idSchema.safeParse(formData.get("id"));
  if (!id.success) {
    return { error: "Ongeldige actie-id." };
  }

  const parsed = parseActieForm(formData);
  if (!parsed.success) {
    return { error: "Controleer de ingevulde velden." };
  }

  const input = parsed.data;
  const db = getPrisma();

  try {
    await db.actie.update({
      where: { id: id.data },
      data: {
        slug: await nextSlug(input.title, db, id.data),
        title: input.title,
        badge: input.badge,
        summary: input.summary,
        body: input.body,
        image: input.image,
        featured: input.featured,
        status: input.status,
        startsAt: new Date(input.startsAt),
        endsAt: input.endsAt ? new Date(input.endsAt) : null,
      },
    });
    logger.info({ event: "actie.updated", id: id.data });
  } catch (err) {
    logger.error({ event: "actie.update.error", id: id.data, err: (err as Error).message });
    return { error: "Opslaan mislukt. Probeer het opnieuw." };
  }

  revalidatePath("/acties");
  revalidatePath("/");
  redirect("/admin/acties");
}

export async function deleteActieAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = idSchema.safeParse(formData.get("id"));
  if (!id.success) {
    logger.warn({ event: "actie.delete.invalid_id" });
    return;
  }

  try {
    await getPrisma().actie.delete({ where: { id: id.data } });
    logger.info({ event: "actie.deleted", id: id.data });
  } catch (err) {
    logger.error({ event: "actie.delete.error", id: id.data, err: (err as Error).message });
  }

  revalidatePath("/acties");
  revalidatePath("/");
  redirect("/admin/acties");
}