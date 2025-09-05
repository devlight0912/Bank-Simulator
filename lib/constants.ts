import { Currency, CountryInfo, CurrencyCode, CountryCode } from '@/types';

export const SUPPORTED_CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    decimals: 2,
    country: 'United States'
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    decimals: 2,
    country: 'European Union'
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    decimals: 2,
    country: 'United Kingdom'
  },
  NOK: {
    code: 'NOK',
    name: 'Norwegian Krone',
    symbol: 'kr',
    decimals: 2,
    country: 'Norway'
  },
  CHF: {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF',
    decimals: 2,
    country: 'Switzerland'
  },
  SEK: {
    code: 'SEK',
    name: 'Swedish Krona',
    symbol: 'kr',
    decimals: 2,
    country: 'Sweden'
  },
  DKK: {
    code: 'DKK',
    name: 'Danish Krone',
    symbol: 'kr',
    decimals: 2,
    country: 'Denmark'
  },
  JPY: {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    decimals: 0,
    country: 'Japan'
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    decimals: 2,
    country: 'Canada'
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    decimals: 2,
    country: 'Australia'
  },
  SGD: {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    decimals: 2,
    country: 'Singapore'
  },
  HKD: {
    code: 'HKD',
    name: 'Hong Kong Dollar',
    symbol: 'HK$',
    decimals: 2,
    country: 'Hong Kong'
  },
  CNY: {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: '¥',
    decimals: 2,
    country: 'China'
  },
  // African Currencies
  EGP: {
    code: 'EGP',
    name: 'Egyptian Pound',
    symbol: 'ج.م',
    decimals: 2,
    country: 'Egypt'
  },
  MAD: {
    code: 'MAD',
    name: 'Moroccan Dirham',
    symbol: 'MAD',
    decimals: 2,
    country: 'Morocco'
  },
  ZAR: {
    code: 'ZAR',
    name: 'South African Rand',
    symbol: 'R',
    decimals: 2,
    country: 'South Africa'
  },
  // South American Currencies
  BRL: {
    code: 'BRL',
    name: 'Brazilian Real',
    symbol: 'R$',
    decimals: 2,
    country: 'Brazil'
  },
  ARS: {
    code: 'ARS',
    name: 'Argentine Peso',
    symbol: '$',
    decimals: 2,
    country: 'Argentina'
  },
  CLP: {
    code: 'CLP',
    name: 'Chilean Peso',
    symbol: '$',
    decimals: 0,
    country: 'Chile'
  },
  COP: {
    code: 'COP',
    name: 'Colombian Peso',
    symbol: '$',
    decimals: 2,
    country: 'Colombia'
  },
  PEN: {
    code: 'PEN',
    name: 'Peruvian Sol',
    symbol: 'S/',
    decimals: 2,
    country: 'Peru'
  },
  UYU: {
    code: 'UYU',
    name: 'Uruguayan Peso',
    symbol: '$U',
    decimals: 2,
    country: 'Uruguay'
  },
  // Eastern European & Less Regulated
  RUB: {
    code: 'RUB',
    name: 'Russian Ruble',
    symbol: '₽',
    decimals: 2,
    country: 'Russia'
  },
  BGN: {
    code: 'BGN',
    name: 'Bulgarian Lev',
    symbol: 'лв',
    decimals: 2,
    country: 'Bulgaria'
  },
  RON: {
    code: 'RON',
    name: 'Romanian Leu',
    symbol: 'lei',
    decimals: 2,
    country: 'Romania'
  },
  HRK: {
    code: 'HRK',
    name: 'Croatian Kuna',
    symbol: 'kn',
    decimals: 2,
    country: 'Croatia'
  },
  // Additional EU Currencies
  PLN: {
    code: 'PLN',
    name: 'Polish Zloty',
    symbol: 'zł',
    decimals: 2,
    country: 'Poland'
  },
  CZK: {
    code: 'CZK',
    name: 'Czech Koruna',
    symbol: 'Kč',
    decimals: 2,
    country: 'Czech Republic'
  },
  HUF: {
    code: 'HUF',
    name: 'Hungarian Forint',
    symbol: 'Ft',
    decimals: 0,
    country: 'Hungary'
  },
  // Middle East & Asia
  AED: {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    decimals: 2,
    country: 'United Arab Emirates'
  },
  QAR: {
    code: 'QAR',
    name: 'Qatari Riyal',
    symbol: 'ر.ق',
    decimals: 2,
    country: 'Qatar'
  },
  INR: {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    decimals: 2,
    country: 'India'
  },
  THB: {
    code: 'THB',
    name: 'Thai Baht',
    symbol: '฿',
    decimals: 2,
    country: 'Thailand'
  },
  MYR: {
    code: 'MYR',
    name: 'Malaysian Ringgit',
    symbol: 'RM',
    decimals: 2,
    country: 'Malaysia'
  }
};

