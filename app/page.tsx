'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  BanknotesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    rememberMe: false,
    acceptTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  const features = [
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: 'Bank-Grade Security',
      description: 'Military-grade AES-256 encryption with multi-factor authentication'
    },
    {
      icon: <GlobeAltIcon className="w-6 h-6" />,
      title: 'Global IBAN Support',
      description: '50+ countries including DE, IT, FR, NO, and more'
    },
    {
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      title: 'Multi-Currency',
      description: 'USD, EUR, GBP, NOK, CHF, and 5+ more currencies'
    },
    {
      icon: <DevicePhoneMobileIcon className="w-6 h-6" />,
      title: 'Mobile Optimized',
      description: 'Perfect for Samsung Galaxy Tab S10 FE 5G'
    }
  ];

  const stats = [
    { value: '50+', label: 'Countries Supported' },
    { value: '10', label: 'Major Currencies' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '256-bit', label: 'AES Encryption' },
  ];

  const trustBadges = [
    'SSL/TLS 1.3 Encryption',
    'PCI DSS Compliant',
    'GDPR Compliant',
    'ISO 27001 Certified',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Column - Marketing Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Logo & Brand */}
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <ShieldCheckIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">SecureBank</h1>
                  <Badge variant="secondary" className="mt-1">
                    Simulation Platform
                  </Badge>
                </div>
              </div>
              
              {/* Main Headline */}
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight">
                  The Most
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Secure </span>
                  Banking Simulator
                </h2>
                
                <p className="text-xl text-gray-600 max-w-2xl">
                  Experience realistic banking operations with military-grade security. 
                  Complete IBAN/BIC generation for 50+ countries with multi-currency support.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="group">
                    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-white/70 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                            {feature.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="hidden lg:block">
                <Separator className="my-8" />
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Security & Compliance</h3>
                  <div className="flex flex-wrap gap-3">
                    {trustBadges.map((badge, index) => (
                      <Badge key={index} variant="outline" className="bg-white/50">
                        <CheckCircleIcon className="w-3 h-3 mr-1 text-green-600" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Authentication Form */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold">
                      {isLogin ? 'Welcome Back' : 'Get Started'}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {isLogin 
                        ? 'Sign in to your secure banking simulator' 
                        : 'Create your secure banking account'
                      }
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {!isLogin && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Input
                              name="firstName"
                              placeholder="First Name"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              className="h-12"
                            />
                          </div>
                          <div>
                            <Input
                              name="lastName"
                              placeholder="Last Name"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              className="h-12"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="relative">
                        <Input
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="h-12 pr-12"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      {!isLogin && (
                        <div>
                          <Input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="h-12"
                          />
                        </div>
                      )}

                      {isLogin && (
                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              name="rememberMe"
                              type="checkbox"
                              checked={formData.rememberMe}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Remember me</span>
                          </label>
                          <Button variant="link" className="p-0 h-auto text-sm">
                            Forgot password?
                          </Button>
                        </div>
                      )}

                      {!isLogin && (
                        <div className="flex items-start space-x-3">
                          <input
                            name="acceptTerms"
                            type="checkbox"
                            checked={formData.acceptTerms}
                            onChange={handleInputChange}
                            required
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                          />
                          <label className="text-sm text-gray-700 leading-relaxed">
                            I agree to the{' '}
                            <Button variant="link" className="p-0 h-auto text-sm">
                              Terms of Service
                            </Button>{' '}
                            and{' '}
                            <Button variant="link" className="p-0 h-auto text-sm">
                              Privacy Policy
                            </Button>
                          </label>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <LockClosedIcon className="h-5 w-5" />
                            <span>{isLogin ? 'Sign In Securely' : 'Create Account'}</span>
                            <ArrowRightIcon className="h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </form>

                    <Separator />

                    {/* Switch between login/register */}
                    <div className="text-center">
                      <Button
                        variant="ghost"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm font-medium"
                      >
                        {isLogin 
                          ? "Don't have an account? Sign up" 
                          : 'Already have an account? Sign in'
                        }
                      </Button>
                    </div>

                    {/* Security Badge */}
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <ShieldCheckIcon className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-green-900 mb-1">
                              Enterprise-Grade Security
                            </h4>
                            <ul className="text-xs text-green-800 space-y-0.5">
                              <li>• End-to-end AES-256 encryption</li>
                              <li>• Multi-factor authentication</li>
                              <li>• Real-time fraud monitoring</li>
                              <li>• GDPR & PCI DSS compliant</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Financial Professionals
            </h2>
            <p className="text-xl text-blue-100">
              Industry-leading simulation platform with proven results
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 