import type { Metadata } from "next";
import { Clock, FileText, Mail, MapPin, Phone } from "lucide-react";
import { getSiteContent } from "@/lib/data";
import { PM_DIVISION_NOTE } from "@/lib/constants";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Contact & Request for Quotation",
  description:
    "Request a formal quotation for veterinary machines and equipment, schedule a demo, or ask our biomedical specialists anything.",
};

export default async function PMContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const [{ subject }, content] = await Promise.all([
    searchParams,
    getSiteContent(),
  ]);
  const { contact } = content;

  return (
    <>
      <PageHero
        eyebrow="Contact / RFQ"
        title="Request for Quotation"
        description="Tell us the equipment you need — X-ray, ultrasound, CT, laboratory, surgical, or monitoring — and our specialists will send a formal quotation within one business day, including demo, installation, training, and financing options."
      />

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info */}
          <Reveal className="space-y-5">
            <div className="card-hover flex gap-5 rounded-2xl border bg-card p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <MapPin className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-extrabold tracking-tight">
                  Showroom & Office
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {contact.address}
                </p>
              </div>
            </div>

            <div className="card-hover flex gap-5 rounded-2xl border bg-card p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Phone className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-extrabold tracking-tight">Call Us</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  <a
                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                    className="block transition-colors hover:text-primary"
                  >
                    {contact.phone}
                  </a>
                  {contact.phone_alt && (
                    <a
                      href={`tel:${contact.phone_alt.replace(/[^+\d]/g, "")}`}
                      className="block transition-colors hover:text-primary"
                    >
                      {contact.phone_alt}
                    </a>
                  )}
                </p>
              </div>
            </div>

            <div className="card-hover flex gap-5 rounded-2xl border bg-card p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Mail className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-extrabold tracking-tight">Email</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  <a
                    href={`mailto:${contact.email_sales ?? contact.email}`}
                    className="block transition-colors hover:text-primary"
                  >
                    {contact.email_sales ?? contact.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="card-hover flex gap-5 rounded-2xl border bg-card p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white">
                <Clock className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <h2 className="font-extrabold tracking-tight">Business Hours</h2>
                <dl className="mt-2 space-y-1 text-sm">
                  {contact.business_hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-6">
                      <dt className="text-muted-foreground">{h.days}</dt>
                      <dd className="font-semibold">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <p className="rounded-2xl border border-dashed px-5 py-4 text-xs leading-relaxed text-muted-foreground">
              {PM_DIVISION_NOTE}
            </p>
          </Reveal>

          {/* RFQ form */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border bg-card p-8 shadow-soft md:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight">
                    Send Your RFQ
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Include the equipment, quantity, and your clinic or company
                    name.
                  </p>
                </div>
              </div>
              <div className="mt-7">
                <ContactForm
                  initialSubject={subject ?? "Request for Quotation"}
                  fallbackEmail={contact.email_sales ?? contact.email}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="container-page">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border shadow-soft">
              <iframe
                src={contact.map_embed_url}
                title="Pet Multilines location map"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[26rem] w-full border-0 grayscale-[0.15]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
