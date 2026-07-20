import type { MetadataRoute } from "next";
import { PM_BASE, PRODUCT_CATEGORIES, SITE_URL } from "@/lib/constants";
import { getEvents, getProducts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, events] = await Promise.all([getProducts(), getEvents()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/products",
    "/events",
    "/promotions",
    "/partners",
    "/contact",
    PM_BASE,
    `${PM_BASE}/about`,
    `${PM_BASE}/products`,
    `${PM_BASE}/services`,
    `${PM_BASE}/gallery`,
    `${PM_BASE}/news`,
    `${PM_BASE}/contact`,
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "" || path === PM_BASE ? 1 : 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map((c) => ({
    url: `${SITE_URL}/products/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url:
      p.category === "equipment"
        ? `${SITE_URL}${PM_BASE}/products/${p.slug}`
        : `${SITE_URL}/products/${p.category}/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${SITE_URL}/events/${e.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...eventRoutes];
}
