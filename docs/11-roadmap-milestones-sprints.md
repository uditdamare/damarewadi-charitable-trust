# 11. Roadmap, Milestones & Sprint Plan

Assumes roughly one active developer working part-time; sprints are ~1 week each and meant as a sizing
guide, not a fixed calendar commitment.

## Phase 1 — Foundation (Sprint 1)
- Configure `next.config.ts` (`cacheComponents`, `images.remotePatterns`, security `headers()`).
- Set up Supabase project, apply the schema from [04](04-database-schema.md), enable RLS policies.
- Set up `next-intl` (`/en`, `/mr` routing, `messages/en.json` + `messages/mr.json` scaffolding).
- Install and configure Tailwind v4 (already present) + generate needed shadcn/ui primitives.
- **Milestone 1**: `next dev` runs, locale routing works, Supabase connects, empty pages render for both locales.

## Phase 2 — Auth & Admin Shell (Sprint 2)
- Implement Supabase Auth login/logout, `proxy.ts` session gating for `/admin/*`.
- Build `AdminSidebar`, dashboard home shell, `DataTable`/`FileUploadField`/`RichTextEditor` shared components.
- **Milestone 2**: an admin can log in and see an empty (but structured) dashboard; unauthenticated visits
  to `/admin` redirect to login.

## Phase 3 — Content CMS (Sprints 3–4)
- Committee CRUD, Events CRUD (+ image gallery per event), Gallery Albums/Images CRUD, Documents upload +
  categorization, News/Notices CRUD — draft/publish/soft-delete wired to RLS and Cache Components tags.
- **Milestone 3**: trustees can fully manage every content type end-to-end from `/admin`.

## Phase 4 — Public Site (Sprint 5)
- Build all public pages from [10](10-pages-breakdown.md) consuming the CMS data via `'use cache'` reads.
- Contact form (Server Action + rate limiting).
- **Milestone 4**: full public site browsable in both languages, backed by real CMS content.

## Phase 5 — SEO & Performance Polish (Sprint 6)
- Metadata API on every page (title/description/OG/Twitter), `sitemap.ts`, `robots.ts`, JSON-LD per page
  type, canonical URLs, breadcrumbs.
- Image optimization audit (`next/image`, `remotePatterns`, correct `sizes`), Lighthouse pass, Core Web
  Vitals check, lazy loading audit (maps, below-fold galleries).
- **Milestone 5**: Lighthouse 95+ across Performance/SEO/Accessibility/Best Practices on key pages.

## Phase 6 — Security Hardening & Launch Prep (Sprint 7)
- Run through [Security Checklist](16-security-checklist.md) end to end.
- Domain registration + Cloudflare DNS setup, Vercel production deploy, env var audit.
- **Milestone 6**: [Deployment Checklist](14-deployment-checklist.md) fully checked off; production URL live
  behind Cloudflare.

## Phase 7 — Launch & Stabilize (Sprint 8)
- Trustee training (a short "how to publish an event/notice" walkthrough doc/video).
- Monitor error reporting and analytics for the first 2 weeks; fix any real-world content-entry friction.
- **Milestone 7**: site publicly announced; trustees independently publishing content without developer help.

## Beyond launch — future feature phases (see [12](12-risks-and-future-enhancements.md) for detail)

Each is its own future phase, not part of the initial build: Online Donations → Volunteer/Membership
Registration → Blood Donation Camp Registration → Scholarship Forms → Event Registration → Email/WhatsApp
Notifications → Analytics Dashboard → Search → further CMS improvements (audit logs, richer roles).
