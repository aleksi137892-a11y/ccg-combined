/**
 * Input validation utilities for Edge Functions
 * 
 * Security: Validate and sanitize all user input
 */

/**
 * Validate that required fields are present
 */
export function validateRequired(
  data: Record<string, unknown>,
  requiredFields: string[]
): { valid: boolean; missing: string[] } {
  const missing = requiredFields.filter(field => 
    data[field] === undefined || data[field] === null || data[field] === ''
  );
  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Sanitize string input (basic XSS prevention)
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate that a value is one of allowed options
 */
export function isValidOption<T extends string>(
  value: unknown,
  allowedOptions: readonly T[]
): value is T {
  return typeof value === 'string' && allowedOptions.includes(value as T);
}

/**
 * Validate array of strings
 */
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

/**
 * Truncate string to max length
 */
export function truncate(input: string, maxLength: number): string {
  if (typeof input !== 'string') return '';
  if (input.length <= maxLength) return input;
  return input.slice(0, maxLength);
}
