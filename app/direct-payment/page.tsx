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
  ArrowRightIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  BuildingLibraryIcon,
  UserIcon,
  CreditCardIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { formatCurrency, validateIBAN, formatIBAN } from '@/lib/utils';
import { generateAuditTrail, formatBankStatement } from '@/lib/bankValidation';
import { SUPPORTED_CURRENCIES, SUPPORTED_COUNTRIES } from '@/lib/constants';

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  securityLevel: 'HIGH' as const,
};

// Your sender account details (the bank account sending money)
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

export default function DirectPaymentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientIban: '',
    recipientBankName: '',
    recipientCountry: '',
    amount: '',
    currency: 'EUR',
    purpose: '',
    description: '',
    merchantCategory: 'GENERAL',
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isValidatingIban, setIsValidatingIban] = useState(false);
  const [ibanValid, setIbanValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Review, 3: Confirmation

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Real-time IBAN validation
    if (name === 'recipientIban' && value.length >= 15) {
      setIsValidatingIban(true);
      setTimeout(() => {
        const isValid = validateIBAN(value);
        setIbanValid(isValid);
        setIsValidatingIban(false);
        if (!isValid) {
          setValidationErrors(prev => ({ ...prev, recipientIban: 'Invalid IBAN format' }));
        } else {
          // Auto-detect country from IBAN
          const countryCode = value.substring(0, 2).toUpperCase();
          const country = SUPPORTED_COUNTRIES[countryCode as keyof typeof SUPPORTED_COUNTRIES];
          if (country) {
            setFormData(prev => ({ ...prev, recipientCountry: country.name }));
          }
        }
      }, 500);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.recipientName) errors.recipientName = 'Recipient name is required';
    if (!formData.recipientIban) errors.recipientIban = 'Recipient IBAN is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) errors.amount = 'Valid amount is required';
    if (!formData.purpose) errors.purpose = 'Payment purpose is required';
    
    if (parseFloat(formData.amount) > senderAccount.balance) {
      errors.amount = 'Insufficient funds';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStep(2);
  };

  const confirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2500);
  };

  const handleLogout = () => {
    router.push('/');
  };

  const transferFee = 8.50; // Higher fee for international direct payments
  const totalAmount = parseFloat(formData.amount || '0') + transferFee;

  const merchantCategories = [
    { value: 'GENERAL', label: 'General Payment' },
    { value: 'RETAIL', label: 'Retail Purchase' },
    { value: 'SERVICES', label: 'Professional Services' },
    { value: 'DIGITAL', label: 'Digital Goods/Software' },
    { value: 'TRAVEL', label: 'Travel & Tourism' },
    { value: 'FOOD', label: 'Food & Beverages' },
    { value: 'EDUCATION', label: 'Education' },
    { value: 'HEALTHCARE', label: 'Healthcare' },
    { value: 'UTILITIES', label: 'Utilities' },
    { value: 'SUBSCRIPTION', label: 'Subscription Service' },
  ];

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header user={mockUser} onLogout={handleLogout} />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircleIcon className="w-12 h-12 text-white" />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Sent Successfully! 🌍</h1>
              <p className="text-xl text-gray-600">Your direct payment has been processed and sent internationally</p>
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
                    <span className="text-gray-600">To</span>
                    <span className="font-semibold text-gray-900">{formData.recipientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Country</span>
                    <span className="text-gray-900">{formData.recipientCountry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-gray-900">DPT-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Sent to Recipient Bank
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="text-gray-900">1-3 Business Days</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <BuildingLibraryIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">
                        Bank Notification Sent
                      </h4>
                      <p className="text-xs text-blue-800">
                        The recipient's bank will see your name "{senderAccount.accountHolder}" and bank details from {senderAccount.bankName} as the sender.
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
                    recipientIban: '',
                    recipientBankName: '',
                    recipientCountry: '',
                    amount: '',
                    currency: 'EUR',
                    purpose: '',
                    description: '',
                    merchantCategory: 'GENERAL',
                  });
                  setValidationErrors({});
                  setIbanValid(null);
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
            <h1 className="text-3xl font-bold text-gray-900">Review Direct Payment</h1>
            <p className="text-gray-600 mt-2">Verify all payment details before sending internationally</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <GlobeAltIcon className="w-6 h-6 mr-3 text-blue-600" />
                    International Direct Payment
                  </CardTitle>
                  <CardDescription>Review payment details before processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <UserIcon className="w-4 h-4 mr-2 text-red-500" />
                        From (Your Account)
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
                              <p className="text-sm text-gray-600 font-mono">{formatIBAN(senderAccount.iban)}</p>
                              <p className="text-xs text-gray-500">{senderAccount.bankAddress}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
                        To (Recipient)
                      </h3>
                      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600">
                              <AvatarFallback className="text-white font-semibold text-sm">
                                {formData.recipientIban.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{formData.recipientName}</p>
                              <p className="text-sm text-gray-600">{formData.recipientBankName || 'Bank Name Not Provided'}</p>
                              <p className="text-sm text-gray-600 font-mono">{formatIBAN(formData.recipientIban)}</p>
                              <p className="text-xs text-gray-500">{formData.recipientCountry}</p>
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
                        <span className="font-bold text-lg">{formatCurrency(parseFloat(formData.amount), formData.currency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">International Transfer Fee</span>
                        <span className="font-semibold">{formatCurrency(transferFee, formData.currency)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Debit</span>
                        <span className="text-blue-600">{formatCurrency(totalAmount, formData.currency)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Payment Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Purpose:</span>
                        <p className="font-medium mt-1">{formData.purpose}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <p className="font-medium mt-1">{merchantCategories.find(c => c.value === formData.merchantCategory)?.label}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-gray-600">Description:</span>
                        <p className="font-medium mt-1">{formData.description || 'N/A'}</p>
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
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {[
                      'IBAN Format Verified',
                      'AML Compliance Check',
                      'International Transfer Authorized',
                      'Sender Identity Confirmed',
                      'Recipient Bank Notification Ready'
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
                      The recipient's bank will receive your payment with full sender details.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <BuildingLibraryIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Bank Visibility</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      The recipient will see: "{senderAccount.accountHolder}" from {senderAccount.bankName}, {senderAccount.bankCountry}
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
                          <GlobeAltIcon className="w-5 w-5" />
                          <span>Send Payment</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Direct Payment 🌍</h1>
          <p className="text-gray-600 mt-2">Send money directly to customers worldwide without logging into your bank</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BanknotesIcon className="w-6 h-6 mr-3 text-blue-600" />
                  Payment Details
                </CardTitle>
                <CardDescription>
                  Enter recipient details for direct international payment
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Recipient Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Recipient Information</h3>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Recipient Name</label>
                      <Input
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleInputChange}
                        placeholder="Customer/Merchant Name"
                        className="h-12"
                        required
                      />
                      {validationErrors.recipientName && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.recipientName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Recipient IBAN</label>
                      <div className="relative">
                        <Input
                          name="recipientIban"
                          value={formData.recipientIban}
                          onChange={handleInputChange}
                          placeholder="SG56 OCBC 0000 0000 0000 0000 (Singapore example)"
                          className={`h-12 pr-12 ${ibanValid === false ? 'border-red-500 focus:ring-red-500' : ibanValid === true ? 'border-green-500 focus:ring-green-500' : ''}`}
                          required
                        />
                        {isValidatingIban && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                        {ibanValid === true && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <CheckCircleIcon className="w-5 h-5 text-green-600" />
                          </div>
                        )}
                        {ibanValid === false && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                          </div>
                        )}
                      </div>
                      {validationErrors.recipientIban && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.recipientIban}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">Enter the recipient's International Bank Account Number</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Recipient Bank (Optional)</label>
                        <Input
                          name="recipientBankName"
                          value={formData.recipientBankName}
                          onChange={handleInputChange}
                          placeholder="e.g., DBS Bank Singapore"
                          className="h-12"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-3">Country</label>
                        <Input
                          name="recipientCountry"
                          value={formData.recipientCountry}
                          onChange={handleInputChange}
                          placeholder="Auto-detected from IBAN"
                          className="h-12"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Amount */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Payment Amount</h3>
                    
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
                          {Object.values(SUPPORTED_CURRENCIES).map((currency) => (
                            <option key={currency.code} value={currency.code}>
                              {currency.code} - {currency.symbol}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Payment Purpose</h3>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Payment Purpose</label>
                      <Input
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        placeholder="e.g., Purchase of goods, Service payment, etc."
                        className="h-12"
                        required
                      />
                      {validationErrors.purpose && (
                        <p className="text-sm text-red-600 mt-1">{validationErrors.purpose}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">This will appear on the recipient's bank statement</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Category</label>
                      <select
                        name="merchantCategory"
                        value={formData.merchantCategory}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      >
                        {merchantCategories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Additional Description (Optional)</label>
                      <Input
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Additional payment details..."
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
                    Review Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Sender Account Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <CurrencyDollarIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Your Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600">
                        <AvatarFallback className="text-white font-semibold">
                          {senderAccount.currency}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{senderAccount.accountHolder}</p>
                        <p className="text-sm text-gray-600">{senderAccount.bankName}</p>
                        <p className="text-xs text-gray-500">{senderAccount.bankCountry}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Available Balance</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(senderAccount.balance, senderAccount.currency)}
                      </p>
                      <p className="text-xs text-gray-500 font-mono">{formatIBAN(senderAccount.iban)}</p>
                    </div>
                  </div>
                  
                  {formData.amount && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Payment Amount</span>
                          <span className="font-semibold">{formatCurrency(parseFloat(formData.amount), formData.currency)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">International Fee</span>
                          <span className="font-semibold">{formatCurrency(transferFee, formData.currency)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-blue-600">{formatCurrency(totalAmount, formData.currency)}</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-sm font-medium text-green-900">Remaining Balance</p>
                        <p className="font-bold text-green-800">
                          {formatCurrency(senderAccount.balance - totalAmount, senderAccount.currency)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                
                <Separator />
                
                <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <GlobeAltIcon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900">Direct Payment</h4>
                        <p className="text-sm text-purple-800">Recipient's bank will see your full details</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 