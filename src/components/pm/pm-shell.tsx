"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Menu, PhoneCall } from "lucide-react";
import {
  COMPANY_NAME,
  PM_DIVISION_NOTE,
  PM_NAV_LINKS,
} from "@/lib/constants";
import type { SiteContent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/site/theme-toggle";

export function PMLogo({
  className,
  chip = false,
}: {
  className?: string;
  chip?: boolean;
}) {
  return (
    <Link
      href="/petmultilines"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="Pet Multilines — Home"
    >
      <span
        className={cn(
          "tap-scale inline-flex items-center transition-transform duration-300 group-hover:scale-[1.03]",
          chip && "rounded-xl bg-white px-2 py-1 shadow-sm ring-1 ring-black/5"
        )}
      >
        <Image
          src="/images/pm-logo.png"
          alt="Pet Multilines"
          width={128}
          height={128}
          priority
          className="h-14 w-auto md:h-16"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight md:text-lg">
          Pet <span className="text-gradient">Multilines</span>
        </span>
        <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          A Division of EVR Vet Options Corp.
        </span>
      </span>
    </Link>
  );
}

export function PMHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/petmultilines"
      ? pathname === "/petmultilines"
      : pathname.startsWith(href);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Division strip + cross-site navigation */}
      <div className="bg-brand-deep text-white">
        <div className="container-page flex h-9 items-center justify-between gap-4 text-[0.7rem] font-semibold">
          <p className="hidden truncate text-white/70 sm:block">
            {PM_DIVISION_NOTE}
          </p>
          <Link
            href="/"
            className="tap-scale inline-flex items-center gap-2 text-white/85 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to EVR Vet Options
            <span className="hidden items-center rounded-md bg-white px-1.5 py-0.5 sm:inline-flex">
              <Image
                src="/images/evr-logo.png"
                alt=""
                width={40}
                height={32}
                className="h-5 w-auto"
              />
            </span>
          </Link>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "glass shadow-soft"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-page flex h-[4.75rem] items-center justify-between gap-2 md:h-[5.5rem]">
          <PMLogo />

          {/* Desktop nav */}
          <nav aria-label="Pet Multilines" className="hidden items-center gap-0.5 xl:flex">
            {PM_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "tap-scale rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:text-primary",
                  isActive(link.href) ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              render={<Link href="/petmultilines/contact" />}
              className="tap-scale hidden rounded-full bg-gradient-brand px-5 font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:opacity-95 md:inline-flex"
            >
              <PhoneCall className="h-4 w-4" />
              Request a Quote
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="tap-scale h-10 w-10 rounded-full xl:hidden"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[86vw] max-w-80 overflow-y-auto"
              >
                <SheetHeader className="border-b pb-4">
                  <SheetTitle>
                    <PMLogo />
                  </SheetTitle>
                </SheetHeader>
                <nav
                  aria-label="Pet Multilines mobile"
                  className="flex flex-col gap-0.5 px-4 pb-6"
                >
                  {PM_NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className={cn(
                        "tap-scale block rounded-xl px-3 py-3 text-base font-semibold transition-colors active:bg-accent",
                        isActive(link.href) && "text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button
                    render={
                      <Link href="/petmultilines/contact" onClick={closeMobile} />
                    }
                    size="lg"
                    className="tap-scale mt-4 w-full rounded-full bg-gradient-brand font-semibold text-white"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Request a Quote
                  </Button>
                  <Button
                    render={<Link href="/" onClick={closeMobile} />}
                    size="lg"
                    variant="outline"
                    className="tap-scale mt-2 w-full rounded-full font-semibold"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to EVR Vet Options
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

export function PMFooter({ content }: { content: SiteContent }) {
  const { contact } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t bg-brand-deep text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_50%_at_20%_0%,color-mix(in_oklch,var(--brand-green)_25%,transparent),transparent),radial-gradient(50%_50%_at_90%_100%,color-mix(in_oklch,var(--brand-blue)_22%,transparent),transparent)]" />

      <div className="container-page relative">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 py-10 md:py-14 lg:grid-cols-[1.4fr_1fr_1.3fr] lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <PMLogo chip className="[&_.text-muted-foreground]:text-white/60 [&_.text-foreground]:text-white" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Advanced veterinary machines and equipment — imaging, laboratory,
              surgical, and diagnostic systems with installation, training, and
              dependable after-sales service nationwide.
            </p>
            <p className="mt-4 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs leading-relaxed text-white/70">
              {PM_DIVISION_NOTE}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Pet Multilines footer links">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm md:mt-5">
              {PM_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1.5">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 font-bold text-brand-green-light transition-colors hover:text-white"
                >
                  EVR Vet Options Website <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/90 sm:text-sm">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/65 md:mt-5">
              <li>{contact.address}</li>
              <li>
                {contact.phone}
                {contact.phone_alt ? ` · ${contact.phone_alt}` : ""}
              </li>
              <li>
                <a
                  href={`mailto:${contact.email_sales ?? contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.email_sales ?? contact.email}
                </a>
              </li>
              {contact.business_hours.map((h) => (
                <li key={h.days} className="text-white/50">
                  {h.days}: {h.hours}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-5 text-center text-xs text-white/50 sm:flex-row sm:py-6 sm:text-left">
          <p>
            © {year} {COMPANY_NAME} · Pet Multilines Division. All rights
            reserved.
          </p>
          <Link
            href="/admin"
            className="rounded-full border border-white/10 px-3 py-1 transition-colors hover:border-white/30 hover:text-white"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
