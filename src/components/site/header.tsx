"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, PhoneCall } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import type { ProductCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";

function categoryIconFor(href: string) {
  const slug = href.split("/").pop() as ProductCategory;
  return CATEGORY_ICONS[slug] ?? null;
}

export function SiteHeader() {
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
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass shadow-soft"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-2 md:h-[5.25rem]">
        <Logo />

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) =>
            "children" in link && link.children ? (
              /* Hover mega-item: submenu appears instantly, label still navigates */
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={cn(
                    "tap-scale inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:text-primary",
                    isActive(link.href) ? "text-primary" : "text-foreground/80"
                  )}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                <div className="invisible absolute left-0 top-full translate-y-1 pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="w-72 rounded-2xl border bg-popover p-2 shadow-soft">
                    {link.children.map((child) => {
                      const Icon = categoryIconFor(child.href);
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "tap-scale flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent",
                            isActive(child.href) && "text-primary"
                          )}
                        >
                          {Icon && (
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-white">
                              <Icon className="h-4.5 w-4.5" />
                            </span>
                          )}
                          <span className="text-sm font-semibold">
                            {child.label}
                          </span>
                        </Link>
                      );
                    })}
                    <div className="my-1.5 border-t" />
                    <Link
                      href={link.href}
                      className="tap-scale block rounded-xl px-3 py-2 text-sm font-bold text-primary transition-colors hover:bg-accent"
                    >
                      View All Products →
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "tap-scale rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:text-primary",
                  isActive(link.href) ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Quick call button — mobile only */}
          <Button
            render={<Link href="/contact" aria-label="Contact us" />}
            variant="ghost"
            size="icon"
            className="tap-scale h-10 w-10 rounded-full text-primary md:hidden"
          >
            <PhoneCall className="h-5 w-5" />
          </Button>

          <Button
            render={<Link href="/contact" />}
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
                  className="tap-scale h-10 w-10 rounded-full lg:hidden"
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
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-0.5 px-4 pb-6">
                {NAV_LINKS.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className={cn(
                        "tap-scale block rounded-xl px-3 py-3 text-base font-semibold transition-colors active:bg-accent",
                        isActive(link.href) && "text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                    {"children" in link && link.children && (
                      <div className="ml-3 border-l pl-3">
                        {link.children.map((child) => {
                          const Icon = categoryIconFor(child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeMobile}
                              className={cn(
                                "tap-scale flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[0.95rem] font-medium text-muted-foreground transition-colors active:bg-accent",
                                isActive(child.href) && "text-primary"
                              )}
                            >
                              {Icon && <Icon className="h-4 w-4 text-primary" />}
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  render={<Link href="/contact" onClick={closeMobile} />}
                  size="lg"
                  className="tap-scale mt-4 w-full rounded-full bg-gradient-brand font-semibold text-white"
                >
                  <PhoneCall className="h-4 w-4" />
                  Request a Quote
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
