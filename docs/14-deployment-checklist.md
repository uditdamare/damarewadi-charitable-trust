# 14. Deployment Checklist

## Pre-launch

- [ ] Register the domain (`.org` preferred; `.in` acceptable) — not yet done as of this plan.
- [ ] Create Supabase project (production), apply schema + RLS policies from [04](04-database-schema.md).
- [ ] Create Supabase Storage buckets per [08](08-storage-structure.md), set bucket-level public-read + admin-write policies.
- [ ] Create at least one real admin account (Supabase dashboard), verify login end to end.
- [ ] Set all environment variables in Vercel (see [Maintenance & DevOps](17-maintenance-and-devops.md) for the list) — never commit `.env.local`.
- [ ] Verify `next.config.ts`: `cacheComponents`, `images.remotePatterns` pointed at the Supabase storage domain, security `headers()`.
- [ ] Confirm `robots.ts` disallows `/admin/` and allows everything public.
- [ ] Generate and verify `sitemap.ts` output includes both `/en/...` and `/mr/...` URLs.
- [ ] Run a full Lighthouse pass (mobile + desktop) on Home, Events list, Event detail, Documents.
- [ ] Run through [Security Checklist](16-security-checklist.md) fully.
- [ ] Confirm Vercel plan (Hobby vs Pro) matches the ToS decision from [Cost Estimate](13-cost-estimate.md).

## DNS / Cloudflare setup

- [ ] Point domain nameservers to Cloudflare.
- [ ] Add DNS records per Vercel's domain configuration instructions (A/CNAME as Vercel specifies).
- [ ] Enable "Full (strict)" SSL mode in Cloudflare once Vercel's certificate is issued.
- [ ] Enable Cloudflare's basic bot-fight/WAF free-tier protections.
- [ ] Confirm HTTPS redirect works and HSTS is set (via Vercel/Next.js security headers).

## Go-live

- [ ] Deploy to Vercel production, confirm the custom domain resolves correctly.
- [ ] Smoke-test every public page in both `/en` and `/mr`.
- [ ] Smoke-test the full admin CMS flow: log in, create/publish an event, upload an image and a PDF, submit the public contact form and confirm it appears in the admin inbox.
- [ ] Verify `sitemap.xml` and `robots.txt` are reachable at the production domain.
- [ ] Submit the sitemap to Google Search Console (and Bing Webmaster Tools) for indexing.

## Post-launch (first two weeks)

- [ ] Monitor error reporting/logging (see [17](17-maintenance-and-devops.md)) daily for the first few days.
- [ ] Confirm Supabase automated backups are running (check the dashboard's backup history, don't just
  assume the default schedule is active).
- [ ] Walk at least one trustee through publishing a real event/notice unassisted, to validate the CMS is
  actually usable by its intended non-technical users.
