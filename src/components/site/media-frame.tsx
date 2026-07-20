import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-[#0b7c0b] via-[#046304] to-[#023902]",
  "from-[#3423e0] via-[#1004b4] to-[#0a026f]",
  "from-[#046304] via-[#14549c] to-[#1004b4]",
  "from-[#1004b4] via-[#0d3d9c] to-[#046304]",
  "from-[#0b7c0b] via-[#0a5a8a] to-[#2114c9]",
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Renders a real image when `src` exists, otherwise a branded gradient
 * placeholder with an icon — so the site looks finished before any media
 * has been uploaded through the admin panel.
 */
export function MediaFrame({
  src,
  alt,
  icon: Icon,
  seed = "evr",
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  iconClassName,
  fit = "cover",
  children,
}: {
  src?: string | null;
  alt: string;
  icon?: LucideIcon;
  seed?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  iconClassName?: string;
  /** "contain" shows the whole image on a clean white plate — ideal for 3D product renders. */
  fit?: "cover" | "contain";
  children?: React.ReactNode;
}) {
  const gradient = GRADIENTS[hashString(seed) % GRADIENTS.length];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        <>
          {fit === "contain" && <div className="absolute inset-0 bg-white" />}
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={
              fit === "contain" ? "object-contain p-4" : "object-cover"
            }
          />
        </>
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            gradient
          )}
        >
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-black/15 blur-2xl" />
          {Icon && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon
                strokeWidth={1.25}
                className={cn("h-1/3 w-1/3 text-white/70", iconClassName)}
              />
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
