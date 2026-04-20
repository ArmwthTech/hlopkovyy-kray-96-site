import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircleMore, PhoneCall } from 'lucide-react'

import { buildLocalBusinessSchema, buildMetadata } from '@/lib/seo'
import { STORE_INFO } from '@/lib/data'
import { formatPhoneHref } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'Контакты магазина домашнего текстиля в Екатеринбурге',
  description: 'Контакты магазина «Хлопковый Край 96» в Екатеринбурге: адрес, телефон, режим работы и быстрые каналы связи.',
  path: '/contacts',
})

export default function ContactsPage() {
  const schema = buildLocalBusinessSchema()

  return (
    <main className="container-wide pb-20 pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-3xl space-y-4">
        <span className="eyebrow">Контакты</span>
        <h1 className="font-serif-display text-4xl text-[var(--foreground)] md:text-6xl">Магазин домашнего текстиля в Екатеринбурге</h1>
        <p className="text-base leading-7 text-[var(--muted-foreground)]">
          Можно приехать в магазин, позвонить по наличию или написать в мессенджер, если нужно подобрать постельное белье, подушки, одеяла, полотенца или матрас.
        </p>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-6">
          <MapPin className="h-5 w-5 text-[var(--accent-dark)]" />
          <h2 className="mt-5 font-serif-display text-3xl text-[var(--foreground)]">Адрес</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
            {STORE_INFO.city}, {STORE_INFO.address}<br />
            {STORE_INFO.nearby}
          </p>
        </article>
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-6">
          <PhoneCall className="h-5 w-5 text-[var(--accent-dark)]" />
          <h2 className="mt-5 font-serif-display text-3xl text-[var(--foreground)]">Телефон</h2>
          <div className="mt-3 space-y-2 text-sm leading-7">
            {STORE_INFO.phones.map((phone) => (
              <a key={phone} href={formatPhoneHref(phone)} className="block text-[var(--foreground)]">
                {phone}
              </a>
            ))}
          </div>
        </article>
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-6">
          <Mail className="h-5 w-5 text-[var(--accent-dark)]" />
          <h2 className="mt-5 font-serif-display text-3xl text-[var(--foreground)]">Почта</h2>
          <a href={`mailto:${STORE_INFO.email}`} className="mt-3 block text-sm leading-7 text-[var(--foreground)]">
            {STORE_INFO.email}
          </a>
        </article>
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-6">
          <MessageCircleMore className="h-5 w-5 text-[var(--accent-dark)]" />
          <h2 className="mt-5 font-serif-display text-3xl text-[var(--foreground)]">Быстрая связь</h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <a href={STORE_INFO.whatsapp} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--line)] px-4 py-2 text-[var(--foreground)]">
              WhatsApp
            </a>
            <a href={STORE_INFO.telegram} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--line)] px-4 py-2 text-[var(--foreground)]">
              Telegram
            </a>
          </div>
        </article>
      </section>
    </main>
  )
}
