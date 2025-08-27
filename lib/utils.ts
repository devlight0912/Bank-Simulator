import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateIBAN(iban: string): boolean {
  // Remove spaces and convert to uppercase
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  
  // Check length (15-34 characters)
  if (cleanIban.length < 15 || cleanIban.length > 34) {
    return false;
  }
  
  // Check format (2 letters + 2 digits + alphanumeric)
  const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/;
  if (!ibanRegex.test(cleanIban)) {
    return false;
  }
  
  // Move first 4 characters to end and calculate mod 97
  const rearranged = cleanIban.substring(4) + cleanIban.substring(0, 4);
  
  // Replace letters with numbers (A=10, B=11, ..., Z=35)
  let numericString = '';
  for (let i = 0; i < rearranged.length; i++) {
    const char = rearranged[i];
    if (char >= 'A' && char <= 'Z') {
      numericString += (char.charCodeAt(0) - 'A'.charCodeAt(0) + 10).toString();
    } else {
      numericString += char;
    }
  }
  
  // Calculate mod 97
  let remainder = 0;
  for (let i = 0; i < numericString.length; i++) {
    remainder = (remainder * 10 + parseInt(numericString[i])) % 97;
  }
  
  return remainder === 1;
}

export function formatIBAN(iban: string): string {
  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  return cleanIban.replace(/(.{4})/g, '$1 ').trim();
}

export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
