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
  BanknotesIcon,
  PlusIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  ArrowRightIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { formatCurrency } from '@/lib/utils';
import { SUPPORTED_CURRENCIES } from '@/lib/constants';

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
    accountType: 'CHECKING',
  },
  {
    id: '2',
    accountNumber: '****5678',
    iban: 'GB29NWBK60161331926819',
    bic: 'NWBKGB2LXXX',
    currency: 'GBP',
    balance: 12300.75,
    bankName: 'Global Trust Bank',
    accountType: 'SAVINGS',
  },
];

export default function AccountManagementPage() {
  const router = useRouter();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [topUpAmount, setTopUpAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastTopUpAmount, setLastTopUpAmount] = useState(0);

  const handleLogout = () => {
    router.push('/');
  };

  const handleVirtualTopUp = async () => {
    if (!selectedAccount || !topUpAmount || parseFloat(topUpAmount) <= 0) return;
    
    setLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      setLoading(false);
      setLastTopUpAmount(parseFloat(topUpAmount));
      setShowSuccess(true);
      setTopUpAmount('');
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  const handleMaxTopUp = () => {
    setTopUpAmount('1000000'); // Set to 1 million as example of "unlimited"
  };

  const generateVirtualMoney = (amount: number) => {
    return {
      transactionId: `VM-${Date.now()}`,
      amount,
      currency: selectedCurrency,
      timestamp: new Date(),
      source: 'Virtual FIAT Generator',
      method: 'SIMULATION'
    };
  };

  const selectedAccountData = mockAccounts.find(acc => acc.id === selectedAccount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header user={mockUser} onLogout={handleLogout} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Virtual FIAT Money Generator 💰</h1>
          <p className="text-gray-600 mt-2">Generate unlimited simulated currency for your banking accounts</p>
        </div>

        {/* Success Notification */}
        {showSuccess && (
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Virtual Money Generated Successfully! 🎉</h3>
                  <p className="text-green-100">
                    {formatCurrency(lastTopUpAmount, selectedCurrency)} has been added to your selected account
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Virtual Money Generator */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <BanknotesIcon className="w-6 h-6 mr-3 text-green-600" />
                  Virtual FIAT Generator
                </CardTitle>
                <CardDescription>
                  Generate unlimited simulated money in any supported currency
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Account Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Select Target Account
                  </label>
                  <select
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                    required
                  >
                    <option value="">Choose account to fund</option>
                    {mockAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.bankName} - {account.iban} ({formatCurrency(account.balance, account.currency)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount and Currency */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Amount to Generate
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Enter any amount (no limits)"
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(e.target.value)}
                        className="h-12 pr-20"
                        step="0.01"
                        min="0.01"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleMaxTopUp}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 text-xs bg-green-600 hover:bg-green-700"
                      >
                        MAX
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Currency
                    </label>
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                    >
                      {Object.values(SUPPORTED_CURRENCIES).map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Quick Amounts
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[1000, 10000, 100000, 1000000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setTopUpAmount(amount.toString())}
                        className="border-2 hover:bg-green-50 hover:border-green-300"
                      >
                        {formatCurrency(amount, selectedCurrency)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleVirtualTopUp}
                  disabled={loading || !selectedAccount || !topUpAmount || parseFloat(topUpAmount) <= 0}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-base font-semibold"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating Virtual Money...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <PlusIcon className="w-5 h-5" />
                      <span>Generate Virtual FIAT Money</span>
                      <ArrowRightIcon className="w-4 w-4" />
                    </div>
                  )}
                </Button>

                {/* Information Card */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Virtual Money Generation</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Generate unlimited amounts in any supported currency</li>
                          <li>• Money appears instantly in your selected account</li>
                          <li>• Use generated funds for all banking operations</li>
                          <li>• Perfect for testing large transactions and transfers</li>
                          <li>• All transactions appear legitimate to recipient banks</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Account Summary Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {selectedAccountData && (
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <CreditCardIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Selected Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600">
                        <AvatarFallback className="text-white font-semibold">
                          {selectedAccountData.currency}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{selectedAccountData.bankName}</p>
                        <p className="text-sm text-gray-600">{selectedAccountData.accountType}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Current Balance</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(selectedAccountData.balance, selectedAccountData.currency)}
                      </p>
                      <p className="text-xs text-gray-500 font-mono">{selectedAccountData.iban}</p>
                    </div>
                  </div>
                  
                  {topUpAmount && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Amount to Add</span>
                          <span className="font-semibold text-green-600">
                            +{formatCurrency(parseFloat(topUpAmount), selectedCurrency)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">New Balance</span>
                          <span className="font-bold text-lg text-gray-900">
                            {formatCurrency(selectedAccountData.balance + parseFloat(topUpAmount), selectedAccountData.currency)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Security Notice */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-yellow-900">
                  <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                  Simulation Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-yellow-800">
                <p>
                  <strong>Educational Simulation:</strong> This virtual money generator is for educational 
                  and demonstration purposes only.
                </p>
                <p>
                  All generated funds are simulated and have no real monetary value. 
                  Use this feature to test banking operations and understand financial systems.
                </p>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-green-900">
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  Virtual Money Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm text-green-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>Unlimited generation capacity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>Multi-currency support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>Instant account funding</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>Real-time balance updates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>Compatible with all banking operations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Navigation */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2"
                  onClick={() => router.push('/transfer')}
                >
                  <ArrowUpIcon className="w-4 h-4 mr-2" />
                  Send Money
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2"
                  onClick={() => router.push('/direct-payment')}
                >
                  <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                  Direct Payment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2"
                  onClick={() => router.push('/crypto')}
                >
                  <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                  Buy Crypto
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
