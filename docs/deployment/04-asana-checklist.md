# CCG Platform Deployment Checklist

Copy this into Asana as a task list.

---

## Section 1: Supabase Setup

- [ ] Install Supabase CLI: `npm install -g supabase`
- [ ] Login to Supabase CLI: `npx supabase login`
- [ ] Link project: `npx supabase link --project-ref qfcogleudwbmocuygsut`
- [ ] Apply migrations: `npx supabase db push`
- [ ] Deploy edge function: triage-assistant
- [ ] Deploy edge function: triage-analytics
- [ ] Deploy edge function: wikimedia-search
- [ ] Deploy edge function: web-image-search
- [ ] Deploy edge function: image-proxy
- [ ] Deploy edge function: photo-discovery
- [ ] Deploy edge function: photo-import
- [ ] Set secret: LOVABLE_API_KEY
- [ ] Set secret: FIRECRAWL_API_KEY
- [ ] Copy SUPABASE_URL for Vercel
- [ ] Copy SUPABASE_ANON_KEY for Vercel

---

## Section 2: Vercel Main Site

- [ ] Import ccg-combined repo to Vercel
- [ ] Set root directory: apps/main-site
- [ ] Set framework: Vite
- [ ] Set build command (see docs)
- [ ] Set output directory: dist
- [ ] Add env var: VITE_SUPABASE_URL
- [ ] Add env var: VITE_SUPABASE_ANON_KEY
- [ ] Add env var: VITE_SITE_PASSWORD (preview only)
- [ ] Trigger first deployment
- [ ] Verify site loads correctly
- [ ] Configure custom domain: sabcho.org
- [ ] Verify SSL certificate active

---

## Section 3: Vercel IIMG Portal

- [ ] Create second Vercel project for IIMG
- [ ] Set root directory: apps/iimg-portal
- [ ] Set framework: Vite
- [ ] Set build command (see docs)
- [ ] Add env var: VITE_SUPABASE_URL
- [ ] Add env var: VITE_SUPABASE_ANON_KEY
- [ ] Trigger first deployment
- [ ] Verify portal loads correctly
- [ ] Configure custom domain: iimg.sabcho.org

---

## Section 4: API Configuration

- [ ] Verify Supabase project is active
- [ ] Verify edge functions respond (test endpoints)
- [ ] Verify CORS allows production domains
- [ ] Test form submission end-to-end
- [ ] Test image proxy functionality

---

## Section 5: Post-Deployment Verification

- [ ] Main site: Homepage loads
- [ ] Main site: Navigation works
- [ ] Main site: Justice page loads (lazy-loaded)
- [ ] Main site: TheList page loads (lazy-loaded)
- [ ] Main site: Footer links work
- [ ] IIMG: Homepage loads
- [ ] IIMG: PWA manifest loads
- [ ] IIMG: Intake forms functional
- [ ] Both: Mobile responsive
- [ ] Both: Georgian language toggle works

---

## Section 6: DNS Configuration (if custom domain)

- [ ] Add A record for apex domain
- [ ] Add CNAME for www subdomain
- [ ] Add CNAME for iimg subdomain
- [ ] Verify DNS propagation (can take up to 48h)
- [ ] Verify HTTPS works on all domains

---

## Notes

- All documentation in: `docs/deployment/`
- GitHub repo: `aleksi137892-a11y/ccg-combined`
- Supabase project ID: `qfcogleudwbmocuygsut`
