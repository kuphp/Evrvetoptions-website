"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Download,
  Eye,
  MessageSquareMore,
  Sparkles,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import { getCategoryMeta } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MediaFrame } from "@/components/site/media-frame";

export function ProductCard({ product }: { product: Product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const Icon = CATEGORY_ICONS[product.category];
  const detailHref = `/products/${product.category}/${product.slug}`;
  // Equipment photos are usually 3D renders — show them whole, never cropped.
  const imageFit = product.category === "equipment" ? "contain" : "cover";

  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border bg-card">
      <Link href={detailHref} aria-label={product.name}>
        <MediaFrame
          src={product.images[0]}
          alt={product.name}
          icon={Icon}
          seed={product.slug}
          fit={imageFit}
          className="aspect-[4/3]"
          sizes="(max-width: 1024px) 50vw, 25vw"
        >
          <div className="absolute left-2 top-2 flex flex-wrap gap-1 sm:left-3 sm:top-3 sm:gap-1.5">
            {product.featured && (
              <Badge className="gap-1 border-0 bg-gradient-brand px-1.5 text-[0.6rem] text-white sm:px-2 sm:text-xs">
                <Sparkles className="h-3 w-3" /> Featured
              </Badge>
            )}
            {product.best_seller && (
              <Badge className="gap-1 border-0 bg-amber-500 px-1.5 text-[0.6rem] text-white sm:px-2 sm:text-xs">
                <Award className="h-3 w-3" /> Best Seller
              </Badge>
            )}
          </div>
        </MediaFrame>
      </Link>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <p className="line-clamp-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-muted-foreground sm:text-[0.7rem] sm:tracking-[0.14em]">
          {product.brand} · {product.subcategory}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-snug tracking-tight sm:mt-1.5 sm:text-[1.02rem]">
          <Link
            href={detailHref}
            className="transition-colors group-hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
          {product.short_description}
        </p>

        <div className="mt-auto flex flex-col gap-2 pt-3.5 sm:flex-row sm:items-center sm:pt-5">
          <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="tap-scale h-8 w-full justify-center rounded-full px-4 font-semibold sm:h-9 sm:w-auto"
                />
              }
            >
              <Eye className="h-3.5 w-3.5" />
              Quick View
            </DialogTrigger>
            <DialogContent className="max-h-[90svh] overflow-y-auto p-0 sm:max-w-3xl">
              <div className="grid sm:grid-cols-2">
                <MediaFrame
                  src={product.images[0]}
                  alt={product.name}
                  icon={Icon}
                  seed={product.slug}
                  fit={imageFit}
                  className="aspect-[4/3] sm:aspect-auto sm:min-h-full"
                  sizes="(max-width: 640px) 100vw, 24rem"
                />
                <div className="flex flex-col p-6">
                  <DialogHeader className="text-left">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {product.brand} ·{" "}
                      {getCategoryMeta(product.category)?.shortName}
                    </p>
                    <DialogTitle className="text-xl font-extrabold tracking-tight">
                      {product.name}
                    </DialogTitle>
                    <DialogDescription className="leading-relaxed">
                      {product.short_description}
                    </DialogDescription>
                  </DialogHeader>

                  {product.specs.length > 0 && (
                    <dl className="mt-4 space-y-1.5 rounded-xl bg-muted/60 p-4 text-sm">
                      {product.specs.slice(0, 4).map((spec) => (
                        <div key={spec.label} className="flex gap-2">
                          <dt className="w-2/5 shrink-0 font-semibold text-muted-foreground">
                            {spec.label}
                          </dt>
                          <dd>{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    <Button
                      render={<Link href={detailHref} />}
                      className="rounded-full bg-gradient-brand font-semibold text-white"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
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
                        variant="outline"
                        className="rounded-full font-semibold"
                      >
                        <Download className="h-4 w-4" /> Brochure
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            render={<Link href={detailHref} />}
            variant="ghost"
            size="sm"
            className="tap-scale h-8 w-full justify-center rounded-full px-4 font-semibold text-primary hover:text-primary sm:h-9 sm:w-auto"
          >
            Learn More <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}

export function InquireButton({ productName }: { productName: string }) {
  return (
    <Button
      render={
        <Link href={`/contact?subject=${encodeURIComponent(productName)}`} />
      }
      size="lg"
      variant="outline"
      className="rounded-full font-semibold"
    >
      <MessageSquareMore className="h-4 w-4" />
      Inquire About This Product
    </Button>
  );
}
