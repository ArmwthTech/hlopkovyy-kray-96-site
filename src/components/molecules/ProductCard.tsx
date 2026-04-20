import Link from 'next/link'
import Image from 'next/image'

import { AddToCartButton } from '@/components/cart/AddToCartButton'
import type { Product } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col gap-4">
      <Link
        href={`/catalog/${product.id}`}
        className="block overflow-hidden rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,250,245,0.92),rgba(241,233,224,0.92))] p-3"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-white/72">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_55%)]" />
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`${product.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'} transition duration-700 group-hover:scale-105`}
            style={{ objectPosition: product.imagePosition ?? 'center' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">{product.material}</p>
          <Link href={`/catalog/${product.id}`} className="block font-serif-display text-2xl text-[var(--foreground)]">
            {product.name}
          </Link>
          <p className="line-clamp-2 text-sm leading-6 text-[var(--muted-foreground)]">{product.description}</p>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex min-h-14 items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-lg font-semibold text-[var(--foreground)]">{formatPrice(product.price)}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                {product.availability}
              </p>
            </div>
          </div>
          <AddToCartButton
            product={product}
            variant="solid"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
          />
        </div>
      </div>
    </article>
  )
}
