'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { useCart } from '@/components/cart/CartProvider'
import { formatPrice } from '@/lib/utils'

export const B2CCart = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { items, itemsCount, totalPrice, removeItem } = useCart()

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-white shadow-[0_18px_42px_rgba(47,35,27,0.25)] transition hover:bg-[var(--accent-dark)] md:bottom-8 md:right-8"
        data-testid="open-cart-btn"
      >
        <ShoppingBag className="h-5 w-5" />
        {itemsCount > 0 ? `Заявка (${itemsCount})` : 'Ваша заявка'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-[rgba(47,35,27,0.18)] backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[var(--line)] bg-[var(--panel-strong)] p-6 shadow-[0_30px_70px_rgba(47,35,27,0.12)]"
              data-testid="cart-modal"
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-serif-display text-3xl text-[var(--foreground)]">
                  Ваша заявка
                </h2>
                <button onClick={() => setIsOpen(false)} className="rounded-full border border-[var(--line)] p-2 text-[var(--foreground)]">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="rounded-[24px] border border-[var(--line)] bg-white/80 p-4">
                    <div>
                      <div className="font-medium text-[var(--foreground)]">{item.name}</div>
                      <div className="mt-1 text-sm text-[var(--muted-foreground)]">
                        {item.size} • {item.quantity} шт.
                      </div>
                      <div className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="mt-3 text-sm text-[var(--muted-foreground)] transition hover:text-[var(--accent-dark)]"
                      data-testid="remove-item"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="rounded-[24px] border border-dashed border-[var(--line)] px-6 py-12 text-center text-[var(--muted-foreground)]">
                    В заявке пока нет товаров.
                  </div>
                )}
              </div>

              <div className="mt-auto border-t border-[var(--line)] pt-6">
                <div className="mb-6 flex items-center justify-between text-base">
                  <span className="text-[var(--muted-foreground)]">Итого</span>
                  <span className="text-xl font-semibold text-[var(--foreground)]" data-testid="cart-total">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <Link href="/cart" onClick={() => setIsOpen(false)} className="inline-flex w-full items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-4 text-sm font-medium text-white transition hover:bg-[var(--accent-dark)]">
                  Перейти к заявке
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
