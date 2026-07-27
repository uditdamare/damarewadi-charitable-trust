# 16. Security Checklist

## Authentication & authorization
- [ ] Admin-only login via Supabase Auth; no public registration endpoint exists anywhere.
- [ ] `proxy.ts` (Next.js 16 rename of `middleware.ts`) gates every `/admin/*` route except `/admin/login`.
- [ ] Every table has Postgres RLS enabled — authorization is enforced at the database, not just in app code
  (see [Database Schema](04-database-schema.md) policy pattern).
- [ ] Service-role Supabase key (`lib/supabase/admin.ts`) is used only in trusted server-only code paths,
  never exposed to the client bundle, never used for routine reads (those go through the RLS-respecting
  anon/authenticated client).
- [ ] Login rate-limited (via `proxy.ts`) to blunt brute-force attempts.

## Input validation
- [ ] Every Server Action and Route Handler validates input with `zod` before touching the database.
- [ ] Server-side validation is authoritative; client-side validation is UX-only, never trusted alone.

## File upload validation
- [ ] Allow-listed MIME types only (`image/jpeg|png|webp` for images, `application/pdf` for documents).
- [ ] File type verified server-side from actual file bytes/magic number, not just the client-reported
  `Content-Type` header or file extension.
- [ ] Size caps enforced server-side (5MB images, 20MB PDFs) — not just in the client uploader UI.
- [ ] Uploaded filenames are never trusted; the server generates the storage path/filename.
- [ ] Uploaded files never get executed or interpreted — they're stored as opaque blobs served with a fixed,
  correct `Content-Type` and `Content-Disposition` where appropriate (PDFs served as downloads/inline, never
  as executable content).

## Rate limiting
- [ ] Contact form submissions rate-limited per IP (hashed, not stored raw) via `proxy.ts`.
- [ ] Admin login attempts rate-limited per IP/account.

## Secure headers (via `next.config.ts` `headers()`)
- [ ] `Strict-Transport-Security` (HSTS).
- [ ] `X-Content-Type-Options: nosniff`.
- [ ] `X-Frame-Options: DENY` (or a restrictive `frame-ancestors` in CSP) to prevent clickjacking on the
  admin login page.
- [ ] `Content-Security-Policy` scoped to allow only the domains this app actually needs (Supabase, Google
  Maps embed, any analytics script) — no wildcard `*` sources.
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`.
- [ ] `Permissions-Policy` disabling unused browser features (camera, microphone, geolocation, etc.).

## CSRF
- [ ] Rely on Next.js Server Actions' built-in origin-header verification (present by default) rather than
  hand-rolling CSRF tokens; confirm this protection is active by testing a cross-origin form submission
  against a Server Action and verifying it's rejected.

## XSS
- [ ] All rich-text CMS content (`events.description`, `news.body`) is sanitized server-side (e.g. via a
  strict HTML sanitizer allow-listing only safe tags/attributes) before storage or at render time — never
  rendered via `dangerouslySetInnerHTML` on unsanitized input.
- [ ] React's default JSX escaping is relied on everywhere else (never bypass it without a specific,
  reviewed reason).

## SQL injection
- [ ] All database access goes through the Supabase client's parameterized query builder — no raw string-
  concatenated SQL anywhere in the codebase.

## Backup strategy
- [ ] Confirm Supabase's automated daily backups are enabled on the production project (verify in the
  dashboard, don't assume).
- [ ] Periodically (e.g. quarterly) perform an actual restore drill against a scratch project to confirm
  backups are genuinely restorable, not just "present."
- [ ] Document the restore procedure in [Maintenance & DevOps](17-maintenance-and-devops.md) so it isn't
  tribal knowledge held by one person.

## Secrets management
- [ ] All API keys/service-role keys live only in Vercel environment variables (and local `.env.local`,
  gitignored) — never committed to the repository.
- [ ] `NEXT_PUBLIC_*` env vars are limited strictly to values safe for public exposure (Supabase URL and
  anon key only — the anon key is safe by design since RLS enforces authorization).
