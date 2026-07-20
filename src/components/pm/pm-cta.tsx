import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

export function PMCta() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-brand px-8 py-14 text-center text-white shadow-soft md:px-16 md:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                Ready to equip your clinic or laboratory?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85 text-pretty">
                Send us your requirements and our biomedical specialists will
                prepare a formal quotation — with demo, installation, training,
                and financing options.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
                <Button
                  render={<Link href="/petmultilines/contact" />}
                  size="lg"
                  className="tap-scale rounded-full bg-white px-7 font-bold text-brand-deep hover:bg-white/90"
                >
                  <FileText className="h-4 w-4" />
                  Request for Quotation
                </Button>
                <Button
                  render={<Link href="/petmultilines/products" />}
                  size="lg"
                  variant="outline"
                  className="tap-scale rounded-full border-white/40 bg-transparent px-7 font-bold text-white hover:bg-white/10 hover:text-white"
                >
                  Browse Equipment <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
