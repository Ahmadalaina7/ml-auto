import { getPrisma } from "@/lib/server/db";
import { ConfirmForm } from "@/components/ConfirmForm";
import { StatusBadge } from "@/components/StatusBadge";
import { deleteMessageAction, markHandledAction, reopenMessageAction } from "@/actions/beheer";
import { formatKm } from "@/lib/occasion";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default async function AdminTaxatiesPage() {
  const taxaties = await getPrisma().taxatie.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-black text-brand">Taxatie-aanvragen</h1>
      <p className="mt-1 text-sm text-muted">{taxaties.length} aanvragen</p>

      <div className="mt-6 space-y-4">
        {taxaties.length > 0 ? (
          taxaties.map((taxatie) => (
            <article key={taxatie.id} className="rounded-xl border border-surface bg-white p-5 shadow-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">
                    {taxatie.brand} {taxatie.model}
                    <span className="ml-2 rounded bg-brand px-1.5 py-0.5 text-xs font-black text-white">
                      {taxatie.year}
                    </span>
                  </p>
                  <p className="text-sm text-muted">
                    {taxatie.name}
                    {" · "}
                    <a className="text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline" href={`mailto:${taxatie.email}`}>
                      {taxatie.email}
                    </a>
                    {taxatie.phone && <> · tel. <a className="text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline" href={`tel:${taxatie.phone}`}>{taxatie.phone}</a></>}
                    {" · "}{formatDate(taxatie.createdAt)}
                  </p>
                </div>
                <StatusBadge status={taxatie.status} />
              </div>

              {/* Samenvatting in dezelfde layout als een regel in een tabel */}
              <p className="mt-3 text-sm leading-relaxed text-ink">
                {formatKm(taxatie.mileageKm)} · {taxatie.fuel || "brandstof onbekend"} · staat: {taxatie.condition || "onbekend"}
              </p>
              {taxatie.notes && (
                <p className="mt-3 rounded-md bg-sand px-4 py-3 text-sm leading-relaxed text-ink">
                  {taxatie.notes}
                </p>
              )}

              <div className="mt-4 flex items-center gap-3">
                {taxatie.status === "New" ? (
                  <form action={markHandledAction}>
                    <input type="hidden" name="id" value={taxatie.id} />
                    <input type="hidden" name="kind" value="taxatie" />
                    <button
                      type="submit"
                      className="rounded-md bg-accent px-4 py-1.5 text-sm font-black text-white transition duration-fast hover:bg-accent-dark"
                    >
                      Markeer als afgehandeld
                    </button>
                  </form>
                ) : (
                  <form action={reopenMessageAction}>
                    <input type="hidden" name="id" value={taxatie.id} />
                    <input type="hidden" name="kind" value="taxatie" />
                    <button
                      type="submit"
                      className="rounded-md border border-brand/20 bg-white px-4 py-1.5 text-sm font-semibold text-ink transition duration-fast hover:bg-surface"
                    >
                      Heropenen
                    </button>
                  </form>
                )}
                <ConfirmForm message={`Taxatie-aanvraag van ${taxatie.name} definitief verwijderen?`} action={deleteMessageAction}>
                  <input type="hidden" name="id" value={taxatie.id} />
                  <input type="hidden" name="kind" value="taxatie" />
                  <button type="submit" className="rounded-md border border-error-border bg-white px-4 py-1.5 text-sm font-semibold text-error transition duration-fast hover:bg-error-soft">
                    Verwijderen
                  </button>
                </ConfirmForm>
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-brand/20 bg-white p-10 text-center text-muted">
            Nog geen taxatie-aanvragen ontvangen.
          </p>
        )}
      </div>
    </div>
  );
}