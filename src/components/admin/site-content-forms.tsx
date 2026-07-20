"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  seedCeo,
  seedCompany,
  seedContact,
  seedSupport,
} from "@/lib/seed";
import type {
  CeoInfo,
  CompanyInfo,
  ContactInfo,
  SupportInfo,
} from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/uploads";

/* ── data hook ───────────────────────────────────────────── */

function useSiteContent<T extends object>(key: string, fallback: T) {
  const supabase = getSupabaseBrowserClient();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["site_content", key],
    queryFn: async (): Promise<T> => {
      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return { ...fallback, ...((data?.value as Partial<T>) ?? {}) };
    },
  });

  const mutation = useMutation({
    mutationFn: async (value: T) => {
      const { error } = await supabase
        .from("site_content")
        .upsert({ key, value }, { onConflict: "key" });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_content", key] });
      toast.success("Saved — changes go live within ~2 minutes");
    },
    onError: (err: Error) =>
      toast.error("Save failed", { description: err.message }),
  });

  return { query, mutation };
}

function SaveButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-gradient-brand font-bold text-white hover:opacity-95"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4" />
      )}
      Save Changes
    </Button>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-12 w-full rounded-xl" />
      ))}
    </div>
  );
}

function Field({
  label,
  children,
  help,
}: {
  label: string;
  children: React.ReactNode;
  help?: string;
}) {
  return (
    <div className="min-w-0">
      <Label className="font-bold">{label}</Label>
      <div className="mt-2">{children}</div>
      {help && <p className="mt-1.5 text-xs text-muted-foreground">{help}</p>}
    </div>
  );
}

/* ── Company ─────────────────────────────────────────────── */

export function CompanyContentForm() {
  const { query, mutation } = useSiteContent<CompanyInfo>(
    "company",
    seedCompany
  );
  const [form, setForm] = useState<CompanyInfo | null>(null);
  const [valuesText, setValuesText] = useState("");
  const [statsText, setStatsText] = useState("");

  useEffect(() => {
    if (query.data && !form) {
      setForm(query.data);
      setValuesText(
        query.data.core_values
          .map((v) => `${v.title} | ${v.description}`)
          .join("\n")
      );
      setStatsText(
        query.data.stats.map((s) => `${s.value} | ${s.label}`).join("\n")
      );
    }
  }, [query.data, form]);

  if (query.isLoading || !form) return <FormSkeleton />;

  const set = (patch: Partial<CompanyInfo>) =>
    setForm((prev) => (prev ? { ...prev, ...patch } : prev));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const core_values = valuesText
      .split("\n")
      .map((line) => {
        const [title, ...rest] = line.split("|");
        return { title: title?.trim() ?? "", description: rest.join("|").trim() };
      })
      .filter((v) => v.title);
    const stats = statsText
      .split("\n")
      .map((line) => {
        const [value, ...rest] = line.split("|");
        return { value: value?.trim() ?? "", label: rest.join("|").trim() };
      })
      .filter((s) => s.value && s.label);
    mutation.mutate({ ...form, core_values, stats });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company Name">
          <Input
            value={form.name}
            onChange={(e) => set({ name: e.target.value })}
            className="rounded-xl"
          />
        </Field>
        <Field label="Short Name">
          <Input
            value={form.short_name}
            onChange={(e) => set({ short_name: e.target.value })}
            className="rounded-xl"
          />
        </Field>
      </div>
      <Field label="Tagline">
        <Input
          value={form.tagline}
          onChange={(e) => set({ tagline: e.target.value })}
          className="rounded-xl"
        />
      </Field>
      <Field label="Short Introduction" help="Shown on the homepage and footer.">
        <Textarea
          rows={3}
          value={form.intro}
          onChange={(e) => set({ intro: e.target.value })}
          className="rounded-xl"
        />
      </Field>
      <Field label="Company Profile">
        <Textarea
          rows={5}
          value={form.profile}
          onChange={(e) => set({ profile: e.target.value })}
          className="rounded-xl"
        />
      </Field>
      <Field label="Company History">
        <Textarea
          rows={5}
          value={form.history}
          onChange={(e) => set({ history: e.target.value })}
          className="rounded-xl"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Mission">
          <Textarea
            rows={4}
            value={form.mission}
            onChange={(e) => set({ mission: e.target.value })}
            className="rounded-xl"
          />
        </Field>
        <Field label="Vision">
          <Textarea
            rows={4}
            value={form.vision}
            onChange={(e) => set({ vision: e.target.value })}
            className="rounded-xl"
          />
        </Field>
      </div>
      <Field
        label="Core Values"
        help='One per line: "Title | Description"'
      >
        <Textarea
          rows={6}
          value={valuesText}
          onChange={(e) => setValuesText(e.target.value)}
          className="rounded-xl font-mono text-sm"
        />
      </Field>
      <Field
        label="Company Stats"
        help='One per line: "Value | Label" — e.g. "500+ | Partner Clinics"'
      >
        <Textarea
          rows={4}
          value={statsText}
          onChange={(e) => setStatsText(e.target.value)}
          className="rounded-xl font-mono text-sm"
        />
      </Field>
      <SaveButton pending={mutation.isPending} />
    </form>
  );
}

