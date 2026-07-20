import type { Metadata } from "next";
import { getSiteContent } from "@/lib/data";
import { PM_DIVISION_NOTE, PM_NAME, PM_TAGLINE } from "@/lib/constants";
import { PMFooter, PMHeader } from "@/components/pm/pm-shell";
import { ChatWidget } from "@/components/site/chat-widget";

export const revalidate = 120;

export const metadata: Metadata = {
  title: {
    default: `${PM_NAME} | ${PM_TAGLINE}`,
    template: `%s | ${PM_NAME}`,
  },
  description: `${PM_TAGLINE} — veterinary X-ray, ultrasound, CT, laboratory, surgical, diagnostic, and monitoring equipment. ${PM_DIVISION_NOTE}`,
};

export default async function PetMultilinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();

  return (
    <div className="flex min-h-svh flex-col">
      <PMHeader />
      <main className="flex-1">{children}</main>
      <PMFooter content={content} />
      <ChatWidget socials={content.contact.socials} />
    </div>
  );
}
