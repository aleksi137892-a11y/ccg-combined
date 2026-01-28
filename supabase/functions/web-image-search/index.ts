import { 
  handleCorsPreflightRequest,
  errorResponse,
  successResponse,
  validateRequired,
} from "../_shared/index.ts";

interface WebImageResult {
  url: string;
  thumbUrl: string;
  sourceUrl: string;
  title: string;
  description: string;
  sourceDomain: string;
}

function extractDomain(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace('www.', '');
  } catch {
    return '';
  }
}

function isImageUrl(url: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const lowerUrl = url.toLowerCase();
  return imageExtensions.some(ext => lowerUrl.includes(ext));
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') {
    return handleCorsPreflightRequest(origin);
  }

  try {
    const body = await req.json();
    
    const validation = validateRequired(body, ['query']);
    if (!validation.valid) {
      return errorResponse('Query is required', 400, origin);
    }

    const { query, limit = 8 } = body;

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      return errorResponse('Service not configured', 500, origin);
    }

    const searchQuery = `"${query}" portrait photo politician Georgia`;

    const response = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        limit: limit * 2,
        scrapeOptions: {
          formats: ['markdown', 'links'],
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return errorResponse('Search request failed', response.status, origin);
    }

    const images: WebImageResult[] = [];
    const seenUrls = new Set<string>();

    if (data.data && Array.isArray(data.data)) {
      for (const result of data.data) {
        const sourceDomain = extractDomain(result.url || '');
        let description = '';
        
        if (result.markdown) {
          const cleanText = result.markdown
            .replace(/^#+\s+.*/gm, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
            .replace(/\n+/g, ' ')
            .trim();
          description = cleanText.slice(0, 200);
          if (cleanText.length > 200) description += '...';
        } else if (result.description) {
          description = result.description.slice(0, 200);
        }

        if (result.url && isImageUrl(result.url) && !seenUrls.has(result.url)) {
          seenUrls.add(result.url);
          images.push({
            url: result.url,
            thumbUrl: result.url,
            sourceUrl: result.url,
            title: result.title || query,
            description,
            sourceDomain,
          });
        }

        if (result.metadata?.ogImage && !seenUrls.has(result.metadata.ogImage)) {
          seenUrls.add(result.metadata.ogImage);
          images.push({
            url: result.metadata.ogImage,
            thumbUrl: result.metadata.ogImage,
            sourceUrl: result.url || result.metadata.ogImage,
            title: result.title || query,
            description,
            sourceDomain,
          });
        }

        if (images.length >= limit) break;
      }
    }

    return successResponse({ images }, origin);
  } catch (_error) {
    return errorResponse('Search failed', 500, origin);
  }
});
