import { Microscope, PawPrint, Tractor, type LucideIcon } from "lucide-react";
import type { ProductCategory } from "@/lib/types";

export const CATEGORY_ICONS: Record<ProductCategory, LucideIcon> = {
  livestock: Tractor,
  "pet-consumables": PawPrint,
  equipment: Microscope,
};
