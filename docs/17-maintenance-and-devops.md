# 17. Maintenance & DevOps Plan

## Git branching strategy

Simple trunk-based flow, appropriate for a small/solo team:
- `main` — always deployable; Vercel auto-deploys `main` to production.
- Feature branches (`feature/<short-description>`) — Vercel auto-generates a preview deployment per PR for
  review before merge.
- No long-lived `develop` branch needed at this scale — it just adds merge overhead without benefit.

## Environment variables

| Variable | Where | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel + `.env.local` | Safe to expose (public by design) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel + `.env.local` | Safe to expose — RLS enforces real authorization |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel (server-only), never `NEXT_PUBLIC_*` | Used sparingly in trusted server code only |
| `NEXT_PUBLIC_SITE_URL` | Vercel + `.env.local` | Used for absolute URLs in metadata/sitemap/JSON-LD |
| Future: `RESEND_API_KEY` / email provider key | Vercel (server-only) | Only once email notifications ship |
| Future: payment provider keys | Vercel (server-only) | Only once online donations ship |

`.env.local` stays gitignored; a `.env.example` (committed, no real values) documents required variables for
any future contributor setting up the project.

## Deployment workflow

1. Open a PR against `main` → Vercel builds a preview deployment automatically.
2. Review the preview (functionally + Lighthouse), get it approved.
3. Merge to `main` → Vercel deploys to production automatically.
4. No manual deployment steps required; this is Vercel's default Git integration behavior.

## Backup strategy

- Supabase automated daily backups (verify enabled on the production project, see
  [Security Checklist](16-security-checklist.md)).
- Quarterly restore drill against a scratch Supabase project to confirm backups are genuinely usable.
- Storage buckets: Supabase Storage doesn't version files by default — treat "soft delete" at the database
  row level as the primary protection against accidental content loss; genuinely critical documents (trust
  deed) should also be kept in an offline copy outside the app entirely, since that's irreplaceable.

## Monitoring & logging

- **Uptime**: a free external monitor (e.g. UptimeRobot free tier) pinging the production URL, alerting by
  email if the site goes down.
- **Error reporting**: Vercel's built-in function logs at minimum; consider Sentry's free tier once traffic
  justifies it, for client-side error capture and stack traces.
- **Performance monitoring**: Vercel Speed Insights (free tier available) for real-user Core Web Vitals.
- **Analytics**: Vercel Analytics or Plausible (cookieless, privacy-respecting) rather than Google Analytics,
  matching the low-overhead/no-consent-banner-needed goal.

## Maintenance cadence

- Monthly: review Supabase/Vercel usage against the growth triggers in [Cost Estimate](13-cost-estimate.md).
- Quarterly: dependency updates (`next`, `react`, `@supabase/*`, `next-intl`) — read release notes for
  breaking changes before upgrading, given this project's experience with Next.js 16's conventions differing
  from older knowledge; re-check `node_modules/next/dist/docs/` after any Next.js major/minor bump per
  `AGENTS.md`.
- Quarterly: run the backup-restore drill.
- As-needed: rotate the Supabase service-role key if ever suspected compromised (update in Vercel env vars,
  redeploy).

## Documentation upkeep

Keep this `/docs` folder as the living source of truth — update the relevant numbered file whenever a real
architectural decision changes, rather than letting the plan drift from reality.
