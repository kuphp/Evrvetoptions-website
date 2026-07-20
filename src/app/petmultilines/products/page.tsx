import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { getBrands, getProducts } from "@/lib/data";
import { PM_EQUIPMENT_LINES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealItem, RevealStagger } from "@/components/site/reveal";
import { ProductExplorer } from "@/components/site/product-explorer";
import { FeaturedProductsCarousel } from "@/components/site/featured-products";
import { BrandStrip } from "@/components/site/brand-strip";
import { PMCta } from "@/components/pm/pm-cta";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse veterinary X-ray, ultrasound, CT, laboratory, surgical, diagnostic, and monitoring equipment — with specifications and brochure downloads.",
};

export default async function PMProductsPage() {
  const [products, brandsAll] = await Promise.all([
    getProducts({ category: "equipment" }),
    getBrands(),
  ]);
  const featured = products.filter((p) => p.featured);
  const withBrochures = products.filter((p) => p.brochure_url);
  const brands = brandsAll.filter((b) => b.categories.includes("equipment"));

  return (
    <>
      <PageHero
        eyebrow="Equipment Catalog"
        title="Veterinary Machines & Equipment"
        description="Complete specifications, high-resolution photos, and downloadable brochures for every system — plus a formal quotation whenever you're ready."
      >
        <Reveal delay={0.15} className="mt-7 flex flex-wrap gap-2">
          {PM_EQUIPMENT_LINES.map((line) => (
            <span
              key={line}
              className="glass rounded-full px-4 py-1.5 text-xs font-bold sm:text-sm"
            >
              {line}
            </span>
          ))}
        </Reveal>
      </PageHero>

      {featured.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Flagship Systems"
              title="Featured Equipment"
            />
            <FeaturedProductsCarousel
              products={featured}
              perView={3}
              hrefBase="/petmultilines/products"
            />
          </div>
        </section>
      )}

      <section className="section-pad border-y bg-muted/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="Full Catalog"
            title="Browse All Equipment"
            description="Filter by category and brand, or search for a specific system."
          />
          <ProductExplorer
            products={products}
            maxCols={3}
            hrefBase="/petmultilines/products"
          />
        </div>
      </section>

      {/* Brochures & catalog downloads */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Downloads"
            title="Brochures & Catalogs"
            description="Detailed PDF brochures for select systems. Can't find what you need? Request it and we'll send the full catalog."
          />
          {withBrochures.length > 0 ? (
            <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {withBrochures.map((product) => (
                <RevealItem key={product.id}>
                  <div className="card-hover flex h-full items-center gap-4 rounded-2xl border bg-card p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.brand} · PDF brochure
                      </p>
                    </div>
                    <Button
                      render={
                        <a
                          href={product.brochure_url!}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                      variant="outline"
                      size="sm"
                      className="tap-scale shrink-0 rounded-full font-semibold"
                    >
                      <Download className="h-3.5 w-3.5" /> PDF
                    </Button>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          ) : (
            <Reveal className="rounded-2xl border border-dashed p-10 text-center">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-4 font-bold">
                Brochures are available upon request
              </p>
              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                Message us with the equipment you&apos;re interested in and
                we&apos;ll send the complete brochure and catalog within the
                day.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {brands.length > 0 && (
        <section className="pb-6">
          <div className="container-page">
            <Reveal>
              <BrandStrip brands={brands} />
            </Reveal>
          </div>
        </section>
      )}

      <PMCta />
    </>
  );
}
