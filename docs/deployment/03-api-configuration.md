# API Configuration Checklist

## Required API Keys

### 1. Supabase (Required)
**Purpose:** Database, authentication, edge functions

**Get Keys:**
1. Go to https://supabase.com/dashboard
2. Select project `qfcogleudwbmocuygsut`
3. Go to Settings > API
4. Copy:
   - Project URL → `VITE_SUPABASE_URL`
   - anon/public key → `VITE_SUPABASE_ANON_KEY`

**Where to set:**
- Vercel environment variables
- Local `.env` file for development

---

### 2. Lovable AI Gateway (Optional)
**Purpose:** Triage assistant AI responses

**Get Key:**
1. Go to Lovable dashboard
2. Navigate to API settings
3. Generate or copy API key

**Where to set:**
```bash
npx supabase secrets set LOVABLE_API_KEY=your_key
```

**Used by:** `supabase/functions/triage-assistant/index.ts`

---

### 3. Firecrawl API (Optional)
**Purpose:** Web image search for photo discovery

**Get Key:**
1. Go to https://firecrawl.dev
2. Create account / login
3. Get API key from dashboard

**Where to set:**
```bash
npx supabase secrets set FIRECRAWL_API_KEY=your_key
```

**Used by:** `supabase/functions/web-image-search/index.ts`

---

## CORS Configuration

Allowed origins are defined in `supabase/functions/_shared/cors.ts`:

```typescript
const ALLOWED_ORIGINS = [
  'https://sabcho.org',
  'https://www.sabcho.org',
  'https://iimg.sabcho.org',
  'https://forum.sabcho.org',
  'https://blue-white-duo.lovable.app',
  'http://localhost:5173',
  'http://localhost:3000',
];
```

**To add a new origin:**
1. Edit `supabase/functions/_shared/cors.ts`
2. Add the new origin to the array
3. Redeploy edge functions: `npx supabase functions deploy`

---

## Local Development Setup

Create `.env` file in `apps/main-site/`:

```env
VITE_SUPABASE_URL=https://qfcogleudwbmocuygsut.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SITE_PASSWORD=dev_password
```

**Important:** `.env` files are gitignored. Never commit API keys.

---

## API Endpoints Summary

| Endpoint | Function | Auth Required |
|----------|----------|---------------|
| `/functions/v1/triage-assistant` | AI triage chat | Yes (JWT) |
| `/functions/v1/triage-analytics` | Analytics logging | Yes (JWT) |
| `/functions/v1/wikimedia-search` | Wikimedia image search | Yes (JWT) |
| `/functions/v1/web-image-search` | Firecrawl image search | Yes (JWT) |
| `/functions/v1/image-proxy` | Image proxy/caching | No |
| `/functions/v1/photo-discovery` | Photo discovery | Yes (JWT) |
| `/functions/v1/photo-import` | Photo import | Yes (JWT) |

---

## Security Notes

- All edge functions except `image-proxy` require JWT authentication
- Anonymous database write policies have been revoked
- CORS is restricted to known origins only
- Never expose `service_role` key in frontend code
