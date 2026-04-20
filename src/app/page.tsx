
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock3, MapPin, MessageCircleMore, PhoneCall } from 'lucide-react'

import { HeroScene } from '@/components/home/HeroScene'
import { ProductCard } from '@/components/molecules/ProductCard'
import { CATEGORIES, PRODUCTS, STORE_INFO, getFeaturedProducts } from '@/lib/data'
import { buildLocalBusinessSchema, buildMetadata } from '@/lib/seo'
import { formatPhoneHref } from '@/lib/utils'

const features = [
  'Помогаем подобрать размер, ткань и комплект без лишней спешки.',
  'Подтверждаем наличие до разговора о доставке и самовывозе.',
  'Остаёмся реальным магазином с адресом, телефоном и живой консультацией.',
]

export const metadata: Metadata = buildMetadata({
  title: 'Домашний текстиль в Екатеринбурге: постельное белье, подушки, одеяла',
  description: 'Магазин домашнего текстиля в Екатеринбурге. Постельное белье, подушки, пледы, халаты и матрасы с консультацией по выбору и подтверждением наличия.',
  path: '/',
})

export default function HomePage() {
  const featured = getFeaturedProducts()
  const localBusinessSchema = buildLocalBusinessSchema()

  return (
    <main className="pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <HeroScene />

      <section className="container-wide relative z-10 pt-8 pb-6 md:pt-10 md:pb-10">
        <div className="grain-panel grid gap-5 rounded-[36px] p-6 md:grid-cols-3 md:p-8">
          {features.map((feature) => (
            <div key={feature} className="space-y-2">
              <span className="eyebrow">Почему к нам приходят</span>
              <p className="text-base leading-7 text-[var(--foreground)]">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide section-deferred pt-14 pb-20 md:pt-16">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="eyebrow">Категории</span>
            <h2 className="font-serif-display text-4xl text-[var(--foreground)] md:text-5xl">Что можно выбрать в магазине</h2>
          </div>
          <Link href="/catalog" className="hidden text-sm text-[var(--muted-foreground)] md:block">
            Весь каталог
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {CATEGORIES.slice(0, 4).map((category) => {
            const product = PRODUCTS.find((item) => item.category === category.id)
            if (!product) return null

            return (
              <Link
                key={category.id}
                href={`/catalog?category=${category.id}`}
                className="group overflow-hidden rounded-[32px] border border-[var(--line)] bg-white/75"
              >
                <div className="relative aspect-[5/6] overflow-hidden">
                  <Image src={product.image} alt={category.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 1200px) 50vw, 25vw" />
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="font-serif-display text-2xl text-[var(--foreground)]">{category.name}</h3>
                  <p className="text-sm leading-6 text-[var(--muted-foreground)]">{category.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="container-wide section-deferred py-6">
        <div className="mb-8 space-y-3">
          <span className="eyebrow">Подборка</span>
          <h2 className="font-serif-display text-4xl text-[var(--foreground)] md:text-5xl">Спокойные вещи для спальни и дома</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container-wide section-deferred grid gap-10 py-20 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <span className="eyebrow">О магазине</span>
          <h2 className="font-serif-display text-4xl text-[var(--foreground)] md:text-5xl">
            Работаем в Екатеринбурге и помогаем выбрать текстиль без спешки
          </h2>
          <p className="text-base leading-7 text-[var(--muted-foreground)]">
            «Хлопковый Край 96» — это локальный магазин домашнего текстиля, где можно не просто увидеть красивые фото,
            а получить нормальную консультацию: сравнить материалы, подобрать размер, уточнить наличие и выбрать вариант под ваш ритм сна.
          </p>
          <p className="text-base leading-7 text-[var(--muted-foreground)]">
            Сайт помогает спокойно выбрать товары, оставить заявку и обсудить детали уже с магазином, а не проходить через тяжёлый онлайн-checkout.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/about" className="inline-flex items-center gap-2 text-[var(--foreground)]">
              Подробнее о магазине
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/delivery" className="inline-flex items-center gap-2 text-[var(--foreground)]">
              Доставка и самовывоз
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contacts" className="inline-flex items-center gap-2 text-[var(--foreground)]">
              Контакты магазина
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[32px] border border-[var(--line)] bg-white/80 p-6">
            <MapPin className="h-5 w-5 text-[var(--accent-dark)]" />
            <h3 className="mt-5 font-serif-display text-2xl text-[var(--foreground)]">Адрес магазина</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
              {STORE_INFO.city}, {STORE_INFO.address}<br />
              {STORE_INFO.nearby}
            </p>
          </div>
          <div className="rounded-[32px] border border-[var(--line)] bg-white/80 p-6">
            <Clock3 className="h-5 w-5 text-[var(--accent-dark)]" />
            <h3 className="mt-5 font-serif-display text-2xl text-[var(--foreground)]">Режим работы</h3>
            <div className="mt-3 space-y-1 text-sm leading-6 text-[var(--muted-foreground)]">
              {STORE_INFO.workingHours.map((line) => <p key={line}>{line}</p>)}
            </div>
          </div>
          <div className="rounded-[32px] border border-[var(--line)] bg-white/80 p-6">
            <PhoneCall className="h-5 w-5 text-[var(--accent-dark)]" />
            <h3 className="mt-5 font-serif-display text-2xl text-[var(--foreground)]">Телефон</h3>
            <a href={formatPhoneHref(STORE_INFO.phones[0])} className="mt-3 block text-sm leading-6 text-[var(--foreground)]">
              {STORE_INFO.phones[0]}
            </a>
          </div>
          <div className="rounded-[32px] border border-[var(--line)] bg-white/80 p-6">
            <MessageCircleMore className="h-5 w-5 text-[var(--accent-dark)]" />
            <h3 className="mt-5 font-serif-display text-2xl text-[var(--foreground)]">Быстрая связь</h3>
            <div className="mt-3 flex gap-3 text-sm">
              <a href={STORE_INFO.whatsapp} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--line)] px-4 py-2 text-[var(--foreground)]">
                WhatsApp
              </a>
              <a href={STORE_INFO.telegram} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--line)] px-4 py-2 text-[var(--foreground)]">
                Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
