-- ============================================================
-- EVR Vet Options Corporation — Database Schema
-- Run this in Supabase → SQL Editor, then run seed.sql.
-- Safe to re-run (idempotent).
-- ============================================================

create extension if not exists pgcrypto;

-- ── Key/value store for company, CEO, contact, support copy ──
create table if not exists public.site_content (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- ── Homepage hero slides ─────────────────────────────────────
create table if not exists public.hero_slides (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  subtitle            text not null default '',
  cta_label           text not null default 'Learn More',
  cta_href            text not null default '/products',
  cta_secondary_label text,
  cta_secondary_href  text,
  image_url           text,
  sort_order          integer not null default 1,
  active              boolean not null default true,
  created_at          timestamptz not null default now()
);

-- ── Products ─────────────────────────────────────────────────
create table if not exists public.products (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name              text not null,
  category          text not null check (category in ('livestock', 'pet-consumables', 'equipment')),
  subcategory       text not null default '',
  brand             text not null default '',
  short_description text not null default '',
  description       text not null default '',
  specs             jsonb not null default '[]'::jsonb,
  images            text[] not null default '{}',
  brochure_url      text,
  featured          boolean not null default false,
  best_seller       boolean not null default false,
  active            boolean not null default true,
  created_at        timestamptz not null default now()
);

-- ── Brands ───────────────────────────────────────────────────
create table if not exists public.brands (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  logo_url   text,
  categories text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- ── Promotions ───────────────────────────────────────────────
create table if not exists public.promotions (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  type        text not null default 'seasonal' check (type in ('bundle', 'seasonal', 'banner')),
  banner_url  text,
  starts_at   date not null,
  ends_at     date not null,
  items       text[] not null default '{}',
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ── Events ───────────────────────────────────────────────────
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  type        text not null default 'seminar' check (type in ('seminar', 'expo', 'training', 'conference', 'other')),
  date        date not null,
  end_date    date,
  location    text not null default '',
  description text not null default '',
  cover_url   text,
  photos      text[] not null default '{}',
  created_at  timestamptz not null default now()
);

-- ── Partners ─────────────────────────────────────────────────
create table if not exists public.partners (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  logo_url   text,
  website    text,
  sort_order integer not null default 1,
  created_at timestamptz not null default now()
);

-- ── Testimonials ─────────────────────────────────────────────
create table if not exists public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text not null default '',
  company    text not null default '',
  quote      text not null,
  rating     integer not null default 5 check (rating between 1 and 5),
  avatar_url text,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── Certificates & awards ────────────────────────────────────
create table if not exists public.certificates (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  type       text not null default 'certificate' check (type in ('certificate', 'award')),
  issued_by  text not null default '',
  year       integer not null default extract(year from now()),
  image_url  text,
  created_at timestamptz not null default now()
);

-- ── FAQs ─────────────────────────────────────────────────────
create table if not exists public.faqs (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  answer     text not null,
  sort_order integer not null default 1,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── Gallery ──────────────────────────────────────────────────
create table if not exists public.gallery (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  category   text not null default 'other' check (category in ('office', 'warehouse', 'showroom', 'team', 'events', 'other')),
  image_url  text,
  created_at timestamptz not null default now()
);

-- ── Contact form inquiries ───────────────────────────────────
create table if not exists public.inquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  subject    text not null,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- Public: read-only on content. Authenticated (admins): full access.
-- Inquiries: anyone can submit; only admins can read/manage.
-- ============================================================

do $$
declare
  t text;
begin
  foreach t in array array[
    'site_content', 'hero_slides', 'products', 'brands', 'promotions',
    'events', 'partners', 'testimonials', 'certificates', 'faqs', 'gallery'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "Public read %s" on public.%I', t, t);
    execute format(
      'create policy "Public read %s" on public.%I for select using (true)', t, t
    );
    execute format('drop policy if exists "Admin write %s" on public.%I', t, t);
    execute format(
      'create policy "Admin write %s" on public.%I for all to authenticated using (true) with check (true)',
      t, t
    );
  end loop;
end $$;

alter table public.inquiries enable row level security;

drop policy if exists "Anyone can submit inquiries" on public.inquiries;
create policy "Anyone can submit inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins manage inquiries" on public.inquiries;
create policy "Admins manage inquiries"
  on public.inquiries for select
  to authenticated using (true);

drop policy if exists "Admins update inquiries" on public.inquiries;
create policy "Admins update inquiries"
  on public.inquiries for update
  to authenticated using (true) with check (true);

drop policy if exists "Admins delete inquiries" on public.inquiries;
create policy "Admins delete inquiries"
  on public.inquiries for delete
  to authenticated using (true);

-- ============================================================
-- Storage: public "media" bucket for all uploads
-- ============================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "Admins upload media" on storage.objects;
create policy "Admins upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "Admins update media" on storage.objects;
create policy "Admins update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

drop policy if exists "Admins delete media" on storage.objects;
create policy "Admins delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
