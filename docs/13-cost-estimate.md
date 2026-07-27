# 13. Cost Estimate

Confirmed with the trust: **the domain is not yet registered**, so this includes a concrete registration
step rather than assuming it's owned.

## Recurring costs at launch (low traffic)

| Item | Tier | Cost | Notes |
|---|---|---|---|
| Domain (`.org` preferred) | Standard `.org` registration | ~$12–20/year | Consider Cloudflare Registrar (at-cost, no markup) once DNS is already there, or Namecheap/Google Domains-equivalent |
| Vercel | Hobby (free) **or** Pro | $0 or $20/month | **Important**: Vercel's Hobby tier terms restrict use to personal, non-commercial projects. A charitable trust's public site is arguably organizational use — verify current Vercel Terms of Service before launch; budget for Pro ($20/mo) if Hobby isn't appropriate for this use case |
| Supabase | Free tier | $0 | Free tier: 500MB DB, 1GB storage, 50k monthly active users — ample for initial traffic; watch storage usage as PDFs/photos accumulate |
| Cloudflare | Free plan | $0 | DNS + CDN + basic security, no cost at this scale |
| Email (transactional, future) | Resend/Postmark free tier | $0 initially | Only needed once contact-form email notifications or future donation receipts are added |
| **Total at launch** | | **~$1–2/month** (domain amortized) + possible $20/month if Vercel Pro is required | |

## Growth triggers (when to upgrade)

| Signal | Action |
|---|---|
| Supabase storage approaching 1GB free limit | Upgrade to Supabase Pro (~$25/month, 8GB storage, daily backups with longer retention) |
| Supabase DB approaching 500MB | Same upgrade — Pro tier raises this substantially |
| Vercel bandwidth/build minutes approaching Hobby limits, or ToS requires it | Move to Vercel Pro (~$20/month) |
| Need for team seats / multiple admin developers | Vercel Pro (per-seat) and Supabase Team tier |
| Traffic requiring more than Cloudflare Free's caching/WAF rules | Cloudflare Pro (~$20/month) — unlikely needed for a trust's traffic profile |

## One-time costs

- Domain registration (first year): ~$12–20.
- Optional: professional photography/branding for the Home hero — not a hosting cost, but worth budgeting
  if the trust wants a polished launch.

## Recommendation

Start entirely on free tiers (Supabase Free + Cloudflare Free) and only pay for the domain plus, if
required by Vercel's terms for organizational use, Vercel Pro. Reassess tier upgrades against the growth
triggers above rather than pre-paying for capacity that isn't needed yet.
