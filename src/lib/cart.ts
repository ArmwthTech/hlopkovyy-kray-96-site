export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

export interface OrderCustomer {
  name: string
  phone: string
  comment: string
  personalDataConsent: boolean
}

export interface OrderDraft {
  customer: OrderCustomer
  items: CartItem[]
}

export interface OrderValidationResult {
  isValid: boolean
  errors: Partial<Record<'name' | 'phone' | 'items' | 'personalDataConsent', string>>
}

function matchesLine(item: CartItem, id: string, size: string) {
  return item.id === id && item.size === size
}

export function addCartItem(items: CartItem[], nextItem: CartItem) {
  const existing = items.find((item) => matchesLine(item, nextItem.id, nextItem.size))

  if (!existing) {
    return [...items, nextItem]
  }

  return items.map((item) =>
    matchesLine(item, nextItem.id, nextItem.size)
      ? { ...item, quantity: item.quantity + nextItem.quantity }
      : item,
  )
}

export function updateCartItemQuantity(items: CartItem[], id: string, size: string, quantity: number) {
  if (quantity <= 0) {
    return removeCartItem(items, id, size)
  }

  return items.map((item) => (matchesLine(item, id, size) ? { ...item, quantity } : item))
}

export function removeCartItem(items: CartItem[], id: string, size: string) {
  return items.filter((item) => !matchesLine(item, id, size))
}

export function getCartTotals(items: CartItem[]) {
  return items.reduce(
    (acc, item) => ({
      itemsCount: acc.itemsCount + item.quantity,
      totalPrice: acc.totalPrice + item.price * item.quantity,
    }),
    { itemsCount: 0, totalPrice: 0 },
  )
}

export function createOrderDraft(draft: OrderDraft): OrderDraft {
  return {
    customer: {
      name: draft.customer.name.trim(),
      phone: draft.customer.phone.trim(),
      comment: draft.customer.comment.trim(),
      personalDataConsent: draft.customer.personalDataConsent,
    },
    items: draft.items,
  }
}

export function validateOrderDraft(draft: OrderDraft): OrderValidationResult {
  const errors: OrderValidationResult['errors'] = {}

  if (!draft.customer.name) {
    errors.name = 'Укажите имя, чтобы менеджер понял, как к вам обратиться.'
  }

  if (!/^\+?[0-9\s\-()]{10,}$/.test(draft.customer.phone)) {
    errors.phone = 'Укажите телефон в корректном формате.'
  }

  if (!draft.customer.personalDataConsent) {
    errors.personalDataConsent = 'Нужно согласиться на обработку персональных данных, чтобы отправить заявку.'
  }

  if (draft.items.length === 0) {
    errors.items = 'Добавьте хотя бы один товар в заявку.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
