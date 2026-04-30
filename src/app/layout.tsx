import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StructuredData from '@/components/StructuredData'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orangiisomm-makeup.vercel.app'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C9A96E',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Orangiisomm — ช่างแต่งหน้ามืออาชีพ | Professional Makeup Artist',
    template: '%s | Orangiisomm',
  },
  description:
    'Orangiisomm ช่างแต่งหน้ามืออาชีพ รับแต่งหน้าเจ้าสาว งานแต่งงาน ถ่ายภาพ และโอกาสพิเศษทุกประเภท — Professional makeup artist for bridal, wedding, editorial and special occasions in Thailand.',
  keywords: [
    'ช่างแต่งหน้า',
    'แต่งหน้าเจ้าสาว',
    'แต่งหน้าแต่งงาน',
    'รับแต่งหน้า',
    'ช่างแต่งหน้ามืออาชีพ',
    'แต่งหน้าถ่ายภาพ',
    'เมคอัพอาร์ทิส',
    'Orangiisomm',
    'makeup artist',
    'professional makeup',
    'bridal makeup',
    'wedding makeup',
    'editorial makeup',
    'special occasion makeup',
    'Thailand makeup artist',
  ],
  authors: [{ name: 'Orangiisomm' }],
  creator: 'Orangiisomm',
  publisher: 'Orangiisomm',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    alternateLocale: 'en_US',
    url: '/',
    siteName: 'Orangiisomm Makeup',
    title: 'Orangiisomm — ช่างแต่งหน้ามืออาชีพ | Professional Makeup Artist',
    description:
      'ช่างแต่งหน้ามืออาชีพ รับแต่งหน้าเจ้าสาว งานแต่งงาน ถ่ายภาพ และโอกาสพิเศษ — Bridal, wedding & editorial makeup artist in Thailand.',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Orangiisomm — ช่างแต่งหน้ามืออาชีพ | Professional Makeup Artist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orangiisomm — ช่างแต่งหน้ามืออาชีพ | Professional Makeup Artist',
    description:
      'ช่างแต่งหน้ามืออาชีพ รับแต่งหน้าเจ้าสาว งานแต่งงาน ถ่ายภาพ และโอกาสพิเศษ',
    images: ['/api/og'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        <StructuredData />
        <Navbar />
        {children}
        <Footer />
        <div id="portal-root" />
      </body>
    </html>
  )
}
