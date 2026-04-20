import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import type { ReactNode } from 'react'

import { CartProvider } from '@/components/cart/CartProvider'
import { B2CCart } from '@/components/organisms/B2CCart'
import { Footer } from '@/components/organisms/Footer'
import { Navbar } from '@/components/organisms/Navbar'
import { buildMetadata } from '@/lib/seo'

import './globals.css'

const serif = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
})

const sans = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
})

export const metadata: Metadata = buildMetadata({
  title: 'Домашний текстиль в Екатеринбурге',
  description: 'Магазин домашнего текстиля в Екатеринбурге: постельное белье, подушки, пледы, халаты, матрасы и консультация по выбору.',
  path: '/',
})

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${serif.variable} ${sans.variable} min-h-screen`}>
        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <B2CCart />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
