export interface Localized {
  en: string
  ar: string
}

export interface OptionValue {
  value: string
  label: Localized
}

export interface ProductOption {
  key: string
  label: Localized
  values: OptionValue[]
}

export interface ProductVariant {
  id: string
  sku: string
  options: Record<string, string>
  price: number
  stock: number
}

export interface Product {
  id: string
  handle: string
  title: Localized
  description: Localized
  price: number
  compareAt?: number
  category: string
  collections: string[]
  options: ProductOption[]
  variants: ProductVariant[]
  rating: number
  reviews: number
  tone: number
  icon: string
  image: string
  isNew?: boolean
  cod: boolean
}

export interface Category {
  handle: string
  title: Localized
  icon: string
  tone: number
  image: string
}

export interface Collection {
  handle: string
  title: Localized
  description: Localized
  tone: number
  icon: string
  image: string
}

export interface CartLine {
  variantId: string
  productId: string
  qty: number
}

export interface CartItem extends CartLine {
  product: Product
  variant: ProductVariant
  unitPrice: number
  lineTotal: number
}

export type OrderStatus = 'placed' | 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled'

export interface OrderItem {
  title: Localized
  variantLabel: string
  qty: number
  unitPrice: number
  tone: number
  icon: string
  image: string
}

export interface ShopOrder {
  id: string
  placedAt: string
  status: OrderStatus
  paymentMethod: 'cod' | 'card' | 'wallet'
  items: OrderItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  address: string
  phone: string
}

export interface ShopAddress {
  id: string
  label: string
  name: string
  phone: string
  governorate: string
  city: string
  area: string
  street: string
  landmark: string
  isDefault: boolean
}

export interface GeoArea {
  value: string
  label: Localized
}
export interface GeoCity {
  value: string
  label: Localized
  areas: GeoArea[]
}
export interface GeoGovernorate {
  value: string
  label: Localized
  cities: GeoCity[]
}

export interface ContentPage {
  slug: string
  title: Localized
  intro: Localized
  sections: { heading: Localized; body: Localized }[]
}

export interface FilterState {
  minPrice: string
  maxPrice: string
  inStockOnly: boolean
  options: Record<string, string[]>
}
