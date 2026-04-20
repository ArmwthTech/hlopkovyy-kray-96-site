import { describe, expect, it } from 'vitest'

import {
  getFeaturedProducts,
  getFilteredProducts,
  getProductById,
  getRelatedProducts,
} from '@/lib/data'

describe('catalog data helpers', () => {
  it('filters products by category, material, and size', () => {
    const result = getFilteredProducts({
      category: 'bedding',
      material: 'Тенсель',
      size: 'Евро',
      page: 1,
      pageSize: 12,
    })

    expect(result.total).toBeGreaterThan(0)
    expect(result.items.every((product) => product.category === 'bedding')).toBe(true)
    expect(result.items.every((product) => product.material === 'Тенсель')).toBe(true)
    expect(result.items.every((product) => product.sizes.includes('Евро'))).toBe(true)
  })

  it('returns local-trust featured products for the homepage', () => {
    const featured = getFeaturedProducts()

    expect(featured).toHaveLength(4)
    expect(featured.every((product) => product.isFeatured)).toBe(true)
  })

  it('returns related products from the same category and excludes the current item', () => {
    const product = getProductById('linen-cloud')

    expect(product).toBeDefined()

    const related = getRelatedProducts('linen-cloud', 3)

    expect(related).toHaveLength(3)
    expect(related.every((item) => item.id !== 'linen-cloud')).toBe(true)
    expect(related.every((item) => item.category === product?.category)).toBe(true)
  })
})
