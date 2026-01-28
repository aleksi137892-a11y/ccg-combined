/**
 * Standardized response utilities for Edge Functions
 */

import { getCorsHeaders } from './cors.ts';

interface JsonResponseOptions {
  status?: number;
  origin?: string | null;
}

/**
 * Create a JSON response with CORS headers
 */
export function jsonResponse(
  data: Record<string, unknown>,
  options: JsonResponseOptions = {}
): Response {
  const { status = 200, origin = null } = options;
  
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...getCorsHeaders(origin),
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Create an error response
 */
export function errorResponse(
  message: string,
  status: number = 500,
  origin?: string | null
): Response {
  return jsonResponse({ error: message }, { status, origin });
}

/**
 * Create a success response
 */
export function successResponse(
  data: Record<string, unknown> = {},
  origin?: string | null
): Response {
  return jsonResponse({ success: true, ...data }, { status: 200, origin });
}

/**
 * Create a streaming response (for SSE/chat)
 */
export function streamResponse(
  body: ReadableStream<Uint8Array> | null,
  origin?: string | null
): Response {
  return new Response(body, {
    headers: {
      ...getCorsHeaders(origin),
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
