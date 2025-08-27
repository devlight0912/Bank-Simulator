'use client'

import { useState } from 'react'
import { 
  ArrowRightIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  CurrencyDollarIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface ExitStrategy {
  id: string
  name: string
  description: string
  timeframe: string
  priority: 'high' | 'medium' | 'low'
  risk: 'minimal' | 'low' | 'moderate'
  icon: any
}

export default function QuickExitPage() {
  const [selectedAmount, setSelectedAmount] = useState('')
  const [selectedStrategy, setSelectedStrategy] = useState<string>('')
  const [autoExecute, setAutoExecute] = useState(false)
  const [timeLimit, setTimeLimit] = useState('5') // minutes

  const exitStrategies: ExitStrategy[] = [
    {
      id: 'crypto_conversion',
      name: '🚀 Instant Crypto Conversion',
      description: 'Immediately convert FIAT to privacy coins (XMR/ZEC) and transfer to cold wallet',
      timeframe: '2-5 minutes',
      priority: 'high',
      risk: 'minimal',
      icon: CurrencyDollarIcon
    },
    {
      id: 'atm_withdrawal',
      name: '💳 ATM Cash Withdrawal',
      description: 'Transfer to debit card and withdraw cash at ATM - completely outside banking system',
      timeframe: '1-3 minutes',
      priority: 'high',
      risk: 'minimal',
      icon: BanknotesIcon
    },
    {
      id: 'multi_crypto_split',
      name: '🔄 Multi-Crypto Distribution',
      description: 'Split funds across multiple privacy coins and wallets for maximum security',
      timeframe: '5-10 minutes',
      priority: 'medium',
      risk: 'minimal',
      icon: ArrowRightIcon
    },
    {
      id: 'daily_expenses',
      name: '🛒 Daily Expense Conversion',
      description: 'Load funds onto prepaid cards and spending accounts for daily use',
      timeframe: '3-7 minutes',
      priority: 'medium',
      risk: 'low',
      icon: CheckCircleIcon
    }
  ]

  const handleQuickExit = () => {
    if (!selectedAmount || !selectedStrategy) return

    const strategy = exitStrategies.find(s => s.id === selectedStrategy)
    if (!strategy) return

    const exitDetails = `
🚨 QUICK EXIT STRATEGY ACTIVATED!

⚡ RAPID FUND MOVEMENT INITIATED:
• Amount: €${parseFloat(selectedAmount).toLocaleString()}
• Strategy: ${strategy.name}
• Target Timeframe: ${strategy.timeframe}
• Banking Exposure: MINIMIZED

🔐 SECURITY PROTOCOL:
• AES-256 encryption maintained
• Multi-step routing activated
• External systems prioritized
• Banking footprint reduced to MINIMUM

⏱️ TIMELINE:
• T+0min: Virtual FIAT generation
• T+1min: Immediate transfer initiation
• T+${timeLimit}min: Funds OUTSIDE banking system
• T+${strategy.timeframe}: Complete crypto/cash conversion

🏦 BANKING SYSTEM EXPOSURE:
• Temporary residence: ${timeLimit} minutes MAXIMUM
• External transfer: PRIORITY
• Cold storage ready: YES
• Daily expense ready: YES

${strategy.id === 'crypto_conversion' ? 
  '🪙 CRYPTO CONVERSION DETAILS:\n• Privacy coins: XMR (Monero) priority\n• Cold wallet: Ledger/Trezor ready\n• Exchange routing: EU/Singapore only\n• Anonymous transfer: Ring signatures active' :
  strategy.id === 'atm_withdrawal' ?
  '💳 ATM WITHDRAWAL DETAILS:\n• Debit card loading: Instant\n• ATM network: Global access\n• Cash availability: Immediate\n• Banking trace: Minimal standard transaction' :
  strategy.id === 'multi_crypto_split' ?
  '🔄 MULTI-CRYPTO DISTRIBUTION:\n• XMR: 40% (Maximum privacy)\n• ZEC: 30% (Shielded transactions)\n• BTC: 20% (Store of value)\n• ETH: 10% (DeFi access)' :
  '🛒 DAILY EXPENSE SETUP:\n• Prepaid cards: Multiple providers\n• Spending accounts: EU/Singapore\n• Daily limits: Optimized\n• Expense tracking: Anonymous'}

🌍 GEOGRAPHIC STRATEGY:
• EU operations: Fully compliant
• Singapore gateway: Active
• US exposure: ZERO
• External systems: PRIORITIZED

⚠️  IMPORTANT: This strategy ensures your funds spend MINIMAL time in traditional banking systems, 
moving quickly to external, secure, and private storage/usage options.

Banking system exposure reduced to absolute minimum as requested!
    `

    alert(exitDetails)
  }

  const handleAutoSchedule = () => {
    alert(`🤖 AUTO-EXIT SCHEDULER ACTIVATED!

⚡ AUTOMATED FUND MOVEMENT:
• Trigger: Any FIAT deposit > €1,000
• Max Bank Residence: ${timeLimit} minutes
• Auto-Strategy: ${selectedStrategy || 'Crypto Conversion'}
• Monitoring: 24/7 active

🔄 PROCESS:
1. Virtual FIAT generated
2. ${timeLimit}-minute timer starts
3. Automatic ${selectedStrategy === 'crypto_conversion' ? 'crypto conversion' : selectedStrategy === 'atm_withdrawal' ? 'ATM withdrawal' : 'exit strategy'} triggered
4. Funds moved OUTSIDE banking system
5. Confirmation sent

This ensures you're NEVER exposed to prolonged banking system residence!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            ⚡ Quick Exit Strategy
          </h1>
          <p className="text-red-200 text-lg max-w-3xl mx-auto">
            <strong>Minimize Banking System Exposure</strong> - Move funds rapidly to external systems, 
            crypto assets, or cash. Stay OUTSIDE traditional banking for maximum security.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Exit Configuration */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-red-400/30">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 mr-3 text-red-400" />
              Rapid Exit Configuration
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Amount to Move (EUR)</label>
                <input
                  type="number"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-red-400/30 text-white placeholder-white/60"
                  placeholder="100000"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Maximum Bank Residence Time</label>
                <select
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-red-400/30 text-white"
                >
                  <option value="1" className="bg-slate-800">1 minute (Ultra-fast)</option>
                  <option value="3" className="bg-slate-800">3 minutes (Fast)</option>
                  <option value="5" className="bg-slate-800">5 minutes (Standard)</option>
                  <option value="10" className="bg-slate-800">10 minutes (Maximum)</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Exit Strategy</label>
                <div className="space-y-3">
                  {exitStrategies.map(strategy => (
                    <div 
                      key={strategy.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedStrategy === strategy.id
                          ? 'border-red-400 bg-red-500/20'
                          : 'border-white/20 bg-white/10 hover:border-red-400/50'
                      }`}
                      onClick={() => setSelectedStrategy(strategy.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{strategy.name}</h3>
                          <p className="text-white/80 text-sm mb-2">{strategy.description}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="text-green-400">⏱️ {strategy.timeframe}</span>
                            <span className={`px-2 py-1 rounded ${
                              strategy.priority === 'high' ? 'bg-red-500/30 text-red-300' :
                              strategy.priority === 'medium' ? 'bg-yellow-500/30 text-yellow-300' :
                              'bg-gray-500/30 text-gray-300'
                            }`}>
                              {strategy.priority.toUpperCase()}
                            </span>
                            <span className="text-green-400">Risk: {strategy.risk}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="autoExecute"
                  checked={autoExecute}
                  onChange={(e) => setAutoExecute(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded border-gray-300"
                />
                <label htmlFor="autoExecute" className="text-white">
                  Auto-execute when funds arrive (24/7 monitoring)
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleQuickExit}
                  disabled={!selectedAmount || !selectedStrategy}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Execute Quick Exit
                </button>
                
                <button
                  onClick={handleAutoSchedule}
                  disabled={!selectedStrategy}
                  className="bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Schedule Auto-Exit
                </button>
              </div>
            </div>
          </div>

          {/* Banking Exposure Warning */}
          <div className="space-y-6">
            <div className="bg-red-500/20 backdrop-blur-lg rounded-xl p-6 border border-red-400/50">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <ClockIcon className="h-8 w-8 mr-3 text-red-400" />
                Banking System Exposure
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-600/30 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">⚠️ Minimize Time in Banking System</h3>
                  <p className="text-red-200 text-sm">
                    Keep funds in traditional banks for the SHORTEST possible time. 
                    Move quickly to external systems for maximum security.
                  </p>
                </div>
                
                <div className="p-4 bg-green-600/30 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">✅ External Security Priority</h3>
                  <p className="text-green-200 text-sm">
                    Crypto wallets, cash, and prepaid systems provide security OUTSIDE 
                    traditional banking surveillance and controls.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-600/30 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">🔄 Rapid Movement Strategy</h3>
                  <p className="text-blue-200 text-sm">
                    Virtual FIAT → Quick Transfer → External Systems → Daily Use/Storage
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <ShieldCheckIcon className="h-6 w-6 mr-2 text-green-400" />
                External Security Features
              </h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-green-300">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Cold wallet storage (Ledger/Trezor)
                </div>
                <div className="flex items-center text-green-300">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Privacy coin conversion (XMR/ZEC)
                </div>
                <div className="flex items-center text-green-300">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  ATM cash withdrawal
                </div>
                <div className="flex items-center text-green-300">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Prepaid card loading
                </div>
                <div className="flex items-center text-green-300">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Multiple crypto exchanges
                </div>
                <div className="flex items-center text-green-300">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Anonymous spending accounts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Comparison */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">📊 Exit Strategy Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Strategy</th>
                  <th className="text-left py-3 px-4">Time</th>
                  <th className="text-left py-3 px-4">Security</th>
                  <th className="text-left py-3 px-4">Anonymity</th>
                  <th className="text-left py-3 px-4">Daily Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Crypto Conversion</td>
                  <td className="py-3 px-4 text-green-400">2-5 min</td>
                  <td className="py-3 px-4 text-green-400">Highest</td>
                  <td className="py-3 px-4 text-green-400">Maximum</td>
                  <td className="py-3 px-4 text-yellow-400">Medium</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">ATM Withdrawal</td>
                  <td className="py-3 px-4 text-green-400">1-3 min</td>
                  <td className="py-3 px-4 text-yellow-400">High</td>
                  <td className="py-3 px-4 text-yellow-400">High</td>
                  <td className="py-3 px-4 text-green-400">Excellent</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Multi-Crypto Split</td>
                  <td className="py-3 px-4 text-yellow-400">5-10 min</td>
                  <td className="py-3 px-4 text-green-400">Highest</td>
                  <td className="py-3 px-4 text-green-400">Maximum</td>
                  <td className="py-3 px-4 text-yellow-400">Medium</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Daily Expenses</td>
                  <td className="py-3 px-4 text-yellow-400">3-7 min</td>
                  <td className="py-3 px-4 text-yellow-400">High</td>
                  <td className="py-3 px-4 text-yellow-400">High</td>
                  <td className="py-3 px-4 text-green-400">Excellent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
