"use client";

import { EntityManager, type EntityConfig } from "@/components/admin/entity-manager";
import { EVENT_TYPES } from "@/lib/constants";
import { formatDate } from "@/lib/format";

const config: EntityConfig = {
  table: "events",
  singular: "Event",
  plural: "Events",
  description:
    "Seminars, expos, trainings, and conferences. Events automatically appear as Upcoming or Past based on their date.",
  order: { column: "date", ascending: false },
  slugFrom: "title",
  uploadFolder: "events",
  fields: [
    { name: "title", label: "Event Title", type: "text", required: true, full: true },
    {
      name: "type",
      label: "Event Type",
      type: "select",
      required: true,
      options: EVENT_TYPES.map((t) => ({ value: t.value, label: t.label })),
    },
    { name: "location", label: "Location", type: "text", required: true },
    { name: "date", label: "Start Date", type: "date", required: true },
    { name: "end_date", label: "End Date (optional)", type: "date" },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    { name: "cover_url", label: "Cover Image", type: "image" },
    {
      name: "photos",
      label: "Event Photos",
      type: "images",
      help: "Upload photos after the event — they appear in the event gallery.",
    },
  ],
  list: {
    title: (row) => String(row.title ?? ""),
    subtitle: (row) => `${formatDate(String(row.date))} · ${row.location}`,
    image: (row) =>
      (row.cover_url as string) ?? ((row.photos as string[]) ?? [])[0] ?? null,
    badges: (row) => {
      const past =
        new Date(String(row.end_date ?? row.date)) < new Date();
      return [
        past
          ? { label: "Past", className: "bg-muted text-muted-foreground" }
          : { label: "Upcoming", className: "bg-[#046304] text-white" },
      ];
    },
  },
};

export default function EventsAdminPage() {
  return <EntityManager config={config} />;
}
