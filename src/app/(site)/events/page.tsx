import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { parseISO } from "date-fns";
import { getEvents, getGallery } from "@/lib/data";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { EventCard } from "@/components/site/event-card";
import { MediaFrame } from "@/components/site/media-frame";
import { RevealItem, RevealStagger } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming seminars, expos, and trainings from EVR Vet Options — plus photo highlights from past events across the Philippines.",
};

export default async function EventsPage() {
  const [events, gallery] = await Promise.all([getEvents(), getGallery()]);

  const now = new Date();
  const upcoming = events
    .filter((e) => parseISO(e.end_date ?? e.date) >= now)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = events.filter((e) => parseISO(e.end_date ?? e.date) < now);
  const eventPhotos = gallery.filter((g) => g.category === "events");

  return (
    <>
      <PageHero
        eyebrow="Events & Trainings"
        title="Learn, Connect & Grow With Us"
        description="From nationwide expos to hands-on clinical trainings, we bring the animal health community together. Join us at our next event!"
      />

      {upcoming.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Mark Your Calendar"
              title="Upcoming Events"
              description="Reserve your slot early — seats at our seminars and trainings fill up fast."
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
        <section className="section-pad border-y bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="Highlights"
              title="Past Events"
              description="Seminars, expos, trainings, and celebrations from our community — relive the moments."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard key={event.id} event={event} past />
              ))}
            </div>
          </div>
        </section>
      )}

      {eventPhotos.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Photo Wall"
              title="Event Gallery"
              description="Snapshots from booths, seminars, and awarding nights across the country."
            />
            <RevealStagger className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {eventPhotos.map((photo) => (
                <RevealItem key={photo.id}>
                  <MediaFrame
                    src={photo.image_url}
                    alt={photo.title}
                    icon={Camera}
                    seed={photo.id}
                    className="aspect-[4/3] rounded-2xl border"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                      <p className="text-sm font-bold text-white">
                        {photo.title}
                      </p>
                    </div>
                  </MediaFrame>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
