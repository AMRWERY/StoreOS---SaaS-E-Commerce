export interface NewArrivalProduct {
  id: string
  /** URL segment for `/shop-all/[slug]`; defaults to slugified `name` */
  slug?: string
  name: string
  category: string
  price: number
  oldPrice?: number
  image: string
  badge?: { text: string; type: 'new' | 'limited' | 'sale' }
  timestamp: string
}
