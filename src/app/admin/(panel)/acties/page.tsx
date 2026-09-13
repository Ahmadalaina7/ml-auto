import Link from "next/link";
import { getPrisma } from "@/lib/server/db";
import { ConfirmForm } from "@/components/ConfirmForm";
import { StatusBadge } from "@/components/StatusBadge";
import { deleteActieAction } from "@/actions/actie";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default async function AdminActiesPage() {
  const acties = await getPrisma().actie.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-black text-brand">Acties & promoties</h1>
          <p className="mt-1 text-sm text-muted">{acties.length} acties</p>
        </div>
        <Link
          href="/admin/acties/nieuw"
          className="rounded-md bg-accent px-5 py-2.5 font-black text-brand transition duration-fast hover:bg-accent-dark"
        >
          + Nieuwe actie
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-surface bg-white shadow-1">
        {acties.length > 0 ? (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-surface bg-surface text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Actie</th>
                <th className="px-5 py-3">Badge</th>
                <th className="px-5 py-3">Geldig van/t/m</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Gewijzigd</th>
                <th className="px-5 py-3 text-right">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface">
              {acties.map((actie) => (
                <tr key={actie.id} className="transition duration-fast hover:bg-surface/60">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink">
                      {actie.title}
                      {actie.featured && <span className="ml-2 rounded bg-accent px-1.5 py-0.5 text-xs font-black text-brand">F</span>}
                    </p>
                    <p className="text-xs text-muted">{actie.slug}</p>
                  </td>
                  <td className="px-5 py-4">{actie.badge || "–"}</td>
                  <td className="px-5 py-4 text-muted">
                    {formatDate(actie.startsAt)}
                    {actie.endsAt && <> – {formatDate(actie.endsAt)}</>}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={actie.status} />
                  </td>
                  <td className="px-5 py-4 text-muted">{formatDate(actie.updatedAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/acties/${actie.id}/edit`} className="font-medium text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline">
                        Bewerken
                      </Link>
                      <ConfirmForm message={`Actie "${actie.title}" definitief verwijderen?`} action={deleteActieAction}>
                        <input type="hidden" name="id" value={actie.id} />
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
            Nog geen acties.{" "}
            <Link className="font-black text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline" href="/admin/acties/nieuw">
              Maak je eerste actie →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}