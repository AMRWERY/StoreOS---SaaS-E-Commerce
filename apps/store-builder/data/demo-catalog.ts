/**
 * Demo catalog used by commerce blocks (product page, collection, cart, search …)
 * until the builder is wired to a real backend.
 */

export interface DemoProduct {
  id: string
  handle: string
  title: string
  category: string
  price: number
  compareAt?: number
  image: string
  images: string[]
  rating: number
  reviews: number
  badge?: string
  description: string
  colors: string[]
  sizes: string[]
  inStock: boolean
}

export interface DemoCategory {
  id: string
  title: string
  image: string
  count: number
}

export interface DemoReview {
  id: string
  author: string
  avatar: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
}

export interface DemoPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  category: string
}

const LOREM =
  'Thoughtfully designed and built to last. Crafted from premium materials with attention to every detail, so it looks great and feels even better in everyday use.'

export const DEMO_PRODUCTS: DemoProduct[] = [
  { id: 'p1', handle: 'aero-wireless-headphones', title: 'Aero Wireless Headphones', category: 'Electronics', price: 129, compareAt: 169, image: '/img/product-01.png', images: ['/img/product-01.png', '/img/product-02.png', '/img/product-03.png', '/img/product-04.png'], rating: 4.8, reviews: 214, badge: 'Best seller', description: LOREM, colors: ['#111827', '#e5e7eb', '#6366f1'], sizes: [], inStock: true },
  { id: 'p2', handle: 'nova-smart-watch', title: 'Nova Smart Watch', category: 'Electronics', price: 199, image: '/img/product-02.png', images: ['/img/product-02.png', '/img/product-01.png', '/img/product-05.png'], rating: 4.6, reviews: 98, badge: 'New', description: LOREM, colors: ['#111827', '#f59e0b'], sizes: ['S', 'M', 'L'], inStock: true },
  { id: 'p3', handle: 'trail-running-shoes', title: 'Trail Running Shoes', category: 'Sports', price: 89, compareAt: 120, image: '/img/product-03.png', images: ['/img/product-03.png', '/img/product-04.png'], rating: 4.5, reviews: 156, badge: '-26%', description: LOREM, colors: ['#ef4444', '#111827', '#10b981'], sizes: ['40', '41', '42', '43', '44'], inStock: true },
  { id: 'p4', handle: 'minimal-leather-backpack', title: 'Minimal Leather Backpack', category: 'Accessories', price: 149, image: '/img/product-04.png', images: ['/img/product-04.png', '/img/product-06.png'], rating: 4.9, reviews: 71, description: LOREM, colors: ['#78350f', '#111827'], sizes: [], inStock: true },
  { id: 'p5', handle: 'ceramic-pour-over-set', title: 'Ceramic Pour-Over Set', category: 'Home & Living', price: 54, image: '/img/product-05.png', images: ['/img/product-05.png', '/img/product-07.png'], rating: 4.7, reviews: 43, description: LOREM, colors: ['#f5f5f4', '#1f2937'], sizes: [], inStock: true },
  { id: 'p6', handle: 'linen-lounge-chair', title: 'Linen Lounge Chair', category: 'Home & Living', price: 320, compareAt: 389, image: '/img/product-06.png', images: ['/img/product-06.png', '/img/product-08.png'], rating: 4.4, reviews: 27, badge: 'Low stock', description: LOREM, colors: ['#d6d3d1', '#78716c'], sizes: [], inStock: true },
  { id: 'p7', handle: 'studio-yoga-mat', title: 'Studio Yoga Mat', category: 'Sports', price: 39, image: '/img/product-07.png', images: ['/img/product-07.png', '/img/product-09.png'], rating: 4.3, reviews: 312, description: LOREM, colors: ['#8b5cf6', '#14b8a6'], sizes: [], inStock: true },
  { id: 'p8', handle: 'classic-sunglasses', title: 'Classic Sunglasses', category: 'Accessories', price: 74, compareAt: 95, image: '/img/product-08.png', images: ['/img/product-08.png', '/img/product-09.png'], rating: 4.6, reviews: 88, badge: 'Sale', description: LOREM, colors: ['#111827', '#92400e'], sizes: [], inStock: false },
]

export const DEMO_CATEGORIES: DemoCategory[] = [
  { id: 'c1', title: 'Electronics', image: '/img/category-01.png', count: 24 },
  { id: 'c2', title: 'Sports', image: '/img/category-02.png', count: 18 },
  { id: 'c3', title: 'Home & Living', image: '/img/category-03.png', count: 32 },
  { id: 'c4', title: 'Accessories', image: '/img/category-04.png', count: 15 },
]

export const DEMO_REVIEWS: DemoReview[] = [
  { id: 'r1', author: 'Sara M.', avatar: '/img/avatar-01.png', rating: 5, title: 'Exactly what I hoped for', body: 'Great quality and it arrived earlier than expected. Would happily order again.', date: '2026-10-02', verified: true },
  { id: 'r2', author: 'Omar K.', avatar: '/img/avatar-02.png', rating: 4, title: 'Very good value', body: 'Looks even better in person. One star off only because the packaging was bulky.', date: '2026-09-18', verified: true },
  { id: 'r3', author: 'Lina A.', avatar: '/img/avatar-03.png', rating: 5, title: 'Love it', body: 'Perfect fit and finish. Customer support answered all my questions within minutes.', date: '2026-08-30', verified: false },
]

export const DEMO_POSTS: DemoPost[] = [
  { id: 'b1', title: '5 ways to style your space this season', excerpt: 'Small changes that make a big difference to how a room feels.', image: '/img/collection-01.png', date: '2026-10-12', author: 'Editorial team', category: 'Inspiration' },
  { id: 'b2', title: 'Behind the scenes: how we pick our materials', excerpt: 'A look at the sourcing standards behind every product we sell.', image: '/img/collection-02.png', date: '2026-09-28', author: 'Editorial team', category: 'Our story' },
  { id: 'b3', title: 'The care guide: make your favourites last', excerpt: 'Simple maintenance tips to keep your purchases looking new.', image: '/img/collection-04.png', date: '2026-09-05', author: 'Editorial team', category: 'Guides' },
]

export const formatPrice = (value: number, currency = '$') =>
  `${currency}${value.toLocaleString('en-US', { minimumFractionDigits: value % 1 ? 2 : 0, maximumFractionDigits: 2 })}`
