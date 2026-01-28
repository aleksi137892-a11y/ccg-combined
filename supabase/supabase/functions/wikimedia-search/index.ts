// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://sabcho.org',
  'https://www.sabcho.org',
  'https://iimg.sabcho.org',
  'https://blue-white-duo.lovable.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
}

interface WikimediaImage {
  title: string;
  pageid: number;
  url: string;
  thumbUrl: string;
  descriptionUrl: string;
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let query: string | null = null;
    let limit = 10;

    // Support both GET (query params) and POST (JSON body)
    if (req.method === "GET") {
      const url = new URL(req.url);
      query = url.searchParams.get("q") || url.searchParams.get("query");
      const limitParam = url.searchParams.get("limit");
      if (limitParam) limit = parseInt(limitParam, 10) || 10;
    } else {
      const body = await req.json();
      query = body.query;
      limit = body.limit || 10;
    }

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Search Wikimedia Commons

    // Step 1: Search for images
    const searchUrl = new URL("https://commons.wikimedia.org/w/api.php");
    searchUrl.searchParams.set("action", "query");
    searchUrl.searchParams.set("list", "search");
    searchUrl.searchParams.set("srsearch", `${query} filetype:bitmap`);
    searchUrl.searchParams.set("srnamespace", "6"); // File namespace
    searchUrl.searchParams.set("srlimit", String(limit));
    searchUrl.searchParams.set("format", "json");
    searchUrl.searchParams.set("origin", "*");

    const searchResponse = await fetch(searchUrl.toString(), {
      headers: {
        "User-Agent": "GeorgiaAccountabilityProject/1.0 (https://example.com; contact@example.com)",
      },
    });

    if (!searchResponse.ok) {
      throw new Error(`Search failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const searchResults = searchData.query?.search || [];

    if (searchResults.length === 0) {
      return new Response(
        JSON.stringify({ success: true, images: [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 2: Get image info for each result
    const titles = searchResults.map((r: { title: string }) => r.title).join("|");
    const infoUrl = new URL("https://commons.wikimedia.org/w/api.php");
    infoUrl.searchParams.set("action", "query");
    infoUrl.searchParams.set("titles", titles);
    infoUrl.searchParams.set("prop", "imageinfo");
    infoUrl.searchParams.set("iiprop", "url|thumbmime");
    infoUrl.searchParams.set("iiurlwidth", "400");
    infoUrl.searchParams.set("format", "json");
    infoUrl.searchParams.set("origin", "*");

    const infoResponse = await fetch(infoUrl.toString(), {
      headers: {
        "User-Agent": "GeorgiaAccountabilityProject/1.0 (https://example.com; contact@example.com)",
      },
    });

    if (!infoResponse.ok) {
      throw new Error(`Image info failed: ${infoResponse.status}`);
    }

    const infoData = await infoResponse.json();
    const pages = infoData.query?.pages || {};

    interface WikimediaPage {
      title: string;
      pageid: number;
      imageinfo?: Array<{
        url: string;
        thumburl?: string;
        descriptionurl?: string;
      }>;
    }

    const images: WikimediaImage[] = (Object.values(pages) as WikimediaPage[])
      .filter((page) => page.imageinfo && page.imageinfo[0])
      .map((page) => {
        const info = page.imageinfo![0];
        return {
          title: page.title.replace("File:", ""),
          pageid: page.pageid,
          url: info.url,
          thumbUrl: info.thumburl || info.url,
          descriptionUrl: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
        };
      });

    // Return results

    return new Response(
      JSON.stringify({ success: true, images }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Wikimedia search error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Search failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
