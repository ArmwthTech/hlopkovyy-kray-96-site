import type { Metadata } from 'next'

import { buildMetadata } from '@/lib/seo'
import { LEGAL_NOTICE } from '@/lib/legal'

export const metadata: Metadata = buildMetadata({
  title: 'Политика обработки персональных данных',
  description: 'Политика обработки персональных данных для сайта магазина «Хлопковый Край 96».',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <main className="container-wide pb-20 pt-28">
      <div className="max-w-4xl space-y-4">
        <span className="eyebrow">Правовая информация</span>
        <h1 className="font-serif-display text-4xl text-[var(--foreground)] md:text-6xl">
          Политика обработки персональных данных
        </h1>
        <p className="text-base leading-7 text-[var(--muted-foreground)]">
          Эта страница описывает, какие данные сайт принимает через форму заявки, для чего они используются и как обрабатываются до уточнения полных реквизитов владельца магазина.
        </p>
      </div>

      <section className="mt-10 grid gap-6">
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-8">
          <h2 className="font-serif-display text-3xl text-[var(--foreground)]">1. Какие данные принимает сайт</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
            Через форму заявки сайт принимает имя, телефон и комментарий пользователя. Эти данные передаются только для обратной связи по выбранным товарам, уточнения наличия, размеров и способа получения заказа.
          </p>
        </article>
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-8">
          <h2 className="font-serif-display text-3xl text-[var(--foreground)]">2. Для чего используются данные</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
            Персональные данные используются исключительно для обработки заявки, связи с покупателем и согласования доставки или самовывоза. Сайт не принимает онлайн-оплату и не использует данные для автоматического заключения договора купли-продажи.
          </p>
        </article>
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-8">
          <h2 className="font-serif-display text-3xl text-[var(--foreground)]">3. Основание обработки</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
            Основанием обработки является согласие пользователя, выраженное через обязательный чекбокс при отправке заявки. Без такого согласия форма не отправляется.
          </p>
        </article>
        <article className="rounded-[32px] border border-[var(--line)] bg-white/84 p-8">
          <h2 className="font-serif-display text-3xl text-[var(--foreground)]">4. Актуализация сведений об операторе</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
            {LEGAL_NOTICE}
          </p>
        </article>
      </section>
    </main>
  )
}
