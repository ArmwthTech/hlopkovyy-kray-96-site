export type ProductCategory =
  | 'bedding'
  | 'blankets'
  | 'pillows'
  | 'towels'
  | 'robes'
  | 'kids'
  | 'mattresses'

export interface Category {
  id: ProductCategory
  name: string
  description: string
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: number
  image: string
  images: string[]
  description: string
  material: string
  sizes: string[]
  availability: string
  leadTime?: string
  isFeatured?: boolean
  isNew?: boolean
  imageFit?: 'cover' | 'contain'
  imagePosition?: string
}

export interface CatalogFilters {
  category?: string
  material?: string
  size?: string
  page?: number
  pageSize?: number
}

export interface StoreInfo {
  city: string
  address: string
  nearby: string
  workingHours: string[]
  phones: string[]
  email: string
  telegram: string
  whatsapp: string
}

export const STORE_INFO: StoreInfo = {
  city: 'Екатеринбург',
  address: 'ул. Викулова, 48',
  nearby: 'угол ул. Викулова — Металлургов',
  workingHours: [
    'Понедельник — выходной',
    'Вторник — пятница: 10:30–18:30',
    'Суббота: 10:30–17:00',
    'Воскресенье: 10:30–16:00',
  ],
  phones: ['+7 (343) 246-49-48', '+7 (343) 219-40-08'],
  email: 'vklimkin@inbox.ru',
  telegram: 'https://t.me/VKlim1984',
  whatsapp: 'https://wa.me/79221015749',
}

export const CATEGORIES: Category[] = [
  {
    id: 'bedding',
    name: 'Постельное белье',
    description: 'Комплекты из сатина, тенселя и хлопка для спальни, где важны тишина, тактильность и аккуратный вид.',
  },
  {
    id: 'blankets',
    name: 'Одеяла и пледы',
    description: 'Одеяла и пледы для спокойного дома: от лёгких повседневных моделей до тёплых вариантов под сезон.',
  },
  {
    id: 'pillows',
    name: 'Подушки',
    description: 'Подушки с разной высотой и наполнением, чтобы подобрать привычную поддержку под ваш сон.',
  },
  {
    id: 'towels',
    name: 'Полотенца',
    description: 'Мягкие полотенца для ванной, гостевой комнаты и ежедневного домашнего использования.',
  },
  {
    id: 'robes',
    name: 'Халаты',
    description: 'Вафельные и махровые халаты для дома, бани и спокойного повседневного ритма.',
  },
  {
    id: 'kids',
    name: 'Для детей',
    description: 'Детский текстиль из понятных тканей, который приятно использовать каждый день.',
  },
  {
    id: 'mattresses',
    name: 'Матрасы',
    description: 'Матрасы под заказ с подбором по размеру, жёсткости и привычкам сна.',
  },
]

export const MATERIALS = ['Мако-сатин', 'Тенсель', 'Хлопок', 'Лен', 'Махра', 'Пух/перо'] as const
export const SIZES = ['50×70', '70×70', '1.5-спальный', '2-спальный', 'Евро', 'Семейный'] as const

