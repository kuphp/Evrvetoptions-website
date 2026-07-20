"use client";

import Autoplay from "embla-carousel-autoplay";
import type { Product } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/site/product-card";
import { Reveal } from "@/components/site/reveal";

export function FeaturedProductsCarousel({
  products,
  perView = 4,
  hrefBase,
}: {
  products: Product[];
  /** 3 shows bigger cards — great for equipment with product photos. */
  perView?: 3 | 4;
  hrefBase?: string;
}) {
  if (products.length === 0) return null;

  return (
    <Reveal>
      <Carousel
        opts={{ loop: products.length > perView, align: "start" }}
        plugins={[
          Autoplay({
            delay: 4500,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-3.5 py-2 sm:-ml-5">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className={
                perView === 3
                  ? "basis-1/2 pl-3.5 sm:pl-5 lg:basis-1/3"
                  : "basis-1/2 pl-3.5 sm:pl-5 lg:basis-1/3 xl:basis-1/4"
              }
            >
              <ProductCard product={product} hrefBase={hrefBase} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-3 hidden bg-card shadow-soft sm:flex" />
        <CarouselNext className="-right-3 hidden bg-card shadow-soft sm:flex" />
      </Carousel>
    </Reveal>
  );
}
