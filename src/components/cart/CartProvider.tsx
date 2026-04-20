'use client'

import { createContext, startTransition, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { addCartItem, getCartTotals, removeCartItem, updateCartItemQuantity, type CartItem } from '@/lib/cart'

interface CartContextValue {
  items: CartItem[]
  itemsCount: number
  totalPrice: number
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clearCart: () => void
}

const STORAGE_KEY = 'cotton-kraj-cart'

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return
    }

    try {
      const parsed = JSON.parse(stored) as CartItem[]
      setItems(parsed)
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const totals = getCartTotals(items)

  const value = {
    items,
    itemsCount: totals.itemsCount,
    totalPrice: totals.totalPrice,
    addItem(item: CartItem) {
      startTransition(() => {
        setItems((current) => addCartItem(current, item))
      })
    },
    removeItem(id: string, size: string) {
      startTransition(() => {
        setItems((current) => removeCartItem(current, id, size))
      })
    },
    updateQuantity(id: string, size: string, quantity: number) {
      startTransition(() => {
        setItems((current) => updateCartItemQuantity(current, id, size, quantity))
      })
    },
    clearCart() {
      startTransition(() => {
        setItems([])
      })
    },
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)

  if (!value) {
    throw new Error('useCart must be used within CartProvider')
  }

  return value
}
