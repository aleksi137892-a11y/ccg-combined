import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RegistryEntry } from "@/types/registry";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Globe, Loader2, CheckCircle, XCircle, AlertTriangle, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { clearPhotoIndexCache } from "@/hooks/useStoragePhoto";

interface BrowserPhotoImportProps {
  entries: RegistryEntry[];
  onComplete: () => void;
}

interface ImportProgress {
  current: number;
  total: number;
  currentName: string;
  success: number;
  skipped: number;
  failed: number;
  errors: Array<{ name: string; error: string }>;
}

const isValidPhotoUrl = (photo: string) => {
  return photo && 
    !photo.includes("placeholder") && 
    (photo.startsWith("http://") || photo.startsWith("https://"));
};

export const BrowserPhotoImport = ({ entries, onComplete }: BrowserPhotoImportProps) => {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState<ImportProgress | null>(null);
  const [shouldStop, setShouldStop] = useState(false);

  const importPhotos = useCallback(async () => {
    setIsImporting(true);
    setShouldStop(false);
    
    const entriesToImport = entries.filter(e => isValidPhotoUrl(e.photo));
    
    if (entriesToImport.length === 0) {
      toast.error("No entries with valid photo URLs to import");
      setIsImporting(false);
      return;
    }

    const initialProgress: ImportProgress = {
      current: 0,
      total: entriesToImport.length,
      currentName: "",
      success: 0,
      skipped: 0,
      failed: 0,
      errors: [],
    };
    setProgress(initialProgress);

    // Check what already exists in storage
    const { data: existingFiles } = await supabase.storage
      .from("registry-photos")
      .list("", { limit: 1000 });
    
    const existingIds = new Set<string>();
    const idRegex = /-(\d+)\.(jpg|jpeg|png|webp)$/i;
    for (const file of existingFiles ?? []) {
      const match = file.name.match(idRegex);
      if (match) existingIds.add(match[1]);
    }

    const proxyBase = import.meta.env.VITE_SUPABASE_URL;

    for (let i = 0; i < entriesToImport.length; i++) {
      if (shouldStop) break;
      
      const entry = entriesToImport[i];
      
      setProgress(p => p ? { 
        ...p, 
        current: i + 1, 
        currentName: entry.name 
      } : p);

      // Skip if already exists
      if (existingIds.has(entry.id)) {
        setProgress(p => p ? { ...p, skipped: p.skipped + 1 } : p);
        continue;
      }

      try {
        let blob: Blob | null = null;
        let contentType = "image/jpeg";

        // Try direct fetch first (may fail due to CORS)
        try {
          const directRes = await fetch(entry.photo, { 
            mode: "cors",
            headers: { "Accept": "image/*" }
          });
          if (directRes.ok) {
            blob = await directRes.blob();
            contentType = directRes.headers.get("Content-Type") || "image/jpeg";
          }
        } catch {
          // CORS error, try proxy
        }

        // Fallback to proxy
        if (!blob && proxyBase) {
          const proxyUrl = `${proxyBase}/functions/v1/image-proxy?url=${encodeURIComponent(entry.photo)}`;
          const proxyRes = await fetch(proxyUrl);
          if (proxyRes.ok) {
            blob = await proxyRes.blob();
            contentType = proxyRes.headers.get("Content-Type") || "image/jpeg";
          } else {
            throw new Error(`Proxy returned ${proxyRes.status}`);
          }
        }

        if (!blob) {
          throw new Error("Could not fetch image");
        }

        // Determine extension
        let ext = "jpg";
        if (contentType.includes("png")) ext = "png";
        else if (contentType.includes("webp")) ext = "webp";
        else if (contentType.includes("jpeg") || contentType.includes("jpg")) ext = "jpg";

        // Create filename
        const safeName = entry.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        const filename = `${safeName}-${entry.id}.${ext}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from("registry-photos")
          .upload(filename, blob, { 
            upsert: true,
            contentType 
          });

        if (uploadError) throw uploadError;

        setProgress(p => p ? { ...p, success: p.success + 1 } : p);
        existingIds.add(entry.id); // Mark as done

      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        setProgress(p => p ? { 
          ...p, 
          failed: p.failed + 1,
          errors: [...p.errors.slice(-9), { name: entry.name, error: errMsg }]
        } : p);
      }

      // Small delay to avoid rate limiting (200ms between requests)
      if (i < entriesToImport.length - 1) {
        await new Promise(r => setTimeout(r, 200));
      }
    }

    clearPhotoIndexCache();
    setIsImporting(false);
    
    const finalProgress = progress;
    if (finalProgress && finalProgress.success > 0) {
      toast.success(`Imported ${finalProgress.success} photos to storage`);
    }
    onComplete();
  }, [entries, shouldStop, onComplete, progress]);

  const handleStop = () => {
    setShouldStop(true);
  };

  const progressPercent = progress ? (progress.current / progress.total) * 100 : 0;

  return (
    <div className="p-4 rounded-lg bg-muted/30 border border-border">
      <h3 className="font-medium mb-2 flex items-center gap-2">
        <Globe className="h-4 w-4" />
        Import Photos via Browser
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        Fetches photos from URLs in your browser (bypasses server-side rate limits) and uploads to storage.
      </p>

      {!isImporting && !progress && (
        <Button onClick={importPhotos} variant="default" className="w-full">
          <Globe className="h-4 w-4 mr-2" />
          Start Browser Import
        </Button>
      )}

      {isImporting && progress && (
        <div className="space-y-3">
          <Progress value={progressPercent} className="h-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground truncate max-w-[200px]">
              {progress.currentName}
            </span>
            <span className="text-muted-foreground">
              {progress.current} / {progress.total}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-green-500 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> {progress.success}
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> {progress.skipped}
            </span>
            <span className="text-destructive flex items-center gap-1">
              <XCircle className="h-3 w-3" /> {progress.failed}
            </span>
          </div>
          <Button 
            onClick={handleStop} 
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <StopCircle className="h-4 w-4 mr-2" />
            Stop Import
          </Button>
        </div>
      )}

      {!isImporting && progress && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-green-500 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> {progress.success} imported
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> {progress.skipped} skipped
            </span>
            {progress.failed > 0 && (
              <span className="text-destructive flex items-center gap-1">
                <XCircle className="h-3 w-3" /> {progress.failed} failed
              </span>
            )}
          </div>
          {progress.errors.length > 0 && (
            <div className="text-xs text-muted-foreground max-h-20 overflow-y-auto space-y-1">
              {progress.errors.slice(-5).map((e, i) => (
                <div key={i} className="truncate">
                  {e.name}: {e.error}
                </div>
              ))}
            </div>
          )}
          <Button onClick={importPhotos} variant="secondary" className="w-full">
            <Globe className="h-4 w-4 mr-2" />
            Run Again
          </Button>
        </div>
      )}
    </div>
  );
};