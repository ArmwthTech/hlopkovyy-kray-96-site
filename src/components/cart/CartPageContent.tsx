'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Minus, Plus, Phone, Send, ShieldCheck, Trash2 } from 'lucide-react'

import { useCart } from '@/components/cart/CartProvider'
import { createOrderDraft, validateOrderDraft } from '@/lib/cart'
import { STORE_INFO } from '@/lib/data'
import { formatPhoneHref, formatPrice } from '@/lib/utils'

export function CartPageContent() {
  const { items, itemsCount, totalPrice, removeItem, updateQuantity, clearCart } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [personalDataConsent, setPersonalDataConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const draft = createOrderDraft({
      customer: { name, phone, comment, personalDataConsent },
      items,
    })
    const validation = validateOrderDraft(draft)

    if (!validation.isValid) {
      setErrors(validation.errors)
      setSuccessMessage('')
      return
    }

    setErrors({})
    setSuccessMessage(
      `Заявка сформирована. Мы свяжемся по номеру ${draft.customer.phone}, подтвердим наличие и подскажем по доставке.`,
    )
    clearCart()
    setName('')
    setPhone('')
    setComment('')
    setPersonalDataConsent(false)
  }

  return (
    <div className="pt-28 pb-20">
      <section className="container-wide grid gap-12 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="eyebrow">Корзина-заявка</span>
            <h1 className="font-serif-display text-4xl text-[var(--foreground)] md:text-5xl">
              Соберите заказ и оставьте контакты
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
              Сайт работает как витрина и заявка без онлайн-оплаты. После отправки менеджер связывается с вами,
              подтверждает наличие, уточняет размер и договаривается о самовывозе или доставке.
            </p>
          </div>

          <div className="space-y-5">
            {items.length === 0 ? (
              <div className="rounded-[32px] border border-[var(--line)] bg-white/80 p-8">
                <p className="text-lg text-[var(--foreground)]">Ваша корзина пока пуста.</p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                  Добавьте в заявку нужные позиции из каталога, и мы соберём обращение для магазина.
                </p>
                <Link href="/catalog" className="mt-6 inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-white">
                  Перейти в каталог
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <article
                  key={`${item.id}-${item.size}`}
                  className="grid gap-5 rounded-[32px] border border-[var(--line)] bg-white/85 p-5 md:grid-cols-[140px_1fr_auto]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full rounded-[24px] object-cover md:h-full"
                  />
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">{item.size}</p>
                    <h2 className="font-serif-display text-2xl text-[var(--foreground)]">{item.name}</h2>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Цена за единицу: {formatPrice(item.price)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id, item.size)}
                      className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] transition hover:text-[var(--accent-dark)]"
                    >
                      <Trash2 className="h-4 w-4" />
                      Удалить
                    </button>
                  </div>
                  <div className="flex flex-col items-start justify-between gap-4 md:items-end">
                    <div className="inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--panel)] p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="rounded-full p-2 text-[var(--muted-foreground)] transition hover:bg-white"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-10 text-center text-sm font-medium text-[var(--foreground)]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="rounded-full p-2 text-[var(--muted-foreground)] transition hover:bg-white"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xl font-semibold text-[var(--foreground)]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <aside className="h-fit rounded-[32px] border border-[var(--line)] bg-white/90 p-8 shadow-[0_20px_60px_rgba(92,70,50,0.08)] lg:sticky lg:top-28">
          <div className="space-y-4 border-b border-[var(--line)] pb-6">
            <h2 className="font-serif-display text-3xl text-[var(--foreground)]">Ваша заявка</h2>
            <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
              <span>Товаров</span>
              <span>{itemsCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
              <span>Способ получения</span>
              <span>Согласуем после звонка</span>
            </div>
            <div className="flex items-center justify-between pt-3 text-lg font-semibold text-[var(--foreground)]">
              <span>Итого</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]" htmlFor="customer-name">
                Имя
              </label>
              <input
                id="customer-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
                placeholder="Как к вам обратиться"
              />
              {errors.name ? <p className="mt-2 text-sm text-[var(--accent-dark)]">{errors.name}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]" htmlFor="customer-phone">
                Телефон
              </label>
              <input
                id="customer-phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
                placeholder="+7 (___) ___-__-__"
              />
              {errors.phone ? <p className="mt-2 text-sm text-[var(--accent-dark)]">{errors.phone}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]" htmlFor="customer-comment">
                Комментарий
              </label>
              <textarea
                id="customer-comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={5}
                className="w-full rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 outline-none transition focus:border-[var(--accent)]"
                placeholder="Например: нужен комплект евро, удобна доставка после 18:00"
              />
            </div>
            <div className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-4">
              <label className="flex items-start gap-3" htmlFor="personal-data-consent">
                <input
                  id="personal-data-consent"
                  type="checkbox"
                  checked={personalDataConsent}
                  onChange={(event) => setPersonalDataConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[var(--line)] text-[var(--accent-dark)]"
                />
                <span className="text-sm leading-6 text-[var(--muted-foreground)]">
                  Соглашаюсь на обработку персональных данных для связи по заявке и ознакомлен с{' '}
                  <Link href="/privacy" className="text-[var(--foreground)] underline decoration-[var(--line)] underline-offset-4">
                    политикой обработки персональных данных
                  </Link>{' '}
                  и{' '}
                  <Link href="/seller-info" className="text-[var(--foreground)] underline decoration-[var(--line)] underline-offset-4">
                    сведениями о продавце и операторе ПД
                  </Link>.
                </span>
              </label>
              {errors.personalDataConsent ? (
                <p className="mt-2 text-sm text-[var(--accent-dark)]">{errors.personalDataConsent}</p>
              ) : null}
            </div>
            {errors.items ? <p className="text-sm text-[var(--accent-dark)]">{errors.items}</p> : null}
            {successMessage ? (
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 text-sm leading-6 text-[var(--foreground)]">
                {successMessage}
              </div>
            ) : null}
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-4 text-sm font-medium text-white transition hover:bg-[var(--accent-dark)]">
              <Send className="h-4 w-4" />
              Отправить заявку
            </button>
          </form>

          <div className="mt-6 space-y-3 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted-foreground)]">
            <div className="flex items-start gap-3 rounded-[24px] bg-[var(--panel)] p-4">
              <ShieldCheck className="mt-1 h-4 w-4 text-[var(--accent-dark)]" />
              <p className="leading-6">
                Заявка не является онлайн-оплатой или публичной офертой. Мы используем ваши данные только для обратной связи по выбранным товарам.
              </p>
            </div>
            <p>Если хотите уточнить материал или наличие сразу, можно позвонить в магазин.</p>
            <a
              href={formatPhoneHref(STORE_INFO.phones[0])}
              className="inline-flex items-center gap-2 text-[var(--foreground)] transition hover:text-[var(--accent-dark)]"
            >
              <Phone className="h-4 w-4" />
              {STORE_INFO.phones[0]}
            </a>
            <div className="flex flex-wrap gap-3">
              <Link href="/privacy" className="inline-flex items-center gap-2 text-[var(--foreground)] transition hover:text-[var(--accent-dark)]">
                <Check className="h-4 w-4" />
                Политика ПД
              </Link>
              <Link href="/seller-info" className="inline-flex items-center gap-2 text-[var(--foreground)] transition hover:text-[var(--accent-dark)]">
                <Check className="h-4 w-4" />
                Сведения о продавце
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
