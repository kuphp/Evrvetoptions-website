import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  FlaskConical,
  GraduationCap,
  Microscope,
  Orbit,
  ScanLine,
  Scissors,
  Slice,
  Stethoscope,
  Waves,
  Wrench,
} from "lucide-react";
import { getBrands, getProducts } from "@/lib/data";
import { PM_DIVISION_NOTE, PM_EQUIPMENT_LINES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealItem, RevealStagger } from "@/components/site/reveal";
import { FeaturedProductsCarousel } from "@/components/site/featured-products";
import { PMCta } from "@/components/pm/pm-cta";

const LINE_ICONS = [
  ScanLine, // X-ray
  Waves, // Ultrasound
  Orbit, // CT
  FlaskConical, // Laboratory
  Scissors, // Surgical
  Stethoscope, // Diagnostic
  Activity, // Monitoring
  Slice, // Instruments
];

const PM_STATS = [
  { value: "8", label: "Equipment Categories" },
  { value: "500+", label: "Units Installed Nationwide" },
  { value: "1–2 yrs", label: "Standard Warranty" },
  { value: "24/7", label: "Technical Support Hotline" },
];

export default async function PetMultilinesHome() {
  const [products, brandsAll] = await Promise.all([
    getProducts({ category: "equipment" }),
    getBrands(),
  ]);
  const featured = products.filter((p) => p.featured);
  const brands = brandsAll.filter((b) => b.categories.includes("equipment"));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <Image
          src="/images/hero-equipment.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />

        <div className="container-page relative flex min-h-[30rem] items-center py-14 md:min-h-[36rem] md:py-24">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-gradient-brand" />
              A Division of EVR Vet Options Corporation
            </span>
            <h1 className="mt-6 text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl xl:text-6xl">
              Advanced Veterinary{" "}
              <span className="text-gradient">Machines &amp; Equipment</span>
            </h1>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              From digital X-ray and ultrasound to CT, laboratory, and surgical
              systems — Pet Multilines equips Philippine clinics, hospitals, and
              laboratories with world-class technology and full after-sales
              support.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Button
                render={<Link href="/petmultilines/products" />}
                size="lg"
                className="tap-scale w-full rounded-full bg-gradient-brand px-7 font-semibold text-white shadow-soft hover:opacity-95 sm:w-auto"
              >
                Browse Equipment <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                render={<Link href="/petmultilines/contact" />}
                size="lg"
                variant="outline"
                className="tap-scale w-full rounded-full bg-card/60 px-7 font-semibold backdrop-blur sm:w-auto"
              >
                Request for Quotation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="relative border-b bg-card/60">
        <div className="container-page">
          <RevealStagger className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {PM_STATS.map((stat) => (
              <RevealItem key={stat.label}>
                <div className="flex flex-col items-center gap-1.5 px-4 py-8 text-center">
                  <span className="text-3xl font-extrabold tracking-tight text-gradient sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Equipment lines */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Carry"
            title="Complete Equipment Lines"
            description="Eight specialized categories covering every diagnostic, clinical, and laboratory need of modern veterinary practice."
          />
          <RevealStagger className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
            {PM_EQUIPMENT_LINES.map((line, i) => {
              const Icon = LINE_ICONS[i % LINE_ICONS.length];
              return (
                <RevealItem key={line}>
                  <Link
                    href="/petmultilines/products"
                    className="card-hover group flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 sm:p-6"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white sm:h-12 sm:w-12">
                      <Icon className="h-5.5 w-5.5" />
                    </span>
                    <span className="text-sm font-extrabold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-base">
                      {line}
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* Featured equipment */}
      {featured.length > 0 && (
        <section className="section-pad border-y bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="Flagship Systems"
              title="Featured Equipment"
              description="Complete specifications, brochures, demo units, and installation — everything you need to decide with confidence."
            />
            <FeaturedProductsCarousel
              products={featured}
              perView={3}
              hrefBase="/petmultilines/products"
            />
            <Reveal className="mt-10 text-center">
              <Button
                render={<Link href="/petmultilines/products" />}
                variant="outline"
                size="lg"
                className="tap-scale rounded-full px-7 font-semibold"
              >
                View Full Catalog <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
        </section>
      )}

      {/* Services preview */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Beyond the Sale"
            title="Sales, Service & Support — Complete"
            description="Every unit we deliver comes with professional services from our factory-trained engineers."
          />
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Microscope,
                title: "Demo & Consultation",
                body: "Try before you buy — showroom demos, on-site trials for select units, and honest specification advice.",
              },
              {
                icon: Wrench,
                title: "Installation & Maintenance",
                body: "Professional installation, calibration, preventive maintenance plans, and genuine spare parts.",
              },
              {
                icon: GraduationCap,
                title: "Staff Training",
                body: "Hands-on operator training for your veterinarians and technicians, included with every purchase.",
              },
            ].map((service) => (
              <RevealItem key={service.title}>
                <div className="card-hover h-full rounded-2xl border bg-card p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                    <service.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal className="mt-10 text-center">
            <Button
              render={<Link href="/petmultilines/services" />}
              variant="outline"
              size="lg"
              className="tap-scale rounded-full px-7 font-semibold"
            >
              All Services <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Brands */}
      {brands.length > 0 && (
        <section className="section-pad border-t bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="Our Principals"
              title="Equipment Brands We Represent"
            />
            <Reveal className="flex flex-wrap items-center justify-center gap-3">
              {brands.map((brand) => (
                <span
                  key={brand.id}
                  className="glass rounded-full px-6 py-2.5 text-sm font-extrabold tracking-tight text-foreground/70"
                >
                  {brand.name}
                </span>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Division note */}
      <section className="border-t bg-brand-deep py-10 text-white">
        <div className="container-page flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <p className="max-w-2xl text-sm leading-relaxed text-white/80">
            <span className="font-bold text-white">{PM_DIVISION_NOTE}</span>{" "}
            Consumables and livestock solutions are served by the main EVR Vet
            Options website.
          </p>
          <Button
            render={<Link href="/" />}
            variant="outline"
            className="tap-scale shrink-0 rounded-full border-white/40 bg-transparent px-6 font-semibold text-white hover:bg-white/10 hover:text-white"
          >
            Visit EVR Vet Options <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <PMCta />
    </>
  );
}
