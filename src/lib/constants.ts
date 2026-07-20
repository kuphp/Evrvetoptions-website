import type { ProductCategory } from "@/lib/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.evrvetoptions.com";

export const COMPANY_NAME = "EVR Vet Options Corporation";
export const COMPANY_SHORT = "EVR Vet Options";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Livestock", href: "/products/livestock" },
      { label: "Pet Consumables", href: "/products/pet-consumables" },
      { label: "Machines & Equipment", href: "/products/equipment" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Promotions", href: "/promotions" },
  { label: "Partners", href: "/partners" },
  { label: "Contact Us", href: "/contact" },
] as const;

export interface CategoryMeta {
  slug: ProductCategory;
  name: string;
  shortName: string;
  description: string;
  bullets: string[];
  gradient: string;
  tint: string;
  icon: "livestock" | "pets" | "equipment";
}

export const PRODUCT_CATEGORIES: CategoryMeta[] = [
  {
    slug: "livestock",
    name: "Livestock Solutions",
    shortName: "Livestock",
    description:
      "Complete health programs and farm solutions for poultry, swine, cattle, and goats — from biologics and nutrition to farm management essentials.",
    bullets: ["Poultry", "Swine", "Cattle", "Goats", "Farm Management"],
    gradient: "from-[#0b7c0b] via-[#024f02] to-[#013101]",
    tint: "text-[#046304] dark:text-[#5ec95e]",
    icon: "livestock",
  },
  {
    slug: "pet-consumables",
    name: "Pet Consumables",
    shortName: "Pet Consumables",
    description:
      "Trusted consumables for companion animals — anti-tick and flea treatments, dewormers, vitamins, grooming lines, pet food, and daily supplements.",
    bullets: ["Anti-tick & Flea", "Dewormers", "Vitamins", "Grooming", "Pet Food"],
    gradient: "from-[#3423e0] via-[#1004b4] to-[#0a026f]",
    tint: "text-[#1004b4] dark:text-[#8a7bff]",
    icon: "pets",
  },
  {
    slug: "equipment",
    name: "Machines & Equipment",
    shortName: "Machines & Equipment",
    description:
      "World-class veterinary and medical equipment — imaging, diagnostics, and laboratory systems with full specifications, brochures, and after-sales support.",
    bullets: ["X-ray", "Ultrasound", "CT Imaging", "Laboratory", "Diagnostics"],
    gradient: "from-[#046304] via-[#14549c] to-[#1004b4]",
    tint: "text-[#14549c] dark:text-[#7f9fff]",
    icon: "equipment",
  },
];

export function getCategoryMeta(slug: string): CategoryMeta | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export const GALLERY_CATEGORIES = [
  { value: "office", label: "Office" },
  { value: "warehouse", label: "Warehouse" },
  { value: "showroom", label: "Showroom" },
  { value: "team", label: "Team" },
  { value: "events", label: "Events" },
  { value: "other", label: "Other" },
] as const;

export const EVENT_TYPES = [
  { value: "seminar", label: "Seminar" },
  { value: "expo", label: "Expo" },
  { value: "training", label: "Training" },
  { value: "conference", label: "Conference" },
  { value: "other", label: "Other" },
] as const;

export const PROMO_TYPES = [
  { value: "bundle", label: "Bundle Deal" },
  { value: "seasonal", label: "Seasonal Promo" },
  { value: "banner", label: "Promo Banner" },
] as const;
