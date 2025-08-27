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
  CreditCardIcon,
  BuildingOfficeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon
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

const paymentProviders = [
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '💳',
    description: 'Global digital payment platform',
    acceptedCurrencies: ['USD', 'EUR', 'GBP'],
    fees: 2.9,
    processingTime: 'Instant',
    accountTypes: ['Personal', 'Business'],
    bgColor: 'from-blue-500 to-blue-600',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: '💰',
    description: 'Online payment processing',
    acceptedCurrencies: ['USD', 'EUR', 'GBP', 'CAD'],
    fees: 2.9,
    processingTime: '1-2 business days',
    accountTypes: ['Business'],
    bgColor: 'from-purple-500 to-purple-600',
  },
  {
    id: 'wise',
    name: 'Wise (TransferWise)',
    icon: '🌍',
    description: 'International money transfers',
    acceptedCurrencies: ['USD', 'EUR', 'GBP', 'AUD', 'CAD'],
    fees: 0.8,
    processingTime: '1-3 business days',
    accountTypes: ['Personal', 'Business'],
    bgColor: 'from-green-500 to-green-600',
  },
  {
    id: 'revolut',
    name: 'Revolut',
    icon: '🏦',
    description: 'Digital banking platform',
    acceptedCurrencies: ['USD', 'EUR', 'GBP'],
    fees: 1.5,
    processingTime: 'Instant',
    accountTypes: ['Personal', 'Business'],
    bgColor: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'remitly',
    name: 'Remitly',
    icon: '📱',
    description: 'International remittance service',
    acceptedCurrencies: ['USD', 'EUR', 'GBP'],
    fees: 3.5,
    processingTime: '1-3 business days',
    accountTypes: ['Personal'],
    bgColor: 'from-orange-500 to-orange-600',
  },
  {
    id: 'skrill',
    name: 'Skrill',
    icon: '💼',
    description: 'Digital wallet and payments',
    acceptedCurrencies: ['USD', 'EUR', 'GBP'],
    fees: 1.9,
    processingTime: 'Instant',
    accountTypes: ['Personal', 'Business'],
    bgColor: 'from-red-500 to-red-600',
  },
];

