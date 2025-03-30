import { ID_CARD_CONFIG } from "@/config";

/**
 * Generates a random ID number for ClaudeNation citizens
 */
export function generateIdNumber(): string {
  return 'CN' + Math.floor(10000000 + Math.random() * 90000000);
}

/**
 * Calculate the expiry date based on the issue date and validity period
 */
export function calculateExpiryDate(issueDate: Date = new Date()): Date {
  const expiryDate = new Date(issueDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + ID_CARD_CONFIG.validityYears);
  return expiryDate;
}

/**
 * Format a date as YYYY-MM-DD
 */
export function formatDateForInput(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Format a date in a human-readable format
 */
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Validate an email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Convert a File to a Base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

/**
 * Get design by ID
 */
export function getDesignById(designId: number) {
  return ID_CARD_CONFIG.designs.find(d => d.id === designId) || ID_CARD_CONFIG.designs[0];
}

/**
 * Truncate text if it's too long
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Checks if an image exists at the given URL, returns a fallback if it doesn't
 */
export async function checkImageExists(url: string, fallbackUrl: string = '/backgrounds/claudenation01light.jpg'): Promise<string> {
  // For local images starting with "/"
  if (url.startsWith('/')) {
    // In browser environment
    if (typeof window !== 'undefined') {
      // Create a new Image object
      const img = new Image();
      
      // Return a promise that resolves with the original URL if the image loads
      // or the fallback URL if there's an error
      return new Promise((resolve) => {
        img.onload = () => {
          resolve(url);
        };
        
        img.onerror = () => {
          console.warn(`Image at ${url} not found, using fallback`);
          resolve(fallbackUrl);
        };
        
        // Start loading the image
        img.src = url;
      });
    }
  }
  
  // For relative URLs or if we're not in a browser, just return the original URL
  return url;
} 