"use client";

import { EntityManager, type EntityConfig } from "@/components/admin/entity-manager";

const config: EntityConfig = {
  table: "testimonials",
  singular: "Testimonial",
  plural: "Testimonials",
  description:
    "Customer reviews shown on the homepage. Ratings are from 1 to 5 stars.",
  order: { column: "created_at", ascending: false },
  uploadFolder: "testimonials",
  fields: [
    { name: "name", label: "Customer Name", type: "text", required: true },
    { name: "role", label: "Role / Position", type: "text", placeholder: "Owner, Head Veterinarian…" },
    { name: "company", label: "Company / Farm / Clinic", type: "text" },
    {
      name: "rating",
      label: "Rating (1–5)",
      type: "number",
      required: true,
      defaultValue: "5",
    },
    { name: "quote", label: "Testimonial", type: "textarea", required: true },
    { name: "avatar_url", label: "Photo (optional)", type: "image" },
    { name: "active", label: "Visible on Site", type: "switch", defaultValue: true },
  ],
  list: {
    title: (row) => String(row.name ?? ""),
    subtitle: (row) =>
      [row.role, row.company].filter(Boolean).join(" · ") || undefined,
    image: (row) => (row.avatar_url as string) ?? null,
    badges: (row) => [
      { label: `★ ${row.rating}`, className: "bg-amber-500 text-white" },
      ...(!row.active
        ? [{ label: "Hidden", className: "bg-muted text-muted-foreground" }]
        : []),
    ],
  },
};

export default function TestimonialsAdminPage() {
  return <EntityManager config={config} />;
}
