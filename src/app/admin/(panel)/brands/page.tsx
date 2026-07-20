"use client";

import { EntityManager, type EntityConfig } from "@/components/admin/entity-manager";

const config: EntityConfig = {
  table: "brands",
  singular: "Brand",
  plural: "Brands",
  description:
    "Product brands shown on the Products page. Assign each brand to one or more divisions.",
  order: { column: "name", ascending: true },
  uploadFolder: "brands",
  fields: [
    { name: "name", label: "Brand Name", type: "text", required: true },
    { name: "logo_url", label: "Logo", type: "image" },
    {
      name: "categories",
      label: "Divisions",
      type: "tags",
      placeholder: "livestock, pet-consumables, equipment",
      help: "Comma-separated: livestock, pet-consumables, equipment",
    },
  ],
  list: {
    title: (row) => String(row.name ?? ""),
    subtitle: (row) => ((row.categories as string[]) ?? []).join(", "),
    image: (row) => (row.logo_url as string) ?? null,
  },
};

export default function BrandsAdminPage() {
  return <EntityManager config={config} />;
}
