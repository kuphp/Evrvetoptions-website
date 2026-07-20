import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getSupabasePublicClient } from "@/lib/supabase/public";
import {
  seedBrands,
  seedCeo,
  seedCertificates,
  seedCompany,
  seedContact,
  seedEvents,
  seedFaqs,
  seedGallery,
  seedHeroSlides,
  seedPartners,
  seedProducts,
  seedPromotions,
  seedSupport,
  seedTestimonials,
} from "@/lib/seed";
import type {
  Brand,
  Certificate,
  EventItem,
  Faq,
  GalleryImage,
  HeroSlide,
  Partner,
  Product,
  ProductCategory,
  Promotion,
  SiteContent,
  Testimonial,
} from "@/lib/types";

/**
 * Fetch a full table, falling back to bundled seed content when Supabase is
 * not configured, errors out, or the table has never been seeded (0 rows).
 * "Active" filtering happens in JS so that a connected-but-empty database
 * still renders a complete site.
 */
async function fetchTable<T>(
  table: string,
  seed: T[],
  order?: { column: string; ascending?: boolean }
): Promise<T[]> {
  if (!isSupabaseConfigured()) return seed;
  try {
    const supabase = getSupabasePublicClient();
    let query = supabase.from(table).select("*");
    if (order) {
      query = query.order(order.column, { ascending: order.ascending ?? true });
    }
    const { data, error } = await query;
    if (error || !data || data.length === 0) return seed;
    return data as T[];
  } catch {
    return seed;
  }
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const rows = await fetchTable<HeroSlide>("hero_slides", seedHeroSlides, {
    column: "sort_order",
  });
  return rows.filter((s) => s.active);
}

export async function getSiteContent(): Promise<SiteContent> {
  const fallback: SiteContent = {
    company: seedCompany,
    ceo: seedCeo,
    contact: seedContact,
    support: seedSupport,
  };
  if (!isSupabaseConfigured()) return fallback;
  try {
    const supabase = getSupabasePublicClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value");
    if (error || !data) return fallback;
    const map = Object.fromEntries(data.map((row) => [row.key, row.value]));
    return {
      company: { ...seedCompany, ...(map.company ?? {}) },
      ceo: { ...seedCeo, ...(map.ceo ?? {}) },
      contact: { ...seedContact, ...(map.contact ?? {}) },
      support: { ...seedSupport, ...(map.support ?? {}) },
    };
  } catch {
    return fallback;
  }
}

export async function getProducts(filter?: {
  category?: ProductCategory;
  featured?: boolean;
  bestSeller?: boolean;
}): Promise<Product[]> {
  const rows = await fetchTable<Product>("products", seedProducts, {
    column: "name",
  });
  return rows.filter(
    (p) =>
      p.active &&
      (!filter?.category || p.category === filter.category) &&
      (filter?.featured === undefined || p.featured === filter.featured) &&
      (filter?.bestSeller === undefined || p.best_seller === filter.bestSeller)
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const rows = await getProducts();
  return rows.find((p) => p.slug === slug) ?? null;
}

export async function getBrands(): Promise<Brand[]> {
  return fetchTable<Brand>("brands", seedBrands, { column: "name" });
}

export async function getPromotions(): Promise<Promotion[]> {
  const rows = await fetchTable<Promotion>("promotions", seedPromotions, {
    column: "starts_at",
    ascending: false,
  });
  return rows.filter((p) => p.active);
}

export async function getEvents(): Promise<EventItem[]> {
  return fetchTable<EventItem>("events", seedEvents, {
    column: "date",
    ascending: false,
  });
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const rows = await getEvents();
  return rows.find((e) => e.slug === slug) ?? null;
}

export async function getPartners(): Promise<Partner[]> {
  return fetchTable<Partner>("partners", seedPartners, {
    column: "sort_order",
  });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await fetchTable<Testimonial>("testimonials", seedTestimonials);
  return rows.filter((t) => t.active);
}

export async function getCertificates(): Promise<Certificate[]> {
  return fetchTable<Certificate>("certificates", seedCertificates, {
    column: "year",
    ascending: false,
  });
}

export async function getFaqs(): Promise<Faq[]> {
  const rows = await fetchTable<Faq>("faqs", seedFaqs, {
    column: "sort_order",
  });
  return rows.filter((f) => f.active);
}

export async function getGallery(): Promise<GalleryImage[]> {
  return fetchTable<GalleryImage>("gallery", seedGallery);
}
