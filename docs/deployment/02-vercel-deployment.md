# Vercel Deployment Checklist

## Prerequisites
- [ ] Vercel account at https://vercel.com
- [ ] GitHub repository connected: `aleksi137892-a11y/ccg-combined`

---

## Step 1: Import Project to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `aleksi137892-a11y/ccg-combined`
4. Configure project settings (see below)

---

## Step 2: Configure Main Site

**Project Name:** `ccg-main-site` (or `sabcho-org`)

**Framework Preset:** Vite

**Root Directory:** `apps/main-site`

**Build Command:**
```
cd ../.. && npm install && cd apps/main-site && ../../node_modules/.bin/vite build
```

**Output Directory:** `dist`

**Install Command:** Leave empty (handled in build command)

---

## Step 3: Set Environment Variables

In Vercel Dashboard > Project Settings > Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://qfcogleudwbmocuygsut.supabase.co` | All |
| `VITE_SUPABASE_ANON_KEY` | (from Supabase dashboard) | All |
| `VITE_SITE_PASSWORD` | (your staging password) | Preview only |

**Important:** Do NOT set `VITE_SITE_PASSWORD` for Production - this disables the password gate.

---

## Step 4: Configure Domain (Optional)

1. Go to Project Settings > Domains
2. Add custom domain: `sabcho.org`
3. Add `www.sabcho.org` redirect
4. Follow DNS configuration instructions

---

## Step 5: Deploy IIMG Portal (Second Project)

Repeat steps 1-3 with:

**Project Name:** `iimg-portal` (or `iimg-sabcho-org`)

**Root Directory:** `apps/iimg-portal`

**Build Command:**
```
cd ../.. && npm install && cd apps/iimg-portal && ../../node_modules/.bin/vite build
```

**Domain:** `iimg.sabcho.org`

---

## Step 6: Verify Deployment

After first deploy:

- [ ] Main site loads at Vercel preview URL
- [ ] IIMG portal loads at Vercel preview URL
- [ ] Password gate works on preview (if VITE_SITE_PASSWORD set)
- [ ] Supabase connection works (test a form submission)

---

## Environment Variables Summary

### Main Site (`apps/main-site`)
```
VITE_SUPABASE_URL=https://qfcogleudwbmocuygsut.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your_key
VITE_SITE_PASSWORD=staging_password  # Preview only
```

### IIMG Portal (`apps/iimg-portal`)
```
VITE_SUPABASE_URL=https://qfcogleudwbmocuygsut.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your_key
```

---

## Automatic Deployments

Once configured:
- **Production:** Auto-deploys on push to `main` branch
- **Preview:** Auto-deploys on pull requests
