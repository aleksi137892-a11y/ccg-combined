import React, { useState, useEffect, useCallback } from 'react';
import { X, Upload, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoTestUploadProps {
  onLogoChange?: (logoUrl: string | null) => void;
}

const LOGO_STORAGE_KEY = 'ccg-test-logo';

export function LogoTestUpload({ onLogoChange }: LogoTestUploadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [testLogo, setTestLogo] = useState<string | null>(null);
  const [logoInfo, setLogoInfo] = useState<{ width: number; height: number } | null>(null);

  // Check URL param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('logo-test') === 'true') {
      setIsVisible(true);
    }

    // Load saved logo from localStorage
    const savedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
    if (savedLogo) {
      setTestLogo(savedLogo);
      onLogoChange?.(savedLogo);
    }
  }, [onLogoChange]);

  // Keyboard shortcut: Ctrl/Cmd + Shift + L
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setTestLogo(dataUrl);
      localStorage.setItem(LOGO_STORAGE_KEY, dataUrl);
      onLogoChange?.(dataUrl);

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setLogoInfo({ width: img.width, height: img.height });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, [onLogoChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearLogo = useCallback(() => {
    setTestLogo(null);
    setLogoInfo(null);
    localStorage.removeItem(LOGO_STORAGE_KEY);
    onLogoChange?.(null);
  }, [onLogoChange]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-white border border-navy/20 shadow-xl p-4 w-72">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-navy/60">
          Logo Testing
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="text-navy/40 hover:text-navy transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "border-2 border-dashed p-4 text-center transition-colors",
          isDragging ? "border-navy bg-navy/5" : "border-navy/20"
        )}
      >
        {testLogo ? (
          <div className="space-y-3">
            <img
              src={testLogo}
              alt="Test logo"
              className="max-h-16 mx-auto object-contain"
            />
            {logoInfo && (
              <p className="text-[10px] text-navy/50 font-mono">
                {logoInfo.width} × {logoInfo.height}px
              </p>
            )}
            <div className="flex gap-2 justify-center">
              <button
                onClick={clearLogo}
                className="text-xs text-red-600 hover:text-red-700 underline"
              >
                Clear
              </button>
              <label className="text-xs text-navy/60 hover:text-navy underline cursor-pointer">
                Replace
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <label className="cursor-pointer block">
            <Upload className="w-6 h-6 mx-auto mb-2 text-navy/30" />
            <span className="text-xs text-navy/50">
              Drop logo or click to upload
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        )}
      </div>

      <p className="text-[9px] text-navy/40 mt-2 text-center">
        ⌘+Shift+L to toggle • ?logo-test=true
      </p>
    </div>
  );
}

export default LogoTestUpload;
