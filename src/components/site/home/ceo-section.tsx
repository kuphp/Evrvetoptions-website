import Link from "next/link";
import { ArrowRight, Quote, UserRound } from "lucide-react";
import type { CeoInfo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/site/media-frame";
import { Reveal } from "@/components/site/reveal";

export function CeoSection({ ceo }: { ceo: CeoInfo }) {
  return (
    <section className="section-pad relative overflow-hidden bg-muted/40">
      <div className="pointer-events-none absolute -left-32 bottom-0 hidden h-80 w-80 rounded-full bg-brand-green/10 blur-3xl md:block" />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Portrait */}
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 -rotate-2 rounded-[2.5rem] bg-gradient-brand opacity-15" />
          <MediaFrame
            src={ceo.photo_url}
            alt={`${ceo.name}, ${ceo.title} of EVR Vet Options Corporation`}
            icon={UserRound}
            seed="ceo-portrait"
            priority
            fit="contain"
            sizes="(max-width: 1024px) 90vw, 40vw"
            className="relative aspect-[4/5] rounded-[2rem] border bg-white shadow-soft"
          />
          <div className="glass absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl px-6 py-4 text-center shadow-soft">
            <p className="text-lg font-extrabold tracking-tight">{ceo.name}</p>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gradient">
              {ceo.title}
            </p>
          </div>
        </Reveal>

        {/* Message */}
        <Reveal delay={0.1}>
          <p className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.22em] text-gradient">
            A Message from Our President
          </p>
          <div className="relative">
            <Quote className="absolute -left-2 -top-4 h-10 w-10 text-brand-green/20" />
            <blockquote className="text-2xl font-bold leading-snug tracking-tight text-balance sm:text-[1.7rem]">
              “{ceo.quote}”
            </blockquote>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {ceo.message}
          </p>
          <div className="mt-8 flex items-center gap-5">
            <div>
              <p className="text-xl font-extrabold italic text-gradient">
                {ceo.name}
              </p>
              <p className="text-sm font-semibold text-muted-foreground">
                {ceo.title}, EVR Vet Options Corporation
              </p>
            </div>
          </div>
          <Button
            render={<Link href="/about" />}
            variant="outline"
            className="mt-8 rounded-full px-6 font-semibold"
          >
            Read Our Story <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
