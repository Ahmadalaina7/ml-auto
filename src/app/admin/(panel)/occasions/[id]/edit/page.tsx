import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { getPrisma } from "@/lib/server/db";
import { parseFeatures, parseImages } from "@/lib/occasion";
import { OccasionForm } from "@/components/OccasionForm";
import { updateOccasionAction } from "@/actions/occasion";

export const dynamic = "force-dynamic";

const paramsSchema = z.object({ id: z.coerce.number().int().positive() });

export default async function EditOccasionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const parsed = paramsSchema.safeParse({ id: idParam });
  if (!parsed.success) notFound();

  const occasion = await getPrisma().occasion.findUnique({ where: { id: parsed.data.id } });
  if (!occasion) notFound();

  return (
    <div>
      <nav className="mb-4 text-sm text-muted">
        <Link href="/admin/occasions" className="underline-offset-4 transition duration-fast hover:text-ink hover:underline">Occasions</Link>
        <span className="mx-2">/</span>
        <span>{occasion.title}</span>
      </nav>
      <h1 className="font-display text-2xl font-black text-brand">Occasion bewerken</h1>
      <div className="mt-6 max-w-3xl rounded-xl border border-surface bg-white p-6 shadow-1">
        <OccasionForm
          action={updateOccasionAction}
          initial={{
            id: occasion.id,
            brand: occasion.brand,
            model: occasion.model,
            variant: occasion.variant,
            bodyType: occasion.bodyType,
            title: occasion.title,
            year: occasion.year,
            mileageKm: occasion.mileageKm,
            fuel: occasion.fuel,
            transmission: occasion.transmission,
            powerKw: occasion.powerKw,
            doors: occasion.doors,
            color: occasion.color,
            priceEuros: occasion.priceCents / 100,
            monthlyFromEuros: occasion.monthlyFromCents / 100,
            description: occasion.description,
            features: parseFeatures(occasion.features),
            images: parseImages(occasion.images),
            featured: occasion.featured,
            status: occasion.status,
          }}
        />
      </div>
    </div>
  );
}