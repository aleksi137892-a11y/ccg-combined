import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ImportEntry {
  id: string;
  name: string;
  photo: string;
}

interface ImportResult {
  id: string;
  name: string;
  status: "success" | "skipped" | "failed";
  error?: string;
  publicUrl?: string;
}

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .substring(0, 50);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { entries } = (await req.json()) as { entries: ImportEntry[] };

    if (!entries || !Array.isArray(entries)) {
      return new Response(
        JSON.stringify({ success: false, error: "Entries array is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Starting import for ${entries.length} entries`);

    // Get existing files in the bucket to avoid re-uploading
    const { data: existingFiles } = await supabase.storage
      .from("registry-photos")
      .list("", { limit: 1000 });

    const existingIds = new Set<string>();
    const idRegex = /-(\d+)\.(jpg|jpeg|png|webp)$/i;
    for (const file of existingFiles ?? []) {
      const match = file.name.match(idRegex);
      if (match) existingIds.add(match[1]);
    }

    const results: ImportResult[] = [];

    for (const entry of entries) {
      const { id, name, photo } = entry;

      // Skip if no valid photo URL
      if (
        !photo ||
        photo.includes("placeholder") ||
        photo.startsWith("/") ||
        photo.startsWith("data:")
      ) {
        results.push({ id, name, status: "skipped", error: "No valid URL" });
        continue;
      }

      // Skip if already exists
      if (existingIds.has(id)) {
        results.push({ id, name, status: "skipped", error: "Already exists" });
        continue;
      }

      try {
        console.log(`Fetching photo for ${name} (${id}): ${photo}`);

        // Retry logic for rate-limited sources
        let response: Response | null = null;
        let lastError = "";
        
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            // Add delay between attempts for rate limits
            if (attempt > 0) {
              await new Promise((r) => setTimeout(r, 2000 * attempt));
            }
            
            response = await fetch(photo, {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                Referer: new URL(photo).origin + "/",
              },
            });

            if (response.ok) break;
            
            // If rate limited, wait longer
            if (response.status === 429) {
              lastError = `HTTP 429 (attempt ${attempt + 1})`;
              await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
              continue;
            }
            
            lastError = `HTTP ${response.status}`;
            break;
          } catch (fetchErr) {
            lastError = fetchErr instanceof Error ? fetchErr.message : "Fetch error";
          }
        }

        if (!response || !response.ok) {
          results.push({
            id,
            name,
            status: "failed",
            error: lastError,
          });
          continue;
        }

        const contentType = response.headers.get("content-type") || "image/jpeg";
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Determine extension from content type
        let ext = "jpg";
        if (contentType.includes("png")) ext = "png";
        else if (contentType.includes("webp")) ext = "webp";

        const safeName = sanitizeFilename(name);
        const filename = `${safeName}-${id}.${ext}`;

        console.log(`Uploading ${filename} (${uint8Array.length} bytes)`);

        const { error: uploadError } = await supabase.storage
          .from("registry-photos")
          .upload(filename, uint8Array, {
            contentType,
            upsert: true,
          });

        if (uploadError) {
          results.push({
            id,
            name,
            status: "failed",
            error: uploadError.message,
          });
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("registry-photos")
          .getPublicUrl(filename);

        results.push({
          id,
          name,
          status: "success",
          publicUrl: urlData.publicUrl,
        });

        // Small delay to avoid rate limiting
        await new Promise((r) => setTimeout(r, 200));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error(`Error importing ${name}:`, message);
        results.push({ id, name, status: "failed", error: message });
      }
    }

    const stats = {
      total: results.length,
      success: results.filter((r) => r.status === "success").length,
      skipped: results.filter((r) => r.status === "skipped").length,
      failed: results.filter((r) => r.status === "failed").length,
    };

    console.log(`Import complete:`, stats);

    return new Response(JSON.stringify({ success: true, results, stats }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in photo-import:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to import photos";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
