import { useState, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Loader2, ExternalLink, Upload, Check, Link, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RegistryEntry } from "@/types/registry";
import { clearPhotoIndexCache } from "@/hooks/useStoragePhoto";
interface WikimediaImage {
  title: string;
  pageid: number;
  url: string;
  thumbUrl: string;
  descriptionUrl: string;
}

interface WikimediaPhotoSearchProps {
  entry: RegistryEntry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPhotoUpdated?: () => void;
}

// Helper to upload blob to storage
async function uploadToStorage(entryId: string, blob: Blob, contentType: string) {
  let ext = "jpg";
  if (contentType.includes("png")) ext = "png";
  else if (contentType.includes("webp")) ext = "webp";
  else if (contentType.includes("gif")) ext = "gif";

  const filename = `photo-${entryId}.${ext}`;

  // Check for existing files and remove them
  const { data: existingFiles } = await supabase.storage
    .from("registry-photos")
    .list("", { search: entryId });

  if (existingFiles && existingFiles.length > 0) {
    const filesToDelete = existingFiles
      .filter(f => f.name.startsWith(entryId))
      .map(f => f.name);
    
    if (filesToDelete.length > 0) {
      await supabase.storage.from("registry-photos").remove(filesToDelete);
    }
  }

  // Upload new file
  const { error: uploadError } = await supabase.storage
    .from("registry-photos")
    .upload(filename, blob, {
      contentType,
      upsert: true,
    });

  if (uploadError) throw uploadError;
  
  return filename;
}

