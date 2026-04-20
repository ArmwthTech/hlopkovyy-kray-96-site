'use client'

import { startTransition, useMemo, useState } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  name: string
  images: string[]
  fit?: 'cover' | 'contain'
  position?: string
}

export function ProductGallery({
  name,
  images,
  fit = 'cover',
  position = 'center',
}: ProductGalleryProps) {
  const galleryImages = useMemo(() => Array.from(new Set(images)).slice(0, 4), [images])
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = galleryImages[activeIndex] ?? galleryImages[0]

  return (
    <div className="rounded-[40px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,250,245,0.92),rgba(241,233,224,0.92))] p-4 shadow-[0_24px_60px_rgba(92,70,50,0.08)] sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_110px]">
        <div className="rounded-[32px] border border-white/70 bg-white/78 p-3 sm:p-4">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Фотографии товара</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                Показываем товар в разных ракурсах, чтобы было проще оценить рисунок, фактуру и подачу комплекта.
              </p>
            </div>
            <span className="hidden rounded-full border border-[var(--line)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)] sm:inline-flex">
              {galleryImages.length} фото
            </span>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[var(--panel)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.62),transparent_52%)]" />
            <Image
              src={activeImage}
              alt={name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className={fit === 'contain' ? 'object-contain p-5 sm:p-8' : 'object-cover'}
              style={{ objectPosition: position }}
            />
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto lg:flex-col">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            aria-label={`Фото ${index + 1}`}
            aria-pressed={index === activeIndex}
            onClick={() => startTransition(() => setActiveIndex(index))}
            className={cn(
              'relative h-22 w-22 shrink-0 overflow-hidden rounded-[22px] border bg-white/85 p-1.5 transition',
              index === activeIndex
                ? 'border-[var(--accent-dark)] bg-white shadow-[0_16px_36px_rgba(92,70,50,0.12)]'
                : 'border-[var(--line)] hover:border-[var(--accent)]',
            )}
          >
            <span className="relative block h-full w-full overflow-hidden rounded-[16px] bg-[var(--panel)]">
              <Image
                src={image}
                alt={`Миниатюра ${index + 1}`}
                fill
                sizes="88px"
                className={fit === 'contain' ? 'object-contain p-2' : 'object-cover'}
                style={{ objectPosition: position }}
              />
            </span>
          </button>
        ))}
      </div>
      </div>
    </div>
  )
}
