# 10. Page-by-Page Breakdown

All public pages live under `app/[locale]/` and are available at both `/en/...` and `/mr/...` via
`next-intl`; content fields with a `_mr` column (see [Database Schema](04-database-schema.md)) render the
Marathi text when `locale === 'mr'`, falling back to the English field if a Marathi translation hasn't been
entered yet, so trustees are never blocked publishing while the Marathi CMS habit builds up.

## Home (`/`)
- Hero Banner (`HeroBanner`) — trust name, tagline, primary CTA. At launch there's no live donation flow, so
  the CTA is "See Our Work" / "Contact Us", not "Donate Now" (avoid promising a donate button that doesn't
  work yet — both reference NGO sites reviewed use "Donate Now" as their primary CTA, but that only reads as
  trustworthy once a real payment flow exists behind it).
- About Trust summary (`AboutSummary`) with a link to the full About page.
- **Featured Initiative** (`InitiativeCard`, prominent, above Events) — the temple rebuild, since it is the
  trust's current flagship activity. Shown as a `Our Ongoing Work` section with a photo, short summary, and
  a link to the full initiative detail page. This section exists *instead of* a hardcoded "Upcoming Events"
  block when there are no events yet.
- Upcoming Events (`EventList`) — **only rendered when at least one published upcoming event exists**; the
  section itself is omitted (not shown empty/placeholder) rather than displaying "No events yet," which
  reads as an unfinished site. Once events exist, shows the next 3, `cacheTag('events')`.
- Latest News (`NewsList`, latest 3, `cacheTag('news')`) — same empty-state rule: omit the section if there's
  no published news yet.
- Gallery Preview (`AlbumGrid`, latest 1–2 albums) — populated once trust/temple photos are uploaded.
- Call to Action — Contact.
- SEO: `Organization` JSON-LD, canonical `/`, OG image = trust logo/hero or temple photo.

### Empty-state design principle (applies site-wide)

A brand-new trust with no events yet must not look broken or abandoned. Every list-type section (Events,
News, Gallery) follows the same rule: **if a section has zero published items, hide the section entirely**
rather than rendering "Coming soon" placeholders — the Home page instead leans on the sections that do have
real content today (About, Featured Initiative, Committee, Contact). This also means the Home page layout is
built to look complete with only About + Initiative + Committee + Contact populated, not dependent on Events/
News existing.

## About (`/about`)
- History, Mission, Vision, Objectives — static content managed via a simple `site_pages` content approach
  (or hardcoded initially and moved to a CMS-managed table only if trustees need to edit it often — flagged
  as a scope decision in [Risks](12-risks-and-future-enhancements.md)).
- SEO: `AboutPage` semantic sectioning, breadcrumb.

## Committee (`/committee`)
- `CommitteeGrid` of `CommitteeMemberCard`s, ordered by `display_order`, reflecting the trust's actual
  9-member structure: अध्यक्ष (President), उपाध्यक्ष (Vice President), सचिव (Secretary), उप-सचिव (Vice
  Secretary), खजिनदार (Treasurer), उप-खजिनदार (Vice Treasurer), and 3 सदस्य (Members) — see the
  `position_key` enum in [Database Schema](04-database-schema.md). English locale shows the translated
  title; Marathi locale shows the Devanagari title.
- SEO: `Person`/`Organization` JSON-LD listing key office-bearers.

## Our Work (`/initiatives`, `/initiatives/[slug]`) — new page, added for the temple rebuild

- List page: card grid of ongoing/completed initiatives (`InitiativeCard`), each with cover photo + summary.
- Detail page: full story (background — the temple's history, damage from heavy rain, its distance from the
  nearest settlement, and the impact on the people who maintain it today), photo gallery
  (`InitiativeGallery`, linked `initiative_images`), and a "Get in touch to help" CTA linking to Contact
  (no live donation button yet — see [Risks](12-risks-and-future-enhancements.md) for the future donation
  tie-in).
- SEO: treated similarly to a News article — `Article` JSON-LD, canonical, breadcrumb, OG image from the
  cover photo (temple photos are strong, shareable OG images).

## Events (`/events`, `/events/[slug]`)
- List: `EventList` with filter by upcoming/past, paginated. **At launch this list is empty** — the page
  still needs to exist (so the nav link and URL structure are ready), but shows a simple "No events
  scheduled yet — check back soon" message rather than an error or broken layout.
- Detail: title, date, venue, chief guest, rich-text description, `EventGallery` (linked `event_images`).
- SEO: `Event` JSON-LD (name, startDate, location, performer for chief guest), canonical, breadcrumb.

## Gallery (`/gallery`, `/gallery/[albumSlug]`)
- Albums list (`AlbumGrid`), album detail (`GalleryLightbox` over `gallery_images`).
- Videos: reserved `media_type: 'video'` column, UI hidden until the future video feature ships.
- SEO: `ImageGallery`-style structured data (optional, lower priority than Event/Org).

## Documents (`/documents`)
- Category tabs/filters: Trust Deed, Annual Reports, Audit Reports, Certificates, Downloads.
- `DocumentList` with year filter for reports.
- Each document links directly to its Supabase Storage public URL (PDF opens/downloads in-browser).
- SEO: plain metadata (documents aren't typically indexed content-rich pages, but title/description still set).

## News & Notices (`/news`, `/news/[slug]`)
- Combined list with a `type` filter (News vs Notice), `NoticeBadge` distinguishes urgent notices visually.
- Detail page per item, rich-text body.
- SEO: `Article`/`NewsArticle` JSON-LD.

## Contact (`/contact`)
- `ContactForm` (Server Action, rate-limited via `proxy.ts`), `ContactMap` (Google Maps embed, lazy-loaded —
  pending the temple/trust office's exact coordinates, see [12](12-risks-and-future-enhancements.md) open
  items), phone/email displayed as `tel:`/`mailto:` links for mobile tap-to-call.
- Point of contact shown here (and in the footer site-wide, pulled from `trust_settings`): **damarewadi@gmail.com**, **+91 98921 34997**.
- SEO: `ContactPage`/`Organization` JSON-LD with `contactPoint`.

## Admin Dashboard (`/admin/...`, English-only, not locale-prefixed)
- `/admin/login` — Supabase Auth login form.
- `/admin` — dashboard home (see [07](07-admin-cms.md)).
- `/admin/events`, `/admin/gallery`, `/admin/documents`, `/admin/news`, `/admin/notices`, `/admin/committee`,
  `/admin/initiatives`, `/admin/settings` (edits the single `trust_settings` row: contact info, registration
  number, PAN, address, social links) — each a list/create/edit/soft-delete CRUD flow per
  [Admin CMS Plan](07-admin-cms.md).
- Not indexed: `robots.ts` disallows `/admin/`.
