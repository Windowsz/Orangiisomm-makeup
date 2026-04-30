import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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

export const metadata: Metadata = {
  title: 'Orangiisomm — Professional Makeup Artist',
  description: 'Professional makeup artistry by Orangiisomm. Bridal, editorial, and special occasion makeup.',
  openGraph: {
    title: 'Orangiisomm — Professional Makeup Artist',
    description: 'Professional makeup artistry by Orangiisomm.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        <div id="fb-root" />
        <Navbar />
        {children}
        <Footer />
        <div id="portal-root" />
      </body>
    </html>
  )
}
