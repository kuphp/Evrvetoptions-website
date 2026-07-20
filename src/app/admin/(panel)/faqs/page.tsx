"use client";

import { EntityManager, type EntityConfig } from "@/components/admin/entity-manager";

const config: EntityConfig = {
  table: "faqs",
  singular: "FAQ",
  plural: "FAQs",
  description:
    "Frequently asked questions shown on the homepage and Contact page.",
  order: { column: "sort_order", ascending: true },
  fields: [
    { name: "question", label: "Question", type: "text", required: true, full: true },
    { name: "answer", label: "Answer", type: "textarea", required: true },
    { name: "sort_order", label: "Sort #", type: "number", defaultValue: "1" },
    { name: "active", label: "Visible on Site", type: "switch", defaultValue: true },
  ],
  list: {
    title: (row) => String(row.question ?? ""),
    subtitle: (row) => String(row.answer ?? "").slice(0, 90),
    badges: (row) =>
      row.active
        ? []
        : [{ label: "Hidden", className: "bg-muted text-muted-foreground" }],
  },
};

export default function FaqsAdminPage() {
  return <EntityManager config={config} />;
}
