import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBrands, getProducts } from "@/lib/data";
import { EQUIPMENT_META, PM_BASE, PRODUCT_CATEGORIES } from "@/lib/constants";
import { CATEGORY_ICONS } from "@/lib/category-icons";

const EquipmentPickerIcon = CATEGORY_ICONS.equipment;
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { CategoryCards } from "@/components/site/home/category-cards";
import { FeaturedProductsCarousel } from "@/components/site/featured-products";
import { ProductCard } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the EVR Vet Options portfolio — livestock solutions, pet consumables, and veterinary machines & equipment from trusted brands.",
};

export default async function ProductsPage() {
  const [featuredAll, bestSellersAll, brandsAll] = await Promise.all([
    getProducts({ featured: true }),
    getProducts({ bestSeller: true }),
    getBrands(),
  ]);

  // Machines & Equipment lives on the Pet Multilines microsite.
  const featured = featuredAll.filter((p) => p.category !== "equipment");
  const bestSellers = bestSellersAll.filter((p) => p.category !== "equipment");
  const brands = brandsAll.filter((b) =>
    b.categories.some((c) => c !== "equipment")
  );

  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Products & Solutions for Every Animal"
        description="Three specialized divisions, one reliable partner. Pick a division below to start browsing."
      >
        {/* Division quick picker — visible immediately, no clicks needed */}
        <Reveal
          delay={0.12}
          className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3"
        >
          {PRODUCT_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug];
            return (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="tap-scale group flex items-center gap-3 rounded-2xl border bg-card/85 px-4 py-3.5 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.gradient} text-white`}
                >
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <span className="flex-1 text-sm font-extrabold leading-tight tracking-tight">
                  {category.shortName}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            );
          })}
          <Link
            href={PM_BASE}
            className="tap-scale group flex items-center gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-card/85 px-4 py-3.5 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-soft"
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${EQUIPMENT_META.gradient} text-white`}
            >
              <EquipmentPickerIcon className="h-5.5 w-5.5" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-extrabold leading-tight tracking-tight">
                Machines &amp; Equipment
              </span>
              <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-primary">
                by Pet Multilines
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        </Reveal>
      </PageHero>

      <CategoryCards />

      <section className="section-pad border-y bg-muted/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="Handpicked"
            title="Featured Products"
            description="Standout products across all divisions, selected by our technical team."
          />
          <FeaturedProductsCarousel products={featured} />
        </div>
      </section>

      {bestSellers.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Customer Favorites"
              title="Best Sellers"
              description="The most trusted products in Philippine farms, clinics, and pet businesses."
            />
            <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
              {bestSellers.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {brands.length > 0 && (
        <section className="section-pad border-t bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="Brands We Carry"
              title="Trusted Brands, One Distributor"
              description="We represent respected local and international animal health brands."
            />
            <Reveal className="flex flex-wrap items-center justify-center gap-3">
              {brands.map((brand) => (
                <span
                  key={brand.id}
                  className="glass rounded-full px-6 py-2.5 text-sm font-extrabold tracking-tight text-foreground/70"
                >
                  {brand.name}
                </span>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
