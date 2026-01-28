#!/bin/bash
# Apply Supabase migrations
# Run this after logging in with: npx supabase login

set -e

cd "$(dirname "$0")/.."

echo "Linking to Supabase project..."
npx supabase link --project-ref qfcogleudwbmocuygsut

echo "Applying migrations..."
npx supabase db push

echo "Deploying edge functions..."
npx supabase functions deploy

echo "Done! All migrations and functions deployed."
