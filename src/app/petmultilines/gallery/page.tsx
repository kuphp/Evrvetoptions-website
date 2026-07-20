import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { getGallery } from "@/lib/data";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { PageHero } from "@/components/site/page-hero";
import { MediaFrame } from "@/components/site/media-frame";
import { RevealItem, RevealStagger } from "@/components/site/reveal";
import { PMCta } from "@/components/pm/pm-cta";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Inside the Pet Multilines showroom, installations, demos, and events.",
};

export default async function PMGalleryPage() {
  const gallery = await getGallery();
  const photos = gallery.filter((g) =>
    ["showroom", "events", "office", "other"].includes(g.category)
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Showroom, Installations & Events"
        description="A look inside our equipment showroom, client installations, trainings, and industry events."
      />

      <section className="section-pad">
        <div className="container-page">
          {photos.length > 0 ? (
            <RevealStagger className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {photos.map((photo) => (
                <RevealItem key={photo.id}>
                  <MediaFrame
                    src={photo.image_url}
                    alt={photo.title}
                    icon={Camera}
                    seed={photo.id}
                    className="aspect-[4/3] rounded-2xl border"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                      <p className="text-sm font-bold text-white">
                        {photo.title}
                      </p>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-white/70">
                        {GALLERY_CATEGORIES.find(
                          (c) => c.value === photo.category
                        )?.label ?? photo.category}
                      </p>
                    </div>
                  </MediaFrame>
                </RevealItem>
              ))}
            </RevealStagger>
          ) : (
            <p className="text-center text-muted-foreground">
              Photos coming soon.
            </p>
          )}
        </div>
      </section>

      <PMCta />
    </>
  );
}
