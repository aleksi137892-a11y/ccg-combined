import { 
  handleCorsPreflightRequest,
  getCorsHeaders,
  errorResponse,
  successResponse,
} from "../_shared/index.ts";

interface WikimediaImage {
  title: string;
  pageid: number;
  url: string;
  thumbUrl: string;
  descriptionUrl: string;
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');

  if (req.method === "OPTIONS") {
    return handleCorsPreflightRequest(origin);
  }

  try {
    let query: string | null = null;
    let limit = 10;

    // Support both GET and POST
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
      return errorResponse('Query is required', 400, origin);
    }

    // Search for images
    const searchUrl = new URL("https://commons.wikimedia.org/w/api.php");
    searchUrl.searchParams.set("action", "query");
    searchUrl.searchParams.set("list", "search");
    searchUrl.searchParams.set("srsearch", `${query} filetype:bitmap`);
    searchUrl.searchParams.set("srnamespace", "6");
    searchUrl.searchParams.set("srlimit", String(limit));
    searchUrl.searchParams.set("format", "json");
    searchUrl.searchParams.set("origin", "*");

    const searchResponse = await fetch(searchUrl.toString(), {
      headers: {
        "User-Agent": "CivicCouncilGeorgia/1.0 (https://sabcho.org)",
      },
    });

    if (!searchResponse.ok) {
      return errorResponse('Search failed', 500, origin);
    }

    const searchData = await searchResponse.json();
    const searchResults = searchData.query?.search || [];

    if (searchResults.length === 0) {
      return successResponse({ images: [] }, origin);
    }

    // Get image info
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
        "User-Agent": "CivicCouncilGeorgia/1.0 (https://sabcho.org)",
      },
    });

    if (!infoResponse.ok) {
      return errorResponse('Image info failed', 500, origin);
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

    return successResponse({ images }, origin);
  } catch (_error) {
    return errorResponse('Search failed', 500, origin);
  }
});