export const PRODUCTS: Product[] = [
  {
    id: 'linen-cloud',
    name: 'Комплект «Льняное Облако»',
    category: 'bedding',
    price: 12400,
    image:
      'https://optim.tildacdn.com/stor3563-3238-4266-b038-323934303264/-/resize/500x500/-/format/webp/33c93e7cf1a46b9a23b9492077284ccd.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor3563-3238-4266-b038-323934303264/-/resize/500x500/-/format/webp/33c93e7cf1a46b9a23b9492077284ccd.jpg.webp',
      'https://optim.tildacdn.com/stor3663-3138-4436-b139-383561376565/-/resize/500x500/-/format/webp/764e1ddaf66faa22f7a5f4a9c6cc80c3.jpg.webp',
      'https://optim.tildacdn.com/stor6334-3432-4338-b838-613435336337/-/resize/500x500/-/format/webp/46ab364861c2f3a8b590808d08dc9677.jpg.webp',
    ],
    description:
      'Тенселевый комплект для спокойной спальни: мягкий, прохладный на ощупь и визуально собранный.',
    material: 'Тенсель',
    sizes: ['2-спальный', 'Евро', 'Семейный'],
    availability: 'В наличии в магазине',
    isFeatured: true,
    isNew: true,
    imagePosition: 'center',
  },
  {
    id: 'satin-dune',
    name: 'Комплект «Песчаная Дюна»',
    category: 'bedding',
    price: 15800,
    image:
      'https://optim.tildacdn.com/stor6336-6135-4163-b866-613632386234/-/resize/500x500/-/format/webp/6ed73c58d69214df85bb509e657a8709.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor6336-6135-4163-b866-613632386234/-/resize/500x500/-/format/webp/6ed73c58d69214df85bb509e657a8709.jpg.webp',
      'https://optim.tildacdn.com/stor6338-3630-4935-b831-373737366466/-/resize/500x500/-/format/webp/d62684d1e080f151e269d264d2c4c58b.jpg.webp',
      'https://optim.tildacdn.com/stor3962-3463-4263-b736-613861336637/-/resize/500x500/-/format/webp/c02f17d04b8e768049117511e9fe446f.jpg.webp',
    ],
    description:
      'Сатиновый комплект песочного оттенка, который держит форму и легко вписывается в спокойный интерьер.',
    material: 'Мако-сатин',
    sizes: ['1.5-спальный', '2-спальный', 'Евро'],
    availability: 'В наличии в магазине',
    isFeatured: true,
  },
  {
    id: 'sage-line',
    name: 'Комплект «Полынная Линия»',
    category: 'bedding',
    price: 14900,
    image:
      'https://optim.tildacdn.com/stor3962-3463-4263-b736-613861336637/-/resize/500x500/-/format/webp/c02f17d04b8e768049117511e9fe446f.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor3962-3463-4263-b736-613861336637/-/resize/500x500/-/format/webp/c02f17d04b8e768049117511e9fe446f.jpg.webp',
      'https://optim.tildacdn.com/stor6334-3432-4338-b838-613435336337/-/resize/500x500/-/format/webp/46ab364861c2f3a8b590808d08dc9677.jpg.webp',
    ],
    description:
      'Комплект из тенселя с мягким матовым блеском и сдержанным оттенком для прохладной спальни.',
    material: 'Тенсель',
    sizes: ['2-спальный', 'Евро'],
    availability: 'В наличии в магазине',
  },
  {
    id: 'orchid-classic',
    name: 'Постельное белье «Орхидея Классик»',
    category: 'bedding',
    price: 8900,
    image:
      'https://optim.tildacdn.com/stor6663-3564-4831-b139-373331366563/-/resize/500x500/-/format/webp/1d9d868f120f7c14489b458b24ecbe06.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor6663-3564-4831-b139-373331366563/-/resize/500x500/-/format/webp/1d9d868f120f7c14489b458b24ecbe06.jpg.webp',
      'https://optim.tildacdn.com/stor6265-3937-4262-b330-666234303132/-/resize/500x500/-/format/webp/783a4750c81969ff164e121499c7a88e.jpg.webp',
    ],
    description:
      'Хлопковый комплект на каждый день: понятная ткань, спокойный рисунок и удобный выбор размеров в магазине.',
    material: 'Хлопок',
    sizes: ['1.5-спальный', '2-спальный', 'Евро'],
    availability: 'В наличии в магазине',
  },
  {
    id: 'norsk-duvet',
    name: 'Одеяло NORSK DUN',
    category: 'blankets',
    price: 40000,
    image:
      'https://optim.tildacdn.com/stor3632-6634-4065-b935-366235633732/-/resize/500x500/-/format/webp/753859420ba12730b0702bb4cbca15f8.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor3632-6634-4065-b935-366235633732/-/resize/500x500/-/format/webp/753859420ba12730b0702bb4cbca15f8.jpg.webp',
      'https://optim.tildacdn.com/stor6232-3133-4533-b330-376632373933/-/resize/500x500/-/format/webp/76689339.jpg.webp',
    ],
    description:
      'Пуховое одеяло с лёгкой посадкой и ровным теплом для тех, кто не любит тяжёлый объём.',
    material: 'Пух/перо',
    sizes: ['2-спальный', 'Евро'],
    availability: 'Под заказ',
    leadTime: '3–5 дней',
    isFeatured: true,
    imageFit: 'contain',
  },
  {
    id: 'valencia-plaid',
    name: 'Плед «Валенсия Boukle»',
    category: 'blankets',
    price: 2240,
    image:
      'https://optim.tildacdn.com/stor6338-3239-4235-a336-663539633331/-/resize/500x500/-/format/webp/51906701.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor6338-3239-4235-a336-663539633331/-/resize/500x500/-/format/webp/51906701.jpg.webp',
      'https://optim.tildacdn.com/stor6232-3133-4533-b330-376632373933/-/resize/500x500/-/format/webp/76689339.jpg.webp',
    ],
    description:
      'Нейтральный плед с выраженной фактурой для спальни, кресла или спокойной зоны отдыха.',
    material: 'Хлопок',
    sizes: ['Евро'],
    availability: 'В наличии в магазине',
    imageFit: 'contain',
  },
  {
    id: 'sonata-pillow',
    name: 'Подушка «Соната»',
    category: 'pillows',
    price: 5950,
    image:
      'https://optim.tildacdn.com/stor3464-3931-4139-a366-323233303436/-/resize/500x500/-/format/webp/67647929.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor3464-3931-4139-a366-323233303436/-/resize/500x500/-/format/webp/67647929.jpg.webp',
      'https://optim.tildacdn.com/stor6466-3531-4739-a336-353137346565/-/resize/500x500/-/format/webp/95480016.jpg.webp',
    ],
    description:
      'Подушка для тех, кто любит упругую поддержку и привычную высоту без излишней мягкости.',
    material: 'Пух/перо',
    sizes: ['50×70', '70×70'],
    availability: 'В наличии в магазине',
    imageFit: 'contain',
  },
  {
    id: 'harmony-pillow',
    name: 'Подушка «Гармония»',
    category: 'pillows',
    price: 4060,
    image:
      'https://optim.tildacdn.com/stor6466-3531-4739-a336-353137346565/-/resize/500x500/-/format/webp/95480016.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor6466-3531-4739-a336-353137346565/-/resize/500x500/-/format/webp/95480016.jpg.webp',
      'https://optim.tildacdn.com/stor3464-3931-4139-a366-323233303436/-/resize/500x500/-/format/webp/67647929.jpg.webp',
    ],
    description:
      'Подушка для ежедневного сна с аккуратной поддержкой шеи и головы.',
    material: 'Хлопок',
    sizes: ['50×70'],
    availability: 'В наличии в магазине',
    imageFit: 'contain',
  },
  {
    id: 'cloud-towel',
    name: 'Полотенце «Облако»',
    category: 'towels',
    price: 1980,
    image:
      'https://optim.tildacdn.com/stor3165-3766-4536-b864-646262613031/-/resize/500x500/-/format/webp/14510942.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor3165-3766-4536-b864-646262613031/-/resize/500x500/-/format/webp/14510942.jpg.webp',
      'https://optim.tildacdn.com/stor6231-3830-4463-b637-653766653336/-/resize/500x500/-/format/webp/60814025.jpg.webp',
    ],
    description:
      'Плотное полотенце с хорошим впитыванием и мягким ощущением после стирки.',
    material: 'Махра',
    sizes: ['50×70', '70×70'],
    availability: 'В наличии в магазине',
    isFeatured: true,
    imageFit: 'contain',
  },
  {
    id: 'cablaggi-robe',
    name: 'Халат Cablaggi',
    category: 'robes',
    price: 6400,
    image:
      'https://optim.tildacdn.com/stor6231-3830-4463-b637-653766653336/-/resize/500x500/-/format/webp/60814025.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor6231-3830-4463-b637-653766653336/-/resize/500x500/-/format/webp/60814025.jpg.webp',
      'https://optim.tildacdn.com/stor6232-3733-4036-b333-666231326239/-/resize/500x500/-/format/webp/11256215.jpg.webp',
    ],
    description:
      'Махровый халат с мягким объёмом для дома, душа и спокойного вечернего ритма.',
    material: 'Махра',
    sizes: ['M', 'L', 'XL'],
    availability: 'В наличии в магазине',
    imageFit: 'contain',
  },
  {
    id: 'confetto-robe',
    name: 'Вафельный халат Confetto',
    category: 'robes',
    price: 2000,
    image:
      'https://optim.tildacdn.com/stor6232-3733-4036-b333-666231326239/-/resize/500x500/-/format/webp/11256215.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor6232-3733-4036-b333-666231326239/-/resize/500x500/-/format/webp/11256215.jpg.webp',
      'https://optim.tildacdn.com/stor6231-3830-4463-b637-653766653336/-/resize/500x500/-/format/webp/60814025.jpg.webp',
    ],
    description:
      'Лёгкий вафельный халат для дачи, бани и дома, когда нужен простой и удобный вариант.',
    material: 'Хлопок',
    sizes: ['S', 'M', 'L'],
    availability: 'В наличии в магазине',
    imageFit: 'contain',
  },
  {
    id: 'kids-moon',
    name: 'Детский комплект «Лунная комната»',
    category: 'kids',
    price: 3200,
    image:
      'https://optim.tildacdn.com/stor6437-3866-4931-b337-346634663536/-/resize/500x500/-/format/webp/187635dff976738a900f87bbd7c87402.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor6437-3866-4931-b337-346634663536/-/resize/500x500/-/format/webp/187635dff976738a900f87bbd7c87402.jpg.webp',
      'https://optim.tildacdn.com/stor3636-3165-4231-b462-363962323435/-/resize/500x500/-/format/webp/2a1dd0c86d08f6218d8969e247266994.jpg.webp',
    ],
    description:
      'Детский комплект из мягкого хлопка с неброским рисунком и понятной повседневной практичностью.',
    material: 'Хлопок',
    sizes: ['1.5-спальный'],
    availability: 'В наличии в магазине',
    imagePosition: 'center top',
  },
  {
    id: 'custom-mattress',
    name: 'Матрас под заказ',
    category: 'mattresses',
    price: 0,
    image:
      'https://optim.tildacdn.com/stor3538-3361-4236-b338-663133376531/-/resize/500x500/-/format/webp/25292721.jpg.webp',
    images: [
      'https://optim.tildacdn.com/stor3538-3361-4236-b338-663133376531/-/resize/500x500/-/format/webp/25292721.jpg.webp',
    ],
    description:
      'Матрас под заказ с подбором по размеру, жёсткости и привычкам сна. Финальная цена зависит от наполнения и комплектации.',
    material: 'Хлопок',
    sizes: ['Индивидуальный размер'],
    availability: 'Под заказ',
    leadTime: '5–10 дней',
    imageFit: 'contain',
  },
]

export function getProductById(id: string) {
  return PRODUCTS.find((product) => product.id === id)
}

export function getCategoryById(id: string) {
  return CATEGORIES.find((category) => category.id === id)
}

export function getFeaturedProducts(limit: number = 4) {
  return PRODUCTS.filter((product) => product.isFeatured).slice(0, limit)
}

export function getRelatedProducts(id: string, limit: number = 3) {
  const current = getProductById(id)
  if (!current) {
    return []
  }

  return PRODUCTS.filter((product) => product.category === current.category && product.id !== id).slice(0, limit)
}

export function getFilteredProducts({
  category = 'all',
  material,
  size,
  page = 1,
  pageSize = 9,
}: CatalogFilters = {}) {
  const filtered = PRODUCTS.filter((product) => {
    if (category !== 'all' && product.category !== category) {
      return false
    }

    if (material && product.material !== material) {
      return false
    }

    if (size && !product.sizes.includes(size)) {
      return false
    }

    return true
  })

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize

  return {
    items: filtered.slice(start, start + pageSize),
    total,
    totalPages,
    currentPage,
  }
}
