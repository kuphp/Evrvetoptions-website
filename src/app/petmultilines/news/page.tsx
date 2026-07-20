import type { Metadata } from "next";
import { parseISO } from "date-fns";
import { getEvents } from "@/lib/data";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { EventCard } from "@/components/site/event-card";
import { PMCta } from "@/components/pm/pm-cta";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Equipment demos, trainings, expos, and company news from Pet Multilines and EVR Vet Options.",
};

export default async function PMNewsPage() {
  const events = await getEvents();
  const now = new Date();
  const upcoming = events
    .filter((e) => parseISO(e.end_date ?? e.date) >= now)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = events.filter((e) => parseISO(e.end_date ?? e.date) < now);

  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="Demos, Trainings & Industry Events"
        description="Meet our equipment specialists at expos, join hands-on trainings, and catch live demos of our newest systems."
      />

      {upcoming.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Save the Date"
              title="Upcoming Events"
              description="Slots for trainings and demo days are limited — register early."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="section-pad border-t bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="Highlights"
              title="Past Events"
              description="Relive our expos, seminars, and awarding nights."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.id} event={event} past />
              ))}
            </div>
          </div>
        </section>
      )}

      <PMCta />
    </>
  );
}
