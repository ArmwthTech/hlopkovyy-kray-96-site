
import type { Metadata } from 'next'

import { CartPageContent } from '@/components/cart/CartPageContent'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Заявка на домашний текстиль',
  description: 'Страница заявки магазина «Хлопковый Край 96». Уточните товары, контакты и удобный способ связи.',
  path: '/cart',
  noindex: true,
})

export default function CartPage() {
  return <CartPageContent />
}
