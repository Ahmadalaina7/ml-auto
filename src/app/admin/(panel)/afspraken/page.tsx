import { getPrisma } from "@/lib/server/db";
import { ConfirmForm } from "@/components/ConfirmForm";
import { StatusBadge } from "@/components/StatusBadge";
import { deleteMessageAction, setAfspraakStatus } from "@/actions/beheer";
import { AFRSPAAK_STATUSEN } from "@/lib/labels";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default async function AdminAfsprakenPage() {
  const afspraken = await getPrisma().afspraak.findMany({
    orderBy: [{ status: "asc" }, { date: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-black text-brand">Werkplaatsafspraken</h1>
      <p className="mt-1 text-sm text-muted">{afspraken.length} afspraken</p>

      <div className="mt-6 space-y-4">
        {afspraken.length > 0 ? (
          afspraken.map((afspraak) => (
            <article key={afspraak.id} className="rounded-xl border border-surface bg-white p-5 shadow-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">
                    {afspraak.service}
                    <span className="ml-2 rounded bg-brand px-1.5 py-0.5 text-xs font-black text-white">
                      {afspraak.date} om {afspraak.timeSlot} uur
                    </span>
                  </p>
                  <p className="text-sm text-muted">
                    {afspraak.name}
                    {" · "}
                    <a className="text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline" href={`mailto:${afspraak.email}`}>
                      {afspraak.email}
                    </a>
                    {afspraak.phone && <> · tel. <a className="text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline" href={`tel:${afspraak.phone}`}>{afspraak.phone}</a></>}
                    {" · "}{formatDate(afspraak.createdAt)}
                  </p>
                </div>
                <StatusBadge status={afspraak.status} />
              </div>

              {afspraak.notes && (
                <p className="mt-3 rounded-md bg-sand px-4 py-3 text-sm leading-relaxed text-ink">
                  {afspraak.notes}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <form action={setAfspraakStatus}>
                  <input type="hidden" name="id" value={afspraak.id} />
                  <select
                    name="status"
                    defaultValue={afspraak.status}
                    onChange={(e) => e.target.form?.requestSubmit()}
                    className="rounded-md border border-brand/20 bg-white px-3 py-1.5 text-sm text-ink outline-none transition duration-fast focus:border-accent"
                  >
                    {AFRSPAAK_STATUSEN.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </form>
                <ConfirmForm message={`Afspraak van ${afspraak.name} definitief verwijderen?`} action={deleteMessageAction}>
                  <input type="hidden" name="id" value={afspraak.id} />
                  <input type="hidden" name="kind" value="afspraak" />
                  <button type="submit" className="rounded-md border border-error-border bg-white px-4 py-1.5 text-sm font-semibold text-error transition duration-fast hover:bg-error-soft">
                    Verwijderen
                  </button>
                </ConfirmForm>
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-brand/20 bg-white p-10 text-center text-muted">
            Nog geen werkplaatsafspraken ontvangen.
          </p>
        )}
      </div>
    </div>
  );
}