/* ── CEO ─────────────────────────────────────────────────── */

export function CeoContentForm() {
  const { query, mutation } = useSiteContent<CeoInfo>("ceo", seedCeo);
  const [form, setForm] = useState<CeoInfo | null>(null);

  useEffect(() => {
    if (query.data && !form) setForm(query.data);
  }, [query.data, form]);

  if (query.isLoading || !form) return <FormSkeleton />;

  const set = (patch: Partial<CeoInfo>) =>
    setForm((prev) => (prev ? { ...prev, ...patch } : prev));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(form);
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name">
          <Input
            value={form.name}
            onChange={(e) => set({ name: e.target.value })}
            className="rounded-xl"
          />
        </Field>
        <Field label="Position / Title">
          <Input
            value={form.title}
            onChange={(e) => set({ title: e.target.value })}
            className="rounded-xl"
          />
        </Field>
      </div>
      <Field label="Photo" help="A professional portrait works best (4:5 ratio).">
        <ImageUpload
          value={form.photo_url ?? null}
          onChange={(url) => set({ photo_url: url })}
          folder="ceo"
        />
      </Field>
      <Field label="Short Inspirational Quote">
        <Textarea
          rows={3}
          value={form.quote}
          onChange={(e) => set({ quote: e.target.value })}
          className="rounded-xl"
        />
      </Field>
      <Field label="Full Message">
        <Textarea
          rows={6}
          value={form.message}
          onChange={(e) => set({ message: e.target.value })}
          className="rounded-xl"
        />
      </Field>
      <SaveButton pending={mutation.isPending} />
    </form>
  );
}

/* ── Contact ─────────────────────────────────────────────── */

