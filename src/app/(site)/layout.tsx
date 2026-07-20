import { getPartners, getSiteContent } from "@/lib/data";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ChatWidget } from "@/components/site/chat-widget";

export const revalidate = 120;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, partners] = await Promise.all([
    getSiteContent(),
    getPartners(),
  ]);

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter content={content} partners={partners} />
      <ChatWidget socials={content.contact.socials} />
    </div>
  );
}
