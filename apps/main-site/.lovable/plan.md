
## Plan: Generate sitemap.xml for All Routes

### Overview

Create a comprehensive `sitemap.xml` file containing all 57 static routes (excluding dynamic `:entryId` routes) with proper XML formatting, priority weights, and update frequencies. The file will be placed in the `/public` directory for automatic serving at the root URL.

---

### File: `public/sitemap.xml`

Generate an XML sitemap following the [sitemaps.org protocol](https://www.sitemaps.org/protocol.html) with:

**Structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://blue-white-duo.lovable.app/</loc>
    <lastmod>2026-01-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- All other routes -->
</urlset>
```

**Routes Included (57 static routes):**

| Category | Routes | Priority |
|----------|--------|----------|
| Root | `/`, `/search`, `/contact`, `/sitemap` | 1.0, 0.5, 0.6, 0.3 |
| Appeal | `/appeal`, `/appeal/harm`, `/appeal/wrongdoing`, `/appeal/inside`, `/appeal/protections`, `/appeal/how-handled` | 0.9, 0.7, 0.7, 0.7, 0.8, 0.7 |
| Record | `/record`, `/record/ledger`, `/record/ledger/political-prisoners`, `/record/ledger/claims-archive`, `/record/registry`, `/record/registry/the-list`, `/record/registry/corporate-responsibility-index`, `/record/registry/reply-corrections` | 0.9, 0.8, 0.8, 0.7, 0.8, 0.9, 0.8, 0.7 |
| Remedy | `/remedy`, `/remedy/sanctions`, `/remedy/litigation`, `/remedy/criminal-dossiers`, `/remedy/iimg`, `/remedy/partners` | 0.9, 0.8, 0.8, 0.8, 0.8, 0.7 |
| State of Capture | `/state-of-capture`, `/state-of-capture/anatomy`, `/state-of-capture/findings`, `/state-of-capture/track`, `/state-of-capture/methods` | 0.9, 0.8, 0.8, 0.7, 0.7 |
| Rustaveli | `/rustaveli`, `/rustaveli/movement`, `/rustaveli/exhibition`, `/rustaveli/acts`, `/rustaveli/canon`, `/rustaveli/join` | 0.9, 0.8, 0.8, 0.7, 0.8, 0.7 |
| About | `/about`, `/about/mission`, `/about/civic-necessity`, `/about/right-to-remedy`, `/about/governance`, `/about/funding`, `/about/privacy-security`, `/about/press` | 0.8, 0.7, 0.6, 0.6, 0.6, 0.6, 0.5, 0.6 |
| Legal | `/privacy`, `/terms`, `/cookies`, `/accessibility`, `/standards` | 0.4, 0.4, 0.3, 0.4, 0.5 |

**Excluded:**
- Dynamic routes with `:entryId` parameters (8 routes)
- Georgian `/ge/*` alternate routes (handled via hreflang if needed later)

---

### File: `public/robots.txt` (Update)

Add sitemap reference:

```text
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: https://blue-white-duo.lovable.app/sitemap.xml
```

---

### GitHub Sync

Once the files are created/updated in the `/public` directory:
1. Changes will automatically sync to the connected GitHub repository
2. On next publish, the sitemap will be available at `https://blue-white-duo.lovable.app/sitemap.xml`

---

### Technical Details

**XML Specifications:**
- UTF-8 encoding declaration
- Namespace: `http://www.sitemaps.org/schemas/sitemap/0.9`
- `lastmod`: Current date (2026-01-26) in W3C format
- `changefreq`: "weekly" for most pages, "monthly" for legal pages
- `priority`: Weighted 0.3-1.0 based on page importance

**File Location:**
- `public/sitemap.xml` — Vite serves this at `/sitemap.xml` automatically
- `public/robots.txt` — Updated with Sitemap directive

---

### Files Modified

| File | Action |
|------|--------|
| `public/sitemap.xml` | Create (new) |
| `public/robots.txt` | Update (add Sitemap line) |
