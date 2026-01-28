import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type PhotoIndex = Record<string, string>;

type IndexedPhoto = { url: string; priority: number };

const EXT_PRIORITY: Record<string, number> = {
  webp: 4,
  png: 3,
  jpeg: 2,
  jpg: 1,
};

let photoIndexCache: PhotoIndex | null = null;
let photoIndexPromise: Promise<PhotoIndex> | null = null;
let cacheVersion = 0;

const buildPhotoIndex = async (): Promise<PhotoIndex> => {
  const byId: Record<string, IndexedPhoto> = {};

  const limit = 1000;
  let offset = 0;

  // We store files as: {safeName}-{entryId}.{ext}
  const idRegex = /-(\d+)\.(jpg|jpeg|png|webp)$/i;

  while (true) {
    const { data, error } = await supabase.storage
      .from("registry-photos")
      .list("", { limit, offset });

    if (error) throw error;

    for (const obj of data ?? []) {
      const match = obj.name.match(idRegex);
      if (!match) continue;

      const entryId = match[1];
      const ext = match[2].toLowerCase();
      const priority = EXT_PRIORITY[ext] ?? 0;

      const { data: urlData } = supabase.storage
        .from("registry-photos")
        .getPublicUrl(obj.name);

      const current = byId[entryId];
      if (!current || priority > current.priority) {
        byId[entryId] = { url: urlData.publicUrl, priority };
      }
    }

    if (!data || data.length < limit) break;
    offset += limit;
  }

  photoIndexCache = Object.fromEntries(
    Object.entries(byId).map(([id, v]) => [id, v.url])
  );

  return photoIndexCache;
};

export const getStoragePhotoUrl = async (entryId: string): Promise<string | null> => {
  const idKey = String(entryId);

  if (photoIndexCache) return photoIndexCache[idKey] ?? null;

  if (!photoIndexPromise) {
    photoIndexPromise = buildPhotoIndex().catch(() => {
      photoIndexCache = {};
      photoIndexPromise = null;
      return {};
    });
  }

  const index = await photoIndexPromise;
  return index[idKey] ?? null;
};

/** Clear the in-memory cache so the next call rebuilds from storage */
export const clearPhotoIndexCache = () => {
  photoIndexCache = null;
  photoIndexPromise = null;
  cacheVersion++;
};

/** Get current cache version for reactive updates */
export const getPhotoIndexCacheVersion = () => cacheVersion;

export const useStoragePhoto = (entryId: string, refreshVersion?: number) => {
  const [storageUrl, setStorageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    (async () => {
      const url = await getStoragePhotoUrl(entryId);
      if (!mounted) return;
      setStorageUrl(url);
      setIsLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [entryId, refreshVersion]);

  return { storageUrl, isLoading };
};

