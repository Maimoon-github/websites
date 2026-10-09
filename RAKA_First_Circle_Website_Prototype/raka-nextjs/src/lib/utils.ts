/**
 * Utility functions for RAKA First Circle
 */

export function validateEmail(input: string): boolean {
  const value = input.trim();
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function normalizePakistaniMobile(input: string): string | null {
  const num = input.replace(/[\s().-]/g, "");
  // Formats supported: 3001234567, 03001234567, +923001234567, 923001234567
  if (/^3\d{9}$/.test(num)) return "+92" + num;
  if (/^03\d{9}$/.test(num)) return "+92" + num.slice(1);
  if (/^\+923\d{9}$/.test(num)) return num;
  if (/^923\d{9}$/.test(num)) return "+" + num;
  return null;
}

export function generateReferralCode(): string {
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const bytes = new Uint8Array(6);
    window.crypto.getRandomValues(bytes);
    return "FC-" + Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  }
  // Fallback for SSR or non-crypto environments
  return "FC-" + Math.random().toString(36).substring(2, 14).toUpperCase();
}

export function isValidReferralCode(code: string): boolean {
  return /^FC-[A-Z0-9]{8,14}$/.test(code.toUpperCase().trim());
}
