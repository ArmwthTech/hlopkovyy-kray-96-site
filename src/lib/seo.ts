import type { Metadata } from 'next'

import type { Product, ProductCategory } from '@/lib/data'
import { CATEGORIES, STORE_INFO } from '@/lib/data'

export const SITE_NAME = 'Хлопковый Край 96'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const DEFAULT_OG_IMAGE = '/hero/hero-base.jpg'

const categorySeoCopy: Record<ProductCategory, { title: string; description: string }> = {
  bedding: {
    title: 'Постельное белье в Екатеринбурге',
    description: 'Постельное белье из сатина, тенселя и хлопка в Екатеринбурге. Подскажем по размеру, ткани и наличию в магазине на Викулова.',
  },
  blankets: {
    title: 'Одеяла и пледы в Екатеринбурге',
    description: 'Одеяла, пледы и теплый домашний текстиль в Екатеринбурге. Подтверждаем наличие, подбираем наполнитель и плотность.',
  },
  pillows: {
    title: 'Подушки для сна в Екатеринбурге',
    description: 'Подушки с разным наполнением и высотой в Екатеринбурге. Помогаем выбрать модель под привычки сна и положение головы.',
  },
  towels: {
    title: 'Полотенца в Екатеринбурге',
    description: 'Махровые полотенца для ванной и дома в Екатеринбурге. Помогаем подобрать плотность, размер и оттенок.',
  },
  robes: {
    title: 'Халаты в Екатеринбурге',
    description: 'Вафельные и махровые халаты в Екатеринбурге. Консультируем по посадке, плотности ткани и уходу.',
  },
  kids: {
    title: 'Детский текстиль в Екатеринбурге',
    description: 'Детское постельное белье и домашний текстиль в Екатеринбурге. Спокойные ткани, понятные размеры и консультация по выбору.',
  },
  mattresses: {
    title: 'Матрасы под заказ в Екатеринбурге',
    description: 'Матрасы под заказ в Екатеринбурге. Подберем жесткость, размер и комплектацию под ваш режим сна.',
  },
}

export function absoluteUrl(path: string = '/') {
  return new URL(path, SITE_URL).toString()
}

export function buildMetadata({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: {
  title: string
  description: string
  path?: string
  image?: string
  noindex?: boolean
}): Metadata {
  const canonical = absoluteUrl(path)
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: canonical,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteUrl(image),
          width: 1600,
          height: 1000,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
    robots: noindex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  }
}

export function getCategorySeoCopy(categoryId?: string) {
  if (!categoryId) {
    return {
      title: 'Каталог домашнего текстиля в Екатеринбурге',
      description: 'Каталог домашнего текстиля в Екатеринбурге: постельное белье, подушки, одеяла, полотенца, халаты и матрасы с консультацией по выбору.',
    }
  }

  return categorySeoCopy[categoryId as ProductCategory]
}

export function getProductSeoDescription(product: Product) {
  const category = CATEGORIES.find((item) => item.id === product.category)
  const base = product.description.replace(/\.$/, '')
  const availability = product.availability.toLowerCase()

  return `${product.name} — ${category?.name.toLowerCase() ?? 'домашний текстиль'} в Екатеринбурге. ${base}. ${availability.charAt(0).toUpperCase()}${availability.slice(1)}, консультация и магазин на ${STORE_INFO.address}.`
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    telephone: STORE_INFO.phones[0],
    email: STORE_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: STORE_INFO.city,
      streetAddress: STORE_INFO.address,
      addressCountry: 'RU',
    },
    openingHours: [
      'Tu-Fr 10:30-18:30',
      'Sa 10:30-17:00',
      'Su 10:30-16:00',
    ],
    areaServed: STORE_INFO.city,
    sameAs: [STORE_INFO.telegram, STORE_INFO.whatsapp],
  }
}

export function buildProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: getProductSeoDescription(product),
    image: product.images.map((image) => absoluteUrl(image)),
    brand: SITE_NAME,
    material: product.material,
    sku: product.id,
    category: CATEGORIES.find((item) => item.id === product.category)?.name,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: product.price > 0 ? product.price : undefined,
      availability:
        product.availability === 'В наличии в магазине'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      url: absoluteUrl(`/catalog/${product.id}`),
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
  }
}
