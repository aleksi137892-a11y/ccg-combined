import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { 
  getCorsHeaders, 
  handleCorsPreflightRequest,
  errorResponse,
  successResponse,
} from "../_shared/index.ts";

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
  const origin = req.headers.get('origin');

  if (req.method === "OPTIONS") {
    return handleCorsPreflightRequest(origin);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { entries } = (await req.json()) as { entries: ImportEntry[] };

    if (!entries || !Array.isArray(entries)) {
      return errorResponse("Entries array is required", 400, origin);
    }

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

      if (
        !photo ||
        photo.includes("placeholder") ||
        photo.startsWith("/") ||
        photo.startsWith("data:")
      ) {
        results.push({ id, name, status: "skipped", error: "No valid URL" });
        continue;
      }

      if (existingIds.has(id)) {
        results.push({ id, name, status: "skipped", error: "Already exists" });
        continue;
      }

      try {
        let response: Response | null = null;
        let lastError = "";
        
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
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

        let ext = "jpg";
        if (contentType.includes("png")) ext = "png";
        else if (contentType.includes("webp")) ext = "webp";

        const safeName = sanitizeFilename(name);
        const filename = `${safeName}-${id}.${ext}`;

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

        await new Promise((r) => setTimeout(r, 200));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        results.push({ id, name, status: "failed", error: message });
      }
    }

    const stats = {
      total: results.length,
      success: results.filter((r) => r.status === "success").length,
      skipped: results.filter((r) => r.status === "skipped").length,
      failed: results.filter((r) => r.status === "failed").length,
    };

    return successResponse({ results, stats }, origin);
  } catch (_error) {
    return errorResponse("Failed to import photos", 500, origin);
  }
});
