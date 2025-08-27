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
import { Input } from '@/components/ui/Input';
import { 
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CreditCardIcon,
  BanknotesIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { formatCurrency, formatDate } from '@/lib/utils';

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  securityLevel: 'HIGH' as const,
};

const mockTransactions = [
  {
    id: '1',
    type: 'TRANSFER',
    amount: -500.00,
    currency: 'EUR',
    description: 'Transfer to John Smith',
    recipient: 'John Smith',
    date: new Date('2024-01-15T10:30:00'),
    status: 'COMPLETED',
    category: 'Transfer',
    fromAccount: 'DE89370400440532013000',
    toAccount: 'DE89370400440532013001',
    reference: 'INV-2024-001',
  },
  {
    id: '2',
    type: 'DEPOSIT',
    amount: 2000.00,
    currency: 'EUR',
    description: 'Salary deposit',
    recipient: 'SecureBank International',
    date: new Date('2024-01-14T09:00:00'),
    status: 'COMPLETED',
    category: 'Income',
    fromAccount: 'COMPANY-PAYROLL',
    toAccount: 'DE89370400440532013000',
    reference: 'SALARY-JAN-2024',
  },
  {
    id: '3',
    type: 'TRANSFER',
    amount: -150.25,
    currency: 'GBP',
    description: 'Online purchase - Amazon UK',
    recipient: 'Amazon UK',
    date: new Date('2024-01-13T14:22:00'),
    status: 'COMPLETED',
    category: 'Shopping',
    fromAccount: 'GB29NWBK60161331926819',
    toAccount: 'GB29AMZN00000000000001',
    reference: 'ORDER-789456123',
  },
  {
    id: '4',
    type: 'TRANSFER',
    amount: -75.50,
    currency: 'EUR',
    description: 'Utility bill payment',
    recipient: 'Electric Company',
    date: new Date('2024-01-12T16:45:00'),
    status: 'PENDING',
    category: 'Bills',
    fromAccount: 'DE89370400440532013000',
    toAccount: 'DE89UTIL00000000000001',
    reference: 'ELEC-BILL-JAN',
  },
  {
    id: '5',
    type: 'DEPOSIT',
    amount: 1200.00,
    currency: 'EUR',
    description: 'Investment return',
    recipient: 'Investment Fund',
    date: new Date('2024-01-11T11:15:00'),
    status: 'COMPLETED',
    category: 'Investment',
    fromAccount: 'FUND-PORTFOLIO-A',
    toAccount: 'DE89370400440532013000',
    reference: 'DIV-2024-Q1',
  },
  {
    id: '6',
    type: 'TRANSFER',
    amount: -25.00,
    currency: 'GBP',
    description: 'Coffee subscription',
    recipient: 'Bean & Brew Co',
    date: new Date('2024-01-10T08:30:00'),
    status: 'FAILED',
    category: 'Subscription',
    fromAccount: 'GB29NWBK60161331926819',
    toAccount: 'GB29COFFEE000000000001',
    reference: 'SUB-MONTHLY-JAN',
  },
];

const statusColors = {
  COMPLETED: 'bg-green-50 text-green-700 border-green-200',
  PENDING: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  FAILED: 'bg-red-50 text-red-700 border-red-200',
};

const statusIcons = {
  COMPLETED: CheckCircleIcon,
  PENDING: ExclamationTriangleIcon,
  FAILED: XCircleIcon,
};

const categoryColors = {
  Transfer: 'bg-blue-50 text-blue-700',
  Income: 'bg-green-50 text-green-700',
  Shopping: 'bg-purple-50 text-purple-700',
  Bills: 'bg-orange-50 text-orange-700',
  Investment: 'bg-emerald-50 text-emerald-700',
  Subscription: 'bg-pink-50 text-pink-700',
};

