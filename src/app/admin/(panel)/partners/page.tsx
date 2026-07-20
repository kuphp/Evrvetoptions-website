"use client";

import { EntityManager, type EntityConfig } from "@/components/admin/entity-manager";

const config: EntityConfig = {
  table: "partners",
  singular: "Partner",
  plural: "Partners",
  description:
    "Partner brands shown in the logo carousel and on the Partners page.",
  order: { column: "sort_order", ascending: true },
  uploadFolder: "partners",
  fields: [
    { name: "name", label: "Brand / Company Name", type: "text", required: true },
    {
      name: "logo_url",
      label: "Logo",
      type: "image",
      help: "Transparent PNG or SVG works best. If empty, a styled text logo is shown.",
    },
    {
      name: "website",
      label: "Website Link",
      type: "text",
      placeholder: "https://…",
    },
    { name: "sort_order", label: "Sort #", type: "number", defaultValue: "1" },
  ],
  list: {
    title: (row) => String(row.name ?? ""),
    subtitle: (row) => (row.website as string) ?? undefined,
    image: (row) => (row.logo_url as string) ?? null,
  },
};

export default function PartnersAdminPage() {
  return <EntityManager config={config} />;
}
