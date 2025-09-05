// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  createdAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
  securityLevel: 'STANDARD' | 'HIGH' | 'MAXIMUM';
}

// Currency types
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'NOK' | 'CHF' | 'SEK' | 'DKK' | 'JPY' | 'CAD' | 'AUD' | 'SGD' | 'HKD' | 'CNY' | 'EGP' | 'MAD' | 'ZAR' | 'BRL' | 'ARS' | 'CLP' | 'COP' | 'PEN' | 'UYU' | 'RUB' | 'BGN' | 'RON' | 'HRK' | 'PLN' | 'CZK' | 'HUF' | 'AED' | 'QAR' | 'INR' | 'THB' | 'MYR';

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  decimals: number;
  country: string;
}

// Account types
export interface BankAccount {
  id: string;
  userId: string;
  accountNumber: string;
  iban: string;
  bic: string;
  currency: CurrencyCode;
  balance: number;
  accountType: 'CHECKING' | 'SAVINGS' | 'BUSINESS';
  isActive: boolean;
  createdAt: Date;
  bankName: string;
  bankCountry: string;
}

// Transaction types
export interface Transaction {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  fromIban: string;
  toIban: string;
  amount: number;
  currency: CurrencyCode;
  reference: string;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  createdAt: Date;
  completedAt?: Date;
  fees: number;
  exchangeRate?: number;
  transactionType: 'TRANSFER' | 'DEPOSIT' | 'WITHDRAWAL';
}

// IBAN/BIC types
export interface IbanInfo {
  iban: string;
  isValid: boolean;
  countryCode: string;
  checkDigits: string;
  bankCode: string;
  accountNumber: string;
  formatted: string;
}

export interface BicInfo {
  bic: string;
  bankCode: string;
  countryCode: string;
  locationCode: string;
  branchCode?: string;
  bankName: string;
}

// Security types
export interface SecurityEvent {
  id: string;
  userId: string;
  eventType: 'LOGIN' | 'TRANSFER' | 'FAILED_LOGIN' | 'SUSPICIOUS_ACTIVITY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  acceptTerms: boolean;
}

export interface TransferForm {
  fromAccountId: string;
  toIban: string;
  amount: number;
  currency: CurrencyCode;
  reference: string;
  description: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

// Dashboard types
export interface DashboardStats {
  totalBalance: number;
  totalAccounts: number;
  recentTransactions: Transaction[];
  monthlyTransactions: number;
  securityScore: number;
}

// Country codes for IBAN generation (50 countries total)
export type CountryCode = 'AD' | 'AT' | 'BE' | 'BG' | 'CH' | 'CY' | 'CZ' | 'DE' | 'DK' | 'EE' | 'ES' | 'FI' | 'FR' | 'GB' | 'GR' | 'HR' | 'HU' | 'IE' | 'IT' | 'LT' | 'LU' | 'LV' | 'MC' | 'MT' | 'NL' | 'NO' | 'PL' | 'PT' | 'RO' | 'SE' | 'SI' | 'SK' | 'EG' | 'MA' | 'ZA' | 'AE' | 'QA' | 'BH' | 'KW' | 'SA' | 'BR' | 'AR' | 'CL' | 'CO' | 'PE' | 'UY' | 'SG' | 'AU' | 'HK' | 'CN' | 'IN' | 'TH' | 'MY' | 'VG' | 'RU' | 'BY' | 'KZ' | 'MU' | 'PA' | 'BS';

export interface CountryInfo {
  code: CountryCode;
  name: string;
  ibanLength: number;
  bicLength: number;
  currency: CurrencyCode[];
  example: string;
} 