export default function TransactionsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || transaction.status === selectedStatus;
    const matchesCategory = selectedCategory === 'ALL' || transaction.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalIncome = mockTransactions
    .filter(t => t.amount > 0 && t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = mockTransactions
    .filter(t => t.amount < 0 && t.status === 'COMPLETED')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const pendingTransactions = mockTransactions.filter(t => t.status === 'PENDING').length;

  const handleLogout = () => {
    router.push('/');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'New Transfer':
        router.push('/transfer');
        break;
      case 'Export Transactions':
        // In a real app, this would trigger a download
        alert('Export feature coming soon! This would download your transaction history.');
        break;
      case 'Schedule Payment':
        alert('Schedule Payment feature coming soon!');
        break;
      default:
        break;
    }
  };

  const handleTransactionAction = (action: string, transactionId: string) => {
    switch (action) {
      case 'View Receipt':
        alert(`Receipt for transaction ${transactionId} - Feature coming soon!`);
        break;
      case 'Cancel':
        alert(`Cancel transaction ${transactionId} - Feature coming soon!`);
        break;
      default:
        break;
    }
  };

  const handleExport = () => {
    alert('Export functionality coming soon! This would download your filtered transaction data.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header user={mockUser} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transaction History 📊</h1>
            <p className="text-gray-600 mt-2">
              Track and manage all your banking transactions
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <Badge variant="outline" className="bg-white/50">
              <ClockIcon className="w-3 h-3 mr-1" />
              Last updated: just now
            </Badge>
            <Button 
              variant="outline" 
              className="border-2"
              onClick={handleExport}
            >
              <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Income</p>
                  <p className="text-2xl font-bold mt-2">
                    {formatCurrency(totalIncome, 'EUR')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                  <ArrowDownLeftIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-pink-600 border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Total Expenses</p>
                  <p className="text-2xl font-bold mt-2">
                    {formatCurrency(totalExpenses, 'EUR')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-400 rounded-xl flex items-center justify-center">
                  <ArrowUpRightIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Net Balance</p>
                  <p className="text-2xl font-bold mt-2">
                    {formatCurrency(totalIncome - totalExpenses, 'EUR')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <BanknotesIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{pendingTransactions}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="h-4 w-4 text-gray-500" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="ALL">All Status</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="PENDING">Pending</option>
                    <option value="FAILED">Failed</option>
                  </select>
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ALL">All Categories</option>
                  <option value="Transfer">Transfer</option>
                  <option value="Income">Income</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Investment">Investment</option>
                  <option value="Subscription">Subscription</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Recent Transactions</CardTitle>
                <CardDescription>
                  Showing {filteredTransactions.length} of {mockTransactions.length} transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredTransactions.map((transaction) => {
                  const StatusIcon = statusIcons[transaction.status as keyof typeof statusIcons];
                  
                  return (
                    <Card 
                      key={transaction.id}
                      className={`border transition-all duration-200 cursor-pointer ${
                        selectedTransaction === transaction.id 
                          ? 'border-blue-500 shadow-lg bg-blue-50/50' 
                          : 'border-gray-100 hover:shadow-md hover:border-gray-200'
                      }`}
                      onClick={() => setSelectedTransaction(selectedTransaction === transaction.id ? null : transaction.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
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
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                                <Badge 
                                  variant="outline" 
                                  className={categoryColors[transaction.category as keyof typeof categoryColors]}
                                >
                                  {transaction.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">To: {transaction.recipient}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <CalendarDaysIcon className="w-3 h-3" />
                                  <span>{formatDate(transaction.date)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <CreditCardIcon className="w-3 h-3" />
                                  <span className="font-mono">{transaction.fromAccount.slice(-4)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className={`text-xl font-bold mb-2 ${
                              transaction.amount > 0 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}
                              {formatCurrency(transaction.amount, transaction.currency)}
                            </p>
                            <div className="flex items-center justify-end space-x-2">
                              <StatusIcon className="w-4 h-4" />
                              <Badge 
                                variant="outline" 
                                className={statusColors[transaction.status as keyof typeof statusColors]}
                              >
                                {transaction.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {selectedTransaction === transaction.id && (
                          <>
                            <Separator className="my-4" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600 mb-1">Transaction ID</p>
                                <p className="font-mono font-semibold">{transaction.id}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">Reference</p>
                                <p className="font-mono font-semibold">{transaction.reference}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">From Account</p>
                                <p className="font-mono font-semibold">{transaction.fromAccount}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">To Account</p>
                                <p className="font-mono font-semibold">{transaction.toAccount}</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-end mt-4 space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTransactionAction('View Receipt', transaction.id);
                                }}
                              >
                                View Receipt
                              </Button>
                              {transaction.status === 'PENDING' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTransactionAction('Cancel', transaction.id);
                                  }}
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Transaction Insights Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Transaction Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="font-bold text-gray-900">{mockTransactions.length} transactions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Amount</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(
                        mockTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / mockTransactions.length,
                        'EUR'
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Most Used Category</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">Transfer</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg text-purple-900">Spending Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(
                  mockTransactions
                    .filter(t => t.amount < 0)
                    .reduce((acc, t) => {
                      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
                      return acc;
                    }, {} as Record<string, number>)
                ).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-purple-900">{category}</span>
                    </div>
                    <span className="font-semibold text-purple-900">
                      {formatCurrency(amount, 'EUR')}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => handleQuickAction('New Transfer')}
                >
                  <BanknotesIcon className="w-4 h-4 mr-2" />
                  New Transfer
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2"
                  onClick={() => handleQuickAction('Export Transactions')}
                >
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Export Transactions
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-2"
                  onClick={() => handleQuickAction('Schedule Payment')}
                >
                  <CalendarDaysIcon className="w-4 h-4 mr-2" />
                  Schedule Payment
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