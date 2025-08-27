'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  BanknotesIcon,
  MapPinIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ClockIcon,
  WifiIcon,
  DevicePhoneMobileIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import { formatCurrency } from '@/lib/utils';

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
    currency: 'EUR',
    balance: 25750.50,
    bankName: 'SecureBank International',
    cardNumber: '****1234',
    dailyLimit: 1000,
    withdrawnToday: 0,
  },
  {
    id: '2',
    accountNumber: '****5678',
    iban: 'GB29NWBK60161331926819',
    currency: 'GBP',
    balance: 12300.75,
    bankName: 'Global Trust Bank',
    cardNumber: '****5678',
    dailyLimit: 800,
    withdrawnToday: 200,
  },
];

const atmLocations = [
  {
    id: 'atm-1',
    name: 'Downtown Plaza ATM',
    address: '123 Main Street, City Center',
    network: 'Global ATM Network',
    fees: 0,
    available24h: true,
    cashAvailable: true,
    services: ['Cash Withdrawal', 'Balance Inquiry', 'Mini Statement'],
  },
  {
    id: 'atm-2',
    name: 'Shopping Mall ATM',
    address: '456 Commerce Avenue, Mall Level 2',
    network: 'International ATM',
    fees: 2.50,
    available24h: false,
    cashAvailable: true,
    services: ['Cash Withdrawal', 'Balance Inquiry'],
  },
  {
    id: 'atm-3',
    name: 'Airport Terminal ATM',
    address: 'International Airport, Terminal B',
    network: 'Travel Cash Network',
    fees: 3.00,
    available24h: true,
    cashAvailable: true,
    services: ['Cash Withdrawal', 'Currency Exchange', 'Balance Inquiry'],
  },
];

const quickAmounts = [20, 50, 100, 200, 500, 1000];

