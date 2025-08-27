import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SecureBank Simulator - Crypto & Banking',
  description: 'Advanced Bank & Cryptocurrency Simulation System with Privacy Coin Support',
  keywords: 'banking, simulation, cryptocurrency, privacy coins, monero, zcash, bitcoin, ethereum',
  authors: [{ name: 'SecureBank Simulator Team' }],
  robots: 'noindex, nofollow', // Since this is a simulation
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'SecureBank Sim',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#4F46E5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          {children}
        </div>
      </body>
    </html>
  )
} 