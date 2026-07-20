import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

/** Shared gradient hero band for inner pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b bg-gradient-brand-soft",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-24 top-8 hidden h-72 w-72 rounded-full bg-brand-green/15 blur-3xl md:block" />
      <div className="pointer-events-none absolute -right-24 bottom-0 hidden h-72 w-72 rounded-full bg-brand-blue/15 blur-3xl md:block" />

      <div className="container-page relative py-12 md:py-24">
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.22em] text-gradient">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              {description}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
