"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload, ImageUpload, MultiImageUpload } from "@/components/admin/uploads";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "switch"
  | "date"
  | "select"
  | "image"
  | "images"
  | "file"
  | "tags"
  | "lines"
  | "specs";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  help?: string;
  required?: boolean;
  full?: boolean;
  accept?: string;
  defaultValue?: unknown;
}

type Row = Record<string, unknown> & { id: string };

export interface EntityConfig {
  table: string;
  singular: string;
  plural: string;
  description?: string;
  order?: { column: string; ascending?: boolean };
  fields: FieldDef[];
  /** Generate `slug` from this field's value when the row has none. */
  slugFrom?: string;
  uploadFolder?: string;
  list: {
    title: (row: Row) => string;
    subtitle?: (row: Row) => string | undefined;
    image?: (row: Row) => string | null | undefined;
    badges?: (row: Row) => { label: string; className?: string }[];
  };
}

/* ── value <-> form encoding ─────────────────────────────── */

function toFormValue(field: FieldDef, raw: unknown): unknown {
  switch (field.type) {
    case "tags":
      return Array.isArray(raw) ? raw.join(", ") : "";
    case "lines":
      return Array.isArray(raw) ? raw.join("\n") : "";
    case "specs":
      return Array.isArray(raw)
        ? (raw as { label: string; value: string }[])
            .map((s) => `${s.label} | ${s.value}`)
            .join("\n")
        : "";
    case "switch":
      return raw ?? field.defaultValue ?? false;
    case "images":
      return Array.isArray(raw) ? raw : [];
    case "number":
      return raw === null || raw === undefined ? "" : String(raw);
    default:
      return raw ?? field.defaultValue ?? "";
  }
}

