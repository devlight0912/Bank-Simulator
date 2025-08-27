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
  }
};

export const SUPPORTED_COUNTRIES: Record<CountryCode, CountryInfo> = {
  AD: { code: 'AD', name: 'Andorra', ibanLength: 24, bicLength: 8, currency: ['EUR'], example: 'AD1200012030200359100100' },
  AE: { code: 'AE', name: 'United Arab Emirates', ibanLength: 23, bicLength: 8, currency: ['USD'], example: 'AE070331234567890123456' },
  AL: { code: 'AL', name: 'Albania', ibanLength: 28, bicLength: 8, currency: ['EUR'], example: 'AL47212110090000000235698741' },
  AT: { code: 'AT', name: 'Austria', ibanLength: 20, bicLength: 8, currency: ['EUR'], example: 'AT611904300234573201' },
  AZ: { code: 'AZ', name: 'Azerbaijan', ibanLength: 28, bicLength: 8, currency: ['USD'], example: 'AZ21NABZ00000000137010001944' },
  BA: { code: 'BA', name: 'Bosnia and Herzegovina', ibanLength: 20, bicLength: 8, currency: ['EUR'], example: 'BA391290079401028494' },
  BE: { code: 'BE', name: 'Belgium', ibanLength: 16, bicLength: 8, currency: ['EUR'], example: 'BE68539007547034' },
  BG: { code: 'BG', name: 'Bulgaria', ibanLength: 22, bicLength: 8, currency: ['EUR'], example: 'BG80BNBG96611020345678' },
  BH: { code: 'BH', name: 'Bahrain', ibanLength: 22, bicLength: 8, currency: ['USD'], example: 'BH67BMAG00001299123456' },
  BR: { code: 'BR', name: 'Brazil', ibanLength: 29, bicLength: 8, currency: ['USD'], example: 'BR9700360305000010009795493P1' },
  BY: { code: 'BY', name: 'Belarus', ibanLength: 28, bicLength: 8, currency: ['USD'], example: 'BY13NBRB3600900000002Z00AB00' },
  CH: { code: 'CH', name: 'Switzerland', ibanLength: 21, bicLength: 8, currency: ['CHF'], example: 'CH9300762011623852957' },
  CR: { code: 'CR', name: 'Costa Rica', ibanLength: 22, bicLength: 8, currency: ['USD'], example: 'CR05015202001026284066' },
  CY: { code: 'CY', name: 'Cyprus', ibanLength: 28, bicLength: 8, currency: ['EUR'], example: 'CY17002001280000001200527600' },
  CZ: { code: 'CZ', name: 'Czech Republic', ibanLength: 24, bicLength: 8, currency: ['EUR'], example: 'CZ6508000000192000145399' },
  DE: { code: 'DE', name: 'Germany', ibanLength: 22, bicLength: 8, currency: ['EUR'], example: 'DE89370400440532013000' },
  DK: { code: 'DK', name: 'Denmark', ibanLength: 18, bicLength: 8, currency: ['DKK'], example: 'DK5000400440116243' },
  DO: { code: 'DO', name: 'Dominican Republic', ibanLength: 28, bicLength: 8, currency: ['USD'], example: 'DO28BAGR00000001212453611324' },
  EE: { code: 'EE', name: 'Estonia', ibanLength: 20, bicLength: 8, currency: ['EUR'], example: 'EE382200221020145685' },
  EG: { code: 'EG', name: 'Egypt', ibanLength: 29, bicLength: 8, currency: ['USD'], example: 'EG380019000500000000263180002' },
  ES: { code: 'ES', name: 'Spain', ibanLength: 24, bicLength: 8, currency: ['EUR'], example: 'ES9121000418450200051332' },
  FI: { code: 'FI', name: 'Finland', ibanLength: 18, bicLength: 8, currency: ['EUR'], example: 'FI2112345600000785' },
  FO: { code: 'FO', name: 'Faroe Islands', ibanLength: 18, bicLength: 8, currency: ['DKK'], example: 'FO6264600001631634' },
  FR: { code: 'FR', name: 'France', ibanLength: 27, bicLength: 8, currency: ['EUR'], example: 'FR1420041010050500013M02606' },
  GB: { code: 'GB', name: 'United Kingdom', ibanLength: 22, bicLength: 8, currency: ['GBP'], example: 'GB29NWBK60161331926819' },
  GE: { code: 'GE', name: 'Georgia', ibanLength: 22, bicLength: 8, currency: ['USD'], example: 'GE29NB0000000101904917' },
  GI: { code: 'GI', name: 'Gibraltar', ibanLength: 23, bicLength: 8, currency: ['GBP'], example: 'GI75NWBK000000007099453' },
  GL: { code: 'GL', name: 'Greenland', ibanLength: 18, bicLength: 8, currency: ['DKK'], example: 'GL8964710001000206' },
  GR: { code: 'GR', name: 'Greece', ibanLength: 27, bicLength: 8, currency: ['EUR'], example: 'GR1601101250000000012300695' },
  GT: { code: 'GT', name: 'Guatemala', ibanLength: 28, bicLength: 8, currency: ['USD'], example: 'GT82TRAJ01020000001210029690' },
  HR: { code: 'HR', name: 'Croatia', ibanLength: 21, bicLength: 8, currency: ['EUR'], example: 'HR1210010051863000160' },
  HU: { code: 'HU', name: 'Hungary', ibanLength: 28, bicLength: 8, currency: ['EUR'], example: 'HU42117730161111101800000000' },
  IE: { code: 'IE', name: 'Ireland', ibanLength: 22, bicLength: 8, currency: ['EUR'], example: 'IE29AIBK93115212345678' },
  IL: { code: 'IL', name: 'Israel', ibanLength: 23, bicLength: 8, currency: ['USD'], example: 'IL620108000000099999999' },
  IS: { code: 'IS', name: 'Iceland', ibanLength: 26, bicLength: 8, currency: ['USD'], example: 'IS140159260076545510730339' },
  IT: { code: 'IT', name: 'Italy', ibanLength: 27, bicLength: 8, currency: ['EUR'], example: 'IT60X0542811101000000123456' },
  JO: { code: 'JO', name: 'Jordan', ibanLength: 30, bicLength: 8, currency: ['USD'], example: 'JO94CBJO0010000000000131000302' },
  KW: { code: 'KW', name: 'Kuwait', ibanLength: 30, bicLength: 8, currency: ['USD'], example: 'KW81CBKU0000000000001234560101' },
  KZ: { code: 'KZ', name: 'Kazakhstan', ibanLength: 20, bicLength: 8, currency: ['USD'], example: 'KZ86125KZT5004100100' },
  LB: { code: 'LB', name: 'Lebanon', ibanLength: 28, bicLength: 8, currency: ['USD'], example: 'LB62099900000001001901229114' },
  LC: { code: 'LC', name: 'Saint Lucia', ibanLength: 32, bicLength: 8, currency: ['USD'], example: 'LC55HEMM000100010012001200023015' },
  LI: { code: 'LI', name: 'Liechtenstein', ibanLength: 21, bicLength: 8, currency: ['CHF'], example: 'LI21088100002324013AA' },
  LT: { code: 'LT', name: 'Lithuania', ibanLength: 20, bicLength: 8, currency: ['EUR'], example: 'LT121000011101001000' },
  LU: { code: 'LU', name: 'Luxembourg', ibanLength: 20, bicLength: 8, currency: ['EUR'], example: 'LU280019400644750000' },
  LV: { code: 'LV', name: 'Latvia', ibanLength: 21, bicLength: 8, currency: ['EUR'], example: 'LV80BANK0000435195001' },
  MC: { code: 'MC', name: 'Monaco', ibanLength: 27, bicLength: 8, currency: ['EUR'], example: 'MC5811222000010123456789030' },
  MD: { code: 'MD', name: 'Moldova', ibanLength: 24, bicLength: 8, currency: ['USD'], example: 'MD24AG000225100013104168' },
  ME: { code: 'ME', name: 'Montenegro', ibanLength: 22, bicLength: 8, currency: ['EUR'], example: 'ME25505000012345678951' },
  MK: { code: 'MK', name: 'North Macedonia', ibanLength: 19, bicLength: 8, currency: ['EUR'], example: 'MK07250120000058984' },
  MR: { code: 'MR', name: 'Mauritania', ibanLength: 27, bicLength: 8, currency: ['USD'], example: 'MR1300020001010000123456753' },
  MT: { code: 'MT', name: 'Malta', ibanLength: 31, bicLength: 8, currency: ['EUR'], example: 'MT84MALT011000012345MTLCAST001S' },
  MU: { code: 'MU', name: 'Mauritius', ibanLength: 30, bicLength: 8, currency: ['USD'], example: 'MU17BOMM0101101030300200000MUR' },
  NL: { code: 'NL', name: 'Netherlands', ibanLength: 18, bicLength: 8, currency: ['EUR'], example: 'NL91ABNA0417164300' },
  NO: { code: 'NO', name: 'Norway', ibanLength: 15, bicLength: 8, currency: ['NOK'], example: 'NO9386011117947' },
  PK: { code: 'PK', name: 'Pakistan', ibanLength: 24, bicLength: 8, currency: ['USD'], example: 'PK36SCBL0000001123456702' },
  PL: { code: 'PL', name: 'Poland', ibanLength: 28, bicLength: 8, currency: ['EUR'], example: 'PL61109010140000071219812874' },
  PS: { code: 'PS', name: 'Palestine', ibanLength: 29, bicLength: 8, currency: ['USD'], example: 'PS92PALS000000000400123456702' },
  PT: { code: 'PT', name: 'Portugal', ibanLength: 25, bicLength: 8, currency: ['EUR'], example: 'PT50000201231234567890154' },
  QA: { code: 'QA', name: 'Qatar', ibanLength: 29, bicLength: 8, currency: ['USD'], example: 'QA58DOHB00001234567890ABCDEFG' },
  RO: { code: 'RO', name: 'Romania', ibanLength: 24, bicLength: 8, currency: ['EUR'], example: 'RO49AAAA1B31007593840000' },
  RS: { code: 'RS', name: 'Serbia', ibanLength: 22, bicLength: 8, currency: ['EUR'], example: 'RS35260005601001611379' },
  SA: { code: 'SA', name: 'Saudi Arabia', ibanLength: 24, bicLength: 8, currency: ['USD'], example: 'SA0380000000608010167519' },
  SE: { code: 'SE', name: 'Sweden', ibanLength: 24, bicLength: 8, currency: ['SEK'], example: 'SE4550000000058398257466' },
  SI: { code: 'SI', name: 'Slovenia', ibanLength: 19, bicLength: 8, currency: ['EUR'], example: 'SI56263300012039086' },
  SK: { code: 'SK', name: 'Slovakia', ibanLength: 24, bicLength: 8, currency: ['EUR'], example: 'SK3112000000198742637541' },
  SM: { code: 'SM', name: 'San Marino', ibanLength: 27, bicLength: 8, currency: ['EUR'], example: 'SM86U0322509800000000270100' },
  TN: { code: 'TN', name: 'Tunisia', ibanLength: 24, bicLength: 8, currency: ['USD'], example: 'TN5910006035183598478831' },
  TR: { code: 'TR', name: 'Turkey', ibanLength: 26, bicLength: 8, currency: ['USD'], example: 'TR330006100519786457841326' },
  UA: { code: 'UA', name: 'Ukraine', ibanLength: 29, bicLength: 8, currency: ['USD'], example: 'UA213996220000026007233566001' },
  VG: { code: 'VG', name: 'British Virgin Islands', ibanLength: 24, bicLength: 8, currency: ['USD'], example: 'VG96VPVG0000012345678901' },
  XK: { code: 'XK', name: 'Kosovo', ibanLength: 20, bicLength: 8, currency: ['EUR'], example: 'XK051212012345678906' },
  SG: { code: 'SG', name: 'Singapore', ibanLength: 0, bicLength: 8, currency: ['SGD'], example: 'SWIFT/BIC Required' },
  AU: { code: 'AU', name: 'Australia', ibanLength: 0, bicLength: 8, currency: ['AUD'], example: 'BSB + Account Number' },
  HK: { code: 'HK', name: 'Hong Kong', ibanLength: 0, bicLength: 8, currency: ['HKD'], example: 'SWIFT/BIC Required' },
  CN: { code: 'CN', name: 'China', ibanLength: 0, bicLength: 8, currency: ['CNY'], example: 'SWIFT/BIC Required' }
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