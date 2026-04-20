import type { Metadata } from 'next'
import { PackageCheck, Truck } from 'lucide-react'

import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Доставка и самовывоз домашнего текстиля в Екатеринбурге',
  description: 'Условия доставки, самовывоза и подтверждения наличия для магазина «Хлопковый Край 96» в Екатеринбурге.',
  path: '/delivery',
})

export default function DeliveryPage() {
  return (
    <main className="container-wide pb-20 pt-28">
      <div className="max-w-3xl space-y-4">
        <span className="eyebrow">Доставка</span>
        <h1 className="font-serif-display text-4xl text-[var(--foreground)] md:text-6xl">Доставка и самовывоз в Екатеринбурге</h1>
        <p className="text-base leading-7 text-[var(--muted-foreground)]">
          Перед тем как договариваться о получении, мы подтверждаем наличие товара, уточняем размер и только после этого согласовываем самовывоз или доставку.
        </p>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-6">
          <PackageCheck className="h-5 w-5 text-[var(--accent-dark)]" />
          <h2 className="mt-5 font-serif-display text-3xl text-[var(--foreground)]">Как проходит заявка</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
            Вы оставляете заявку на сайте, магазин связывается с вами, проверяет наличие и помогает подтвердить размеры, состав ткани и удобный способ получения.
          </p>
        </article>
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-6">
          <Truck className="h-5 w-5 text-[var(--accent-dark)]" />
          <h2 className="mt-5 font-serif-display text-3xl text-[var(--foreground)]">Доставка и самовывоз</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
            По Екатеринбургу помогаем организовать доставку после подтверждения заявки. Также можно забрать товар самостоятельно из магазина в рабочие часы.
          </p>
        </article>
      </section>
    </main>
  )
}
