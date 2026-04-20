import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ''} />,
}))

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

import { HeroScene } from '@/components/home/HeroScene'

describe('HeroScene', () => {
  it('renders editorial hero copy, actions, and simplified visual layers', () => {
    render(<HeroScene />)

    expect(screen.getByText(/Домашний текстиль для спокойного и собранного дома/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Перейти в каталог/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Оставить заявку/i })).toBeInTheDocument()
    expect(screen.getAllByTestId('hero-layer')).toHaveLength(2)
  })
})
