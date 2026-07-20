"use client";

import { EntityManager, type EntityConfig } from "@/components/admin/entity-manager";
import { PROMO_TYPES } from "@/lib/constants";
import { formatDate } from "@/lib/format";

function statusBadge(row: Record<string, unknown>) {
  const now = new Date();
  const starts = new Date(String(row.starts_at));
  const ends = new Date(String(row.ends_at));
  if (now < starts)
    return { label: "Upcoming", className: "bg-[#1004b4] text-white" };
  if (now > ends)
    return { label: "Ended", className: "bg-muted text-muted-foreground" };
  return { label: "Ongoing", className: "bg-[#046304] text-white" };
}

const config: EntityConfig = {
  table: "promotions",
  singular: "Promotion",
  plural: "Promotions",
  description:
    "Bundle deals, seasonal promos, and banners. Status is computed automatically from the start and end dates.",
  order: { column: "starts_at", ascending: false },
  uploadFolder: "promotions",
  fields: [
    { name: "title", label: "Promo Title", type: "text", required: true, full: true },
    {
      name: "type",
      label: "Promo Type",
      type: "select",
      required: true,
      options: PROMO_TYPES.map((t) => ({ value: t.value, label: t.label })),
    },
    { name: "banner_url", label: "Promo Banner", type: "image" },
    { name: "starts_at", label: "Start Date", type: "date", required: true },
    { name: "ends_at", label: "End Date", type: "date", required: true },
    {
      name: "description",
      label: "Description / Mechanics",
      type: "textarea",
      required: true,
    },
    {
      name: "items",
      label: "Inclusions",
      type: "lines",
      placeholder: "FarmGuard Disinfectant 5 L × 2\nFREE biosecurity assessment",
      help: "One inclusion per line — shown as a checklist.",
    },
    { name: "active", label: "Visible on Site", type: "switch", defaultValue: true },
  ],
  list: {
    title: (row) => String(row.title ?? ""),
    subtitle: (row) =>
      `${formatDate(String(row.starts_at))} – ${formatDate(String(row.ends_at))}`,
    image: (row) => (row.banner_url as string) ?? null,
    badges: (row) => [
      statusBadge(row),
      ...(!row.active
        ? [{ label: "Hidden", className: "bg-muted text-muted-foreground" }]
        : []),
    ],
  },
};

export default function PromotionsAdminPage() {
  return <EntityManager config={config} />;
}
