import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-9 w-9", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="evr-logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#024f02" />
          <stop offset="1" stopColor="#1004b4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#evr-logo-g)" />
      <g fill="#ffffff">
        <ellipse cx="24" cy="22.5" rx="4.6" ry="6" transform="rotate(-14 24 22.5)" />
        <ellipse cx="40" cy="22.5" rx="4.6" ry="6" transform="rotate(14 40 22.5)" />
        <ellipse cx="14.8" cy="32.5" rx="4" ry="5.2" transform="rotate(-30 14.8 32.5)" />
        <ellipse cx="49.2" cy="32.5" rx="4" ry="5.2" transform="rotate(30 49.2 32.5)" />
        <path d="M32 30c6.4 0 12.6 5.2 12.6 11.4 0 4.4-3.4 7.1-7.4 7.1-2 0-3.6-.6-5.2-1.2-1.6.6-3.2 1.2-5.2 1.2-4 0-7.4-2.7-7.4-7.1C19.4 35.2 25.6 30 32 30z" />
      </g>
      <g fill="#024f02">
        <rect x="29.9" y="36.4" width="4.2" height="10.4" rx="1.6" />
        <rect x="26.8" y="39.5" width="10.4" height="4.2" rx="1.6" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  compact = false,
}: {
  className?: string;
  markClassName?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="EVR Vet Options Corporation — Home"
    >
      <LogoMark
        className={cn(
          "transition-transform duration-300 group-hover:scale-105",
          markClassName
        )}
      />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[1.05rem] font-extrabold tracking-tight">
            EVR <span className="text-gradient">Vet Options</span>
          </span>
          <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Corporation
          </span>
        </span>
      )}
    </Link>
  );
}
