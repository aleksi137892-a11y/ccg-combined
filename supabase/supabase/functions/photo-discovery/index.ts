const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { officials } = await req.json() as { officials: PhotoSearchRequest[] };

    if (!officials || !Array.isArray(officials)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Officials array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl connector not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results: PhotoResult[] = [];

    // Process officials in batches to avoid rate limits
    for (const official of officials.slice(0, 10)) { // Limit to 10 per request
      console.log(`Searching for photo: ${official.name}`);
      
      // Try official Georgian government sources first
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
              // Look for image URLs in the scraped content
              for (const result of data.data) {
                const content = result.markdown || '';
                const imageMatches = content.match(/https?:\/\/[^\s)]+\.(jpg|jpeg|png|webp)/gi);
                
                if (imageMatches && imageMatches.length > 0) {
                  // Filter for likely portrait/headshot images
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
          
          // Small delay to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (searchError) {
          console.error(`Search error for ${query}:`, searchError);
        }
      }

      results.push({
        name: official.name,
        photoUrl: foundPhoto,
        source: foundSource,
        confidence,
      });
    }

    console.log(`Found ${results.filter(r => r.photoUrl).length} photos out of ${results.length} searched`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        results,
        stats: {
          searched: results.length,
          found: results.filter(r => r.photoUrl).length,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in photo discovery:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to discover photos';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
