"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  BadgePercent,
  CalendarDays,
  ExternalLink,
  Handshake,
  HelpCircle,
  Home,
  Images,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Package,
  PhoneCall,
  Tags,
} from "lucide-react";
import { toast } from "sonner";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
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

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/homepage", label: "Homepage & Company", icon: Home },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/brands", label: "Brands", icon: Tags },
  { href: "/admin/promotions", label: "Promotions", icon: BadgePercent },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/certificates", label: "Certificates & Awards", icon: Award },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/contact", label: "Contact & Support", icon: PhoneCall },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-gradient-brand text-white shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function ShellActions() {
  const router = useRouter();

  async function handleLogout() {
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signOut();
    }
    toast.success("Signed out");
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-2 border-t p-4">
      <Button
        render={<Link href="/" target="_blank" />}
        variant="outline"
        size="sm"
        className="justify-start rounded-xl font-semibold"
      >
        <ExternalLink className="h-4 w-4" /> View Live Site
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="justify-start rounded-xl font-semibold text-destructive hover:text-destructive"
      >
        <LogOut className="h-4 w-4" /> Sign Out
      </Button>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-svh bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-svh w-72 shrink-0 flex-col border-r bg-sidebar lg:flex">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <p className="mb-3 px-6 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
            Content Management
          </p>
          <NavLinks />
        </div>
        <ShellActions />
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-2">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl lg:hidden"
                    aria-label="Open admin menu"
                  />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto p-0">
                <SheetHeader className="border-b px-5 py-4">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <NavLinks onNavigate={() => setMobileOpen(false)} />
                </div>
                <ShellActions />
              </SheetContent>
            </Sheet>
            <div>
              <p className="text-sm font-extrabold tracking-tight">
                Admin Panel
              </p>
              <p className="text-xs text-muted-foreground">
                EVR Vet Options Corporation
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
