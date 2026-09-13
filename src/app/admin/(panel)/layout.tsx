import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/server/auth";
import { AdminNav } from "@/components/AdminNav";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdminUser();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AdminNav email={admin.email} />
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
    </div>
  );
}