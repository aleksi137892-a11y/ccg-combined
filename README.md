# CCG Combined Platform

Monorepo for the Civic Council of Georgia digital infrastructure.

## Structure

```
ccg-combined/
├── apps/
│   ├── main-site/        # Primary CCG website (sabcho.org)
│   └── iimg-portal/      # IIMG evidence portal (iimg.sabcho.org)
├── packages/
│   └── shared/           # Shared types, utilities, constants
├── supabase/
│   ├── functions/        # Edge functions
│   │   └── _shared/      # Shared edge function utilities
│   └── migrations/       # Database migrations
└── docs/                 # Documentation
```

## Quick Start

```bash
# Install dependencies
npm install

# Start main site development
npm run dev

# Start IIMG portal development
npm run dev:iimg

# Build all apps
npm run build
```

## Apps

### Main Site (`apps/main-site`)
The primary CCG website with:
- Forum for Justice intake system
- Ledger of Harm
- Complicity Index
- Remedy pathways

### IIMG Portal (`apps/iimg-portal`)
Independent Investigative Mechanism of Georgia:
- Berkeley Protocol compliant evidence intake
- Tiered submission system
- Secure chain of custody

## Shared Packages

### `@ccg/shared`
Common code shared between apps:
- TypeScript types for legal standards
- Utility functions
- Constants and configuration

## Supabase

### Edge Functions
All edge functions use shared utilities from `supabase/functions/_shared/`:
- CORS handling with origin validation
- Input validation and sanitization
- Standardized response formats

### Migrations
Database migrations are in `supabase/migrations/`. Run with:
```bash
npx supabase db push
```

## Security

See `docs/banned-ai-patterns.md` for design standards.

Key security measures:
- Environment variables for all secrets
- JWT verification on edge functions
- CORS restricted to known domains
- RLS policies with service_role for writes
- No console.log in production

## Deployment

### Vercel (Recommended)
```bash
# Deploy main site
vercel --cwd apps/main-site

# Deploy IIMG portal
vercel --cwd apps/iimg-portal
```

### Supabase
```bash
# Deploy edge functions
npx supabase functions deploy

# Apply migrations
npx supabase db push
```

## Security Notes

**Known dev-only vulnerability**: The esbuild package in vite has a moderate severity issue that only affects the development server. This does not impact production builds. A fix requires upgrading to vite 7.x which introduces breaking changes.

## Deployment Scripts

```bash
# Login to Supabase CLI first
npx supabase login

# Apply database migrations
./scripts/apply-migrations.sh

# Deploy edge functions only
./scripts/deploy-functions.sh
```

## License

Proprietary - Civic Council of Georgia
