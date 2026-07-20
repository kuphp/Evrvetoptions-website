import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  ChevronRight,
  Download,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/data";
import { seedProducts } from "@/lib/seed";
import { getCategoryMeta } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductGallery } from "@/components/site/product-gallery";
import { ProductCard, InquireButton } from "@/components/site/product-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";

export function generateStaticParams() {
  return seedProducts.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | ${product.brand}`,
    description: product.short_description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const meta = getCategoryMeta(category);
  const product = await getProductBySlug(slug);
  if (!meta || !product || product.category !== category) notFound();

  const related = (await getProducts({ category: product.category }))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <div className="border-b bg-gradient-brand-soft">
        <div className="container-page py-5">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-muted-foreground"
          >
            <Link href="/products" className="transition-colors hover:text-primary">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href={`/products/${meta.slug}`}
              className="transition-colors hover:text-primary"
            >
              {meta.shortName}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ProductGallery
              images={product.images}
              name={product.name}
              category={product.category}
              seed={product.slug}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-wrap gap-2">
              {product.featured && (
                <Badge className="gap-1 border-0 bg-gradient-brand text-white">
                  <Sparkles className="h-3 w-3" /> Featured
                </Badge>
              )}
              {product.best_seller && (
                <Badge className="gap-1 border-0 bg-amber-500 text-white">
                  <Award className="h-3 w-3" /> Best Seller
                </Badge>
              )}
              <Badge variant="secondary" className="font-semibold">
                {product.subcategory}
              </Badge>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-gradient">
              {product.brand}
            </p>

            <p className="mt-6 text-lg font-medium leading-relaxed text-foreground/90">
              {product.short_description}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {product.specs.length > 0 && (
              <div className="mt-8 overflow-hidden rounded-2xl border">
                <p className="border-b bg-muted/60 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em]">
                  Specifications
                </p>
                <dl className="divide-y">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-[38%_1fr] gap-4 px-5 py-3 text-sm"
                    >
                      <dt className="font-semibold text-muted-foreground">
                        {spec.label}
                      </dt>
                      <dd className="font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                render={
                  <Link
                    href={`/contact?subject=${encodeURIComponent(
                      `Quote Request: ${product.name}`
                    )}`}
                  />
                }
                size="lg"
                className="rounded-full bg-gradient-brand px-7 font-semibold text-white shadow-soft hover:opacity-95"
              >
                <PhoneCall className="h-4 w-4" />
                Request a Quote
              </Button>
              {product.brochure_url && (
                <Button
                  render={
                    <a
                      href={product.brochure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  size="lg"
                  variant="outline"
                  className="rounded-full px-7 font-semibold"
                >
                  <Download className="h-4 w-4" />
                  Download Brochure
                </Button>
              )}
              <InquireButton productName={product.name} />
            </div>

            <Separator className="my-8" />

            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 text-primary" />
                <p className="text-muted-foreground">
                  <span className="font-bold text-foreground">
                    Nationwide delivery
                  </span>{" "}
                  with cold-chain handling where required.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                <p className="text-muted-foreground">
                  <span className="font-bold text-foreground">
                    Genuine & registered
                  </span>{" "}
                  products backed by after-sales support.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad border-t bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="You Might Also Need"
              title={`More ${meta.shortName}`}
            />
            <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
