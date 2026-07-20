"use client";

import { EntityManager, type EntityConfig } from "@/components/admin/entity-manager";

const config: EntityConfig = {
  table: "certificates",
  singular: "Credential",
  plural: "Certificates & Awards",
  description:
    "Licenses, certifications, and industry awards shown on the homepage and About page.",
  order: { column: "year", ascending: false },
  uploadFolder: "certificates",
  fields: [
    { name: "title", label: "Title", type: "text", required: true, full: true },
    {
      name: "type",
      label: "Type",
      type: "select",
      required: true,
      options: [
        { value: "certificate", label: "Certificate / License" },
        { value: "award", label: "Award" },
      ],
    },
    { name: "year", label: "Year", type: "number", required: true },
    { name: "issued_by", label: "Issued By", type: "text", required: true },
    { name: "image_url", label: "Scan / Photo", type: "image", full: true },
  ],
  list: {
    title: (row) => String(row.title ?? ""),
    subtitle: (row) => `${row.issued_by} · ${row.year}`,
    image: (row) => (row.image_url as string) ?? null,
    badges: (row) =>
      row.type === "award"
        ? [{ label: "Award", className: "bg-amber-500 text-white" }]
        : [{ label: "Certificate", className: "bg-gradient-brand text-white" }],
  },
};

export default function CertificatesAdminPage() {
  return <EntityManager config={config} />;
}
