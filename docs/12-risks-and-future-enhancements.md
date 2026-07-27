# 12. Risks & Future Enhancements

## Open items needed from the trust (blocking real content, not architecture)

These can't be filled in by guessing — they're facts only the trust can supply. Nothing below blocks
starting implementation, but each should be resolved before the corresponding page/section goes live:

- [ ] **Trust registration number** — for the footer and `trust_settings` (see [04](04-database-schema.md)).
- [ ] **PAN number and 80G status** — determines whether donation messaging can ever claim tax exemption.
      Note: a *religious* trust (temple-focused) is sometimes registered under different tax provisions than
      a general charitable trust and may not qualify for 80G — worth confirming with whoever handles the
      trust's tax filings before any future donation page promises an exemption.
- [x] **Year the trust was founded** — 2026 (confirmed: the trust was established this month). Reflected in
      `trust_settings.foundedYear`, the footer's "Established 2026" line, and the About > History copy.
- [ ] **Registered address / temple location** — needed for the footer, Contact page, and the Google Maps
      embed (exact coordinates or a shareable Google Maps link work equally well).
- [ ] **Trust deed / annual reports / audit reports / certificates** (actual PDF files) — for the Documents
      page; can be added after launch, page works fine with zero documents until then (same empty-state
      principle as Events — see [10](10-pages-breakdown.md)).
- [ ] **Social media links** (if any exist) — Facebook/Instagram/YouTube, optional, only shown if provided.
- [ ] **Committee member names + one photo each** — 9 members confirmed by role (अध्यक्ष, उपाध्यक्ष, सचिव,
      उप-सचिव, खजिनदार, उप-खजिनदार, 3× सदस्य); names and photos still needed to populate
      [Committee](10-pages-breakdown.md).
- [ ] **Temple rebuild story + photos** — confirmed as the flagship "Our Work" initiative; a few paragraphs
      (what happened in the rains, current condition, why it matters to the people living nearby) plus
      photos are what turn this from a placeholder into real content.

## Content gaps found by benchmarking established NGO sites (CRY, Akshaya Patra, Goonj, Smile Foundation)

All four converge on the same handful of trust-building elements — none of these block launch, but they're
what separates a "placeholder-looking" site from an established one, and every item below needs real
content/numbers from the trust before it can be built (no fabricated stats):

- [ ] **Impact/stat counters** — the trust was established this month (2026), so "years of service" framing
      doesn't apply yet; a numbers strip would be dishonest here. Revisit once there's real scale to report
      (e.g. after the temple rebuild completes, or once volunteer/membership counts exist) rather than
      copying the reference sites' pattern emptily.
- [ ] **Campaign-style progress on the temple initiative** — Akshaya Patra shows "₹X raised of ₹Y goal" bars
      per cause. Not buildable until there's a real fundraising goal/target amount and (eventually) a
      payment gateway — flagged here so the `initiatives` table can grow a `goal_amount` column later
      without a redesign.
- [ ] **Testimonials / community quotes** — a line or two from someone who actually worships at or maintains
      the temple, or from a committee member on why the rebuild matters. All four reference sites use
      first-person quotes to humanize the work; needs someone to actually ask a few people and note it down.
- [ ] **Trust/accreditation badges** — GuideStar, 80G, 12A, or similar recognitions (CRY/Smile Foundation both
      lead with these). Not applicable until the trust actually holds such registrations/certifications —
      don't fabricate trust signals; add only what's real once it exists.
- [ ] **Photos of the committee members** — all four reference sites put real faces next to names; ours
      currently shows initials placeholders (see [Committee](10-pages-breakdown.md)).
- [ ] **A trust logo/wordmark** — every reference site has a distinct logo in the header rather than plain
      text; worth commissioning even a simple one (Goonj's Devanagari wordmark "गूंज" is a good bilingual
      reference for how a Marathi-first mark can read well).
