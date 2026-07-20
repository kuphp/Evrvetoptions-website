"use server";

import { inquirySchema, type InquiryInput } from "@/lib/schemas";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getSupabasePublicClient } from "@/lib/supabase/public";

export type InquiryResult =
  | { ok: true }
  | { ok: false; reason: "offline" | "invalid" | "error" };

export async function submitInquiry(
  input: InquiryInput
): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, reason: "invalid" };
  }

  if (!isSupabaseConfigured()) {
    // No database connected yet — the UI falls back to a direct-email prompt.
    return { ok: false, reason: "offline" };
  }

  try {
    const supabase = getSupabasePublicClient();
    const { error } = await supabase.from("inquiries").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });
    if (error) return { ok: false, reason: "error" };
    return { ok: true };
  } catch {
    return { ok: false, reason: "error" };
  }
}
