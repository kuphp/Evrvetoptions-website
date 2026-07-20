"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { submitInquiry } from "@/app/(site)/contact/actions";
import { inquirySchema, type InquiryInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({
  initialSubject,
  fallbackEmail,
}: {
  initialSubject?: string;
  fallbackEmail: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: initialSubject ?? "",
      message: "",
    },
  });

  async function onSubmit(values: InquiryInput) {
    setSubmitting(true);
    try {
      const result = await submitInquiry(values);
      if (result.ok) {
        toast.success("Message sent!", {
          description:
            "Thank you for reaching out. Our team will get back to you within one business day.",
        });
        reset({ name: "", email: "", phone: "", subject: "", message: "" });
      } else if (result.reason === "offline") {
        toast.info("Almost there — email us directly", {
          description: `Online inquiries aren't connected yet. Please email us at ${fallbackEmail} and we'll respond right away.`,
          duration: 8000,
        });
      } else {
        toast.error("Something went wrong", {
          description: `Please try again, or email us directly at ${fallbackEmail}.`,
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  const fieldError = (message?: string) =>
    message ? (
      <p className="mt-1.5 text-xs font-semibold text-destructive">{message}</p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-name" className="font-bold">
            Full Name *
          </Label>
          <Input
            id="cf-name"
            placeholder="Juan dela Cruz"
            className="mt-2 h-11 rounded-xl"
            {...register("name")}
          />
          {fieldError(errors.name?.message)}
        </div>
        <div>
          <Label htmlFor="cf-email" className="font-bold">
            Email Address *
          </Label>
          <Input
            id="cf-email"
            type="email"
            placeholder="you@company.com"
            className="mt-2 h-11 rounded-xl"
            {...register("email")}
          />
          {fieldError(errors.email?.message)}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-phone" className="font-bold">
            Phone <span className="font-medium text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="cf-phone"
            placeholder="+63 9XX XXX XXXX"
            className="mt-2 h-11 rounded-xl"
            {...register("phone")}
          />
        </div>
        <div>
          <Label htmlFor="cf-subject" className="font-bold">
            Subject *
          </Label>
          <Input
            id="cf-subject"
            placeholder="Product inquiry, quotation, partnership…"
            className="mt-2 h-11 rounded-xl"
            {...register("subject")}
          />
          {fieldError(errors.subject?.message)}
        </div>
      </div>

      <div>
        <Label htmlFor="cf-message" className="font-bold">
          Message *
        </Label>
        <Textarea
          id="cf-message"
          rows={6}
          placeholder="Tell us about your farm, clinic, or business and what you need…"
          className="mt-2 rounded-xl"
          {...register("message")}
        />
        {fieldError(errors.message?.message)}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full rounded-full bg-gradient-brand font-bold text-white shadow-soft hover:opacity-95 sm:w-auto sm:px-10"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}
