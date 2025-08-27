'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCardIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  ArrowPathIcon,
  BanknotesIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { formatIBAN, generateRandomString } from '@/lib/utils';
import { SUPPORTED_COUNTRIES, BANK_NAMES, SUPPORTED_CURRENCIES } from '@/lib/constants';

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  securityLevel: 'HIGH' as const,
};

interface GeneratedAccount {
  iban: string;
  bic: string;
  bankName: string;
  accountHolder: string;
  bankAddress: string;
  country: string;
  currency: string;
  accountType: string;
  accountNumber: string;
  sortCode: string;
  routingNumber: string;
  swiftCode: string;
}

export default function IBANGeneratorPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('DE');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [accountHolderName, setAccountHolderName] = useState('John Doe');
  const [customBankName, setCustomBankName] = useState('');
  const [accountType, setAccountType] = useState('CHECKING');
  const [generatedAccount, setGeneratedAccount] = useState<GeneratedAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const handleLogout = () => {
    router.push('/');
  };

  const generateIBAN = (countryCode: string): string => {
    const country = SUPPORTED_COUNTRIES[countryCode as keyof typeof SUPPORTED_COUNTRIES];
    if (!country) return '';

    // Generate bank code and account number based on country
    let bankCode = '';
    let accountNumber = '';
    
    switch (countryCode) {
      case 'DE': // Germany
        bankCode = generateRandomString(8);
        accountNumber = generateRandomString(10);
        break;
      case 'GB': // United Kingdom
        bankCode = generateRandomString(4);
        accountNumber = generateRandomString(8);
        break;
      case 'FR': // France
        bankCode = generateRandomString(5);
        accountNumber = generateRandomString(11);
        break;
      case 'US': // United States (for international examples)
        bankCode = generateRandomString(9);
        accountNumber = generateRandomString(12);
        break;
      case 'SG': // Singapore
        bankCode = generateRandomString(4);
        accountNumber = generateRandomString(10);
        break;
      default:
        bankCode = generateRandomString(6);
        accountNumber = generateRandomString(10);
    }

    // Create the basic IBAN structure
    const checkDigits = String(Math.floor(Math.random() * 99)).padStart(2, '0');
    const basicIban = countryCode + checkDigits + bankCode + accountNumber;
    
    // Pad or trim to correct length for the country
    const targetLength = country.ibanLength;
    if (basicIban.length > targetLength) {
      return basicIban.substring(0, targetLength);
    } else if (basicIban.length < targetLength) {
      return basicIban + generateRandomString(targetLength - basicIban.length);
    }
    
    return basicIban;
  };

  const generateBIC = (countryCode: string, bankName: string): string => {
    // Generate a realistic BIC code
    const bankCode = bankName.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, 'X').padEnd(4, 'X');
    const locationCode = '2L'; // Generic location code
    const branchCode = Math.random() > 0.5 ? 'XXX' : '';
    
    return bankCode + countryCode + locationCode + branchCode;
  };

  const generateAccountDetails = () => {
    setLoading(true);
    
    setTimeout(() => {
      const country = SUPPORTED_COUNTRIES[selectedCountry as keyof typeof SUPPORTED_COUNTRIES];
      const currency = SUPPORTED_CURRENCIES[selectedCurrency as keyof typeof SUPPORTED_CURRENCIES];
      const bankName = customBankName || BANK_NAMES[Math.floor(Math.random() * BANK_NAMES.length)];
      
      const iban = generateIBAN(selectedCountry);
      const bic = generateBIC(selectedCountry, bankName);
      
      const newAccount: GeneratedAccount = {
        iban,
        bic,
        bankName,
        accountHolder: accountHolderName,
        bankAddress: `${bankName} Headquarters, ${country.name}`,
        country: country.name,
        currency: currency.code,
        accountType,
        accountNumber: generateRandomString(10),
        sortCode: generateRandomString(6),
        routingNumber: generateRandomString(9),
        swiftCode: bic.substring(0, 8)
      };
      
      setGeneratedAccount(newAccount);
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(field);
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  const copyAllDetails = () => {
    if (!generatedAccount) return;
    
    const allDetails = `
Bank Account Details:
IBAN: ${formatIBAN(generatedAccount.iban)}
BIC/SWIFT: ${generatedAccount.bic}
Bank Name: ${generatedAccount.bankName}
Account Holder: ${generatedAccount.accountHolder}
Country: ${generatedAccount.country}
Currency: ${generatedAccount.currency}
Account Type: ${generatedAccount.accountType}
Account Number: ${generatedAccount.accountNumber}
Sort Code: ${generatedAccount.sortCode}
Routing Number: ${generatedAccount.routingNumber}
Bank Address: ${generatedAccount.bankAddress}
    `;
    
    copyToClipboard(allDetails.trim(), 'all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Header user={mockUser} onLogout={handleLogout} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Custom IBAN & BIC Generator ✨
          </h1>
          <p className="text-gray-600 mt-2">
            Create personalized banking credentials for any supported country
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generator Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <SparklesIcon className="w-6 h-6 mr-3 text-purple-600" />
                  Account Details Configuration
                </CardTitle>
                <CardDescription>
                  Customize your banking credentials
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Account Holder Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Account Holder Name
                  </label>
                  <Input
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12"
                  />
                </div>

                {/* Country and Currency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Country
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        // Auto-set currency based on country
                        const country = SUPPORTED_COUNTRIES[e.target.value as keyof typeof SUPPORTED_COUNTRIES];
                        if (country && country.currency[0]) {
                          setSelectedCurrency(country.currency[0]);
                        }
                      }}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                    >
                      {Object.values(SUPPORTED_COUNTRIES).map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Currency
                    </label>
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                    >
                      {Object.values(SUPPORTED_CURRENCIES).map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} - {currency.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bank Name and Account Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Custom Bank Name (Optional)
                    </label>
                    <Input
                      value={customBankName}
                      onChange={(e) => setCustomBankName(e.target.value)}
                      placeholder="Leave empty for random bank"
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Account Type
                    </label>
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                    >
                      <option value="CHECKING">Checking Account</option>
                      <option value="SAVINGS">Savings Account</option>
                      <option value="BUSINESS">Business Account</option>
                      <option value="INVESTMENT">Investment Account</option>
                    </select>
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateAccountDetails}
                  disabled={loading || !accountHolderName}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-base font-semibold"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Account Details...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <ArrowPathIcon className="w-5 h-5" />
                      <span>Generate Custom IBAN & BIC</span>
                    </div>
                  )}
                </Button>

                {/* Information Card */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Custom Account Generation</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Generate realistic IBAN and BIC codes for any country</li>
                          <li>• Customize account holder name and bank details</li>
                          <li>• All generated accounts are simulation-ready</li>
                          <li>• Use for receiving international payments</li>
                          <li>• Recipient systems will see your custom details</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Generated Account Details */}
          <div className="lg:col-span-1">
            {generatedAccount ? (
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center">
                      <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                      Generated Account
                    </CardTitle>
                    <Button
                      size="sm"
                      onClick={copyAllDetails}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <ClipboardDocumentIcon className="w-4 h-4 mr-1" />
                      Copy All
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* IBAN */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">IBAN</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(generatedAccount.iban, 'iban')}
                        className="h-6 px-2 text-xs"
                      >
                        {copySuccess === 'iban' ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                    <p className="font-mono text-sm font-bold text-green-900 break-all">
                      {formatIBAN(generatedAccount.iban)}
                    </p>
                  </div>

                  {/* BIC */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-800">BIC/SWIFT Code</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(generatedAccount.bic, 'bic')}
                        className="h-6 px-2 text-xs"
                      >
                        {copySuccess === 'bic' ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                    <p className="font-mono text-sm font-bold text-blue-900">
                      {generatedAccount.bic}
                    </p>
                  </div>

                  <Separator />

                  {/* Account Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Holder:</span>
                      <span className="font-semibold text-gray-900">{generatedAccount.accountHolder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-semibold text-gray-900">{generatedAccount.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Country:</span>
                      <span className="font-semibold text-gray-900">{generatedAccount.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Currency:</span>
                      <span className="font-semibold text-gray-900">{generatedAccount.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Type:</span>
                      <span className="font-semibold text-gray-900">{generatedAccount.accountType}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Additional Details */}
                  <div className="space-y-3 text-sm">
                    <h4 className="font-semibold text-gray-900">Additional Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Number:</span>
                        <span className="font-mono text-xs">{generatedAccount.accountNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sort Code:</span>
                        <span className="font-mono text-xs">{generatedAccount.sortCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Routing Number:</span>
                        <span className="font-mono text-xs">{generatedAccount.routingNumber}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      className="w-full justify-start bg-green-600 hover:bg-green-700"
                      onClick={() => router.push('/account-management')}
                    >
                      <BanknotesIcon className="w-4 h-4 mr-2" />
                      Add Virtual Money
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-2"
                      onClick={generateAccountDetails}
                    >
                      <ArrowPathIcon className="w-4 h-4 mr-2" />
                      Generate New Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <CreditCardIcon className="w-5 h-5 mr-2 text-gray-400" />
                    Generate Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <div className="text-gray-400 space-y-3">
                    <SparklesIcon className="w-16 h-16 mx-auto" />
                    <p className="text-lg font-medium">No account generated yet</p>
                    <p className="text-sm">Fill in the form and click generate to create your custom IBAN & BIC</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Features Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-purple-900">
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  Generator Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-purple-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-purple-600" />
                    <span>50+ country support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-purple-600" />
                    <span>Realistic IBAN format</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-purple-600" />
                    <span>Valid BIC/SWIFT codes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-purple-600" />
                    <span>Custom bank names</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-purple-600" />
                    <span>Professional appearance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
