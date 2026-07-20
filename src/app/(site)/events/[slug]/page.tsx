import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  MapPin,
  Ticket,
} from "lucide-react";
import { parseISO } from "date-fns";
import { getEventBySlug, getEvents } from "@/lib/data";
import { seedEvents } from "@/lib/seed";
import { formatDateRange } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EVENT_TYPE_META, EventCard } from "@/components/site/event-card";
import { MediaFrame } from "@/components/site/media-frame";
import { Reveal, RevealItem, RevealStagger } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

export function generateStaticParams() {
  return seedEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return { title: event.title, description: event.description.slice(0, 155) };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const isPast = parseISO(event.end_date ?? event.date) < new Date();
  const meta = EVENT_TYPE_META[event.type] ?? EVENT_TYPE_META.other;
  const TypeIcon = meta.icon;
  const others = (await getEvents()).filter((e) => e.id !== event.id).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b bg-gradient-brand-soft">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
        <div className="container-page relative py-14 md:py-20">
          <Reveal>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> All Events
            </Link>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge className="border-0 bg-gradient-brand text-white">
                <TypeIcon className="h-3 w-3" /> {meta.label}
              </Badge>
              <Badge
                variant="secondary"
                className={isPast ? "" : "bg-primary/10 text-primary"}
              >
                {isPast ? "Past Event" : "Upcoming"}
              </Badge>
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              {event.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4.5 w-4.5 text-primary" />
                {formatDateRange(event.date, event.end_date)}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4.5 w-4.5 text-primary" />
                {event.location}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight">
              About This Event
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {event.description}
            </p>

            {!isPast && (
              <div className="mt-9 rounded-2xl border bg-card p-7 shadow-soft">
                <h3 className="flex items-center gap-2.5 text-lg font-extrabold">
                  <Ticket className="h-5 w-5 text-primary" />
                  Reserve Your Slot
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Slots are limited. Message us to register or learn more about
                  this event — our team will confirm your reservation.
                </p>
                <Button
                  render={
                    <Link
                      href={`/contact?subject=${encodeURIComponent(
                        `Event Registration: ${event.title}`
                      )}`}
                    />
                  }
                  className="mt-5 rounded-full bg-gradient-brand px-6 font-semibold text-white"
                >
                  Register Interest
                </Button>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <MediaFrame
              src={event.cover_url ?? event.photos[0]}
              alt={event.title}
              icon={TypeIcon}
              seed={event.slug}
              className="aspect-[4/3] rounded-3xl border shadow-soft"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Photos */}
      <section className="section-pad border-t bg-muted/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="Gallery"
            title={isPast ? "Event Photos" : "Photos Coming Soon"}
            description={
              isPast
                ? "Highlights captured during the event."
                : "Photos will be posted here after the event — follow our Facebook page for live updates."
            }
          />
          {event.photos.length > 0 ? (
            <RevealStagger className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {event.photos.map((photo, i) => (
                <RevealItem key={photo + i}>
                  <MediaFrame
                    src={photo}
                    alt={`${event.title} photo ${i + 1}`}
                    icon={Camera}
                    seed={`${event.slug}-${i}`}
                    className="aspect-[4/3] rounded-2xl border"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </RevealItem>
              ))}
            </RevealStagger>
          ) : (
            <RevealStagger className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <RevealItem key={i}>
                  <MediaFrame
                    src={null}
                    alt="Event photo placeholder"
                    icon={Camera}
                    seed={`${event.slug}-placeholder-${i}`}
                    className="aspect-[4/3] rounded-2xl border opacity-70"
                  />
                </RevealItem>
              ))}
            </RevealStagger>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading eyebrow="More From EVR" title="Other Events" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((e) => (
                <EventCard
                  key={e.id}
                  event={e}
                  past={parseISO(e.end_date ?? e.date) < new Date()}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
