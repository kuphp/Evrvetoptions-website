import Link from "next/link";
import { ArrowLeft, Database, KeyRound, Rocket, Upload } from "lucide-react";
import { Logo } from "@/components/site/logo";

const STEPS = [
  {
    icon: Database,
    title: "Create a Supabase project",
    body: (
      <>
        Sign up free at{" "}
        <span className="font-mono font-semibold">supabase.com</span>, create a
        project, then open <b>SQL Editor</b> and run the contents of{" "}
        <span className="font-mono font-semibold">supabase/schema.sql</span>{" "}
        followed by{" "}
        <span className="font-mono font-semibold">supabase/seed.sql</span> from
        this project.
      </>
    ),
  },
  {
    icon: KeyRound,
    title: "Add your credentials",
    body: (
      <>
        Copy <span className="font-mono font-semibold">.env.local.example</span>{" "}
        to <span className="font-mono font-semibold">.env.local</span> and fill
        in <span className="font-mono font-semibold">NEXT_PUBLIC_SUPABASE_URL</span>{" "}
        and{" "}
        <span className="font-mono font-semibold">
          NEXT_PUBLIC_SUPABASE_ANON_KEY
        </span>{" "}
        from Project Settings → API. Then restart the dev server.
      </>
    ),
  },
  {
    icon: Upload,
    title: "Create an admin user",
    body: (
      <>
        In the Supabase dashboard, go to <b>Authentication → Users → Add
        user</b>, and create an email + password account. That account signs in
        to this admin panel.
      </>
    ),
  },
  {
    icon: Rocket,
    title: "Sign in and manage everything",
    body: (
      <>
        Reload this page, sign in, and manage hero banners, products, promos,
        events, partners, testimonials, FAQs, gallery, and contact details —
        no code required. Uploaded images are stored in Supabase Storage.
      </>
    ),
  },
];

export function SetupGuide() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-brand-soft px-5 py-16">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
      <div className="relative w-full max-w-2xl">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Logo />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Connect Supabase to Unlock the Admin Panel
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              The public website is already live with starter content. To edit
              content, upload images, and receive inquiries, connect a free
              Supabase project — it takes about 5 minutes.
            </p>
          </div>
        </div>

        <ol className="space-y-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="glass flex gap-5 rounded-2xl p-6 shadow-soft"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
                <step.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-extrabold tracking-tight">
                  {i + 1}. {step.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Full instructions are in <span className="font-mono font-semibold">README.md</span>.
        </p>
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
