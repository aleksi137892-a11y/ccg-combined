import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, RefreshCw, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { getDisplayPhotoSrc } from "@/lib/imageProxy";

interface PhotoHealthCheckProps {
  entries: Array<{
    id: string;
    name: string;
    photo: string;
  }>;
  onClose: () => void;
  onFixPhoto?: (id: string, newUrl: string) => void;
}

type Status = "pending" | "loading" | "ok" | "broken" | "blocked";

interface PhotoStatus {
  id: string;
  name: string;
  photo: string;
  status: Status;
  error?: string;
}

const isPlaceholder = (photo: string) => {
  return !photo || photo === "/placeholder.svg" || photo.includes("placeholder");
};

export const PhotoHealthCheck = ({ entries, onClose }: PhotoHealthCheckProps) => {
  const [results, setResults] = useState<PhotoStatus[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const checkPhoto = useCallback(async (entry: { id: string; name: string; photo: string }): Promise<PhotoStatus> => {
    if (isPlaceholder(entry.photo)) {
      return { ...entry, status: "pending", error: "No photo assigned" };
    }

    const proxiedUrl = getDisplayPhotoSrc(entry.photo);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(proxiedUrl, {
        method: "HEAD",
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.ok) {
        return { ...entry, status: "ok" };
      } else if (response.status === 403) {
        return { ...entry, status: "blocked", error: `Blocked (${response.status})` };
      } else {
        return { ...entry, status: "broken", error: `HTTP ${response.status}` };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      if (message.includes("abort")) {
        return { ...entry, status: "broken", error: "Timeout" };
      }
      return { ...entry, status: "broken", error: message };
    }
  }, []);

  const runScan = useCallback(async () => {
    setIsScanning(true);
    setScanComplete(false);

    const withPhotos = entries.filter((e) => !isPlaceholder(e.photo));
    const initial: PhotoStatus[] = withPhotos.map((e) => ({ ...e, status: "loading" as Status }));
    setResults(initial);

    // Process in batches of 5
    const batchSize = 5;
    for (let i = 0; i < withPhotos.length; i += batchSize) {
      const batch = withPhotos.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(checkPhoto));

      setResults((prev) => {
        const updated = [...prev];
        batchResults.forEach((result) => {
          const idx = updated.findIndex((r) => r.id === result.id);
          if (idx !== -1) updated[idx] = result;
        });
        return updated;
      });
    }

    setIsScanning(false);
    setScanComplete(true);
  }, [entries, checkPhoto]);

  const stats = {
    total: results.length,
    ok: results.filter((r) => r.status === "ok").length,
    broken: results.filter((r) => r.status === "broken").length,
    blocked: results.filter((r) => r.status === "blocked").length,
    loading: results.filter((r) => r.status === "loading").length,
  };

  const problemEntries = results.filter((r) => r.status === "broken" || r.status === "blocked");

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="bg-neutral-950 border-2 border-neutral-800 max-w-3xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-wide" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
              Photo Health Check
            </h2>
            <p className="text-neutral-500 text-sm mt-1">Scan registry photos for broken or blocked URLs</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {!scanComplete && !isScanning && (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-neutral-600 mx-auto mb-6" />
              <p className="text-neutral-400 mb-6">
                This will check all {entries.filter((e) => !isPlaceholder(e.photo)).length} entries with external photo URLs.
              </p>
              <Button onClick={runScan} className="bg-neutral-800 hover:bg-neutral-700 text-white gap-2">
                <RefreshCw className="w-4 h-4" />
                Start Scan
              </Button>
            </div>
          )}

          {(isScanning || scanComplete) && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-neutral-900 border border-neutral-800 p-4 text-center">
                  <div className="text-2xl font-bold text-white">{stats.total}</div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">Total</div>
                </div>
                <div className="bg-neutral-900 border border-green-900/50 p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">{stats.ok}</div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">OK</div>
                </div>
                <div className="bg-neutral-900 border border-red-900/50 p-4 text-center">
                  <div className="text-2xl font-bold text-red-500">{stats.broken}</div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">Broken</div>
                </div>
                <div className="bg-neutral-900 border border-orange-900/50 p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">{stats.blocked}</div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-500">Blocked</div>
                </div>
              </div>

              {isScanning && (
                <div className="flex items-center justify-center gap-3 py-8 text-neutral-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Scanning {stats.loading} remaining...</span>
                </div>
              )}

              {/* Problem list */}
              {problemEntries.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">
                    Issues Found ({problemEntries.length})
                  </h3>
                  {problemEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 p-4">
                      {entry.status === "broken" ? (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold truncate">{entry.name}</div>
                        <div className="text-neutral-500 text-xs truncate">{entry.photo}</div>
                        <div className="text-red-400 text-xs mt-1">{entry.error}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {scanComplete && problemEntries.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-green-400 font-semibold">All photos are loading correctly!</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {scanComplete && (
          <div className="p-4 border-t border-neutral-800 flex justify-between items-center">
            <p className="text-neutral-500 text-sm">
              {problemEntries.length > 0
                ? "Broken URLs will fall back to initials avatar automatically."
                : "All external photos verified."}
            </p>
            <Button onClick={runScan} variant="outline" size="sm" className="gap-2 border-neutral-700 text-neutral-300">
              <RefreshCw className="w-4 h-4" />
              Re-scan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
