import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Handshake } from "lucide-react";
import { getPartners } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { PartnersMarquee } from "@/components/site/partners-marquee";
import { Reveal, RevealItem, RevealStagger } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The trusted animal health and equipment brands represented by EVR Vet Options in the Philippines.",
};

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <>
      <PageHero
        eyebrow="Our Principals"
        title="Partner Brands We Proudly Represent"
        description="We work hand-in-hand with respected local and international principals — bringing their science and quality to Philippine farms, clinics, and pet businesses."
      />

      <section className="py-14">
        <Reveal>
          <PartnersMarquee partners={partners} />
        </Reveal>
      </section>

      <section className="section-pad border-t bg-muted/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="Directory"
            title="All Partner Brands"
            description="Get to know the brands behind our portfolio."
          />
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {partners.map((partner) => (
              <RevealItem key={partner.id}>
                <div className="card-hover flex h-full flex-col items-center justify-center gap-4 rounded-2xl border bg-card p-8 text-center">
                  {partner.logo_url ? (
                    <Image
                      src={partner.logo_url}
                      alt={partner.name}
                      width={180}
                      height={64}
                      className="h-14 w-auto object-contain"
                    />
                  ) : (
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-xl font-black text-white">
                      {partner.name
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  )}
                  <p className="text-base font-extrabold tracking-tight">
                    {partner.name}
                  </p>
                  {partner.website && (
                    <Button
                      render={
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                      variant="outline"
                      size="sm"
                      className="rounded-full font-semibold"
                    >
                      Visit Website <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          {/* Become a partner */}
          <Reveal className="mt-14">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl border bg-card p-10 text-center shadow-soft">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Handshake className="h-7 w-7" />
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight">
                Interested in partnering with EVR?
              </h3>
              <p className="max-w-xl text-muted-foreground">
                Whether you are a principal looking for a reliable Philippine
                distributor, or a dealer who wants to carry our portfolio — we
                would love to talk.
              </p>
              <Button
                render={
                  <Link href="/contact?subject=Partnership%20Inquiry" />
                }
                size="lg"
                className="rounded-full bg-gradient-brand px-8 font-semibold text-white"
              >
                Start a Conversation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
