export interface NewArrivalProduct {
  id: string
  slug?: string
  name: string
  category: string
  price: number
  oldPrice?: number
  image: string
  badge?: { text: string; type: 'new' | 'limited' | 'sale' }
  timestamp: string
}
