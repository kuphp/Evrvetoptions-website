# EVR Vet Options Corporation — Corporate Website

A premium, fully responsive corporate website for **EVR Vet Options Corporation**, a Philippine veterinary solutions company with three divisions: **Livestock Solutions**, **Pet Consumables**, and **Machines & Equipment** — plus a secure, no-code **Admin Panel** for managing every piece of content.

## Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (Base UI)
- **Framer Motion** (scroll & hero animations) + **Embla Carousel**
- **Supabase** — Database, Auth (admin login), Storage (image/brochure uploads)
- **React Query** (admin data), **React Hook Form + Zod** (forms)
- **Lucide Icons**, dark/light mode, SEO (metadata, sitemap, robots, OG)

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000 — **the site works immediately** using built-in starter content (products, events, promos, testimonials, FAQs, etc.), even before Supabase is connected.

## Connect Supabase (unlocks the Admin Panel)

1. **Create a project** at [supabase.com](https://supabase.com) (free tier is fine).
2. In **SQL Editor**, run the contents of [`supabase/schema.sql`](supabase/schema.sql), then [`supabase/seed.sql`](supabase/seed.sql).
   - This creates all tables, Row Level Security policies, the public **`media`** storage bucket, and loads the starter content so you can edit it.
3. Copy `.env.local.example` → `.env.local` and fill in from **Project Settings → API**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
4. **Create an admin user**: Supabase Dashboard → **Authentication → Users → Add user** (email + password).
5. Restart the dev server, open **`/admin`**, and sign in.

Once connected, all public pages read from the database (revalidated every ~2 minutes), and everything is editable in the admin panel.

## Admin Panel (`/admin`)

| Section | What you can manage |
| --- | --- |
| **Dashboard** | Content counts, unread inquiries, quick actions |
| **Homepage & Company** | Hero slides (images, headlines, CTAs, order), company profile/history/mission/vision/core values/stats, CEO name/title/photo/message |
| **Products** | Full CRUD, photos, PDF brochures, specs, division & category, brand, Featured / Best Seller flags, show/hide |
| **Brands** | Brand names, logos, division assignment |
| **Promotions** | Bundle deals / seasonal promos / banners with start & end dates (status auto-computed), inclusions list, banner upload |
| **Events** | Seminars, expos, trainings, conferences — dates, location, description, cover, photo galleries (upcoming/past auto-sorted) |
| **Partners** | Partner logos, website links, ordering (drives the logo carousel) |
| **Gallery** | Office / warehouse / showroom / team / events photos |
| **Testimonials** | Customer reviews with 1–5 star ratings |
| **Certificates & Awards** | Licenses, certifications, awards with scans |
| **FAQs** | Accordion Q&A with ordering |
| **Inquiries** | Contact form submissions — read/unread, reply via email, delete |
| **Contact & Support** | Address, phones, emails, Google Map embed, business hours, social links, warranty & after-sales copy |

Notes:

- **Uploads** go to the public `media` bucket in Supabase Storage.
- Items without uploaded images automatically show elegant branded placeholder art, so the site always looks finished.
- Public pages use ISR — edits appear on the live site within ~2 minutes.

## Site Structure

- `/` — hero carousel, stats, division cards, company overview, CEO highlight, featured products, best sellers, promotions, upcoming events, partner marquee, testimonials, certificates, FAQs, CTA
- `/about` — profile, history, mission & vision, core values, CEO quote, facilities gallery, credentials
- `/products` — hub; `/products/livestock`, `/products/pet-consumables`, `/products/equipment` — filterable catalogs (search, category pills, brand filter) with quick-view dialogs; `/products/[category]/[slug]` — full product detail with specs, brochure download, related products. The equipment division also shows warranty & after-sales sections.
- `/events` + `/events/[slug]` — upcoming/past events with photo galleries
- `/promotions` — ongoing / coming soon / past, driven by dates
- `/partners` — logo marquee + directory + become-a-partner CTA
- `/contact` — info cards, business hours, socials, Google Map, validated contact form (stores to `inquiries`), FAQs
- Floating chat widget (Messenger / WhatsApp / live-chat placeholder) on every page
- `/admin` — the admin panel (noindexed, auth-guarded by middleware)

## Deployment (Vercel recommended)

1. Push this repo to GitHub and import it in [Vercel](https://vercel.com).
2. Add the three environment variables from `.env.local`.
3. Set `NEXT_PUBLIC_SITE_URL` to your real domain (drives sitemap/OG URLs).
4. Deploy. `npm run build` is verified to pass.

## Editing the starter content in code

If you prefer editing the fallback content directly (used when Supabase is not connected), it lives in [`src/lib/seed/`](src/lib/seed/). All placeholder contact details, certificates, and product data there are samples — replace them with real company information via the admin panel (or in these files) before going live.

## Scripts

```bash
npm run dev     # local development
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```
