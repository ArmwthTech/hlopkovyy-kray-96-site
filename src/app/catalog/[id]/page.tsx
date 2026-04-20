import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, MapPin, ShieldCheck, Truck } from 'lucide-react'

import { AddToCartButton } from '@/components/cart/AddToCartButton'
import { ProductGallery } from '@/components/catalog/ProductGallery'
import { STORE_INFO, getCategoryById, getProductById, getRelatedProducts, PRODUCTS } from '@/lib/data'
import { buildBreadcrumbSchema, buildMetadata, buildProductSchema, getProductSeoDescription } from '@/lib/seo'
import { formatPrice } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return buildMetadata({
      title: 'Товар не найден',
      description: 'Страница товара не найдена.',
      path: `/catalog/${id}`,
      noindex: true,
    })
  }

  return buildMetadata({
    title: `${product.name} в Екатеринбурге`,
    description: getProductSeoDescription(product),
    path: `/catalog/${product.id}`,
    image: product.image,
  })
}

export default async function ProductDetails({ params }: PageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const related = getRelatedProducts(product.id, 3)
  const category = getCategoryById(product.category)
  const productSchema = buildProductSchema(product)
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Главная', path: '/' },
    { name: 'Каталог', path: '/catalog' },
    { name: category?.name ?? 'Каталог', path: `/catalog?category=${product.category}` },
    { name: product.name, path: `/catalog/${product.id}` },
  ])

  return (
    <main className="pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container-wide">
        <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
          <Link href="/">Главная</Link>
          <span>/</span>
          <Link href="/catalog">Каталог</Link>
          <span>/</span>
          {category ? (
            <>
              <Link href={`/catalog?category=${product.category}`}>{category.name}</Link>
              <span>/</span>
            </>
          ) : null}
          <span className="truncate">{product.name}</span>
        </nav>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery
            name={product.name}
            images={product.images.length > 0 ? product.images : [product.image]}
            fit={product.imageFit}
            position={product.imagePosition}
          />
          <div className="space-y-8 rounded-[36px] border border-[var(--line)] bg-white/84 p-8 shadow-[0_20px_60px_rgba(92,70,50,0.08)]">
            <div className="space-y-4">
              <p className="eyebrow">{product.material}</p>
              <h1 className="font-serif-display text-4xl text-[var(--foreground)] md:text-5xl">{product.name}</h1>
              <p className="text-3xl font-semibold text-[var(--foreground)]">{formatPrice(product.price)}</p>
              <p className="text-base leading-7 text-[var(--muted-foreground)]">{product.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-[var(--panel)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Размеры</p>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground)]">{product.sizes.join(', ')}</p>
              </div>
              <div className="rounded-[24px] bg-[var(--panel)] p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Наличие</p>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground)]">
                  {product.availability}
                  {product.leadTime ? ` • ${product.leadTime}` : ''}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                product={product}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-4 text-sm font-medium text-white transition hover:bg-[var(--accent-dark)]"
              />
              <Link href="/cart" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] px-6 py-4 text-sm text-[var(--foreground)]">
                Перейти к заявке
              </Link>
            </div>

            <div className="grid gap-4 border-t border-[var(--line)] pt-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-[var(--accent-dark)]" />
                <div>
                  <h2 className="text-sm font-medium text-[var(--foreground)]">Подбор без догадок</h2>
                  <p className="text-sm leading-6 text-[var(--muted-foreground)]">
                    Поможем выбрать размер, плотность ткани и практичный вариант под ваш бюджет.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="mt-1 h-5 w-5 text-[var(--accent-dark)]" />
                <div>
                  <h2 className="text-sm font-medium text-[var(--foreground)]">Подтверждаем наличие</h2>
                  <p className="text-sm leading-6 text-[var(--muted-foreground)]">
                    После заявки менеджер проверит склад и расскажет по срокам доставки.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-[var(--accent-dark)]" />
                <div>
                  <h2 className="text-sm font-medium text-[var(--foreground)]">Можно приехать в магазин</h2>
                  <p className="text-sm leading-6 text-[var(--muted-foreground)]">
                    {STORE_INFO.city}, {STORE_INFO.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 pt-12 md:grid-cols-3">
          <article className="rounded-[28px] border border-[var(--line)] bg-white/84 p-6">
            <h2 className="text-sm font-medium text-[var(--foreground)]">Доставка и самовывоз</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
              По Екатеринбургу согласовываем доставку после подтверждения заявки. Также можно забрать заказ самостоятельно из магазина.
            </p>
            <Link href="/delivery" className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--foreground)]">
              Условия доставки
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
          <article className="rounded-[28px] border border-[var(--line)] bg-white/84 p-6">
            <h2 className="text-sm font-medium text-[var(--foreground)]">Контакты магазина</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
              Если нужно уточнить материал, размер или наличие, можно позвонить в магазин и получить нормальную консультацию без ожидания.
            </p>
            <Link href="/contacts" className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--foreground)]">
              Контакты
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
          <article className="rounded-[28px] border border-[var(--line)] bg-white/84 p-6">
            <h2 className="text-sm font-medium text-[var(--foreground)]">Правовая информация</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
              Если по заказу возник вопрос, можно заранее посмотреть условия возврата, политику обработки персональных данных и статус публикации реквизитов продавца.
            </p>
            <Link href="/seller-info" className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--foreground)]">
              Сведения о продавце
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </section>

        <section className="pt-20">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="eyebrow">Похожие товары</span>
              <h2 className="font-serif-display text-4xl text-[var(--foreground)]">С этим товаром часто смотрят</h2>
            </div>
            <Link href="/catalog" className="hidden items-center gap-2 text-sm text-[var(--foreground)] md:inline-flex">
              Весь каталог
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <article key={item.id} className="space-y-4">
                <Link href={`/catalog/${item.id}`} className="block overflow-hidden rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,250,245,0.92),rgba(241,233,224,0.92))] p-3">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-white/70">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className={item.imageFit === 'contain' ? 'object-contain p-4' : 'object-cover'}
                      style={{ objectPosition: item.imagePosition ?? 'center' }}
                      sizes="(max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>
                <div className="space-y-2">
                  <Link href={`/catalog/${item.id}`} className="font-serif-display text-2xl text-[var(--foreground)]">
                    {item.name}
                  </Link>
                  <p className="text-sm text-[var(--muted-foreground)]">{formatPrice(item.price)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
