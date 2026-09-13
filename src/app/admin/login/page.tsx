import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Inloggen",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-xl border border-surface bg-white p-8 shadow-2">
        <h1 className="font-display text-2xl font-bold text-brand">Inloggen</h1>
        <p className="mt-1 text-sm text-muted">Beheerpanel MLAuto</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}