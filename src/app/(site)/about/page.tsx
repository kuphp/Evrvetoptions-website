import type { Metadata } from "next";
import {
  Handshake,
  HeartHandshake,
  History,
  Landmark,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Telescope,
} from "lucide-react";
import { getCertificates, getGallery, getSiteContent } from "@/lib/data";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealItem, RevealStagger } from "@/components/site/reveal";
import { MediaFrame } from "@/components/site/media-frame";
import { CertificatesGrid } from "@/components/site/certificates-section";
import { CtaBand } from "@/components/site/cta-band";
import { StatsBand } from "@/components/site/home/stats-band";
import { Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about EVR Vet Options Corporation — our company profile, history, mission, vision, and the core values behind Excellence, Value, and Reliability.",
};

const VALUE_ICONS = [
  Sparkles,
  Scale,
  ShieldCheck,
  Landmark,
  HeartHandshake,
  Handshake,
];

export default async function AboutPage() {
  const [content, certificates, gallery] = await Promise.all([
    getSiteContent(),
    getCertificates(),
    getGallery(),
  ]);
  const { company, ceo } = content;

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="The Company Behind Excellence, Value & Reliability"
        description={company.intro}
      />

      {/* Profile */}
      <section className="section-pad">
        <div className="container-page grid items-start gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.22em] text-gradient">
              Company Profile
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              {company.tagline}
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {company.profile}
            </p>

            <div className="mt-10 rounded-2xl border bg-card p-7 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white">
                  <History className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-extrabold tracking-tight">
                  Our History
                </h3>
              </div>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {company.history}
              </p>
            </div>
          </Reveal>

          {/* Gallery mosaic */}
          <RevealStagger className="grid grid-cols-2 gap-4">
            {gallery.slice(0, 4).map((image, i) => (
              <RevealItem key={image.id} className={i === 0 ? "col-span-2" : ""}>
                <MediaFrame
                  src={image.image_url}
                  alt={image.title}
                  icon={Camera}
                  seed={image.id}
                  className={
                    i === 0
                      ? "aspect-[16/8] rounded-2xl border"
                      : "aspect-[4/3] rounded-2xl border"
                  }
                  sizes="(max-width: 1024px) 50vw, 25vw"
                >
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                    <p className="text-sm font-bold text-white">{image.title}</p>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/70">
                      {GALLERY_CATEGORIES.find((c) => c.value === image.category)
                        ?.label ?? image.category}
                    </p>
                  </div>
                </MediaFrame>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <StatsBand stats={company.stats} />

      {/* Mission / Vision */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Direction"
            title="Mission & Vision"
            description="What drives us today, and where we are headed tomorrow."
          />
          <div className="grid gap-7 md:grid-cols-2">
            <Reveal>
              <div className="card-hover relative h-full overflow-hidden rounded-3xl border bg-card p-9">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-green/10 blur-2xl" />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                  <Target className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight">
                  Our Mission
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {company.mission}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-hover relative h-full overflow-hidden rounded-3xl border bg-card p-9">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-blue/10 blur-2xl" />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                  <Telescope className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight">
                  Our Vision
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {company.vision}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="section-pad border-y bg-muted/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Core Values"
            description="Six principles that guide every decision, delivery, and relationship."
          />
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {company.core_values.map((value, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <RevealItem key={value.title}>
                  <div className="card-hover h-full rounded-2xl border bg-card p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-extrabold tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* CEO quote band */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <figure className="relative mx-auto max-w-4xl text-center">
              <Quote className="mx-auto h-12 w-12 text-brand-green/25" />
              <blockquote className="mt-6 text-2xl font-bold leading-snug tracking-tight text-balance sm:text-3xl">
                “{ceo.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <p className="text-lg font-extrabold text-gradient">
                  {ceo.name}
                </p>
                <p className="text-sm font-semibold text-muted-foreground">
                  {ceo.title}, {company.name}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Facilities & team gallery */}
      {gallery.length > 4 && (
        <section className="section-pad border-y bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="Inside EVR"
              title="Our Facilities & Team"
              description="A look at the offices, warehouses, showroom, and people that keep animal health moving nationwide."
            />
            <RevealStagger className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {gallery.slice(4, 10).map((image) => (
                <RevealItem key={image.id}>
                  <MediaFrame
                    src={image.image_url}
                    alt={image.title}
                    icon={Camera}
                    seed={image.id}
                    className="aspect-[4/3] rounded-2xl border"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                      <p className="text-sm font-bold text-white">
                        {image.title}
                      </p>
                    </div>
                  </MediaFrame>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      {/* Certificates */}
      <section className="section-pad scroll-mt-20" id="credentials">
        <div className="container-page">
          <SectionHeading
            eyebrow="Credentials"
            title="Certificates & Awards"
            description="Our licenses, certifications, and industry recognition."
          />
          <CertificatesGrid certificates={certificates} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
