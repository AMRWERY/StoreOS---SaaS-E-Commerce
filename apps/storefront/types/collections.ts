export interface StorefrontCollection {
  id: string
  /** URL segment for `/collections/[slug]` */
  slug: string
  name: string
  description: string
  image: string
  count: number
  featured?: boolean
}

export interface CollectionCatalogProduct {
  id: number
  slug: string
  name: string
  category: string
  price: number
  image: string
  collectionSlug: string
}