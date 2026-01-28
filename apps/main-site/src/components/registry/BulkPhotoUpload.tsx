import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RegistryEntry } from "@/types/registry";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Check, AlertCircle, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { clearPhotoIndexCache } from "@/hooks/useStoragePhoto";
import { BrowserPhotoImport } from "./BrowserPhotoImport";

interface BulkPhotoUploadProps {
  entries: RegistryEntry[];
  onClose: () => void;
  onImportComplete?: () => void;
}

interface UploadResult {
  file: File;
  status: "pending" | "uploading" | "success" | "error" | "matched";
  matchedEntry?: RegistryEntry;
  publicUrl?: string;
  error?: string;
}

const normalizeForMatching = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[_\-.]/g, " ")
    .replace(/\.(jpg|jpeg|png|gif|webp)$/i, "")
    .trim();
};

const findBestMatch = (filename: string, entries: RegistryEntry[]): RegistryEntry | undefined => {
  const normalizedFilename = normalizeForMatching(filename);
  
  // Try exact match first
  const exactMatch = entries.find(entry => {
    const normalizedName = normalizeForMatching(entry.name);
    return normalizedFilename === normalizedName;
  });
  if (exactMatch) return exactMatch;

  // Try contains match
  const containsMatch = entries.find(entry => {
    const normalizedName = normalizeForMatching(entry.name);
    const nameParts = normalizedName.split(" ");
    return nameParts.every(part => normalizedFilename.includes(part));
  });
  if (containsMatch) return containsMatch;

  // Try partial match (first + last name)
  const partialMatch = entries.find(entry => {
    const nameParts = entry.name.toLowerCase().split(" ");
    if (nameParts.length >= 2) {
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];
      return normalizedFilename.includes(firstName) && normalizedFilename.includes(lastName);
    }
    return false;
  });
  
  return partialMatch;
};

export const BulkPhotoUpload = ({ entries, onClose, onImportComplete }: BulkPhotoUploadProps) => {
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith("image/")
    );

    const results: UploadResult[] = imageFiles.map(file => {
      const matchedEntry = findBestMatch(file.name, entries);
      return {
        file,
        status: matchedEntry ? "matched" : "pending",
        matchedEntry,
      };
    });

    setUploadResults(prev => [...prev, ...results]);
  }, [entries]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (index: number) => {
    setUploadResults(prev => prev.filter((_, i) => i !== index));
  };

  const uploadAll = async () => {
    setIsUploading(true);
    const matched = uploadResults.filter(r => r.status === "matched");
    
    for (let i = 0; i < matched.length; i++) {
      const result = matched[i];
      const index = uploadResults.findIndex(r => r.file === result.file);
      
      setUploadResults(prev => prev.map((r, idx) => 
        idx === index ? { ...r, status: "uploading" } : r
      ));

      try {
        const ext = result.file.name.split(".").pop();
        const safeName = result.matchedEntry!.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
        const filename = `${safeName}-${result.matchedEntry!.id}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("registry-photos")
          .upload(filename, result.file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("registry-photos")
          .getPublicUrl(filename);

        setUploadResults(prev => prev.map((r, idx) => 
          idx === index ? { ...r, status: "success", publicUrl } : r
        ));
      } catch (error) {
        setUploadResults(prev => prev.map((r, idx) => 
          idx === index ? { ...r, status: "error", error: String(error) } : r
        ));
      }
    }

    setIsUploading(false);
    clearPhotoIndexCache();
    onImportComplete?.();
    const successCount = uploadResults.filter(r => r.status === "success").length;
    if (successCount > 0) {
      toast.success(`Uploaded ${successCount} photos successfully`);
    }
  };

  const handleBrowserImportComplete = () => {
    clearPhotoIndexCache();
    onImportComplete?.();
  };

  const matchedCount = uploadResults.filter(r => r.status === "matched" || r.status === "success").length;
  const unmatchedCount = uploadResults.filter(r => r.status === "pending").length;
  const successCount = uploadResults.filter(r => r.status === "success").length;

  return (
    <Card className="border-primary/20 bg-card/95 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Bulk Photo Upload
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Browser-based import (recommended) */}
        <BrowserPhotoImport 
          entries={entries} 
          onComplete={handleBrowserImportComplete}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or upload manually</span>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}
          `}
          onClick={() => document.getElementById("bulk-upload-input")?.click()}
        >
          <input
            id="bulk-upload-input"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <ImageIcon className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag & drop photos here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Name files like "firstname-lastname.jpg" for auto-matching
          </p>
        </div>

        {/* Results Summary */}
        {uploadResults.length > 0 && (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              {uploadResults.length} files
            </span>
            {matchedCount > 0 && (
              <span className="text-green-500 flex items-center gap-1">
                <Check className="h-3 w-3" /> {matchedCount} matched
              </span>
            )}
            {unmatchedCount > 0 && (
              <span className="text-yellow-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> {unmatchedCount} unmatched
              </span>
            )}
            {successCount > 0 && (
              <span className="text-primary flex items-center gap-1">
                <Upload className="h-3 w-3" /> {successCount} uploaded
              </span>
            )}
          </div>
        )}

        {/* File List */}
        {uploadResults.length > 0 && (
          <div className="max-h-64 overflow-y-auto space-y-2">
            {uploadResults.map((result, index) => (
              <div
                key={`${result.file.name}-${index}`}
                className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 text-sm"
              >
                <div className="h-10 w-10 rounded overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={URL.createObjectURL(result.file)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{result.file.name}</p>
                  {result.matchedEntry ? (
                    <p className="text-xs text-green-500">
                      → {result.matchedEntry.name}
                    </p>
                  ) : (
                    <p className="text-xs text-yellow-500">No match found</p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {result.status === "uploading" && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  )}
                  {result.status === "success" && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  {result.status === "error" && (
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  )}
                  {(result.status === "pending" || result.status === "matched") && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {matchedCount > 0 && (
          <div className="flex gap-2">
            <Button
              onClick={uploadAll}
              disabled={isUploading || matchedCount === 0}
              className="flex-1"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload {matchedCount} Matched Photos
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setUploadResults([])}
              disabled={isUploading}
            >
              Clear All
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};