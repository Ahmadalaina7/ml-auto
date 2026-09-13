import Link from "next/link";
import { getPrisma } from "@/lib/server/db";
import { ConfirmForm } from "@/components/ConfirmForm";
import { StatusBadge } from "@/components/StatusBadge";
import { deleteOccasionAction } from "@/actions/occasion";
import { formatKm, formatPrice } from "@/lib/occasion";

export const dynamic = "force-dynamic";

export default async function AdminOccasionsPage() {
  const occasions = await getPrisma().occasion.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-black text-brand">Occasions</h1>
          <p className="mt-1 text-sm text-muted">{occasions.length} advertenties</p>
        </div>
        <Link
          href="/admin/occasions/nieuw"
          className="rounded-md bg-accent px-5 py-2.5 font-black text-white transition duration-fast hover:bg-accent-dark"
        >
          + Nieuwe occasion
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-surface bg-white shadow-1">
        {occasions.length > 0 ? (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-surface bg-surface text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Advertentie</th>
                <th className="px-5 py-3">Variant</th>
                <th className="px-5 py-3">Bouwjaar</th>
                <th className="px-5 py-3">Km</th>
                <th className="px-5 py-3">Prijs</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface">
              {occasions.map((occasion) => (
                <tr key={occasion.id} className="transition duration-fast hover:bg-surface/60">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink">
                      {occasion.title}
                      {occasion.featured && <span className="ml-2 rounded bg-accent px-1.5 py-0.5 text-xs font-black text-white">F</span>}
                    </p>
                    <p className="text-xs text-muted">
                      {occasion.brand} {occasion.model} · {occasion.slug}
                    </p>
                  </td>
                  <td className="px-5 py-4">{occasion.variant || "–"}</td>
                  <td className="px-5 py-4">{occasion.year}</td>
                  <td className="px-5 py-4">{formatKm(occasion.mileageKm)}</td>
                  <td className="px-5 py-4 font-semibold">{formatPrice(occasion.priceCents)}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={occasion.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/occasions/${occasion.slug}`} target="_blank" className="font-medium text-muted transition duration-fast hover:text-brand">
                        Bekijk
                      </Link>
                      <Link href={`/admin/occasions/${occasion.id}/edit`} className="font-medium text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline">
                        Bewerken
                      </Link>
                      <ConfirmForm message={`Advertentie "${occasion.title}" definitief verwijderen?`} action={deleteOccasionAction}>
                        <input type="hidden" name="id" value={occasion.id} />
                        <button type="submit" className="font-medium text-error transition duration-fast hover:text-brand">
                          Verwijderen
                        </button>
                      </ConfirmForm>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-5 py-10 text-center text-muted">
            Nog geen occasions.{" "}
            <Link className="font-black text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline" href="/admin/occasions/nieuw">
              Voeg je eerste toe →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}