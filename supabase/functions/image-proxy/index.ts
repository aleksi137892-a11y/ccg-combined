import { 
  getCorsHeaders, 
  handleCorsPreflightRequest,
  errorResponse,
} from "../_shared/index.ts";

const ALLOWED_HOSTS = new Set([
  "upload.wikimedia.org",
  "commons.wikimedia.org",
  "en.wikipedia.org",
  "civil.ge",
  "www.civil.ge",
  "oc-media.org",
  "www.oc-media.org",
  "static.court.ge",
  "web-api.parliament.ge",
  "parliament.ge",
  "info.parliament.ge",
  "gov.ge",
  "mfa.gov.ge",
  "justice.gov.ge",
  "georgiacapital.ge",
  "www.georgiacapital.ge",
  "cdn.lb.ge",
  "lb.ge",
]);

function isAllowed(url: URL) {
  if (url.protocol !== "https:") return false;
  return ALLOWED_HOSTS.has(url.hostname);
}

async function fetchWithRetry(
  url: string,
  opts: RequestInit,
  maxAttempts = 4
): Promise<Response> {
  let lastErr: unknown = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url, opts);

      if (res.status === 429 || (res.status >= 500 && res.status <= 599)) {
        const retryAfterRaw = res.headers.get("retry-after");
        const retryAfter = retryAfterRaw ? Number(retryAfterRaw) : NaN;
        const waitMs = Number.isFinite(retryAfter)
          ? Math.max(1000, retryAfter * 1000)
          : Math.min(8000, 750 * 2 ** (attempt - 1));

        res.body?.cancel();
        await new Promise((r) => setTimeout(r, waitMs));
        continue;
      }

      return res;
    } catch (e) {
      lastErr = e;
      const waitMs = Math.min(8000, 750 * 2 ** (attempt - 1));
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }

  throw lastErr ?? new Error("Upstream fetch failed");
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return handleCorsPreflightRequest(origin);
  }

  try {
    const requestUrl = new URL(req.url);
    const raw = requestUrl.searchParams.get("url");

    if (!raw) {
      return new Response(JSON.stringify({ error: "Missing url" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let target: URL;
    try {
      target = new URL(raw);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid url" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!isAllowed(target)) {
      return new Response(JSON.stringify({ error: "Host not allowed" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const method = req.method === "HEAD" ? "HEAD" : "GET";

    let upstream: Response;
    try {
      upstream = await fetchWithRetry(
        target.toString(),
        {
          redirect: "follow",
          method,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            Referer: target.origin + "/",
          },
        },
        4
      );
    } catch (_e) {
      return errorResponse("Upstream fetch error", 502, origin);
    }

    if (!upstream.ok) {
      const status = upstream.status;
      const contentType =
        upstream.headers.get("content-type") ?? "text/plain; charset=utf-8";
      const cacheControl =
        upstream.headers.get("cache-control") ??
        "public, max-age=300, stale-while-revalidate=60";

      return new Response(method === "HEAD" ? null : upstream.body, {
        status,
        headers: {
          ...corsHeaders,
          "Content-Type": contentType,
          "Cache-Control": cacheControl,
        },
      });
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
    const cacheControl =
      upstream.headers.get("cache-control") ??
      "public, max-age=604800, stale-while-revalidate=86400";

    return new Response(method === "HEAD" ? null : upstream.body, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
      },
    });
  } catch (_error) {
    return errorResponse("Unexpected error", 500, origin);
  }
});
