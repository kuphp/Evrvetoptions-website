import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { parseISO } from "date-fns";
import { getEvents, getPromotions } from "@/lib/data";
import { getPromoStatus } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { EventCard } from "@/components/site/event-card";
import { PromoCard } from "@/components/site/promo-card";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "What's New",
  description:
    "The latest from EVR Vet Options — upcoming events and trainings, plus current promotions and bundle deals.",
};

export default async function WhatsNewPage() {
  const [events, promotions] = await Promise.all([
    getEvents(),
    getPromotions(),
  ]);

  const now = new Date();
  const upcomingEvents = events
    .filter((e) => parseISO(e.end_date ?? e.date) >= now)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
  const activePromos = promotions
    .filter((p) => getPromoStatus(p) !== "expired")
    .slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow="What's New"
        title="Events, Trainings & Promotions"
        description="Stay in the loop with everything happening at EVR Vet Options — upcoming events and trainings, plus the latest bundle deals and seasonal offers."
      />

      {/* Promotions */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Save More"
            title="Current Promotions"
            description="Bundle deals and seasonal offers designed to give your business more value."
          />
          {activePromos.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2">
              {activePromos.map((promo) => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No active promotions right now — check back soon!
            </p>
          )}
          <Reveal className="mt-10 text-center">
            <Button
              render={<Link href="/promotions" />}
              variant="outline"
              size="lg"
              className="tap-scale rounded-full px-7 font-semibold"
            >
              See All Promotions <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Events */}
      <section className="section-pad border-t bg-muted/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="Join Us"
            title="Upcoming Events & Trainings"
            description="Seminars, expos, and hands-on trainings where you can meet our team and grow your practice."
          />
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No upcoming events posted yet — follow our socials for updates!
            </p>
          )}
          <Reveal className="mt-10 text-center">
            <Button
              render={<Link href="/events" />}
              variant="outline"
              size="lg"
              className="tap-scale rounded-full px-7 font-semibold"
            >
              All Events <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
