# 05. API Design

## Server Actions vs Route Handlers

Default to **Server Actions** for all mutations initiated from this app's own UI (forms, admin CRUD) — they
give end-to-end type safety, avoid hand-rolled JSON contracts, and get Next.js's built-in origin/CSRF checks.

Reserve **Route Handlers** (`app/api/.../route.ts`) for cases Server Actions don't cover:
- Endpoints that must be called by something other than this app's own React tree (a future webhook from a
  payment provider for donations, a future WhatsApp/email provider callback).
- `sitemap.ts` / `robots.ts` (framework-required file conventions, not really "API design" but noted here
  for completeness).

Every Server Action and Route Handler in this project:
1. `await`s `cookies()`/`headers()`/`params` (required in Next.js 16 — see [Architecture](02-architecture.md)).
2. Validates input with a `zod` schema from `lib/validation/` before touching the database.
3. Uses the server-side Supabase client (`lib/supabase/server.ts`) so Postgres RLS enforces authorization —
   the action code never "trusts" that the caller is an admin; the database does that check.
4. On successful mutation of tagged content, calls `updateTag('<resource>')` to invalidate the Cache
   Components cache for that resource.

## Action/endpoint table

| Area | Mechanism | Location | Auth |
|---|---|---|---|
| Get events (list/detail) | `'use cache'` read function | `lib/cache/events.ts` | Public (RLS: published only) |
| Create/update/delete event | Server Action | `lib/actions/events.ts` | Admin only (RLS-enforced) |
| Upload event image | Server Action | `lib/actions/events.ts` | Admin only |
| Get gallery albums/images | `'use cache'` read function | `lib/cache/gallery.ts` | Public |
| Manage gallery albums/images | Server Action | `lib/actions/gallery.ts` | Admin only |
| Get documents | `'use cache'` read function | `lib/cache/documents.ts` | Public |
| Upload/manage documents | Server Action | `lib/actions/documents.ts` | Admin only |
| Get news/notices | `'use cache'` read function | `lib/cache/news.ts` | Public |
| Manage news/notices | Server Action | `lib/actions/news.ts` | Admin only |
| Get committee members | `'use cache'` read function | `lib/cache/committee.ts` | Public |
| Manage committee members | Server Action | `lib/actions/committee.ts` | Admin only |
| Get initiatives (list/detail) — e.g. temple rebuild | `'use cache'` read function | `lib/cache/initiatives.ts` | Public |
| Create/update/delete initiative + images | Server Action | `lib/actions/initiatives.ts` | Admin only |
| Get trust settings (contact/registration/social) | `'use cache'` read function | `lib/cache/settings.ts` | Public |
| Update trust settings | Server Action | `lib/actions/settings.ts` | Admin only |
| Submit contact form | Server Action | `lib/actions/contact.ts` | Public, rate-limited via `proxy.ts` |
| Mark contact message read / list inbox | Server Action | `lib/actions/contact.ts` | Admin only |
| Admin login/logout | Supabase Auth helper (client + server) | `lib/supabase/*.ts`, `app/admin/login/page.tsx` | Public login form, session set server-side |
| Sitemap | File convention | `app/sitemap.ts` | Public |
| Robots | File convention | `app/robots.ts` | Public |

## Example Server Action shape

```ts
// lib/actions/events.ts
'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache' // or updateTag, per Cache Components model
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { eventSchema } from '@/lib/validation/event.schema'

export async function createEvent(formData: FormData) {
  const parsed = eventSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: parsed.error.flatten() }
  }

  const supabase = await createServerSupabaseClient() // awaits cookies() internally, per Next.js 16
  const { data, error } = await supabase.from('events').insert(parsed.data).select().single()

  if (error) return { error: error.message }

  updateTag('events') // invalidate the Cache Components tag so the public list reflects this immediately
  return { data }
}
```

## Error handling convention

Server Actions return a `{ data } | { error }` shape (never throw for expected validation/business errors)
so admin forms can render inline field errors; unexpected exceptions are allowed to throw and are caught by
the nearest `error.tsx` boundary.

## Future API surface (not built now, noted for extensibility)

- `app/api/webhooks/donations/route.ts` — payment provider webhook (Razorpay/Instamojo are common for
  Indian trusts) once online donations are implemented.
- `app/api/webhooks/whatsapp/route.ts` — inbound status callbacks if WhatsApp Business API notifications
  are added.
- A `search` Server Action or Route Handler backed by Postgres full-text search (`tsvector` columns) once
  the future Search feature is prioritized.
