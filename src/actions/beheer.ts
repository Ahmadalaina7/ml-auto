"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getPrisma } from "@/lib/server/db";
import { logger } from "@/lib/server/logger";
import { requireAdmin } from "@/lib/server/auth";

const idSchema = z.coerce.number().int().positive();

type StatusMap = Record<string, string>;

function statusFor(kind: string): string {
  switch (kind) {
    case "afspraak":
      return "Done";
    default:
      return "Handled";
  }
}

async function setInboxStatus(kind: string, id: number, status: string): Promise<void> {
  const db = getPrisma();
  switch (kind) {
    case "afspraak":
      await db.afspraak.update({ where: { id }, data: { status } });
      return;
    case "taxatie":
      await db.taxatie.update({ where: { id }, data: { status } });
      return;
    default:
      await db.contactMessage.update({ where: { id }, data: { status } });
  }
}

async function deleteInboxItem(kind: string, id: number): Promise<void> {
  const db = getPrisma();
  switch (kind) {
    case "afspraak":
      await db.afspraak.delete({ where: { id } });
      return;
    case "taxatie":
      await db.taxatie.delete({ where: { id } });
      return;
    default:
      await db.contactMessage.delete({ where: { id } });
  }
}

export async function markHandledAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const kind = (formData.get("kind") as string | null) ?? "bericht";
  const id = idSchema.safeParse(formData.get("id"));
  if (!id.success) {
    logger.warn({ event: "message.handled.invalid_id" });
    return;
  }

  try {
    await setInboxStatus(kind, id.data, statusFor(kind));
    logger.info({ event: "message.handled", kind, id: id.data });
  } catch (err) {
    logger.error({ event: "message.handled.error", kind, id: id.data, err: (err as Error).message });
  }

  revalidatePath(kindToPath(kind));
}

export async function reopenMessageAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const kind = (formData.get("kind") as string | null) ?? "bericht";
  const id = idSchema.safeParse(formData.get("id"));
  if (!id.success) {
    logger.warn({ event: "message.reopen.invalid_id" });
    return;
  }

  try {
    await setInboxStatus(kind, id.data, "New");
    logger.info({ event: "message.reopened", kind, id: id.data });
  } catch (err) {
    logger.error({ event: "message.reopen.error", kind, id: id.data, err: (err as Error).message });
  }

  revalidatePath(kindToPath(kind));
}

export async function deleteMessageAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const kind = (formData.get("kind") as string | null) ?? "bericht";
  const id = idSchema.safeParse(formData.get("id"));
  if (!id.success) {
    logger.warn({ event: "message.delete.invalid_id" });
    return;
  }

  try {
    await deleteInboxItem(kind, id.data);
    logger.info({ event: "message.deleted", kind, id: id.data });
  } catch (err) {
    logger.error({ event: "message.delete.error", kind, id: id.data, err: (err as Error).message });
  }

  revalidatePath(kindToPath(kind));
}

export async function setAfspraakStatus(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = idSchema.safeParse(formData.get("id"));
  const status = z
    .enum(["New", "Confirmed", "Done", "Cancelled"])
    .safeParse(formData.get("status"));
  if (!id.success || !status.success) {
    logger.warn({ event: "afspraak.status.invalid" });
    return;
  }

  try {
    await getPrisma().afspraak.update({ where: { id: id.data }, data: { status: status.data } });
    logger.info({ event: "afspraak.status", id: id.data, status: status.data });
  } catch (err) {
    logger.error({ event: "afspraak.status.error", id: id.data, err: (err as Error).message });
  }

  revalidatePath("/admin/afspraken");
}

function kindToPath(kind: string): string {
  switch (kind) {
    case "afspraak":
      return "/admin/afspraken";
    case "taxatie":
      return "/admin/taxaties";
    default:
      return "/admin/berichten";
  }
}

// Re-export type om admin-pagina's een uniforme statuskaart te geven.
export type { StatusMap };