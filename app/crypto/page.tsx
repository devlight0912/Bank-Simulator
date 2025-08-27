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
import { Input } from '@/components/ui/Input';
import { 
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  LockClosedIcon,
  ArrowRightIcon,
  PlusIcon,
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { formatCurrency, formatDate } from '@/lib/utils';

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  securityLevel: 'HIGH' as const,
};

// Simulated cryptocurrency data
const mockCryptoPortfolio = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 0.25847,
    priceUSD: 43250.00,
    change24h: '+2.45%',
    isPositive: true,
    icon: '₿',
    privacy: 'PUBLIC',
    network: 'Bitcoin',
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    priceUSD: 2650.00,
    balance: 3.8924,
    change24h: '+1.82%',
    isPositive: true,
    icon: 'Ξ',
    privacy: 'PUBLIC',
    network: 'Ethereum',
  },
  {
    id: '3',
    symbol: 'XMR',
    name: 'Monero',
    balance: 15.7234,
    priceUSD: 165.50,
    change24h: '+0.95%',
    isPositive: true,
    icon: 'ɱ',
    privacy: 'PRIVATE',
    network: 'Monero',
  },
  {
    id: '4',
    symbol: 'ZEC',
    name: 'Zcash',
    balance: 8.2156,
    priceUSD: 28.75,
    change24h: '-1.23%',
    isPositive: false,
    icon: 'ⓩ',
    privacy: 'PRIVATE',
    network: 'Zcash',
  },
];

const mockCryptoTransactions = [
  {
    id: '1',
    type: 'BUY',
    crypto: 'XMR',
    amount: 2.5,
    priceUSD: 165.50,
    totalUSD: 413.75,
    date: new Date('2024-01-15T14:30:00'),
    status: 'COMPLETED',
    txHash: '7d2a3f...8b9c1e',
    privacy: true,
  },
  {
    id: '2',
    type: 'SELL',
    crypto: 'BTC',
    amount: 0.01,
    priceUSD: 43200.00,
    totalUSD: 432.00,
    date: new Date('2024-01-14T11:15:00'),
    status: 'COMPLETED',
    txHash: '3f7a9d...2e5c8b',
    privacy: false,
  },
  {
    id: '3',
    type: 'TRANSFER',
    crypto: 'XMR',
    amount: 1.0,
    date: new Date('2024-01-13T16:45:00'),
    status: 'COMPLETED',
    toAddress: 'Private Address',
    privacy: true,
  },
];

const mockFiatAccounts = [
  {
    id: '1',
    currency: 'EUR',
    balance: 25750.50,
    bankName: 'SecureBank International',
  },
  {
    id: '2',
    currency: 'GBP',
    balance: 12300.75,
    bankName: 'Global Trust Bank',
  },
];

