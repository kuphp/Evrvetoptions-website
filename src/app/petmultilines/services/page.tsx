import type { Metadata } from "next";
import {
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  Microscope,
  PackageCheck,
  PhoneCall,
  Settings2,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { getSiteContent } from "@/lib/data";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealItem, RevealStagger } from "@/components/site/reveal";
import { PMCta } from "@/components/pm/pm-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Demo & consultation, delivery & installation, staff training, preventive maintenance, repair with genuine parts, and equipment financing assistance.",
};

const SERVICES = [
  {
    icon: Microscope,
    title: "Demo & Consultation",
    body: "Showroom demonstrations, on-site trials for select units, and specification advice matched to your caseload and budget — no pressure, just honest guidance.",
  },
  {
    icon: Truck,
    title: "Delivery & Installation",
    body: "Nationwide delivery with professional installation, site preparation guidance, and calibration so your equipment is clinical-ready from day one.",
  },
  {
    icon: GraduationCap,
    title: "Operator Training",
    body: "Hands-on training for veterinarians and technicians, included with every purchase — plus refresher sessions for new staff anytime.",
  },
  {
    icon: CalendarCheck,
    title: "Preventive Maintenance",
    body: "Scheduled PM plans that keep imaging and laboratory systems accurate, compliant, and out of unplanned downtime.",
  },
  {
    icon: Wrench,
    title: "Repair & Genuine Parts",
    body: "Factory-trained engineers, genuine replacement parts, and priority turnaround for clinical equipment — on-site or depot service.",
  },
  {
    icon: Settings2,
    title: "Trade-In & Financing Assistance",
    body: "Upgrade paths for aging units and assistance with installment terms — including 0% promos during selected periods.",
  },
];

const PROCESS = [
  {
    icon: ClipboardList,
    step: "1",
    title: "Send Your RFQ",
    body: "Tell us your requirements — we reply with a formal quotation within one business day.",
  },
  {
    icon: Microscope,
    step: "2",
    title: "Demo & Finalize",
    body: "See the unit in action, finalize specs and terms, and schedule your delivery.",
  },
  {
    icon: PackageCheck,
    step: "3",
    title: "Install & Train",
    body: "We deliver, install, calibrate, and train your team until everyone is confident.",
  },
  {
    icon: PhoneCall,
    step: "4",
    title: "Ongoing Support",
    body: "Warranty, preventive maintenance, and a technical hotline for as long as you run the unit.",
  },
];

export default async function PMServicesPage() {
  const content = await getSiteContent();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Full-Service Equipment Partnership"
        description="Buying the machine is just the beginning. Pet Multilines supports the entire life of your equipment — from first demo to years of dependable service."
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            description="Six professional services that come standard with the Pet Multilines name."
          />
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <RevealItem key={service.title}>
                <div className="card-hover h-full rounded-2xl border bg-card p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                    <service.icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-lg font-extrabold tracking-tight">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad border-y bg-muted/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="How It Works"
            title="From Inquiry to Installation in 4 Steps"
          />
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item) => (
              <RevealItem key={item.step}>
                <div className="relative h-full rounded-2xl border bg-card p-7">
                  <span className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-sm font-extrabold text-white shadow-soft">
                    {item.step}
                  </span>
                  <item.icon className="mt-3 h-7 w-7 text-primary" />
                  <h3 className="mt-4 font-extrabold tracking-tight">
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

      {/* Warranty */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-7 md:grid-cols-2">
            <Reveal>
              <div className="card-hover h-full rounded-3xl border bg-card p-9">
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-brand p-3.5 text-white">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-xl font-extrabold tracking-tight">
                  Warranty Coverage
                </h2>
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
                <h2 className="mt-5 text-xl font-extrabold tracking-tight">
                  After-Sales Support
                </h2>
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
