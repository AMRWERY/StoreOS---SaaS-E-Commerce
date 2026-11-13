export type CampaignChannel = 'email' | 'sms' | 'whatsapp'
export type CampaignStatus = 'draft' | 'scheduled' | 'sent'

export interface Campaign {
  id: string
  name: string
  channel: CampaignChannel
  audience: string
  date: string
  sent: number
  openRate: number
  clickRate: number
  revenue: number
  status: CampaignStatus
}

export type EmailBlockType = 'header' | 'text' | 'image' | 'products' | 'button' | 'footer'

export interface EmailBlock {
  id: string
  type: EmailBlockType
  text: string
}

export type ConsentStatus = 'opted_in' | 'pending' | 'unsubscribed'
export type SubscriberSource = 'checkout' | 'popup' | 'import' | 'storefront'

export interface Subscriber {
  id: string
  contact: string
  source: SubscriberSource
  consent: ConsentStatus
  subscribedAt: string
  tags: string[]
}

export interface RecoveryStep {
  id: string
  channel: CampaignChannel
  delayHours: number
  enabled: boolean
  template: string
  couponPct: number
}

export type LoyaltyTierId = 'silver' | 'gold' | 'vip'

export interface LoyaltyTier {
  id: LoyaltyTierId
  threshold: number
  discountPct: number
  multiplier: number
}

export interface LoyaltyMember {
  id: string
  name: string
  tier: LoyaltyTierId
  points: number
  orders: number
}

export interface MktProduct {
  id: string
  name: string
  price: number
}

export type BundleStatus = 'active' | 'draft'

export interface BundleItem {
  productId: string
  qty: number
}

export interface Bundle {
  id: string
  name: string
  items: BundleItem[]
  price: number
  stock: number
  status: BundleStatus
}

export type UpsellPlacement = 'product' | 'cart' | 'post_purchase'

export interface UpsellRule {
  id: string
  triggerId: string
  offeredId: string
  placement: UpsellPlacement
}

export type AffiliateStatus = 'pending' | 'approved' | 'blocked'

export interface Affiliate {
  id: string
  name: string
  code: string
  clicks: number
  orders: number
  commission: number
  earnings: number
  status: AffiliateStatus
}

export interface AffiliatePayout {
  id: string
  affiliate: string
  amount: number
  date: string
  method: 'wallet' | 'bank'
  status: 'paid' | 'pending'
}

export type ReviewStatus = 'pending' | 'published' | 'rejected'

export interface ProductReview {
  id: string
  product: string
  customer: string
  rating: number
  text: string
  hasPhoto: boolean
  status: ReviewStatus
  date: string
  reply: string
}
