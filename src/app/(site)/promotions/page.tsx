import type { Metadata } from "next";
import { getPromotions } from "@/lib/data";
import { getPromoStatus } from "@/lib/format";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { PromoCard } from "@/components/site/promo-card";
import { CtaBand } from "@/components/site/cta-band";

export const metadata: Metadata = {
  title: "Promotions",
  description:
    "Current bundle deals, seasonal promos, and special offers from EVR Vet Options — more value for your farm, clinic, or store.",
};

export default async function PromotionsPage() {
  const promotions = await getPromotions();

  const active = promotions.filter((p) => getPromoStatus(p) === "active");
  const upcoming = promotions.filter((p) => getPromoStatus(p) === "upcoming");
  const expired = promotions.filter((p) => getPromoStatus(p) === "expired");

  return (
    <>
      <PageHero
        eyebrow="Deals & Offers"
        title="Promotions & Bundle Deals"
        description="Seasonal offers, bundles, and special packages designed to give your business more value. Promos run for a limited time — grab them while they last!"
      />

      {active.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Available Now"
              title="Ongoing Promotions"
              description="These offers are live — contact us today to avail."
            />
            <div className="grid gap-7 md:grid-cols-2">
              {active.map((promo) => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
            </div>
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="section-pad border-y bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="Get Ready"
              title="Coming Soon"
              description="Upcoming offers worth waiting for — message us to be notified when they launch."
            />
            <div className="grid gap-7 md:grid-cols-2">
              {upcoming.map((promo) => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
            </div>
          </div>
        </section>
      )}

      {expired.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Archive"
              title="Past Promotions"
              description="Missed these? Follow our social pages so you never miss the next one."
            />
            <div className="grid gap-7 md:grid-cols-2">
              {expired.map((promo) => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
            </div>
          </div>
        </section>
      )}

      {promotions.length === 0 && (
        <section className="section-pad">
          <div className="container-page text-center text-muted-foreground">
            No promotions at the moment — check back soon!
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
