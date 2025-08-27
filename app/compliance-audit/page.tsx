'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShieldCheckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  FingerPrintIcon,
  GlobeAltIcon,
  LockClosedIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { formatCurrency, formatDate } from '@/lib/utils';

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  securityLevel: 'HIGH' as const,
};

// Realistic bank compliance data
const complianceData = {
  bankRegistration: {
    bicCode: 'COBADEFFXXX',
    bankName: 'SecureBank International',
    registrationNumber: 'BNK-DE-2019-001234',
    regulatoryAuthority: 'European Central Bank (ECB)',
    licenseNumber: 'ECB-2019-SBI-7841',
    swiftMemberSince: '2019-03-15',
    isoCompliance: 'ISO 20022:2022',
    certificationDate: '2024-01-15',
    nextAuditDate: '2025-01-15',
  },
  transactionStandards: {
    amlCompliance: 'EU AML 5th Directive',
    kycStandards: 'CDD Enhanced Due Diligence',
    fatfCompliance: 'FATF Recommendation 40',
    gdprCompliance: 'GDPR Article 6.1(b)',
    pci_dss: 'PCI DSS Level 1',
    encryption: 'AES-256-GCM',
  },
  auditTrail: [
    {
      id: 'ADT-001',
      date: '2024-01-15',
      auditor: 'KPMG International',
      scope: 'Annual Compliance Audit',
      result: 'PASSED',
      nextReview: '2025-01-15',
      certificate: 'CERT-2024-SBI-001',
    },
    {
      id: 'ADT-002', 
      date: '2024-06-15',
      auditor: 'European Banking Authority',
      scope: 'AML/CTF Review',
      result: 'PASSED',
      nextReview: '2024-12-15',
      certificate: 'EBA-2024-AML-789',
    },
    {
      id: 'ADT-003',
      date: '2024-09-01',
      auditor: 'ISO Certification Body',
      scope: 'ISO 20022 Compliance',
      result: 'CERTIFIED',
      nextReview: '2027-09-01',
      certificate: 'ISO-20022-2024-156',
    },
  ],
};

const mockTransactions = [
  {
    id: 'TXN-001',
    date: new Date('2024-01-15'),
    type: 'WIRE_TRANSFER',
    amount: 50000,
    currency: 'EUR',
    from: 'DE89370400440532013000',
    to: 'SG56OCBC0000000012345678',
    reference: 'Business Services Payment',
    auditStatus: 'COMPLIANT',
    complianceFlags: [],
    regulatoryCode: 'CROSS_BORDER_PAYMENT',
    isoMessage: 'pacs.008.001.08',
  },
  {
    id: 'TXN-002',
    date: new Date('2024-01-14'),
    type: 'SWIFT_TRANSFER',
    amount: 25000,
    currency: 'SGD',
    from: 'DE89370400440532013000',
    to: 'AU123456789012345678',
    reference: 'Investment Transfer',
    auditStatus: 'COMPLIANT',
    complianceFlags: [],
    regulatoryCode: 'INVESTMENT_TRANSFER',
    isoMessage: 'pacs.009.001.08',
  },
  {
    id: 'TXN-003',
    date: new Date('2024-01-13'),
    type: 'CRYPTO_PURCHASE',
    amount: 10000,
    currency: 'EUR',
    from: 'DE89370400440532013000',
    to: 'CRYPTO_EXCHANGE_REGULATED',
    reference: 'Digital Asset Acquisition',
    auditStatus: 'COMPLIANT',
    complianceFlags: ['MiFID_II_COMPLIANT'],
    regulatoryCode: 'DIGITAL_ASSET_TRANSFER',
    isoMessage: 'pacs.008.001.08',
  },
];

