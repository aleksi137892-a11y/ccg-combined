import { 
  getCorsHeaders, 
  handleCorsPreflightRequest,
  errorResponse,
  successResponse,
  validateRequired,
} from "../_shared/index.ts";

interface PhotoSearchRequest {
  name: string;
  position?: string;
  organization?: string;
}

interface PhotoResult {
  name: string;
  photoUrl: string | null;
  source: string | null;
  confidence: 'high' | 'medium' | 'low';
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') {
    return handleCorsPreflightRequest(origin);
  }

  try {
    const body = await req.json();
    const { officials } = body as { officials: PhotoSearchRequest[] };

    if (!officials || !Array.isArray(officials)) {
      return errorResponse('Officials array is required', 400, origin);
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      return errorResponse('Service not configured', 500, origin);
    }

    const results: PhotoResult[] = [];

    for (const official of officials.slice(0, 10)) {
      const searchQueries = [
        `site:gov.ge "${official.name}" photo`,
        `site:justice.gov.ge "${official.name}"`,
        `site:pog.gov.ge "${official.name}"`,
        `site:court.ge "${official.name}"`,
        `site:civil.ge "${official.name}" photo`,
        `site:oc-media.org "${official.name}" photo`,
      ];

      let foundPhoto: string | null = null;
      let foundSource: string | null = null;
      let confidence: 'high' | 'medium' | 'low' = 'low';

      for (const query of searchQueries) {
        try {
          const response = await fetch('https://api.firecrawl.dev/v1/search', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query,
              limit: 3,
              scrapeOptions: {
                formats: ['markdown', 'links'],
              },
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.data && data.data.length > 0) {
              for (const result of data.data) {
                const content = result.markdown || '';
                const imageMatches = content.match(/https?:\/\/[^\s)]+\.(jpg|jpeg|png|webp)/gi);
                
                if (imageMatches && imageMatches.length > 0) {
                  for (const img of imageMatches) {
                    if (!img.includes('logo') && !img.includes('icon') && !img.includes('banner')) {
                      foundPhoto = img;
                      foundSource = result.url;
                      confidence = query.includes('gov.ge') ? 'high' : 'medium';
                      break;
                    }
                  }
                }
                if (foundPhoto) break;
              }
            }
          }
          
          if (foundPhoto) break;
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (_searchError) {
          // Continue to next query
        }
      }

      results.push({
        name: official.name,
        photoUrl: foundPhoto,
        source: foundSource,
        confidence,
      });
    }

    return successResponse({ 
      results,
      stats: {
        searched: results.length,
        found: results.filter(r => r.photoUrl).length,
      }
    }, origin);
  } catch (_error) {
    return errorResponse('Failed to discover photos', 500, origin);
  }
});
