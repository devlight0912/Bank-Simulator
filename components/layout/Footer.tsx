'use client';

import { 
  ShieldCheckIcon, 
  BanknotesIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const features = [
    'Multi-Currency Support',
    'IBAN Generation',
    'Secure Transfers',
    'Real-time Monitoring',
    'Fraud Detection',
    'Mobile Optimized'
  ];

  const security = [
    'AES-256 Encryption',
    'Multi-Factor Auth',
    'PCI DSS Compliant',
    'GDPR Compliant',
    'ISO 27001 Certified',
    'Bank-Grade Security'
  ];

  const quickLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounts', href: '/accounts' },
    { label: 'Transfer Money', href: '/transfer' },
    { label: 'Transaction History', href: '/transactions' },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShieldCheckIcon className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">SecureBank</h3>
                <Badge variant="outline" className="bg-blue-800/50 text-blue-200 border-blue-600 mt-1">
                  Simulation Platform
                </Badge>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Professional banking simulation platform designed for testing, demonstration, 
              and educational purposes with enterprise-grade security.
            </p>
            
            <div className="space-y-3">
              <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-600">
                <BanknotesIcon className="w-3 h-3 mr-1" />
                Simulation Only - Not Real Banking
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPinIcon className="w-4 h-4" />
                <span>Global Banking Simulation Network</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <div className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h5 className="text-sm font-semibold text-gray-400 mb-3">Contact Support</h5>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>support@securebank-sim.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="w-4 h-4" />
                  <span>+1 (555) 123-BANK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <CurrencyDollarIcon className="w-5 h-5 mr-2 text-blue-400" />
              Features
            </h4>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Compliance */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-400" />
              Security
            </h4>
            <ul className="space-y-3">
              {security.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-300">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-8" />

        {/* Global Coverage Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-white mb-2 flex items-center justify-center">
              <GlobeAltIcon className="w-6 h-6 mr-2 text-blue-400" />
              Global Banking Simulation
            </h4>
            <p className="text-gray-300">Supporting 50+ countries with complete IBAN/BIC generation</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">
            {[
              { code: 'DE', name: 'Germany', flag: '🇩🇪' },
              { code: 'FR', name: 'France', flag: '🇫🇷' },
              { code: 'IT', name: 'Italy', flag: '🇮🇹' },
              { code: 'ES', name: 'Spain', flag: '🇪🇸' },
              { code: 'GB', name: 'UK', flag: '🇬🇧' },
              { code: 'NO', name: 'Norway', flag: '🇳🇴' },
              { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
              { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
              { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
              { code: 'NL', name: 'Netherlands', flag: '🇳🇱' }
            ].map((country, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors cursor-pointer group"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                  {country.flag}
                </div>
                <div className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">
                  {country.code}
                </div>
                <div className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                  {country.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-700 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} SecureBank Simulator. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">
                Privacy Policy
              </Button>
              <Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">
                Terms of Service
              </Button>
              <Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">
                Cookie Policy
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <DevicePhoneMobileIcon className="w-4 h-4" />
              <span>Optimized for Samsung Galaxy Tab S10 FE 5G</span>
            </div>
            <Badge className="bg-green-600 text-white border-0">
              <div className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></div>
              System Online
            </Badge>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="bg-gray-800/50 rounded-xl p-4">
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              <strong className="text-gray-300">Important Disclaimer:</strong> This is a banking simulation platform for educational, 
              testing, and demonstration purposes only. All accounts, transactions, and financial data are simulated and not connected 
              to real banking institutions. Do not use for actual financial transactions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 