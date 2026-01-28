import { useState } from "react";
import { RegistryEntry } from "@/types/registry";
import { InitialsAvatar } from "./InitialsAvatar";
import { getDisplayPhotoSrc } from "@/lib/imageProxy";
import { useStoragePhoto } from "@/hooks/useStoragePhoto";

interface RegistryCardProps {
  entry: RegistryEntry;
  onSelect: (entry: RegistryEntry) => void;
  refreshVersion?: number;
  showDebug?: boolean;
}

const isPlaceholder = (photo: string) => {
  return !photo || photo === "/placeholder.svg" || photo.includes("placeholder");
};

export const RegistryCard = ({ entry, onSelect, refreshVersion = 0, showDebug = false }: RegistryCardProps) => {
  const [directError, setDirectError] = useState(false);
  const [proxyError, setProxyError] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const { storageUrl, isLoading } = useStoragePhoto(entry.id, refreshVersion);

  const severityColors = {
    high: "border-[#8B0000] bg-gradient-to-br from-[#1a0000] to-black",
    medium: "border-orange-900 bg-gradient-to-br from-orange-950/20 to-black",
    low: "border-neutral-700 bg-gradient-to-br from-neutral-900 to-black",
  };

  const severityBadge = {
    high: "bg-[#8B0000] text-red-100",
    medium: "bg-orange-900 text-orange-100",
    low: "bg-neutral-700 text-neutral-300",
  };

  const hasValidPhoto = !isPlaceholder(entry.photo);
  
  // Priority: Storage > Direct URL > Proxy > Fallback
  let imgSrc: string | null = null;
  let currentSource: "storage" | "direct" | "proxy" | "none" = "none";
  
  if (storageUrl && !storageError) {
    imgSrc = storageUrl;
    currentSource = "storage";
  } else if (hasValidPhoto && !directError) {
    imgSrc = entry.photo;
    currentSource = "direct";
  } else if (hasValidPhoto && !proxyError) {
    imgSrc = getDisplayPhotoSrc(entry.photo);
    currentSource = "proxy";
  }
  
  const showFallback = !imgSrc;

  // Get host for debug display
  const getHost = (url: string | null) => {
    if (!url) return "none";
    try {
      return new URL(url).hostname.replace("www.", "").split(".")[0];
    } catch {
      return "local";
    }
  };

  return (
    <div
      onClick={() => onSelect(entry)}
      className={`cursor-pointer border-2 ${severityColors[entry.complicity.severity]} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group relative overflow-hidden`}
    >
      {/* Debug overlay */}
      {showDebug && (
        <div className="absolute top-0 left-0 z-20 bg-black/80 text-[9px] font-mono p-1.5 space-y-0.5">
          <div className={`font-bold ${currentSource === "storage" ? "text-green-400" : currentSource === "direct" ? "text-blue-400" : currentSource === "proxy" ? "text-yellow-400" : "text-red-400"}`}>
            {currentSource.toUpperCase()}
          </div>
          <div className="text-neutral-400">{getHost(imgSrc)}</div>
          {isLoading && <div className="text-purple-400">loading...</div>}
          {storageError && <div className="text-red-400">stor-err</div>}
          {directError && <div className="text-red-400">dir-err</div>}
          {proxyError && <div className="text-red-400">prx-err</div>}
        </div>
      )}

      {/* Photo or Initials Avatar - Portrait aspect ratio for full face visibility */}
      <div className="relative mb-5 overflow-hidden aspect-[3/4] bg-gradient-to-b from-neutral-800 to-neutral-900">
        {showFallback ? (
          <InitialsAvatar
            name={entry.name}
            severity={entry.complicity.severity}
            className="group-hover:scale-105 transition-transform duration-500 h-full"
          />
        ) : (
          <img
            src={imgSrc ?? undefined}
            alt={entry.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-[center_20%] grayscale group-hover:grayscale-0 transition-all duration-500"
            style={{ backgroundColor: "#1a1a1a" }}
            onError={() => {
              if (currentSource === "storage") setStorageError(true);
              else if (currentSource === "direct") setDirectError(true);
              else if (currentSource === "proxy") setProxyError(true);
            }}
          />
        )}
        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div
          className={`absolute top-3 right-3 px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-bold ${severityBadge[entry.complicity.severity]}`}
        >
          {entry.complicity.severity} severity
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3
          className="text-2xl font-black text-white uppercase tracking-wide"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {entry.name}
        </h3>
        <p className="text-neutral-400 text-sm">
          {entry.position}
          {entry.organization && (
            <>
              <br />
              <span className="text-neutral-500">{entry.organization}</span>
            </>
          )}
        </p>
        <p className="text-neutral-300 text-sm font-semibold border-l-2 border-neutral-700 pl-3">
          {entry.complicity.nature}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {entry.sanctions.slice(0, 2).map((sanction, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-[8px] uppercase tracking-wider bg-neutral-900 border border-neutral-700 text-neutral-400"
            >
              {sanction}
            </span>
          ))}
          {entry.sanctions.length > 2 && (
            <span className="px-2 py-1 text-[8px] uppercase tracking-wider bg-neutral-900 border border-neutral-700 text-neutral-500">
              +{entry.sanctions.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* View indicator */}
      <div className="absolute bottom-4 right-4 text-neutral-600 text-[10px] uppercase tracking-[0.2em] group-hover:text-white transition-colors">
        View Record →
      </div>
    </div>
  );
};
