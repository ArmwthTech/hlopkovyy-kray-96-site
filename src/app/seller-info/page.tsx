import type { Metadata } from 'next'

import { SELLER_DETAILS, LEGAL_NOTICE } from '@/lib/legal'
import { buildMetadata } from '@/lib/seo'
import { STORE_INFO } from '@/lib/data'

const rows = [
  ['Форма лица', SELLER_DETAILS.legalForm],
  ['Наименование / ФИО', SELLER_DETAILS.name],
  ['ИНН', SELLER_DETAILS.inn],
  ['ОГРН / ОГРНИП', SELLER_DETAILS.ogrn],
  ['Адрес регистрации / юридический адрес', SELLER_DETAILS.legalAddress],
  ['Email оператора ПД', SELLER_DETAILS.operatorEmail],
  ['Телефон оператора ПД', SELLER_DETAILS.operatorPhone],
]

export const metadata: Metadata = buildMetadata({
  title: 'Сведения о продавце и операторе персональных данных',
  description: 'Сведения о продавце, контактах и статусе публикации реквизитов для сайта «Хлопковый Край 96».',
  path: '/seller-info',
})

export default function SellerInfoPage() {
  return (
    <main className="container-wide pb-20 pt-28">
      <div className="max-w-4xl space-y-4">
        <span className="eyebrow">Правовая информация</span>
        <h1 className="font-serif-display text-4xl text-[var(--foreground)] md:text-6xl">
          Сведения о продавце и операторе персональных данных
        </h1>
        <p className="text-base leading-7 text-[var(--muted-foreground)]">
          Страница подготовлена для прозрачной публикации сведений о продавце и лице, которое обрабатывает персональные данные через форму заявки на сайте.
        </p>
      </div>

      <section className="mt-10 rounded-[32px] border border-[var(--line)] bg-white/84 p-8">
        <div className="grid gap-4">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-2 border-b border-[var(--line)] pb-4 md:grid-cols-[280px_1fr]">
              <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
              <p className="text-sm leading-7 text-[var(--foreground)]">{value}</p>
            </div>
          ))}
          <div className="grid gap-2 pt-2 md:grid-cols-[280px_1fr]">
            <p className="text-sm text-[var(--muted-foreground)]">Контакты магазина</p>
            <p className="text-sm leading-7 text-[var(--foreground)]">
              {STORE_INFO.city}, {STORE_INFO.address}, {STORE_INFO.phones[0]}, {STORE_INFO.email}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[32px] border border-dashed border-[var(--line)] bg-[var(--panel)] p-8">
        <h2 className="font-serif-display text-3xl text-[var(--foreground)]">Статус публикации реквизитов</h2>
        <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
          {LEGAL_NOTICE}
        </p>
      </section>
    </main>
  )
}
