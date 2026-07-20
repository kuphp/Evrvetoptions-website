"use client";

import { EntityManager, type EntityConfig } from "@/components/admin/entity-manager";
import { ALL_PRODUCT_CATEGORIES } from "@/lib/constants";

const CATEGORY_LABELS: Record<string, string> = {
  livestock: "Livestock",
  "pet-consumables": "Pet Consumables",
  equipment: "Pet Multilines (Equipment)",
};

const config: EntityConfig = {
  table: "products",
  singular: "Product",
  plural: "Products",
  description:
    "Your full catalog. Livestock and Pet Consumables appear on the EVR website; Equipment products appear on the Pet Multilines microsite.",
  order: { column: "name", ascending: true },
  slugFrom: "name",
  uploadFolder: "products",
  fields: [
    { name: "name", label: "Product Name", type: "text", required: true, full: true },
    {
      name: "category",
      label: "Division",
      type: "select",
      required: true,
      options: ALL_PRODUCT_CATEGORIES.map((c) => ({
        value: c.slug,
        label: CATEGORY_LABELS[c.slug] ?? c.shortName,
      })),
    },
    {
      name: "subcategory",
      label: "Category",
      type: "text",
      required: true,
      placeholder: "Poultry, Grooming, Imaging…",
    },
    { name: "brand", label: "Brand", type: "text", required: true },
    {
      name: "short_description",
      label: "Short Description",
      type: "textarea",
      required: true,
      help: "1–2 sentences shown on product cards.",
    },
    {
      name: "description",
      label: "Full Description",
      type: "textarea",
      required: true,
    },
    {
      name: "specs",
      label: "Specifications",
      type: "specs",
      placeholder: "Active Ingredient | Amoxicillin 500 mg/g\nPresentation | 1 kg tub",
      help: 'One per line: "Label | Value". Great for equipment specs.',
    },
    { name: "images", label: "Product Photos", type: "images" },
    {
      name: "brochure_url",
      label: "Brochure / Catalog (PDF)",
      type: "file",
      accept: "application/pdf",
      full: true,
    },
    { name: "featured", label: "Featured Product", type: "switch" },
    { name: "best_seller", label: "Best Seller", type: "switch" },
    { name: "active", label: "Visible on Site", type: "switch", defaultValue: true },
  ],
  list: {
    title: (row) => String(row.name ?? ""),
    subtitle: (row) => `${row.brand} · ${row.subcategory}`,
    image: (row) => ((row.images as string[]) ?? [])[0] ?? null,
    badges: (row) => [
      {
        label: CATEGORY_LABELS[String(row.category)] ?? String(row.category),
        className: "bg-secondary text-secondary-foreground",
      },
      ...(row.featured
        ? [{ label: "Featured", className: "bg-gradient-brand text-white" }]
        : []),
      ...(row.best_seller
        ? [{ label: "Best Seller", className: "bg-amber-500 text-white" }]
        : []),
      ...(!row.active
        ? [{ label: "Hidden", className: "bg-muted text-muted-foreground" }]
        : []),
    ],
  },
};

export default function ProductsAdminPage() {
  return <EntityManager config={config} />;
}
