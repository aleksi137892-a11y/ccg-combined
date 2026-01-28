# Quick Start Deployment

## Fastest Path to Production

### Prerequisites
- Supabase account with project `qfcogleudwbmocuygsut`
- Vercel account
- GitHub access to `aleksi137892-a11y/ccg-combined`

---

## 5-Minute Setup

### 1. Supabase (2 min)
```bash
# Install CLI
npm install -g supabase

# Login
npx supabase login

# From project root
cd /path/to/ccg-combined
npx supabase link --project-ref qfcogleudwbmocuygsut

# Deploy everything
npx supabase db push
npx supabase functions deploy
```

### 2. Vercel Main Site (2 min)
1. Go to https://vercel.com/new
2. Import `aleksi137892-a11y/ccg-combined`
3. Settings:
   - Root: `apps/main-site`
   - Framework: Vite
   - Build: `cd ../.. && npm install && cd apps/main-site && ../../node_modules/.bin/vite build`
   - Output: `dist`
4. Add environment variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
5. Deploy

### 3. Vercel IIMG Portal (1 min)
1. Create new Vercel project
2. Same repo, different settings:
   - Root: `apps/iimg-portal`
   - Same build command pattern
   - Same env vars
3. Deploy

---

## That's It

Both sites will:
- Auto-deploy on push to `main`
- Create preview deployments for PRs
- Connect to shared Supabase backend

---

## Troubleshooting

**Build fails?**
- Check build command is exactly as specified
- Verify root directory is correct

**Supabase connection fails?**
- Verify env vars are set in Vercel
- Check CORS includes your Vercel domain

**Edge functions fail?**
- Run `npx supabase functions deploy` again
- Check secrets are set with `npx supabase secrets list`
