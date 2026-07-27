# 08. Storage Structure (Supabase Storage)

## Buckets

Use one bucket per top-level content area, matching the user's requested hierarchy, rather than one giant
bucket — makes per-bucket public/private policy and lifecycle rules simpler.

```
events/          (public-read bucket)
gallery/         (public-read bucket)
documents/       (public-read bucket)
committee/       (public-read bucket)
reports/         (public-read bucket) -- annual/audit reports specifically, kept separate from generic documents/
news/            (public-read bucket)
```

All buckets are **public-read** (the trust's content is meant to be publicly visible — there's no private
document category in scope) but **writes require an authenticated admin session**, enforced via Supabase
Storage RLS-style bucket policies mirroring the Postgres policies in [04](04-database-schema.md).

## Folder hierarchy and naming convention

Pattern: `<bucket>/<entity-slug>/<filename>` where `<filename>` is server-generated, never the raw uploaded
name, to avoid collisions and path-traversal-style issues.

```
events/
  monsoon-tree-plantation-2026/
    cover-8f3a1c2e.webp
    gallery-1-4b7d9e01.webp
    gallery-2-9c2f7a3d.webp

gallery/
  annual-day-2025/
    photo-<uuid8>.webp
    ...

documents/
  certificates/
    12a-registration-<uuid8>.pdf
  other/
    <slug>-<uuid8>.pdf

reports/
  annual/
    annual-report-2025-<uuid8>.pdf
  audit/
    audit-report-2025-<uuid8>.pdf

committee/
  president-<uuid8>.webp
  secretary-<uuid8>.webp

news/
  <news-slug>-<uuid8>.webp
```

## Naming rules

- Slugs are lowercase, hyphen-separated, generated from the title (e.g. "Monsoon Tree Plantation 2026" →
  `monsoon-tree-plantation-2026`), with a numeric suffix appended on collision.
- Every uploaded file gets an 8-character random suffix before its extension to prevent overwrite collisions
  and to make URLs non-guessable/non-enumerable even though the bucket is public-read.
- Images are converted to `.webp` server-side on upload (or accepted as-is and served through `next/image`'s
  optimizer) for consistent, small file sizes — decide based on whether Supabase's image transformation
  add-on or `next/image` remote optimization is used (either works; `next/image` with `remotePatterns`
  pointed at the Supabase public URL is the simpler default).
- PDFs keep their original extension but never their original filename.

## Access pattern

- Public pages read the stored `*_path` column from Postgres and construct the public Supabase Storage URL
  (or a signed URL, if a bucket is ever made private for a future non-public document type).
- `next.config.ts` `images.remotePatterns` allow-lists the Supabase project's storage domain so `next/image`
  can optimize these remote images (Next.js 16 removed the older `images.domains` option in favor of
  `remotePatterns` — see [Architecture](02-architecture.md)).