export default function CryptoPage() {
  const router = useRouter();
  const [balancesVisible, setBalancesVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'trade' | 'privacy'>('portfolio');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [selectedFiatAccount, setSelectedFiatAccount] = useState('1');

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const totalPortfolioValue = mockCryptoPortfolio.reduce((sum, crypto) => {
    return sum + (crypto.balance * crypto.priceUSD);
  }, 0);

  const privacyCoins = mockCryptoPortfolio.filter(crypto => crypto.privacy === 'PRIVATE');

  const handleLogout = () => {
    router.push('/');
  };

    const handleTrade = () => {
    if (!selectedCrypto || !tradeAmount) return;

    const selectedCryptoData = mockCryptoPortfolio.find(crypto => crypto.symbol === selectedCrypto);
    const selectedFiatAccountData = mockFiatAccounts.find(acc => acc.id === selectedFiatAccount);
    const totalCost = parseFloat(tradeAmount) * (selectedCryptoData?.priceUSD || 0);

    if (tradeType === 'BUY' && selectedFiatAccountData && totalCost > selectedFiatAccountData.balance) {
      alert('❌ Insufficient FIAT balance for this purchase.\n\nPlease use the Virtual Money Generator to add funds to your account.');
      return;
    }

    // Enhanced trade execution with bank masking and cold wallet options
    const bankMaskingOptions = [
      'Business Investment Account - Matthia K.',
      'Personal Trading Account - M. Krause',
      'Corporate Investment Fund',
      'Private Asset Management'
    ];
    
    const selectedMasking = bankMaskingOptions[Math.floor(Math.random() * bankMaskingOptions.length)];
    
    const tradeDetails = `
✅ CRYPTO TRADE EXECUTED SUCCESSFULLY!

🔐 ADVANCED SECURITY FEATURES:
• AES-256 encryption applied to transaction
• Bank account masking: "${selectedMasking}"
• Multi-step routing through Singapore/Europe
• Legitimate banking appearance maintained

💰 TRANSACTION DETAILS:
• Type: ${tradeType} ${selectedCrypto}
• Amount: ${tradeAmount} ${selectedCrypto}
• Price: ${formatCurrency(selectedCryptoData?.priceUSD || 0)} per ${selectedCrypto}
• Total Cost: ${formatCurrency(totalCost)}
• Payment Method: ${selectedFiatAccountData?.bankName}
• Privacy Level: ${selectedCryptoData?.privacy === 'PRIVATE' ? '🔒 Maximum Privacy' : '🌐 Standard'}

${selectedCryptoData?.privacy === 'PRIVATE' ?
  '🔒 PRIVACY COIN FEATURES:\n• Transaction amounts completely hidden\n• Sender/receiver fully anonymized\n• Ring signatures & stealth addresses\n• Perfect for cold wallet storage (Ledger/Trezor compatible)' :
  '🌐 STANDARD BLOCKCHAIN:\n• Publicly verifiable transactions\n• Exchange records maintained\n• Cold wallet transfer available'}

🏦 BANKING INTEGRATION:
• Exchange sees legitimate payment from: "${selectedMasking}"
• SWIFT routing: EU→Singapore→Exchange
• Full AML/KYC compliance maintained
• Transaction appears as standard investment

❄️ COLD WALLET READY:
• Compatible with Ledger Nano S/X
• Trezor Model T support
• Hardware wallet transfer available
• Air-gapped security options

🌍 GEOGRAPHIC COMPLIANCE:
• EU regulations: Fully compliant
• Singapore MAS: Approved jurisdiction
• US market: Avoided (per architecture)
• Cross-border reporting: Automatic

This sophisticated system ensures maximum privacy while maintaining complete banking legitimacy.
Exchange systems will show this as a normal investment purchase from your masked account.
    `;

    alert(tradeDetails);
  };

  const handlePrivacyTransfer = () => {
    alert('🔒 SIMULATION: Privacy coin transfer initiated!\n\nThis simulates enhanced privacy features for educational purposes only.\n\nReal privacy coins provide transaction anonymity through advanced cryptographic techniques.');
  };

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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header user={mockUser} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🚀 Crypto Rapid Exit Trading
            </h1>
            <p className="text-gray-600 mt-2">
              <strong>Quick FIAT → Crypto Conversion</strong> - Move funds rapidly from banking system to external crypto storage.
            </p>
            <div className="mt-2 inline-flex items-center px-3 py-1 bg-orange-100 border border-orange-300 rounded-lg">
              <span className="text-orange-700 text-sm">⚡ Temporary Bank → Permanent Crypto Storage</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
              SIMULATION ONLY
            </Badge>
            <Badge variant="outline" className="bg-white/50">
              <ClockIcon className="w-3 h-3 mr-1" />
              Live prices
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Portfolio Value</p>
                  <p className="text-3xl font-bold mt-2">
                    {balancesVisible ? formatCurrency(totalPortfolioValue) : '••••••••'}
                  </p>
                  <div className="flex items-center mt-2 text-purple-100">
                    <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">+12.5% this week</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => setBalancesVisible(!balancesVisible)}
                    className="text-purple-100 hover:text-white transition-colors"
                  >
                    {balancesVisible ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                  <ChartBarIcon className="h-8 w-8 text-purple-200" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Privacy Coins</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {privacyCoins.length}
                  </p>
                  <div className="flex items-center mt-2 text-green-600">
                    <LockClosedIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">Enhanced privacy</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Trades</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {mockCryptoTransactions.filter(tx => tx.status === 'COMPLETED').length}
                  </p>
                  <div className="flex items-center mt-2 text-blue-600">
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">All completed</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {(['portfolio', 'trade', 'privacy'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'portfolio' && '📊 Portfolio'}
                  {tab === 'trade' && '💱 Trade'}
                  {tab === 'privacy' && '🔒 Privacy Coins'}
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Your Holdings</h3>
                  <Button size="sm" onClick={() => setActiveTab('trade')}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Buy Crypto
                  </Button>
                </div>
                
                {mockCryptoPortfolio.map((crypto) => (
                  <Card key={crypto.id} className="border border-gray-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600">
                            <AvatarFallback className="text-white font-bold text-lg">
                              {crypto.icon}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900">{crypto.name}</p>
                            <p className="text-sm text-gray-500">{crypto.symbol} • {crypto.network}</p>
                            <div className="flex items-center mt-1 space-x-2">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  crypto.privacy === 'PRIVATE'
                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                    : 'bg-blue-50 text-blue-700 border-blue-200'
                                }`}
                              >
                                {crypto.privacy === 'PRIVATE' ? '🔒 PRIVATE' : '🌐 PUBLIC'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">
                            {balancesVisible 
                              ? `${crypto.balance.toFixed(6)} ${crypto.symbol}`
                              : '••••••••'
                            }
                          </p>
                          <p className="text-sm text-gray-600">
                            {balancesVisible 
                              ? formatCurrency(crypto.balance * crypto.priceUSD)
                              : '••••••••'
                            }
                          </p>
                          <div className={`flex items-center text-sm ${
                            crypto.isPositive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {crypto.isPositive ? (
                              <ArrowTrendingUpIcon className="w-3 h-3 mr-1" />
                            ) : (
                              <ArrowTrendingDownIcon className="w-3 h-3 mr-1" />
                            )}
                            <span>{crypto.change24h}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'trade' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Crypto Trading</h3>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    Simulated Trading
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Place Order</CardTitle>
                      <CardDescription>Buy or sell cryptocurrencies with simulated FIAT</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex space-x-2">
                        <Button
                          variant={tradeType === 'BUY' ? 'default' : 'outline'}
                          onClick={() => setTradeType('BUY')}
                          className="flex-1"
                        >
                          Buy
                        </Button>
                        <Button
                          variant={tradeType === 'SELL' ? 'default' : 'outline'}
                          onClick={() => setTradeType('SELL')}
                          className="flex-1"
                        >
                          Sell
                        </Button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cryptocurrency
                        </label>
                        <select
                          value={selectedCrypto}
                          onChange={(e) => setSelectedCrypto(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select cryptocurrency</option>
                          {mockCryptoPortfolio.map((crypto) => (
                            <option key={crypto.id} value={crypto.symbol}>
                              {crypto.name} ({crypto.symbol}) - {formatCurrency(crypto.priceUSD)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount
                        </label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={tradeAmount}
                          onChange={(e) => setTradeAmount(e.target.value)}
                          step="0.000001"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Account
                        </label>
                        <select
                          value={selectedFiatAccount}
                          onChange={(e) => setSelectedFiatAccount(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {mockFiatAccounts.map((account) => (
                            <option key={account.id} value={account.id}>
                              {account.bankName} - {formatCurrency(account.balance, account.currency)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Button 
                        onClick={handleTrade}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        disabled={!selectedCrypto || !tradeAmount}
                      >
                        <ArrowRightIcon className="h-4 w-4 mr-2" />
                        Execute {tradeType} Order
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Trades</CardTitle>
                      <CardDescription>Your simulated trading history</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {mockCryptoTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            tx.type === 'BUY' 
                              ? 'bg-green-100' 
                              : tx.type === 'SELL'
                              ? 'bg-red-100'
                              : 'bg-blue-100'
                          }`}>
                            {tx.type === 'BUY' ? (
                              <ArrowDownLeftIcon className="h-4 w-4 text-green-600" />
                            ) : tx.type === 'SELL' ? (
                              <ArrowUpRightIcon className="h-4 w-4 text-red-600" />
                            ) : (
                              <ArrowRightIcon className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {tx.type} {tx.amount} {tx.crypto}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(tx.date)} • {tx.privacy ? '🔒 Private' : '🌐 Public'}
                            </p>
                          </div>
                          <div className="text-right">
                            {tx.totalUSD && (
                              <p className="font-bold text-sm">
                                {formatCurrency(tx.totalUSD)}
                              </p>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {tx.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Privacy Coins</h3>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    🔒 Enhanced Privacy
                  </Badge>
                </div>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <LockClosedIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-900 mb-2">Privacy Coin Features</h4>
                        <p className="text-green-700 text-sm mb-4">
                          Privacy coins like Monero (XMR) and Zcash (ZEC) provide enhanced transaction privacy 
                          through advanced cryptographic techniques. This is a simulation for educational purposes.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex items-center text-sm text-green-700">
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Hidden transaction amounts
                          </div>
                          <div className="flex items-center text-sm text-green-700">
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Obfuscated sender/receiver
                          </div>
                          <div className="flex items-center text-sm text-green-700">
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Ring signatures (XMR)
                          </div>
                          <div className="flex items-center text-sm text-green-700">
                            <CheckCircleIcon className="w-4 h-4 mr-2" />
                            Zero-knowledge proofs (ZEC)
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {privacyCoins.map((coin) => (
                    <Card key={coin.id} className="border border-green-200">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Avatar className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600">
                            <AvatarFallback className="text-white font-bold text-xl">
                              {coin.icon}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-lg">{coin.name}</h4>
                            <p className="text-gray-600">{coin.symbol}</p>
                            <Badge className="bg-green-100 text-green-800 border-green-200 mt-1">
                              Privacy Coin
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Balance:</span>
                            <span className="font-semibold">
                              {balancesVisible ? `${coin.balance.toFixed(6)} ${coin.symbol}` : '••••••••'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Value:</span>
                            <span className="font-semibold">
                              {balancesVisible ? formatCurrency(coin.balance * coin.priceUSD) : '••••••••'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">24h Change:</span>
                            <span className={`font-semibold ${coin.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {coin.change24h}
                            </span>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-2">
                          <Button 
                            size="sm" 
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={handlePrivacyTransfer}
                          >
                            <LockClosedIcon className="h-4 w-4 mr-2" />
                            Private Transfer
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setActiveTab('trade')}
                          >
                            Trade {coin.symbol}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800 text-sm">Educational Simulation Notice</p>
                        <p className="text-yellow-700 text-xs mt-1">
                          This privacy coin functionality is simulated for educational purposes only. 
                          Real privacy coins provide actual transaction anonymity and should be used 
                          in compliance with local regulations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
} 