'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  GlobeAltIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { formatCurrency } from '@/lib/utils';
import { SUPPORTED_CURRENCIES } from '@/lib/constants';

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  securityLevel: 'HIGH' as const,
};

const senderAccount = {
  id: 'sender-1',
  accountNumber: '****1234',
  iban: 'DE89370400440532013000',
  bic: 'COBADEFFXXX',
  currency: 'EUR',
  balance: 50000.00,
  bankName: 'SecureBank International',
  accountHolder: 'John Doe',
  bankCountry: 'Germany',
  bankAddress: 'Hauptstraße 123, 10115 Berlin, Germany',
};

// Non-IBAN countries requiring SWIFT transfers
const swiftCountries = [
  {
    code: 'SG',
    name: 'Singapore',
    currency: 'SGD',
    accountFormat: 'Bank Code + Account Number',
    example: '7171-012345678',
    routingInfo: 'Bank Code (4 digits) + Account Number',
    majorBanks: ['DBS Bank', 'OCBC Bank', 'UOB Bank', 'Standard Chartered Singapore'],
  },
  {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    accountFormat: 'BSB + Account Number',
    example: '062-000-12345678',
    routingInfo: 'BSB Code (6 digits) + Account Number',
    majorBanks: ['Commonwealth Bank', 'Westpac', 'ANZ Bank', 'NAB'],
  },
  {
    code: 'HK',
    name: 'Hong Kong',
    currency: 'HKD',
    accountFormat: 'Bank Code + Account Number',
    example: '004-123456-001',
    routingInfo: 'Bank Code + Account Number + Branch Code',
    majorBanks: ['HSBC Hong Kong', 'Bank of China (Hong Kong)', 'Standard Chartered Hong Kong'],
  },
  {
    code: 'CN',
    name: 'China',
    currency: 'CNY',
    accountFormat: 'Bank Account Number (19 digits)',
    example: '1234567890123456789',
    routingInfo: 'SWIFT Code + Bank Account Number',
    majorBanks: ['Industrial and Commercial Bank of China', 'China Construction Bank', 'Agricultural Bank of China'],
  },
];

