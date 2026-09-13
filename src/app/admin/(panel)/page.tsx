import Link from "next/link";
import { getPrisma } from "@/lib/server/db";
import { StatusBadge } from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default async function AdminDashboardPage() {
  const db = getPrisma();
  const [
    occasionCount,
    publishedCount,
    draftCount,
    actieCount,
    newMessages,
    newAfspraken,
    newTaxaties,
    recentMessages,
  ] = await Promise.all([
    db.occasion.count(),
    db.occasion.count({ where: { status: "Published" } }),
    db.occasion.count({ where: { status: "Draft" } }),
    db.actie.count(),
    db.contactMessage.count({ where: { status: "New" } }),
    db.afspraak.count({ where: { status: "New" } }),
    db.taxatie.count({ where: { status: "New" } }),
    db.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "Occasions", value: occasionCount, href: "/admin/occasions" },
    { label: "Gepubliceerd", value: publishedCount, href: "/admin/occasions" },
    { label: "Concept", value: draftCount, href: "/admin/occasions" },
    { label: "Acties", value: actieCount, href: "/admin/acties" },
    { label: "Nieuwe berichten", value: newMessages, href: "/admin/berichten" },
    { label: "Nieuwe afspraken", value: newAfspraken, href: "/admin/afspraken" },
    { label: "Nieuwe taxaties", value: newTaxaties, href: "/admin/taxaties" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-black text-brand">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Overzicht van het MLAuto beheerpanel</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-surface bg-white p-5 shadow-1 transition duration-fast hover:-translate-y-0.5 hover:shadow-2"
          >
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-1 text-3xl font-black text-brand">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-brand">Recente berichten</h2>
            <Link href="/admin/berichten" className="text-sm font-black text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline">
              Alle berichten →
            </Link>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-surface bg-white shadow-1">
            {recentMessages.length > 0 ? (
              <ul className="divide-y divide-surface">
                {recentMessages.map((message) => (
                  <li key={message.id} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">{message.subject || message.name}</p>
                      <p className="truncate text-sm text-muted">
                        {message.name} · {message.email}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 text-sm">
                      <span className="text-muted">{formatDate(message.createdAt)}</span>
                      <StatusBadge status={message.status} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-5 py-6 text-sm text-muted">Nog geen berichten ontvangen.</p>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-surface bg-white p-6 shadow-1">
          <h2 className="font-display text-lg font-bold text-brand">Snel naar</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { href: "/admin/occasions/nieuw", label: "Nieuwe occasion toevoegen" },
              { href: "/admin/acties/nieuw", label: "Nieuwe actie aanmaken" },
              { href: "/admin/afspraken", label: "Werkplaatsafspraken beheren" },
              { href: "/admin/taxaties", label: "Taxatie-aanvragen beheren" },
              { href: "/", label: "Bekijk de website" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-black text-brand underline-offset-4 transition duration-fast hover:text-accent hover:underline">
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}