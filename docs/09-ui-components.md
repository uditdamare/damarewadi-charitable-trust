# 09. UI Component List

shadcn/ui components are copied into `src/components/ui/` (not an npm dependency), so this list is what to
generate via the shadcn CLI, plus the custom components built on top.

## shadcn/ui primitives needed

`button`, `card`, `badge`, `input`, `textarea`, `select`, `dialog`, `alert-dialog`, `dropdown-menu`, `tabs`,
`table`, `pagination`, `form` (with `react-hook-form` + `zod` resolver), `toast`/`sonner`, `avatar`,
`separator`, `skeleton` (loading states), `breadcrumb`, `calendar` + `popover` (date pickers for event date /
report year), `sheet` (mobile nav drawer).

## Layout components (`components/layout/`)

- `Header` — logo, nav links, `LanguageSwitcher`, mobile menu trigger.
- `Footer` — trust registration details, quick links, social/contact, copyright.
- `LanguageSwitcher` — toggles `/en` ↔ `/mr` preserving the current path (next-intl).
- `MobileNav` — `sheet`-based drawer nav for small screens.
- `Breadcrumbs` — used on Events/Gallery/Documents/News detail pages for SEO + UX.

## Public components (`components/public/`)

- `HeroBanner` — Home page hero with CTA.
- `AboutSummary`, `MissionVisionObjectives` — About page sections.
- `EventCard`, `EventList`, `EventDetail` (venue/date/chief guest block), `EventGallery`.
- `AlbumGrid`, `AlbumCard`, `GalleryLightbox` (image viewer, keyboard-navigable for accessibility).
- `DocumentList`, `DocumentCard` (PDF icon, size, download link, category filter chips).
- `NewsCard`, `NewsList`, `NoticeBadge` (visually distinguishes notices from news).
- `CommitteeMemberCard`, `CommitteeGrid`.
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
