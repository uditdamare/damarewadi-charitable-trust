# 09. UI Component List

shadcn/ui components are copied into `src/components/ui/` (not an npm dependency), so this list is what to
generate via the shadcn CLI, plus the custom components built on top.

## Theme: modular multi-theme system

Colors are never hardcoded in a component — every component references a **semantic token**
(`bg-primary`, `text-foreground`, `bg-surface-muted`, ...) that resolves to a CSS custom property. Swapping
the entire site's brand identity is a one-line change (the `data-theme` attribute on `<html>`), with zero
component edits, because Tailwind's `@theme inline` keeps the utility classes as live `var()` references
instead of baking in literal colors at build time.

### Token table

| Token | Role |
|---|---|
| `--primary` / `--primary-foreground` / `--primary-hover` | main CTA color (header button, form submit) + its readable text + hover shade |
| `--secondary` / `--secondary-foreground` / `--secondary-hover` | hero/CTA section backgrounds + its readable text |
| `--accent` / `--accent-foreground` | highlight color, reserved for future badge/tag use |
| `--background` / `--text` (alias `--foreground`) | page background / body text |
| `--surface` / `--muted` (alias `--surface-muted`) | card backgrounds vs. muted section backgrounds |
| `--border` / `--muted-foreground` | dividers / secondary (subtitle-weight) text |
| `--success` / `--warning` / `--error` (+ `-foreground` pairs) | status colors — **identical across every theme**, since success/warning/error carry universal meaning that shouldn't shift with brand identity |
| `--supporting-1` / `--supporting-2` | optional theme-specific extra accents (only the Konkan theme actually diverges here; every other theme aliases them to `--accent`/`--secondary` so referencing them never breaks) |

### The 5 themes

Defined in `src/app/globals.css` as `html[data-theme="<id>"]` blocks (light) with a matching
`@media (prefers-color-scheme: dark)` block per theme (dark values are a separately hand-tuned equivalent —
same hues, adjusted for contrast on a dark surface — since only light-mode specs were given). Theme metadata
(id, label, swatch preview colors) lives in `src/lib/themes.ts` — the single registry `<ThemeSwitcher>`
reads from, and the only place to touch when adding a 6th theme later.

| # | Theme | Primary | Secondary | Accent |
|---|---|---|---|---|
| 1 | Trust & Community | `#283D5E` | `#327F51` | `#EEB64B` |
| 2 | Heritage & Tradition | `#6B4226` | `#2F6B3C` | `#C9A227` |
| 3 | Modern Non-Profit | `#1E3A5F` | `#0F766E` | `#F59E0B` |
| 4 | Warm Service | `#8A3B12` | `#4F7D42` | `#E8B84A` |
| 5 | Konkan Inspired | `#283D5E` | `#327F51` | `#EEB64B` (+ supporting `#64A47F`, `#FC9460`) |

### Previewing themes

`<ThemeSwitcher>` (`components/layout/ThemeSwitcher.tsx`) is a floating swatch picker (bottom-left, opposite
the WhatsApp button) that live-switches `data-theme` and persists the choice to `localStorage` — open the
site and click through all 5 to compare. **This is a preview-only tool for choosing a brand identity**, not
meant to ship to end visitors once a theme is finalized — remove it (or gate it behind an env flag) once a
theme is picked, and set that theme as the new `DEFAULT_THEME` in `src/lib/themes.ts`. A tiny inline script
in the root layout applies any saved theme before first paint, so returning visitors don't see a flash of
the default theme.

**Typography**: Geist Sans (English) + Noto Sans Devanagari (Marathi), already wired in `[locale]/layout.tsx`
— deliberately kept as a single font pairing per locale rather than adding a display/serif font, since a
second Latin typeface has no equally-legible Devanagari companion and would look mismatched on `/mr` pages.

## Patterns adopted from reference NGO sites

- **Header CTA button** — a filled `primary`-colored button in the nav (all four references use this for
  "Donate Now"; this site uses it for "Contact" until a real donation flow exists — swap the label once
  [Online Donations](12-risks-and-future-enhancements.md) ships).
