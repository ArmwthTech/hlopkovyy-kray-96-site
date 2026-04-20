import { describe, expect, it } from 'vitest'

import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { PRODUCTS } from '@/lib/data'

describe('SEO metadata routes', () => {
  it('publishes a sitemap for the current local domain', () => {
    const config = robots()

    expect(config.sitemap).toContain('localhost:3000')
  })

  it('includes catalog and product pages in sitemap output', () => {
    const urls = sitemap().map((entry) => entry.url)

    expect(urls).toContain('http://localhost:3000/catalog')
    expect(urls).toContain(`http://localhost:3000/catalog/${PRODUCTS[0].id}`)
  })
})
