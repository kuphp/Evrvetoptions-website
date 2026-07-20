import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import { getSiteContent } from "@/lib/data";
import { PM_DIVISION_NOTE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealItem, RevealStagger } from "@/components/site/reveal";
import { PMCta } from "@/components/pm/pm-cta";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Pet Multilines is the veterinary machines & equipment division of EVR Vet Options Corporation — established 2021, serving clinics, hospitals, and laboratories nationwide.",
};

const WHY_US = [
  {
    icon: BadgeCheck,
    title: "Genuine, Registered Equipment",
    body: "Every unit is sourced from accredited principals with complete documentation and regulatory compliance.",
  },
  {
    icon: Wrench,
    title: "Factory-Trained Engineers",
    body: "Our biomedical team handles installation, calibration, preventive maintenance, and repairs with genuine parts.",
  },
  {
    icon: ShieldCheck,
    title: "Real Warranty Coverage",
    body: "At least one year on parts and service, extendable on imaging and laboratory systems — honored locally.",
  },
  {
    icon: Users,
    title: "Training Included",
    body: "Operator training for your staff comes standard with every purchase, plus refreshers when you need them.",
  },
  {
    icon: Truck,
    title: "Nationwide Reach",
    body: "From Metro Manila to Visayas and Mindanao — we deliver, install, and service wherever your practice is.",
  },
  {
    icon: HeartHandshake,
    title: "Backed by EVR",
    body: "The stability, network, and values of EVR Vet Options Corporation — Excellence, Value, Reliability.",
  },
];

export default async function PMAboutPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHero
        eyebrow="About Pet Multilines"
        title="The Equipment Arm of EVR Vet Options"
        description="Established in 2021 as a dedicated business division, Pet Multilines brings world-class veterinary machines and equipment — and the service behind them — to Philippine clinics, animal hospitals, and laboratories."
      />

      {/* Story + division */}
      <section className="section-pad">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.22em] text-gradient">
              Our Story
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Built on 25+ Years of Animal Health Experience
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Pet Multilines was established in 2021 as the machines &amp;
              equipment division of EVR Vet Options Corporation — the company
              behind a nationwide network of veterinary distribution and animal
              care that traces its roots to 1996. As Philippine veterinary
              practice modernized, our clinic and hospital partners needed more
              than consumables: they needed imaging, laboratory, and surgical
              technology with real local support.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Today, Pet Multilines carries complete lines of veterinary X-ray,
              ultrasound, CT, laboratory, surgical, diagnostic, and monitoring
              equipment — delivered with demo units, professional installation,
              staff training, and after-sales service by our own engineers.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border bg-card p-8 shadow-soft">
              <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-brand p-3.5 text-white">
                <Building2 className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold tracking-tight">
                A Business Division of EVR Vet Options Corporation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {PM_DIVISION_NOTE} While Pet Multilines operates with its own
                identity, products, and services, it shares the parent
                company&apos;s leadership, values, and nationwide
                infrastructure — so every equipment purchase is backed by an
                organization that has served Philippine animal health for
                decades.
              </p>
              <Button
                render={<Link href="/" />}
                variant="outline"
                className="tap-scale mt-6 rounded-full px-6 font-semibold"
              >
                Visit EVR Vet Options <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-pad border-y bg-muted/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Pet Multilines"
            title="Equipment is a Relationship, Not a Transaction"
            description="Six reasons clinics and laboratories across the country trust us with their technology."
          />
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => (
              <RevealItem key={item.title}>
                <div className="card-hover h-full rounded-2xl border bg-card p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Warranty & after-sales */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Commitment"
            title="Warranty & After-Sales Support"
          />
          <div className="grid gap-7 md:grid-cols-2">
            <Reveal>
              <div className="card-hover h-full rounded-3xl border bg-card p-9">
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-brand p-3.5 text-white">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight">
                  Warranty Coverage
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {content.support.warranty}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-hover h-full rounded-3xl border bg-card p-9">
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-brand p-3.5 text-white">
                  <Wrench className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight">
                  After-Sales Service
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {content.support.after_sales}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PMCta />
    </>
  );
}
