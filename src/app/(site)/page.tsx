import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { parseISO } from "date-fns";
import {
  getCertificates,
  getEvents,
  getFaqs,
  getHeroSlides,
  getPartners,
  getProducts,
  getPromotions,
  getSiteContent,
  getTestimonials,
} from "@/lib/data";
import { getPromoStatus } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/site/home/hero-carousel";
import { CategoryCards } from "@/components/site/home/category-cards";
import { OverviewSection } from "@/components/site/home/overview-section";
import { CeoSection } from "@/components/site/home/ceo-section";
import { FeaturedProductsCarousel } from "@/components/site/featured-products";
import { ProductCard } from "@/components/site/product-card";
import { PromoCard } from "@/components/site/promo-card";
import { EventCard } from "@/components/site/event-card";
import { PartnersMarquee } from "@/components/site/partners-marquee";
import { TestimonialsGrid } from "@/components/site/testimonials-section";
import { CertificatesGrid } from "@/components/site/certificates-section";
import { FaqAccordion } from "@/components/site/faq-section";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/site/reveal";

export default async function HomePage() {
  const [
    slides,
    content,
    featured,
    bestSellers,
    promotions,
    events,
    partners,
    testimonials,
    certificates,
    faqs,
  ] = await Promise.all([
    getHeroSlides(),
    getSiteContent(),
    getProducts({ featured: true }),
    getProducts({ bestSeller: true }),
    getPromotions(),
    getEvents(),
    getPartners(),
    getTestimonials(),
    getCertificates(),
    getFaqs(),
  ]);

  // Machines & Equipment lives on the Pet Multilines microsite.
  const featuredEvr = featured.filter((p) => p.category !== "equipment");
  const bestSellersEvr = bestSellers.filter((p) => p.category !== "equipment");

  const now = new Date();
  const upcomingEvents = events
    .filter((e) => parseISO(e.end_date ?? e.date) >= now)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
  const highlightedPromos = promotions
    .filter((p) => getPromoStatus(p) !== "expired")
    .slice(0, 2);

  return (
    <>
      <HeroCarousel slides={slides} />
      <CategoryCards />
      <OverviewSection company={content.company} />
      <CeoSection ceo={content.ceo} />

      {/* Featured products */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Handpicked For You"
            title="Featured Products"
            description="A curated selection from across our three divisions — chosen by our veterinarians and product specialists."
          />
          <FeaturedProductsCarousel products={featuredEvr} />
          <Reveal className="mt-10 text-center">
            <Button
              render={<Link href="/products" />}
              variant="outline"
              size="lg"
              className="rounded-full px-7 font-semibold"
            >
              View All Products <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Best sellers */}
      {bestSellersEvr.length > 0 && (
        <section className="section-pad border-y bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="Customer Favorites"
              title="Best Selling Products"
              description="The products our customers keep coming back for — proven in Philippine farms, clinics, and shops."
            />
            <div className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
              {bestSellersEvr.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Promotions */}
      {highlightedPromos.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Save More"
              title="Current Promotions"
              description="Bundle deals and seasonal offers designed to give your business more value."
            />
            <div className="grid gap-7 md:grid-cols-2">
              {highlightedPromos.map((promo) => (
                <PromoCard key={promo.id} promo={promo} />
              ))}
            </div>
            <Reveal className="mt-10 text-center">
              <Button
                render={<Link href="/promotions" />}
                variant="outline"
                size="lg"
                className="rounded-full px-7 font-semibold"
              >
                See All Promotions <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
        </section>
      )}

      {/* Upcoming events */}
      {upcomingEvents.length > 0 && (
        <section className="section-pad border-y bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="Join Us"
              title="Upcoming Events & Trainings"
              description="Seminars, expos, and hands-on trainings where you can meet our team and grow your practice."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            <Reveal className="mt-10 text-center">
              <Button
                render={<Link href="/events" />}
                variant="outline"
                size="lg"
                className="rounded-full px-7 font-semibold"
              >
                All Events <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
        </section>
      )}

      {/* Partners */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Trusted Principals"
            title="Our Partner Brands"
            description="We proudly represent respected animal health and equipment brands, bringing their best to the Philippine market."
          />
        </div>
        <Reveal>
          <PartnersMarquee partners={partners} />
        </Reveal>
        <Reveal className="mt-10 text-center">
          <Button
            render={<Link href="/partners" />}
            variant="outline"
            size="lg"
            className="rounded-full px-7 font-semibold"
          >
            Meet Our Partners <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-pad border-y bg-muted/40">
          <div className="container-page">
            <SectionHeading
              eyebrow="What Clients Say"
              title="Trusted by Farms, Clinics & Pet Businesses"
              description="Real feedback from the veterinarians, farm owners, and entrepreneurs we serve every day."
            />
            <TestimonialsGrid testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* Certificates & awards */}
      {certificates.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Credentials"
              title="Certificates & Awards"
              description="Licensed, certified, and recognized — our commitment to quality is documented."
            />
            <CertificatesGrid certificates={certificates.slice(0, 3)} />
            <Reveal className="mt-10 text-center">
              <Button
                render={<Link href="/about#credentials" />}
                variant="outline"
                size="lg"
                className="rounded-full px-7 font-semibold"
              >
                View All Credentials <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="section-pad border-t bg-muted/40" id="faqs">
          <div className="container-page">
            <SectionHeading
              eyebrow="Good to Know"
              title="Frequently Asked Questions"
              description="Quick answers about ordering, delivery, warranties, and partnering with EVR Vet Options."
            />
            <FaqAccordion faqs={faqs.slice(0, 5)} />
            <Reveal className="mt-8 text-center text-sm text-muted-foreground">
              Have another question?{" "}
              <Link
                href="/contact"
                className="font-bold text-primary hover:underline"
              >
                Talk to our team →
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