function toRowValue(field: FieldDef, form: unknown): unknown {
  switch (field.type) {
    case "tags":
      return String(form ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    case "lines":
      return String(form ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    case "specs":
      return String(form ?? "")
        .split("\n")
        .map((line) => {
          const [label, ...rest] = line.split("|");
          return { label: label?.trim() ?? "", value: rest.join("|").trim() };
        })
        .filter((s) => s.label && s.value);
    case "number": {
      const str = String(form ?? "").trim();
      return str === "" ? null : Number(str);
    }
    case "switch":
      return !!form;
    case "images":
      return Array.isArray(form) ? form : [];
    default: {
      const str = typeof form === "string" ? form.trim() : form;
      return str === "" ? null : str;
    }
  }
}

/* ── component ───────────────────────────────────────────── */

export function EntityManager({ config }: { config: EntityConfig }) {
  const queryClient = useQueryClient();
  const supabase = getSupabaseBrowserClient();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});

  const { data: rows, isLoading, error } = useQuery({
    queryKey: [config.table],
    queryFn: async () => {
      let query = supabase.from(config.table).select("*");
      const order = config.order ?? { column: "created_at", ascending: false };
      query = query.order(order.column, {
        ascending: order.ascending ?? true,
      });
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return (data ?? []) as Row[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: {
      id: string | null;
      values: Record<string, unknown>;
    }) => {
      if (payload.id) {
        const { error } = await supabase
          .from(config.table)
          .update(payload.values)
          .eq("id", payload.id);
        if (error) throw new Error(error.message);
      } else {
        const { error } = await supabase
          .from(config.table)
          .insert(payload.values);
        if (error) throw new Error(error.message);
      }
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [config.table] });
      toast.success(
        variables.id ? `${config.singular} updated` : `${config.singular} added`
      );
      setDialogOpen(false);
    },
    onError: (err: Error) =>
      toast.error("Save failed", { description: err.message }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from(config.table)
        .delete()
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.table] });
      toast.success(`${config.singular} deleted`);
    },
    onError: (err: Error) =>
      toast.error("Delete failed", { description: err.message }),
  });

  function openCreate() {
    setEditing(null);
    const initial: Record<string, unknown> = {};
    for (const field of config.fields) {
      initial[field.name] = toFormValue(field, undefined);
    }
    setForm(initial);
    setDialogOpen(true);
  }

  function openEdit(row: Row) {
    setEditing(row);
    const initial: Record<string, unknown> = {};
    for (const field of config.fields) {
      initial[field.name] = toFormValue(field, row[field.name]);
    }
    setForm(initial);
    setDialogOpen(true);
  }

  function handleSave() {
    const values: Record<string, unknown> = {};
    for (const field of config.fields) {
      const value = toRowValue(field, form[field.name]);
      if (
        field.required &&
        (value === null || value === "" || value === undefined)
      ) {
        toast.error(`"${field.label}" is required`);
        return;
      }
      values[field.name] = value;
    }
    if (config.slugFrom) {
      const currentSlug =
        typeof values.slug === "string" && values.slug ? values.slug : null;
      const source = values[config.slugFrom];
      values.slug =
        currentSlug ?? (typeof source === "string" ? slugify(source) : "");
    }
    saveMutation.mutate({ id: editing?.id ?? null, values });
  }

  const filtered = useMemo(() => {
    if (!rows) return [];
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      config.list.title(row).toLowerCase().includes(q) ||
      (config.list.subtitle?.(row) ?? "").toLowerCase().includes(q)
    );
  }, [rows, search, config.list]);

  const folder = config.uploadFolder ?? config.table;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            {config.plural}
          </h1>
          {config.description && (
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {config.description}
            </p>
          )}
        </div>
        <Button
          onClick={openCreate}
          className="rounded-xl bg-gradient-brand font-bold text-white shadow-sm hover:opacity-95"
        >
          <Plus className="h-4 w-4" /> Add {config.singular}
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${config.plural.toLowerCase()}…`}
          className="rounded-xl pl-10"
        />
      </div>

      {/* Content */}
      {error ? (
        <Alert variant="destructive" className="rounded-2xl">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Could not load {config.plural.toLowerCase()}</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "Unknown error."} — make
            sure you have run <code>supabase/schema.sql</code> in your Supabase
            project (see README).
          </AlertDescription>
        </Alert>
      ) : isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-16 text-center">
          <p className="font-bold">
            No {config.plural.toLowerCase()} {search ? "match your search" : "yet"}
          </p>
          {!search && (
            <p className="mt-1 text-sm text-muted-foreground">
              Click “Add {config.singular}” to create your first one.
            </p>
          )}
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((row) => {
            const image = config.list.image?.(row);
            const badges = config.list.badges?.(row) ?? [];
            return (
              <li
                key={row.id}
                className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-extrabold text-muted-foreground">
                      {config.list
                        .title(row)
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{config.list.title(row)}</p>
                  {config.list.subtitle && (
                    <p className="truncate text-sm text-muted-foreground">
                      {config.list.subtitle(row)}
                    </p>
                  )}
                  {badges.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {badges.map((badge) => (
                        <Badge
                          key={badge.label}
                          className={cn(
                            "border-0 text-[0.65rem]",
                            badge.className ??
                              "bg-secondary text-secondary-foreground"
                          )}
                        >
                          {badge.label}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label={`Edit ${config.list.title(row)}`}
                    onClick={() => openEdit(row)}
                    className="rounded-lg"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger
                      render={
                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label={`Delete ${config.list.title(row)}`}
                          className="rounded-lg text-destructive hover:text-destructive"
                        />
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete this {config.singular.toLowerCase()}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          “{config.list.title(row)}” will be permanently
                          removed. This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(row.id)}
                          className="bg-destructive text-white hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Form dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[92svh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold">
              {editing ? `Edit ${config.singular}` : `Add ${config.singular}`}
            </DialogTitle>
            <DialogDescription>
              Fields marked * are required. Changes go live within ~2 minutes.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-2 sm:grid-cols-2">
            {config.fields.map((field) => {
              const value = form[field.name];
              const set = (v: unknown) =>
                setForm((prev) => ({ ...prev, [field.name]: v }));
              const id = `field-${field.name}`;

              return (
                <div
                  key={field.name}
                  className={cn(
                    "min-w-0",
                    (field.full ||
                      ["textarea", "images", "specs", "lines"].includes(
                        field.type
                      )) &&
                      "sm:col-span-2"
                  )}
                >
                  <Label htmlFor={id} className="font-bold">
                    {field.label}
                    {field.required && " *"}
                  </Label>
                  <div className="mt-2">
                    {field.type === "text" && (
                      <Input
                        id={id}
                        value={String(value ?? "")}
                        placeholder={field.placeholder}
                        onChange={(e) => set(e.target.value)}
                        className="rounded-xl"
                      />
                    )}
                    {field.type === "textarea" && (
                      <Textarea
                        id={id}
                        rows={4}
                        value={String(value ?? "")}
                        placeholder={field.placeholder}
                        onChange={(e) => set(e.target.value)}
                        className="rounded-xl"
                      />
                    )}
                    {(field.type === "lines" || field.type === "specs" ||
                      field.type === "tags") && (
                      <Textarea
                        id={id}
                        rows={field.type === "tags" ? 2 : 4}
                        value={String(value ?? "")}
                        placeholder={field.placeholder}
                        onChange={(e) => set(e.target.value)}
                        className="rounded-xl font-mono text-sm"
                      />
                    )}
                    {field.type === "number" && (
                      <Input
                        id={id}
                        type="number"
                        value={String(value ?? "")}
                        placeholder={field.placeholder}
                        onChange={(e) => set(e.target.value)}
                        className="rounded-xl"
                      />
                    )}
                    {field.type === "date" && (
                      <Input
                        id={id}
                        type="date"
                        value={String(value ?? "")}
                        onChange={(e) => set(e.target.value)}
                        className="rounded-xl"
                      />
                    )}
                    {field.type === "switch" && (
                      <div className="flex h-10 items-center">
                        <Switch
                          id={id}
                          checked={!!value}
                          onCheckedChange={(checked) => set(checked)}
                        />
                      </div>
                    )}
                    {field.type === "select" && (
                      <Select
                        value={String(value ?? "")}
                        onValueChange={(v) => set(v)}
                      >
                        <SelectTrigger id={id} className="w-full rounded-xl">
                          <SelectValue placeholder="Select…" />
                        </SelectTrigger>
                        <SelectContent>
                          {(field.options ?? []).map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {field.type === "image" && (
                      <ImageUpload
                        value={(value as string) || null}
                        onChange={(url) => set(url ?? "")}
                        folder={folder}
                      />
                    )}
                    {field.type === "images" && (
                      <MultiImageUpload
                        values={(value as string[]) ?? []}
                        onChange={(urls) => set(urls)}
                        folder={folder}
                      />
                    )}
                    {field.type === "file" && (
                      <FileUpload
                        value={(value as string) || null}
                        onChange={(url) => set(url ?? "")}
                        folder={`${folder}/files`}
                        accept={field.accept}
                      />
                    )}
                  </div>
                  {field.help && (
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {field.help}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="rounded-xl font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className="rounded-xl bg-gradient-brand font-bold text-white hover:opacity-95"
            >
              {saveMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {editing ? "Save Changes" : `Add ${config.singular}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
