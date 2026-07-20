"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EntityManager, type EntityConfig } from "@/components/admin/entity-manager";
import {
  CeoContentForm,
  CompanyContentForm,
} from "@/components/admin/site-content-forms";

const heroConfig: EntityConfig = {
  table: "hero_slides",
  singular: "Slide",
  plural: "Hero Slides",
  description:
    "The large rotating banners at the top of the homepage. Drag order using the Sort # field.",
  order: { column: "sort_order", ascending: true },
  uploadFolder: "hero",
  fields: [
    { name: "title", label: "Headline", type: "text", required: true, full: true },
    { name: "subtitle", label: "Subheadline", type: "textarea", required: true },
    { name: "cta_label", label: "Primary Button Label", type: "text", required: true },
    { name: "cta_href", label: "Primary Button Link", type: "text", required: true, placeholder: "/products" },
    { name: "cta_secondary_label", label: "Secondary Button Label", type: "text" },
    { name: "cta_secondary_href", label: "Secondary Button Link", type: "text", placeholder: "/contact" },
    {
      name: "image_url",
      label: "Slide Image (optional)",
      type: "image",
      help: "If empty, an elegant branded graphic is shown instead.",
    },
    { name: "sort_order", label: "Sort #", type: "number", defaultValue: "1" },
    { name: "active", label: "Visible on Site", type: "switch", defaultValue: true },
  ],
  list: {
    title: (row) => String(row.title ?? ""),
    subtitle: (row) => `→ ${row.cta_href} · sort ${row.sort_order}`,
    image: (row) => (row.image_url as string) ?? null,
    badges: (row) =>
      row.active
        ? [{ label: "Active", className: "bg-[#046304] text-white" }]
        : [{ label: "Hidden", className: "bg-muted text-muted-foreground" }],
  },
};

export default function HomepageAdminPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Homepage & Company
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage hero banners, the company story, and the CEO section.
        </p>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="mb-6 rounded-xl">
          <TabsTrigger value="hero" className="rounded-lg font-semibold">
            Hero Slides
          </TabsTrigger>
          <TabsTrigger value="company" className="rounded-lg font-semibold">
            Company Info
          </TabsTrigger>
          <TabsTrigger value="ceo" className="rounded-lg font-semibold">
            CEO Section
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <EntityManager config={heroConfig} />
        </TabsContent>
        <TabsContent value="company">
          <div className="max-w-3xl rounded-2xl border bg-card p-6 md:p-8">
            <CompanyContentForm />
          </div>
        </TabsContent>
        <TabsContent value="ceo">
          <div className="max-w-3xl rounded-2xl border bg-card p-6 md:p-8">
            <CeoContentForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