export default function PaymentProvidersPage() {
  const router = useRouter();
  const [selectedProvider, setSelectedProvider] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [accountType, setAccountType] = useState('Personal');
  const [purpose, setPurpose] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Review, 3: Confirmation

  const handleLogout = () => {
    router.push('/');
  };

  const selectedProviderData = paymentProviders.find(p => p.id === selectedProvider);
  const transferFee = selectedProviderData ? (parseFloat(amount || '0') * selectedProviderData.fees / 100) : 0;
  const totalAmount = parseFloat(amount || '0') + transferFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProvider || !recipientId || !amount || !purpose) return;
    setStep(2);
  };

  const confirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2500);
  };

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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Sent Successfully! 💸</h1>
              <p className="text-xl text-gray-600">Your payment has been sent to {selectedProviderData?.name}</p>
            </div>
            
            <Card className="max-w-lg mx-auto bg-white border-0 shadow-xl">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="text-4xl">{selectedProviderData?.icon}</div>
                  <div>
                    <p className="text-lg font-semibold">{selectedProviderData?.name}</p>
                    <p className="text-sm text-gray-600">{selectedProviderData?.description}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Amount Sent</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(parseFloat(amount), currency)}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recipient ID</span>
                    <span className="font-semibold text-gray-900">{recipientId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider Fee</span>
                    <span className="text-gray-900">{formatCurrency(transferFee, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Deducted</span>
                    <span className="font-bold text-gray-900">{formatCurrency(totalAmount, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-gray-900">PP-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="text-gray-900">{selectedProviderData?.processingTime}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <BuildingOfficeIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">
                        Bank Transaction Details
                      </h4>
                      <p className="text-xs text-blue-800">
                        Your bank will show: Payment to {selectedProviderData?.name} from {senderAccount.accountHolder} 
                        ({senderAccount.bankName}). Purpose: {purpose}
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
                  setSelectedProvider('');
                  setRecipientId('');
                  setAmount('');
                  setPurpose('');
                }} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <BanknotesIcon className="w-5 h-5 mr-2" />
                Send Another Payment
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
            <h1 className="text-3xl font-bold text-gray-900">Review Payment to Provider</h1>
            <p className="text-gray-600 mt-2">Verify all payment details before sending</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <div className="text-2xl mr-3">{selectedProviderData?.icon}</div>
                    Payment to {selectedProviderData?.name}
                  </CardTitle>
                  <CardDescription>Review payment details before processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">From Account</h3>
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
                              <p className="text-sm text-gray-600">Balance: {formatCurrency(senderAccount.balance, senderAccount.currency)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">To Provider</h3>
                      <Card className={`bg-gradient-to-r ${selectedProviderData?.bgColor} border-0 text-white`}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                              <span className="text-lg">{selectedProviderData?.icon}</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">{selectedProviderData?.name}</p>
                              <p className="text-sm text-white/80">{selectedProviderData?.description}</p>
                              <p className="text-sm text-white/80">Fee: {selectedProviderData?.fees}%</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Payment Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payment Amount</span>
                        <span className="font-bold text-lg">{formatCurrency(parseFloat(amount), currency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Provider Fee ({selectedProviderData?.fees}%)</span>
                        <span className="font-semibold">{formatCurrency(transferFee, currency)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-blue-600">{formatCurrency(totalAmount, currency)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Payment Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Recipient ID:</span>
                        <p className="font-medium mt-1">{recipientId}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Account Type:</span>
                        <p className="font-medium mt-1">{accountType}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-gray-600">Purpose:</span>
                        <p className="font-medium mt-1">{purpose}</p>
                      </div>
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
                    Security & Processing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {[
                      'Provider Account Verified',
                      'Payment Amount Validated',
                      'Sufficient Funds Available',
                      'Secure Connection Active',
                      'Anti-Fraud Protection Enabled'
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
                      Your payment will be processed securely through your bank to {selectedProviderData?.name}.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Bank Statement</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Will show: "Payment to {selectedProviderData?.name}" from {senderAccount.accountHolder}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={confirmPayment} 
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing Payment...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <ArrowRightIcon className="w-5 w-5" />
                          <span>Send to {selectedProviderData?.name}</span>
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Payment Providers 💳</h1>
          <p className="text-gray-600 mt-2">Send money directly to payment service providers worldwide</p>
        </div>

        {/* Payment Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paymentProviders.map((provider) => (
            <Card 
              key={provider.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedProvider === provider.id
                  ? 'ring-2 ring-blue-500 shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedProvider(provider.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${provider.bgColor} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
                    {provider.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{provider.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{provider.description}</p>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Fee:</span>
                        <span className="font-semibold">{provider.fees}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Processing:</span>
                        <span className="font-semibold">{provider.processingTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Currencies:</span>
                        <div className="flex space-x-1">
                          {provider.acceptedCurrencies.slice(0, 3).map((curr) => (
                            <Badge key={curr} variant="outline" className="text-xs px-1 py-0">
                              {curr}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedProvider === provider.id && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Selected Provider</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Form */}
        {selectedProvider && (
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <div className="text-2xl mr-3">{selectedProviderData?.icon}</div>
                Send Payment to {selectedProviderData?.name}
              </CardTitle>
              <CardDescription>
                Enter recipient details and payment amount
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Recipient ID/Email/Phone
                    </label>
                    <Input
                      value={recipientId}
                      onChange={(e) => setRecipientId(e.target.value)}
                      placeholder={`Enter ${selectedProviderData?.name} account ID`}
                      className="h-12"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedProviderData?.name} account identifier (email, phone, or account ID)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Account Type
                    </label>
                    <select
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      {selectedProviderData?.accountTypes.map((type) => (
                        <option key={type} value={type}>
                          {type} Account
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Amount
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="h-12"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      {selectedProviderData?.acceptedCurrencies.map((curr) => (
                        <option key={curr} value={curr}>
                          {curr} - {SUPPORTED_CURRENCIES[curr as keyof typeof SUPPORTED_CURRENCIES]?.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Payment Purpose
                  </label>
                  <Input
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g., Service payment, Purchase, Transfer"
                    className="h-12"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This will appear on bank statements and provider records
                  </p>
                </div>

                {amount && (
                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Payment Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-semibold">{formatCurrency(parseFloat(amount), currency)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Provider Fee ({selectedProviderData?.fees}%):</span>
                          <span className="font-semibold">{formatCurrency(transferFee, currency)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-base font-bold">
                          <span>Total Amount:</span>
                          <span className="text-blue-600">{formatCurrency(totalAmount, currency)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold"
                  disabled={!recipientId || !amount || !purpose}
                >
                  <ArrowRightIcon className="w-5 h-5 mr-2" />
                  Review Payment to {selectedProviderData?.name}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
