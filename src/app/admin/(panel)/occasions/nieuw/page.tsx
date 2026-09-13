import Link from "next/link";
import { OccasionForm } from "@/components/OccasionForm";
import { createOccasionAction } from "@/actions/occasion";

export default function NewOccasionPage() {
  return (
    <div>
      <nav className="mb-4 text-sm text-muted">
        <Link href="/admin/occasions" className="underline-offset-4 transition duration-fast hover:text-ink hover:underline">Occasions</Link>
        <span className="mx-2">/</span>
        <span>Nieuwe occasion</span>
      </nav>
      <h1 className="font-display text-2xl font-bold text-brand">Nieuwe occasion</h1>
      <div className="mt-6 max-w-3xl rounded-xl border border-surface bg-white p-6 shadow-1">
        <OccasionForm action={createOccasionAction} />
      </div>
    </div>
  );
}