import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, RefreshCw, AlertTriangle, CheckCircle, XCircle, Loader2, Trash2, Edit3 } from "lucide-react";
import { getDisplayPhotoSrc } from "@/lib/imageProxy";

interface BrokenPhotoFixerProps {
  entries: Array<{
    id: string;
    name: string;
    photo: string;
  }>;
  onClose: () => void;
  onClearPhoto: (id: string) => void;
  onReplacePhoto: (id: string, newUrl: string) => void;
}

type Status = "pending" | "loading" | "ok" | "broken" | "blocked";

interface PhotoStatus {
  id: string;
  name: string;
  photo: string;
  status: Status;
  error?: string;
  httpStatus?: number;
}

const isPlaceholder = (photo: string) => {
  return !photo || photo === "/placeholder.svg" || photo.includes("placeholder");
};

export const BrokenPhotoFixer = ({ entries, onClose, onClearPhoto, onReplacePhoto }: BrokenPhotoFixerProps) => {
  const [results, setResults] = useState<PhotoStatus[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [clearedIds, setClearedIds] = useState<Set<string>>(new Set());
  const [replacedIds, setReplacedIds] = useState<Set<string>>(new Set());

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
        return { ...entry, status: "blocked", error: `Blocked`, httpStatus: 403 };
      } else if (response.status === 404) {
        return { ...entry, status: "broken", error: `Not Found`, httpStatus: 404 };
      } else {
        return { ...entry, status: "broken", error: `HTTP ${response.status}`, httpStatus: response.status };
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
    setClearedIds(new Set());
    setReplacedIds(new Set());

    const withPhotos = entries.filter((e) => !isPlaceholder(e.photo));
    const initial: PhotoStatus[] = withPhotos.map((e) => ({ ...e, status: "loading" as Status }));
    setResults(initial);

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

  const handleClear = (id: string) => {
    onClearPhoto(id);
    setClearedIds((prev) => new Set([...prev, id]));
    setResults((prev) => prev.filter((r) => r.id !== id));
  };

  const handleBulkClear = () => {
    const brokenEntries = results.filter((r) => r.status === "broken" || r.status === "blocked");
    brokenEntries.forEach((entry) => {
      onClearPhoto(entry.id);
      setClearedIds((prev) => new Set([...prev, entry.id]));
    });
    setResults((prev) => prev.filter((r) => r.status === "ok" || r.status === "loading"));
  };

  const startEdit = (entry: PhotoStatus) => {
    setEditingId(entry.id);
    setEditUrl(entry.photo);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditUrl("");
  };

  const saveEdit = (id: string) => {
    if (editUrl.trim()) {
      onReplacePhoto(id, editUrl.trim());
      setReplacedIds((prev) => new Set([...prev, id]));
      setResults((prev) => prev.filter((r) => r.id !== id));
    }
    setEditingId(null);
    setEditUrl("");
  };

  const stats = {
    total: results.length,
    ok: results.filter((r) => r.status === "ok").length,
    broken: results.filter((r) => r.status === "broken").length,
    blocked: results.filter((r) => r.status === "blocked").length,
    loading: results.filter((r) => r.status === "loading").length,
  };

  const problemEntries = results.filter((r) => r.status === "broken" || r.status === "blocked");
  const actionsCount = clearedIds.size + replacedIds.size;

  return (
    <div className="flex w-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-xl font-bold text-foreground uppercase tracking-wide" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            Fix Broken Photos
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Scan for 404/403 URLs and clear or replace them
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {!scanComplete && !isScanning && (
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-muted-foreground/70 mx-auto mb-6" />
            <p className="text-muted-foreground mb-6">
              This will check {entries.filter((e) => !isPlaceholder(e.photo)).length} entries for broken photo URLs.
              <br />
              <span className="text-muted-foreground/80 text-sm">You can then clear or replace broken URLs individually or in bulk.</span>
            </p>
            <Button onClick={runScan} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Start Scan
            </Button>
          </div>
        )}

        {(isScanning || scanComplete) && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-muted border border-border p-4 text-center">
                <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Scanned</div>
              </div>
              <div className="bg-muted border border-border p-4 text-center">
                <div className="text-2xl font-bold text-primary">{stats.ok}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">OK</div>
              </div>
              <div className="bg-muted border border-border p-4 text-center">
                <div className="text-2xl font-bold text-destructive">{stats.broken}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">404 Broken</div>
              </div>
              <div className="bg-muted border border-border p-4 text-center">
                <div className="text-2xl font-bold text-accent-foreground">{stats.blocked}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">403 Blocked</div>
              </div>
            </div>

            {isScanning && (
              <div className="flex items-center justify-center gap-3 py-8 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Scanning {stats.loading} remaining...</span>
              </div>
            )}

            {/* Bulk Actions */}
            {scanComplete && problemEntries.length > 0 && (
              <div className="flex items-center gap-3 mb-6 p-4 bg-muted border border-border">
                <span className="text-muted-foreground text-sm flex-1">
                  {problemEntries.length} broken URL{problemEntries.length !== 1 ? "s" : ""} found
                </span>
                <Button variant="destructive" size="sm" onClick={handleBulkClear} className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Clear All Broken
                </Button>
              </div>
            )}

            {/* Problem list */}
            {problemEntries.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                  Issues ({problemEntries.length})
                </h3>
                {problemEntries.map((entry) => (
                  <div key={entry.id} className="bg-muted border border-border">
                    <div className="flex items-center gap-4 p-4">
                      {entry.status === "broken" ? (
                        <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-accent-foreground flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-foreground font-semibold truncate">{entry.name}</div>
                        <div className="text-muted-foreground text-xs truncate">{entry.photo}</div>
                        <div className="text-destructive text-xs mt-1">{entry.error}</div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button variant="outline" size="sm" onClick={() => startEdit(entry)} className="gap-1">
                          <Edit3 className="w-3 h-3" />
                          Replace
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleClear(entry.id)} className="gap-1">
                          <Trash2 className="w-3 h-3" />
                          Clear
                        </Button>
                      </div>
                    </div>

                    {/* Edit Mode */}
                    {editingId === entry.id && (
                      <div className="border-t border-border p-4">
                        <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">New Photo URL</label>
                        <div className="flex gap-2">
                          <Input value={editUrl} onChange={(e) => setEditUrl(e.target.value)} placeholder="https://..." className="flex-1" />
                          <Button size="sm" onClick={() => saveEdit(entry.id)} className="gap-2">
                            Save
                          </Button>
                          <Button variant="ghost" size="sm" onClick={cancelEdit}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {scanComplete && problemEntries.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-primary font-semibold">All photos are accessible!</p>
                {actionsCount > 0 && (
                  <p className="text-muted-foreground text-sm mt-2">
                    {actionsCount} photo URL{actionsCount !== 1 ? "s" : ""} fixed this session
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      {scanComplete && (
        <div className="p-4 border-t border-border flex justify-between items-center">
          <p className="text-muted-foreground text-sm">
            {actionsCount > 0 ? (
              <>
                {clearedIds.size > 0 && <span className="text-destructive">{clearedIds.size} cleared</span>}
                {clearedIds.size > 0 && replacedIds.size > 0 && " · "}
                {replacedIds.size > 0 && <span className="text-primary">{replacedIds.size} replaced</span>}
                <span className="text-muted-foreground/70 ml-2">(in-memory only)</span>
              </>
            ) : (
              "Cleared/replaced URLs will use initials avatar fallback"
            )}
          </p>
          <Button onClick={runScan} variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Re-scan
          </Button>
        </div>
      )}
    </div>
  );
};