export function WikimediaPhotoSearch({ entry, open, onOpenChange, onPhotoUpdated }: WikimediaPhotoSearchProps) {
  const { toast } = useToast();
  const [query, setQuery] = useState(entry.name);
  const [images, setImages] = useState<WikimediaImage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isImporting, setIsImporting] = useState<number | null>(null);
  const [importedPageId, setImportedPageId] = useState<number | null>(null);
  
  // Direct URL upload state
  const [directUrl, setDirectUrl] = useState("");
  const [isDirectUploading, setIsDirectUploading] = useState(false);
  
  // File upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFileUploading, setIsFileUploading] = useState(false);
  
  // Track active tab for auto-search
  const [activeTab, setActiveTab] = useState("file");
  const hasAutoSearched = useRef(false);

  // Auto-search when Wikimedia tab is selected
  useEffect(() => {
    if (open && activeTab === "search" && !hasAutoSearched.current && images.length === 0 && !isSearching) {
      hasAutoSearched.current = true;
      // Small delay to let the UI settle
      const timer = setTimeout(() => {
        handleSearchInternal();
      }, 300);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentional: only trigger auto-search when tab becomes active, not on every state change
  }, [open, activeTab]);

  // Reset auto-search flag when dialog closes
  useEffect(() => {
    if (!open) {
      hasAutoSearched.current = false;
      setImages([]);
    }
  }, [open]);

  const handleSearchInternal = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setImages([]);

    try {
      const { data, error } = await supabase.functions.invoke("wikimedia-search", {
        body: { query: query.trim(), limit: 12 },
      });

      if (error) throw error;

      if (data.success && data.images) {
        setImages(data.images);
        if (data.images.length === 0) {
          toast({
            title: "No results",
            description: "No images found for this search. Try different keywords.",
          });
        }
      } else {
        throw new Error(data.error || "Search failed");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "Failed to search Wikimedia Commons",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setImages([]);

    try {
      const { data, error } = await supabase.functions.invoke("wikimedia-search", {
        body: { query: query.trim(), limit: 12 },
      });

      if (error) throw error;

      if (data.success && data.images) {
        setImages(data.images);
        if (data.images.length === 0) {
          toast({
            title: "No results",
            description: "No images found for this search. Try different keywords.",
          });
        }
      } else {
        throw new Error(data.error || "Search failed");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "Failed to search Wikimedia Commons",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  }, [query, toast]);

  // Direct browser fetch for Wikimedia (bypasses our proxy issues)
  const fetchImageDirectly = async (url: string): Promise<{ blob: Blob; contentType: string }> => {
    // Try direct fetch first (works for CORS-enabled sources like Wikimedia)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    const blob = await response.blob();
    const contentType = response.headers.get("content-type") || "image/jpeg";
    return { blob, contentType };
  };

  const handleImport = useCallback(async (image: WikimediaImage) => {
    setIsImporting(image.pageid);

    try {
      // Try direct browser fetch (Wikimedia has CORS enabled)
      const { blob, contentType } = await fetchImageDirectly(image.url);
      
      await uploadToStorage(entry.id, blob, contentType);

      clearPhotoIndexCache();
      setImportedPageId(image.pageid);

      toast({
        title: "Photo imported",
        description: `Successfully imported photo for ${entry.name}`,
      });

      onPhotoUpdated?.();
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to import photo. Try the Direct URL tab instead.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(null);
    }
  }, [entry, toast, onPhotoUpdated]);

  // Handle direct URL upload
  const handleDirectUrlUpload = useCallback(async () => {
    if (!directUrl.trim()) return;

    setIsDirectUploading(true);

    try {
      const { blob, contentType } = await fetchImageDirectly(directUrl.trim());
      
      await uploadToStorage(entry.id, blob, contentType);

      clearPhotoIndexCache();

      toast({
        title: "Photo uploaded",
        description: `Successfully uploaded photo for ${entry.name}`,
      });

      setDirectUrl("");
      onPhotoUpdated?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Direct upload error:", error);
      toast({
        title: "Upload failed",
        description: "Could not fetch the image. Make sure the URL is a direct image link (ending in .jpg, .png, etc.)",
        variant: "destructive",
      });
    } finally {
      setIsDirectUploading(false);
    }
  }, [directUrl, entry, toast, onPhotoUpdated, onOpenChange]);

  // Handle file upload from computer
  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    setIsFileUploading(true);

    try {
      await uploadToStorage(entry.id, file, file.type);

      clearPhotoIndexCache();

      toast({
        title: "Photo uploaded",
        description: `Successfully uploaded photo for ${entry.name}`,
      });

      onPhotoUpdated?.();
      onOpenChange(false);
    } catch (error) {
      console.error("File upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsFileUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [entry, toast, onPhotoUpdated, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Find Photo for {entry.name}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="file" className="gap-2">
              <FileImage className="h-4 w-4" />
              Upload File
            </TabsTrigger>
            <TabsTrigger value="direct" className="gap-2">
              <Link className="h-4 w-4" />
              Paste URL
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2">
              <Search className="h-4 w-4" />
              Wikimedia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="flex-1 flex flex-col gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <div 
              className="flex-1 min-h-[200px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-4 p-8 cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {isFileUploading ? (
                <>
                  <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />
                  <p className="text-muted-foreground">Uploading...</p>
                </>
              ) : (
                <>
                  <FileImage className="h-12 w-12 text-muted-foreground" />
                  <div className="text-center">
                    <p className="font-medium">Click to select a photo</p>
                    <p className="text-sm text-muted-foreground">JPG, PNG, WebP, or GIF</p>
                  </div>
                  <Button variant="secondary" type="button">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="direct" className="flex-1 flex flex-col gap-4">
            <div className="bg-muted/50 p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">Paste Image URL</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Find the photo on Wikimedia Commons, right-click the image, copy the image URL, and paste it here.
              </p>
              <div className="flex gap-2">
                <Input
                  value={directUrl}
                  onChange={(e) => setDirectUrl(e.target.value)}
                  placeholder="https://upload.wikimedia.org/wikipedia/commons/..."
                  onKeyDown={(e) => e.key === "Enter" && handleDirectUrlUpload()}
                  className="flex-1"
                />
                <Button onClick={handleDirectUrlUpload} disabled={isDirectUploading || !directUrl.trim()}>
                  {isDirectUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  <span className="ml-2">Upload</span>
                </Button>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg border border-dashed">
              <h4 className="font-medium text-sm mb-2">How to get the image URL:</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Go to Wikimedia Commons and find the person's photo</li>
                <li>Click on the image to open the full-size version</li>
                <li>Right-click the image and select "Copy image address"</li>
                <li>Paste the URL above and click Upload</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="search" className="flex-1 flex flex-col overflow-hidden">
            <div className="flex gap-2 mb-4">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Wikimedia Commons..."
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="ml-2">Search</span>
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div
                      key={image.pageid}
                      className="group relative rounded-lg overflow-hidden border bg-muted/50"
                    >
                      <div className="aspect-square">
                        <img
                          src={image.thumbUrl}
                          alt={image.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                        <p className="text-white text-xs text-center line-clamp-2 mb-2">
                          {image.title}
                        </p>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleImport(image)}
                            disabled={isImporting !== null}
                          >
                            {isImporting === image.pageid ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : importedPageId === image.pageid ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Upload className="h-3 w-3" />
                            )}
                            <span className="ml-1">
                              {importedPageId === image.pageid ? "Done" : "Use"}
                            </span>
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <a
                              href={image.descriptionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 text-muted-foreground">
                  {isSearching ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Searching Wikimedia Commons...</span>
                    </div>
                  ) : (
                    <p>Search for photos on Wikimedia Commons</p>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <p className="text-xs text-muted-foreground mt-4">
          Images from Wikimedia Commons are typically available under Creative Commons or public domain licenses.
        </p>
      </DialogContent>
    </Dialog>
  );
}