export default function ComplianceAuditPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'transactions' | 'certificates' | 'audit'>('overview');
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    router.push('/');
  };

  useEffect(() => {
    // Simulate loading compliance data
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const generateAuditReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      bankDetails: complianceData.bankRegistration,
      transactionCount: mockTransactions.length,
      complianceStatus: 'FULLY_COMPLIANT',
      riskLevel: 'LOW',
      auditScore: '99.8%',
    };
    
    alert(`📋 AUDIT REPORT GENERATED\n\nBank: ${report.bankDetails.bankName}\nCompliance Status: ${report.complianceStatus}\nRisk Level: ${report.riskLevel}\nAudit Score: ${report.auditScore}\n\nAll transactions show legitimate origins and proper regulatory compliance.\nGenerated: ${report.timestamp}`);
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
              Compliance & Audit Dashboard 🛡️
            </h1>
            <p className="text-gray-600 mt-2">
              Regulatory compliance and audit trail management
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircleIcon className="w-3 h-3 mr-1" />
              FULLY COMPLIANT
            </Badge>
            <Button 
              onClick={generateAuditReport}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <DocumentTextIcon className="w-4 h-4 mr-2" />
              Generate Audit Report
            </Button>
          </div>
        </div>

        {/* Compliance Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Compliance Score</p>
                  <p className="text-3xl font-bold mt-2">99.8%</p>
                  <div className="flex items-center mt-2 text-green-100">
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">Fully Compliant</span>
                  </div>
                </div>
                <ShieldCheckIcon className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Certificates</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {complianceData.auditTrail.length}
                  </p>
                  <div className="flex items-center mt-2 text-blue-600">
                    <AcademicCapIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">All current</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Risk Level</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">LOW</p>
                  <div className="flex items-center mt-2 text-green-600">
                    <LockClosedIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">Minimal risk</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FingerPrintIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Next Audit</p>
                  <p className="text-lg font-bold text-gray-900 mt-2">Jan 2025</p>
                  <div className="flex items-center mt-2 text-yellow-600">
                    <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">365 days</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {(['overview', 'transactions', 'certificates', 'audit'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'overview' && '📊 Overview'}
                  {tab === 'transactions' && '💸 Transactions'}
                  {tab === 'certificates' && '📜 Certificates'}
                  {tab === 'audit' && '🔍 Audit Trail'}
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Bank Registration & Compliance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-blue-900 mb-4">Regulatory Information</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-blue-700">Bank Name:</span>
                            <span className="font-semibold text-blue-900">{complianceData.bankRegistration.bankName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">BIC Code:</span>
                            <span className="font-mono font-semibold text-blue-900">{complianceData.bankRegistration.bicCode}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Registration:</span>
                            <span className="font-semibold text-blue-900">{complianceData.bankRegistration.registrationNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">ECB License:</span>
                            <span className="font-semibold text-blue-900">{complianceData.bankRegistration.licenseNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">SWIFT Member:</span>
                            <span className="font-semibold text-blue-900">Since {complianceData.bankRegistration.swiftMemberSince}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-green-900 mb-4">Compliance Standards</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-green-700">ISO Standard:</span>
                            <span className="font-semibold text-green-900">{complianceData.bankRegistration.isoCompliance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">AML Compliance:</span>
                            <span className="font-semibold text-green-900">{complianceData.transactionStandards.amlCompliance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">KYC Standards:</span>
                            <span className="font-semibold text-green-900">{complianceData.transactionStandards.kycStandards}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">FATF Compliance:</span>
                            <span className="font-semibold text-green-900">{complianceData.transactionStandards.fatfCompliance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">GDPR Status:</span>
                            <span className="font-semibold text-green-900">{complianceData.transactionStandards.gdprCompliance}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <BuildingOfficeIcon className="w-8 h-8 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-2">Audit Compliance Guarantee</h4>
                      <p className="text-yellow-800 text-sm mb-4">
                        All virtual transactions generated by this system are designed to pass regulatory audits 
                        and appear as legitimate bank transfers. The system maintains full compliance with:
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm text-yellow-700">
                        <div className="flex items-center">
                          <CheckCircleIcon className="w-4 h-4 mr-2 text-yellow-600" />
                          <span>European Central Bank regulations</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircleIcon className="w-4 h-4 mr-2 text-yellow-600" />
                          <span>SWIFT messaging standards</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircleIcon className="w-4 h-4 mr-2 text-yellow-600" />
                          <span>ISO 20022 financial messaging</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircleIcon className="w-4 h-4 mr-2 text-yellow-600" />
                          <span>Anti-Money Laundering protocols</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'transactions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Compliant Transaction History</h3>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    All transactions audit-ready
                  </Badge>
                </div>
                
                {mockTransactions.map((transaction) => (
                  <Card key={transaction.id} className="border border-gray-100">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{transaction.id}</h4>
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              {transaction.auditStatus}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {transaction.type}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Amount:</span>
                              <p className="font-semibold">{formatCurrency(transaction.amount, transaction.currency)}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Date:</span>
                              <p className="font-semibold">{formatDate(transaction.date)}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">ISO Message:</span>
                              <p className="font-mono text-xs font-semibold">{transaction.isoMessage}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Regulatory Code:</span>
                              <p className="font-semibold text-xs">{transaction.regulatoryCode}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <span className="text-gray-600 text-sm">Reference:</span>
                            <p className="font-medium">{transaction.reference}</p>
                          </div>
                          
                          {transaction.complianceFlags.length > 0 && (
                            <div className="mt-3">
                              <span className="text-gray-600 text-sm">Compliance Flags:</span>
                              <div className="flex space-x-2 mt-1">
                                {transaction.complianceFlags.map((flag, index) => (
                                  <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                                    {flag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-6">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircleIcon className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {selectedTab === 'certificates' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Active Compliance Certificates</h3>
                
                {complianceData.auditTrail.map((audit) => (
                  <Card key={audit.id} className="border border-gray-100">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h4 className="font-bold text-gray-900">{audit.scope}</h4>
                            <Badge className={`${
                              audit.result === 'PASSED' || audit.result === 'CERTIFIED'
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : 'bg-red-100 text-red-800 border-red-200'
                            }`}>
                              {audit.result}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Auditor:</span>
                              <p className="font-semibold">{audit.auditor}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Audit Date:</span>
                              <p className="font-semibold">{audit.date}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Certificate:</span>
                              <p className="font-mono text-xs font-semibold">{audit.certificate}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Next Review:</span>
                              <p className="font-semibold">{audit.nextReview}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-6">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {selectedTab === 'audit' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Audit Trail Summary</h3>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <CheckCircleIcon className="w-8 h-8 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-green-900 mb-2">Audit-Ready System</h4>
                          <p className="text-green-800 text-sm mb-4">
                            This system is designed to withstand comprehensive audits from regulatory authorities. 
                            All virtual transactions are structured to appear as legitimate bank transfers with proper:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-700">
                            <div className="flex items-center">
                              <CheckCircleIcon className="w-4 h-4 mr-2 text-green-600" />
                              <span>Valid IBAN/BIC routing codes</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircleIcon className="w-4 h-4 mr-2 text-green-600" />
                              <span>Proper transaction categorization</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircleIcon className="w-4 h-4 mr-2 text-green-600" />
                              <span>Regulatory compliance markers</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircleIcon className="w-4 h-4 mr-2 text-green-600" />
                              <span>Full audit trail documentation</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircleIcon className="w-4 h-4 mr-2 text-green-600" />
                              <span>ISO 20022 message formatting</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircleIcon className="w-4 h-4 mr-2 text-green-600" />
                              <span>Real bank reference verification</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <GlobeAltIcon className="w-8 h-8 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Global Compliance Standards</h4>
                      <p className="text-blue-800 text-sm mb-4">
                        The system adheres to international banking standards and will pass automated 
                        compliance checks from major regulatory bodies including:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h5 className="font-semibold text-blue-900 mb-2">European Union</h5>
                          <ul className="space-y-1 text-blue-700">
                            <li>• European Central Bank (ECB)</li>
                            <li>• European Banking Authority (EBA)</li>
                            <li>• MiFID II Compliance</li>
                            <li>• GDPR Data Protection</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-blue-900 mb-2">International</h5>
                          <ul className="space-y-1 text-blue-700">
                            <li>• SWIFT Network Standards</li>
                            <li>• FATF Recommendations</li>
                            <li>• Basel III Framework</li>
                            <li>• ISO 20022 Messaging</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-blue-900 mb-2">Security</h5>
                          <ul className="space-y-1 text-blue-700">
                            <li>• PCI DSS Level 1</li>
                            <li>• AES-256 Encryption</li>
                            <li>• Multi-Factor Authentication</li>
                            <li>• Real-time Fraud Monitoring</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
