import type { Metadata } from 'next'
import Link from 'next/link'

import { ProductCard } from '@/components/molecules/ProductCard'
import { Pagination } from '@/components/organisms/Pagination'
import { CATEGORIES, MATERIALS, SIZES, getFilteredProducts } from '@/lib/data'
import { buildMetadata, getCategorySeoCopy } from '@/lib/seo'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const category = typeof params.category === 'string' ? params.category : undefined
  const material = typeof params.material === 'string' ? params.material : undefined
  const size = typeof params.size === 'string' ? params.size : undefined
  const seoCopy = getCategorySeoCopy(category)

  return buildMetadata({
    title: seoCopy?.title ?? 'Каталог домашнего текстиля в Екатеринбурге',
    description: seoCopy?.description ?? 'Каталог домашнего текстиля в Екатеринбурге: постельное белье, подушки, одеяла, полотенца, халаты и матрасы.',
    path: category ? `/catalog?category=${category}` : '/catalog',
    noindex: Boolean((material || size) && category),
  })
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const params = await searchParams
  const category = (params.category as string) || 'all'
  const material = (params.material as string) || ''
  const size = (params.size as string) || ''
  const page = parseInt((params.page as string) || '1', 10)

  const { items, totalPages, total, currentPage } = getFilteredProducts({
    category,
    material,
    size,
    page,
    pageSize: 9,
  })
  const activeCategory = CATEGORIES.find((item) => item.id === category)
  const seoCopy = getCategorySeoCopy(activeCategory?.id)

  return (
    <main className="pt-26 pb-20">
      <div className="container-wide space-y-10">
        <header className="space-y-4">
          <span className="eyebrow">Каталог</span>
          <h1 className="font-serif-display text-4xl text-[var(--foreground)] md:text-6xl">
            {activeCategory ? activeCategory.name : 'Каталог домашнего текстиля'}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--muted-foreground)]">
            {seoCopy?.description ??
              'Каталог домашнего текстиля в Екатеринбурге: выберите категорию, материал и размер, а затем отправьте заявку в магазин без онлайн-оплаты.'}
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-8 rounded-[32px] border border-[var(--line)] bg-white/78 p-6 lg:sticky lg:top-24 lg:h-fit">
            <div>
              <h2 className="eyebrow">Категории</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="/catalog"
                    className={`text-sm ${category === 'all' ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}
                  >
                    Все товары
                  </Link>
                </li>
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/catalog?category=${cat.id}`}
                      className={`text-sm ${category === cat.id ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <form action="/catalog" className="space-y-4 border-t border-[var(--line)] pt-6">
              {category !== 'all' ? <input type="hidden" name="category" value={category} /> : null}
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]" htmlFor="material">
                  Материал
                </label>
                <select id="material" name="material" defaultValue={material} className="w-full rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 outline-none focus:border-[var(--accent)]">
                  <option value="">Все материалы</option>
                  {MATERIALS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]" htmlFor="size">
                  Размер
                </label>
                <select id="size" name="size" defaultValue={size} className="w-full rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-4 py-3 outline-none focus:border-[var(--accent)]">
                  <option value="">Все размеры</option>
                  {SIZES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <button className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent-dark)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--foreground)]">
                Применить
              </button>
            </form>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between text-sm text-[var(--muted-foreground)]">
              <span>Подходящих позиций: {total}</span>
              <Link href="/cart" className="text-[var(--foreground)]">Оставить заявку</Link>
            </div>
            {items.length > 0 ? (
              <>
                <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  baseUrl="/catalog"
                  category={category === 'all' ? undefined : category}
                  material={material || undefined}
                  size={size || undefined}
                />
              </>
            ) : (
              <div className="rounded-[32px] border border-dashed border-[var(--line)] bg-white/72 px-6 py-20 text-center">
                <p className="text-[var(--muted-foreground)]">По таким параметрам пока ничего не найдено.</p>
                <Link href="/catalog" className="mt-4 inline-block text-sm text-[var(--foreground)]">
                  Сбросить фильтры и вернуться в каталог
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
