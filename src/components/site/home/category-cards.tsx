import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { CATEGORY_ICONS } from "@/lib/category-icons";
import { SectionHeading } from "@/components/site/section-heading";
import { RevealItem, RevealStagger } from "@/components/site/reveal";

export function CategoryCards() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Do"
          title="Three Divisions. One Trusted Partner."
          description="From large-scale farms to neighborhood clinics and pet shops, our three business divisions cover every corner of animal health."
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
        </RevealStagger>
      </div>
    </section>
  );
}
