export type ProductCategory = "livestock" | "pet-consumables" | "equipment";

export type EventType = "seminar" | "expo" | "training" | "conference" | "other";

export type PromotionType = "bundle" | "seasonal" | "banner";

export type GalleryCategory =
  | "office"
  | "warehouse"
  | "showroom"
  | "team"
  | "events"
  | "other";

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  cta_label: string;
  cta_href: string;
  cta_secondary_label?: string | null;
  cta_secondary_href?: string | null;
  image_url?: string | null;
  sort_order: number;
  active: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  brand: string;
  short_description: string;
  description: string;
  specs: ProductSpec[];
  images: string[];
  brochure_url?: string | null;
  featured: boolean;
  best_seller: boolean;
  active: boolean;
  created_at?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo_url?: string | null;
  categories: ProductCategory[];
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: PromotionType;
  banner_url?: string | null;
  starts_at: string;
  ends_at: string;
  items: string[];
  active: boolean;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  type: EventType;
  date: string;
  end_date?: string | null;
  location: string;
  description: string;
  cover_url?: string | null;
  photos: string[];
}

export interface Partner {
  id: string;
  name: string;
  logo_url?: string | null;
  website?: string | null;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar_url?: string | null;
  active: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  type: "certificate" | "award";
  issued_by: string;
  year: number;
  image_url?: string | null;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  active: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: GalleryCategory;
  image_url?: string | null;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface CoreValue {
  title: string;
  description: string;
}

export interface CompanyStat {
  value: string;
  label: string;
}

export interface CompanyInfo {
  name: string;
  short_name: string;
  tagline: string;
  intro: string;
  profile: string;
  history: string;
  mission: string;
  vision: string;
  core_values: CoreValue[];
  stats: CompanyStat[];
}

export interface CeoInfo {
  name: string;
  title: string;
  message: string;
  quote: string;
  photo_url?: string | null;
}

export interface BusinessHour {
  days: string;
  hours: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  messenger?: string;
  whatsapp?: string;
  viber?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  phone_alt?: string | null;
  email: string;
  email_sales?: string | null;
  map_embed_url: string;
  business_hours: BusinessHour[];
  socials: SocialLinks;
}

export interface SupportInfo {
  warranty: string;
  after_sales: string;
}

export interface SiteContent {
  company: CompanyInfo;
  ceo: CeoInfo;
  contact: ContactInfo;
  support: SupportInfo;
}
