import { getPrisma } from "@/lib/server/db";
import { ConfirmForm } from "@/components/ConfirmForm";
import { StatusBadge } from "@/components/StatusBadge";
import { deleteMessageAction, markHandledAction, reopenMessageAction } from "@/actions/beheer";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default async function AdminMessagesPage() {
  const messages = await getPrisma().contactMessage.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-black text-brand">Contactberichten</h1>
      <p className="mt-1 text-sm text-muted">{messages.length} berichten</p>

      <div className="mt-6 space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <article key={message.id} className="rounded-xl border border-surface bg-white p-5 shadow-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{message.name}</p>
                  <p className="text-sm text-muted">
                    <a className="text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline" href={`mailto:${message.email}`}>
                      {message.email}
                    </a>
                    {message.phone && <> · tel. <a className="text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline" href={`tel:${message.phone}`}>{message.phone}</a></>}
                    {" · "}{formatDate(message.createdAt)}
                  </p>
                  {message.subject && (
                    <p className="mt-1 text-sm font-bold text-brand">{message.subject}</p>
                  )}
                </div>
                <StatusBadge status={message.status} />
              </div>

              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink">
                {message.message}
              </p>

              <div className="mt-4 flex items-center gap-3">
                {message.status === "New" ? (
                  <form action={markHandledAction}>
                    <input type="hidden" name="id" value={message.id} />
                    <input type="hidden" name="kind" value="bericht" />
                    <button
                      type="submit"
                      className="rounded-md bg-accent px-4 py-1.5 text-sm font-black text-white transition duration-fast hover:bg-accent-dark"
                    >
                      Markeer als afgehandeld
                    </button>
                  </form>
                ) : (
                  <form action={reopenMessageAction}>
                    <input type="hidden" name="id" value={message.id} />
                    <input type="hidden" name="kind" value="bericht" />
                    <button
                      type="submit"
                      className="rounded-md border border-brand/20 bg-white px-4 py-1.5 text-sm font-semibold text-ink transition duration-fast hover:bg-surface"
                    >
                      Heropenen
                    </button>
                  </form>
                )}
                <ConfirmForm message={`Bericht van ${message.name} definitief verwijderen?`} action={deleteMessageAction}>
                  <input type="hidden" name="id" value={message.id} />
                  <input type="hidden" name="kind" value="bericht" />
                  <button type="submit" className="rounded-md border border-error-border bg-white px-4 py-1.5 text-sm font-semibold text-error transition duration-fast hover:bg-error-soft">
                    Verwijderen
                  </button>
                </ConfirmForm>
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-brand/20 bg-white p-10 text-center text-muted">
            Nog geen contactberichten ontvangen.
          </p>
        )}
      </div>
    </div>
  );
}