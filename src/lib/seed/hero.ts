import type { HeroSlide } from "@/lib/types";

export const seedHeroSlides: HeroSlide[] = [
  {
    id: "hs-1",
    title: "Advancing Animal Health Across the Philippines",
    subtitle:
      "Excellence. Value. Reliability. World-class veterinary products, consumables, and equipment for farms, clinics, and pet businesses nationwide.",
    cta_label: "Explore Our Products",
    cta_href: "/products",
    cta_secondary_label: "Get in Touch",
    cta_secondary_href: "/contact",
    image_url: null,
    sort_order: 1,
    active: true,
  },
  {
    id: "hs-2",
    title: "Complete Solutions for Modern Livestock Farms",
    subtitle:
      "Biologics, nutrition, and farm management essentials for poultry, swine, cattle, and goats — backed by licensed veterinarians and nationwide delivery.",
    cta_label: "Livestock Solutions",
    cta_href: "/products/livestock",
    cta_secondary_label: "Talk to Our Team",
    cta_secondary_href: "/contact",
    image_url: "/images/hero-livestock.jpg",
    sort_order: 2,
    active: true,
  },
  {
    id: "hs-3",
    title: "Everything Your Companion Animals Deserve",
    subtitle:
      "From anti-tick treatments and dewormers to premium nutrition and grooming lines — trusted pet consumables for clinics, groomers, and pet shops.",
    cta_label: "Pet Consumables",
    cta_href: "/products/pet-consumables",
    cta_secondary_label: "View Promotions",
    cta_secondary_href: "/promotions",
    image_url: "/images/hero-pets.jpg",
    sort_order: 3,
    active: true,
  },
  {
    id: "hs-4",
    title: "World-Class Veterinary Machines & Equipment",
    subtitle:
      "Digital X-ray, ultrasound, CT imaging, and laboratory systems — served by Pet Multilines, our dedicated equipment division, with installation, training, and after-sales service.",
    cta_label: "Visit Pet Multilines",
    cta_href: "/petmultilines",
    cta_secondary_label: "Request a Demo",
    cta_secondary_href: "/petmultilines/contact",
    image_url: "/images/hero-equipment.jpg",
    sort_order: 4,
    active: true,
  },
];
