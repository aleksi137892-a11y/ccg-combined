#!/bin/bash
# Deploy all Supabase edge functions
# Run this after logging in with: npx supabase login

set -e

cd "$(dirname "$0")/.."

FUNCTIONS=(
  "triage-assistant"
  "triage-analytics"
  "wikimedia-search"
  "web-image-search"
  "image-proxy"
  "photo-discovery"
  "photo-import"
)

echo "Deploying ${#FUNCTIONS[@]} edge functions..."

for fn in "${FUNCTIONS[@]}"; do
  echo "Deploying $fn..."
  npx supabase functions deploy "$fn" --no-verify-jwt=false
done

echo "Done! All functions deployed."
