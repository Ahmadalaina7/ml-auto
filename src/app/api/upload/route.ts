import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { isAdmin } from "@/lib/server/auth";
import { logger } from "@/lib/server/logger";

export const dynamic = "force-dynamic";

const ALLOWED_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILES = 10;

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Niet geautoriseerd." }, { status: 401 });
  }

  const uploadsDir = path.resolve(process.cwd(), process.env.DATA_DIR ?? "data", "uploads");

  const formData = await request.formData();
  const files = formData.getAll("files").filter((f): f is File => f instanceof File);

  if (files.length === 0) {
    return NextResponse.json({ error: "Geen bestanden geselecteerd." }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: "Maximaal 10 bestanden per keer." }, { status: 400 });
  }

  // Twee-pass validatie: alles controleren vóór het schrijven van een enkel bestand.
  for (const file of files) {
    if (!(file.type in ALLOWED_MIME)) {
      return NextResponse.json(
        { error: `"${file.name}": alleen JPG, PNG of WEBP is toegestaan.` },
        { status: 400 },
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: `"${file.name}" is groter dan 5 MB.` }, { status: 400 });
    }
  }

  const uploaded: string[] = [];
  try {
    await mkdir(uploadsDir, { recursive: true });
    for (const file of files) {
      const bytes = Buffer.from(await file.arrayBuffer());
      const filename = `${randomUUID()}${ALLOWED_MIME[file.type]}`;
      await writeFile(path.join(uploadsDir, filename), bytes);
      uploaded.push(`/uploads/${filename}`);
    }
  } catch (err) {
    logger.error({ event: "upload.error", err: (err as Error).message });
    return NextResponse.json({ error: "Upload mislukt. Probeer het opnieuw." }, { status: 500 });
  }

  logger.info({ event: "upload.ok", count: uploaded.length });
  return NextResponse.json({ images: uploaded });
}