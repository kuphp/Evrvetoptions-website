import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/site/logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-brand-soft px-5 text-center">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
      <div className="relative">
        <LogoMark className="mx-auto h-16 w-16" />
        <p className="mt-8 text-7xl font-extrabold tracking-tight text-gradient">
          404
        </p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight">
          This page has wandered off
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            render={<Link href="/" />}
            size="lg"
            className="rounded-full bg-gradient-brand px-7 font-semibold text-white shadow-soft"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
          <Button
            render={<Link href="/products" />}
            size="lg"
            variant="outline"
            className="rounded-full px-7 font-semibold"
          >
            <Compass className="h-4 w-4" /> Browse Products
          </Button>
        </div>
      </div>
    </div>
  );
}
