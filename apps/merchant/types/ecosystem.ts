/** Batch 10: builder & ecosystem (themes, blog, redirects, import, apps, webhooks, b2b, pos). Mock-only shapes. */

export type EcoThemeStatus = 'published' | 'installed' | 'starter'

export interface EcoTheme {
  id: string
  name: string
  status: EcoThemeStatus
  gradient: string
  icon: string
  rtl: boolean
  publishedAt: string | null
}

export type EcoVersionStatus = 'published' | 'draft' | 'previous'

export interface EcoThemeVersion {
  id: string
  version: string
  author: string
  note: string
  date: string
  status: EcoVersionStatus
}

export type EcoArticleStatus = 'draft' | 'scheduled' | 'published'

export interface EcoArticle {
  id: string
  title: string
  slug: string
  author: string
  tags: string[]
  status: EcoArticleStatus
  publishDate: string
  excerpt: string
  content: string
  seoTitle: string
  seoDescription: string
  rtl: boolean
}

export interface EcoRedirect {
  id: string
  from: string
  to: string
  type: 301 | 302
  hits: number
}

export interface EcoNotFound {
  path: string
  hits: number
  lastSeen: string
}

export type EcoImportSourceId = 'shopify' | 'woocommerce' | 'csv' | 'sallazid'

export interface EcoImportSource {
  id: EcoImportSourceId
  icon: string
}

export interface EcoStarterTemplate {
  id: string
  icon: string
  gradient: string
  products: number
  pages: number
}

export interface EcoAppItem {
  id: string
  name: string
  developer: string
  rating: number
  price: number
  category: string
  icon: string
  installed: boolean
  scopes: string[]
}

export type EcoDeliveryStatus = 'delivered' | 'failed' | 'retrying'

export interface EcoDelivery {
  id: string
  event: string
  endpoint: string
  attempts: number
  statusCode: number
  status: EcoDeliveryStatus
  time: string
  request: string
  response: string
}

export type EcoCompanyStatus = 'active' | 'pending' | 'suspended'
export type EcoPaymentTerms = 'net30' | 'prepaid'

export interface EcoCompany {
  id: string
  name: string
  locations: number
  buyers: number
  terms: EcoPaymentTerms
  creditLimit: number
  status: EcoCompanyStatus
}

export interface EcoPriceTier {
  minQty: number
  price: number
}

export interface EcoPriceList {
  id: string
  name: string
  product: string
  tiers: EcoPriceTier[]
  companies: string[]
  minOrder: number
  maxOrder: number
}

export type EcoQuoteStatus = 'requested' | 'sent' | 'accepted' | 'expired'

export interface EcoQuoteLine {
  name: string
  qty: number
  unitPrice: number
}

export interface EcoQuote {
  id: string
  company: string
  contact: string
  date: string
  status: EcoQuoteStatus
  discountPct: number
  lines: EcoQuoteLine[]
}

export interface EcoPosProduct {
  id: string
  name: string
  barcode: string
  price: number
  icon: string
}

export interface EcoPosCartLine {
  id: string
  name: string
  price: number
  qty: number
}
