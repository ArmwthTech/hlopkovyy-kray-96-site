import { describe, expect, it } from 'vitest'

import {
  addCartItem,
  createOrderDraft,
  getCartTotals,
  removeCartItem,
  updateCartItemQuantity,
  validateOrderDraft,
  type CartItem,
} from '@/lib/cart'

const sampleItem: CartItem = {
  id: 'linen-cloud',
  name: 'Комплект «Льняное Облако»',
  price: 12400,
  image: 'https://example.com/product.jpg',
  size: 'Евро',
  quantity: 1,
}

describe('cart helpers', () => {
  it('merges identical items by product and size', () => {
    const once = addCartItem([], sampleItem)
    const twice = addCartItem(once, sampleItem)

    expect(twice).toHaveLength(1)
    expect(twice[0]?.quantity).toBe(2)
  })

  it('updates quantity and recalculates totals', () => {
    const items = updateCartItemQuantity([sampleItem], sampleItem.id, sampleItem.size, 3)
    const totals = getCartTotals(items)

    expect(items[0]?.quantity).toBe(3)
    expect(totals.itemsCount).toBe(3)
    expect(totals.totalPrice).toBe(37200)
  })

  it('removes line items by product and size', () => {
    const items = removeCartItem([sampleItem], sampleItem.id, sampleItem.size)

    expect(items).toHaveLength(0)
  })
})

describe('order draft validation', () => {
  it('creates a submission payload with selected products', () => {
    const draft = createOrderDraft({
      customer: {
        name: 'Анна',
        phone: '+7 (999) 123-45-67',
        comment: 'Нужна доставка после 18:00',
        personalDataConsent: true,
      },
      items: [sampleItem],
    })

    expect(draft.items).toHaveLength(1)
    expect(draft.customer.name).toBe('Анна')
  })

  it('requires name, phone, consent, and at least one item', () => {
    const result = validateOrderDraft(
      createOrderDraft({
        customer: {
          name: '',
          phone: '123',
          comment: '',
          personalDataConsent: false,
        },
        items: [],
      }),
    )

    expect(result.isValid).toBe(false)
    expect(result.errors.name).toBeDefined()
    expect(result.errors.phone).toBeDefined()
    expect(result.errors.personalDataConsent).toBeDefined()
    expect(result.errors.items).toBeDefined()
  })
})
