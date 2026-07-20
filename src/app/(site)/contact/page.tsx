import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getFaqs, getSiteContent } from "@/lib/data";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { ContactForm } from "@/components/site/contact-form";
import { FaqAccordion } from "@/components/site/faq-section";
import { Reveal } from "@/components/site/reveal";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/site/social-icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with EVR Vet Options Corporation — visit our office, call, email, or send us a message. We serve farms, clinics, and pet businesses nationwide.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const [{ subject }, content, faqs] = await Promise.all([
    searchParams,
    getSiteContent(),
    getFaqs(),
  ]);
  const { contact } = content;

  const socials = [
    { href: contact.socials.facebook, icon: FacebookIcon, label: "Facebook" },
    { href: contact.socials.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: contact.socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    { href: contact.socials.youtube, icon: YoutubeIcon, label: "YouTube" },
  ].filter((s) => !!s.href);

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Talk About Your Animal Health Needs"
        description="Questions, quotations, demos, or partnerships — our team is ready to help. Reach us through any channel below, or send a message and we'll reply within one business day."
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
                <h2 className="font-extrabold tracking-tight">Visit Us</h2>
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
                  <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="block transition-colors hover:text-primary">
                    {contact.phone}
                  </a>
                  {contact.phone_alt && (
                    <a href={`tel:${contact.phone_alt.replace(/[^+\d]/g, "")}`} className="block transition-colors hover:text-primary">
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
                <h2 className="font-extrabold tracking-tight">Email Us</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  <a href={`mailto:${contact.email}`} className="block transition-colors hover:text-primary">
                    {contact.email}
                  </a>
                  {contact.email_sales && (
                    <a href={`mailto:${contact.email_sales}`} className="block transition-colors hover:text-primary">
                      {contact.email_sales}
                    </a>
                  )}
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

            {socials.length > 0 && (
              <div className="flex items-center gap-3 pl-1 pt-1">
                <p className="text-sm font-bold text-muted-foreground">
                  Follow us:
                </p>
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border bg-card text-muted-foreground transition-all hover:border-transparent hover:bg-gradient-brand hover:text-white"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            )}
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border bg-card p-8 shadow-soft md:p-10">
              <h2 className="text-2xl font-extrabold tracking-tight">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form and our team will get back to you within one
                business day.
              </p>
              <div className="mt-7">
                <ContactForm
                  initialSubject={subject}
                  fallbackEmail={contact.email}
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
                title="EVR Vet Options Corporation location map"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[26rem] w-full border-0 grayscale-[0.15]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="section-pad border-t bg-muted/40 scroll-mt-20" id="faqs">
          <div className="container-page">
            <SectionHeading
              eyebrow="FAQs"
              title="Frequently Asked Questions"
              description="Everything you need to know about ordering, delivery, warranties, and partnering with us."
            />
            <FaqAccordion faqs={faqs} />
          </div>
        </section>
      )}
    </>
  );
}
