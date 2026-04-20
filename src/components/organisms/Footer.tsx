'use client'

import Link from 'next/link'

import { STORE_INFO } from '@/lib/data'
import { formatPhoneHref } from '@/lib/utils'

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-[rgba(255,250,245,0.78)] py-16">
      <div className="container-wide grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-6">
          <Link href="/" className="font-serif-display text-3xl text-[var(--foreground)]">
            Хлопковый Край 96
          </Link>
          <p className="text-sm leading-7 text-[var(--muted-foreground)]">
            Магазин домашнего текстиля в Екатеринбурге. Подбираем постельное белье, подушки, одеяла и сопутствующие вещи без суеты и с понятной консультацией.
          </p>
          <div className="flex gap-4 text-sm text-[var(--muted-foreground)]">
            <a href={STORE_INFO.whatsapp} target="_blank" rel="noreferrer" className="transition hover:text-[var(--foreground)]">
              WhatsApp
            </a>
            <a href={STORE_INFO.telegram} target="_blank" rel="noreferrer" className="transition hover:text-[var(--foreground)]">
              Telegram
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="eyebrow">Каталог</h4>
          <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
            <li><Link href="/catalog?category=bedding">Постельное белье</Link></li>
            <li><Link href="/catalog?category=blankets">Одеяла и пледы</Link></li>
            <li><Link href="/catalog?category=pillows">Подушки</Link></li>
            <li><Link href="/catalog?category=towels">Полотенца</Link></li>
            <li><Link href="/catalog?category=robes">Халаты</Link></li>
            <li><Link href="/catalog?category=kids">Для детей</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="eyebrow">Покупателям</h4>
          <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
            <li><Link href="/about">О магазине</Link></li>
            <li><Link href="/delivery">Доставка и самовывоз</Link></li>
            <li><Link href="/returns">Обмен и возврат</Link></li>
            <li><Link href="/contacts">Контакты</Link></li>
            <li><Link href="/privacy">Политика ПД</Link></li>
            <li><Link href="/seller-info">Сведения о продавце</Link></li>
            <li><Link href="/cart">Оставить заявку</Link></li>
            <li>Подтверждаем наличие перед отправкой</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="eyebrow">Контакты</h4>
          <p className="text-sm leading-7 text-[var(--muted-foreground)]">
            {STORE_INFO.city}, {STORE_INFO.address}<br />
            {STORE_INFO.nearby}
          </p>
          <div className="space-y-1 text-sm text-[var(--muted-foreground)]">
            {STORE_INFO.workingHours.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <a href={formatPhoneHref(STORE_INFO.phones[0])} className="block text-sm text-[var(--foreground)]">
            {STORE_INFO.phones[0]}
          </a>
          <a href={`mailto:${STORE_INFO.email}`} className="block text-sm text-[var(--foreground)]">
            {STORE_INFO.email}
          </a>
        </div>
      </div>

      <div className="container-wide mt-12 border-t border-[var(--line)] pt-6 text-[11px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
        © 2026 Хлопковый Край 96
      </div>
    </footer>
  )
}
