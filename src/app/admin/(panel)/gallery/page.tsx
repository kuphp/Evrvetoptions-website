"use client";

import { EntityManager, type EntityConfig } from "@/components/admin/entity-manager";
import { GALLERY_CATEGORIES } from "@/lib/constants";

const config: EntityConfig = {
  table: "gallery",
  singular: "Photo",
  plural: "Gallery",
  description:
    "Photos of your office, warehouse, showroom, team, and events — shown on the About and Events pages.",
  order: { column: "created_at", ascending: false },
  uploadFolder: "gallery",
  fields: [
    { name: "title", label: "Caption", type: "text", required: true },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: GALLERY_CATEGORIES.map((c) => ({
        value: c.value,
        label: c.label,
      })),
    },
    { name: "image_url", label: "Photo", type: "image", full: true },
  ],
  list: {
    title: (row) => String(row.title ?? ""),
    subtitle: (row) =>
      GALLERY_CATEGORIES.find((c) => c.value === row.category)?.label ??
      String(row.category ?? ""),
    image: (row) => (row.image_url as string) ?? null,
  },
};

export default function GalleryAdminPage() {
  return <EntityManager config={config} />;
}
