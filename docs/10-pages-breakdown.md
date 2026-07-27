# 10. Page-by-Page Breakdown

All public pages live under `app/[locale]/` and are available at both `/en/...` and `/mr/...` via
`next-intl`; content fields with a `_mr` column (see [Database Schema](04-database-schema.md)) render the
Marathi text when `locale === 'mr'`, falling back to the English field if a Marathi translation hasn't been
entered yet, so trustees are never blocked publishing while the Marathi CMS habit builds up.

## Home (`/`)
- Hero Banner (`HeroBanner`) — trust name, tagline, primary CTA (Donate — future — or "See Upcoming Events" now).
- About Trust summary (`AboutSummary`) with a link to the full About page.
- Upcoming Events (`EventList`, next 3 upcoming, `cacheTag('events')`).
- Latest News (`NewsList`, latest 3, `cacheTag('news')`).
- Gallery Preview (`AlbumGrid`, latest 1–2 albums).
- Call to Action — Contact / future Volunteer sign-up.
- SEO: `Organization` JSON-LD, canonical `/`, OG image = trust logo/hero.

## About (`/about`)
- History, Mission, Vision, Objectives — static content managed via a simple `site_pages` content approach
  (or hardcoded initially and moved to a CMS-managed table only if trustees need to edit it often — flagged
  as a scope decision in [Risks](12-risks-and-future-enhancements.md)).
- SEO: `AboutPage` semantic sectioning, breadcrumb.

## Committee (`/committee`)
- `CommitteeGrid` of `CommitteeMemberCard`s: President, Secretary, Treasurer, Members — ordered by
  `display_order`.
- SEO: `Person`/`Organization` JSON-LD listing key office-bearers.

## Events (`/events`, `/events/[slug]`)
- List: `EventList` with filter by upcoming/past, paginated.
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
- `ContactForm` (Server Action, rate-limited via `proxy.ts`), `ContactMap` (Google Maps embed, lazy-loaded),
  phone/email displayed as `tel:`/`mailto:` links for mobile tap-to-call.
- SEO: `ContactPage`/`Organization` JSON-LD with `contactPoint`.

## Admin Dashboard (`/admin/...`, English-only, not locale-prefixed)
- `/admin/login` — Supabase Auth login form.
- `/admin` — dashboard home (see [07](07-admin-cms.md)).
- `/admin/events`, `/admin/gallery`, `/admin/documents`, `/admin/news`, `/admin/notices`, `/admin/committee`
  — each a list/create/edit/soft-delete CRUD flow per [Admin CMS Plan](07-admin-cms.md).
- Not indexed: `robots.ts` disallows `/admin/`.
