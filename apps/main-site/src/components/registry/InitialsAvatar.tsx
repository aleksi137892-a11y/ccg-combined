import { useMemo } from "react";

interface InitialsAvatarProps {
  name: string;
  severity: "high" | "medium" | "low";
  className?: string;
}

// Generate a consistent color based on the name
const getColorFromName = (name: string, severity: "high" | "medium" | "low") => {
  // Create a simple hash from the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Base colors based on severity with variations
  const baseColors = {
    high: [
      "from-red-900/80 to-red-950",
      "from-rose-900/80 to-rose-950",
      "from-red-800/80 to-red-900",
    ],
    medium: [
      "from-orange-900/80 to-orange-950",
      "from-amber-900/80 to-amber-950",
      "from-yellow-900/80 to-yellow-950",
    ],
    low: [
      "from-neutral-700/80 to-neutral-800",
      "from-zinc-700/80 to-zinc-800",
      "from-slate-700/80 to-slate-800",
    ],
  };
  
  const colors = baseColors[severity];
  return colors[Math.abs(hash) % colors.length];
};

export const InitialsAvatar = ({ name, severity, className = "" }: InitialsAvatarProps) => {
  const initials = useMemo(() => {
    const words = name.split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }, [name]);

  const gradientColor = useMemo(() => getColorFromName(name, severity), [name, severity]);

  return (
    <div
      className={`w-full h-56 flex items-center justify-center bg-gradient-to-br ${gradientColor} relative overflow-hidden ${className}`}
    >
      {/* Scan lines effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)",
        }}
      />
      
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      
      {/* Initials */}
      <span
        className="text-7xl font-black text-white/90 tracking-wider relative z-10"
        style={{ fontFamily: "Bebas Neue, sans-serif" }}
      >
        {initials}
      </span>
      
      {/* Corner decorations */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/20" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/20" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/20" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/20" />
    </div>
  );
};
