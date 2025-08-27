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
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRightIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { formatCurrency, validateIBAN, formatIBAN } from '@/lib/utils';
import { SUPPORTED_CURRENCIES, SUPPORTED_COUNTRIES } from '@/lib/constants';

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  securityLevel: 'HIGH' as const,
};

const mockAccounts = [
  {
    id: '1',
    accountNumber: '****1234',
    iban: 'DE89370400440532013000',
    bic: 'COBADEFFXXX',
    currency: 'EUR',
    balance: 25750.50,
    bankName: 'SecureBank International',
  },
  {
    id: '2',
    accountNumber: '****5678',
    iban: 'GB29NWBK60161331926819',
    bic: 'NWBKGB2LXXX',
    currency: 'GBP',
    balance: 12300.75,
    bankName: 'Global Trust Bank',
  },
];

export default function TransferPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fromAccountId: '',
    toIban: '',
    amount: '',
    currency: 'EUR',
    reference: '',
    description: '',
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
    if (name === 'toIban' && value.length >= 15) {
      setIsValidatingIban(true);
      setTimeout(() => {
        const isValid = validateIBAN(value);
        setIbanValid(isValid);
        setIsValidatingIban(false);
        if (!isValid) {
          setValidationErrors(prev => ({ ...prev, toIban: 'Invalid IBAN format' }));
        }
      }, 500);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.fromAccountId) errors.fromAccountId = 'Please select an account';
    if (!formData.toIban) errors.toIban = 'IBAN is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) errors.amount = 'Valid amount is required';
    if (!formData.reference) errors.reference = 'Reference is required';
    
    const selectedAccount = mockAccounts.find(acc => acc.id === formData.fromAccountId);
    if (selectedAccount && parseFloat(formData.amount) > selectedAccount.balance) {
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

  const confirmTransfer = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const handleLogout = () => {
    router.push('/');
  };

  const selectedAccount = mockAccounts.find(acc => acc.id === formData.fromAccountId);
  const transferFee = 5.00;
  const totalAmount = parseFloat(formData.amount || '0') + transferFee;

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Header user={mockUser} onLogout={handleLogout} />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircleIcon className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Transfer Successful! 🎉</h1>
              <p className="text-xl text-gray-600">Your transfer has been processed securely</p>
            </div>
            
            <Card className="max-w-md mx-auto bg-white border-0 shadow-xl">
              <CardContent className="p-8 text-center space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Amount Transferred</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(parseFloat(formData.amount), formData.currency)}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-gray-900">TXN-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="text-gray-900">Instant</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  setStep(1);
                  setFormData({
                    fromAccountId: '',
                    toIban: '',
                    amount: '',
                    currency: 'EUR',
                    reference: '',
                    description: '',
                  });
                  setValidationErrors({});
                  setIbanValid(null);
                }} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <BanknotesIcon className="w-5 h-5 mr-2" />
                Make Another Transfer
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
            <h1 className="text-3xl font-bold text-gray-900">Review Transfer</h1>
            <p className="text-gray-600 mt-2">Please review your transfer details carefully</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <CreditCardIcon className="w-6 h-6 mr-3 text-blue-600" />
                    Transfer Details
                  </CardTitle>
                  <CardDescription>Verify all information before confirming</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <ArrowTrendingUpIcon className="w-4 h-4 mr-2 text-red-500" />
                        From Account
                      </h3>
                      <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-100">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600">
                              <AvatarFallback className="text-white font-semibold text-sm">
                                {selectedAccount?.currency}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{selectedAccount?.bankName}</p>
                              <p className="text-sm text-gray-600 font-mono">{formatIBAN(selectedAccount?.iban || '')}</p>
                              <p className="text-sm text-gray-600">
                                Balance: {formatCurrency(selectedAccount?.balance || 0, selectedAccount?.currency)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <ArrowTrendingUpIcon className="w-4 h-4 mr-2 text-green-500 rotate-180" />
                        To Account
                      </h3>
                      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600">
                              <AvatarFallback className="text-white font-semibold text-sm">
                                {formData.toIban.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm text-gray-600 font-mono">{formatIBAN(formData.toIban)}</p>
                              <p className="text-sm text-gray-600">
                                {SUPPORTED_COUNTRIES[formData.toIban.substring(0, 2) as keyof typeof SUPPORTED_COUNTRIES]?.name || 'International'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Transaction Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Transfer Amount</span>
                        <span className="font-bold text-lg">{formatCurrency(parseFloat(formData.amount), formData.currency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Transfer Fee</span>
                        <span className="font-semibold">{formatCurrency(transferFee, formData.currency)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-blue-600">{formatCurrency(totalAmount, formData.currency)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Additional Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Reference:</span>
                        <p className="font-medium mt-1">{formData.reference}</p>
                      </div>
                      <div>
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
                    Security Check
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {[
                      'IBAN Format Valid',
                      'Sufficient Funds',
                      'Secure Connection',
                      'Fraud Check Passed'
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
                      <span className="font-semibold text-green-900">All Checks Passed</span>
                    </div>
                    <p className="text-sm text-green-800">
                      Your transaction is secure and ready to process.
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
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <ShieldCheckIcon className="w-5 w-5" />
                          <span>Confirm Transfer</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Send Money 💸</h1>
          <p className="text-gray-600 mt-2">Transfer funds securely with bank-grade encryption</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BanknotesIcon className="w-6 h-6 mr-3 text-blue-600" />
                  Transfer Details
                </CardTitle>
                <CardDescription>
                  Enter the recipient details and transfer amount
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* From Account Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">From Account</label>
                    <select
                      name="fromAccountId"
                      value={formData.fromAccountId}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      required
                    >
                      <option value="">Select account</option>
                      {mockAccounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.bankName} - {formatIBAN(account.iban)} ({formatCurrency(account.balance, account.currency)})
                        </option>
                      ))}
                    </select>
                    {validationErrors.fromAccountId && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.fromAccountId}</p>
                    )}
                  </div>

                  {/* Recipient IBAN */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Recipient IBAN</label>
                    <div className="relative">
                      <Input
                        name="toIban"
                        value={formData.toIban}
                        onChange={handleInputChange}
                        placeholder="DE89 3704 0044 0532 0130 00"
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
                    {validationErrors.toIban && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.toIban}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">Enter the recipient's International Bank Account Number</p>
                  </div>

                  {/* Amount and Currency */}
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

                  {/* Reference */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Payment Reference</label>
                    <Input
                      name="reference"
                      value={formData.reference}
                      onChange={handleInputChange}
                      placeholder="Invoice #12345"
                      className="h-12"
                      required
                    />
                    {validationErrors.reference && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.reference}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">This will appear on both bank statements</p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Description (Optional)</label>
                    <Input
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Additional details..."
                      className="h-12"
                    />
                    <p className="text-sm text-gray-500 mt-1">Internal note for your records</p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold"
                  >
                    <ArrowRightIcon className="w-5 h-5 mr-2" />
                    Review Transfer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Transfer Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <CurrencyDollarIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Transfer Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedAccount && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600">
                          <AvatarFallback className="text-white font-semibold text-sm">
                            {selectedAccount.currency}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{selectedAccount.bankName}</p>
                          <p className="text-sm text-gray-600">Available Balance</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(selectedAccount.balance, selectedAccount.currency)}
                      </p>
                    </div>
                    
                    {formData.amount && (
                      <>
                        <Separator />
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Transfer Amount</span>
                            <span className="font-semibold">{formatCurrency(parseFloat(formData.amount), formData.currency)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Transfer Fee</span>
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
                            {formatCurrency(selectedAccount.balance - totalAmount, selectedAccount.currency)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                <Separator />
                
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <ShieldCheckIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900">Bank-Grade Security</h4>
                        <p className="text-sm text-green-800">256-bit encryption & fraud protection</p>
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