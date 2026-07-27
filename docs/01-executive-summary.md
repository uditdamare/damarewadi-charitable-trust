# 01. Executive Summary

## What we're building

A production website for **Damarewadi Charitable Trust** that lets non-technical trustees publish events,
news/notices, photo galleries, and official documents (trust deed, annual/audit reports, certificates)
without touching code — while giving the public a fast, accessible, bilingual (English/Marathi), highly
discoverable (SEO-optimized) site to browse the trust's work.

## Why this stack

| Concern | Choice | Why |
|---|---|---|
| Hosting cost | Vercel + Supabase + Cloudflare free/low tiers | Near-zero cost at low traffic, pay only as traffic/storage genuinely grows |
| Reliability | Vercel (managed, auto-scaling) + Supabase (managed Postgres with backups) | No servers to patch or babysit |
| Security | Supabase Auth + Postgres Row Level Security + Next.js Server Actions | Auth and authorization enforced at the database layer, not just the UI |
| SEO | Next.js App Router static rendering + Metadata API + sitemap/robots + JSON-LD | Framework-native SEO primitives, no bolt-on plugins |
| Performance | Static rendering by default, Cache Components for CMS content, `next/image` | Sub-second loads even on mobile/rural connections |
| Maintainability | TypeScript, normalized schema, shadcn/ui, documented conventions | A future maintainer (possibly not you) can safely make changes |
| Content editing | Custom admin CMS (not a headless CMS SaaS) | No recurring CMS subscription cost; tailored exactly to trust's content types |

## Scope of this plan

This document set is a **planning deliverable only** — architecture, schema, roadmap, and checklists. No
application code, database migrations, or project scaffolding are created in this engagement. It's meant to
be detailed enough that implementation can start directly from it in a follow-up session.

## Top risks (see [12](12-risks-and-future-enhancements.md) for full list)

1. **Single-maintainer risk** — if only one person can operate the CMS/deploys, document everything (this
   plan + a short trustee-facing "how to publish an event" guide) so the trust isn't dependent on one person.
2. **Vercel commercial-use terms** — a trust website, even personally funded, may not qualify for the free
   Hobby tier depending on how it's used; flagged explicitly in [Cost Estimate](13-cost-estimate.md).
3. **Content sprawl without governance** — without draft/publish workflow and soft delete (built into the
   CMS plan), accidental public mistakes or permanent data loss become likely.
4. **Framework version drift** — this project pins a very recent Next.js (16.2.12) with meaningfully
   different conventions from older tutorials/AI training data; the plan calls out every place this matters
   so future contributors don't silently reintroduce deprecated patterns.

## Recommended path forward

Review this plan, adjust anything that doesn't match trustee expectations, then implement in the phased
order laid out in [Roadmap](11-roadmap-milestones-sprints.md): foundation → database/auth → public pages →
admin CMS → SEO/performance polish → launch.
