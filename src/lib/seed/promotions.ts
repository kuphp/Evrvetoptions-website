import type { Promotion } from "@/lib/types";

export const seedPromotions: Promotion[] = [
  {
    id: "pr-1",
    title: "Rainy Season Farm Protection Bundle",
    description:
      "Keep your flock and herd protected through the wet months. Every bundle includes FarmGuard disinfectant, ElectroLyte Plus, and VitaBoost ADE Forte at a special package price — plus free biosecurity assessment for orders of 5 bundles and up.",
    type: "bundle",
    banner_url: null,
    starts_at: "2026-07-01",
    ends_at: "2026-09-30",
    items: [
      "BioShield FarmGuard Disinfectant 5 L × 2",
      "PhilFarm ElectroLyte Plus 1 kg × 5",
      "PhilFarm VitaBoost ADE Forte 100 mL × 3",
      "FREE biosecurity farm assessment (5+ bundles)",
    ],
    active: true,
  },
  {
    id: "pr-2",
    title: "Pet Wellness Month: Buy 10 + 2 Free Dewormers",
    description:
      "Stock up for Pet Wellness Month! For every 10 boxes of NutriPaws Total Dewormer, get 2 boxes free — plus point-of-sale materials for your clinic or shop while supplies last.",
    type: "seasonal",
    banner_url: null,
    starts_at: "2026-07-15",
    ends_at: "2026-08-31",
    items: [
      "NutriPaws Total Dewormer — Buy 10 boxes, get 2 FREE",
      "FREE counter display & poster kit",
      "Applies to boxes of 100 tablets",
    ],
    active: true,
  },
  {
    id: "pr-3",
    title: "Clinic Starter Equipment Package",
    description:
      "Opening or upgrading a practice? Get the SonoView 60 ultrasound, VitalTrack monitor, and AutoClave S-50 as a package with zero-interest installment terms, free installation, and staff training included.",
    type: "bundle",
    banner_url: null,
    starts_at: "2026-08-01",
    ends_at: "2026-12-31",
    items: [
      "ProVet SonoView 60 Color Doppler Ultrasound",
      "ProVet VitalTrack Patient Monitor",
      "VetTech AutoClave S-50",
      "FREE installation + staff training",
      "0% installment up to 12 months",
    ],
    active: true,
  },
  {
    id: "pr-4",
    title: "Anniversary Sale — Up to 20% Off Grooming Lines",
    description:
      "Our anniversary treat for groomers and pet shops: up to 20% off the entire GroomPro line, including salon-size formats. Thank you for growing with EVR Vet Options!",
    type: "banner",
    banner_url: null,
    starts_at: "2026-03-01",
    ends_at: "2026-03-31",
    items: [
      "GroomPro shampoos & conditioners — 20% off",
      "GroomPro Ear Care Solution — 15% off",
      "Minimum order of 1 case per SKU",
    ],
    active: true,
  },
];
