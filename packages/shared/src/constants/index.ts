/**
 * Shared constants for CCG Platform
 */

// Allowed origins for CORS
export const ALLOWED_ORIGINS = [
  'https://sabcho.org',
  'https://www.sabcho.org',
  'https://iimg.sabcho.org',
  'https://forum.sabcho.org',
  'https://blue-white-duo.lovable.app',
  'http://localhost:5173',
  'http://localhost:3000',
] as const;

// Secure contact channels
export const SECURE_CHANNELS = {
  signal: {
    name: 'Signal',
    identifier: 'CCG.95',
    url: 'https://signal.me/#eu/s5fLOAXoBqChwY13U_LhOvqcWDBfPfsjBe0suqv0yOYYfNDDz5FOuoyedcUkFrfO',
  },
  protonmail: {
    name: 'ProtonMail',
    email: 'secure@sabcho.org',
  },
  threema: {
    name: 'Threema',
    identifier: 'CCG-SECURE',
  },
} as const;

// Support resources for pause/save feature
export const SUPPORT_RESOURCES = [
  {
    name: 'Signal',
    nameGe: 'Signal',
    contact: 'CCG.95',
    url: SECURE_CHANNELS.signal.url,
  },
  {
    name: 'Physicians for Human Rights',
    nameGe: 'ექიმები ადამიანის უფლებებისთვის',
    url: 'https://phr.org/',
  },
  {
    name: 'Médecins Sans Frontières',
    nameGe: 'საზღვრებს გარეშე ექიმები',
    url: 'https://www.msf.org/',
  },
] as const;

// Draft session expiry (72 hours in milliseconds)
export const DRAFT_EXPIRY_MS = 72 * 60 * 60 * 1000;

// Maximum file sizes
export const MAX_FILE_SIZES = {
  image: 10 * 1024 * 1024,      // 10MB
  document: 50 * 1024 * 1024,   // 50MB
  video: 500 * 1024 * 1024,     // 500MB
} as const;

// Supported file types
export const SUPPORTED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  video: ['video/mp4', 'video/webm', 'video/quicktime'],
} as const;