export function ContactContentForm() {
  const { query, mutation } = useSiteContent<ContactInfo>(
    "contact",
    seedContact
  );
  const [form, setForm] = useState<ContactInfo | null>(null);
  const [hoursText, setHoursText] = useState("");

  useEffect(() => {
    if (query.data && !form) {
      setForm(query.data);
      setHoursText(
        query.data.business_hours.map((h) => `${h.days} | ${h.hours}`).join("\n")
      );
    }
  }, [query.data, form]);

  if (query.isLoading || !form) return <FormSkeleton />;

  const set = (patch: Partial<ContactInfo>) =>
    setForm((prev) => (prev ? { ...prev, ...patch } : prev));
  const setSocial = (name: keyof ContactInfo["socials"], value: string) =>
    setForm((prev) =>
      prev
        ? { ...prev, socials: { ...prev.socials, [name]: value } }
        : prev
    );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const business_hours = hoursText
      .split("\n")
      .map((line) => {
        const [days, ...rest] = line.split("|");
        return { days: days?.trim() ?? "", hours: rest.join("|").trim() };
      })
      .filter((h) => h.days && h.hours);
    mutation.mutate({ ...form, business_hours });
  }

  const socialFields: { key: keyof ContactInfo["socials"]; label: string }[] = [
    { key: "facebook", label: "Facebook URL" },
    { key: "instagram", label: "Instagram URL" },
    { key: "linkedin", label: "LinkedIn URL" },
    { key: "youtube", label: "YouTube URL" },
    { key: "messenger", label: "Messenger Link (m.me/…)" },
    { key: "whatsapp", label: "WhatsApp Link (wa.me/…)" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Company Address">
        <Textarea
          rows={2}
          value={form.address}
          onChange={(e) => set({ address: e.target.value })}
          className="rounded-xl"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone (Landline)">
          <Input
            value={form.phone}
            onChange={(e) => set({ phone: e.target.value })}
            className="rounded-xl"
          />
        </Field>
        <Field label="Phone (Mobile)">
          <Input
            value={form.phone_alt ?? ""}
            onChange={(e) => set({ phone_alt: e.target.value })}
            className="rounded-xl"
          />
        </Field>
        <Field label="General Email">
          <Input
            type="email"
            value={form.email}
            onChange={(e) => set({ email: e.target.value })}
            className="rounded-xl"
          />
        </Field>
        <Field label="Sales Email">
          <Input
            type="email"
            value={form.email_sales ?? ""}
            onChange={(e) => set({ email_sales: e.target.value })}
            className="rounded-xl"
          />
        </Field>
      </div>
      <Field
        label="Google Maps Embed URL"
        help='Use "https://www.google.com/maps?q=YOUR+ADDRESS&output=embed"'
      >
        <Input
          value={form.map_embed_url}
          onChange={(e) => set({ map_embed_url: e.target.value })}
          className="rounded-xl font-mono text-xs"
        />
      </Field>
      <Field label="Business Hours" help='One per line: "Days | Hours"'>
        <Textarea
          rows={3}
          value={hoursText}
          onChange={(e) => setHoursText(e.target.value)}
          className="rounded-xl font-mono text-sm"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        {socialFields.map(({ key, label }) => (
          <Field key={key} label={label}>
            <Input
              value={form.socials[key] ?? ""}
              onChange={(e) => setSocial(key, e.target.value)}
              className="rounded-xl"
              placeholder="https://…"
            />
          </Field>
        ))}
      </div>
      <SaveButton pending={mutation.isPending} />
    </form>
  );
}

/* ── Support / warranty ──────────────────────────────────── */

export function SupportContentForm() {
  const { query, mutation } = useSiteContent<SupportInfo>(
    "support",
    seedSupport
  );
  const [form, setForm] = useState<SupportInfo | null>(null);

  useEffect(() => {
    if (query.data && !form) setForm(query.data);
  }, [query.data, form]);

  if (query.isLoading || !form) return <FormSkeleton />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(form);
      }}
      className="space-y-5"
    >
      <Field
        label="Warranty Information"
        help="Shown on the Machines & Equipment page."
      >
        <Textarea
          rows={5}
          value={form.warranty}
          onChange={(e) =>
            setForm((prev) =>
              prev ? { ...prev, warranty: e.target.value } : prev
            )
          }
          className="rounded-xl"
        />
      </Field>
      <Field label="After-Sales Support">
        <Textarea
          rows={5}
          value={form.after_sales}
          onChange={(e) =>
            setForm((prev) =>
              prev ? { ...prev, after_sales: e.target.value } : prev
            )
          }
          className="rounded-xl"
        />
      </Field>
      <SaveButton pending={mutation.isPending} />
    </form>
  );
}
