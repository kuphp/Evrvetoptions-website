import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { EQUIPMENT_META, PM_BASE, PM_NAME, PRODUCT_CATEGORIES } from "@/lib/constants";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import { SectionHeading } from "@/components/site/section-heading";
import { RevealItem, RevealStagger } from "@/components/site/reveal";

export function CategoryCards() {
  const EquipmentIcon = CATEGORY_ICONS.equipment;

  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Do"
          title="One Trusted Partner for Animal Health"
          description="From large-scale farms to neighborhood clinics and pet shops — plus a dedicated equipment division under Pet Multilines."
        />

        <RevealStagger className="grid gap-7 md:grid-cols-3">
          {PRODUCT_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug];
            return (
              <RevealItem key={category.slug} className="h-full">
                <Link
                  href={`/products/${category.slug}`}
                  className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border bg-card"
                >
                  <div
                    className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${category.gradient}`}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.14]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)",
                        backgroundSize: "34px 34px",
                      }}
                    />
                    <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-125" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-10 w-10 text-white" strokeWidth={1.5} />
                    </div>
                    <ArrowUpRight className="absolute right-5 top-5 h-6 w-6 text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-xl font-extrabold tracking-tight transition-colors group-hover:text-primary">
                      {category.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {category.bullets.map((bullet) => (
                        <span
                          key={bullet}
                          className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"
                        >
                          {bullet}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}

          {/* Pet Multilines — dedicated equipment division microsite */}
          <RevealItem className="h-full">
            <Link
              href={PM_BASE}
              className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-dashed border-primary/30 bg-card"
            >
              <div
                className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${EQUIPMENT_META.gradient}`}
              >
                <div
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                  }}
                />
                <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-125" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <EquipmentIcon
                    className="h-10 w-10 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-widest text-brand-deep">
                  {PM_NAME}
                </span>
                <ExternalLink className="absolute right-5 top-5 h-5 w-5 text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-extrabold tracking-tight transition-colors group-hover:text-primary">
                  Machines &amp; Equipment
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Veterinary imaging, laboratory, and clinical equipment are
                  served by <span className="font-bold">Pet Multilines</span> —
                  our dedicated equipment division with its own showroom,
                  engineers, and after-sales team.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {EQUIPMENT_META.bullets.map((bullet) => (
                    <span
                      key={bullet}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"
                    >
                      {bullet}
                    </span>
                  ))}
                </div>
                <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Visit Pet Multilines <ArrowUpRight className="h-4 w-4" />
                </p>
              </div>
            </Link>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}
