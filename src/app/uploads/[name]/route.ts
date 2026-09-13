import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import { readFile } from "node:fs/promises";

export const dynamic = "force-dynamic";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

const NAME_PATTERN = /^[\w-]+\.(jpg|jpeg|png|webp)$/i;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  if (!NAME_PATTERN.test(name)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const uploadsDir = path.resolve(process.cwd(), process.env.DATA_DIR ?? "data", "uploads");
  const filePath = path.resolve(uploadsDir, name);

  // Guard tegen path-traversal buiten de uploads-map.
  if (!filePath.startsWith(path.resolve(uploadsDir) + path.sep)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const bytes = await readFile(filePath);
    const contentType = CONTENT_TYPES[path.extname(name).toLowerCase()] ?? "application/octet-stream";
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}