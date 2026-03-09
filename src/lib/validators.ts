// Input validation utilities

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string, maxLength: number = 10000): string {
  if (typeof input !== 'string') return '';
  
  // Trim and limit length
  let sanitized = input.trim().slice(0, maxLength);
  
  // Remove potentially dangerous HTML/script tags
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, ''); // Remove inline event handlers
  
  return sanitized;
}

/**
 * Validate file size
 */
export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}

/**
 * Validate file type
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      // Handle wildcards like 'image/*'
      const prefix = type.slice(0, -2);
      return file.type.startsWith(prefix);
    }
    return file.type === type;
  });
}

/**
 * Validate URL
 */
export function validateURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Escape HTML to prevent XSS when displaying user content
 */
export function escapeHTML(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Validate and sanitize JSON input
 */
export function sanitizeJSON(input: string): { valid: boolean; data?: any; error?: string } {
  try {
    const parsed = JSON.parse(input);
    return { valid: true, data: parsed };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON' 
    };
  }
}

/**
 * Rate limit check for client-side operations
 */
export class ClientRateLimiter {
  private operations: Map<string, number[]> = new Map();
  
  constructor(
    private maxOperations: number = 10,
    private windowMs: number = 60000
  ) {}
  
  check(key: string): boolean {
    const now = Date.now();
    const timestamps = this.operations.get(key) || [];
    
    // Remove old timestamps outside the window
    const validTimestamps = timestamps.filter(ts => now - ts < this.windowMs);
    
    if (validTimestamps.length >= this.maxOperations) {
      return false;
    }
    
    validTimestamps.push(now);
    this.operations.set(key, validTimestamps);
    return true;
  }
}