export default function ATMSimulationPage() {
  const router = useRouter();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedATM, setSelectedATM] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState(1); // 1: Setup, 2: PIN Entry, 3: Amount, 4: Confirmation, 5: Success
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    router.push('/');
  };

  const selectedAccountData = mockAccounts.find(acc => acc.id === selectedAccount);
  const selectedATMData = atmLocations.find(atm => atm.id === selectedATM);
  const atmFee = selectedATMData?.fees || 0;
  const totalAmount = parseFloat(withdrawalAmount || '0') + atmFee;
  const availableToday = selectedAccountData ? selectedAccountData.dailyLimit - selectedAccountData.withdrawnToday : 0;

  const handleContinue = () => {
    if (step === 1 && selectedAccount && selectedATM) {
      setStep(2);
    } else if (step === 2 && pin.length === 4) {
      setStep(3);
    } else if (step === 3 && withdrawalAmount) {
      setStep(4);
    } else if (step === 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(5);
      }, 3000);
    }
  };

  const handleQuickAmount = (amount: number) => {
    setWithdrawalAmount(amount.toString());
  };

  const handleNewTransaction = () => {
    setStep(1);
    setSelectedAccount('');
    setSelectedATM('');
    setWithdrawalAmount('');
    setPin('');
    setLoading(false);
  };

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Header user={mockUser} onLogout={handleLogout} />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircleIcon className="w-12 h-12 text-white" />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Cash Dispensed Successfully! 💸</h1>
              <p className="text-xl text-gray-600">Your cash withdrawal has been completed</p>
            </div>
            
            <Card className="max-w-lg mx-auto bg-white border-0 shadow-xl">
              <CardContent className="p-8 text-center space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Amount Withdrawn</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(parseFloat(withdrawalAmount), selectedAccountData?.currency)}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ATM Location</span>
                    <span className="font-semibold text-gray-900">{selectedATMData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ATM Fee</span>
                    <span className="text-gray-900">{formatCurrency(atmFee, selectedAccountData?.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Deducted</span>
                    <span className="font-bold text-gray-900">{formatCurrency(totalAmount, selectedAccountData?.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New Balance</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(selectedAccountData!.balance - totalAmount, selectedAccountData?.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-gray-900">ATM-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time</span>
                    <span className="text-gray-900">{new Date().toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <BanknotesIcon className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-green-900 mb-1">
                        Cash Dispensed
                      </h4>
                      <p className="text-xs text-green-800">
                        Please collect your cash from the ATM dispenser. Your transaction receipt has been printed.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleNewTransaction}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <BanknotesIcon className="w-5 h-5 mr-2" />
                New Withdrawal
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header user={mockUser} onLogout={handleLogout} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">🏧 ATM Rapid Cash Exit</h1>
          <p className="text-gray-600 mt-2">
            <strong>Quick Cash Conversion</strong> - Convert virtual FIAT to physical cash rapidly. 
            Move funds OUTSIDE the banking system in 1-3 minutes.
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-red-100 border border-red-300 rounded-lg">
            <span className="text-red-700 text-sm">⚡ Minimal Banking Exposure - Cash = External Security</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {[
                { step: 1, label: 'Select Account & ATM', icon: CreditCardIcon },
                { step: 2, label: 'Enter PIN', icon: KeyIcon },
                { step: 3, label: 'Choose Amount', icon: BanknotesIcon },
                { step: 4, label: 'Confirm Transaction', icon: CheckCircleIcon },
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= item.step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className={`ml-3 ${step >= item.step ? 'text-blue-600' : 'text-gray-500'}`}>
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                  {index < 3 && (
                    <div className={`mx-6 h-1 w-16 ${
                      step > item.step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <BanknotesIcon className="w-6 h-6 mr-3 text-blue-600" />
                  {step === 1 && 'Select Account & ATM Location'}
                  {step === 2 && 'Enter Your PIN'}
                  {step === 3 && 'Choose Withdrawal Amount'}
                  {step === 4 && 'Confirm Transaction'}
                </CardTitle>
                <CardDescription>
                  {step === 1 && 'Choose your account and preferred ATM location'}
                  {step === 2 && 'Enter your 4-digit PIN for verification'}
                  {step === 3 && 'Select the amount you want to withdraw'}
                  {step === 4 && 'Review and confirm your withdrawal details'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {step === 1 && (
                  <>
                    {/* Account Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Select Account
                      </label>
                      <div className="space-y-3">
                        {mockAccounts.map((account) => (
                          <Card 
                            key={account.id}
                            className={`cursor-pointer transition-all ${
                              selectedAccount === account.id
                                ? 'ring-2 ring-blue-500 bg-blue-50'
                                : 'hover:shadow-md'
                            }`}
                            onClick={() => setSelectedAccount(account.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600">
                                  <AvatarFallback className="text-white font-semibold">
                                    {account.currency}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-900">{account.bankName}</p>
                                  <p className="text-sm text-gray-600">{account.accountNumber}</p>
                                  <p className="text-sm text-gray-500">
                                    Daily Limit: {formatCurrency(account.dailyLimit - account.withdrawnToday, account.currency)} remaining
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-lg">{formatCurrency(account.balance, account.currency)}</p>
                                  <Badge variant="outline" className="text-xs">
                                    {account.currency}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* ATM Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Select ATM Location
                      </label>
                      <div className="space-y-3">
                        {atmLocations.map((atm) => (
                          <Card 
                            key={atm.id}
                            className={`cursor-pointer transition-all ${
                              selectedATM === atm.id
                                ? 'ring-2 ring-blue-500 bg-blue-50'
                                : 'hover:shadow-md'
                            }`}
                            onClick={() => setSelectedATM(atm.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <MapPinIcon className="w-8 h-8 text-blue-600 mt-1" />
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900">{atm.name}</h3>
                                  <p className="text-sm text-gray-600">{atm.address}</p>
                                  <p className="text-sm text-gray-500">{atm.network}</p>
                                  <div className="flex items-center space-x-4 mt-2">
                                    <Badge variant={atm.available24h ? "default" : "outline"} className="text-xs">
                                      {atm.available24h ? '24/7' : 'Limited Hours'}
                                    </Badge>
                                    <Badge variant={atm.cashAvailable ? "default" : "outline"} className="text-xs">
                                      {atm.cashAvailable ? 'Cash Available' : 'No Cash'}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-lg">
                                    {atm.fees > 0 ? formatCurrency(atm.fees) : 'Free'}
                                  </p>
                                  <p className="text-xs text-gray-500">ATM Fee</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <KeyIcon className="h-12 w-12 text-blue-600" />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-4">
                        Enter Your 4-Digit PIN
                      </label>
                      <div className="flex justify-center space-x-2">
                        {[0, 1, 2, 3].map((index) => (
                          <div
                            key={index}
                            className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center text-xl font-bold"
                          >
                            {pin[index] ? '•' : ''}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''].map((num, index) => (
                        <Button
                          key={index}
                          variant={num === '' ? "ghost" : "outline"}
                          className="h-12 text-lg font-semibold"
                          disabled={num === ''}
                          onClick={() => {
                            if (num !== '' && pin.length < 4) {
                              setPin(pin + num.toString());
                            }
                          }}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={() => setPin('')}
                      className="mt-4"
                    >
                      Clear PIN
                    </Button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-4">
                        Select Withdrawal Amount
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                        {quickAmounts.map((amount) => (
                          <Button
                            key={amount}
                            variant={withdrawalAmount === amount.toString() ? "default" : "outline"}
                            className="h-16 text-lg font-semibold"
                            onClick={() => handleQuickAmount(amount)}
                            disabled={amount > availableToday}
                          >
                            {formatCurrency(amount, selectedAccountData?.currency)}
                          </Button>
                        ))}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Amount
                        </label>
                        <input
                          type="number"
                          placeholder="Enter custom amount"
                          value={withdrawalAmount}
                          onChange={(e) => setWithdrawalAmount(e.target.value)}
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          max={availableToday}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Available today: {formatCurrency(availableToday, selectedAccountData?.currency)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-900">Confirm Your Transaction</span>
                      </div>
                      <p className="text-sm text-yellow-800">
                        Please verify all details before proceeding with the cash withdrawal.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Account:</span>
                        <span className="font-semibold">{selectedAccountData?.bankName}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">ATM Location:</span>
                        <span className="font-semibold">{selectedATMData?.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Withdrawal Amount:</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(withdrawalAmount), selectedAccountData?.currency)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">ATM Fee:</span>
                        <span className="font-semibold">{formatCurrency(atmFee, selectedAccountData?.currency)}</span>
                      </div>
                      <div className="flex justify-between py-2 text-lg font-bold">
                        <span>Total Amount:</span>
                        <span className="text-blue-600">{formatCurrency(totalAmount, selectedAccountData?.currency)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  {step > 1 && (
                    <Button 
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}
                  <Button 
                    onClick={handleContinue}
                    disabled={
                      (step === 1 && (!selectedAccount || !selectedATM)) ||
                      (step === 2 && pin.length !== 4) ||
                      (step === 3 && (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > availableToday)) ||
                      loading
                    }
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <span>
                        {step === 4 ? 'Dispense Cash' : 'Continue'}
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {selectedAccountData && (
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Selected Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <p className="font-semibold">{selectedAccountData.bankName}</p>
                    <p className="text-sm text-gray-600">{selectedAccountData.accountNumber}</p>
                    <p className="text-lg font-bold mt-2">
                      {formatCurrency(selectedAccountData.balance, selectedAccountData.currency)}
                    </p>
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Limit:</span>
                      <span>{formatCurrency(selectedAccountData.dailyLimit, selectedAccountData.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Used Today:</span>
                      <span>{formatCurrency(selectedAccountData.withdrawnToday, selectedAccountData.currency)}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-600">Available:</span>
                      <span>{formatCurrency(availableToday, selectedAccountData.currency)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-green-900">
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  ATM Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-green-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>PIN verification required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>Encrypted communication</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>Transaction monitoring</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>Daily withdrawal limits</span>
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
