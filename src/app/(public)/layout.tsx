import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="pb-16 sm:pb-0">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}