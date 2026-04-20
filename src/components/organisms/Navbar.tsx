'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Menu, Phone, ShoppingBag, X } from 'lucide-react'

import { useCart } from '@/components/cart/CartProvider'
import { STORE_INFO } from '@/lib/data'
import { formatPhoneHref } from '@/lib/utils'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemsCount } = useCart()

  const navLinks = [
    { name: 'Каталог', href: '/catalog' },
    { name: 'О магазине', href: '/about' },
    { name: 'Контакты', href: '/contacts' },
    { name: 'Политика ПД', href: '/privacy' },
    { name: 'Заявка', href: '/cart' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[rgba(251,247,242,0.76)] backdrop-blur-lg">
      <div className="container-wide flex items-center justify-between gap-6 py-3.5">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex flex-col gap-1">
            <span className="font-serif-display text-[2rem] leading-none text-[var(--foreground)]">Хлопковый Край 96</span>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
              Домашний текстиль • Екатеринбург
            </span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="hidden items-center gap-2 text-sm text-[var(--muted-foreground)] xl:flex">
            <MapPin className="h-4 w-4" />
            <span>{STORE_INFO.address}</span>
          </div>
          <a
            href={formatPhoneHref(STORE_INFO.phones[0])}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--foreground)] transition hover:border-[var(--accent)]"
          >
            <Phone className="h-4 w-4" />
            {STORE_INFO.phones[0]}
          </a>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-dark)] px-4 py-2 text-sm text-white transition hover:bg-[var(--foreground)]"
          >
            <ShoppingBag className="h-4 w-4" />
            {itemsCount > 0 ? `Заявка (${itemsCount})` : 'Заявка'}
          </Link>
        </div>

        <button
          className="rounded-full border border-[var(--line)] p-2 text-[var(--foreground)] lg:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label="Открыть меню"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-[var(--line)] bg-[var(--panel-strong)] transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'max-h-96 py-5' : 'max-h-0 py-0'
        }`}
      >
        <div className="container-wide space-y-5">
          <nav className="grid gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-[var(--foreground)]"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="space-y-3 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted-foreground)]">
            <p>{STORE_INFO.city}, {STORE_INFO.address}</p>
            <a href={formatPhoneHref(STORE_INFO.phones[0])} className="inline-flex items-center gap-2 text-[var(--foreground)]">
              <Phone className="h-4 w-4" />
              {STORE_INFO.phones[0]}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
