import { useState, useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Loader2, Upload, Check, X, ChevronLeft, ChevronRight, 
  SkipForward, AlertCircle, CheckCircle2, RefreshCw, ZoomIn, Globe, ImageIcon, ExternalLink
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { RegistryEntry } from "@/types/registry";
import { clearPhotoIndexCache, getStoragePhotoUrl } from "@/hooks/useStoragePhoto";

interface WikimediaImage {
  title: string;
  pageid: number;
  url: string;
  thumbUrl: string;
  descriptionUrl: string;
}

interface WebImage {
  url: string;
  thumbUrl: string;
  sourceUrl: string;
  title: string;
  description?: string;
  sourceDomain?: string;
}

type ImageResult = WikimediaImage | WebImage;
type SearchSource = "wikimedia" | "web";

interface BatchPhotoImportProps {
  entries: RegistryEntry[];
  onClose: () => void;
  onComplete?: () => void;
}

async function uploadToStorage(entryId: string, blob: Blob, contentType: string) {
  let ext = "jpg";
  if (contentType.includes("png")) ext = "png";
  else if (contentType.includes("webp")) ext = "webp";
  else if (contentType.includes("gif")) ext = "gif";

  const filename = `photo-${entryId}.${ext}`;

  const { data: existingFiles } = await supabase.storage
    .from("registry-photos")
    .list("", { search: entryId });

  if (existingFiles && existingFiles.length > 0) {
    const filesToDelete = existingFiles
      .filter(f => f.name.includes(`-${entryId}.`))
      .map(f => f.name);
    
    if (filesToDelete.length > 0) {
      await supabase.storage.from("registry-photos").remove(filesToDelete);
    }
  }

  const { error: uploadError } = await supabase.storage
    .from("registry-photos")
    .upload(filename, blob, { contentType, upsert: true });

  if (uploadError) throw uploadError;
  return filename;
}

function isWebImage(image: ImageResult): image is WebImage {
  return 'sourceUrl' in image;
}

function getImageId(image: ImageResult): string | number {
  return isWebImage(image) ? image.url : image.pageid;
}

export function BatchPhotoImport({ entries, onClose, onComplete }: BatchPhotoImportProps) {
  const { toast } = useToast();
  
  // Filter to entries that need photos (no storage photo yet)
  const [pendingEntries, setPendingEntries] = useState<RegistryEntry[]>([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<ImageResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isImporting, setIsImporting] = useState<string | number | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  
  // New state for enhancements
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredImage, setHoveredImage] = useState<ImageResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchSource, setSearchSource] = useState<SearchSource>("wikimedia");
  
  const hasSearchedRef = useRef<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Load entries that need photos
  useEffect(() => {
    async function checkEntries() {
      setIsLoadingEntries(true);
      const needPhotos: RegistryEntry[] = [];
      
      for (const entry of entries) {
        const storageUrl = await getStoragePhotoUrl(entry.id);
        if (!storageUrl) {
          needPhotos.push(entry);
        }
      }
      
      setPendingEntries(needPhotos);
      setIsLoadingEntries(false);
    }
    
    checkEntries();
  }, [entries]);

  const currentEntry = pendingEntries[currentIndex];
  const progress = pendingEntries.length > 0 
    ? ((completed.size + skipped.size) / pendingEntries.length) * 100 
    : 0;

  // Update search query when entry changes
  useEffect(() => {
    if (currentEntry) {
      setSearchQuery(currentEntry.name);
    }
  }, [currentEntry]);

  // Search function for Wikimedia
  const performWikimediaSearch = useCallback(async (query: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("wikimedia-search", {
        body: { query, limit: 8 },
      });

      if (error) throw error;

      if (data.success && data.images) {
        return data.images as WikimediaImage[];
      }
      return [];
    } catch (error) {
      console.error("Wikimedia search error:", error);
      return [];
    }
  }, []);

  // Search function for Web (Firecrawl)
  const performWebSearch = useCallback(async (query: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("web-image-search", {
        body: { query, limit: 8 },
      });

      if (error) throw error;

      if (data.success && data.images) {
        return data.images as WebImage[];
      }
      return [];
    } catch (error) {
      console.error("Web search error:", error);
      return [];
    }
  }, []);

  // Combined search function
  const performSearch = useCallback(async (query: string, source: SearchSource = searchSource) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setImages([]);

    try {
      if (source === "wikimedia") {
        const results = await performWikimediaSearch(query);
        setImages(results);
      } else {
        const results = await performWebSearch(query);
        setImages(results);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  }, [searchSource, performWikimediaSearch, performWebSearch]);

  // Auto-search when entry changes
  useEffect(() => {
    if (!currentEntry || hasSearchedRef.current.has(currentEntry.id + searchSource)) return;
    
    hasSearchedRef.current.add(currentEntry.id + searchSource);
    performSearch(currentEntry.name);
  }, [currentEntry, performSearch, searchSource]);

  const handleImport = useCallback(async (image: ImageResult) => {
    if (!currentEntry) return;
    
    const imageId = getImageId(image);
    setIsImporting(imageId);

    try {
      const response = await fetch(image.url);
      if (!response.ok) throw new Error("Failed to fetch image");
      
      const blob = await response.blob();
      const contentType = response.headers.get("content-type") || "image/jpeg";
      
      await uploadToStorage(currentEntry.id, blob, contentType);
      clearPhotoIndexCache();

      setCompleted(prev => new Set([...prev, currentEntry.id]));
      
      toast({
        title: "Photo imported",
        description: `Imported photo for ${currentEntry.name}`,
      });

      // Auto-advance to next
      if (currentIndex < pendingEntries.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setImages([]);
      }
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to import photo",
        variant: "destructive",
      });
    } finally {
      setIsImporting(null);
    }
  }, [currentEntry, currentIndex, pendingEntries.length, toast]);

  const handleSkip = useCallback(() => {
    if (!currentEntry) return;
    
    setSkipped(prev => new Set([...prev, currentEntry.id]));
    
    if (currentIndex < pendingEntries.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setImages([]);
    }
  }, [currentEntry, currentIndex, pendingEntries.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setImages([]);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < pendingEntries.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setImages([]);
    }
  }, [currentIndex, pendingEntries.length]);

  const handleFinish = useCallback(() => {
    onComplete?.();
    onClose();
  }, [onComplete, onClose]);

  // Handle manual search
  const handleManualSearch = useCallback(() => {
    if (currentEntry) {
      hasSearchedRef.current.delete(currentEntry.id + searchSource);
    }
    performSearch(searchQuery);
  }, [currentEntry, searchQuery, performSearch, searchSource]);

  // Handle source change
  const handleSourceChange = useCallback((source: SearchSource) => {
    setSearchSource(source);
    if (currentEntry && !hasSearchedRef.current.has(currentEntry.id + source)) {
      hasSearchedRef.current.add(currentEntry.id + source);
      performSearch(searchQuery, source);
    }
  }, [currentEntry, searchQuery, performSearch]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (e.target instanceof HTMLInputElement) return;
      if (isImporting !== null) return;
      
      // Number keys 1-8 to select image
      if (e.key >= "1" && e.key <= "8") {
        const index = parseInt(e.key) - 1;
        if (images[index]) {
          handleImport(images[index]);
        }
        return;
      }
      
      switch (e.key.toLowerCase()) {
        case "s":
          handleSkip();
          break;
        case "arrowleft":
          handlePrev();
          break;
        case "arrowright":
          handleNext();
          break;
        case "escape":
          if (showPreview) {
            setShowPreview(false);
            setHoveredImage(null);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images, isImporting, showPreview, handleImport, handleSkip, handlePrev, handleNext]);

  if (isLoadingEntries) {
    return (
      <div className="p-8 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">Checking which entries need photos...</p>
      </div>
    );
  }

  if (pendingEntries.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center justify-center gap-4">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <p className="text-lg font-medium">All entries have photos!</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    );
  }

  const isComplete = completed.size + skipped.size >= pendingEntries.length;

  if (isComplete) {
    return (
      <div className="p-8 flex flex-col items-center justify-center gap-6">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <div className="text-center">
          <p className="text-xl font-bold mb-2">Batch Import Complete</p>
          <p className="text-muted-foreground">
            Imported: <span className="text-green-500 font-semibold">{completed.size}</span>
            {" • "}
            Skipped: <span className="text-neutral-400 font-semibold">{skipped.size}</span>
          </p>
        </div>
        <Button onClick={handleFinish}>Done</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      {/* Header */}
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Batch Photo Import</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1" />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {completed.size + skipped.size} / {pendingEntries.length}
          </span>
        </div>
      </div>

      {/* Current Entry */}
      <div className="p-4 border-b bg-background">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="text-center flex-1">
            <p className="text-xs text-muted-foreground mb-1">
              Entry {currentIndex + 1} of {pendingEntries.length}
            </p>
            <h3 className="text-xl font-bold">{currentEntry?.name}</h3>
            <p className="text-sm text-muted-foreground">{currentEntry?.position}</p>
            {completed.has(currentEntry?.id || "") && (
              <span className="inline-flex items-center gap-1 text-xs text-green-500 mt-1">
                <Check className="h-3 w-3" /> Imported
              </span>
            )}
            {skipped.has(currentEntry?.id || "") && (
              <span className="inline-flex items-center gap-1 text-xs text-neutral-400 mt-1">
                <SkipForward className="h-3 w-3" /> Skipped
              </span>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNext}
            disabled={currentIndex >= pendingEntries.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2 border-b bg-muted/20">
        <div className="flex gap-2 mb-2">
          <Tabs value={searchSource} onValueChange={(v) => handleSourceChange(v as SearchSource)} className="flex-1">
            <TabsList className="w-full">
              <TabsTrigger value="wikimedia" className="flex-1 gap-1">
                <ImageIcon className="h-3 w-3" />
                Wikimedia
              </TabsTrigger>
              <TabsTrigger value="web" className="flex-1 gap-1">
                <Globe className="h-3 w-3" />
                Web Search
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
            placeholder="Search query..."
            className="flex-1"
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleManualSearch}
            disabled={isSearching}
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Press <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">1</kbd>-<kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">8</kbd> to select, <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">S</kbd> to skip, <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">←</kbd><kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">→</kbd> to navigate
        </p>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto p-4" ref={containerRef}>
        {isSearching ? (
          <div className="flex items-center justify-center h-48 gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Searching {searchSource === "wikimedia" ? "Wikimedia" : "the web"}...</span>
          </div>
        ) : images.length > 0 ? (
          <TooltipProvider delayDuration={300}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {images.map((image, index) => {
                const imageId = getImageId(image);
                const webImage = isWebImage(image) ? image : null;
                
                return (
                  <Tooltip key={imageId}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleImport(image)}
                        onMouseEnter={() => setHoveredImage(image)}
                        onMouseLeave={() => setHoveredImage(null)}
                        disabled={isImporting !== null}
                        className="group relative rounded-lg overflow-hidden border bg-muted/50 hover:border-primary transition-colors disabled:opacity-50"
                      >
                        {/* Number indicator */}
                        <div className="absolute top-1 left-1 z-10 w-5 h-5 rounded bg-black/70 text-white text-xs flex items-center justify-center font-mono">
                          {index + 1}
                        </div>
                        
                        {/* Source indicator for web images */}
                        {webImage && (
                          <div className="absolute bottom-1 left-1 z-10 px-1.5 py-0.5 rounded bg-blue-500/80 text-white text-[10px] flex items-center gap-0.5 max-w-[calc(100%-8px)] truncate">
                            <Globe className="h-2.5 w-2.5 flex-shrink-0" />
                            {webImage.sourceDomain || 'Web'}
                          </div>
                        )}
                        
                        {/* Preview button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setHoveredImage(image);
                            setShowPreview(true);
                          }}
                          className="absolute top-1 right-1 z-10 w-6 h-6 rounded bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <ZoomIn className="h-3 w-3" />
                        </button>
                        
                        <div className="aspect-square">
                          <img
                            src={image.thumbUrl}
                            alt={image.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          {isImporting === imageId ? (
                            <Loader2 className="h-6 w-6 animate-spin text-white" />
                          ) : (
                            <Upload className="h-6 w-6 text-white" />
                          )}
                        </div>
                      </button>
                    </TooltipTrigger>
                    {/* Enhanced tooltip for web images with source info */}
                    {webImage && webImage.description && (
                      <TooltipContent side="bottom" className="max-w-xs p-3 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-blue-400">
                          <Globe className="h-3 w-3" />
                          {webImage.sourceDomain || 'Web source'}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {webImage.description.slice(0, 150)}
                          {webImage.description.length > 150 ? '...' : ''}
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 gap-2 text-muted-foreground">
            <AlertCircle className="h-8 w-8" />
            <p>No images found for "{currentEntry?.name}"</p>
            <p className="text-xs">Try modifying the search query above</p>
          </div>
        )}
      </div>

      {/* Large Preview Modal */}
      {showPreview && hoveredImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8"
          onClick={() => {
            setShowPreview(false);
            setHoveredImage(null);
          }}
        >
          <div className="relative max-w-3xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <img
              src={hoveredImage.url}
              alt={hoveredImage.title}
              className="max-w-full max-h-[60vh] object-contain rounded-t-lg bg-black"
            />
            <div className="bg-black/90 text-white p-4 rounded-b-lg space-y-3">
              <p className="font-medium">{hoveredImage.title}</p>
              
              {/* Source info for web images */}
              {isWebImage(hoveredImage) && (
                <div className="space-y-2">
                  {hoveredImage.sourceDomain && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <span className="text-sm text-blue-400">{hoveredImage.sourceDomain}</span>
                    </div>
                  )}
                  {hoveredImage.description && (
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {hoveredImage.description}
                    </p>
                  )}
                  {hoveredImage.sourceUrl && (
                    <a 
                      href={hoveredImage.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-3 w-3" />
                      View Source
                    </a>
                  )}
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImport(hoveredImage);
                    setShowPreview(false);
                  }}
                  disabled={isImporting !== null}
                >
                  {isImporting === getImageId(hoveredImage) ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Import This Photo
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setShowPreview(false);
                    setHoveredImage(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t bg-muted/30 flex justify-between">
        <Button variant="outline" onClick={handleSkip} disabled={isImporting !== null}>
          <SkipForward className="h-4 w-4 mr-2" />
          Skip
        </Button>
        
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground self-center mr-2">
            <span className="text-green-500">{completed.size}</span> imported
            {" • "}
            <span className="text-neutral-400">{skipped.size}</span> skipped
          </span>
          <Button variant="secondary" onClick={handleFinish}>
            Finish Early
          </Button>
        </div>
      </div>
    </div>
  );
}
