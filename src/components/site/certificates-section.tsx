import { FileCheck2, Trophy } from "lucide-react";
import type { Certificate } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { MediaFrame } from "@/components/site/media-frame";
import { RevealItem, RevealStagger } from "@/components/site/reveal";

export function CertificatesGrid({
  certificates,
}: {
  certificates: Certificate[];
}) {
  return (
    <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certificates.map((cert) => (
        <RevealItem key={cert.id}>
          <div className="card-hover group h-full overflow-hidden rounded-2xl border bg-card">
            <MediaFrame
              src={cert.image_url}
              alt={cert.title}
              icon={cert.type === "award" ? Trophy : FileCheck2}
              seed={cert.id}
              className="aspect-[16/9]"
              sizes="(max-width: 640px) 100vw, 33vw"
            >
              <Badge
                className={
                  cert.type === "award"
                    ? "absolute left-3 top-3 border-0 bg-amber-500 text-white"
                    : "absolute left-3 top-3 border-0 bg-gradient-brand text-white"
                }
              >
                {cert.type === "award" ? "Award" : "Certificate"}
              </Badge>
            </MediaFrame>
            <div className="p-5">
              <h3 className="line-clamp-2 font-bold leading-snug tracking-tight">
                {cert.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {cert.issued_by} · {cert.year}
              </p>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}
