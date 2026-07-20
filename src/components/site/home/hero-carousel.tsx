"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Microscope,
  PawPrint,
  ShieldCheck,
  Stethoscope,
  Tractor,
  Truck,
  BadgeCheck,
  Wrench,
} from "lucide-react";
import type { HeroSlide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SLIDE_ICONS = [Stethoscope, Tractor, PawPrint, Microscope];

const SLIDE_CHIPS = [
  { icon: Truck, label: "Nationwide Delivery" },
  { icon: ShieldCheck, label: "FDA-Licensed Distributor" },
  { icon: BadgeCheck, label: "Trusted Global Brands" },
  { icon: Wrench, label: "Full After-Sales Support" },
];

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 28 }, [
    Autoplay({ delay: 6500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  if (slides.length === 0) return null;

  return (
    <section
      aria-label="Highlights"
      className="relative -mt-[4.5rem] overflow-hidden bg-gradient-brand-soft pt-[4.5rem] md:-mt-[5.25rem] md:pt-[5.25rem]"
    >
      {/* Animated backdrop (blur layers desktop-only — they jank low-end phones) */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(75%_65%_at_50%_35%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-32 top-10 hidden h-96 w-96 animate-float rounded-full bg-brand-green/20 blur-3xl md:block" />
      <div className="pointer-events-none absolute -right-32 bottom-0 hidden h-[28rem] w-[28rem] animate-float-delayed rounded-full bg-brand-blue/20 blur-3xl md:block" />
      <div className="pointer-events-none absolute inset-0 hidden animate-gradient opacity-[0.07] bg-gradient-brand md:block" />

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => {
            const Icon = SLIDE_ICONS[index % SLIDE_ICONS.length];
            const chip = SLIDE_CHIPS[index % SLIDE_CHIPS.length];
            const ChipIcon = chip.icon;
            const isSelected = selected === index;
            const Heading = index === 0 ? "h1" : "h2";

            return (
              <div
                key={slide.id}
                className="relative min-w-0 flex-[0_0_100%]"
                aria-hidden={!isSelected}
              >
                {/* Full-bleed slide image with a legibility gradient on the left */}
                {slide.image_url && (
                  <>
                    <Image
                      src={slide.image_url}
                      alt=""
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="object-cover object-[72%_center]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/5" />
                  </>
                )}

                <div className="container-page relative grid min-h-[28rem] items-center gap-10 py-10 md:min-h-[34rem] md:py-20 lg:min-h-[36rem] lg:grid-cols-[1.15fr_1fr] lg:gap-14">
                  {/* Copy */}
                  <motion.div
                    animate={
                      isSelected
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0.25, y: 14 }
                    }
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground shadow-sm backdrop-blur">
                      <span className="h-2 w-2 rounded-full bg-gradient-brand" />
                      EVR Vet Options Corporation
                    </span>
                    <Heading className="mt-5 text-[2rem] font-extrabold leading-[1.12] tracking-tight text-balance sm:text-5xl sm:leading-[1.08] md:mt-6 xl:text-6xl">
                      {splitTitle(slide.title)}
                    </Heading>
                    <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground text-pretty sm:text-lg md:mt-6">
                      {slide.subtitle}
                    </p>
                    <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-3.5 md:mt-9">
                      <Button
                        render={<Link href={slide.cta_href} />}
                        size="lg"
                        className="tap-scale w-full rounded-full bg-gradient-brand px-7 font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:opacity-95 sm:w-auto"
                      >
                        {slide.cta_label}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      {slide.cta_secondary_label && slide.cta_secondary_href && (
                        <Button
                          render={<Link href={slide.cta_secondary_href} />}
                          size="lg"
                          variant="outline"
                          className="tap-scale w-full rounded-full border-foreground/15 bg-card/60 px-7 font-semibold backdrop-blur hover:bg-card sm:w-auto"
                        >
                          {slide.cta_secondary_label}
                        </Button>
                      )}
                    </div>
                  </motion.div>

                  {/* Visual panel — only for slides without a photo */}
                  {!slide.image_url ? (
                    <motion.div
                      className="relative hidden lg:block"
                      animate={
                        isSelected
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0.2, scale: 0.96 }
                      }
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="relative mx-auto aspect-[5/4] w-full max-w-lg">
                        <div className="absolute inset-0 rotate-2 rounded-[2rem] bg-gradient-brand opacity-15 blur-sm" />
                        <div className="glass absolute inset-0 flex items-center justify-center rounded-[2rem] shadow-soft">
                          <div className="flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-gradient-brand text-white shadow-soft">
                            <Icon className="h-20 w-20" strokeWidth={1.4} />
                          </div>
                          <div className="absolute left-8 top-8 h-3 w-3 rounded-full bg-brand-green/50" />
                          <div className="absolute bottom-10 right-10 h-2.5 w-2.5 rounded-full bg-brand-blue/50" />
                        </div>

                        {/* Floating chips */}
                        <div className="glass absolute -left-6 bottom-10 flex animate-float items-center gap-2.5 rounded-2xl px-4 py-3 shadow-soft">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white">
                            <ChipIcon className="h-4.5 w-4.5" />
                          </span>
                          <span className="text-sm font-bold">{chip.label}</span>
                        </div>
                        <div className="glass absolute -right-4 top-8 animate-float-delayed rounded-2xl px-4 py-3 shadow-soft">
                          <p className="text-lg font-extrabold text-gradient">
                            EVR
                          </p>
                          <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
                            Est. Quality
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="hidden lg:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="container-page relative flex items-center justify-between pb-8 md:pb-10">
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Slides">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={selected === index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                selected === index
                  ? "w-9 bg-gradient-brand"
                  : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous slide"
            className="rounded-full bg-card/70 backdrop-blur"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next slide"
            className="rounded-full bg-card/70 backdrop-blur"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Renders the last word of the title with a brand gradient. */
function splitTitle(title: string) {
  const words = title.trim().split(" ");
  if (words.length < 3) return title;
  const lead = words.slice(0, -2).join(" ");
  const tail = words.slice(-2).join(" ");
  return (
    <>
      {lead} <span className="text-gradient">{tail}</span>
    </>
  );
}
