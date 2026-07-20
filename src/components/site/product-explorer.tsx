"use client";

import { useMemo, useState } from "react";
import { PackageSearch, Search } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/site/product-card";

export function ProductExplorer({
  products,
  maxCols = 4,
}: {
  products: Product[];
  /** 3 shows bigger cards — great for equipment with product photos. */
  maxCols?: 3 | 4;
}) {
  const [query, setQuery] = useState("");
  const [subcategory, setSubcategory] = useState<string>("all");
  const [brand, setBrand] = useState<string>("all");

  const subcategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.subcategory))).sort(),
    [products]
  );
  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (subcategory === "all" || p.subcategory === subcategory) &&
        (brand === "all" || p.brand === brand) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q))
    );
  }, [products, query, subcategory, brand]);

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-56 flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products or brands…"
              className="h-11 rounded-full pl-10"
              aria-label="Search products"
            />
          </div>
          <Select value={brand} onValueChange={(v) => setBrand(v ?? "all")}>
            <SelectTrigger
              className="h-11 w-52 rounded-full"
              aria-label="Filter by brand"
            >
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="ml-auto text-sm font-semibold text-muted-foreground">
            {filtered.length} product{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSubcategory("all")}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
              subcategory === "all"
                ? "border-transparent bg-gradient-brand text-white shadow-sm"
                : "bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {subcategories.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSubcategory(s)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                subcategory === s
                  ? "border-transparent bg-gradient-brand text-white shadow-sm"
                  : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div
          className={
            maxCols === 3
              ? "grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-3"
              : "grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
          }
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed py-20 text-center">
          <PackageSearch className="h-12 w-12 text-muted-foreground/50" />
          <div>
            <p className="font-bold">No products match your filters</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term, brand, or category.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
