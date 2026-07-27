# Damarewadi Charitable Trust — Website Project Plan

This folder is the complete project plan for the Damarewadi Charitable Trust website: a modern,
SEO-friendly, admin-editable site built on Next.js 16 + Supabase + Vercel + Cloudflare, designed to be
maintainable for 5–10 years on a personally-funded, low-cost hosting budget.

Treat this as a living document set — update the relevant file as decisions change instead of re-reading
this whole plan from scratch each time.

## How to read this

Start with the executive summary and architecture doc, then jump to whichever area you're working on.

| # | Doc | Covers |
|---|-----|--------|
| 01 | [Executive Summary](01-executive-summary.md) | What we're building, why this stack, top risks |
| 02 | [Architecture](02-architecture.md) | System diagram, tech stack rationale, request flow, rendering strategy |
| 03 | [Folder Structure](03-folder-structure.md) | Next.js 16 App Router project layout |
| 04 | [Database Schema](04-database-schema.md) | Postgres tables, relationships, indexes, RLS |
| 05 | [API Design](05-api-design.md) | Server Actions vs Route Handlers, endpoint table |
| 06 | [Auth Flow](06-auth-flow.md) | Supabase Auth, admin-only login, session/proxy protection |
| 07 | [Admin CMS Plan](07-admin-cms.md) | Editor, draft/publish, soft delete, uploads, search/filter |
| 08 | [Storage Structure](08-storage-structure.md) | Supabase Storage buckets, folder hierarchy, naming |
| 09 | [UI Components](09-ui-components.md) | shadcn/ui inventory mapped to pages |
| 10 | [Page-by-Page Breakdown](10-pages-breakdown.md) | Every page's content, components, SEO, i18n |
| 11 | [Roadmap, Milestones & Sprints](11-roadmap-milestones-sprints.md) | Phased delivery plan |
| 12 | [Risks & Future Enhancements](12-risks-and-future-enhancements.md) | What could go wrong, what's next |
| 13 | [Cost Estimate](13-cost-estimate.md) | Vercel/Supabase/Cloudflare/domain pricing, growth triggers |
| 14 | [Deployment Checklist](14-deployment-checklist.md) | Go-live steps end to end |
| 15 | [Testing Strategy](15-testing-strategy.md) | Unit/integration/E2E/accessibility/Lighthouse |
| 16 | [Security Checklist](16-security-checklist.md) | Auth, validation, headers, upload safety, backups |
| 17 | [Maintenance & DevOps](17-maintenance-and-devops.md) | Branching, env vars, monitoring, logging, backups |

## Key decisions locked in

- **Stack**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Supabase (Postgres, Auth,
  Storage) + Vercel + Cloudflare (free DNS/CDN) + `next-intl` for English/Marathi bilingual support.
- **Scope of this plan**: planning only — no application code, database migrations, or scaffolding are
  created as part of this deliverable. Implementation follows in later sessions against this plan.
- **This repo already has a bare `create-next-app` scaffold** on Next.js **16.2.12** / React 19.2.4 / Tailwind
  v4, with the React Compiler enabled. Next.js 16 changed several conventions from older Next.js knowledge
  (see [Architecture](02-architecture.md) and [Folder Structure](03-folder-structure.md) for specifics) —
  notably `middleware.ts` → `proxy.ts`, fully-async `cookies()`/`headers()`/`params`, and the new stable
  **Cache Components** model (`cacheComponents` + `'use cache'`) replacing the old experimental PPR flags.