- [ ] **POC contact** — confirmed: `uditdamare01@gmail.com`, `+91 98921 34997`. Worth confirming whether this
      should be labeled as a specific role (e.g. "For website / General queries") versus one of the 9
      committee members' direct line, so the Contact page doesn't read as anonymous.

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Single-maintainer dependency | Trust can't operate/update site if the one technical person is unavailable | Keep this `/docs` plan current; write a short non-technical "how to publish" trustee guide; use standard, well-documented tech (no exotic frameworks) |
| Vercel Hobby-tier commercial-use restriction | Possible ToS violation running an organization's site on a personal Hobby account | Review Vercel's current commercial-use terms before launch; budget for Pro tier if required (see [Cost Estimate](13-cost-estimate.md)) |
| Framework version drift (Next.js 16 conventions) | Future contributors (or AI assistance) may reintroduce deprecated patterns (`middleware.ts`, sync `cookies()`) from older training data | This plan documents every Next 16-specific convention explicitly; keep `AGENTS.md`'s instruction to read `node_modules/next/dist/docs/` before future framework upgrades |
| Content sprawl / accidental public mistakes | A typo or bad photo goes live before review | Draft/publish workflow + soft delete (already in schema/CMS plan) |
| Marathi content lagging English | Bilingual promise not met if trustees only fill English fields | `_mr` fields fall back to English gracefully rather than showing blank/broken pages; track untranslated-content count on the admin dashboard as a future nice-to-have |
| Supabase/Vercel free-tier limits hit unexpectedly | Site goes down or storage uploads start failing if usage grows faster than expected | Growth triggers documented in [Cost Estimate](13-cost-estimate.md); set up usage alerts in both dashboards |
| No automated backups verified | Data loss if Supabase backup restore is never tested | Explicit backup-restore drill in [Maintenance Plan](17-maintenance-and-devops.md) |
| Rich text / file uploads as an XSS or malware vector | Malicious HTML or a disguised executable uploaded as a "PDF"/"image" | Sanitize all rich text server-side; validate file bytes (not just extension/MIME header) before storage — see [Security Checklist](16-security-checklist.md) |

## Future enhancements (already accounted for structurally, not built now)

- **Online Donations** — `donations` stub table ([04](04-database-schema.md)), a Razorpay/Instamojo (India-
  friendly) or Stripe webhook Route Handler, and a Donate CTA already placed on Home.
- **Volunteer Registration** — `volunteers` stub table, a public form following the same `ContactForm`
  pattern.
- **Membership Registration** — `memberships` stub table, similar form pattern, likely paired with a future
  payment step if membership has a fee.
- **Blood Donation Camp Registration** — `blood_donation_registrations` stub table linked to `events`, so a
  camp is just an `events` row with a registration form attached.
- **Scholarship Forms** — `scholarship_applications` stub table; will likely need a document-upload step
  (school records) reusing the existing upload-validation pattern.
- **Event Registration (general RSVP)** — generic `event_registrations` stub table reusable across any event.
- **Email Notifications** — once any of the above forms exist, wire a transactional email provider (Resend/
  Postmark) into the relevant Server Action.
- **WhatsApp Notifications** — WhatsApp Business API integration, likely behind a Route Handler webhook for
  delivery status; treat as its own scoped feature given API approval lead time.
- **Multi-language beyond EN/MR** — `next-intl` locale list is just an array; adding a third locale is a
  config change plus translation content, not an architecture change.
- **Analytics Dashboard** — start with privacy-respecting, cookieless analytics (e.g. Vercel Analytics or
  Plausible) rather than building a custom dashboard; revisit a custom admin analytics view only if the
  off-the-shelf option proves insufficient.
- **Search** — Postgres full-text search (`tsvector` + `to_tsquery`) across events/news/documents; no need
  for a dedicated search service (Algolia/Meilisearch) at this traffic scale.
- **CMS Improvements** — audit logs (schema noted in [07](07-admin-cms.md)), richer roles (`editor` role),
  scheduled publishing (publish-at-a-future-date), content versioning/revision history.
