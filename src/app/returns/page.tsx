import type { Metadata } from 'next'
import { RefreshCcw, ShieldCheck } from 'lucide-react'

import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Обмен и возврат домашнего текстиля',
  description: 'Информация по обмену, возврату и согласованию спорных вопросов для заказов магазина «Хлопковый Край 96».',
  path: '/returns',
})

export default function ReturnsPage() {
  return (
    <main className="container-wide pb-20 pt-28">
      <div className="max-w-3xl space-y-4">
        <span className="eyebrow">Обмен и возврат</span>
        <h1 className="font-serif-display text-4xl text-[var(--foreground)] md:text-6xl">Если по заказу возник вопрос, решаем его спокойно и по понятной схеме</h1>
        <p className="text-base leading-7 text-[var(--muted-foreground)]">
          Если по товару или заявке возник вопрос, свяжитесь с магазином. Мы уточним ситуацию, проверим заказ и подскажем порядок обмена или возврата в рамках действующих правил.
        </p>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-6">
          <ShieldCheck className="h-5 w-5 text-[var(--accent-dark)]" />
          <h2 className="mt-5 font-serif-display text-3xl text-[var(--foreground)]">Перед подтверждением</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
            До подтверждения заявки мы помогаем уточнить размеры, материалы и наличие, чтобы снизить риск ошибки при выборе.
          </p>
        </article>
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-6">
          <RefreshCcw className="h-5 w-5 text-[var(--accent-dark)]" />
          <h2 className="mt-5 font-serif-display text-3xl text-[var(--foreground)]">Если нужен обмен</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
            Напишите или позвоните в магазин. Мы разберем ситуацию по товару, подскажем следующий шаг и дадим понятную схему дальнейших действий.
          </p>
        </article>
      </section>
    </main>
  )
}
