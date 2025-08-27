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
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  ClockIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  DocumentArrowUpIcon,
  QrCodeIcon
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
};

const mockInvoices = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2024-001',
    vendor: 'Tech Solutions LLC',
    description: 'Software Development Services - Q1 2024',
    amount: 1250.00,
    currency: 'USD',
    dueDate: '2024-02-15',
    status: 'PENDING',
    vendorAccount: 'tech-solutions@payments.com',
    category: 'Professional Services',
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2024-002',
    vendor: 'Global Marketing Agency',
    description: 'Digital Marketing Campaign Management',
    amount: 3500.00,
    currency: 'EUR',
    dueDate: '2024-02-20',
    status: 'OVERDUE',
    vendorAccount: 'billing@globalmarketing.eu',
    category: 'Marketing Services',
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-2024-003',
    vendor: 'Office Supplies Co.',
    description: 'Monthly Office Supplies & Equipment',
    amount: 750.50,
    currency: 'EUR',
    dueDate: '2024-02-25',
    status: 'PENDING',
    vendorAccount: 'payments@officesupplies.com',
    category: 'Office Expenses',
  },
];

export default function InvoicePaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'existing' | 'manual'>('existing');
  const [selectedInvoice, setSelectedInvoice] = useState('');
  const [manualInvoice, setManualInvoice] = useState({
    invoiceNumber: '',
    vendor: '',
    amount: '',
    currency: 'EUR',
    description: '',
    vendorAccount: '',
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Selection, 2: Review, 3: Confirmation

  const handleLogout = () => {
    router.push('/');
  };

  const selectedInvoiceData = mockInvoices.find(inv => inv.id === selectedInvoice);
  const invoiceData = paymentMethod === 'existing' ? selectedInvoiceData : {
    ...manualInvoice,
    amount: parseFloat(manualInvoice.amount || '0'),
    dueDate: new Date().toISOString().split('T')[0],
    status: 'PENDING' as const,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'existing' && !selectedInvoice) return;
    if (paymentMethod === 'manual' && (!manualInvoice.invoiceNumber || !manualInvoice.vendor || !manualInvoice.amount)) return;
    setStep(2);
  };

  const confirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2500);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Invoice Paid Successfully! 📄✅</h1>
              <p className="text-xl text-gray-600">Your invoice payment has been processed</p>
            </div>
            
            <Card className="max-w-lg mx-auto bg-white border-0 shadow-xl">
              <CardContent className="p-8 text-center space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Payment Amount</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(invoiceData!.amount, invoiceData!.currency)}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Number</span>
                    <span className="font-semibold text-gray-900">{invoiceData!.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vendor</span>
                    <span className="font-semibold text-gray-900">{invoiceData!.vendor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="text-gray-900">Bank Transfer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-gray-900">INV-PAY-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Paid
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="text-gray-900">1-2 business days</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <BuildingOfficeIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">
                        Vendor Notification
                      </h4>
                      <p className="text-xs text-blue-800">
                        The vendor will receive payment confirmation with your details: {senderAccount.accountHolder} 
                        from {senderAccount.bankName}. Invoice marked as paid in their system.
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
                  setSelectedInvoice('');
                  setManualInvoice({
                    invoiceNumber: '',
                    vendor: '',
                    amount: '',
                    currency: 'EUR',
                    description: '',
                    vendorAccount: '',
                  });
                }} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Pay Another Invoice
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
            <h1 className="text-3xl font-bold text-gray-900">Review Invoice Payment</h1>
            <p className="text-gray-600 mt-2">Verify all payment details before processing</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <DocumentTextIcon className="w-6 h-6 mr-3 text-blue-600" />
                    Invoice Payment Details
                  </CardTitle>
                  <CardDescription>Review invoice and payment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Invoice Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Invoice Number:</span>
                        <p className="font-semibold mt-1">{invoiceData!.invoiceNumber}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Vendor:</span>
                        <p className="font-semibold mt-1">{invoiceData!.vendor}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Amount:</span>
                        <p className="font-bold text-lg text-blue-600">{formatCurrency(invoiceData!.amount, invoiceData!.currency)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Due Date:</span>
                        <p className="font-semibold mt-1">{new Date(invoiceData!.dueDate).toLocaleDateString()}</p>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-600">Description:</span>
                        <p className="font-semibold mt-1">{invoiceData!.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Payment Account</h3>
                    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600">
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
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">Payment Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Invoice Amount</span>
                        <span className="font-bold text-lg">{formatCurrency(invoiceData!.amount, invoiceData!.currency)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Processing Fee</span>
                        <span className="font-semibold">{formatCurrency(0, invoiceData!.currency)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Payment</span>
                        <span className="text-blue-600">{formatCurrency(invoiceData!.amount, invoiceData!.currency)}</span>
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
                    <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                    Payment Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {[
                      'Invoice details verified',
                      'Vendor account validated',
                      'Sufficient funds available',
                      'Payment authorization ready',
                      'Fraud protection active'
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
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-900">Ready to Process</span>
                    </div>
                    <p className="text-sm text-green-800">
                      Your invoice payment is ready to be processed securely.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Vendor Notification</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Vendor will see payment from {senderAccount.accountHolder}, {senderAccount.bankName}
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
                          <span>Pay Invoice</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Invoice Payment System 📄</h1>
          <p className="text-gray-600 mt-2">Pay vendor invoices with simulated banking transactions</p>
        </div>

        {/* Payment Method Selection */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Payment Method</CardTitle>
            <CardDescription>Choose how you want to pay your invoice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${
                  paymentMethod === 'existing' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                }`}
                onClick={() => setPaymentMethod('existing')}
              >
                <CardContent className="p-6 text-center">
                  <DocumentTextIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Existing Invoices</h3>
                  <p className="text-sm text-gray-600">Select from your pending invoices</p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all ${
                  paymentMethod === 'manual' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                }`}
                onClick={() => setPaymentMethod('manual')}
              >
                <CardContent className="p-6 text-center">
                  <DocumentArrowUpIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Manual Entry</h3>
                  <p className="text-sm text-gray-600">Enter invoice details manually</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Selection/Entry */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <DocumentTextIcon className="w-6 h-6 mr-3 text-blue-600" />
              {paymentMethod === 'existing' ? 'Select Invoice' : 'Enter Invoice Details'}
            </CardTitle>
            <CardDescription>
              {paymentMethod === 'existing' 
                ? 'Choose an invoice from your pending list'
                : 'Manually enter the invoice information'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {paymentMethod === 'existing' ? (
              <div className="space-y-4">
                {mockInvoices.map((invoice) => {
                  const daysUntilDue = getDaysUntilDue(invoice.dueDate);
                  return (
                    <Card 
                      key={invoice.id}
                      className={`cursor-pointer transition-all ${
                        selectedInvoice === invoice.id
                          ? 'ring-2 ring-blue-500 bg-blue-50'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedInvoice(invoice.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-bold text-lg text-gray-900">{invoice.invoiceNumber}</h3>
                              <Badge 
                                variant={invoice.status === 'OVERDUE' ? 'destructive' : 'outline'}
                                className={invoice.status === 'OVERDUE' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                              >
                                {invoice.status}
                              </Badge>
                            </div>
                            <p className="text-gray-700 font-medium mb-1">{invoice.vendor}</p>
                            <p className="text-sm text-gray-600 mb-3">{invoice.description}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Amount:</span>
                                <p className="font-semibold">{formatCurrency(invoice.amount, invoice.currency)}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Due Date:</span>
                                <p className="font-semibold">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Category:</span>
                                <p className="font-semibold">{invoice.category}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Days Until Due:</span>
                                <p className={`font-semibold ${daysUntilDue < 0 ? 'text-red-600' : daysUntilDue <= 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                                  {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` : `${daysUntilDue} days`}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right ml-6">
                            <p className="text-2xl font-bold text-gray-900">
                              {formatCurrency(invoice.amount, invoice.currency)}
                            </p>
                            <Badge variant="outline" className="mt-2">
                              {invoice.currency}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Invoice Number
                    </label>
                    <Input
                      value={manualInvoice.invoiceNumber}
                      onChange={(e) => setManualInvoice(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                      placeholder="INV-2024-001"
                      className="h-12"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Vendor Name
                    </label>
                    <Input
                      value={manualInvoice.vendor}
                      onChange={(e) => setManualInvoice(prev => ({ ...prev, vendor: e.target.value }))}
                      placeholder="Company Name"
                      className="h-12"
                      required
                    />
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
                      value={manualInvoice.amount}
                      onChange={(e) => setManualInvoice(prev => ({ ...prev, amount: e.target.value }))}
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
                      value={manualInvoice.currency}
                      onChange={(e) => setManualInvoice(prev => ({ ...prev, currency: e.target.value }))}
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

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Vendor Payment Account
                  </label>
                  <Input
                    value={manualInvoice.vendorAccount}
                    onChange={(e) => setManualInvoice(prev => ({ ...prev, vendorAccount: e.target.value }))}
                    placeholder="vendor@company.com or payment account ID"
                    className="h-12"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Vendor's payment email or account identifier</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Description/Purpose
                  </label>
                  <Input
                    value={manualInvoice.description}
                    onChange={(e) => setManualInvoice(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Invoice description or service details"
                    className="h-12"
                    required
                  />
                </div>
              </form>
            )}

            {((paymentMethod === 'existing' && selectedInvoice) || 
              (paymentMethod === 'manual' && manualInvoice.invoiceNumber && manualInvoice.vendor && manualInvoice.amount)) && (
              <div className="mt-8 pt-6 border-t">
                <Button 
                  onClick={handleSubmit}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-base font-semibold"
                >
                  <ArrowRightIcon className="w-5 h-5 mr-2" />
                  Review Payment Details
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
