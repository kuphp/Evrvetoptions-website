import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShieldCheck, Wrench } from "lucide-react";
import { getProducts, getSiteContent } from "@/lib/data";
import { getCategoryMeta, PRODUCT_CATEGORIES } from "@/lib/constants";
import type { ProductCategory } from "@/lib/types";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { FeaturedProductsCarousel } from "@/components/site/featured-products";
import { ProductExplorer } from "@/components/site/product-explorer";
import { ProductCard } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryMeta(category);
  if (!meta) return {};
  return {
    title: meta.name,
    description: meta.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = getCategoryMeta(category);
  if (!meta) notFound();

  const [products, content] = await Promise.all([
    getProducts({ category: category as ProductCategory }),
    getSiteContent(),
  ]);

  const featured = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.best_seller);
  const isEquipment = category === "equipment";

  return (
    <>
      <PageHero eyebrow="Our Products" title={meta.name} description={meta.description}>
        <Reveal delay={0.15} className="mt-7 flex flex-wrap gap-2">
          {meta.bullets.map((bullet) => (
            <span
              key={bullet}
              className="glass rounded-full px-4 py-1.5 text-sm font-bold"
            >
              {bullet}
            </span>
          ))}
        </Reveal>
      </PageHero>

      {featured.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Division Highlights"
              title={`Featured ${meta.shortName}`}
              description={
                isEquipment
                  ? "Flagship systems with full specifications, brochures, installation, and training."
                  : "Our technical team's top picks in this division."
              }
            />
            <FeaturedProductsCarousel
              products={featured}
              perView={isEquipment ? 3 : 4}
            />
          </div>
        </section>
      )}

      <section className="section-pad border-y bg-muted/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="Full Catalog"
            title={`Browse All ${meta.shortName}`}
            description="Filter by category and brand, or search for a specific product."
          />
          <ProductExplorer products={products} maxCols={isEquipment ? 3 : 4} />
        </div>
      </section>

      {bestSellers.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Most Trusted"
              title="Best Sellers in This Division"
              description="Proven products our customers reorder again and again."
            />
            <div
              className={
                isEquipment
                  ? "grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-3"
                  : "grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4"
              }
            >
              {bestSellers.slice(0, isEquipment ? 3 : 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {isEquipment && (
        <section className="section-pad border-t bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="Beyond the Sale"
              title="Warranty & After-Sales Support"
              description="Every machine we deliver comes with the support to keep it running."
            />
            <div className="grid gap-7 md:grid-cols-2">
              <Reveal>
                <div className="card-hover h-full rounded-3xl border bg-card p-9">
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-brand p-3.5 text-white">
                    <ShieldCheck className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight">
                    Warranty Coverage
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {content.support.warranty}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="card-hover h-full rounded-3xl border bg-card p-9">
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-brand p-3.5 text-white">
                    <Wrench className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight">
                    After-Sales Service
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {content.support.after_sales}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
