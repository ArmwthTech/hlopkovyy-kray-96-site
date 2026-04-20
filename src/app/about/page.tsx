
import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin, ShieldCheck, Sparkles, Users } from 'lucide-react'

import { PRODUCTS, STORE_INFO } from '@/lib/data'
import { buildMetadata } from '@/lib/seo'

const values = [
  {
    title: 'Качество без показного пафоса',
    text: 'Смотрим не только на красивый кадр, но и на плотность ткани, тактильность и поведение вещи после стирки.',
    icon: ShieldCheck,
  },
  {
    title: 'Человеческая консультация',
    text: 'В магазин можно приехать, потрогать материалы, сравнить несколько комплектов и выбрать свой темпом обычного разговора.',
    icon: Users,
  },
  {
    title: 'Спокойная подача',
    text: 'Нам важнее ощущение собранного дома и понятного сервиса, чем витринный пафос и громкие обещания.',
    icon: Sparkles,
  },
]

export const metadata: Metadata = buildMetadata({
  title: 'О магазине домашнего текстиля в Екатеринбурге',
  description: 'О магазине «Хлопковый Край 96» в Екатеринбурге: подбор материалов, реальный магазин, консультация по размерам и помощь с выбором.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <main className="pb-20 pt-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={PRODUCTS[1]!.image} alt="О магазине" fill className="object-cover" sizes="100vw" priority />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="container-wide relative py-24 md:py-32">
          <div className="max-w-3xl space-y-6 text-white">
            <span className="eyebrow !text-white/80">О магазине</span>
            <h1 className="font-serif-display text-5xl leading-[0.94] md:text-7xl">Магазин, где текстиль выбирают не по шумной витрине, а по ощущению вещи</h1>
            <p className="max-w-2xl text-base leading-7 text-white/86 md:text-lg">
              «Хлопковый Край 96» работает в Екатеринбурге и помогает выбрать домашний текстиль так, чтобы он был уместен в реальной жизни: удобен, понятен по уходу и приятен каждый день.
            </p>
          </div>
        </div>
      </section>

      <section className="container-wide grid gap-10 py-20 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <span className="eyebrow">История</span>
          <h2 className="font-serif-display text-4xl text-[var(--foreground)] md:text-5xl">Собираем ассортимент так, как выбирали бы вещи для собственного дома</h2>
          <p className="text-base leading-7 text-[var(--muted-foreground)]">
            В магазине нет случайных позиций. Мы смотрим на ткань руками, оцениваем плотность, обсуждаем состав и оставляем те вещи,
            которые выдерживают обычную жизнь: стирки, сезонность, детские комнаты, жаркие спальни и ежедневное использование.
          </p>
          <p className="text-base leading-7 text-[var(--muted-foreground)]">
            Поэтому и сайт сделан спокойно: важно показать ассортимент, объяснить, чем различаются материалы, и оставить понятный способ связи, если нужен совет.
          </p>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-[36px] border border-[var(--line)]">
          <Image src={PRODUCTS[4]!.image} alt="Материалы и текстуры" fill className="object-cover" sizes="50vw" />
        </div>
      </section>

      <section className="container-wide py-4">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-[32px] border border-[var(--line)] bg-white/80 p-6">
              <Icon className="h-5 w-5 text-[var(--accent-dark)]" />
              <h3 className="mt-5 font-serif-display text-2xl text-[var(--foreground)]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-wide grid gap-10 py-20 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5 rounded-[36px] border border-[var(--line)] bg-white/82 p-8">
          <span className="eyebrow">Материалы</span>
          <h2 className="font-serif-display text-4xl text-[var(--foreground)]">Что чаще всего советуем</h2>
          <div className="space-y-4 text-sm leading-7 text-[var(--muted-foreground)]">
            <p><strong className="text-[var(--foreground)]">Мако-сатин.</strong> Если нужен гладкий, плотный и визуально собранный комплект.</p>
            <p><strong className="text-[var(--foreground)]">Тенсель.</strong> Если важны прохладное ощущение ткани и мягкая подача спальни.</p>
            <p><strong className="text-[var(--foreground)]">Хлопок.</strong> Если нужен понятный текстиль на каждый день без сложного ухода.</p>
          </div>
        </div>

        <div className="rounded-[36px] border border-[var(--line)] bg-[var(--panel)] p-8">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 text-[var(--accent-dark)]" />
            <div>
              <h2 className="font-serif-display text-4xl text-[var(--foreground)]">Ждём вас в магазине</h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted-foreground)]">
                {STORE_INFO.city}, {STORE_INFO.address}<br />
                {STORE_INFO.nearby}
              </p>
              <div className="mt-5 space-y-1 text-sm leading-6 text-[var(--muted-foreground)]">
                {STORE_INFO.workingHours.map((line) => <p key={line}>{line}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
