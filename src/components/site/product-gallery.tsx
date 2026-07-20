"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductCategory } from "@/lib/types";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import { cn } from "@/lib/utils";
import { MediaFrame } from "@/components/site/media-frame";

export function ProductGallery({
  images,
  name,
  category,
  seed,
}: {
  images: string[];
  name: string;
  category: ProductCategory;
  seed: string;
}) {
  const [active, setActive] = useState(0);
  // Equipment photos are usually 3D renders — show them whole on a clean plate.
  const contain = category === "equipment";

  if (images.length === 0) {
    return (
      <MediaFrame
        src={null}
        alt={name}
        icon={CATEGORY_ICONS[category]}
        seed={seed}
        className="aspect-square rounded-3xl border shadow-soft"
        sizes="(max-width: 1024px) 100vw, 45vw"
        priority
      />
    );
  }

  return (
    <div>
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-3xl border shadow-soft",
          contain ? "bg-white" : "bg-muted"
        )}
      >
        <Image
          src={images[active]}
          alt={`${name} — photo ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className={contain ? "object-contain p-8" : "object-cover"}
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                contain ? "bg-white" : "bg-muted",
                active === i
                  ? "border-primary shadow-soft"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className={contain ? "object-contain p-1" : "object-cover"}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
