'use client'

import { useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'

import { useCart } from '@/components/cart/CartProvider'
import type { Product } from '@/lib/data'

interface AddToCartButtonProps {
  product: Product
  size?: string
  className?: string
  variant?: 'solid' | 'ghost'
}

const VARIANT_STYLES = {
  solid:
    'bg-[var(--accent-dark)] text-white border border-[var(--accent-dark)] hover:bg-[var(--foreground)] hover:border-[var(--foreground)] shadow-[0_14px_30px_rgba(133,95,67,0.18)]',
  ghost:
    'border border-[var(--line)] bg-white/82 text-[var(--foreground)] hover:border-[var(--accent)] hover:bg-white',
} as const

export function AddToCartButton({ product, size, className, variant = 'solid' }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  function handleClick() {
    addItem({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: size ?? product.sizes[0] ?? 'Без размера',
      quantity: 1,
    })

    setIsAdded(true)
    window.setTimeout(() => setIsAdded(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${VARIANT_STYLES[variant]} ${className ?? ''}`}
      aria-label={`Добавить ${product.name} в заявку`}
    >
      {isAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
      {isAdded ? 'Добавлено' : 'Оставить заявку'}
    </button>
  )
}
