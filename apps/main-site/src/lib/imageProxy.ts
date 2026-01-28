const PROXYABLE_HOSTS = new Set([
  "upload.wikimedia.org",
  "commons.wikimedia.org",
  "en.wikipedia.org",
  "civil.ge",
  "www.civil.ge",
  "oc-media.org",
  "www.oc-media.org",
  "static.court.ge",
  "web-api.parliament.ge",
  "parliament.ge",
  "info.parliament.ge",
  "gov.ge",
  "mfa.gov.ge",
  "justice.gov.ge",
  "georgiacapital.ge",
  "www.georgiacapital.ge",
  "cdn.lb.ge",
  "lb.ge",
]);

function isProxyableHttpUrl(photo: string) {
  try {
    const url = new URL(photo);
    return url.protocol === "https:" && PROXYABLE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export function getDisplayPhotoSrc(photo: string) {
  if (!photo) return photo;

  // Already local asset/placeholder
  if (photo.startsWith("/") || photo.startsWith("data:")) return photo;

  // Only proxy http(s)
  if (!photo.startsWith("http://") && !photo.startsWith("https://")) return photo;

  // Proxy only known/approved hosts; otherwise fall back to direct URL.
  if (!isProxyableHttpUrl(photo)) return photo;

  const base = import.meta.env.VITE_SUPABASE_URL;
  if (!base) return photo;

  return `${base}/functions/v1/image-proxy?url=${encodeURIComponent(photo)}`;
}
