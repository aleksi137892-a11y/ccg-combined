# Supabase Setup Checklist

## Prerequisites
- [ ] Supabase account at https://supabase.com
- [ ] Supabase CLI installed: `npm install -g supabase`

---

## Step 1: Login to Supabase CLI
```bash
npx supabase login
```
This opens browser for authentication. Complete the OAuth flow.

---

## Step 2: Link to Existing Project
```bash
cd /path/to/ccg-combined
npx supabase link --project-ref qfcogleudwbmocuygsut
```
Enter your database password when prompted.

---

## Step 3: Apply Database Migrations
```bash
npx supabase db push
```
This applies all migrations in `supabase/migrations/` including:
- `20260128000001_revoke_anonymous_write_policies.sql` (security fix)

---

## Step 4: Deploy Edge Functions
Deploy all edge functions:
```bash
npx supabase functions deploy triage-assistant
npx supabase functions deploy triage-analytics
npx supabase functions deploy wikimedia-search
npx supabase functions deploy web-image-search
npx supabase functions deploy image-proxy
npx supabase functions deploy photo-discovery
npx supabase functions deploy photo-import
```

Or deploy all at once:
```bash
npx supabase functions deploy
```

---

## Step 5: Set Edge Function Secrets
Required secrets for edge functions:

```bash
# Lovable AI Gateway (for triage-assistant)
npx supabase secrets set LOVABLE_API_KEY=your_lovable_api_key

# Firecrawl API (for web-image-search)
npx supabase secrets set FIRECRAWL_API_KEY=your_firecrawl_api_key
```

---

## Step 6: Verify JWT Settings
Check `supabase/config.toml` has correct settings:
```toml
[functions.triage-assistant]
verify_jwt = true

[functions.triage-analytics]
verify_jwt = true

[functions.image-proxy]
verify_jwt = false  # Public access for images
```

---

## Step 7: Get Project Credentials
From Supabase Dashboard > Settings > API:

| Variable | Location |
|----------|----------|
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_ANON_KEY` | anon/public key |

Save these for Vercel environment variables.

---

## Verification Checklist
- [ ] `npx supabase db push` succeeded
- [ ] All 7 edge functions deployed
- [ ] Secrets set for LOVABLE_API_KEY and FIRECRAWL_API_KEY
- [ ] Copied SUPABASE_URL and SUPABASE_ANON_KEY for Vercel