export const SUPPORTED_COUNTRIES: Record<CountryCode, CountryInfo> = {
  // EU & European Countries (22 countries)
  AD: { code: 'AD', name: 'Andorra', ibanLength: 24, bicLength: 8, currency: ['EUR'], example: 'AD1200012030200359100100' },
  AT: { code: 'AT', name: 'Austria', ibanLength: 20, bicLength: 8, currency: ['EUR'], example: 'AT611904300234573201' },
  BE: { code: 'BE', name: 'Belgium', ibanLength: 16, bicLength: 8, currency: ['EUR'], example: 'BE68539007547034' },
  BG: { code: 'BG', name: 'Bulgaria', ibanLength: 22, bicLength: 8, currency: ['BGN'], example: 'BG80BNBG96611020345678' },
  CH: { code: 'CH', name: 'Switzerland', ibanLength: 21, bicLength: 8, currency: ['CHF'], example: 'CH9300762011623852957' },
  CY: { code: 'CY', name: 'Cyprus', ibanLength: 28, bicLength: 8, currency: ['EUR'], example: 'CY17002001280000001200527600' },
  CZ: { code: 'CZ', name: 'Czech Republic', ibanLength: 24, bicLength: 8, currency: ['CZK'], example: 'CZ6508000000192000145399' },
  DE: { code: 'DE', name: 'Germany', ibanLength: 22, bicLength: 8, currency: ['EUR'], example: 'DE89370400440532013000' },
  DK: { code: 'DK', name: 'Denmark', ibanLength: 18, bicLength: 8, currency: ['DKK'], example: 'DK5000400440116243' },
  EE: { code: 'EE', name: 'Estonia', ibanLength: 20, bicLength: 8, currency: ['EUR'], example: 'EE382200221020145685' },
  ES: { code: 'ES', name: 'Spain', ibanLength: 24, bicLength: 8, currency: ['EUR'], example: 'ES9121000418450200051332' },
  FI: { code: 'FI', name: 'Finland', ibanLength: 18, bicLength: 8, currency: ['EUR'], example: 'FI2112345600000785' },
  FR: { code: 'FR', name: 'France', ibanLength: 27, bicLength: 8, currency: ['EUR'], example: 'FR1420041010050500013M02606' },
  GB: { code: 'GB', name: 'United Kingdom', ibanLength: 22, bicLength: 8, currency: ['GBP'], example: 'GB29NWBK60161331926819' },
  GR: { code: 'GR', name: 'Greece', ibanLength: 27, bicLength: 8, currency: ['EUR'], example: 'GR1601101250000000012300695' },
  HR: { code: 'HR', name: 'Croatia', ibanLength: 21, bicLength: 8, currency: ['HRK'], example: 'HR1210010051863000160' },
  HU: { code: 'HU', name: 'Hungary', ibanLength: 28, bicLength: 8, currency: ['HUF'], example: 'HU42117730161111101800000000' },
  IE: { code: 'IE', name: 'Ireland', ibanLength: 22, bicLength: 8, currency: ['EUR'], example: 'IE29AIBK93115212345678' },
  IT: { code: 'IT', name: 'Italy', ibanLength: 27, bicLength: 8, currency: ['EUR'], example: 'IT60X0542811101000000123456' },
  LT: { code: 'LT', name: 'Lithuania', ibanLength: 20, bicLength: 8, currency: ['EUR'], example: 'LT121000011101001000' },
  LU: { code: 'LU', name: 'Luxembourg', ibanLength: 20, bicLength: 8, currency: ['EUR'], example: 'LU280019400644750000' },
  LV: { code: 'LV', name: 'Latvia', ibanLength: 21, bicLength: 8, currency: ['EUR'], example: 'LV80BANK0000435195001' },
  MC: { code: 'MC', name: 'Monaco', ibanLength: 27, bicLength: 8, currency: ['EUR'], example: 'MC5811222000010123456789030' },
  MT: { code: 'MT', name: 'Malta', ibanLength: 31, bicLength: 8, currency: ['EUR'], example: 'MT84MALT011000012345MTLCAST001S' },
  NL: { code: 'NL', name: 'Netherlands', ibanLength: 18, bicLength: 8, currency: ['EUR'], example: 'NL91ABNA0417164300' },
  NO: { code: 'NO', name: 'Norway', ibanLength: 15, bicLength: 8, currency: ['NOK'], example: 'NO9386011117947' },
  PL: { code: 'PL', name: 'Poland', ibanLength: 28, bicLength: 8, currency: ['PLN'], example: 'PL61109010140000071219812874' },
  PT: { code: 'PT', name: 'Portugal', ibanLength: 25, bicLength: 8, currency: ['EUR'], example: 'PT50000201231234567890154' },
  RO: { code: 'RO', name: 'Romania', ibanLength: 24, bicLength: 8, currency: ['RON'], example: 'RO49AAAA1B31007593840000' },
  SE: { code: 'SE', name: 'Sweden', ibanLength: 24, bicLength: 8, currency: ['SEK'], example: 'SE4550000000058398257466' },
  SI: { code: 'SI', name: 'Slovenia', ibanLength: 19, bicLength: 8, currency: ['EUR'], example: 'SI56263300012039086' },
  SK: { code: 'SK', name: 'Slovakia', ibanLength: 24, bicLength: 8, currency: ['EUR'], example: 'SK3112000000198742637541' },
  
  // Africa & Middle East (8 countries)
  EG: { code: 'EG', name: 'Egypt', ibanLength: 29, bicLength: 8, currency: ['EGP'], example: 'EG380019000500000000263180002' },
  MA: { code: 'MA', name: 'Morocco', ibanLength: 28, bicLength: 8, currency: ['MAD'], example: 'MA64011519000001205000534921' },
  ZA: { code: 'ZA', name: 'South Africa', ibanLength: 0, bicLength: 8, currency: ['ZAR'], example: 'SWIFT/BIC Required' },
  AE: { code: 'AE', name: 'United Arab Emirates', ibanLength: 23, bicLength: 8, currency: ['AED'], example: 'AE070331234567890123456' },
  QA: { code: 'QA', name: 'Qatar', ibanLength: 29, bicLength: 8, currency: ['QAR'], example: 'QA58DOHB00001234567890ABCDEFG' },
  BH: { code: 'BH', name: 'Bahrain', ibanLength: 22, bicLength: 8, currency: ['USD'], example: 'BH67BMAG00001299123456' },
  KW: { code: 'KW', name: 'Kuwait', ibanLength: 30, bicLength: 8, currency: ['USD'], example: 'KW81CBKU0000000000001234560101' },
  SA: { code: 'SA', name: 'Saudi Arabia', ibanLength: 24, bicLength: 8, currency: ['USD'], example: 'SA0380000000608010167519' },
  
  // South America (6 countries)
  BR: { code: 'BR', name: 'Brazil', ibanLength: 29, bicLength: 8, currency: ['BRL'], example: 'BR9700360305000010009795493P1' },
  AR: { code: 'AR', name: 'Argentina', ibanLength: 0, bicLength: 8, currency: ['ARS'], example: 'CBU Required' },
  CL: { code: 'CL', name: 'Chile', ibanLength: 0, bicLength: 8, currency: ['CLP'], example: 'RUT + Account Number' },
  CO: { code: 'CO', name: 'Colombia', ibanLength: 0, bicLength: 8, currency: ['COP'], example: 'SWIFT/BIC Required' },
  PE: { code: 'PE', name: 'Peru', ibanLength: 0, bicLength: 8, currency: ['PEN'], example: 'CCI Required' },
  UY: { code: 'UY', name: 'Uruguay', ibanLength: 0, bicLength: 8, currency: ['UYU'], example: 'SWIFT/BIC Required' },
  
  // Asia Pacific (7 countries)
  SG: { code: 'SG', name: 'Singapore', ibanLength: 0, bicLength: 8, currency: ['SGD'], example: 'SWIFT/BIC Required' },
  AU: { code: 'AU', name: 'Australia', ibanLength: 0, bicLength: 8, currency: ['AUD'], example: 'BSB + Account Number' },
  HK: { code: 'HK', name: 'Hong Kong', ibanLength: 0, bicLength: 8, currency: ['HKD'], example: 'SWIFT/BIC Required' },
  CN: { code: 'CN', name: 'China', ibanLength: 0, bicLength: 8, currency: ['CNY'], example: 'SWIFT/BIC Required' },
  IN: { code: 'IN', name: 'India', ibanLength: 0, bicLength: 8, currency: ['INR'], example: 'IFSC + Account Number' },
  TH: { code: 'TH', name: 'Thailand', ibanLength: 0, bicLength: 8, currency: ['THB'], example: 'SWIFT/BIC Required' },
  MY: { code: 'MY', name: 'Malaysia', ibanLength: 0, bicLength: 8, currency: ['MYR'], example: 'SWIFT/BIC Required' },
  
  // Less Regulated / Offshore (7 countries)
  VG: { code: 'VG', name: 'British Virgin Islands', ibanLength: 24, bicLength: 8, currency: ['USD'], example: 'VG96VPVG0000012345678901' },
  RU: { code: 'RU', name: 'Russia', ibanLength: 33, bicLength: 8, currency: ['RUB'], example: 'SWIFT/BIC Required' },
  BY: { code: 'BY', name: 'Belarus', ibanLength: 28, bicLength: 8, currency: ['USD'], example: 'BY13NBRB3600900000002Z00AB00' },
  KZ: { code: 'KZ', name: 'Kazakhstan', ibanLength: 20, bicLength: 8, currency: ['USD'], example: 'KZ86125KZT5004100100' },
  MU: { code: 'MU', name: 'Mauritius', ibanLength: 30, bicLength: 8, currency: ['USD'], example: 'MU17BOMM0101101030300200000MUR' },
  PA: { code: 'PA', name: 'Panama', ibanLength: 0, bicLength: 8, currency: ['USD'], example: 'SWIFT/BIC Required' },
  BS: { code: 'BS', name: 'Bahamas', ibanLength: 0, bicLength: 8, currency: ['USD'], example: 'SWIFT/BIC Required' }
};

