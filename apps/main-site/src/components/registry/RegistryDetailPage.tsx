import { useState } from "react";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegistryEntry } from "@/types/registry";
import { InitialsAvatar } from "./InitialsAvatar";
import { getDisplayPhotoSrc } from "@/lib/imageProxy";
import { useStoragePhoto, clearPhotoIndexCache, getPhotoIndexCacheVersion } from "@/hooks/useStoragePhoto";
import { WikimediaPhotoSearch } from "./WikimediaPhotoSearch";

interface RegistryDetailPageProps {
  entry: RegistryEntry;
  onBack: () => void;
}

const isPlaceholder = (photo: string) => {
  return !photo || photo === "/placeholder.svg" || photo.includes("placeholder");
};

export const RegistryDetailPage = ({ entry, onBack }: RegistryDetailPageProps) => {
  const [directError, setDirectError] = useState(false);
  const [proxyError, setProxyError] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [showPhotoSearch, setShowPhotoSearch] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const { storageUrl } = useStoragePhoto(entry.id, refreshVersion);

  const severityColors = {
    high: "text-[#DC143C] border-[#8B0000]",
    medium: "text-orange-500 border-orange-900",
    low: "text-neutral-400 border-neutral-700",
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back button */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-neutral-400 hover:text-white hover:bg-neutral-900 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Registry
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Photo and basic info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {showFallback ? (
                <InitialsAvatar
                  name={entry.name}
                  severity={entry.complicity.severity}
                  className="aspect-[3/4] h-auto mb-6"
                />
              ) : (
                <div className="w-full aspect-[3/4] mb-6 bg-gradient-to-b from-neutral-800 to-neutral-900 overflow-hidden">
                  <img
                    src={imgSrc ?? undefined}
                    alt={entry.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[center_15%] grayscale"
                    style={{ backgroundColor: "#1a1a1a" }}
                    onError={() => {
                      if (currentSource === "storage") setStorageError(true);
                      else if (currentSource === "direct") setDirectError(true);
                      else if (currentSource === "proxy") setProxyError(true);
                    }}
                  />
                </div>
              )}
              <h1
                className="text-4xl font-black text-white uppercase tracking-wide mb-2"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {entry.name}
              </h1>
              <p className="text-neutral-400 text-lg mb-1">{entry.position}</p>
              {entry.organization && (
                <p className="text-neutral-500">{entry.organization}</p>
              )}
              <p className="text-neutral-600 text-sm mt-4 font-mono">
                Added: {new Date(entry.dateAdded).toLocaleDateString()}
              </p>
              
              <Button
                variant="outline"
                size="sm"
                className="mt-4 gap-2 text-neutral-400 border-neutral-700 hover:bg-neutral-800"
                onClick={() => setShowPhotoSearch(true)}
              >
                <ImagePlus className="w-4 h-4" />
                Find Photo
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Severity */}
            <div className={`border-l-4 ${severityColors[entry.complicity.severity]} pl-6 py-2`}>
              <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2 font-mono">
                Severity Level
              </div>
              <div className={`text-3xl font-black uppercase ${severityColors[entry.complicity.severity].split(" ")[0]}`}>
                {entry.complicity.severity}
              </div>
            </div>

            {/* Nature of Complicity */}
            <div className="bg-neutral-950 border-2 border-neutral-800 p-8">
              <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-4 font-mono">
                Nature of Harm
              </div>
              <h2 className="text-2xl font-bold text-white mb-6">
                {entry.complicity.nature}
              </h2>
              <p className="text-neutral-300 text-lg leading-relaxed">
                {entry.complicity.details}
              </p>
            </div>

            {/* Sanctions */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-4 font-mono">
                Active Sanctions & Measures
              </div>
              <div className="flex flex-wrap gap-3">
                {entry.sanctions.map((sanction, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 text-xs uppercase tracking-wider bg-neutral-900 border-2 border-neutral-700 text-neutral-300 font-semibold"
                  >
                    {sanction}
                  </span>
                ))}
              </div>
            </div>

            {/* Sources */}
            {entry.sources && entry.sources.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-4 font-mono">
                  Sources & Documentation
                </div>
                <div className="space-y-2">
                  {entry.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-sm bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                    >
                      <span className="text-neutral-500 mr-2">[{idx + 1}]</span>
                      {source.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Path to Restitution */}
            <div className="bg-[#1a0000] border-2 border-[#8B0000] p-8 mt-12">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#DC143C]/70 mb-4 font-mono font-bold">
                Path to Restitution
              </div>
              <p className="text-neutral-300 text-base leading-relaxed mb-6">
                <span className="font-bold text-[#DC143C]">To {entry.name}:</span>{" "}
                This record documents your actions during Georgia's democratic crisis. It will remain public
                until you take the following steps toward genuine repair:
              </p>
              <ul className="space-y-3 text-neutral-300 text-sm mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#DC143C] font-bold">1.</span>
                  <span>
                    Join <strong className="text-white">The Rustaveli Project</strong> — demonstrate your
                    commitment to Georgia's European future through concrete action.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#DC143C] font-bold">2.</span>
                  <span>
                    Become part of <strong className="text-white">The Movement for Dignity</strong> — stand
                    with those defending constitutional order and human rights.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#DC143C] font-bold">3.</span>
                  <span>
                    Join the fight for justice — the resistance against authoritarianism, state capture, and the
                    erosion of Georgia's sovereignty.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#DC143C] font-bold">4.</span>
                  <span>
                    Publicly apologize to the political prisoners and their families — acknowledge the harm
                    caused by repression, arbitrary detention, and violence.
                  </span>
                </li>
              </ul>
              <p className="text-neutral-400 text-sm italic">
                The choice remains yours. History will record whether you chose complicity or courage.
              </p>
            </div>
          </div>
        </div>
      </div>

      <WikimediaPhotoSearch
        entry={entry}
        open={showPhotoSearch}
        onOpenChange={setShowPhotoSearch}
        onPhotoUpdated={() => {
          clearPhotoIndexCache();
          setRefreshVersion(v => v + 1);
          setStorageError(false);
        }}
      />
    </div>
  );
};
