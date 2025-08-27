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
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'NOK' | 'CHF' | 'SEK' | 'DKK' | 'JPY' | 'CAD' | 'AUD' | 'SGD' | 'HKD' | 'CNY';

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

// Country codes for IBAN generation
export type CountryCode = 'AD' | 'AE' | 'AL' | 'AT' | 'AZ' | 'BA' | 'BE' | 'BG' | 'BH' | 'BR' | 'BY' | 'CH' | 'CR' | 'CY' | 'CZ' | 'DE' | 'DK' | 'DO' | 'EE' | 'EG' | 'ES' | 'FI' | 'FO' | 'FR' | 'GB' | 'GE' | 'GI' | 'GL' | 'GR' | 'GT' | 'HR' | 'HU' | 'IE' | 'IL' | 'IS' | 'IT' | 'JO' | 'KW' | 'KZ' | 'LB' | 'LC' | 'LI' | 'LT' | 'LU' | 'LV' | 'MC' | 'MD' | 'ME' | 'MK' | 'MR' | 'MT' | 'MU' | 'NL' | 'NO' | 'PK' | 'PL' | 'PS' | 'PT' | 'QA' | 'RO' | 'RS' | 'SA' | 'SE' | 'SI' | 'SK' | 'SM' | 'TN' | 'TR' | 'UA' | 'VG' | 'XK' | 'SG' | 'AU' | 'HK' | 'CN';

export interface CountryInfo {
  code: CountryCode;
  name: string;
  ibanLength: number;
  bicLength: number;
  currency: CurrencyCode[];
  example: string;
} 