import Image from "next/image";
import type { Partner } from "@/lib/types";
import { cn } from "@/lib/utils";

function PartnerChip({ partner }: { partner: Partner }) {
  const body = partner.logo_url ? (
    <Image
      src={partner.logo_url}
      alt={partner.name}
      width={150}
      height={48}
      className="h-10 w-auto max-w-36 object-contain"
    />
  ) : (
    <span className="whitespace-nowrap text-base font-extrabold tracking-tight text-slate-600 transition-colors group-hover/chip:text-slate-900">
      {partner.name}
    </span>
  );

  const className =
    "group/chip flex h-16 shrink-0 items-center justify-center rounded-2xl border bg-white px-8 shadow-sm transition-all hover:shadow-soft";

  return partner.website ? (
    <a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={partner.name}
    >
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}

export function PartnersMarquee({
  partners,
  className,
}: {
  partners: Partner[];
  className?: string;
}) {
  if (partners.length === 0) return null;
  const doubled = [...partners, ...partners];

  return (
    <div
      className={cn(
        "pause-on-hover relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div className="animate-marquee-slow flex w-max gap-5">
        {doubled.map((partner, i) => (
          <PartnerChip key={`${partner.id}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}
