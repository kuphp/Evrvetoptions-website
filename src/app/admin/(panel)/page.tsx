"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Award,
  BadgePercent,
  CalendarDays,
  Handshake,
  HelpCircle,
  Images,
  Inbox,
  MessageSquareQuote,
  Package,
  Plus,
  Tags,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const COUNT_CARDS = [
  { table: "products", label: "Products", href: "/admin/products", icon: Package },
  { table: "promotions", label: "Promotions", href: "/admin/promotions", icon: BadgePercent },
  { table: "events", label: "Events", href: "/admin/events", icon: CalendarDays },
  { table: "partners", label: "Partners", href: "/admin/partners", icon: Handshake },
  { table: "brands", label: "Brands", href: "/admin/brands", icon: Tags },
  { table: "testimonials", label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { table: "certificates", label: "Certificates & Awards", href: "/admin/certificates", icon: Award },
  { table: "faqs", label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { table: "gallery", label: "Gallery Photos", href: "/admin/gallery", icon: Images },
];

interface RecentInquiry {
  id: string;
  name: string;
  subject: string;
  read: boolean;
  created_at: string;
}

export default function AdminDashboardPage() {
  const supabase = getSupabaseBrowserClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const counts = await Promise.all(
        COUNT_CARDS.map(async ({ table }) => {
          const { count } = await supabase
            .from(table)
            .select("*", { count: "exact", head: true });
          return count ?? 0;
        })
      );
      const { data: inquiries } = await supabase
        .from("inquiries")
        .select("id, name, subject, read, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      const { count: unread } = await supabase
        .from("inquiries")
        .select("*", { count: "exact", head: true })
        .eq("read", false);
      return {
        counts,
        inquiries: (inquiries ?? []) as RecentInquiry[],
        unread: unread ?? 0,
      };
    },
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back! Here is an overview of your website content.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            render={<Link href="/admin/products" />}
            className="rounded-xl bg-gradient-brand font-bold text-white hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> New Product
          </Button>
          <Button
            render={<Link href="/admin/promotions" />}
            variant="outline"
            className="rounded-xl font-semibold"
          >
            <Plus className="h-4 w-4" /> New Promo
          </Button>
        </div>
      </div>

      {/* Counts */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {COUNT_CARDS.map(({ label, href, icon: Icon }, i) => (
          <Link
            key={href}
            href={href}
            className="card-hover group rounded-2xl border bg-card p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white">
              <Icon className="h-5 w-5" />
            </span>
            {isLoading ? (
              <Skeleton className="mt-4 h-8 w-14 rounded-lg" />
            ) : (
              <p className="mt-4 text-3xl font-extrabold tracking-tight">
                {data?.counts[i] ?? 0}
              </p>
            )}
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
              {label}
            </p>
          </Link>
        ))}

        <Link
          href="/admin/inquiries"
          className="card-hover group rounded-2xl border bg-card p-5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-deep text-white">
            <Inbox className="h-5 w-5" />
          </span>
          {isLoading ? (
            <Skeleton className="mt-4 h-8 w-14 rounded-lg" />
          ) : (
            <p className="mt-4 text-3xl font-extrabold tracking-tight">
              {data?.unread ?? 0}
            </p>
          )}
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
            Unread Inquiries
          </p>
        </Link>
      </div>

      {/* Recent inquiries */}
      <div className="rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="font-extrabold tracking-tight">Latest Inquiries</h2>
          <Button
            render={<Link href="/admin/inquiries" />}
            variant="ghost"
            size="sm"
            className="rounded-lg font-semibold text-primary hover:text-primary"
          >
            View all
          </Button>
        </div>
        {isLoading ? (
          <div className="space-y-3 p-6">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-xl" />
            ))}
          </div>
        ) : (data?.inquiries.length ?? 0) === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">
            No inquiries yet — messages from the contact form will appear here.
          </p>
        ) : (
          <ul className="divide-y">
            {data?.inquiries.map((inquiry) => (
              <li
                key={inquiry.id}
                className="flex items-center gap-4 px-6 py-3.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">
                    {inquiry.subject}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {inquiry.name} · {formatDate(inquiry.created_at)}
                  </p>
                </div>
                {!inquiry.read && (
                  <Badge className="border-0 bg-gradient-brand text-white">
                    New
                  </Badge>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