- **`WhatsAppButton`** (`components/layout/WhatsAppButton.tsx`) — floating `wa.me` link using the POC phone
  number, no WhatsApp Business API needed yet; matches Akshaya Patra's floating chat button and is a
  zero-backend stand-in for the future "WhatsApp Notifications" feature.
- **Footer social icon row** — renders only if `trustSettings.socialLinks` has entries (empty-state principle
  from [10](10-pages-breakdown.md) — no placeholder icons for accounts that don't exist yet).
- **Not yet adopted, needs real content first** (see the "what's missing" list in chat): impact/stat counters,
  campaign progress bars per initiative, beneficiary/testimonial quotes, trust/accreditation badges.

## shadcn/ui primitives needed

`button`, `card`, `badge`, `input`, `textarea`, `select`, `dialog`, `alert-dialog`, `dropdown-menu`, `tabs`,
`table`, `pagination`, `form` (with `react-hook-form` + `zod` resolver), `toast`/`sonner`, `avatar`,
`separator`, `skeleton` (loading states), `breadcrumb`, `calendar` + `popover` (date pickers for event date /
report year), `sheet` (mobile nav drawer).

## Layout components (`components/layout/`)

- `Header` — logo, nav links, `LanguageSwitcher`, prominent CTA button, mobile menu trigger.
- `Footer` — trust registration details, quick links, social/contact (icons shown only if configured), copyright.
- `LanguageSwitcher` — toggles `/en` ↔ `/mr` preserving the current path (next-intl).
- `WhatsAppButton` — floating `wa.me` contact link, site-wide.
- `MobileNav` — `sheet`-based drawer nav for small screens.
- `Breadcrumbs` — used on Events/Gallery/Documents/News detail pages for SEO + UX.

## Public components (`components/public/`)

- `HeroBanner` — Home page hero with CTA.
- `AboutSummary`, `MissionVisionObjectives` — About page sections.
- `EventCard`, `EventList`, `EventDetail` (venue/date/chief guest block), `EventGallery`.
- `AlbumGrid`, `AlbumCard`, `GalleryLightbox` (image viewer, keyboard-navigable for accessibility).
- `DocumentList`, `DocumentCard` (PDF icon, size, download link, category filter chips).
- `NewsCard`, `NewsList`, `NoticeBadge` (visually distinguishes notices from news).
- `CommitteeMemberCard` (shows name + role title, localized via the `position_key` lookup — see
  [Database Schema](04-database-schema.md)), `CommitteeGrid`.
- `InitiativeCard`, `InitiativeList`, `InitiativeDetail` (story + background), `InitiativeGallery` — for
  "Our Work" (temple rebuild and future causes).
- `ContactForm` (`react-hook-form` + `zod`, submits via Server Action), `ContactMap` (Google Maps embed).
- `SEOJsonLd` — small helper component emitting the appropriate JSON-LD script per page type
  (Organization on Home, Event on event detail pages, etc.).

## Admin components (`components/admin/`)

- `RichTextEditor` — wraps Tiptap, outputs sanitized HTML.
- `FileUploadField` — drag-and-drop, client-side type/size validation, progress indicator.
- `DataTable` — shared table w/ sorting, filter row, pagination controls (wraps shadcn `table` + `pagination`).
- `StatusBadge` — draft/published/archived visual indicator.
- `ConfirmDeleteDialog` — wraps `alert-dialog`, used for every soft-delete action.
- `AdminSidebar` — nav between Events/Gallery/Documents/News/Notices/Committee/Contact Inbox.

## Accessibility notes (applies across all of the above)

- All interactive components keyboard-navigable (shadcn/ui + Radix primitives provide this by default).
- Images always require an admin-entered `alt` text field in upload forms (empty alt only for genuinely
  decorative images).
- Color contrast checked against WCAG AA for both light mode and Marathi Devanagari text rendering.
