'use client';
import { useState, useEffect } from 'react';
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
  BanknotesIcon, 
  CreditCardIcon, 
  ArrowUpRightIcon, 
  ArrowDownLeftIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { formatCurrency, formatDate } from '@/lib/utils';

// Mock data - in real app this would come from API
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
  },
];

const mockTransactions = [
  {
    id: '1',
    type: 'TRANSFER',
    amount: -500.00,
    currency: 'EUR',
    description: 'Transfer to John Smith',
    date: new Date('2024-01-15T10:30:00'),
    status: 'COMPLETED',
    category: 'Transfer',
  },
  {
    id: '2',
    type: 'DEPOSIT',
    amount: 2000.00,
    currency: 'EUR',
    description: 'Salary deposit',
    date: new Date('2024-01-14T09:00:00'),
    status: 'COMPLETED',
    category: 'Income',
  },
  {
    id: '3',
    type: 'TRANSFER',
    amount: -150.25,
    currency: 'GBP',
    description: 'Online purchase',
    date: new Date('2024-01-13T14:22:00'),
    status: 'COMPLETED',
    category: 'Shopping',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [balancesVisible, setBalancesVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const totalBalance = mockAccounts.reduce((sum, account) => {
    // Convert to USD for total (simplified conversion)
    const rate = account.currency === 'EUR' ? 1.1 : account.currency === 'GBP' ? 1.25 : 1;
    return sum + (account.balance * rate);
  }, 0);

  const handleLogout = () => {
    router.push('/');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Send Money':
        router.push('/transfer');
        break;
      case 'Direct Payment':
        router.push('/direct-payment');
        break;
      case 'Virtual Money':
        router.push('/account-management');
        break;
      case 'Multi-Step Transfer':
        router.push('/multi-step-transfer');
        break;
      case 'Quick Exit':
        router.push('/quick-exit');
        break;
      case 'Generate IBAN':
        router.push('/iban-generator');
        break;
      case 'Crypto Trading':
        router.push('/crypto');
        break;
      case 'Payment Providers':
        router.push('/payment-providers');
        break;
      case 'ATM Withdrawal':
        router.push('/atm-simulation');
        break;
      case 'Pay Invoices':
        router.push('/invoice-payment');
        break;
      case 'SWIFT Transfer':
        router.push('/swift-transfer');
        break;
      case 'Compliance':
        router.push('/compliance-audit');
        break;
      default:
        break;
    }
  };

  const quickActions = [
    { icon: BanknotesIcon, label: 'Virtual Money', color: 'green' },
    { icon: ArrowDownLeftIcon, label: 'Quick Exit', color: 'red' },
    { icon: ArrowRightIcon, label: 'Multi-Step Transfer', color: 'cyan' },
    { icon: ArrowUpRightIcon, label: 'Send Money', color: 'blue' },
    { icon: GlobeAltIcon, label: 'Direct Payment', color: 'purple' },
    { icon: CurrencyDollarIcon, label: 'Crypto Trading', color: 'purple' },
    { icon: CreditCardIcon, label: 'Generate IBAN', color: 'orange' },
    { icon: BuildingLibraryIcon, label: 'Payment Providers', color: 'indigo' },
    { icon: DevicePhoneMobileIcon, label: 'ATM Withdrawal', color: 'red' },
    { icon: DocumentTextIcon, label: 'Pay Invoices', color: 'gray' },
    { icon: GlobeAltIcon, label: 'SWIFT Transfer', color: 'yellow' },
    { icon: ShieldCheckIcon, label: 'Compliance', color: 'emerald' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header user={mockUser} onLogout={handleLogout} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header user={mockUser} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {mockUser.firstName}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Here's your financial overview for today
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Badge variant="outline" className="bg-white/50">
              <ClockIcon className="w-3 h-3 mr-1" />
              Last updated: just now
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Balance</p>
                  <p className="text-3xl font-bold mt-2">
                    {balancesVisible ? formatCurrency(totalBalance) : '••••••••'}
                  </p>
                  <div className="flex items-center mt-2 text-blue-100">
                    <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">+5.2% this month</span>
                  </div>
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
                  <BanknotesIcon className="h-8 w-8 text-blue-200" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Accounts</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {mockAccounts.length}
                  </p>
                  <div className="flex items-center mt-2 text-green-600">
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">All verified</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CreditCardIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Security Level</p>
                  <div className="flex items-center mt-2">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      {mockUser.securityLevel}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Security Score</span>
                      <span className="font-medium">85/100</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <ShieldCheckIcon className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Accounts */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Your Accounts</CardTitle>
                  <CardDescription>
                    Manage your simulated bank accounts
                  </CardDescription>
                </div>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push('/accounts')}
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAccounts.map((account) => (
                <Card key={account.id} className="border border-gray-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600">
                          <AvatarFallback className="text-white font-semibold">
                            {account.currency}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{account.bankName}</p>
                          <p className="text-sm text-gray-500 font-mono">{account.iban}</p>
                          <div className="flex items-center mt-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                account.accountType === 'CHECKING' 
                                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                  : 'bg-green-50 text-green-700 border-green-200'
                              }`}
                            >
                              {account.accountType}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">
                          {balancesVisible 
                            ? formatCurrency(account.balance, account.currency)
                            : '••••••••'
                          }
                        </p>
                        <div className="flex items-center text-sm text-green-600">
                          <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                          <span>{account.change}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Recent Transactions</CardTitle>
                  <CardDescription>
                    Your latest banking activity
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => router.push('/transactions')}
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => router.push('/transactions')}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.amount > 0 
                      ? 'bg-green-100' 
                      : 'bg-red-100'
                  }`}>
                    {transaction.amount > 0 ? (
                      <ArrowDownLeftIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUpRightIcon className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.amount > 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}
                      {formatCurrency(Math.abs(transaction.amount), transaction.currency)}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs mt-1 ${
                        transaction.status === 'COMPLETED' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Global Banking Network Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Countries Supported</p>
                  <p className="text-3xl font-bold">50</p>
                  <p className="text-blue-200 text-xs mt-1">Global coverage</p>
                </div>
                <GlobeAltIcon className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Currencies Available</p>
                  <p className="text-3xl font-bold">30+</p>
                  <p className="text-green-200 text-xs mt-1">Multi-currency</p>
                </div>
                <CurrencyDollarIcon className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Banking Systems</p>
                  <p className="text-3xl font-bold">IBAN + SWIFT</p>
                  <p className="text-purple-200 text-xs mt-1">All networks</p>
                </div>
                <BuildingLibraryIcon className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Regions</p>
                  <p className="text-3xl font-bold">EU, MENA, LATAM, APAC</p>
                  <p className="text-orange-200 text-xs mt-1">Worldwide</p>
                </div>
                <ArrowRightIcon className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>
              Common banking operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-10 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-all hover:-translate-y-1"
                  onClick={() => handleQuickAction(action.label)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    action.color === 'green' ? 'bg-green-100 text-green-600' :
                    action.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    action.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                    action.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                    action.color === 'red' ? 'bg-red-100 text-red-600' :
                    action.color === 'gray' ? 'bg-gray-100 text-gray-600' :
                    action.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                    action.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    action.color === 'cyan' ? 'bg-cyan-100 text-cyan-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-center">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
} 