import { format, isAfter, isBefore, parseISO } from "date-fns";
import type { Promotion } from "@/lib/types";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatDate(value?: string | null, pattern = "MMMM d, yyyy") {
  if (!value) return "";
  try {
    return format(parseISO(value), pattern);
  } catch {
    return value;
  }
}

export function formatDateRange(start: string, end?: string | null) {
  if (!end || end === start) return formatDate(start);
  const s = parseISO(start);
  const e = parseISO(end);
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${format(s, "MMMM d")}–${format(e, "d, yyyy")}`;
  }
  return `${format(s, "MMM d, yyyy")} – ${format(e, "MMM d, yyyy")}`;
}

export type PromoStatus = "active" | "upcoming" | "expired";

export function getPromoStatus(promo: Promotion, now = new Date()): PromoStatus {
  const starts = parseISO(promo.starts_at);
  const ends = parseISO(promo.ends_at);
  if (isBefore(now, starts)) return "upcoming";
  if (isAfter(now, ends)) return "expired";
  return "active";
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
