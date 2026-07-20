"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Lock, LogIn, Mail } from "lucide-react";
import { toast } from "sonner";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site/logo";
import { SetupGuide } from "@/components/admin/setup-guide";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error("Sign in failed", { description: error.message });
        return;
      }
      toast.success("Welcome back!");
      const redirect = searchParams.get("redirect") ?? "/admin";
      router.replace(redirect.startsWith("/admin") ? redirect : "/admin");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-gradient-brand-soft px-5">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-24 top-16 hidden h-72 w-72 animate-float rounded-full bg-brand-green/15 blur-3xl md:block" />
      <div className="pointer-events-none absolute -right-24 bottom-16 hidden h-72 w-72 animate-float-delayed rounded-full bg-brand-blue/15 blur-3xl md:block" />

      <div className="relative w-full max-w-md">
        <div className="glass rounded-3xl p-9 shadow-soft">
          <div className="flex flex-col items-center gap-4 text-center">
            <Logo />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                Admin Sign In
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your website content securely.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <Label htmlFor="admin-email" className="font-bold">
                Email
              </Label>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@evrvetoptions.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="admin-password" className="font-bold">
                Password
              </Label>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="admin-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl pl-10"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-gradient-brand py-5 font-bold text-white shadow-soft hover:opacity-95"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" /> Sign In
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
            Admin accounts are created in Supabase under{" "}
            <span className="font-semibold">Authentication → Users</span>.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  if (!isSupabaseConfigured()) {
    return <SetupGuide />;
  }
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
