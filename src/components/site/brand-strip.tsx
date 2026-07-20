import Image from "next/image";
import type { Brand } from "@/lib/types";

/** Row of brand logos on clean white chips (falls back to text chips). */
export function BrandStrip({ brands }: { brands: Brand[] }) {
  if (brands.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {brands.map((brand) =>
        brand.logo_url ? (
          <span
            key={brand.id}
            title={brand.name}
            className="flex h-14 items-center justify-center rounded-2xl border bg-white px-5 shadow-sm transition-shadow hover:shadow-soft sm:h-16 sm:px-6"
          >
            <Image
              src={brand.logo_url}
              alt={brand.name}
              width={150}
              height={56}
              className="h-8 w-auto max-w-28 object-contain sm:h-10 sm:max-w-36"
            />
          </span>
        ) : (
          <span
            key={brand.id}
            className="glass rounded-full px-6 py-2.5 text-sm font-extrabold tracking-tight text-foreground/70"
          >
            {brand.name}
          </span>
        )
      )}
    </div>
  );
}
