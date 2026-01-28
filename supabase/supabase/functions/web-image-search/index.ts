const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, limit = 8 } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ success: false, error: 'Query is required' }),
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

    // Search for portrait/photo of the person
    const searchQuery = `"${query}" portrait photo politician Georgia`;
    console.log('Searching web for:', searchQuery);

    const response = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        limit: limit * 2, // Request more to filter
        scrapeOptions: {
          formats: ['markdown', 'links'],
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl API error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error || `Request failed with status ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Firecrawl response:', JSON.stringify(data).slice(0, 500));

    // Extract image URLs from results
    const images: WebImageResult[] = [];
    const seenUrls = new Set<string>();

    if (data.data && Array.isArray(data.data)) {
      for (const result of data.data) {
        const sourceDomain = extractDomain(result.url || '');
        // Extract description from markdown content (first 200 chars)
        let description = '';
        if (result.markdown) {
          // Clean up markdown: remove headers, links, images
          const cleanText = result.markdown
            .replace(/^#+\s+.*/gm, '') // Remove headers
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with text
            .replace(/!\[[^\]]*\]\([^)]+\)/g, '') // Remove images
            .replace(/\n+/g, ' ') // Replace newlines with spaces
            .trim();
          description = cleanText.slice(0, 200);
          if (cleanText.length > 200) description += '...';
        } else if (result.description) {
          description = result.description.slice(0, 200);
        }

        // Check if the result URL itself is an image
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

        // Check for og:image or similar in metadata
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

    // If we don't have enough images, try an image-specific search
    if (images.length < limit) {
      const imageSearchQuery = `${query} portrait site:wikipedia.org OR site:wikimedia.org`;
      console.log('Trying image-specific search:', imageSearchQuery);

      const imageResponse = await fetch('https://api.firecrawl.dev/v1/search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: imageSearchQuery,
          limit: limit,
          scrapeOptions: {
            formats: ['markdown'],
          },
        }),
      });

      const imageData = await imageResponse.json();

      if (imageResponse.ok && imageData.data) {
        for (const result of imageData.data) {
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
    }

    console.log(`Found ${images.length} images`);

    return new Response(
      JSON.stringify({ success: true, images }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in web-image-search:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to search';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
