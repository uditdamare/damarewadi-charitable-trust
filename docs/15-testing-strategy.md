# 15. Testing Strategy

## Unit tests
- `zod` validation schemas (`lib/validation/`) — valid/invalid input coverage for every content type.
- Pure utility functions (`lib/utils.ts`, slug generation, file-path generation).
- Framework: Vitest (fast, works well with Next.js's ESM/TypeScript setup).

## Integration tests
- Server Actions against a local/test Supabase instance (Supabase CLI supports local dev with Docker) —
  verify RLS actually blocks non-admin writes, not just that the app code checks a role.
- Cache invalidation: verify `updateTag()` calls actually occur on publish/edit paths.

## End-to-end (E2E) tests
- Playwright, covering the critical paths:
  - Public: browse Events → view detail → view gallery; browse Documents → open a PDF; submit Contact form.
  - Admin: log in → create draft event → publish → confirm it appears on the public Events page → soft-delete → confirm it disappears.
  - Locale switch: toggle EN ↔ MR on a content page, confirm URL and rendered language both change.
- Run against a preview deployment (Vercel preview URLs) in CI on every PR, not just locally.

## Accessibility testing
- Automated: `axe-core` integrated into Playwright E2E runs, failing CI on any critical/serious violation.
- Manual spot-check: keyboard-only navigation through the admin CMS and the public Contact form; screen
  reader pass (NVDA/VoiceOver) on Home and an Event detail page at minimum.

## Performance testing
- Lighthouse CI on every PR against the preview deployment for Home, Events list, Event detail — fail the
  build (or at least flag loudly) if Performance/SEO/Accessibility drop below 90.
- Manual Core Web Vitals check (via Vercel Speed Insights or PageSpeed Insights) post-deploy on production.

## Security testing
- Manual verification that RLS policies actually deny unauthorized access (attempt writes as an
  unauthenticated/non-admin client against the test database).
- File upload tests: attempt to upload a disguised executable renamed to `.pdf`/`.jpg`, confirm server-side
  byte-level validation rejects it (see [Security Checklist](16-security-checklist.md)).
- Rate limiting: confirm `proxy.ts` actually throttles rapid repeated contact-form/login submissions.

## Manual QA before each release
- Cross-browser check (Chrome, Safari, Firefox, mobile Safari/Chrome).
- Both locales, both light-mode-only for now (dark mode is future scope).
- Real-device check on a low-end Android phone (common access pattern for this audience) for load time and
  usability of forms/uploads.
