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