export const BANK_NAMES = [
  'SecureBank International',
  'Global Trust Bank',
  'Continental Banking Corp',
  'European Financial Services',
  'Nordic Banking Group',
  'Atlantic Commerce Bank',
  'Metropolitan Trust',
  'International Finance Ltd',
  'Sovereign Banking Solutions',
  'United Commercial Bank'
];

export const TRANSACTION_FEES = {
  DOMESTIC: 0,
  INTERNATIONAL: 5.00,
  EXPRESS: 15.00,
  CURRENCY_CONVERSION: 0.025 // 2.5%
};

export const SECURITY_LEVELS = {
  STANDARD: {
    name: 'Standard',
    description: 'Basic security features',
    dailyLimit: 10000,
    monthlyLimit: 50000
  },
  HIGH: {
    name: 'High',
    description: 'Enhanced security with 2FA',
    dailyLimit: 25000,
    monthlyLimit: 100000
  },
  MAXIMUM: {
    name: 'Maximum',
    description: 'Military-grade encryption',
    dailyLimit: 100000,
    monthlyLimit: 500000
  }
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  ACCOUNTS: {
    LIST: '/api/accounts',
    CREATE: '/api/accounts/create',
    DETAILS: '/api/accounts/:id'
  },
  TRANSACTIONS: {
    LIST: '/api/transactions',
    CREATE: '/api/transactions/transfer',
    DETAILS: '/api/transactions/:id'
  },
  UTILITIES: {
    VALIDATE_IBAN: '/api/utils/validate-iban',
    GENERATE_IBAN: '/api/utils/generate-iban',
    EXCHANGE_RATES: '/api/utils/exchange-rates'
  }
}; 