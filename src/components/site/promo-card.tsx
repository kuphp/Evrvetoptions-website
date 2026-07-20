import Link from "next/link";
import { ArrowRight, CalendarRange, Check, Gift, Megaphone, Tags } from "lucide-react";
import type { Promotion } from "@/lib/types";
import { formatDate, getPromoStatus, type PromoStatus } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/site/media-frame";
import { cn } from "@/lib/utils";

const TYPE_META = {
  bundle: { label: "Bundle Deal", icon: Gift },
  seasonal: { label: "Seasonal Promo", icon: Tags },
  banner: { label: "Promo", icon: Megaphone },
} as const;

const STATUS_META: Record<PromoStatus, { label: string; className: string }> = {
  active: { label: "Ongoing", className: "bg-[#046304] text-white border-0" },
  upcoming: { label: "Coming Soon", className: "bg-[#1004b4] text-white border-0" },
  expired: {
    label: "Ended",
    className: "bg-muted text-muted-foreground border-0",
  },
};

export function PromoCard({ promo }: { promo: Promotion }) {
  const status = getPromoStatus(promo);
  const type = TYPE_META[promo.type];
  const TypeIcon = type.icon;

  return (
    <article
      className={cn(
        "card-hover flex h-full flex-col overflow-hidden rounded-2xl border bg-card",
        status === "expired" && "opacity-70 saturate-50"
      )}
    >
      <MediaFrame
        src={promo.banner_url}
        alt={promo.title}
        icon={TypeIcon}
        seed={promo.id}
        className="aspect-[16/7]"
        sizes="(max-width: 768px) 100vw, 50vw"
      >
        <div className="absolute left-3 top-3 flex gap-1.5">
          <Badge className="border-0 bg-black/35 text-white backdrop-blur">
            <TypeIcon className="h-3 w-3" /> {type.label}
          </Badge>
        </div>
        <Badge
          className={cn("absolute right-3 top-3", STATUS_META[status].className)}
        >
          {STATUS_META[status].label}
        </Badge>
      </MediaFrame>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-extrabold leading-snug tracking-tight">
          {promo.title}
        </h3>
        <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <CalendarRange className="h-3.5 w-3.5 text-primary" />
          {formatDate(promo.starts_at, "MMM d, yyyy")} –{" "}
          {formatDate(promo.ends_at, "MMM d, yyyy")}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {promo.description}
        </p>

        {promo.items.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {promo.items.slice(0, 4).map((item) => (
              <li key={item} className="flex gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          {status !== "expired" ? (
            <Button
              render={
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Promo: ${promo.title}`)}`}
                />
              }
              className="rounded-full bg-gradient-brand font-semibold text-white"
            >
              Avail This Promo <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              This promotion has ended
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
