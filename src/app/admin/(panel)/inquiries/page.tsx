"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, MailOpen, Phone, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/format";
import type { Inquiry } from "@/lib/types";
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
import { Skeleton } from "@/components/ui/skeleton";

export default function InquiriesPage() {
  const supabase = getSupabaseBrowserClient();
  const queryClient = useQueryClient();

  const { data: inquiries, isLoading } = useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data ?? []) as Inquiry[];
    },
  });

  const toggleRead = useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) => {
      const { error } = await supabase
        .from("inquiries")
        .update({ read })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["inquiries"] }),
    onError: (err: Error) =>
      toast.error("Update failed", { description: err.message }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("inquiries").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      toast.success("Inquiry deleted");
    },
    onError: (err: Error) =>
      toast.error("Delete failed", { description: err.message }),
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Inquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Messages submitted through the website contact form.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
      ) : (inquiries?.length ?? 0) === 0 ? (
        <div className="rounded-2xl border border-dashed py-16 text-center">
          <p className="font-bold">No inquiries yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {inquiries?.map((inquiry) => (
            <li
              key={inquiry.id}
              className={`rounded-2xl border bg-card p-6 shadow-sm ${
                inquiry.read ? "" : "border-primary/40"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-extrabold tracking-tight">
                      {inquiry.subject}
                    </h2>
                    {!inquiry.read && (
                      <Badge className="border-0 bg-gradient-brand text-white">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {inquiry.name}
                    </span>{" "}
                    · {formatDate(inquiry.created_at)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toggleRead.mutate({
                        id: inquiry.id,
                        read: !inquiry.read,
                      })
                    }
                    className="rounded-lg font-semibold"
                  >
                    {inquiry.read ? (
                      <>
                        <Mail className="h-3.5 w-3.5" /> Mark Unread
                      </>
                    ) : (
                      <>
                        <MailOpen className="h-3.5 w-3.5" /> Mark Read
                      </>
                    )}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger
                      render={
                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label="Delete inquiry"
                          className="rounded-lg text-destructive hover:text-destructive"
                        />
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this inquiry?</AlertDialogTitle>
                        <AlertDialogDescription>
                          The message from {inquiry.name} will be permanently
                          removed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => remove.mutate(inquiry.id)}
                          className="bg-destructive text-white hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <p className="mt-4 whitespace-pre-wrap rounded-xl bg-muted/50 p-4 text-sm leading-relaxed">
                {inquiry.message}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <a
                  href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                    `Re: ${inquiry.subject}`
                  )}`}
                  className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" /> {inquiry.email}
                </a>
                {inquiry.phone && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" /> {inquiry.phone}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
