import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RegistryEntry } from "@/types/registry";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, StopCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { clearPhotoIndexCache } from "@/hooks/useStoragePhoto";

interface QuickPhotoMigrationProps {
  entries: RegistryEntry[];
  onComplete: () => void;
  onClose: () => void;
}

interface MigrationProgress {
  current: number;
  total: number;
  currentName: string;
  success: number;
  skipped: number;
  failed: number;
  failures: Array<{ id: string; name: string; error: string }>;
}

const isValidPhotoUrl = (photo: string) => {
  return photo && 
    !photo.includes("placeholder") && 
    (photo.startsWith("http://") || photo.startsWith("https://"));
};

export const QuickPhotoMigration = ({ entries, onComplete, onClose }: QuickPhotoMigrationProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState<MigrationProgress | null>(null);
  const [shouldStop, setShouldStop] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const runMigration = useCallback(async () => {
    setIsRunning(true);
    setShouldStop(false);
    setIsFinished(false);
    
    const entriesToImport = entries.filter(e => isValidPhotoUrl(e.photo));
    
    if (entriesToImport.length === 0) {
      toast.error("No entries with valid photo URLs to import");
      setIsRunning(false);
      return;
    }

    const initialProgress: MigrationProgress = {
      current: 0,
      total: entriesToImport.length,
      currentName: "",
      success: 0,
      skipped: 0,
      failed: 0,
      failures: [],
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
    const stopRequested = false;

    for (let i = 0; i < entriesToImport.length; i++) {
      if (stopRequested || shouldStop) break;
      
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

        // Try direct fetch first
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
        existingIds.add(entry.id);

      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        setProgress(p => p ? { 
          ...p, 
          failed: p.failed + 1,
          failures: [...p.failures, { id: entry.id, name: entry.name, error: errMsg }]
        } : p);
      }

      // Small delay to avoid rate limiting
      if (i < entriesToImport.length - 1) {
        await new Promise(r => setTimeout(r, 150));
      }
    }

    clearPhotoIndexCache();
    setIsRunning(false);
    setIsFinished(true);
    onComplete();
  }, [entries, shouldStop, onComplete]);

  const handleStop = () => {
    setShouldStop(true);
  };

  const progressPercent = progress ? (progress.current / progress.total) * 100 : 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">Re-run Photo Migration</h2>
        <p className="text-sm text-muted-foreground">
          Imports photos from source URLs for all entries and uploads them to storage. 
          Entries with existing photos in storage will be skipped.
        </p>
      </div>

      {!isRunning && !progress && (
        <Button onClick={runMigration} className="w-full gap-2">
          <RefreshCw className="h-4 w-4" />
          Start Migration
        </Button>
      )}

      {isRunning && progress && (
        <div className="space-y-4">
          <Progress value={progressPercent} className="h-3" />
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground truncate max-w-[250px] flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              {progress.currentName}
            </span>
            <span className="text-muted-foreground font-mono">
              {progress.current} / {progress.total}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-500 flex items-center gap-1">
              <CheckCircle className="h-4 w-4" /> {progress.success} imported
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" /> {progress.skipped} skipped
            </span>
            <span className="text-destructive flex items-center gap-1">
              <XCircle className="h-4 w-4" /> {progress.failed} failed
            </span>
          </div>

          <Button 
            onClick={handleStop} 
            variant="outline" 
            className="w-full gap-2"
          >
            <StopCircle className="h-4 w-4" />
            Stop Migration
          </Button>
        </div>
      )}

      {isFinished && progress && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold mb-3">Migration Complete</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-500 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" /> {progress.success} imported
              </span>
              <span className="text-muted-foreground flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" /> {progress.skipped} skipped
              </span>
              <span className="text-destructive flex items-center gap-1">
                <XCircle className="h-4 w-4" /> {progress.failed} failed
              </span>
            </div>
          </div>

          {progress.failures.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-destructive">
                Failed Entries ({progress.failures.length})
              </h4>
              <ScrollArea className="h-48 rounded-lg border border-border">
                <div className="p-3 space-y-2">
                  {progress.failures.map((f, i) => (
                    <div 
                      key={`${f.id}-${i}`}
                      className="text-xs p-2 bg-destructive/10 rounded border border-destructive/20"
                    >
                      <div className="font-medium text-foreground">{f.name}</div>
                      <div className="text-muted-foreground truncate">{f.error}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          <div className="flex gap-3">
            <Button 
              onClick={runMigration} 
              variant="secondary" 
              className="flex-1 gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Run Again
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
