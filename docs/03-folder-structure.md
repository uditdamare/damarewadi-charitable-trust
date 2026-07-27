# 03. Folder Structure

Project layout for the Next.js 16 App Router, building on the existing `create-next-app` scaffold
(`src/app/layout.tsx`, `src/app/page.tsx`, `tsconfig.json` path alias `@/*` → `src/*`).

```
damarewadi-charitable-trust/
├── docs/                          # This plan (already created)
├── public/                        # Static assets: favicon, og-default.png, robots-friendly assets
├── src/
│   ├── app/
│   │   ├── [locale]/              # next-intl locale segment: /en/... and /mr/...
│   │   │   ├── layout.tsx         # Root layout: fonts, <html lang>, providers, header/footer
│   │   │   ├── page.tsx           # Home
│   │   │   ├── about/page.tsx
│   │   │   ├── committee/page.tsx
│   │   │   ├── events/
│   │   │   │   ├── page.tsx           # Event list
│   │   │   │   └── [slug]/page.tsx    # Event detail (+ gallery, chief guest, date, venue)
│   │   │   ├── gallery/
│   │   │   │   ├── page.tsx           # Album list
│   │   │   │   └── [albumSlug]/page.tsx
│   │   │   ├── documents/page.tsx     # Trust deed, annual/audit reports, certificates
│   │   │   ├── news/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── initiatives/           # "Our Work" — ongoing causes, e.g. the temple rebuild
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── admin/                 # NOT locale-prefixed — admin UI is English-only, internal tool
│   │   │   ├── layout.tsx         # Wraps every admin route with the session check
│   │   │   ├── login/page.tsx
│   │   │   ├── page.tsx           # Dashboard home
│   │   │   ├── events/            # list/create/edit
│   │   │   ├── gallery/
│   │   │   ├── documents/
│   │   │   ├── news/
│   │   │   ├── notices/
│   │   │   ├── committee/
│   │   │   ├── initiatives/       # manage the temple rebuild + future causes
│   │   │   └── settings/          # edit the single trust_settings row (contact/registration/PAN/social)
│   │   ├── api/                   # Route Handlers only where a Server Action doesn't fit
│   │   │   └── contact/route.ts   # e.g. if a non-form client needs a JSON endpoint later
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                    # shadcn/ui generated components (button, card, dialog, ...)
│   │   ├── layout/                 # Header, Footer, LanguageSwitcher, MobileNav
│   │   ├── public/                 # EventCard, GalleryGrid, DocumentList, NewsCard, etc.
│   │   └── admin/                  # RichTextEditor, FileUploadField, DataTable, StatusBadge
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts          # Browser client (anon key)
│   │   │   ├── server.ts          # Server-side client (reads cookies via awaited cookies())
│   │   │   └── admin.ts           # Service-role client, server-only, used sparingly (uploads, admin ops)
│   │   ├── actions/                # Server Actions grouped by resource: events.ts, gallery.ts, news.ts, initiatives.ts, contact.ts, settings.ts
│   │   ├── validation/             # zod schemas shared by Server Actions + forms: event.schema.ts, etc.
│   │   ├── cache/                  # 'use cache' wrapped data-fetching functions per resource
│   │   └── utils.ts
│   ├── i18n/
│   │   ├── request.ts             # next-intl server config
│   │   └── routing.ts             # locales, defaultLocale
│   ├── messages/
│   │   ├── en.json
│   │   └── mr.json
│   ├── types/
│   │   └── database.types.ts      # Generated from Supabase schema (supabase gen types typescript)
│   └── proxy.ts                    # Next.js 16 rename of middleware.ts — admin auth gate + rate limiting
├── next.config.ts                  # cacheComponents, reactCompiler, images.remotePatterns, headers()
├── next-env.d.ts
├── tailwind config (via @tailwindcss/postcss, already present)
├── tsconfig.json
└── package.json
```

## Notes

- **`proxy.ts` lives inside `src/`, sibling to `app/`** — not at the repo root — because this project's app
  directory is under `src/`. Next.js 16 requires the proxy file at the same level as `app`/`pages`, and this
  is a rename of `middleware.ts`; its exported function must be named `proxy` (or be the default export).
- **`[locale]` segment** groups all public-facing pages so `next-intl` can resolve `/en/events` and
  `/mr/events` from one set of page files; the **admin dashboard deliberately sits outside `[locale]`**
  since trustees will operate it in one language (English) regardless of the public site's language toggle.
- **`sitemap.ts` and `robots.ts`** live at the `app/` root (outside `[locale]`) and generate locale-aware
  URLs for both `/en/...` and `/mr/...` paths in one file, per Next.js metadata file conventions.
- **`lib/supabase/admin.ts`** (service-role key) is used only in trusted server contexts (Server Actions
  handling uploads that need to bypass RLS for storage bucket writes) — never imported into anything that
  could run client-side.
