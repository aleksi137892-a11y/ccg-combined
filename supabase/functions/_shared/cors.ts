/**
 * Shared CORS utilities for Supabase Edge Functions
 * 
 * Security: Only allows requests from known CCG domains
 */

// Allowed origins - update this list when adding new domains
const ALLOWED_ORIGINS = [
  'https://sabcho.org',
  'https://www.sabcho.org',
  'https://iimg.sabcho.org',
  'https://forum.sabcho.org',
  'https://blue-white-duo.lovable.app',
  // Development
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:8080',
];

/**
 * Get CORS headers for a request
 * Returns headers with the origin if it's in the allowed list,
 * otherwise defaults to the primary domain
 */
export function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) 
    ? origin 
    : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Handle CORS preflight request
 */
export function handleCorsPreflightRequest(origin: string | null): Response {
  return new Response(null, { 
    status: 204,
    headers: getCorsHeaders(origin) 
  });
}

/**
 * Check if origin is allowed
 */
export function isOriginAllowed(origin: string | null): boolean {
  return origin !== null && ALLOWED_ORIGINS.includes(origin);
}
