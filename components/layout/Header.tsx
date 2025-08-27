'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ShieldCheckIcon, 
  BellIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface HeaderProps {
  user?: {
    firstName: string;
    lastName: string;
    securityLevel: 'STANDARD' | 'HIGH' | 'MAXIMUM';
  };
  onLogout?: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getSecurityBadgeColor = (level: string) => {
    switch (level) {
      case 'MAXIMUM': return 'default';
      case 'HIGH': return 'secondary';
      default: return 'outline';
    }
  };

  const isActivePage = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: null },
    { href: '/accounts', label: 'Accounts', icon: null },
    { href: '/transfer', label: 'Transfer', icon: null },
    { href: '/direct-payment', label: 'Direct Payment', icon: null },
    { 
      href: '/crypto', 
      label: 'Crypto', 
      icon: CurrencyDollarIcon,
      badge: 'NEW',
      isNew: true 
    },
    { href: '/transactions', label: 'History', icon: null },
  ];

  return (
    <header className="bg-white border-b border-secondary-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center hover:opacity-80 transition-opacity">
            <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-secondary-900">
              SecureBank
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors duration-200 flex items-center space-x-1 ${
                  isActivePage(link.href)
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                    : 'text-secondary-700 hover:text-primary-600'
                }`}
              >
                {link.icon && (
                  <link.icon className={`h-4 w-4 ${link.isNew ? 'text-purple-600' : ''}`} />
                )}
                <span>{link.label}</span>
                {link.badge && (
                  <Badge 
                    variant="outline" 
                    className="ml-1 text-xs bg-purple-50 text-purple-700 border-purple-200"
                  >
                    {link.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* User Info & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-3">
                  <Badge variant={getSecurityBadgeColor(user.securityLevel)}>
                    {user.securityLevel}
                  </Badge>
                  <div className="text-sm">
                    <p className="font-medium text-secondary-900">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative"
                  onClick={() => alert('Notifications feature coming soon!')}
                >
                  <BellIcon className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-secondary-200">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePage(link.href)
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon && (
                    <link.icon className={`h-5 w-5 ${link.isNew ? 'text-purple-600' : ''}`} />
                  )}
                  <span>{link.label}</span>
                  {link.badge && (
                    <Badge 
                      variant="outline" 
                      className="ml-auto text-xs bg-purple-50 text-purple-700 border-purple-200"
                    >
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              
              {user && (
                <div className="border-t border-secondary-200 pt-4">
                  <div className="flex items-center px-3 mb-3">
                    <Badge variant={getSecurityBadgeColor(user.securityLevel)}>
                      {user.securityLevel}
                    </Badge>
                    <span className="ml-3 text-sm font-medium text-secondary-900">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout?.();
                    }}
                    className="mx-3 w-full"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 