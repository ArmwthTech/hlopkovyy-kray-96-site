import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}))

import { ProductGallery } from '@/components/catalog/ProductGallery'

describe('ProductGallery', () => {
  it('renders a unified photo block with one featured image and selectable previews', () => {
    render(
      <ProductGallery
        name="Комплект «Льняное Облако»"
        images={['/products/test-1.jpg', '/products/test-2.jpg', '/products/test-3.jpg']}
      />,
    )

    expect(screen.getByRole('img', { name: /Комплект «Льняное Облако»/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(3)
    expect(screen.getByRole('button', { name: /Фото 1/i })).toHaveAttribute('aria-pressed', 'true')
  })
})
