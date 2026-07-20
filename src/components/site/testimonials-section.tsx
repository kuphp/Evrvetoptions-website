import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { initialsOf } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RevealItem, RevealStagger } from "@/components/site/reveal";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialsGrid({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.slice(0, 6).map((t) => (
        <RevealItem key={t.id}>
          <figure className="card-hover relative flex h-full flex-col rounded-2xl border bg-card p-7">
            <Quote className="absolute right-6 top-6 h-8 w-8 text-brand-green/15" />
            <Stars rating={t.rating} />
            <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-foreground/85">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3.5 border-t pt-5">
              <Avatar className="h-11 w-11 border">
                {t.avatar_url && <AvatarImage src={t.avatar_url} alt="" />}
                <AvatarFallback className="bg-gradient-brand text-sm font-bold text-white">
                  {initialsOf(t.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role} · {t.company}
                </p>
              </div>
            </figcaption>
          </figure>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}
