# 07. Admin CMS Plan

A purpose-built CMS inside `/admin`, not a third-party headless CMS — keeps recurring cost at zero and lets
every content type match the trust's exact fields (chief guest, venue, etc.) instead of a generic schema.

## Core CMS capabilities

| Capability | Design |
|---|---|
| Rich text editor | A lightweight React rich-text editor (e.g. Tiptap) for `events.description`, `news.body` — outputs sanitized HTML, never raw user HTML rendered unsanitized |
| Draft vs Published | Every content table has `status: 'draft' \| 'published' \| 'archived'`; only `published` rows are visible publicly (enforced by RLS, not just UI filtering) |
| Soft delete | `deleted_at timestamptz` on every content table; "delete" in the admin UI sets this instead of `DELETE FROM`; a trash view lets an admin restore within a grace period |
| Image uploads | Drag-and-drop uploader → client validates type/size before upload → Server Action re-validates server-side → Supabase Storage → path stored in DB |
| PDF uploads | Same pattern, restricted to `application/pdf`, size-capped (e.g. 20MB) for annual/audit reports and certificates |
| Search | Admin-side: simple `ilike` filter on title/body per resource now; upgradeable to Postgres full-text search later, same as the public-facing future Search feature |
| Filters | Per-list filters: status, date range, category (documents), type (news/notice) |
| Pagination | Cursor or offset pagination (offset is fine at this data scale) on every admin list view, 20 rows/page default |
| Audit logs (future) | Schema-ready: add an `audit_log` table (`id, actor_id, action, entity, entity_id, diff jsonb, created_at`) once needed — not built now |

## Admin dashboard structure

- **Dashboard home**: counts of draft items awaiting publish, unread contact messages, upcoming events.
- **Per-resource CRUD pages** (Events, Gallery, Documents, News, Notices, Committee, Initiatives): list view
  (with filters/search/pagination) → create/edit form → delete (soft) with confirm dialog.
- **Initiatives** (Our Work / temple rebuild) is a first-class CRUD resource in the admin, not a hardcoded
  page — a trustee can add photos and update the temple rebuild's story over time, and add a second
  initiative later without any code change.
- **Settings**: a single-record form (not a list) editing `trust_settings` — contact email/phone (POC),
  registration number, PAN, founded year, address, map coordinates, social links. This is where the site-
  wide footer/contact info actually lives, so it stays editable without redeploying.
- **Contact inbox**: read-only list of `contact_messages`, mark-as-read, no reply-from-app (trustee replies
  via their own email — avoids building an email-sending feature prematurely).

## Publish workflow

1. Admin creates a record as `draft` — visible only in `/admin`, never on the public site (RLS-enforced).
2. Admin previews it (a `/admin/events/[id]/preview` route rendering the same public component in an
   authenticated context, bypassing the `status='published'` filter for that one admin-only view).
3. Admin clicks Publish → `status` set to `published` → Server Action calls `updateTag()` for that resource
   so the public page reflects it immediately (see [Architecture](02-architecture.md) caching model).
4. Edits to an already-published item re-tag on save; no separate "re-publish" step needed.

## Form validation

Every create/edit form shares its `zod` schema (from `lib/validation/`) between client-side form validation
(instant feedback) and the Server Action (authoritative check) — one schema, defined once, imported twice.

## Upload validation (see also [Security Checklist](16-security-checklist.md))

- Allowed image types: `image/jpeg`, `image/png`, `image/webp`. Max size: 5MB per image.
- Allowed document type: `application/pdf` only. Max size: 20MB.
- File name is never trusted as-is: server generates the storage path (`<category>/<slug>-<uuid>.<ext>`),
  ignoring the client-supplied filename beyond its extension.
- MIME type is verified server-side from the actual file bytes' magic number, not just the browser-reported
  `Content-Type`, before the upload is accepted.
