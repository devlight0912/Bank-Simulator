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
import { Progress } from '@/components/ui/progress';
import { 
  PlusIcon,
  CreditCardIcon,
  BanknotesIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ClockIcon,
  CheckCircleIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { formatCurrency, formatIBAN } from '@/lib/utils';

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
    accountType: 'CHECKING',
    bankName: 'SecureBank International',
    bankCountry: 'Germany',
    change: '+2.5%',
    isPositive: true,
    opened: '2023-01-15',
    status: 'Active',
    interestRate: 0.5,
  },
  {
    id: '2',
    accountNumber: '****5678',
    iban: 'GB29NWBK60161331926819',
    bic: 'NWBKGB2LXXX',
    currency: 'GBP',
    balance: 12300.75,
    accountType: 'SAVINGS',
    bankName: 'Global Trust Bank',
    bankCountry: 'United Kingdom',
    change: '+1.8%',
    isPositive: true,
    opened: '2023-03-22',
    status: 'Active',
    interestRate: 2.1,
  },
  {
    id: '3',
    accountNumber: '****9876',
    iban: 'FR1420041010050500013M02606',
    bic: 'CCBPFRPPXXX',
    currency: 'EUR',
    balance: 5420.30,
    accountType: 'BUSINESS',
    bankName: 'Banque Centrale',
    bankCountry: 'France',
    change: '-0.3%',
    isPositive: false,
    opened: '2023-06-10',
    status: 'Active',
    interestRate: 0.8,
  },
];

const accountTypeColors = {
  CHECKING: 'bg-blue-50 text-blue-700 border-blue-200',
  SAVINGS: 'bg-green-50 text-green-700 border-green-200',
  BUSINESS: 'bg-purple-50 text-purple-700 border-purple-200',
};

const currencyFlags = {
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  USD: '🇺🇸',
};

export default function AccountsPage() {
  const router = useRouter();
  const [balancesVisible, setBalancesVisible] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const totalBalance = mockAccounts.reduce((sum, account) => {
    const rate = account.currency === 'EUR' ? 1.1 : account.currency === 'GBP' ? 1.25 : 1;
    return sum + (account.balance * rate);
  }, 0);

  const handleLogout = () => {
    router.push('/');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Open New Account':
        alert('Create New Account feature coming soon!');
        break;
      case 'Transfer Money':
        router.push('/transfer');
        break;
      case 'Generate IBAN':
        alert('IBAN Generator feature coming soon!');
        break;
      case 'Security Settings':
        alert('Security Settings feature coming soon!');
        break;
      default:
        break;
    }
  };

  const handleAccountAction = (action: string, accountId: string) => {
    switch (action) {
      case 'View Details':
        alert(`Account details for ${accountId} - Feature coming soon!`);
        break;
      case 'Transfer':
        router.push('/transfer');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header user={mockUser} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Accounts 💳</h1>
            <p className="text-gray-600 mt-2">
              Manage your simulated bank accounts and view balances
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <Badge variant="outline" className="bg-white/50">
              <ClockIcon className="w-3 h-3 mr-1" />
              Last updated: just now
            </Badge>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              onClick={() => handleQuickAction('Open New Account')}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Account
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Balance</p>
                  <p className="text-2xl font-bold mt-2">
                    {balancesVisible ? formatCurrency(totalBalance) : '••••••••'}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => setBalancesVisible(!balancesVisible)}
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    {balancesVisible ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                  <BanknotesIcon className="h-6 w-6 text-blue-200" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Accounts</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{mockAccounts.length}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CreditCardIcon className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Countries</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <GlobeAltIcon className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg. Interest</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">1.1%</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <ArrowTrendingUpIcon className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accounts List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Account Overview</CardTitle>
                <CardDescription>
                  Your simulated banking accounts across different institutions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAccounts.map((account) => (
                  <Card 
                    key={account.id} 
                    className={`border transition-all duration-200 cursor-pointer ${
                      selectedAccount === account.id 
                        ? 'border-blue-500 shadow-lg bg-blue-50/50' 
                        : 'border-gray-100 hover:shadow-md hover:border-gray-200'
                    }`}
                    onClick={() => setSelectedAccount(selectedAccount === account.id ? null : account.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <Avatar className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600">
                              <AvatarFallback className="text-white font-bold">
                                {account.currency}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 text-lg">
                              {currencyFlags[account.currency as keyof typeof currencyFlags]}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-bold text-gray-900">{account.bankName}</h3>
                              <Badge 
                                variant="outline" 
                                className={accountTypeColors[account.accountType as keyof typeof accountTypeColors]}
                              >
                                {account.accountType}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 font-mono mb-1">{formatIBAN(account.iban)}</p>
                            <p className="text-sm text-gray-500">
                              {account.bankCountry} • Opened {new Date(account.opened).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900 mb-1">
                            {balancesVisible 
                              ? formatCurrency(account.balance, account.currency)
                              : '••••••••'
                            }
                          </p>
                          <div className={`flex items-center text-sm ${
                            account.isPositive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {account.isPositive ? (
                              <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                            ) : (
                              <ArrowTrendingDownIcon className="w-3 h-3 mr-1" />
                            )}
                            <span>{account.change} this month</span>
                          </div>
                        </div>
                      </div>

                      {selectedAccount === account.id && (
                        <>
                          <Separator className="my-4" />
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600 mb-1">Account Number</p>
                              <p className="font-mono font-semibold">{account.accountNumber}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">BIC Code</p>
                              <p className="font-mono font-semibold">{account.bic}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">Interest Rate</p>
                              <p className="font-semibold">{account.interestRate}% APY</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <CheckCircleIcon className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-700">Account Active</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAccountAction('View Details', account.id);
                                }}
                              >
                                View Details
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAccountAction('Transfer', account.id);
                                }}
                              >
                                Transfer
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Account Actions Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <CurrencyDollarIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => handleQuickAction('Open New Account')}
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Open New Account
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2"
                  onClick={() => handleQuickAction('Transfer Money')}
                >
                  <BanknotesIcon className="w-4 h-4 mr-2" />
                  Transfer Money
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2"
                  onClick={() => handleQuickAction('Generate IBAN')}
                >
                  <CreditCardIcon className="w-4 h-4 mr-2" />
                  Generate IBAN
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2"
                  onClick={() => handleQuickAction('Security Settings')}
                >
                  <ShieldCheckIcon className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-green-900">
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-800">Security Score</span>
                    <span className="font-bold text-green-900">95/100</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                
                <div className="space-y-2 text-sm text-green-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>2FA Enabled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>Encrypted Storage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                    <span>Fraud Monitoring</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Account Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Keep your IBAN and BIC codes secure and only share them with trusted recipients.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Monitor your account balances regularly for any unauthorized transactions.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Consider diversifying across different currencies for better risk management.</p>
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