import Link from "next/link";
import { ArrowRight, Compass, Eye, Gem } from "lucide-react";
import type { CompanyInfo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export function OverviewSection({ company }: { company: CompanyInfo }) {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-24 hidden h-96 w-96 rounded-full bg-brand-blue/8 blur-3xl md:block" />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <p className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.22em] text-gradient">
            Who We Are
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            {company.tagline}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {company.intro}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {company.profile.length > 260
              ? `${company.profile.slice(0, 257).trimEnd()}…`
              : company.profile}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<Link href="/about" />}
              size="lg"
              className="rounded-full bg-gradient-brand px-7 font-semibold text-white shadow-soft hover:opacity-95"
            >
              More About Us <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              render={<Link href="/partners" />}
              size="lg"
              variant="outline"
              className="rounded-full px-7 font-semibold"
            >
              Our Partner Brands
            </Button>
          </div>
        </Reveal>

        <div className="flex flex-col gap-5">
          <Reveal delay={0.05}>
            <div className="card-hover flex gap-5 rounded-2xl border bg-card p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Compass className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-extrabold tracking-tight">Our Mission</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {company.mission}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="card-hover flex gap-5 rounded-2xl border bg-card p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Eye className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-extrabold tracking-tight">Our Vision</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {company.vision}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.19}>
            <div className="card-hover rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                  <Gem className="h-6 w-6" />
                </span>
                <h3 className="font-extrabold tracking-tight">
                  Our Commitments
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {company.core_values.map((value) => (
                  <span
                    key={value.title}
                    className="rounded-full border bg-muted/50 px-3.5 py-1.5 text-xs font-bold"
                  >
                    {value.title}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
