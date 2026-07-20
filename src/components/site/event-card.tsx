import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  GraduationCap,
  MapPin,
  Mic2,
  Store,
  Users,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import type { EventItem } from "@/lib/types";
import { formatDateRange } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/site/media-frame";

export const EVENT_TYPE_META = {
  seminar: { label: "Seminar", icon: Mic2 },
  expo: { label: "Expo", icon: Store },
  training: { label: "Training", icon: GraduationCap },
  conference: { label: "Conference", icon: Users },
  other: { label: "Event", icon: CalendarDays },
} as const;

export function EventCard({
  event,
  past = false,
}: {
  event: EventItem;
  past?: boolean;
}) {
  const meta = EVENT_TYPE_META[event.type] ?? EVENT_TYPE_META.other;
  const TypeIcon = meta.icon;
  const date = parseISO(event.date);

  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border bg-card">
      <Link href={`/events/${event.slug}`} aria-label={event.title}>
        <MediaFrame
          src={event.cover_url ?? event.photos[0]}
          alt={event.title}
          icon={past ? Camera : TypeIcon}
          seed={event.slug}
          className="aspect-video"
          sizes="(max-width: 768px) 100vw, 33vw"
        >
          <div className="absolute left-4 top-4 flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-white/95 text-brand-deep shadow-soft dark:bg-card dark:text-foreground">
            <span className="text-lg font-extrabold leading-none">
              {format(date, "d")}
            </span>
            <span className="text-[0.62rem] font-bold uppercase tracking-widest">
              {format(date, "MMM")}
            </span>
          </div>
          <Badge className="absolute right-3 top-3 border-0 bg-black/35 text-white backdrop-blur">
            <TypeIcon className="h-3 w-3" /> {meta.label}
          </Badge>
        </MediaFrame>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold text-muted-foreground">
          {formatDateRange(event.date, event.end_date)}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-lg font-extrabold leading-snug tracking-tight transition-colors group-hover:text-primary">
          <Link href={`/events/${event.slug}`}>{event.title}</Link>
        </h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          {event.location}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
        <div className="mt-auto pt-5">
          <Button
            render={<Link href={`/events/${event.slug}`} />}
            variant="ghost"
            size="sm"
            className="rounded-full px-0 font-semibold text-primary hover:bg-transparent hover:text-primary/80"
          >
            {past ? "View Photos & Recap" : "View Details"}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}
