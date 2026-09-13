import Link from "next/link";
import { ActieForm } from "@/components/ActieForm";
import { createActieAction } from "@/actions/actie";

export default function NewActiePage() {
  return (
    <div>
      <nav className="mb-4 text-sm text-muted">
        <Link href="/admin/acties" className="underline-offset-4 transition duration-fast hover:text-ink hover:underline">Acties</Link>
        <span className="mx-2">/</span>
        <span>Nieuwe actie</span>
      </nav>
      <h1 className="font-display text-2xl font-black text-brand">Nieuwe actie</h1>
      <div className="mt-6 max-w-3xl rounded-xl border border-surface bg-white p-6 shadow-1">
        <ActieForm action={createActieAction} />
      </div>
    </div>
  );
}