export default function SwiftTransferPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientCountry: 'SG',
    bankName: '',
    swiftCode: '',
    accountNumber: '',
    routingCode: '',
    amount: '',
    currency: 'SGD',
    purpose: '',
    description: '',
    recipientAddress: '',
    recipientCity: '',
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Review, 3: Confirmation

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Auto-update currency when country changes
    if (name === 'recipientCountry') {
      const country = swiftCountries.find(c => c.code === value);
      if (country) {
        setFormData(prev => ({ ...prev, currency: country.currency }));
      }
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.recipientName) errors.recipientName = 'Recipient name is required';
    if (!formData.bankName) errors.bankName = 'Bank name is required';
    if (!formData.swiftCode) errors.swiftCode = 'SWIFT/BIC code is required';
    if (!formData.accountNumber) errors.accountNumber = 'Account number is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) errors.amount = 'Valid amount is required';
    if (!formData.purpose) errors.purpose = 'Payment purpose is required';
    
    if (parseFloat(formData.amount || '0') > senderAccount.balance) {
      errors.amount = 'Insufficient funds';
    }
    
    // SWIFT code validation (8 or 11 characters)
    if (formData.swiftCode && !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(formData.swiftCode.toUpperCase())) {
      errors.swiftCode = 'Invalid SWIFT/BIC format (e.g., DBSSSGSG)';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStep(2);
  };

  const confirmTransfer = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 3000);
  };

  const handleLogout = () => {
    router.push('/');
  };

  const selectedCountry = swiftCountries.find(c => c.code === formData.recipientCountry);
  const transferFee = 25.00; // Higher fee for SWIFT transfers
  const totalAmount = parseFloat(formData.amount || '0') + transferFee;

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Header user={mockUser} onLogout={handleLogout} />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircleIcon className="w-12 h-12 text-white" />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">SWIFT Transfer Sent Successfully! 🌏</h1>
              <p className="text-xl text-gray-600">Your international SWIFT transfer has been processed</p>
            </div>
            
            <Card className="max-w-lg mx-auto bg-white border-0 shadow-xl">
              <CardContent className="p-8 text-center space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Amount Sent</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(parseFloat(formData.amount), formData.currency)}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recipient</span>
                    <span className="font-semibold text-gray-900">{formData.recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank</span>
                    <span className="text-gray-900">{formData.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">SWIFT Code</span>
                    <span className="font-mono text-gray-900">{formData.swiftCode.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Country</span>
                    <span className="text-gray-900">{selectedCountry?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-gray-900">SWIFT-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Sent via SWIFT Network
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="text-gray-900">1-3 Business Days</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <BuildingOfficeIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">
                        SWIFT Network Confirmation
                      </h4>
                      <p className="text-xs text-blue-800">
                        The recipient's bank will receive payment via the SWIFT network showing sender: "{senderAccount.accountHolder}" 
                        from {senderAccount.bankName}, {senderAccount.bankCountry}. Standard SWIFT processing applies.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  setStep(1);
                  setFormData({
                    recipientName: '',
                    recipientCountry: 'SG',
                    bankName: '',
                    swiftCode: '',
                    accountNumber: '',
                    routingCode: '',
                    amount: '',
                    currency: 'SGD',
                    purpose: '',
                    description: '',
                    recipientAddress: '',
                    recipientCity: '',
                  });
                  setValidationErrors({});
                }} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <GlobeAltIcon className="w-5 h-5 mr-2" />
                Send Another SWIFT Transfer
              </Button>
              <Button 
                onClick={() => router.push('/dashboard')} 
                variant="outline"
                className="border-2"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header user={mockUser} onLogout={handleLogout} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Review SWIFT Transfer</h1>
            <p className="text-gray-600 mt-2">Verify all transfer details before sending via SWIFT network</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <GlobeAltIcon className="w-6 h-6 mr-3 text-blue-600" />
                    SWIFT Transfer Details
                  </CardTitle>
                  <CardDescription>International wire transfer via SWIFT network</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <BuildingOfficeIcon className="w-4 h-4 mr-2 text-red-500" />
                        Sender (Your Account)
                      </h3>
                      <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-100">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600">
                              <AvatarFallback className="text-white font-semibold text-sm">
                                {senderAccount.currency}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{senderAccount.accountHolder}</p>
                              <p className="text-sm text-gray-600">{senderAccount.bankName}</p>
                              <p className="text-sm text-gray-600 font-mono">{senderAccount.iban}</p>
                              <p className="text-xs text-gray-500">SWIFT: {senderAccount.bic}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
                        Recipient ({selectedCountry?.name})
                      </h3>
                      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600">
                              <AvatarFallback className="text-white font-semibold text-sm">
                                {formData.currency}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{formData.recipientName}</p>
                              <p className="text-sm text-gray-600">{formData.bankName}</p>
                              <p className="text-sm text-gray-600 font-mono">Account: {formData.accountNumber}</p>
                              <p className="text-xs text-gray-500">SWIFT: {formData.swiftCode.toUpperCase()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Transfer Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Transfer Amount</span>
                        <span className="font-bold text-lg">{formatCurrency(parseFloat(formData.amount), formData.currency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">SWIFT Transfer Fee</span>
                        <span className="font-semibold">{formatCurrency(transferFee, senderAccount.currency)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Debit</span>
                        <span className="text-blue-600">{formatCurrency(totalAmount, senderAccount.currency)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Transfer Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Purpose:</span>
                        <p className="font-medium mt-1">{formData.purpose}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Transfer Type:</span>
                        <p className="font-medium mt-1">SWIFT Wire Transfer</p>
                      </div>
                      {formData.description && (
                        <div className="sm:col-span-2">
                          <span className="text-gray-600">Description:</span>
                          <p className="font-medium mt-1">{formData.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-600" />
                    SWIFT Network Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {[
                      'SWIFT Code Verified',
                      'Account Details Validated',
                      'Anti-Money Laundering Check',
                      'International Compliance Met',
                      'Secure Network Transmission'
                    ].map((check, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircleIcon className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{check}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-900">Ready to Send</span>
                    </div>
                    <p className="text-sm text-green-800">
                      Your SWIFT transfer is ready for secure international transmission.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <GlobeAltIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">SWIFT Network</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Transfer will be processed through the global SWIFT network with full sender identification.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={confirmTransfer} 
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing SWIFT Transfer...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <GlobeAltIcon className="w-5 w-5" />
                          <span>Send via SWIFT</span>
                        </div>
                      )}
                    </Button>
                    <Button 
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="w-full border-2"
                    >
                      Back to Edit
                    </Button>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header user={mockUser} onLogout={handleLogout} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">SWIFT International Transfer 🌏</h1>
          <p className="text-gray-600 mt-2">Send money to non-IBAN countries via SWIFT network</p>
        </div>

        {/* Country Selection */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Select Destination Country</CardTitle>
            <CardDescription>Choose the country for your SWIFT transfer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {swiftCountries.map((country) => (
                <Card 
                  key={country.code}
                  className={`cursor-pointer transition-all ${
                    formData.recipientCountry === country.code
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    recipientCountry: country.code,
                    currency: country.currency 
                  }))}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{country.code}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{country.name}</h3>
                    <Badge variant="outline" className="mb-2">
                      {country.currency}
                    </Badge>
                    <p className="text-sm text-gray-600">{country.accountFormat}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <GlobeAltIcon className="w-6 h-6 mr-3 text-blue-600" />
                  SWIFT Transfer Details
                </CardTitle>
                <CardDescription>
                  Enter recipient and transfer information for {selectedCountry?.name}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Recipient Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Recipient Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Recipient Name</label>
                        <Input
                          name="recipientName"
                          value={formData.recipientName}
                          onChange={handleInputChange}
                          placeholder="Full name as per bank records"
                          className="h-12"
                          required
                        />
                        {validationErrors.recipientName && (
                          <p className="text-sm text-red-600 mt-1">{validationErrors.recipientName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Recipient City</label>
                        <Input
                          name="recipientCity"
                          value={formData.recipientCity}
                          onChange={handleInputChange}
                          placeholder="City where recipient is located"
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bank Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Bank Information</h3>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Bank Name</label>
                      <Input
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        placeholder={selectedCountry?.majorBanks[0] || "Enter bank name"}
                        className="h-12"
                        required
                      />
                      {validationErrors.bankName && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.bankName}</p>
                      )}
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Popular banks in {selectedCountry?.name}:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedCountry?.majorBanks.map((bank) => (
                            <Button
                              key={bank}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setFormData(prev => ({ ...prev, bankName: bank }))}
                              className="text-xs"
                            >
                              {bank}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">SWIFT/BIC Code</label>
                        <Input
                          name="swiftCode"
                          value={formData.swiftCode}
                          onChange={handleInputChange}
                          placeholder="e.g., DBSSSGSG"
                          className="h-12"
                          maxLength={11}
                          style={{ textTransform: 'uppercase' }}
                          required
                        />
                        {validationErrors.swiftCode && (
                          <p className="text-sm text-red-600 mt-1">{validationErrors.swiftCode}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">8 or 11 character SWIFT code</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                          {selectedCountry?.accountFormat}
                        </label>
                        <Input
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleInputChange}
                          placeholder={selectedCountry?.example}
                          className="h-12"
                          required
                        />
                        {validationErrors.accountNumber && (
                          <p className="text-sm text-red-600 mt-1">{validationErrors.accountNumber}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">{selectedCountry?.routingInfo}</p>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Amount */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Transfer Amount</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Amount</label>
                        <Input
                          name="amount"
                          type="number"
                          step="0.01"
                          min="0.01"
                          value={formData.amount}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          className="h-12"
                          required
                        />
                        {validationErrors.amount && (
                          <p className="text-sm text-red-600 mt-1">{validationErrors.amount}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Currency</label>
                        <select
                          name="currency"
                          value={formData.currency}
                          onChange={handleInputChange}
                          className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value={selectedCountry?.currency}>
                            {selectedCountry?.currency} - {SUPPORTED_CURRENCIES[selectedCountry?.currency as keyof typeof SUPPORTED_CURRENCIES]?.symbol}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Purpose */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Transfer Purpose</h3>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Purpose of Transfer</label>
                      <Input
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        placeholder="e.g., Payment for goods, Services, Investment"
                        className="h-12"
                        required
                      />
                      {validationErrors.purpose && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.purpose}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">Required for regulatory compliance</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Additional Details (Optional)</label>
                      <Input
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Additional transfer details..."
                        className="h-12"
                      />
                      <p className="text-sm text-gray-500 mt-1">Internal reference for your records</p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold"
                  >
                    <ArrowRightIcon className="w-5 h-5 mr-2" />
                    Review SWIFT Transfer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Information Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {selectedCountry && (
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
                    {selectedCountry.name} Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-2">Account Format</h4>
                    <p className="text-sm text-blue-800 mb-2">{selectedCountry.accountFormat}</p>
                    <p className="text-sm text-blue-700 font-mono">{selectedCountry.example}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Transfer Details</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Currency:</span>
                        <span className="font-semibold">{selectedCountry.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Network:</span>
                        <span className="font-semibold">SWIFT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing:</span>
                        <span className="font-semibold">1-3 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fee:</span>
                        <span className="font-semibold">{formatCurrency(transferFee)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-yellow-900">
                  <InformationCircleIcon className="w-5 h-5 mr-2" />
                  SWIFT Network
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-yellow-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-yellow-600" />
                    <span>Global banking network</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-yellow-600" />
                    <span>Secure message transmission</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-yellow-600" />
                    <span>Full sender identification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-yellow-600" />
                    <span>International compliance</span>
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
