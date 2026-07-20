import { LogoMark } from "@/components/site/logo";

export default function SiteLoading() {
  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center gap-5">
      <div className="relative">
        <div className="absolute -inset-3 animate-ping rounded-3xl bg-brand-green/20 [animation-duration:1.8s]" />
        <LogoMark className="relative h-14 w-14 animate-pulse" />
      </div>
      <p className="text-sm font-semibold tracking-wide text-muted-foreground">
        Loading…
      </p>
    </div>
  );
}
