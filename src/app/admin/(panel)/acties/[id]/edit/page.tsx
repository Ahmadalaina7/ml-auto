import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { getPrisma } from "@/lib/server/db";
import { ActieForm } from "@/components/ActieForm";
import { updateActieAction } from "@/actions/actie";

export const dynamic = "force-dynamic";

const paramsSchema = z.object({ id: z.coerce.number().int().positive() });

export default async function EditActiePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const parsed = paramsSchema.safeParse({ id: idParam });
  if (!parsed.success) notFound();

  const actie = await getPrisma().actie.findUnique({ where: { id: parsed.data.id } });
  if (!actie) notFound();

  return (
    <div>
      <nav className="mb-4 text-sm text-muted">
        <Link href="/admin/acties" className="underline-offset-4 transition duration-fast hover:text-ink hover:underline">Acties</Link>
        <span className="mx-2">/</span>
        <span>{actie.title}</span>
      </nav>
      <h1 className="font-display text-2xl font-black text-brand">Actie bewerken</h1>
      <div className="mt-6 max-w-3xl rounded-xl border border-surface bg-white p-6 shadow-1">
        <ActieForm
          action={updateActieAction}
          initial={{
            id: actie.id,
            title: actie.title,
            badge: actie.badge,
            summary: actie.summary,
            body: actie.body,
            image: actie.image,
            featured: actie.featured,
            status: actie.status,
            startsAt: actie.startsAt,
            endsAt: actie.endsAt,
          }}
        />
      </div>
    </div>
  );
}