import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/site/social-icons";
import type { Partner, SiteContent } from "@/lib/types";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/site/logo";
import { Separator } from "@/components/ui/separator";

export function SiteFooter({
  content,
  partners,
}: {
  content: SiteContent;
  partners: Partner[];
}) {
  const { company, contact } = content;
  const year = new Date().getFullYear();

  const socials = [
    { href: contact.socials.facebook, icon: FacebookIcon, label: "Facebook" },
    { href: contact.socials.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: contact.socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    { href: contact.socials.youtube, icon: YoutubeIcon, label: "YouTube" },
  ].filter((s) => !!s.href);

  return (
    <footer className="relative mt-auto overflow-hidden border-t bg-brand-deep text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_50%_at_20%_0%,color-mix(in_oklch,var(--brand-green)_25%,transparent),transparent),radial-gradient(50%_50%_at_90%_100%,color-mix(in_oklch,var(--brand-blue)_22%,transparent),transparent)]" />

      <div className="container-page relative">
        {/* Partner strip — desktop only, clutters small screens */}
        {partners.length > 0 && (
          <div className="hidden flex-wrap items-center justify-center gap-x-8 gap-y-3 border-b border-white/10 py-7 md:flex">
            {partners.slice(0, 8).map((p) => (
              <span
                key={p.id}
                className="text-xs font-bold uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white/80"
              >
                {p.name}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-6 gap-y-9 py-10 md:py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Logo
              onDark
              className="[&_.text-foreground]:text-white [&_.text-muted-foreground]:text-white/60"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65 md:mt-5">
              {company.intro.length > 180
                ? `${company.intro.slice(0, 177).trimEnd()}…`
                : company.intro}
            </p>
            <div className="mt-5 flex gap-2.5 md:mt-6">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-transparent hover:bg-gradient-brand hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer quick links">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm md:mt-5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Footer product links">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
              Our Divisions
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm md:mt-5">
              <li>
                <Link
                  href="/products/livestock"
                  className="text-white/65 transition-colors hover:text-white"
                >
                  Livestock Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/products/pet-consumables"
                  className="text-white/65 transition-colors hover:text-white"
                >
                  Pet Consumables
                </Link>
              </li>
              <li>
                <Link
                  href="/petmultilines"
                  className="text-white/65 transition-colors hover:text-white"
                >
                  Pet Multilines — Machines &amp; Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/promotions"
                  className="text-white/65 transition-colors hover:text-white"
                >
                  Current Promotions
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-white/65 transition-colors hover:text-white"
                >
                  Events &amp; Trainings
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-white/65 md:mt-5">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-light" />
                <span>{contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-light" />
                <span>
                  {contact.phone}
                  {contact.phone_alt ? ` · ${contact.phone_alt}` : ""}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-light" />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-green-light" />
                <span>
                  {contact.business_hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.hours}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-3 py-5 text-center text-xs text-white/50 sm:flex-row sm:py-6 sm:text-left">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <span className="hidden sm:inline">
              Excellence · Value · Reliability
            </span>
            <Link
              href="/admin"
              className="rounded-full border border-white/10 px-3 py-1 transition-colors hover:border-white/30 hover:text-white"
            >
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
